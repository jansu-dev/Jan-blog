all: build push

build:
	python3 make_sidebar.py
	yarn docs:build

push:
	git push blog master
	
