.PHONY: install index classify eval clean

PYTHON ?= python

install:
	pip install -r requirements.txt

index:
	$(PYTHON) -m classifier.index_builder

classify:
	$(PYTHON) -m classifier.classify $(ARGS)

eval:
	$(PYTHON) -m classifier.eval_harness

splits:
	$(PYTHON) -m classifier.split_maker

clean:
	rm -rf index/ splits/*.json __pycache__ *.pyc
