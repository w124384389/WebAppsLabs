lint:
	eslint task.js collection.js

lintall:
	eslint task.js collection.js task.spec.js collection.spec.js

testTask:
	mocha task.spec.js

testCollection:
	mocha collection.spec.js

test: testTask testCollection

all: lint test
