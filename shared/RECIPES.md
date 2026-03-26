<!--
  GenAI Security Crosswalk — Shared Resources
  File        : RECIPES.md — Security Implementation Patterns for GenAI Systems
  Version     : 2026-Q1
  Maintained by: OWASP GenAI Data Security Initiative — https://genai.owasp.org
  License     : CC BY-SA 4.0
-->

# Security Recipes for GenAI Systems

Concrete, copy-paste-ready security implementation patterns for the
three most critical GenAI deployment architectures:

1. **RAG Pipelines** — Retrieval-Augmented Generation security
2. **MCP Servers** — Model Context Protocol server hardening
3. **Multi-Agent OT** — Autonomous agents in industrial environments

Each recipe maps to specific OWASP source list entries and framework
controls covered in this repository. Where a recipe addresses a risk,
the relevant crosswalk files are cited.

---

## How to use this file

Each recipe follows the same structure:

- **Threat** — what attack this addresses
- **Architecture** — where this pattern fits in your stack
- **Implementation** — concrete code, config, or process steps
- **Validation** — how to verify the control works
- **Crosswalk** — which repo files cover the underlying risks

Recipes are ordered from most-deployed to most-specialised.
Start with RAG if you have a production RAG pipeline. Start with
MCP if you are deploying tool-using agents. Start with OT if you
are deploying AI in industrial environments.

---

# Part 1 — RAG Pipeline Security

---

## Recipe R-01: Access-Controlled Retrieval

**Threat:** LLM02 Sensitive Information Disclosure — users retrieve
documents they are not authorised to access through the RAG interface.

**Architecture:** Vector store ? retrieval layer ? LLM context assembly

**Problem pattern:**
Most RAG deployments query the vector store with a single service
account that has read access to all indexed documents. Any user,
regardless of their authorisation level, receives results from the
entire corpus. A junior analyst can retrieve documents that should
only be visible to executives, security engineers, or legal counsel.

**Implementation:**

*Step 1 — Tag every document at ingestion with its access tier:*
```python
from dataclasses import dataclass
from typing import Optional

@dataclass
class DocumentMetadata:
    doc_id: str
    source_path: str
    classification: str          # PUBLIC | INTERNAL | CONFIDENTIAL | RESTRICTED
    owner_team: str
    allowed_roles: list[str]     # e.g. ["analyst", "engineer", "admin"]
    allowed_users: Optional[list[str]] = None  # specific user override
    created_at: str = ""
    expires_at: Optional[str] = None

def ingest_document(content: str, metadata: DocumentMetadata, embedder, vector_store):
    """
    Ingest a document with access metadata preserved in vector store payload.
    Classification and allowed_roles are stored alongside the embedding
    so retrieval filters can apply them at query time.
    """
    embedding = embedder.embed(content)
    payload = {
        "content": content,
        "doc_id": metadata.doc_id,
        "classification": metadata.classification,
        "allowed_roles": metadata.allowed_roles,
        "allowed_users": metadata.allowed_users or [],
        "owner_team": metadata.owner_team,
    }
    vector_store.upsert(
        vectors=[(metadata.doc_id, embedding, payload)]
    )
```

*Step 2 — Apply user context as a retrieval filter at query time:*
```python
def retrieve_with_access_control(
    query: str,
    user_id: str,
    user_roles: list[str],
    vector_store,
    embedder,
    top_k: int = 5
) -> list[dict]:
    """
    Retrieve documents the user is authorised to access.
    Filter applied at the vector store query — not post-retrieval.
    Post-retrieval filtering is insufficient: semantic search may
    score a restricted document highly and you would need to discard
    it after retrieving it, wasting retrieval budget and risking
    accidental inclusion.
    """
    query_embedding = embedder.embed(query)

    # Build access filter — user must match at least one allowed_role
    # OR appear in allowed_users for the document
    access_filter = {
        "should": [
            {"key": "allowed_roles", "match": {"any": user_roles}},
            {"key": "allowed_users", "match": {"value": user_id}},
        ],
        "minimum_should_match": 1
    }

    results = vector_store.search(
        query_vector=query_embedding,
        query_filter=access_filter,
        limit=top_k,
        with_payload=True
    )

    # Log all retrieval operations for audit
    log_retrieval_event(
        user_id=user_id,
        user_roles=user_roles,
        query_hash=hash(query),
        doc_ids=[r.id for r in results],
        classifications=[r.payload["classification"] for r in results]
    )

    return [r.payload for r in results]
```

*Step 3 — Validate classification ceiling before context assembly:*
```python
CLASSIFICATION_ORDER = ["PUBLIC", "INTERNAL", "CONFIDENTIAL", "RESTRICTED"]

def get_context_classification_ceiling(retrieved_docs: list[dict]) -> str:
    """
    The context window inherits the highest classification of any
    document it contains. The response must be handled at this level.
    """
    max_level = 0
    for doc in retrieved_docs:
        level = CLASSIFICATION_ORDER.index(doc.get("classification", "PUBLIC"))
        max_level = max(max_level, level)
    return CLASSIFICATION_ORDER[max_level]

def assemble_context(retrieved_docs: list[dict], user_max_classification: str) -> str:
    """
    Refuse context assembly if any retrieved document exceeds
    the user's maximum permitted classification level.
    This is a defence-in-depth check — the retrieval filter
    should have already prevented this, but belt-and-suspenders
    is appropriate for access control.
    """
    ceiling = get_context_classification_ceiling(retrieved_docs)
    user_level = CLASSIFICATION_ORDER.index(user_max_classification)
    doc_level = CLASSIFICATION_ORDER.index(ceiling)

    if doc_level > user_level:
        raise AccessControlViolation(
            f"Retrieved content at {ceiling} exceeds "
            f"user authorisation {user_max_classification}. "
            f"Retrieval filter may have failed — investigate."
        )

    context = "\n\n".join(
        f"[Source: {doc['doc_id']} | {doc['classification']}]\n{doc['content']}"
        for doc in retrieved_docs
    )
    return context
```

**Validation:**
```python
# Test: user with INTERNAL role cannot retrieve CONFIDENTIAL documents
results = retrieve_with_access_control(
    query="executive compensation details",
    user_id="test_user_001",
    user_roles=["analyst"],   # INTERNAL-level role
    vector_store=vs,
    embedder=em
)
# Assert: no CONFIDENTIAL or RESTRICTED documents in results
for r in results:
    assert r["classification"] not in ["CONFIDENTIAL", "RESTRICTED"], \
        f"Access control failure: returned {r['classification']} to INTERNAL user"
```

**Crosswalk:** LLM02 · DSGAI01 · DSGAI11 · ISO 27001 A.8.3 · NIST AI RMF MS-2.5

---

## Recipe R-02: Ingestion Pipeline Integrity

**Threat:** LLM04 Data & Model Poisoning / DSGAI05 Data Integrity
& Validation Failures — adversarially crafted documents corrupt the
RAG knowledge base or exploit ingestion pipeline vulnerabilities.

**Architecture:** Document upload ? validation layer ? chunking ?
embedding ? vector store

