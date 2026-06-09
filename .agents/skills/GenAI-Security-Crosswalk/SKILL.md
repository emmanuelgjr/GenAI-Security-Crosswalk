```markdown
# GenAI-Security-Crosswalk Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the GenAI-Security-Crosswalk JavaScript codebase. It covers file naming, import/export styles, commit message conventions, and testing patterns, providing clear examples and actionable commands to streamline your workflow.

## Coding Conventions

### File Naming
- Use **snake_case** for all file names.
  - Example:  
    ```
    user_profile.js
    security_crosswalk.test.js
    ```

### Import Style
- Use **relative imports** to reference other modules.
  - Example:
    ```javascript
    import { validateUser } from './user_utils.js';
    ```

### Export Style
- Use **named exports** for functions, constants, or objects.
  - Example:
    ```javascript
    // In user_utils.js
    export function validateUser(user) { ... }
    export const USER_ROLE = 'admin';
    ```

### Commit Message Conventions
- Use **conventional commit** format.
- Prefix commit messages with the type, such as `fix`.
- Example:
  ```
  fix: handle null input in validateUser (prevents crash)
  ```

## Workflows

### Fixing a Bug
**Trigger:** When you identify a bug in the codebase  
**Command:** `/fix-bug`

1. Create a new branch for your fix.
2. Locate the problematic code and apply the fix.
3. Write or update a test in a `*.test.js` file to cover the bug.
4. Commit your changes using the conventional format:
    ```
    fix: [short description of the fix]
    ```
5. Push your branch and open a pull request.

### Adding a New Module
**Trigger:** When you need to add new functionality  
**Command:** `/add-module`

1. Create a new file using snake_case naming.
2. Write your code, using named exports.
3. Import any dependencies using relative paths.
4. Add corresponding test files following the `*.test.js` pattern.
5. Commit with a descriptive message, e.g.:
    ```
    feat: add user authentication module
    ```
6. Push and open a pull request.

## Testing Patterns

- Test files follow the `*.test.js` naming pattern and are placed alongside or near the modules they test.
- The testing framework is not explicitly specified; check existing test files for style.
- Example test file:
    ```javascript
    // user_utils.test.js
    import { validateUser } from './user_utils.js';

    test('validateUser returns true for valid user', () => {
      const user = { name: 'Alice', role: 'admin' };
      expect(validateUser(user)).toBe(true);
    });
    ```

## Commands
| Command     | Purpose                                   |
|-------------|-------------------------------------------|
| /fix-bug    | Start the bug fixing workflow             |
| /add-module | Add a new module following conventions    |
```
