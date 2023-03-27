all: build

build:
	python3 make_sidebar.py
	yarn docs:build
