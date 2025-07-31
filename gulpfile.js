/**
 * TASK OCHESTRATION & AUTOMATION
 */

const { series } = require("gulp");

exports.lint = require("./tasks/gulp/lint");
exports.default = series(exports.lint);