**Implementation:**
```python
import hashlib
import magic
import re
from pathlib import Path

ALLOWED_MIME_TYPES = {
    "application/pdf",
    "text/plain",
    "text/markdown",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
}

MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024  # 10 MB

# Patterns that should never appear in documents ingested to OT knowledge bases
# Extend for your environment
INJECTION_PATTERNS = [
    r"ignore previous instructions",
    r"disregard.*system prompt",
    r"you are now",
    r"<\|.*\|>",              # Token boundary injection attempts
    r"\[INST\]",              # Llama-style instruction injection
    r"###\s*(Human|Assistant|System):",  # Role injection
]

def validate_document_for_ingestion(
    file_path: str,
    expected_source: str,
    expected_hash: Optional[str] = None
) -> dict:
    """
    Multi-stage validation before any document enters the RAG corpus.
    Returns a validation report — caller decides whether to proceed.
    """
    path = Path(file_path)
    report = {
        "file": file_path,
        "passed": False,
        "failures": [],
        "content_hash": None,
        "mime_type": None,
    }

    # Stage 1: File existence and size
    if not path.exists():
        report["failures"].append("FILE_NOT_FOUND")
        return report
    size = path.stat().st_size
    if size > MAX_FILE_SIZE_BYTES:
        report["failures"].append(f"FILE_TOO_LARGE: {size} bytes")
        return report
    if size == 0:
        report["failures"].append("FILE_EMPTY")
        return report

    # Stage 2: MIME type validation (magic bytes, not file extension)
    mime = magic.from_file(file_path, mime=True)
    report["mime_type"] = mime
    if mime not in ALLOWED_MIME_TYPES:
        report["failures"].append(f"INVALID_MIME_TYPE: {mime}")
        return report

    # Stage 3: Content hash and integrity
    with open(file_path, "rb") as f:
        content_bytes = f.read()
    content_hash = hashlib.sha256(content_bytes).hexdigest()
    report["content_hash"] = content_hash

    if expected_hash and content_hash != expected_hash:
        report["failures"].append(
            f"HASH_MISMATCH: expected {expected_hash}, got {content_hash}"
        )
        return report

    # Stage 4: Semantic injection detection on extracted text
    # (extract text from PDF/DOCX appropriately for production)
    text_content = content_bytes.decode("utf-8", errors="ignore")
    for pattern in INJECTION_PATTERNS:
        if re.search(pattern, text_content, re.IGNORECASE):
            report["failures"].append(f"INJECTION_PATTERN_DETECTED: {pattern}")
            # Do not return early — collect all failures for forensics

    # Stage 5: Source provenance check
    # In production: verify document came from an approved source system
    if not is_approved_source(expected_source):
        report["failures"].append(f"UNAPPROVED_SOURCE: {expected_source}")

    report["passed"] = len(report["failures"]) == 0
    return report


def is_approved_source(source: str) -> bool:
    """
    Replace with your approved source registry lookup.
    Examples: SharePoint, Confluence, approved S3 buckets.
    """
    APPROVED_SOURCES = {
        "sharepoint://engineering/docs",
        "confluence://security-policies",
        "s3://approved-rag-corpus",
    }
    return any(source.startswith(s) for s in APPROVED_SOURCES)
```

**Path traversal protection for snapshot imports (CVE-2024-3584 class):**
```python
import os
import zipfile
from pathlib import Path

SAFE_IMPORT_BASE = Path("/var/rag/imports/sandbox")

def safe_snapshot_import(archive_path: str, destination: Path) -> list[str]:
    """
    Safely extract snapshot archives — prevent path traversal.
    CVE-2024-3584 (Qdrant) demonstrated that snapshot imports
    can achieve arbitrary file write via path traversal in archives.
    """
    extracted = []
    destination = destination.resolve()

    with zipfile.ZipFile(archive_path, "r") as zf:
        for member in zf.namelist():
            # Resolve the destination path and verify it stays within sandbox
            target = (destination / member).resolve()

            # Path traversal check — must stay within destination
            if not str(target).startswith(str(destination)):
                raise SecurityError(
                    f"Path traversal attempt in snapshot: {member} "
                    f"resolves to {target}, outside {destination}"
                )

            # Reject absolute paths and symlinks
            info = zf.getinfo(member)
            if member.startswith("/") or ".." in member:
                raise SecurityError(f"Dangerous path in archive: {member}")

            zf.extract(member, destination)
            extracted.append(str(target))

    return extracted
```

**Crosswalk:** LLM04 · DSGAI05 · DSGAI13 · ISO 27001 A.8.26/A.8.28/A.8.29

---

## Recipe R-03: Output Redaction Before Delivery

**Threat:** LLM02 Sensitive Information Disclosure — LLM responses
contain PII, credentials, or sensitive identifiers that should be
masked before reaching the user.

**Architecture:** LLM response ? redaction layer ? user delivery

**Implementation:**
```python
import re
from dataclasses import dataclass, field
from typing import Callable

@dataclass
class RedactionPattern:
    name: str
    pattern: str
    replacement: str
    priority: int = 0  # Higher = applied first

# Core patterns — extend for your environment
DEFAULT_PATTERNS = [
    RedactionPattern("API_KEY_GENERIC",
        r"(?:api[_-]?key|apikey)[\"'\s:=]+([A-Za-z0-9_\-]{20,})",
        "[REDACTED-API-KEY]", priority=10),
    RedactionPattern("AWS_ACCESS_KEY",
        r"(?:AKIA|ABIA|ACCA|AROA)[A-Z0-9]{16}",
        "[REDACTED-AWS-KEY]", priority=10),
    RedactionPattern("BEARER_TOKEN",
        r"Bearer\s+[A-Za-z0-9\-_=]+\.[A-Za-z0-9\-_=]+\.[A-Za-z0-9\-_.+/=]+",
        "Bearer [REDACTED-TOKEN]", priority=10),
    RedactionPattern("EMAIL",
        r"[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}",
        "[REDACTED-EMAIL]", priority=5),
    RedactionPattern("US_SSN",
        r"\b\d{3}-\d{2}-\d{4}\b",
        "[REDACTED-SSN]", priority=10),
    RedactionPattern("CREDIT_CARD",
        r"\b(?:\d{4}[\s\-]?){3}\d{4}\b",
        "[REDACTED-CC]", priority=10),
    RedactionPattern("IP_ADDRESS_PRIVATE",
        r"\b(?:10|172\.(?:1[6-9]|2[0-9]|3[01])|192\.168)\.\d{1,3}\.\d{1,3}\b",
        "[REDACTED-INTERNAL-IP]", priority=7),
]

class OutputRedactor:
    def __init__(
        self,
        patterns: list[RedactionPattern] = None,
        custom_validators: list[Callable] = None
    ):
        self.patterns = sorted(
            patterns or DEFAULT_PATTERNS,
            key=lambda p: p.priority,
            reverse=True
        )
        self.custom_validators = custom_validators or []
        self._compiled = [
            (re.compile(p.pattern, re.IGNORECASE), p.replacement, p.name)
            for p in self.patterns
        ]

    def redact(self, text: str, context: dict = None) -> tuple[str, list[str]]:
        """
        Apply redaction patterns. Returns (redacted_text, list_of_triggered_patterns).
        Triggered patterns are logged for security monitoring — not returned to user.
        """
        triggered = []
        result = text

        for compiled_pattern, replacement, name in self._compiled:
            if compiled_pattern.search(result):
                triggered.append(name)
                result = compiled_pattern.sub(replacement, result)

        # Apply custom validators (e.g. OT tag IDs, internal hostnames)
        for validator in self.custom_validators:
            result, new_triggered = validator(result, context)
            triggered.extend(new_triggered)

        return result, triggered


def ot_tag_redactor(text: str, context: dict = None) -> tuple[str, list[str]]:
    """
    Custom validator example: redact OT historian tag IDs.
    Extend with your actual tag naming convention.
    Format examples: FIC-101, TI_302, PV-205A
    """
    OT_TAG_PATTERN = re.compile(
        r"\b[A-Z]{2,4}[-_]\d{3,4}[A-Z]?\b"
    )
    triggered = []
    if OT_TAG_PATTERN.search(text):
        triggered.append("OT_HISTORIAN_TAG")
        text = OT_TAG_PATTERN.sub("[REDACTED-OT-TAG]", text)
    return text, triggered


# Usage
redactor = OutputRedactor(
    patterns=DEFAULT_PATTERNS,
    custom_validators=[ot_tag_redactor]
)

def deliver_response(raw_response: str, user_id: str, session_id: str) -> str:
    redacted, triggered = redactor.redact(raw_response)
    if triggered:
        security_log.warning(
            "Output redaction triggered",
            user_id=user_id,
            session_id=session_id,
            patterns=triggered,
            # Do NOT log the original response — that defeats the purpose
        )
    return redacted
```

