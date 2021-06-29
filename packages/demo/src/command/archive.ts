import { Command } from 'commander';
import { archive } from '../core/archiveGSDemo';
import { initCLIOrWarning } from '../command-helper/init';
import unilog from '@glorywong/unilog';
import { prompt } from 'inquirer';
import PATH from '../lib/path';
import path from 'path';
import conf from '../lib/conf';
import chalk from 'chalk';

new Command()
  .action(async function () {
    try {
      if (!initCLIOrWarning()) {
        return;
      }

      const { name: gsDemoName } = path.parse(PATH.ROOT);
      const { question }: { question: boolean } = await prompt({
        type: 'confirm',
        name: 'question',
        message: `Are you sure to archive GSDemo ${chalk.bold.yellow(gsDemoName)}?`
      });

      if (!question) {
        return;
      }

      const { gsDemoName: _gsDemoName }: { gsDemoName: string } = await prompt({
        type: 'input',
        name: 'gsDemoName',
        message: `Please confirm the GSDemo name:`
      });

      if (_gsDemoName.trim() !== gsDemoName) {
        unilog.fail('GSDemo name not matched. Archive failed.')
        return;
      }

      const { archiveName }: { archiveName: string} = await prompt({
        type: 'input',
        name: 'archiveName',
        message: `Give an archive name for this GSDemo:`,
        default: () => {
          const root = String(conf.get('root'));
          const { name } = path.parse(root);

          return name;
        }
      });

      await archive(archiveName);
      unilog.succeed(`GSDemo ${chalk.bold.yellow(gsDemoName)} archived`);
    } catch (error) {
      unilog.fail('Archive failed:', error);
    }
  })
  .parse();