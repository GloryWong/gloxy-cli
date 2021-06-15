import { Command } from 'commander';

// TODO: choose demo from list
// TODO: direct choose demo
// TODO: remove demo to trash

import _ from 'lodash';
import log from '@glorywong/log';
import { prompt } from 'enquirer';
import * as types from './lib/types';
import { readPackageJson } from './lib/utility';
import { initCLIOrWarning } from './command-helper/init';
import path from 'path';
import { listAllDemos, searchAndChooseDemo } from './option/demoList';
import { createDemo, openDemo, removeDemo } from './option/demo';

const program = new Command();
program
  .version(readPackageJson('version'))
  .description(readPackageJson('description'))
  .arguments('[demoSelector]')
  .command('init [path]', 'Init GS Demo', { executableFile: path.join(__dirname, 'command/init.js') })
  .command('archive', 'Archive GS Demo', { executableFile: path.join(__dirname, 'command/archive.js')})
  .option('-l, --list', 'list all demos')
  .option('--create <name>', 'create a demo')
  .option('--tag <tags...>', 'use tags')
  .option('--remove <code>', 'remove a demo with its code')
  .action(async function (demoSelector, options) {
    try {
      if (!demoSelector && _.isEmpty(options)) {
        program.help();
        return;
      }

      if (!initCLIOrWarning()) {
        return;
      }

      if (demoSelector) {
        await searchAndChooseDemo(demoSelector);
        return;
      }

      const { list, create, tag, remove } = options;

      if (list) {
        listAllDemos();
        return;
      }

      if (create) {
        createDemo(create);
        log.success('demo\'', create, '\'created');
        return;
      }

      if (remove) {
        await removeDemo(remove);
      }
    } catch (error) {
      log.error('ERROR:', error);
    }
  })
  .parse();