**Crosswalk:** LLM02 · DSGAI01 · DSGAI09 · DSGAI14 · ISO 27001 A.8.11/A.8.12

---

## Recipe R-04: RAG Circuit Breaker for Silent Failures

**Threat:** DSGAI17 Data Availability & Resilience Failures — vector
store degradation causes silent misinformation rather than a visible
error.

**Architecture:** Query ? vector store health check ? retrieval ?
freshness validation ? context assembly ? fallback if degraded

**Implementation:**
```python
import time
from enum import Enum
from dataclasses import dataclass

class CircuitState(Enum):
    CLOSED = "closed"       # Normal operation
    OPEN = "open"           # Failing — reject requests
    HALF_OPEN = "half_open" # Testing recovery

@dataclass
class RAGCircuitBreaker:
    failure_threshold: int = 5       # Failures before opening
    recovery_timeout: int = 60       # Seconds before attempting recovery
    max_index_age_seconds: int = 3600  # Alert if index older than this
    _failures: int = 0
    _state: CircuitState = CircuitState.CLOSED
    _last_failure_time: float = 0.0

    def call(self, retrieval_fn, query: str, fallback_fn=None):
        if self._state == CircuitState.OPEN:
            if time.time() - self._last_failure_time > self.recovery_timeout:
                self._state = CircuitState.HALF_OPEN
            else:
                if fallback_fn:
                    return fallback_fn(query), "CIRCUIT_OPEN_FALLBACK"
                raise CircuitOpenError("RAG circuit breaker open — vector store degraded")

        try:
            result = retrieval_fn(query)
            self._on_success()
            return result, "OK"
        except Exception as e:
            self._on_failure()
            if fallback_fn:
                return fallback_fn(query), "CIRCUIT_FALLBACK"
            raise

    def _on_success(self):
        self._failures = 0
        self._state = CircuitState.CLOSED

    def _on_failure(self):
        self._failures += 1
        self._last_failure_time = time.time()
        if self._failures >= self.failure_threshold:
            self._state = CircuitState.OPEN
            alert_ops(
                "RAG circuit breaker OPENED",
                failures=self._failures,
                timestamp=self._last_failure_time
            )

    def check_index_freshness(self, index_last_updated: float) -> bool:
        age = time.time() - index_last_updated
        if age > self.max_index_age_seconds:
            alert_ops(
                "RAG index staleness warning",
                age_seconds=age,
                threshold=self.max_index_age_seconds
            )
            return False
        return True


def fallback_no_rag(query: str) -> list[dict]:
    """
    Graceful degradation: LLM answers from parametric knowledge only.
    User is informed that retrieval is unavailable — not silently served
    stale data as if it were current.
    """
    return [{
        "content": (
            "[NOTICE: Document retrieval is temporarily unavailable. "
            "This response is based on general knowledge only and may "
            "not reflect current internal information. "
            "Please verify against authoritative sources.]"
        ),
        "classification": "PUBLIC",
        "doc_id": "SYSTEM_FALLBACK"
    }]
```

**Crosswalk:** DSGAI17 · ASI08 · LLM10 · ISA/IEC 62443 SR 7.6 (OT) · NIST SP 800-82 (OT)

---

## Recipe R-05: Telemetry with Least-Logging Defaults

**Threat:** DSGAI14 Excessive Telemetry & Monitoring Leakage —
observability pipelines capture sensitive content in cleartext with
long retention.

**Implementation:**
```python
import hashlib
from enum import IntEnum

class LogLevel(IntEnum):
    MINIMAL = 1   # Metrics only — no content
    STANDARD = 2  # Anonymised content, hashed identifiers
    DEBUG = 3     # Full content — requires approval, auto-expires

CURRENT_LOG_LEVEL = LogLevel.STANDARD  # Default — never DEBUG in production

def log_rag_interaction(
    session_id: str,
    user_id: str,
    query: str,
    retrieved_doc_ids: list[str],
    response: str,
    latency_ms: float,
    retrieved_classifications: list[str]
):
    """
    Tiered logging — content detail varies by log level.
    MINIMAL: suitable for long-retention operational dashboards.
    STANDARD: suitable for security monitoring, short retention (30d).
    DEBUG: full capture, requires explicit approval, 24h auto-expiry.
    """
    # Always safe to log
    base_record = {
        "session_hash": hashlib.sha256(session_id.encode()).hexdigest()[:16],
        "user_hash": hashlib.sha256(user_id.encode()).hexdigest()[:16],
        "latency_ms": latency_ms,
        "doc_count": len(retrieved_doc_ids),
        "max_classification": max(retrieved_classifications, default="PUBLIC"),
        "timestamp": time.time(),
    }

    if CURRENT_LOG_LEVEL >= LogLevel.STANDARD:
        base_record.update({
            "query_length": len(query),
            "query_topic_hash": hashlib.sha256(query.encode()).hexdigest()[:8],
            "doc_ids": retrieved_doc_ids,  # IDs are safe — not content
            "response_length": len(response),
        })

    if CURRENT_LOG_LEVEL >= LogLevel.DEBUG:
        # This level should never be on by default in production
        # Requires: explicit approval, scoped to specific session, 24h TTL
        base_record.update({
            "query_text": query,
            "response_text": response,
            "debug_expiry": time.time() + 86400,  # 24h
            "debug_authorised_by": get_debug_authorisation(),
        })

    audit_log.write(base_record)
```

**Crosswalk:** DSGAI14 · LLM07 · ISO 27001 A.8.15 · NIST AI RMF GV-1.6

---

# Part 2 — MCP Server Hardening

---

## Recipe M-01: MCP Server Input Validation and Schema Enforcement

**Threat:** ASI02 Tool Misuse — MCP servers accept malformed or
adversarial tool call parameters that cause downstream harm.

**Architecture:** Agent ? MCP server ? tool execution

