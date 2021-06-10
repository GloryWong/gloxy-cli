import { Command } from 'commander';
import { init } from '../core/initGSDemo';
import log from '@glorywong/log';

new Command()
  .arguments('[path]')
  .action(function(gsDemoPath) {
      init(gsDemoPath);
      return;
  })
  .parse();