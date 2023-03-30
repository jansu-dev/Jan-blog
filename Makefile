all: build

build:
	python3 make_sidebar.py
	yarn docs:build

test:
	python3 make_sidebar.py
	yarn docs:dev