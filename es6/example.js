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
      explorer1 =

        <Explorer topmostDirectoryName="explorer1" onOpen={openHandler} onMove={moveHandler} />

      ,
      explorer2 =

          <Explorer topmostDirectoryName="explorer2" onOpen={openHandler} onMove={moveHandler} />

      ,
      rubbishBin =

        <RubbishBin onRemove={removeHandler} />

      ;

body.append(rubbishBin);

body.append(<br />);

body.append(explorer1);

body.append(<br />);

body.append(explorer2);

explorer1.addDropTarget(rubbishBin);

explorer1.addDropTarget(explorer2);

explorer2.addDropTarget(rubbishBin);

explorer2.addDropTarget(explorer1);

rubbishBin.addDropTarget(explorer1);

rubbishBin.addDropTarget(explorer2);

explorer1.addDirectoryPath('explorer1/directory1');
explorer1.addDirectoryPath('explorer1/directory2');
explorer1.addFilePath('explorer1/directory1/file1.txt');
explorer1.addFilePath('explorer1/directory1/file2.txt');
explorer1.addFilePath('explorer1/directory2/file3.txt');
