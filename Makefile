lint:
	eslint dllist.js history.js

lintall:
	eslint dllist.js dllist.spec.js history.js history.spec.js

test:
	mocha dllist.spec.js history.spec.js

all: lint test
