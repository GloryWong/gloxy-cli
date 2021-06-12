import { Command } from 'commander';

// TODO: choose demo from list
// TODO: direct choose demo
// TODO: remove demo to trash

import _ from 'lodash';
import log from '@glorywong/log';
import { prompt } from 'enquirer';
import * as types from './lib/types';
import { readPackageJson } from './lib/utility';
import { initCLIOrWarning } from './cli-helper/init';
import path from 'path';
import { createDemo } from './core/demo';
import { listDemos } from './option/demoList';
import { openDemo, removeDemo } from './option/demo';

new Command()
  .version(readPackageJson('version'))
  .description(readPackageJson('description'))
  .arguments('[demoCode]')
  .command('init [path]', 'Init GS Demo', { executableFile: path.join(__dirname, 'command/init.js') })
  .command('archive', 'Archive GS Demo', { executableFile: path.join(__dirname, 'command/archive.js')})
  .option('-l, --list', 'list all demos')
  .option('-c, --create <name>', 'create a demo')
  .option('-t, --tag <tags...>', 'use tags')
  .option('-r, --remove <code>', 'remove a demo with its code')
  .action(async function (demoCode, options) {
    try {
      if (!initCLIOrWarning()) {
        return;
      }

      // list demos by default if empty arguments
      if (!demoCode && _.isEmpty(options)) {
        listDemos();
        return;
      }

      if (demoCode) {
        openDemo(demoCode);
        return;
      }

      const { list, create, tag, remove } = options;

      if (list) {
        listDemos();
        return;
      }

      if (create) {
        createDemo(create, tag);
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

// async function selectDemo(): Promise<void> {
//   try {
//     const list: types.DemoList = getDemoList();
//     const { demoFlag }: { demoFlag: string } = await prompt({
//       type: 'input',
//       name: 'demoFlag',
//       message: 'Input demo code or name'
//     });

//     const demo = list.find(({ code, name }) => {
//       if (isNumberString(demoFlag)) {
//         return code === Number(demoFlag);
//       } else {
//         return name === demoFlag;
//       }
//     });

//     if (!demo) {
//       throw `Demo '${demo}' dose not exist`;
//     }

//     log.success(`You select demo ${demo.name}`);
//   } catch (error) {
//     log.error('select a demo failed:', error);
//   }
// }
