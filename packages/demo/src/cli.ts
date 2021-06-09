import { Command } from 'commander';

// TODO: list demos
// TODO: choose demo from list
// TODO: direct choose demo
// TODO: create demo
// TODO: remove demo to trash

import _ from 'lodash';
import log from '@glorywong/log';
import { prompt } from 'enquirer';
import * as types from './types';
import { hasInited, initGSDemo } from './init';
import { archiveGSDemo } from './archive';

const program = new Command();
program
  .version('1.0.0')
  .option('--init [path]', 'init GS Demo')
  .option('-l, --list', 'list all demos')
  .option('-c, --create <name>', 'create a demo')
  .option('--archive', 'archive GS Demo')
  .action(function (options) {
    const { init: gsDemoPath, list, create: demoName, archive } = options;

    if (gsDemoPath) {
      initGSDemo(typeof gsDemoPath === 'string' ? gsDemoPath : '');
      return;
    }

    if (!hasInited()) {
      log.warning('Please init GS Demo first.');
      return;
    }

    if (archive) {
      archiveGSDemo();
      return;
    }

    if (_.isEmpty(options)) {
      //
    }

    if (list) {
      // listDemos();
    }

    if (demoName) {
      // createDemo(demoName);
    }
  })
  .parse();

// function listDemos(): void {
//   try {
//     const list: List = getDemoList();
//     list.forEach(({ code, name }) => {
//       log.info('[', 'success:', code, 'info:', ']', name);
//     });
//   } catch (error) {
//     log.error('list demos failed:', error);
//   }
// }

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
