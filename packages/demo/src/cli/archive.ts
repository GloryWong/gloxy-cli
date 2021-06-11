import { Command } from 'commander';
import { archive } from '../core/archiveGSDemo';
import { initCLIOrWarning } from '../cli-helper/init';

new Command()
  .action(function () {
    if (!initCLIOrWarning()) {
      return;
    }

    archive();
  })
  .parse();