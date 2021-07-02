import { Command } from 'commander';
import { init } from '../core/initStudio';

new Command()
  .arguments('[path]')
  .action(function(studioPath: string) {
      init(studioPath);
      return;
  })
  .parse();