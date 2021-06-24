import { getDemoIndex, searchDemoIndex } from '../core/demoIndex';
import { prompt } from 'inquirer';
import * as demo from './demo';
import { DemoIndex } from '../lib/types';
import * as types from '../lib/types';
import boxen from 'boxen';
import columns from 'cli-columns';
import chalk from 'chalk';
import ora from 'ora';

function __listDemos(list: DemoIndex): boolean {
  try {
    if (!list.length) {
      return false;
    }

    const formatedList = list.map(({ code, name }: { code: number, name: string }) => {
      return `[${chalk.bold.green(code)}] ${chalk.bold(name)}`;
    });

    console.log(
      boxen(
        columns(formatedList),
        {
          padding: 1,
          borderColor: 'gray'
        }
      )
    );

    return true;
  } catch (error) {
    throw `__listDemos failed: ${error}`;
  }
}

async function __chooseDemo(demoIndex: types.DemoIndex): Promise<boolean> {
  try {
    const { input } = await prompt({
      type: 'input',
      name: 'input',
      message: 'Choose a correct demo code (open demo by default):'
    });

    // parse input: -r for resuing window, -a for archiving demo
    const matches = input.trim().match(/^(-r\s+)?(-a\s+)?(\d+)(\s+-r)?(\s+-a)?$/);
    if (!matches) {
      return false;
    }
    const reuseWindow = Boolean(matches[1]) || Boolean(matches[4]);
    const archiveDemo = Boolean(matches[2]) || Boolean(matches[5]);
    const demoCode = matches[3];

    const demoIndexItem = demoIndex.find(({ code }) => Number(demoCode) === code);
    if (!demoIndexItem) {
      return false;
    }

    const { id: demoId } = demoIndexItem;
    // archive demo
    if (archiveDemo) {
      demo.archiveDemo(demoId);
      return true;
    }

    demo.openDemo(demoId, reuseWindow);
    return true;
  } catch (error) {
    throw `__chooseDemo failed: ${error}`;
  }
}

function listAllDemos() {
  const spinner = ora(`Loading all demos`);
  try {
    const demoIndex = getDemoIndex();
    spinner.succeed(`${chalk.bold(demoIndex.length)} demo(s) found`);
    __listDemos(demoIndex);
  } catch (error) {
    spinner.fail('Failed to list all demos');
    console.error(error);
  }
}

async function searchDemos(str: string): Promise<types.DemoIndex> {
  const spinner = ora(`Searching ${chalk.bold.yellow(str)}`).start();
  try {
    const demoIndex = searchDemoIndex(str);
    spinner.succeed(`${chalk.bold(demoIndex.length)} demo(s) found matched ${chalk.bold.yellow(str)}`);
    
    if (demoIndex.length === 0) {
      const { question } = await prompt({
        type: 'confirm',
        name: 'question',
        message: `Wanna create demo ${chalk.yellow(str)}?`
      });
      if (question) {
        demo.createDemo(str);
      }
    } else {
      __listDemos(demoIndex);
    }
    return demoIndex;
  } catch (error) {
    spinner.fail(`Failed to find demos matched ${chalk.bold.yellow(str)}`);
    console.error(error);
    return [];
  }
}

async function searchAndChooseDemo(str: string) {
  try {
    const demoIndex = await searchDemos(str);
    if (!demoIndex.length) {
      return;
    }
    
    if (!await __chooseDemo(demoIndex)) {
      searchAndChooseDemo(str);
    }
  } catch (error) {
    console.error('search and choose demo failed:', error);
  }
}

export {
  listAllDemos,
  searchAndChooseDemo
};