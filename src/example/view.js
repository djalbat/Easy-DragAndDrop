"use strict";

import withStyle from "easy-with-style";  ///

import Explorer from "./explorer";
import RubbishBin from "./rubbishBin";

const View = (properties) => {
  const { className } = properties,
        explorer =

          <Explorer topmostDirectoryName="explorer" onOpen={openHandler} onMove={moveHandler} />

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

    <div className={`${className} view`}>
      {explorer}
      {rubbishBin}
    </div>

  );
};

export default withStyle(View)`

  display: grid;
  min-height: 100vh;
      
  grid-template-rows: auto auto auto;
  grid-template-columns: auto auto auto;  
  grid-template-areas:
  
       "rubbish-bin . ."
    
        ". explorer ."        
    
           ". . ."
    
  ;

`;

function openHandler(filePath) {
  alert(filePath)
}

function moveHandler(pathMaps, done) {
  done();
}

function removeHandler(pathMaps, done) {
  done();
}
