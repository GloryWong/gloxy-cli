import { Command } from 'commander';
import { archive } from '../core/archiveGSDemo';
import { hasInited, initCLIOrWarning } from '../core/initGSDemo';
import log from '@glorywong/log';

new Command()
  .action(function () {
    if (!initCLIOrWarning()) {
      return;
    }

    archive();
  })
  .parse();