**Implementation:**
```python
from pydantic import BaseModel, validator, Field
from typing import Annotated
import re

# Define strict schemas for every tool — no open-ended parameter acceptance

class HistorianQueryParams(BaseModel):
    """
    Schema for historian read tool — OT environment example.
    All parameters strictly validated before the query executes.
    """
    tag_names: list[Annotated[str, Field(pattern=r"^[A-Z]{2,4}[-_]\d{3,4}[A-Z]?$")]]
    start_time: str  # ISO 8601
    end_time: str    # ISO 8601
    max_points: Annotated[int, Field(ge=1, le=10000)]  # Hard cap — no unbounded queries

    @validator("tag_names")
    def validate_tag_count(cls, v):
        if len(v) > 50:
            raise ValueError("Maximum 50 tags per query — use batch endpoint for larger requests")
        return v

    @validator("start_time", "end_time")
    def validate_iso_datetime(cls, v):
        # Strict ISO 8601 — prevent injection via timestamp strings
        if not re.match(r"^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$", v):
            raise ValueError(f"Invalid ISO 8601 datetime: {v}")
        return v


class WorkOrderCreateParams(BaseModel):
    """
    Schema for work order creation tool — CMMS integration example.
    This is an irreversible operation — extra validation layers applied.
    """
    equipment_id: Annotated[str, Field(pattern=r"^[A-Z]{2,6}-\d{3,6}$")]
    priority: Annotated[str, Field(pattern=r"^(LOW|MEDIUM|HIGH)$")]
    description: Annotated[str, Field(max_length=500)]
    scheduled_date: str  # ISO 8601 date only

    @validator("scheduled_date")
    def validate_not_in_past(cls, v):
        from datetime import date
        scheduled = date.fromisoformat(v)
        if scheduled < date.today():
            raise ValueError("Cannot schedule work orders in the past")
        return v

    @validator("description")
    def scan_for_injection(cls, v):
        SUSPICIOUS_PATTERNS = [
            r"ignore.*instruction",
            r"<script",
            r"';",
            r"--\s",  # SQL comment
        ]
        for pattern in SUSPICIOUS_PATTERNS:
            if re.search(pattern, v, re.IGNORECASE):
                raise ValueError(f"Invalid description content detected")
        return v


# MCP tool handler with schema validation
def handle_tool_call(tool_name: str, params: dict, user_context: dict) -> dict:
    """
    Central MCP tool handler — all calls validated before execution.
    Schema validation is the gate. No raw parameter passthrough.
    """
    TOOL_SCHEMAS = {
        "historian_query": HistorianQueryParams,
        "create_work_order": WorkOrderCreateParams,
    }

    if tool_name not in TOOL_SCHEMAS:
        raise ToolNotPermittedError(f"Tool '{tool_name}' is not registered")

    schema_class = TOOL_SCHEMAS[tool_name]
    try:
        validated_params = schema_class(**params)
    except Exception as e:
        security_log.warning(
            "Tool call validation failure",
            tool=tool_name,
            user=user_context.get("user_id"),
            error=str(e),
            # Do not log the raw params — may contain sensitive content
        )
        raise ToolValidationError(f"Invalid parameters for {tool_name}: {e}")

    # Check irreversibility and require confirmation
    IRREVERSIBLE_TOOLS = {"create_work_order", "send_notification", "modify_setpoint"}
    if tool_name in IRREVERSIBLE_TOOLS:
        if not user_context.get("human_confirmed"):
            raise HumanConfirmationRequired(
                f"Tool '{tool_name}' requires explicit human confirmation. "
                f"Confirmation token not present in request context."
            )

    return execute_tool(tool_name, validated_params, user_context)
```

**Crosswalk:** ASI02 · LLM05 · LLM06 · DSGAI06 · ISO 27001 A.8.26/A.8.28 · OWASP ASVS V5

---

## Recipe M-02: MCP Tool Descriptor Integrity Verification

**Threat:** ASI04 Agentic Supply Chain — compromised MCP server
injects hidden instructions into tool descriptors that redirect
agent behaviour.

**Architecture:** Agent tool loader ? descriptor validation ? tool registry

**Implementation:**
```python
import hashlib
import json
import hmac
from typing import Optional

# Tool descriptor integrity registry
# In production: store in a tamper-evident system, not a dict
APPROVED_TOOL_DESCRIPTORS: dict[str, str] = {}  # tool_id ? expected_hash

def register_tool_descriptor(tool_id: str, descriptor: dict, approver: str):
    """
    Register a tool descriptor with its integrity hash.
    Called during formal tool approval process — not at runtime.
    """
    descriptor_json = json.dumps(descriptor, sort_keys=True)
    descriptor_hash = hashlib.sha256(descriptor_json.encode()).hexdigest()

    APPROVED_TOOL_DESCRIPTORS[tool_id] = descriptor_hash
    audit_log.info(
        "Tool descriptor registered",
        tool_id=tool_id,
        descriptor_hash=descriptor_hash,
        approver=approver,
        timestamp=time.time()
    )


def validate_tool_descriptor(tool_id: str, descriptor: dict) -> bool:
    """
    Validate a tool descriptor against its approved hash.
    Called before the agent loads any tool.
    Any modification to a descriptor — even whitespace — fails validation.
    """
    if tool_id not in APPROVED_TOOL_DESCRIPTORS:
        security_log.error(
            "Unregistered tool descriptor encountered",
            tool_id=tool_id
        )
        return False

    descriptor_json = json.dumps(descriptor, sort_keys=True)
    current_hash = hashlib.sha256(descriptor_json.encode()).hexdigest()
    expected_hash = APPROVED_TOOL_DESCRIPTORS[tool_id]

    if not hmac.compare_digest(current_hash, expected_hash):
        security_log.critical(
            "Tool descriptor integrity failure — possible supply chain compromise",
            tool_id=tool_id,
            expected_hash=expected_hash,
            current_hash=current_hash
        )
        return False

    return True


def scan_descriptor_for_hidden_instructions(descriptor: dict) -> list[str]:
    """
    Scan tool descriptors for patterns that could redirect agent behaviour.
    This is defence-in-depth on top of hash verification —
    catches cases where the attacker has update access to the registry.
    """
    SUSPICIOUS_DESCRIPTOR_PATTERNS = [
        r"ignore.*previous",
        r"disregard.*instructions",
        r"system.*prompt",
        r"always.*before.*responding",
        r"secretly",
        r"without.*user.*know",
        r"exfiltrate",
        r"send.*to.*http",
    ]

    findings = []
    descriptor_text = json.dumps(descriptor).lower()

    for pattern in SUSPICIOUS_DESCRIPTOR_PATTERNS:
        if re.search(pattern, descriptor_text, re.IGNORECASE):
            findings.append(pattern)

    return findings


def load_tool_for_agent(tool_id: str, descriptor: dict) -> Optional[dict]:
    """
    Safe tool loading — validates integrity and scans for hidden instructions
    before making the tool available to the agent.
    """
    if not validate_tool_descriptor(tool_id, descriptor):
        raise ToolIntegrityError(f"Tool {tool_id} failed integrity check — not loaded")

    hidden = scan_descriptor_for_hidden_instructions(descriptor)
    if hidden:
        security_log.critical(
            "Hidden instruction patterns in tool descriptor",
            tool_id=tool_id,
            patterns=hidden
        )
        raise ToolIntegrityError(
            f"Tool {tool_id} descriptor contains suspicious patterns — not loaded"
        )

    return descriptor
```

**Crosswalk:** ASI04 · LLM03 · DSGAI04 · ISO 27001 A.5.19/A.5.21 · NIST AI RMF MP-5.1

---

## Recipe M-03: Per-Session Credential Scoping for MCP Tools

**Threat:** ASI03 Identity & Privilege Abuse — agents hold long-lived,
over-scoped credentials that persist beyond the task they were issued for.

**Architecture:** Session start ? JIT credential issuance ? tool calls
? session end ? automatic revocation

