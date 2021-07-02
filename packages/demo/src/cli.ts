import './env';
import { Command } from 'commander';
import _ from 'lodash';
import { initCLIOrWarning } from './command-helper/init';
import path from 'path';
import { listAllDemos, searchAndChooseDemo } from './option/demoList';
import { createDemo } from './option/demo';
import { cliVersion, cliDescription, cliUsage } from './command-helper/cliInfo';
import { unilog } from '@gloxy/unilog';
import { lockStudio } from './option/studio';

const program = new Command();
program
  .version(cliVersion)
  .description(cliDescription)
  .usage(cliUsage)
  .arguments('[demoSelector]')
  .command('init [path]', 'Init a studio', { executableFile: path.join(__dirname, 'command/init.js') })
  .command('archive', 'Archive existing studio', { executableFile: path.join(__dirname, 'command/archive.js')})
  .command('info', 'Display studio information', { executableFile: path.join(__dirname, 'command/info.js')})
  .option('-l, --list', 'list all demos')
  .option('-c, --create <name>', 'create a demo')
  .option('--tag <tags...>', 'use tags')
  .option('--lock', 'lock studio')
  .option('--no-lock', 'unlock studio')
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

      const { list, create, lock } = options;

      if (list) {
        listAllDemos();
        return;
      }

      if (create) {
        createDemo(create);
        return;
      }

      if (lock !== undefined) {
        lockStudio(lock);
        return;
      }
    } catch (error) {
      unilog('Demo CLI').fail(error);
    }
  })
  .parse();
