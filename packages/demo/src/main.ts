import { Command } from 'commander';

// TODO: list demos
// TODO: choose demo from list
// TODO: direct choose demo
// TODO: create demo
// TODO: remove demo to trash

import { listDemos, selectDemo } from './demos';

const program = new Command();
program
  .version('1.0.0')
  .action(function() {
    listDemos();
    selectDemo();
  })
  .parse();