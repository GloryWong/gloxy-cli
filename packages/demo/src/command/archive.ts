import { Command } from 'commander';
import { archive } from '../core/archiveGSDemo';
import { initCLIOrWarning } from '../command-helper/init';
import log from '@glorywong/log';
import { prompt } from 'inquirer';
import PATH from '../lib/path';
import path from 'path';
import conf from '../lib/conf';

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
        message: `Are you sure to archive GSDemo '${gsDemoName}'?`
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
        log.error('GSDemo name not matched. Archive failed.')
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
      log.success(`GSDemo '${gsDemoName}' archived`);
    } catch (error) {
      log.error('Archive failed:', error);
    }
  })
  .parse();