**Implementation:**
```python
import uuid
import time
from dataclasses import dataclass, field
from typing import Optional

@dataclass
class AgentCredential:
    credential_id: str
    agent_id: str
    session_id: str
    tool_scopes: dict[str, list[str]]  # tool_name ? permitted_operations
    issued_at: float = field(default_factory=time.time)
    expires_at: float = 0.0
    revoked: bool = False
    revoked_reason: Optional[str] = None

    def is_valid(self) -> bool:
        return not self.revoked and time.time() < self.expires_at

    def permits(self, tool_name: str, operation: str) -> bool:
        if not self.is_valid():
            return False
        permitted_ops = self.tool_scopes.get(tool_name, [])
        return operation in permitted_ops


class AgentCredentialManager:
    def __init__(self, vault_client):
        self.vault = vault_client
        self._active_credentials: dict[str, AgentCredential] = {}

    def issue_session_credential(
        self,
        agent_id: str,
        agent_role: str,
        requested_tools: list[str],
        task_description: str,
        ttl_seconds: int = 900  # 15 minutes default — adjust per task type
    ) -> AgentCredential:
        """
        Issue a task-scoped, time-limited credential for this session.
        Scope is derived from agent role and requested tools —
        agent cannot self-escalate by requesting additional scope.
        """
        session_id = str(uuid.uuid4())
        permitted_scopes = self._derive_permitted_scopes(
            agent_role=agent_role,
            requested_tools=requested_tools
        )

        # Get actual credentials from vault — not stored in credential object
        vault_secret_id = self.vault.issue_dynamic_secret(
            role=agent_role,
            scopes=permitted_scopes,
            ttl=ttl_seconds,
            metadata={
                "agent_id": agent_id,
                "session_id": session_id,
                "task": task_description[:100]  # Truncate for log safety
            }
        )

        credential = AgentCredential(
            credential_id=vault_secret_id,
            agent_id=agent_id,
            session_id=session_id,
            tool_scopes=permitted_scopes,
            expires_at=time.time() + ttl_seconds,
        )

        self._active_credentials[session_id] = credential
        audit_log.info(
            "Agent credential issued",
            agent_id=agent_id,
            session_id=session_id,
            tool_scopes=list(permitted_scopes.keys()),
            ttl_seconds=ttl_seconds,
            expires_at=credential.expires_at
        )
        return credential

    def revoke_credential(self, session_id: str, reason: str = "session_end"):
        """
        Immediately revoke credential — call on session end, on anomaly detection,
        or on kill switch activation. Do not wait for TTL expiry.
        """
        if session_id not in self._active_credentials:
            return

        credential = self._active_credentials[session_id]
        credential.revoked = True
        credential.revoked_reason = reason

        # Revoke in vault — invalidates the actual secret immediately
        self.vault.revoke_secret(credential.credential_id)

        audit_log.info(
            "Agent credential revoked",
            agent_id=credential.agent_id,
            session_id=session_id,
            reason=reason,
            lifetime_seconds=time.time() - credential.issued_at
        )
        del self._active_credentials[session_id]

    def _derive_permitted_scopes(
        self,
        agent_role: str,
        requested_tools: list[str]
    ) -> dict[str, list[str]]:
        """
        Map agent role to permitted tool operations.
        Agent cannot request operations beyond what its role permits.
        Extend this mapping for your deployment.
        """
        ROLE_TOOL_PERMISSIONS = {
            "maintenance_agent": {
                "historian_query": ["read"],
                "create_work_order": ["create"],
                "send_notification": ["send"],
            },
            "monitoring_agent": {
                "historian_query": ["read"],
                "alert_query": ["read"],
            },
            "optimisation_agent": {
                "historian_query": ["read"],
                "setpoint_recommend": ["recommend"],  # recommend only — not execute
            }
        }

        role_permissions = ROLE_TOOL_PERMISSIONS.get(agent_role, {})
        # Only grant permissions for tools the agent actually requested AND has role access to
        return {
            tool: ops
            for tool, ops in role_permissions.items()
            if tool in requested_tools
        }
```

**Crosswalk:** ASI03 · DSGAI02 · OWASP NHI Top 10 NHI-5/7/9 · ISO 27001 A.8.2 · AIUC-1 A/B007

---

## Recipe M-04: MCP Rate Limiting and Anomaly Detection

**Threat:** LLM10 Unbounded Consumption / ASI08 Cascading Failures —
agent tool invocations saturate downstream systems or exhibit
anomalous patterns indicating compromise.

**Implementation:**
```python
import time
from collections import defaultdict, deque
from dataclasses import dataclass, field

@dataclass
class ToolInvocationTracker:
    window_seconds: int = 60
    max_calls_per_window: int = 100
    max_calls_per_tool_per_window: int = 20
    anomaly_velocity_multiplier: float = 3.0  # Alert if >3x baseline in window

    _calls: dict = field(default_factory=lambda: defaultdict(deque))
    _baselines: dict = field(default_factory=lambda: defaultdict(list))

    def record_and_check(
        self,
        agent_id: str,
        tool_name: str,
        session_id: str
    ) -> tuple[bool, str]:
        """
        Record a tool invocation and check against limits.
        Returns (permitted: bool, reason: str)
        """
        now = time.time()
        window_start = now - self.window_seconds

        # Clean expired entries
        key_agent = f"{agent_id}:all"
        key_tool = f"{agent_id}:{tool_name}"

        for key in [key_agent, key_tool]:
            while self._calls[key] and self._calls[key][0] < window_start:
                self._calls[key].popleft()

        # Check total agent rate
        if len(self._calls[key_agent]) >= self.max_calls_per_window:
            security_log.warning(
                "Agent rate limit exceeded",
                agent_id=agent_id,
                session_id=session_id,
                calls_in_window=len(self._calls[key_agent])
            )
            return False, "RATE_LIMIT_AGENT"

        # Check per-tool rate
        if len(self._calls[key_tool]) >= self.max_calls_per_tool_per_window:
            security_log.warning(
                "Tool rate limit exceeded",
                agent_id=agent_id,
                tool_name=tool_name,
                session_id=session_id
            )
            return False, "RATE_LIMIT_TOOL"

        # Anomaly detection: check if current rate is anomalously high
        baseline_key = f"{agent_id}:{tool_name}:baseline"
        if self._baselines[baseline_key]:
            avg_calls = sum(self._baselines[baseline_key]) / len(self._baselines[baseline_key])
            current_rate = len(self._calls[key_tool])
            if avg_calls > 0 and current_rate > avg_calls * self.anomaly_velocity_multiplier:
                security_log.critical(
                    "Anomalous tool invocation velocity",
                    agent_id=agent_id,
                    tool_name=tool_name,
                    session_id=session_id,
                    current_rate=current_rate,
                    baseline_avg=avg_calls
                )
                # Alert but do not block — anomaly may be legitimate burst
                # Change to return False to block on anomaly

        # Record the call
        self._calls[key_agent].append(now)
        self._calls[key_tool].append(now)

        return True, "OK"

    def update_baseline(self, agent_id: str, tool_name: str):
        """Call at the end of each session to update the baseline."""
        baseline_key = f"{agent_id}:{tool_name}:baseline"
        session_count = len(self._calls.get(f"{agent_id}:{tool_name}", []))
        self._baselines[baseline_key].append(session_count)
        # Keep last 30 sessions for baseline
        if len(self._baselines[baseline_key]) > 30:
            self._baselines[baseline_key].pop(0)
```

**Crosswalk:** LLM10 · ASI08 · DSGAI17 · ISA/IEC 62443 SR 7.6 (OT) · CIS Controls CIS 12

---

# Part 3 — Multi-Agent Security in OT Environments

---

## Recipe O-01: Agent Kill Switch Implementation

**Threat:** ASI01 Goal Hijack / ASI10 Rogue Agents — operator needs
to immediately halt all agent activity without affecting process control.

**Architecture:** Operator console ? kill switch ? all Zone 3 agents

**Design principle:**
The kill switch must be implemented at the infrastructure layer —
not in the agent itself. A compromised or rogue agent cannot be
trusted to honour a kill command sent through its own interface.
The switch must operate independently of the agent's execution path.

