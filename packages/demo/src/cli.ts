import { Command, description } from 'commander';

// TODO: choose demo from list
// TODO: direct choose demo
// TODO: remove demo to trash

import _ from 'lodash';
import log from '@glorywong/log';
import { initCLIOrWarning } from './command-helper/init';
import path from 'path';
import { listAllDemos, searchAndChooseDemo } from './option/demoList';
import { createDemo } from './option/demo';
import { gsDemoVersion, gsDemoDescription } from './command-helper/info';

const program = new Command();
program
  .version(gsDemoVersion)
  .description(gsDemoDescription)
  .arguments('[demoSelector]')
  .command('init [path]', 'Init a GS Demo', { executableFile: path.join(__dirname, 'command/init.js') })
  .command('archive', 'Archive existing GS Demo', { executableFile: path.join(__dirname, 'command/archive.js')})
  .option('-l, --list', 'list all demos')
  .option('--create <name>', 'create a demo')
  .option('--tag <tags...>', 'use tags')
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
    } catch (error) {
      log.error('ERROR:', error);
    }
  })
  .parse();
