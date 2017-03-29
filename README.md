# Easy-DragAndDrop

Drag and drop elements including an explorer and a rubbish bin.

The explorer element is populated with list of files and directories. It takes handlers for opening files and for moving and removing files an directories. Removing files and directories is done by dragging them into the rubbish bin. Or the explorer element can be altered programmatically.

### JSX support

There is now support for JSX in the form of [Juxtapose](https://github.com/djalbat/Juxtapose). JSX brings with it [several benefits](http://djalbat.com/juxtapose#jsxIsGreat). At the moment the other Easy projects continue to work standalone, although their use with Juxtapose is *highly recommended*. In the case of this project, however, support for calling the constructors directly or via the static `clone()` or `fromHTML()` factory methods has been dropped from version 6 onwards. This also means that usage is only via Node, so there is no support for scripts running standalone in the browser anymore. The only place to start from now on, therefore, at least for this project, is the Juxtapose online documentation. The section dealing directly with this project is here:

* [Juxtapose online documentation - Easy-DragAndDrop](http://djalbat.com/juxtapose/#easyDragAndDrop)

From there you can easily navigate to get an overview of Juxtapose.

### Related projects

- [Easy](https://github.com/djalbat/Easy) A V-framework.
- [Easy-Layout](https://github.com/djalbat/Easy-Layout) Layout elements that work with CSS flexbox.
- [Easy-RichTextarea](https://github.com/djalbat/Easy-RichTextarea) A textarea element that handles and hands off events well.

### Are these projects actually used anywhere?

Actually they are, here:

- [Occam Proof Assistant](http://djalbat.com/occam)

## Installation

You can install Easy-DragAndDrop with [npm](https://www.npmjs.com/):

    npm install easy-draganddrop

You can also clone the repository with [Git](https://git-scm.com/)...

    git clone https://github.com/djalbat/Easy-DragAndDrop.git

...and then install the necessary modules with npm from within the project's root directory:

    npm install

## Usage

Building with [Node.js](http://nodejs.org) the usage is as follows:

```js
const easydraganddrop = require('easy-draganddrop'),
      { Explorer, RubbishBin } = easydraganddrop;
```

## Compiling from source

Automation is done with [npm scripts](https://docs.npmjs.com/misc/scripts), have a look at the `package.json` file. The pertinent commands are:

    npm run build-debug
    npm run watch-debug

## Creating instances with JSX

Creating instances can only be done with JSX:

```js
require('easyui-jsx');

const rootDirectoryName = 'First explorer',
      moveHandler = ...
      openHandler = ...
      removeHandler = ...
      explorer = <Explorer rootDirectoryName={rootDirectoryName} onMove={moveHandler} onOpen={openHandler} />,
      rubbishBin = <RubbishBin onRemove={removeHandler} />;
```

Note that you need to include the Juxtapose npm package and that this is called `easyui-jsx` and not `juxtapose`, at least for now. 

You should also include the `easy-draganddrop.css` file, found in the `dist/` directory, together with the PNG files therein, at least to get yourself started.

## Adding and removing files and directories

You can add files or empty directories:

```js
secondExplorer.addDirectory('Second explorer/First directory');
secondExplorer.addDirectory('Second explorer/Second directory');
secondExplorer.addFile('Second explorer/First directory/First file.fls');
secondExplorer.addFile('Second explorer/First directory/Second file.fls');
secondExplorer.addFile('Second explorer/Second directory/Third file.fls');
```

The `addDirectory()` method has a second, optional `collapsed` argument. The default is `false`. The explorer will add the necessary parent directories for you whenever you add a file. If you try to add a file or directory more than once, nothing will happen.

You can also remove files and non-empty directories programmatically:

```js
secondExplorer.removeFile('Second explorer/First directory/Second file.fls', true);
secondExplorer.removeFile('Second explorer/Second directory/Third file.fls', false);
secondExplorer.removeDirectory('Second explorer/Second directory', false);
```

You cannot remove the topmost directory, and if you try to remove a file or directory more than once, nothing happens.

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

The requisite handler is invoked with an array of path maps and a `done` argument. You must call the `done()` method when you are done. Each element of the array of path maps is a mutable plain old JavaScript object with one key, namely the entry's source path. The corresponding value is the entry's target path. If you want the entry to be moved, leave the object as-is. If you want the entry to be left in place, change the value to the source path. If you want the entry to be removed, change the value to `null`. Simply leaving the array of path maps alone with therefore move the entries as expected.

```js
function moveHandler(pathMaps, done) {
  pathMaps.forEach(function(pathMap) {
    const pathMapKeys = Object.keys(pathMap),
          firstPathMapKey = first(pathMapKeys),
          sourcePath = firstPathMapKey, ///
          targetPath = pathMap[sourcePath],
          movedPath = targetPath;

    console.log('move file: ' + sourcePath + ' -> ' + targetPath)

    switch(sourcePath) {
      case 'Second explorer/First directory/First file.fls':
        console.log('...deleted.')

        movedPath = null;
        break;

      case 'Second explorer/First directory/Second file.fls':
      case 'Second explorer/First directory':
        console.log('...left in place.')

        movedPath = sourcePath;
        break;
    }

    pathMap[sourcePath] = movedPath;
  });

  done();
}
```

If no move handler is provided the array of path maps is left unchanged.
   
## Handling removing files and directories
  
The requisite handler is invoked with an array of path maps and a `done` argument. You must call the `done()` method when you are done. Each element of the array of path maps is a mutable plain old JavaScript object with one key, namely the entries source path. The corresponding value will be `null`. If you want the entry to be removed, leave the object as-is. If you want the entry to be left in place, change the value to the target path. Simply leaving the array of path maps alone will therefore remove the entries as expected.

```js
function removeHandler(pathMaps, done) {
  pathMaps.forEach(function(pathMap) {
    const pathMapKeys = Object.keys(pathMap),
          firstPathMapKey = first(pathMapKeys),
          sourcePath = firstPathMapKey, ///
          removedPath = null;

    console.log('remove file: ' + sourcePath)

    switch(sourcePath) {
      case 'Second explorer/First directory/Second file.fls':
      case 'Second explorer/First directory':
        console.log('...left in place.')

        removedPath = sourcePath;
        break;
    }

    pathMap[sourcePath] = removedPath;
  });

  done();
}
```

You can check to see if the source path is that of the explorer's root directory in which case you can remove the whole explorer if you wish.

```js
if (sourcePath === 'First explorer') {
  console.log('...removing entire explorer.')

  secondExplorer.removeDropTarget(firstExplorer);

  firstExplorer.remove();
}
```

If no remove handler is provided the array of path maps is left unchanged.

## CSS

There is a fair amount of CSS. Some of it is functional, in the sense that it the elements will not work properly without it. It is best therefore to include the CSS and the few attendant images that come with it in your own project, to get yourself started. The positioning of the background images is left deliberately awry, you will need to adjust this aspect at least.

## Contact

* james.smith@djalbat.com
* http://djalbat.com
