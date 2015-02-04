lint:
	eslint collection.js

lintall:
	eslint collection.js collection.spec.js

testCollection:
	mocha collection.spec.js

test: testCollection

all: lint test
