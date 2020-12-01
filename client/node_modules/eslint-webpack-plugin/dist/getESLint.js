"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadESLint = loadESLint;
exports.loadESLintThreaded = loadESLintThreaded;
exports.default = getESLint;

var _os = _interopRequireDefault(require("os"));

var _jestWorker = _interopRequireDefault(require("jest-worker"));

var _options = require("./options");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @typedef {import('eslint').ESLint} ESLint */

/** @typedef {import('eslint').ESLint.LintResult} LintResult */

/** @typedef {import('./options').Options} Options */

/** @typedef {() => Promise<void>} AsyncTask */

/** @typedef {(files: string|string[]) => Promise<LintResult[]>} LintTask */

/** @typedef {JestWorker & {lintFiles: LintTask}} Worker */

/** @typedef {{threads: number, ESLint: ESLint, eslint: ESLint, lintFiles: LintTask, cleanup: AsyncTask}} Linter */

/**
 * @param {Options} options
 * @returns {Linter}
 */
function loadESLint(options) {
  const {
    eslintPath
  } = options;

  const {
    ESLint
  } = require(eslintPath || 'eslint'); // Filter out loader options before passing the options to ESLint.


  const eslint = new ESLint((0, _options.getESLintOptions)(options));
  const lintFiles = eslint.lintFiles.bind(eslint);
  return {
    threads: 1,
    ESLint,
    eslint,
    lintFiles,
    // no-op for non-threaded
    cleanup: async () => {}
  };
}
/**
 * @param {number} poolSize
 * @param {Options} options
 * @returns {Linter}
 */


function loadESLintThreaded(poolSize, options) {
  const {
    eslintPath = 'eslint'
  } = options;

  const source = require.resolve('./worker');

  const workerOptions = {
    enableWorkerThreads: true,
    numWorkers: poolSize,
    setupArgs: [{
      eslintPath,
      eslintOptions: (0, _options.getESLintOptions)(options)
    }]
  };
  const local = loadESLint(options);
  /** @type {Worker} */
  // prettier-ignore

  const worker =
  /** @type {Worker} */
  new _jestWorker.default(source, workerOptions);
  return { ...local,
    threads: poolSize,
    lintFiles: files => worker.lintFiles(files),
    cleanup: async () => {
      worker.end();
    }
  };
}
/**
 * @param {Options} options
 * @returns {Linter}
 */


function getESLint({
  threads,
  ...options
}) {
  const max = typeof threads !== 'number' ? threads ? _os.default.cpus().length - 1 : 1 :
  /* istanbul ignore next */
  threads;
  return max > 1 ? loadESLintThreaded(max, options) : loadESLint(options);
}