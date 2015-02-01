lint:
	eslint controller.js

lintall: lint

test:

all: lint test
