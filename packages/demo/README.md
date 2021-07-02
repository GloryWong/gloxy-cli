# `@gloxy/demo-cli`

**Demo CLI**

Create and manage local demos in one place instantly and smoothly.

# Install

```sh
npm -g i @gloxy/demo-cli
```
or
```sh
yarn global add @gloxy/demo-cli
```

# Usage

```sh
gdemo --help

Usage: gdemo [optons] [command] [demoSelector]
  demoSelector: a `demo code` from the displayed demo list, opening a demo
                in a new editor window by default.
                Options:
                  * -r: open the demo in the last active editor window
                  * -a: archive the demo

Description: Create and manage local demos in one place instantly and smoothly.

Options:
  -V, --version        output the version number
  -l, --list           list all demos
  -c, --create <name>  create a demo
  --tag <tags...>      use tags
  --lock               lock Studio
  --no-lock            unlock Studio
  -h, --help           display help for command

Commands:
  init [path]          Init a Studio
  archive              Archive existing Studio
  info                 Display Studio information
```
