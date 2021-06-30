import { Command } from 'commander';
import { initCLIOrWarning } from '../command-helper/init';
import { unilog } from '@glorywong/unilog';
import { getInfo } from '../core/infoGSDemo';
import boxen from 'boxen';
import { cliVersion } from '../command-helper/cliInfo';
import chalk from 'chalk';
import cfonts from 'cfonts';

new Command()
  .action(function() {
    try {
      if (!initCLIOrWarning()) {
        return;
      }

      const { location, name, description, demoCount } = getInfo();
      const bigTitle = cfonts.render('GSDemo', {
        font: 'block',
        colors: ['system'],         // define all colors
        background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
        letterSpacing: 1,           // define letter spacing
        lineHeight: 1,              // define the line height
        space: true,
        gradient: ['red', 'blue'], 
        env: 'node'
      });

      const info = `${bigTitle.string}
        ${chalk.bold.green('GSDemo CLI')} ${chalk.bold.yellow(cliVersion)}

        Present GS Demo:
          Name: ${chalk.bold(name)}
          Location: ${location}
          Description: ${description}
          Demo count: ${demoCount}
      `;
      console.log(boxen(info, { padding: 1, borderStyle: 'double' }));
    } catch (error) {
      unilog.fail('Output GSDemo info failed', error);
    }
  })
  .parse();