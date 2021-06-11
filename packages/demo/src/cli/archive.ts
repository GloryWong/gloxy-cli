import { Command } from 'commander';
import { archive } from '../core/archiveGSDemo';
import { initCLIOrWarning } from '../cli-helper/init';
import log from '@glorywong/log';

new Command()
  .action(async function () {
    try {
      if (!initCLIOrWarning()) {
        return;
      }

      archive();
      log.success('Archived');
    } catch (error) {
      log.error('Archive failed:', error);
    }
  })
  .parse();