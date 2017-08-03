# Easy-DragAndDrop

Drag and drop elements including an explorer and a rubbish bin.

The explorer element is populated with list of files and directories. It takes handlers for opening files and for moving and removing files an directories. Removing files and directories is done by dragging them into the rubbish bin. Or the explorer element can be altered programmatically.

### JSX support

There is now support for JSX in the form of [Juxtapose](https://github.com/djalbat/Juxtapose). JSX brings with it [several benefits](http://djalbat.com/juxtapose#jsxIsGreat). So although you will always be able to call constructors directly if you wish, creating Easy elements by way of JSX is *highly recommended*. The contents of this readme file will stay as a reference, however a much better place to start from now on is the online documentation for Juxtapose. The section dealing directly with this project is here:

* [Juxtapose online documentation - Easy-DragAndDrop](http://djalbat.com/juxtapose/#easyDragAndDrop)

From there you can easily navigate to get an overview of Juxtapose.

### Related projects

- [Easy](https://github.com/djalbat/Easy) Abstracts away from the DOM.
- [Easy-Layout](https://github.com/djalbat/Easy-Layout) Layout elements that work with CSS flexbox.
- [Easy-RichTextarea](https://github.com/djalbat/Easy-RichTextarea) A textarea element that handles and hands off events well.

## Installation

You can install Easy-DragAndDrop with [npm](https://www.npmjs.com/):

    npm install easy-draganddrop

You can also clone the repository with [Git](https://git-scm.com/)...

    git clone https://github.com/djalbat/Easy-DragAndDrop.git

...and then install the necessary modules with npm from within the project's root directory:

    npm install

## Creating instances with JSX

```js
const easydraganddrop = require('easy-draganddrop'),
      { Explorer, RubbishBin } = easydraganddrop;

const rootDirectoryName = 'First explorer',
      explorer =

        <Explorer rootDirectoryName={rootDirectoryName}
                  onMove={moveHandler}
                  onOpen={openHandler}
        />,

      rubbishBin =

        <RubbishBin onRemove={removeHandler} />
      ;

function moveHandler(pathMaps, done) {
  ...
}

function removeHandler(pathMaps, done) {
  ...
}

function openHandler(filePath) {
 ...
}
```

## Adding and removing files and directories

You can add files or empty directories:

```js
secondExplorer.addDirectoryPath('Second explorer/First directory');
secondExplorer.addDirectoryPath('Second explorer/Second directory');
secondExplorer.addFilePath('Second explorer/First directory/First file.fls');
secondExplorer.addFilePath('Second explorer/First directory/Second file.fls');
secondExplorer.addFilePath('Second explorer/Second directory/Third file.fls');
```

The `addDirectoryPath()` method has a second, optional `collapsed` argument. The default is `false`. The explorer will add the necessary parent directories for you whenever you add a file. If you try to add a file or directory more than once, nothing will happen.

You can also remove files and non-empty directories programmatically:

```js
secondExplorer.removeFilePath('Second explorer/First directory/Second file.fls', true);
secondExplorer.removeFilePath('Second explorer/Second directory/Third file.fls', false);
secondExplorer.removeDirectoryPath('Second explorer/Second directory', false);
```

You cannot remove the topmost directory, and if you try to remove a file or directory more than once, nothing happens.

Note that the methods are `addFilePath()`, `removeDirectoryPath()` and so on. This is because the explorer is simply a visual widget for maninpulating paths, there are no actual files and directories directly involved.

## Dragging between elements

Use the `addDropTarget()` method to have one element listen for the dragging events of another.

```js
firstExplorer.addDropTarget(secondExplorer);
secondExplorer.addDropTarget(firstExplorer);
firstExplorer.addDropTarget(rubbishBin);
secondExplorer.addDropTarget(rubbishBin);
```

Here the rubbish bin will listen for dragging events from both of the explorers. Each of the explorers will listen for dragging events of the other one.

## Opening files

This is done by double clicking on them, in which case the requisite handler is called with the file's path.

```js
function openHandler(filePath) {
  console.log('open: ' + filePath)
}
```

It is fine not to define the open handler.

## Handling moving files and directories

The requisite handler is invoked with an array of path maps and a `done` argument. You must call the `done()` method when you are done. Each element of the array of path maps is a mutable plain old JavaScript object with `sourcePath`, `targetPath` and `directory` properties. The `directory` property is set to `true` if the entry is a directory. If you want the entry to be moved, leave the object as-is. If you want the entry to be left in place, change the target path to the source path. If you want the entry to be removed, change the target path to `null`. Simply leaving the array of path maps alone with therefore move the entries as expected. 

```js
function moveHandler(pathMaps, done) {
  pathMaps.forEach(function(pathMap) {
    const sourcePath = pathMap['sourcePath'],
          targetPath = pathMap['targetPath'];
          
    console.log('move file: ' + sourcePath + ' -> ' + targetPath)

    switch(sourcePath) {
      case 'Second explorer/First directory/First file.fls':
        console.log('...deleted.')

        targetPath = null;
        break;

      case 'Second explorer/First directory/Second file.fls':
      case 'Second explorer/First directory':
        console.log('...left in place.')

        targetPath = sourcePath;
        break;
    }

    pathMap['targetPath'] = targetPath;
  });

  done();
}
```

If no move handler is provided the array of path maps is left unchanged.
   
## Handling removing files and directories
  
The requisite handler is invoked with an array of path maps and a `done` argument. You must call the `done()` method when you are done. Each element of the array of path maps is a mutable plain old JavaScript object again with `sourcePath`, `targetPath` and `directory` properties. The target path will be set to `null` and again the `directory` property is set to `true` if the entry is a directory. If you want the entry to be removed, leave the object as-is. If you want the entry to be left in place, change the the target path to the source path. Simply leaving the array of path maps alone will therefore remove the entries as expected.

```js
function removeHandler(pathMaps, done) {
  pathMaps.forEach(function(pathMap) {
    const sourcePath = pathMap['sourcePath'],
          targetPath = pathMap['targetPath'];

    console.log('remove file: ' + sourcePath)

    switch(sourcePath) {
      case 'Second explorer/First directory/Second file.fls':
      case 'Second explorer/First directory':
        console.log('...left in place.')

        targetPath = sourcePath;
        break;
    }

    pathMap['targetPath'] = targetPath;
  });

  done();
}
```

If no remove handler is provided the array of path maps is left unchanged.

## CSS

There is a fair amount of CSS. Some of it is functional, in the sense that it the elements will not work properly without it. You should also include the `easy-draganddrop.css` file, found in the `dist/` directory, together with the PNG files therein, at least to get yourself started. The positioning of the background images is left deliberately awry, you will need to adjust this aspect at least.

## Compiling from source

Automation is done with [npm scripts](https://docs.npmjs.com/misc/scripts), have a look at the `package.json` file. The pertinent commands are:

    npm run build-debug
    npm run watch-debug

## Contact

* james.smith@djalbat.com
* http://djalbat.com
