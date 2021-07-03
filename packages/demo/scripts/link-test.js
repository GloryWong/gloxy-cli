#!/usr/bin/env node

'use strict'

const globalDirs = require('global-dirs');
const symlinkDir = require('symlink-dir');
const chalk = require('chalk');
const path = require('path');
const { unlink, chmod } = require('fs/promises');
const { unilog } = require('@gloxy/unilog');

const CLI_NAME = 'gdemo-test';
const cliPath = path.join(globalDirs.npm.binaries, CLI_NAME);

unilog(`Global symbolic link bin ${chalk.yellow.bold(CLI_NAME)}`);
if (process.argv[2] === '--not') {
  unlink(cliPath)
    .then(() => unilog.succeed('removed.'))
    .catch(err => unilog.fail('failed to remove', err));
} else {
  // symlink gdemo-test to global bin
  const ori = path.resolve(__dirname, '..', 'bin/demo-test.js');
  chmod(ori, 0o755)
    .then(() => symlinkDir(ori, cliPath))
    .then(() => unilog.succeed('created.'))
    .catch(err => unilog.fail('failed to create', err));
}