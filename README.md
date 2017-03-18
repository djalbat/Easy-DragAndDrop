# EasyUI-DragAndDrop

Drag and drop elements including an explorer and a rubbish bin.

The explorer element is populated with list of files and directories. It takes handlers for opening files and for moving and removing files an directories. Removing files and directories is done by dragging them into the rubbish bin. Or the explorer element can be altered programmatically.

### Related projects

- [EasyUI](https://github.com/djalbat/EasyUI) A V-framework.
- [EasyUI-Layout](https://github.com/djalbat/EasyUI-Layout) Layout elements that work with CSS flexbox.
- [EasyUI-RichTextarea](https://github.com/djalbat/EasyUI-RichTextarea) A textarea element that handles and hands off events well.

### Are these projects actually used anywhere?

Actually they are, here:

- [Occam Proof Assistant](http://djalbat.com/occam)

## Installation

You can install EasyUI-DragAndDrop with [npm](https://www.npmjs.com/):

    npm install easyui-draganddrop

You can also clone the repository with [Git](https://git-scm.com/)...

    git clone https://github.com/djalbat/EasyUI-DragAndDrop.git

...and then install the necessary modules with npm from within the project's root directory:

    npm install

## Usage

If you're building with [Node.js](http://nodejs.org) the usage is as follows:

```js
var easyuidraganddrop = require('easyui-draganddrop'),
    Explorer = easyuidraganddrop.Explorer,
    RubbishBin = easyuidraganddrop.RubbishBin;
```

To use EasyUI-DragAndDrop in the browser, take the `easyui-draganddrop.js` file from the project's `dist/` folder and put it somewhere such as a `public/scripts/lib` directory. Referencing this distribution file from a `script` element...

```html
<script src="scripts/lib/easyui-draganddrop.js"> </script>
```

...will give you a global `easyuidraganddrop` variable which can be used directly:

```js
var Explorer = easyuidraganddrop.Explorer,
    RubbishBin = easyuidraganddrop.RubbishBin;
```

Note the lack of a hyphen.

Alternatively, if you're using an AMD style `require` the usage is similar to the Node.js case, only make sure that the path to the distribution file is correct. The following script should work, assuming it lives in the the `public/scripts/` directory:

```js
var easyuidraganddrop = require('lib/easyui-draganddrop'),
    Explorer = easyuidraganddrop.Explorer,
    RubbishBin = easyuidraganddrop.RubbishBin;
```

## Compiling from source

Automation is done with [npm scripts](https://docs.npmjs.com/misc/scripts), have a look at the `package.json` file. The pertinent commands are:

    npm run build-debug
    npm run watch-debug

## Creating instances

You must include the `easyui-draganddrop.html` and `easyui-draganddrop.css` files in the `dist/` directory or their contents somehow in your application as well as the four PNG files. Or understand what they give and replace this with equivalent. The HTML snippet in the `easyui-draganddrop.html` file includes an `img` element to preload the `marker.png` file. You may need to adjust the relative URL.

Creating instances can be done with constructors:

```js
var explorer = new Explorer('#explorer', Explorer, onOpen, onMove),
    rubbishBin = new RubbishBin('#rubbishBin', onRemove);
```

## Cloning or creating instances from HTML

You can also create instances using the `clone()` factory or instance methods. Remember to remove the `id` attribute if you have  used the `clone()` factory method and the selector had to make use of it. Or you can use the `fromHTML()` methods: 

```js
var firstExplorer = Explorer.fromHTML('<ul class="first explorer"> </ul>', 'First explorer', onOpen, onMove),
    secondExplorer = Explorer.fromHTML('<ul class="second explorer"> </ul>', 'Second explorer', onOpen, onMove),
    rubbishBin = RubbishBin.fromHTML('<div class="rubbishBin"> </div>', onRemove);

var body = new Body();

body.append(firstExplorer);
body.append(secondExplorer);
body.append(rubbishBin);
```

Remember when cloning or creating from HTML that you actually then attach the explorer to an existing DOM element.

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

Use the `addDroppableElement()` method to have one element listen for the dragging events of another.

```js
firstExplorer.addDroppableElement(secondExplorer);
secondExplorer.addDroppableElement(firstExplorer);
firstExplorer.addDroppableElement(rubbishBin);
secondExplorer.addDroppableElement(rubbishBin);
```

Here the rubbish bin will listen for dragging events from both of the explorers. Each of the explorers will listen for dragging events of the other one.

## Opening files

This is done by double clicking on them, in which case the `onOpen` handler is called with the file's path.

```js
function onOpen(filePath) {
  console.log('open: ' + filePath)
}
```

It is fine, although a little pointless, not to define the open handler.

## Handling moving files and directories

The `onMove()` handler is invoked with an array of path maps and a `done` argument. You must call the `done()` method when you are done. Each element of the array of path maps is a mutable plain old JavaScript object with one key, namely the entry's source path. The corresponding value is the entry's target path. If you want the entry to be moved, leave the object as-is. If you want the entry to be left in place, change the value to the source path. If you want the entry to be removed, change the value to `null`. Simply leaving the array of path maps alone with therefore move the entries as expected.

```js
function onMove(pathMaps, done) {
  pathMaps.forEach(function(pathMap) {
    var pathMapKeys = Object.keys(pathMap),
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
  
The `onRemove()` handler is invoked with an array of path maps and a `done` argument. You must call the `done()` method when you are done. Each element of the array of path maps is a mutable plain old JavaScript object with one key, namely the entries source path. The corresponding value will be `null`. If you want the entry to be removed, leave the object as-is. If you want the entry to be left in place, change the value to the target path. Simply leaving the array of path maps alone will therefore remove the entries as expected.

```js
function onRemove(pathMaps, done) {
  pathMaps.forEach(function(pathMap) {
    var pathMapKeys = Object.keys(pathMap),
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

  secondExplorer.removeDroppableElement(firstExplorer);

  firstExplorer.remove();
}
```

If no remove handler is provided the array of path maps is left unchanged.

## CSS

There is a fair amount of CSS. Some of it is functional, in the sense that it the elements will not function properly without it. It is best therefore to include the CSS, and the few attendant images that come with it, in your own project, to get yourself started. The positioning of the background images is left deliberately awry, you will need to adjust this aspect at least.

## Contact

* james.smith@djalbat.com
* http://djalbat.com
