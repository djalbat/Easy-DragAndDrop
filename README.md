# EasyUI-DragAndDrop

Drag and drop elements including a file explorer and rubbish bin.

## Related projects

- [EasyUI](https://github.com/djalbat/EasyUI) A V-framework.
- [Florence](http://djalbat.com/florence) A collaborative proof assistant that depends on all three EasyUI projects. 
 
## Installation

If you're running [Node.js](http://nodejs.org) you can install EasyUI-DragAndDrop with [npm](https://www.npmjs.com/):

    npm install easyui-draganddrop

Client-side you can take the `easyui-draganddrop.js` file in the `dist/` folder put it somewhere and reference it via the usual script element:
 
```html
<script src="scripts/lib/easyui-draganddrop.js"> </script>
```

This will give you a global `easyUIDragAndDrop` variable which you use directly:
  
```js
var Explorer = easyUIDragAndDrop.Explorer,
    RubbishBin = easyUIDragAndDrop.RubbishBin;
```

If you're using AMD require client-side or CommonJS server-side the syntax for requiring EasyUI is the same:

```js
var easyUIDragAndDrop = require('lib/easyui-draganddrop'),
    Explorer = easyUIDragAndDrop.Explorer,
    RubbishBin = easyUIDragAndDrop.RubbishBin;
```
 
## Documentation

#### Creating instances

See the `example.html` file in the `docs/` folder for an example. 

You must include the `easyui-draganddrop.html` and `easyui-draganddrop.css` files in the `dist/` directory or their contents somehow in your application as well as the four PNG files. The HTML snippet in the `easyui-draganddrop.html` file includes an `img` element to preload the `marker.png` file. You may need to adjust the relative URL.

Creating instances can be done with constructors:

```js
var explorer = new Explorer('#explorer', Explorer, onActivate, onMove),
    rubbishBin = new RubbishBin('#rubbishBin', onRemove);
```

#### Cloning or creating instances from HTML

You can also create instances using the `clone()` factory or instance methods. Remember to remove the `id` attribute if you've used the `clone()` factory method and the jQuery selector used it. Or you can use the `fromHTML()` methods, as in the examples: 

```js
var firstExplorer = Explorer.fromHTML('<ul class="first explorer"> </ul>', 'First explorer', onActivate, onMove),
    secondExplorer = Explorer.fromHTML('<ul class="second explorer"> </ul>', 'Second explorer', onActivate, onMove),
    rubbishBin = RubbishBin.fromHTML('<div class="rubbishBin"> </div>', onRemove);

var body = new Body();

body.append(firstExplorer);
body.append(secondExplorer);
body.append(rubbishBin);
```

Remember when cloning or creating from HTML that you actually then attach the explorer to an existing DOM element.

#### Adding files and directories

You can add files or empty directories:

```js
secondExplorer.addDirectory('Second explorer/First directory');
secondExplorer.addDirectory('Second explorer/Second directory');

secondExplorer.addFile('Second explorer/First directory/First file.fls');
secondExplorer.addFile('Second explorer/First directory/Second file.fls');
secondExplorer.addFile('Second explorer/Second directory/Third file.fls');
```

The `addFile()` method has second, optional `readOnly` argument. The `addDirectory()` method has a second, optional `collapsed` argument. The defaults are false in both cases.

The explorer will add the directories for you whenever you add a file. If you try to add a directory or file more than once, it will be ignored.

There are no `addFiles()` or `addDirectories()` methods, create your own loops!

#### Dragging between elements

Use the `addDroppableElement()` method to have one element listen for the dragging events of another.

```js
firstExplorer.addDroppableElement(secondExplorer);
secondExplorer.addDroppableElement(firstExplorer);
firstExplorer.addDroppableElement(rubbishBin);
secondExplorer.addDroppableElement(rubbishBin);
```

Here the rubbish bin will listen for dragging events from both of the explorers. Each of the explorers will listen for dragging events of the other's.

#### Activating files

This is done by double clicking on them, in which case the `onActivate` handler is called with the file's source path. A failure callback is passed as a second argument. If this is invoked, or if the handler explicitly returns `false`, the file will be removed.

```js
function onActivate(sourcePath, fail) {
  console.log('activate: ' + sourcePath)

  switch(sourcePath) {
    case 'Second explorer/Second directory/Third file.fls':
      fail();
      break;
  }
}
```

#### Moving files and directories

The `onMove()` handler is invoked with an array of path maps and a `done` argument. You must call the `done()` method when you are done. Each element of the array of path maps is a mutable object with one key, namely the entries source path. Its value is the entries target path. If you want the entry to be moved, leave the object as-is. If you want the entry to be left in place, change the value to the target path. If you want it removed, change the value to `null`. Simply leaving the array of path maps alone with therefore move the entries as expected.

```js
function onMove(pathMaps, done) {
  pathMaps.forEach(function(pathMap) {
    var keys = Object.keys(pathMap),
        sourcePath = keys[0], ///
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
   
#### Removing files and directories   
  
The `onRemove()` handler is invoked with an array of path maps and a `done` argument. You must call the `done()` method when you are done. Each element of the array of path maps is a mutable object with one key, namely the entries source path. If you want the entry to be removed, leave the object as-is. If you want the entry to be left in place, change the value to the target path. Simply leaving the array of path maps alone will therefore remove the entries as expected.

```js
function onRemove(pathMaps, done) {
  pathMaps.forEach(function(pathMap) {
    var keys = Object.keys(pathMap),
      sourcePath = keys[0], ///
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

#### Changing the CSS

Feel free to change the CSS with care. Check the `example.css` file in the `docs/` folder for some CSS that works well. Note that the triangles used are defined in the `ToggleButton` class in the `lib/` folder. You'll need to re-build the package if you want to change these.

## Contact

* james.smith@djalbat.com
* http://djalbat.com
