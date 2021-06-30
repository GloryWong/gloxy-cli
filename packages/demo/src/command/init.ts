import { Command } from 'commander';
import { init } from '../core/initGSDemo';

new Command()
  .arguments('[path]')
  .action(function(gsDemoPath: string) {
      init(gsDemoPath);
      return;
  })
  .parse();