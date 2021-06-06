'use strict';

const { Command } = require('commander');
const note = require('./note');

new Command()
  .version('-v, --version', 'Output version information', '0.0.1')
  .option('-c, --create <notename>', 'Create a local note')
  .option('-u, --upload <notename>', 'Upload a local note to notion.so')
  .action(({ create, upload }) => {
    if (create) {
      note.create(create);
      return;
    }

    if (upload) {
      note.upload(upload);
      return;
    }
  })
  .parse();