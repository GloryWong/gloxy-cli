import { Command } from 'commander';

// TODO: choose demo from list
// TODO: direct choose demo
// TODO: create demo
// TODO: remove demo to trash

import _ from 'lodash';
import log from '@glorywong/log';
import { prompt } from 'enquirer';
import * as types from './lib/types';
import { hasInited } from './core/initGSDemo';
import path from 'path';
import { getDemoList } from './core/demoList';
import { createDemo } from './core/demo';

const program = new Command();
program
  .version('1.0.0')
  .command('init [path]', 'Init GS Demo', { executableFile: path.join(__dirname, 'cli/init.js') })
  .command('archive', 'Archive GS Demo', { executableFile: path.join(__dirname, 'cli/archive.js')})
  .option('-l, --list', 'list all demos')
  .option('-c, --create <name>', 'create a demo')
  .action(function (options) {
    try {
      if (!hasInited()) {
        log.warning('Please init GS Demo first.');
        return;
      }

      if (_.isEmpty(options)) {
        listDemos();
      }

      const { list, create: demoName } = options;

      if (list) {
        listDemos();
        return;
      }

      if (demoName) {
        createDemo(demoName);
      }
    } catch (error) {
      log.error('ERROR:', error);
    }
  })
  .parse();

function listDemos(): void {
  try {
    const list: types.DemoList = getDemoList();
    list.forEach(({ code, name }) => {
      log.info('[', 'success:', code, 'info:', ']', name);
    });
  } catch (error) {
    log.error('list demos failed:', error);
  }
}

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
