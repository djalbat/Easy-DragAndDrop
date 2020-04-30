"use strict";

import { Explorer, RubbishBin } from "../../index";

const View = (properties) => {
  const explorer =

          <Explorer topmostDirectoryName="explorer"
                    onOpen={openHandler}
                    onMove={moveHandler}
          />

        ,
        rubbishBin =

          <RubbishBin onRemove={removeHandler} />

        ;


  explorer.addDirectoryPath("explorer/directory1");
  explorer.addDirectoryPath("explorer/directory2");
  explorer.addFilePath("explorer/directory1/file1.txt");
  explorer.addFilePath("explorer/directory1/file2.txt");
  explorer.addFilePath("explorer/directory2/file3.txt");

  explorer.addDropTarget(rubbishBin);

  rubbishBin.addDropTarget(explorer);

  return (

    <div className="view">
      {explorer}
      {rubbishBin}
    </div>

  );
};

export default View;

function openHandler(filePath) {
  alert(filePath)
}

function moveHandler(pathMaps, done) {
  done();
}

function removeHandler(pathMaps, done) {
  done();
}