**Implementation:**
```python
import threading
import time
from enum import Enum
from typing import Callable

class AgentKillSwitchState(Enum):
    ACTIVE = "active"
    SUSPENDED = "suspended"
    TERMINATED = "terminated"

class AgentKillSwitch:
    """
    Infrastructure-layer kill switch for Zone 3 agent deployments.
    Implemented as a shared state object that agents check before
    every tool invocation. State changes propagate immediately.
    
    In production: back this with a distributed lock (Redis, etcd)
    so all agent instances across the cluster see the state change.
    """

    def __init__(self, agent_cluster_id: str):
        self.cluster_id = agent_cluster_id
        self._state = AgentKillSwitchState.ACTIVE
        self._lock = threading.RLock()
        self._state_change_callbacks: list[Callable] = []
        self._suspended_at: float = 0.0
        self._suspended_by: str = ""
        self._suspended_reason: str = ""

    @property
    def is_active(self) -> bool:
        return self._state == AgentKillSwitchState.ACTIVE

    def check_or_raise(self):
        """
        Call this before every tool invocation.
        Raises AgentSuspendedError if the kill switch has been activated.
        Agents call this themselves — the switch state is not injected
        via the agent's instruction path.
        """
        if not self.is_active:
            raise AgentSuspendedError(
                f"Agent cluster {self.cluster_id} is {self._state.value}. "
                f"Suspended by: {self._suspended_by}. "
                f"Reason: {self._suspended_reason}. "
                f"Contact the OT security team to reactivate."
            )

    def suspend(
        self,
        operator_id: str,
        reason: str,
        notify_process_control: bool = True
    ):
        """
        Immediately suspend all agents in the cluster.
        Call from operator console — requires authenticated operator identity.
        """
        with self._lock:
            if self._state == AgentKillSwitchState.ACTIVE:
                self._state = AgentKillSwitchState.SUSPENDED
                self._suspended_at = time.time()
                self._suspended_by = operator_id
                self._suspended_reason = reason

                # Critical: log before anything else can fail
                security_log.critical(
                    "AGENT KILL SWITCH ACTIVATED",
                    cluster_id=self.cluster_id,
                    operator_id=operator_id,
                    reason=reason,
                    timestamp=self._suspended_at
                )

                # Notify process control system to revert to manual mode
                if notify_process_control:
                    self._notify_process_control_fallback()

                # Execute registered callbacks (revoke credentials, etc.)
                for callback in self._state_change_callbacks:
                    try:
                        callback(AgentKillSwitchState.SUSPENDED, operator_id, reason)
                    except Exception as e:
                        security_log.error(f"Kill switch callback failed: {e}")

    def reactivate(self, operator_id: str, reactivation_code: str):
        """
        Reactivate agents after investigation and clearance.
        Requires two-person integrity in high-consequence environments.
        """
        if not self._verify_reactivation_authority(operator_id, reactivation_code):
            security_log.warning(
                "Unauthorised kill switch reactivation attempt",
                operator_id=operator_id
            )
            raise UnauthorisedReactivationError(
                "Reactivation requires verified operator authority"
            )

        with self._lock:
            suspension_duration = time.time() - self._suspended_at
            self._state = AgentKillSwitchState.ACTIVE
            security_log.info(
                "Agent cluster reactivated",
                cluster_id=self.cluster_id,
                operator_id=operator_id,
                suspension_duration_seconds=suspension_duration
            )

    def register_callback(self, callback: Callable):
        """Register a callback executed on kill switch activation."""
        self._state_change_callbacks.append(callback)

    def _notify_process_control_fallback(self):
        """
        Signal process control system that agent advisory is offline.
        Operators revert to manual mode — no more agent recommendations.
        Implementation depends on your DCS/SCADA integration.
        """
        # Example: write to a shared OPC-UA variable that HMI monitors
        # opcua_client.write_node("ns=2;s=AgentAdvisoryStatus", "OFFLINE")
        pass

    def _verify_reactivation_authority(self, operator_id: str, code: str) -> bool:
        """Verify operator is authorised to reactivate agents post-incident."""
        # In production: check against role-based authorisation system
        return True  # Replace with actual verification


# Usage pattern — agent calls this before every tool invocation
class SecureAgent:
    def __init__(self, kill_switch: AgentKillSwitch, credential_manager):
        self.kill_switch = kill_switch
        self.credential_manager = credential_manager

    def invoke_tool(self, tool_name: str, params: dict, session_id: str):
        # Infrastructure check first — before any agent logic
        self.kill_switch.check_or_raise()
        # Then proceed with validated tool invocation
        credential = self.credential_manager.get_session_credential(session_id)
        if not credential.permits(tool_name, "execute"):
            raise PermissionDeniedError(f"Session credential does not permit {tool_name}")
        return execute_tool(tool_name, params, credential)
```

**Crosswalk:** ASI01 · ASI10 · LLM06 · ISA/IEC 62443 SR 2.1 (OT) · EU AI Act Art. 14

---

## Recipe O-02: Agent Behavioural Baseline and Anomaly Detection

**Threat:** ASI10 Rogue Agents / ASI06 Memory Poisoning — agent
behaviour drifts from established baseline indicating compromise or
persistent goal modification.

**Implementation:**
```python
import json
import time
import statistics
from collections import defaultdict
from dataclasses import dataclass, field

@dataclass
class AgentBehaviouralBaseline:
    agent_id: str
    commissioning_period_days: int = 14
    baseline_data: dict = field(default_factory=dict)
    deviation_thresholds: dict = field(default_factory=lambda: {
        "tool_call_rate": 2.5,      # Stdev multiplier before alert
        "tool_distribution": 0.3,   # Max shift in tool usage distribution
        "response_latency": 3.0,    # Stdev multiplier before alert
        "error_rate": 5.0,          # Absolute max error rate fraction
    })

    def record_session(self, session_metrics: dict):
        """
        Record session-level metrics during commissioning and production.
        Metrics: tool_calls_per_hour, tool_distribution, avg_latency_ms, error_rate
        """
        for metric, value in session_metrics.items():
            if metric not in self.baseline_data:
                self.baseline_data[metric] = []
            self.baseline_data[metric].append(value)

    def compute_baseline(self) -> dict:
        """Compute statistical baseline from recorded sessions."""
        computed = {}
        for metric, values in self.baseline_data.items():
            if len(values) >= 5:  # Minimum sessions for meaningful baseline
                computed[metric] = {
                    "mean": statistics.mean(values),
                    "stdev": statistics.stdev(values) if len(values) > 1 else 0,
                    "n_sessions": len(values)
                }
        return computed

    def check_deviation(self, current_metrics: dict) -> list[dict]:
        """
        Compare current session metrics against baseline.
        Returns list of deviation findings — empty list means normal.
        """
        computed_baseline = self.compute_baseline()
        findings = []

        for metric, current_value in current_metrics.items():
            if metric not in computed_baseline:
                continue

            baseline = computed_baseline[metric]
            mean = baseline["mean"]
            stdev = baseline["stdev"]
            threshold = self.deviation_thresholds.get(metric, 2.0)

            if stdev > 0:
                z_score = abs(current_value - mean) / stdev
                if z_score > threshold:
                    findings.append({
                        "metric": metric,
                        "current_value": current_value,
                        "baseline_mean": mean,
                        "baseline_stdev": stdev,
                        "z_score": z_score,
                        "threshold": threshold,
                        "severity": "CRITICAL" if z_score > threshold * 2 else "WARNING"
                    })

        return findings


def evaluate_agent_session(
    agent_id: str,
    session_metrics: dict,
    baseline: AgentBehaviouralBaseline,
    kill_switch: AgentKillSwitch
):
    """
    Evaluate agent session metrics against baseline.
    Called at session end — triggers kill switch on critical deviation.
    """
    findings = baseline.check_deviation(session_metrics)
    critical_findings = [f for f in findings if f["severity"] == "CRITICAL"]
    warning_findings = [f for f in findings if f["severity"] == "WARNING"]

    if warning_findings:
        security_log.warning(
            "Agent behavioural deviation — WARNING",
            agent_id=agent_id,
            findings=warning_findings
        )
        # Alert security team — do not suspend yet

    if critical_findings:
        security_log.critical(
            "Agent behavioural deviation — CRITICAL",
            agent_id=agent_id,
            findings=critical_findings
        )
        # Automatically suspend on critical deviation
        kill_switch.suspend(
            operator_id="AUTOMATED_DETECTION",
            reason=f"Critical behavioural deviation: {[f['metric'] for f in critical_findings]}",
            notify_process_control=True
        )
        # Page security team
        alert_security_team(
            subject="Rogue agent suspected — kill switch activated",
            agent_id=agent_id,
            findings=critical_findings
        )

    # Update baseline with current session (only if no critical deviations)
    if not critical_findings:
        baseline.record_session(session_metrics)
```

