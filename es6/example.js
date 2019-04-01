'use strict';

const easy = require('easy');

const options = require('./options'),
      Explorer = require('./explorer'),
      RubbishBin = require('./rubbishBin');

const { Body, React } = easy,
      { NO_DRAGGING_WITHIN, NO_DRAGGING_SUB_ENTRIES } = options;

const openHandler = (filePath) => {
      alert(filePath)
      },
      moveHandler = (pathMaps, done) => {
        done();
      },
      removeHandler = (pathMaps, done) => {
        pathMaps.forEach(function(pathMap) {
          const sourcePath = pathMap['sourcePath'];

          pathMap['targetPath'] = sourcePath; ///
        });

        done();
      };

const explorer =

        <Explorer topmostDirectoryName="explorer" onOpen={openHandler} onMove={moveHandler} />

      ,
      rubbishBin =

        <RubbishBin onRemove={removeHandler} />

      ;

explorer.addDropTarget(rubbishBin);

rubbishBin.addDropTarget(explorer);

explorer.addDirectoryPath('explorer/directory1');
explorer.addDirectoryPath('explorer/directory2');

explorer.addFilePath('explorer/directory1/file1.txt');
explorer.addFilePath('explorer/directory1/file2.txt');
explorer.addFilePath('explorer/directory2/file3.txt');

const body = new Body();

body.append(rubbishBin);

body.append(<br />);

body.append(explorer);

/*
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

        <Explorer topmostDirectoryName="explorer1" onOpen={openHandler} onMove={moveHandler} options={{ NO_DRAGGING_WITHIN }} />

      ,
      explorer2 =

        <Explorer topmostDirectoryName="explorer2" onOpen={openHandler} onMove={moveHandler} options={{ NO_DRAGGING_SUB_ENTRIES }} />

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

explorer1.addFilePath('explorer1/file1.txt');
explorer1.addFilePath('explorer1/directory1/file2.txt');
explorer2.addFilePath('explorer2/directory2/file3.txt');
*/