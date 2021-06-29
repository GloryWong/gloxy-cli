import { Command } from 'commander';

import _ from 'lodash';
import { initCLIOrWarning } from './command-helper/init';
import path from 'path';
import { listAllDemos, searchAndChooseDemo } from './option/demoList';
import { createDemo } from './option/demo';
import { cliVersion, cliDescription, cliUsage } from './command-helper/cliInfo';
import unilog from '@glorywong/unilog';

const program = new Command();
program
  .version(cliVersion)
  .description(cliDescription)
  .usage(cliUsage)
  .arguments('[demoSelector]')
  .command('init [path]', 'Init a GS Demo', { executableFile: path.join(__dirname, 'command/init.js') })
  .command('archive', 'Archive existing GS Demo', { executableFile: path.join(__dirname, 'command/archive.js')})
  .command('info', 'Output GS Demo information', { executableFile: path.join(__dirname, 'command/info.js')})
  .option('-l, --list', 'list all demos')
  .option('-c, --create <name>', 'create a demo')
  .option('--tag <tags...>', 'use tags')
  .action(async function (demoSelector: string, options: any) {
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

      const { list, create } = options;

      if (list) {
        listAllDemos();
        return;
      }

      if (create) {
        createDemo(create);
        return;
      }
    } catch (error) {
      unilog('Demo CLI').fail(error);
    }
  })
  .parse();