**Crosswalk:** ASI10 · ASI01 · ASI06 · ISA/IEC 62443 SR 3.7 (OT) · NIST AI RMF MS-2.5

---

## Recipe O-03: Cascade Containment Architecture

**Threat:** ASI08 Cascading Agent Failures — single-agent fault
propagates to multiple systems before humans can intervene.

**Implementation:**
```python
from dataclasses import dataclass
from typing import Optional
import time

@dataclass
class CascadeContainmentPolicy:
    cluster_id: str
    max_cascade_depth: int = 3          # Max agent-to-agent hops allowed
    max_affected_systems: int = 5       # Max systems any cascade can reach
    circuit_breaker_threshold: int = 3  # Consecutive failures before open
    recovery_window_seconds: int = 120
    _circuit_open: bool = False
    _consecutive_failures: int = 0
    _circuit_opened_at: float = 0.0

    def check_cascade_depth(self, current_depth: int, initiating_agent: str) -> bool:
        """
        Prevent runaway cascade chains. Every inter-agent call increments depth.
        At max_cascade_depth, the request is rejected — not queued.
        """
        if current_depth >= self.max_cascade_depth:
            security_log.warning(
                "Cascade depth limit reached",
                cluster_id=self.cluster_id,
                depth=current_depth,
                max_allowed=self.max_cascade_depth,
                initiating_agent=initiating_agent
            )
            return False
        return True

    def check_circuit_breaker(self) -> bool:
        """
        Standard circuit breaker pattern for agent cluster.
        Returns True if the circuit is closed (requests proceed).
        """
        if self._circuit_open:
            elapsed = time.time() - self._circuit_opened_at
            if elapsed > self.recovery_window_seconds:
                # Try half-open
                self._circuit_open = False
                self._consecutive_failures = 0
                security_log.info(
                    "Circuit breaker entering half-open state",
                    cluster_id=self.cluster_id
                )
                return True
            return False
        return True

    def record_outcome(self, success: bool):
        if success:
            self._consecutive_failures = 0
        else:
            self._consecutive_failures += 1
            if self._consecutive_failures >= self.circuit_breaker_threshold:
                self._circuit_open = True
                self._circuit_opened_at = time.time()
                security_log.critical(
                    "Agent cluster circuit breaker OPENED",
                    cluster_id=self.cluster_id,
                    consecutive_failures=self._consecutive_failures
                )
                # Notify OT operations — process control reverts to manual
                notify_operations_fallback(self.cluster_id)


def agent_inter_call_gate(
    source_agent: str,
    target_agent: str,
    request: dict,
    cascade_depth: int,
    policy: CascadeContainmentPolicy,
    kill_switch: AgentKillSwitch
) -> Optional[dict]:
    """
    Gate every inter-agent call through containment checks.
    This function wraps every A2A communication in OT deployments.
    """
    # 1. Kill switch check
    kill_switch.check_or_raise()

    # 2. Circuit breaker check
    if not policy.check_circuit_breaker():
        raise CircuitOpenError(
            f"Agent cluster {policy.cluster_id} circuit breaker is open. "
            f"Recovery in {policy.recovery_window_seconds}s."
        )

    # 3. Cascade depth check
    if not policy.check_cascade_depth(cascade_depth, source_agent):
        raise CascadeDepthExceededError(
            f"Cascade depth {cascade_depth} exceeds maximum "
            f"{policy.max_cascade_depth} for cluster {policy.cluster_id}"
        )

    # 4. Log the inter-agent call for audit
    audit_log.info(
        "Inter-agent call",
        source=source_agent,
        target=target_agent,
        depth=cascade_depth,
        cluster=policy.cluster_id
    )

    # 5. Execute with outcome tracking
    try:
        result = dispatch_to_agent(target_agent, request, cascade_depth + 1)
        policy.record_outcome(True)
        return result
    except Exception as e:
        policy.record_outcome(False)
        raise
```

**Crosswalk:** ASI08 · LLM10 · DSGAI17 · ISA/IEC 62443 SR 7.6/7.7 (OT) · NIST SP 800-82 (OT)

---

## Recipe O-04: Human Confirmation Gate for Irreversible OT Actions

**Threat:** LLM06 Excessive Agency / ASI02 Tool Misuse — agent
autonomously executes an irreversible action in the OT environment.

**Design principle:**
The confirmation gate must be implemented as a separate service from
the agent. If the gate lives inside the agent's execution context,
it can be bypassed by goal hijack. The gate is an independent trust
boundary — it validates human intent, not agent intent.

