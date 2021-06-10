import { Command } from 'commander';
import { archive } from '../core/archiveGSDemo';
import log from '@glorywong/log';

new Command()
  .action(function () {
    archive();
    return;
  })
  .parse();