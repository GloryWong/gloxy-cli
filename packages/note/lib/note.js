'use strict';

const execa = require('execa');
const mkdirp = require('mkdirp');
const path = require('path');
const Ora = require('ora');

module.exports = {
    create,
    upload
};

const TOKEN_V2 = '1339dd2d90f22c45ca6fc6f37105f41d1d3ab1ae1ce371691c12c75d9018ed6b5ed766fd007f8ef34887ce27320a8f5cae5855befea6978bd5f59d4dce56aaeac23756a9a30b9524f662ccc58bb8';
const PARENT_PAGE = 'https://www.notion.so/Notes-d5480f49d18e4a9a92ec40810e2fea0b';
const NOTE_POSITION = path.resolve(process.env.HOME, '.note');

function create(notename) {
    try {
        mkdirp.sync(NOTE_POSITION);
        const notePath = path.join(NOTE_POSITION, notename + '.md');
        console.log('location:', notePath);
        execa.sync('code-insiders', ['-r', notePath]);
    } catch (error) {
        console.error('create failed:', error);
    }
}

function upload(notename) {
    const ora = Ora(`Uploading note '${notename}'`).start();
    try {
        const notePath = path.join(NOTE_POSITION, notename + '.md');
        execa.sync('python3', ['-m', 'md2notion', TOKEN_V2, PARENT_PAGE, notePath]);
        ora.succeed(`Uploaded note '${notename}'`);
    } catch (error) {
        ora.fail(`Uploading '${ notename }' failed`);
    }
}