**Implementation:**
```python
import uuid
import time
import hmac
import hashlib

class HumanConfirmationGate:
    """
    Out-of-band human confirmation for irreversible OT agent actions.
    The confirmation token is issued by the gate, validated by the gate,
    and consumed once. The agent never generates or validates its own
    confirmation tokens.
    """

    def __init__(self, secret_key: bytes, token_ttl_seconds: int = 300):
        self.secret_key = secret_key
        self.token_ttl = token_ttl_seconds
        self._pending: dict[str, dict] = {}
        self._consumed: set[str] = set()

    def request_confirmation(
        self,
        agent_id: str,
        action_type: str,
        action_description: str,
        target_system: str,
        parameters: dict,
        requestor_user_id: str
    ) -> str:
        """
        Create a confirmation request. Returns a request_id for display.
        The operator receives this request on a SEPARATE channel
        (HMI, mobile app, email) — not through the agent interface.
        """
        request_id = str(uuid.uuid4())
        self._pending[request_id] = {
            "agent_id": agent_id,
            "action_type": action_type,
            "action_description": action_description,
            "target_system": target_system,
            "parameters": parameters,
            "requestor_user_id": requestor_user_id,
            "requested_at": time.time(),
            "expires_at": time.time() + self.token_ttl,
        }

        # In production: push notification to operator via separate channel
        # push_to_operator_console(requestor_user_id, request_id, action_description)
        # or: send_oob_notification(requestor_user_id, request_id, action_description)

        audit_log.info(
            "Human confirmation requested",
            request_id=request_id,
            agent_id=agent_id,
            action_type=action_type,
            target_system=target_system,
            requestor=requestor_user_id
        )
        return request_id

    def operator_approve(
        self,
        request_id: str,
        approving_operator_id: str,
        approver_pin: str
    ) -> str:
        """
        Operator approves the action through the HMI or out-of-band channel.
        Returns a one-time confirmation token the agent submits with its call.
        """
        if request_id not in self._pending:
            raise ConfirmationNotFoundError(f"No pending request: {request_id}")

        pending = self._pending[request_id]
        if time.time() > pending["expires_at"]:
            del self._pending[request_id]
            raise ConfirmationExpiredError(f"Request {request_id} expired")

        # Verify operator authorisation
        if not self._verify_operator(approving_operator_id, approver_pin, pending):
            security_log.warning(
                "Confirmation approval rejected — operator not authorised",
                request_id=request_id,
                operator_id=approving_operator_id
            )
            raise UnauthorisedApprovalError("Operator not authorised for this action type")

        # Generate one-time token
        token_data = f"{request_id}:{approving_operator_id}:{time.time()}"
        token = hmac.new(
            self.secret_key,
            token_data.encode(),
            hashlib.sha256
        ).hexdigest()

        pending["approved_by"] = approving_operator_id
        pending["approved_at"] = time.time()
        pending["token"] = token

        audit_log.info(
            "Human confirmation approved",
            request_id=request_id,
            approved_by=approving_operator_id,
            action_type=pending["action_type"]
        )
        return token

    def validate_and_consume(self, request_id: str, token: str) -> dict:
        """
        Agent submits this before executing the confirmed action.
        Token is consumed — cannot be reused.
        """
        if request_id in self._consumed:
            raise TokenAlreadyConsumedError(f"Token {request_id} already used")

        if request_id not in self._pending:
            raise ConfirmationNotFoundError(f"No pending request: {request_id}")

        pending = self._pending[request_id]

        if time.time() > pending["expires_at"]:
            del self._pending[request_id]
            raise ConfirmationExpiredError(f"Confirmation {request_id} expired")

        if "token" not in pending:
            raise ConfirmationNotApprovedError(f"Request {request_id} not yet approved")

        if not hmac.compare_digest(pending["token"], token):
            security_log.critical(
                "Invalid confirmation token submitted",
                request_id=request_id
            )
            raise InvalidTokenError("Confirmation token invalid")

        # Consume the token — one-time use
        self._consumed.add(request_id)
        del self._pending[request_id]

        audit_log.info(
            "Confirmation token consumed — action authorised",
            request_id=request_id,
            action_type=pending["action_type"],
            target_system=pending["target_system"]
        )
        return pending

    def _verify_operator(
        self,
        operator_id: str,
        pin: str,
        pending_request: dict
    ) -> bool:
        """
        Verify operator is authorised to approve this action type.
        In production: check against your OT authorisation system.
        """
        # Example: different action types require different operator roles
        APPROVAL_AUTHORITY = {
            "setpoint_adjust": ["control_engineer", "shift_supervisor"],
            "work_order_create": ["maintenance_engineer", "shift_supervisor"],
            "alarm_acknowledge": ["operator", "control_engineer", "shift_supervisor"],
            "emergency_shutdown": ["shift_supervisor"],  # Supervisor only
        }
        action_type = pending_request.get("action_type")
        required_roles = APPROVAL_AUTHORITY.get(action_type, ["operator"])
        operator_roles = get_operator_roles(operator_id)
        return any(role in required_roles for role in operator_roles)
```

**Crosswalk:** LLM06 · ASI01 · ASI02 · ISA/IEC 62443 SR 2.1 (OT) · EU AI Act Art. 14 · NIST SP 800-82 (OT)

---

# Appendix — Recipe to Risk Mapping

## Source list coverage

| Recipe | OWASP source list entries covered |
|---|---|
| R-01 Access-Controlled Retrieval | LLM02 · DSGAI01 · DSGAI11 |
| R-02 Ingestion Pipeline Integrity | LLM04 · DSGAI05 · DSGAI13 |
| R-03 Output Redaction | LLM02 · DSGAI01 · DSGAI09 · DSGAI14 |
| R-04 RAG Circuit Breaker | DSGAI17 · ASI08 · LLM10 |
| R-05 Telemetry Least-Logging | DSGAI14 · LLM07 |
| M-01 MCP Input Validation | ASI02 · LLM05 · LLM06 · DSGAI06 |
| M-02 Descriptor Integrity | ASI04 · LLM03 · DSGAI04 |
| M-03 Per-Session Credentials | ASI03 · DSGAI02 |
| M-04 Rate Limiting & Anomaly | LLM10 · ASI08 · DSGAI17 |
| O-01 Kill Switch | ASI01 · ASI10 · LLM06 |
| O-02 Behavioural Baseline | ASI10 · ASI01 · ASI06 |
| O-03 Cascade Containment | ASI08 · LLM10 · DSGAI17 |
| O-04 Human Confirmation Gate | LLM06 · ASI01 · ASI02 |

## Framework control coverage

| Recipe | Primary framework controls |
|---|---|
| R-01 | ISO 27001 A.8.3 · NIST AI RMF MS-2.5 · ASVS V4.1 |
| R-02 | ISO 27001 A.8.26/A.8.28 · CIS Controls CIS 16 · ASVS V12 |
| R-03 | ISO 27001 A.8.11/A.8.12 · NIST AI RMF GV-1.6 |
| R-04 | ISA/IEC 62443 SR 7.6 · NIST SP 800-82 |
| R-05 | ISO 27001 A.8.15 · GDPR Art. 32 |
| M-01 | ASVS V5.1 · CIS Controls CIS 16 · ISO 27001 A.8.28 |
| M-02 | ISO 27001 A.5.19/A.5.21 · NIST AI RMF MP-5.1 |
| M-03 | OWASP NHI NHI-5/7/9 · ISO 27001 A.8.2 · AIUC-1 A/B007 |
| M-04 | CIS Controls CIS 12 · ISA/IEC 62443 SR 7.6 |
| O-01 | ISA/IEC 62443 SR 2.1 · EU AI Act Art. 14 · NIST SP 800-82 |
| O-02 | ISA/IEC 62443 SR 3.7 · NIST AI RMF MS-2.5 |
| O-03 | ISA/IEC 62443 SR 7.6/7.7 · NIST AI RMF MP-4.1 |
| O-04 | EU AI Act Art. 14 · ISA/IEC 62443 SR 2.1 · NIST SP 800-82 |

---

## References

- [OWASP GenAI Data Security Risks 2026](https://genai.owasp.org/resource/owasp-genai-data-security-risks-mitigations-2026/)
- [OWASP LLM Top 10 2025](https://genai.owasp.org/llm-top-10/)
- [OWASP Agentic Top 10 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
- [ISA/IEC 62443 series](https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series-of-standards)
- [NIST SP 800-82 Rev 3](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-82r3.pdf)
- [MCP Security Best Practices](https://modelcontextprotocol.io/docs/concepts/security)
- [HashiCorp Vault Dynamic Secrets](https://developer.hashicorp.com/vault/docs/secrets/databases)
- [SPIFFE Workload Identity](https://spiffe.io/docs/latest/spiffe-about/overview/)

---

## Changelog

| Date | Version | Change | Author |
|---|---|---|---|
| 2026-03-24 | 2026-Q1 | Initial release — 13 recipes across RAG, MCP, and OT patterns | OWASP GenAI Data Security Initiative |

---

*Part of the [GenAI Security Crosswalk](https://github.com/emmanuelgjr/GenAI-Security-Crosswalk) —
maintained by the [OWASP GenAI Data Security Initiative](https://genai.owasp.org)*
