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

const body = new Body(),
      explorer1 =

        <Explorer topmostDirectoryName="induction" onOpen={openHandler} onMove={moveHandler} />

      ,
      explorer2 =

        <Explorer topmostDirectoryName="a132D3dx" onOpen={openHandler} onMove={moveHandler} options={{ NO_DRAGGING_WITHIN }} />

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

explorer1.addFilePath('induction/meta.json');

explorer2.addDirectoryPath('a132D3dx');

explorer2.addDirectoryPath('a132D3dx/logic');
