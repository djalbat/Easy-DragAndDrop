'use strict';

const easy = require('easy');

const Explorer = require('./explorer'),
      RubbishBin = require('./rubbishBin');

const { Body, React } = easy;

const openHandler = (filePath) => {
        alert(filePath)
      },
      moveHandler = (pathMaps, done) => {
        done();
      },
      removeHandler = (pathMaps, done) => {
        done();
      };

const body = new Body(),
      explorer =

        <Explorer topmostDirectoryName="explorer" onOpen={openHandler} onMove={moveHandler} />

      ,
      rubbishBin =

        <RubbishBin onRemove={removeHandler} />

      ;

body.append(rubbishBin);

body.append(explorer);

explorer.addDropTarget(rubbishBin);

rubbishBin.addDropTarget(explorer);

explorer.addDirectoryPath('explorer/directory1');
explorer.addDirectoryPath('explorer/directory2');
explorer.addFilePath('explorer/directory1/file1.txt');
explorer.addFilePath('explorer/directory1/file2.txt');
explorer.addFilePath('explorer/directory2/file3.txt');
