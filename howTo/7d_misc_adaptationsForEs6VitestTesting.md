# Adaptions needed to use Vitest with ES6 over Common JS modules and in place of Jest

[Return to the README file](../README.md)

The convoluted title to this section is due to the winding path that led here. In the original version of this project I was using Jest to test the API written with Common JS modules and all was good. Then, when I decided to re-write the project to use ES6 modules, I discovered (again) that Jest is a pain in the butt to use with ES6 modules and has sketchy support. At this point I decided to try and use **Vitest** to see if I could overcome these issues. The answer is yes, mostly, but I also found new issues which were time-consuming to overcome.

**NOTE:** You can see this project [using Jest](https://github.com/pablisch/how-to-es6-express-mongodb-todo-api), or if you prefer, [using Common JS modules and Jest](https://github.com/pablisch/how-to-express-mongodb-todo-api).

Problems solved using Vitest in place of Jest:
- No longer need to use `.mjs` extension for test files
- No need to import `jest` explicitly to use `fn()`
- No longer need to include an environment variable in the test run script
- No need for a config file
- No longer concerned about wider use, e.g. with React (in terms of the frameworks lack of support for ES6 modules)

Problems using Vitest in place of Jest:
- Less mature ecosystem and less use means less support information available for Vitest
- Harder to configure, e.g. running tests in series rather than in parallel

## What had to be done differently?

Very little, especially in relation between moving from Common JS modules with Jest to ES6 modules with Vitest.

Syntax wise, in code, the only real difference was switching from `jest.fn()` to `vi.fn()` which was seamless.

The run commands are different which actually took the longest time to fix just to get all tests to run in series. Jest has a command that sorts this out, `--runInBand`, but for Vitest I had long given up before finding `--fileParallelism=false` did the same.

Of course, you need to import different dev dependencies as expected for Vitest rather than Jest.

## My test run script

Most of my issues were solved by finding the right script for me and this setup:
```bash
"test": "vitest run --globals --fileParallelism=false --silent",
"test:verb": "vitest run --globals --fileParallelism=false --reporter=verbose",
"test:app": "vitest run --globals --reporter=verbose app",
"test:con": "vitest run --globals --reporter=verbose con",
```

**NOTES:**
- `vitest` is the run command for the tests
- `--run` tells the test to run through once and stop whereas the default is to `watch`.
- `--globals` uses global imports so that I do not have to import `describe`, `test`, etc. which would also have been easy enough to do
- `--fileParallelism=false` sets files to not run in parallel which I found after much fruitless searching
- `--silent` stops much of the noise by not listing all the tests that ran except where relevant to a failed test
- `--reporter=verbose` uses verbose reporting but this did not seem to make any difference so either it is default or needs to run into an error to see the difference
- `app` and `con` are simply regex patterns that tell the test run to run the `app.js` or `todoController.js` tests
- The `test` script runs all the tests for all files in series
- The `test:verb` script runs all the tests for all files in series with verbose reporting
- The `test:app` test runs all the `app` tests
- The `test:con` test runs all the `controller` tests

By default, tests in a file run in serial whilst different files run in parallel. There appears to be plenty of information about making tests run in parallel, but it was much less clear to me how to make different files run in serial. In the end it was Claude and a config file that solved it before I later found a command to put in the script to do the same thing.

## Vitest config

After many, many suggestions, I found the right config to achieve what I needed and make each file run separately in serial. I do not know that all of this config is necessary but certainly, the sum of it achieves what I wanted and that worked for me. I have now removed it in favour of using `--fileParallelism=false` in the run script.

In `vitest.congfig.ts`:
```javascript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Force a single thread to prevent parallel file execution
    pool: 'forks',
    poolOptions: {
      threads: {
        maxThreads: 1,
        minThreads: 1
      }
    },
    sequence: {
      concurrent: false
    },
    // Ensure files are processed one at a time
    fileParallelism: false
  }
})
```

## The verdict

Use Vitest!

It is harder to find support but it does basically work whereas Jest does not seem to have moved beyond Common JS modules.

[Return to the README file](../README.md)