import { Command } from 'commander';
import { archive } from '../core/archiveGSDemo';
import { initCLIOrWarning } from '../cli-helper/init';
import log from '@glorywong/log';
import { prompt } from 'inquirer';
import PATH from '../lib/path';
import path from 'path';

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
        message: `Do you really want to archive GSDemo '${gsDemoName}'?`
      });

      if (question) {
        await archive();
        log.success(`GSDemo '${gsDemoName}' archived`);
      }
    } catch (error) {
      log.error('Archive failed:', error);
    }
  })
  .parse();