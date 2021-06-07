import { readdirSync } from 'fs';
import { DEMOS_DIR } from './constant';
import * as log from '@glorywong/log';
import { prompt } from 'enquirer';

type List = Array<{ code: number, name: string }>;

function isNumberString(str: string): boolean {
  return /^\d+$/.test(str);
}

function getList(): List {
  try {
    const files: string[] = readdirSync(DEMOS_DIR);
    return files.map((file, index) => {
      return {
        code: index,
        name: file
      };
    });
  } catch (error) {
    log.error('get demo list failed:', error);
    return [];
  }
}

function listDemos(): void {
  try {
    const list: List = getList();
    list.forEach(({ code, name }) => {
      log.info('[', 'success:', code, 'info:', ']', name);
    });
  } catch (error) {
    log.error('list demos failed:', error);
  }
}

async function selectDemo(): Promise<void> {
  try {
    const list: List = getList();
    const { demoFlag }: { demoFlag: string } = await prompt({
      type: 'input',
      name: 'demoFlag',
      message: 'Input demo code or name'
    });
    
    const demo = list.find(({ code, name }) => {
      if (isNumberString(demoFlag)) {
        return code === Number(demoFlag);
      } else {
        return name === demoFlag;
      }
    });

    if (!demo) {
      throw `Demo '${demo}' dose not exist`;
    }

    log.success(`You select demo ${demo.name}`);
  } catch (error) {
    log.error('select a demo failed:', error);
  }
}

export {
  listDemos,
  selectDemo
}