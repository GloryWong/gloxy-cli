import { readPackageJson } from '../lib/utility';

const { version: gsDemoVersion, description: pkgDescription } = readPackageJson(['version', 'description']);
const gsDemoDescription =
`Description: ${pkgDescription}

Note:
  demoSelector: input a \`demo code\` from the displayed demo list
    * open a demo in a new editor window by default
    * -r: open the demo in the last active editor window
    * -a: archive the demo`;

export {
  gsDemoVersion,
  gsDemoDescription
};