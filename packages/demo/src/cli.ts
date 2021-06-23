import { Command } from 'commander';

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
  .command('info', 'Output GS Demo information', { executableFile: path.join(__dirname, 'command/info.js')})
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

      const { list, create, tag, info } = options;

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
