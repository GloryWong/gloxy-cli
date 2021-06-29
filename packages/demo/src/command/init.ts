import { Command } from 'commander';
import { init } from '../core/initGSDemo';

new Command()
  .arguments('[path]')
  .action(function(gsDemoPath) {
      init(gsDemoPath);
      return;
  })
  .parse();