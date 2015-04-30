-COVERAGE_DIR := out/test/

-BIN_MOCHA := ./node_modules/.bin/mocha
-BIN_ISTANBUL := ./node_modules/.bin/istanbul

-TESTS := $(shell find test -type f -name 'test-*')

-COVERAGE_TESTS := $(addprefix $(-COVERAGE_DIR),$(-TESTS))

default: dev

dev: clean
	@$(-BIN_MOCHA) \
		--colors \
		--reporter list \
		--growl \
		$(-TESTS)

test: clean
	@$(-BIN_MOCHA) \
		--reporter tap \
		$(-TESTS)

release: dev
	@echo "done"

-pre-test-cov: clean
	@echo 'copy files'
	@mkdir -p $(-COVERAGE_DIR)

	@rsync -av . $(-COVERAGE_DIR) --exclude out --exclude .git --exclude node_modules
	@rsync -av ./node_modules $(-COVERAGE_DIR)
	@find ./out/test -path ./out/test/node_modules -prune -o -name "*.coffee" -exec rm -rf {} \;

test-cov: -pre-test-cov
	@cd $(-COVERAGE_DIR) && \
		$(-BIN_ISTANBUL) cover ./node_modules/.bin/_mocha -- -u bdd -R tap $(patsubst $(-COVERAGE_DIR)%, %, $(-COVERAGE_TESTS)) && \
	  $(-BIN_ISTANBUL) report html

.-PHONY: default

clean:
	@echo 'clean'
	@-rm -fr out/test
	@-rm -fr out
