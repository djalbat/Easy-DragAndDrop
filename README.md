# EasyUI-DragAndDrop

Drag and drop elements including a file explorer and rubbish bin.

## Related projects

- [EasyUI](https://github.com/djalbat/EasyUI) A V-framework.
- [Florence](https://github.com/jecs-imperial/Florence) A collaborative proof assistant that depends on all three EasyUI projects. 
 
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
var easyUIDragAndDrop = require('./../dist/easyui-draganddrop'),
    Explorer = easyUIDragAndDrop.Explorer,
    RubbishBin = easyUIDragAndDrop.RubbishBin;
```
 
## Documentation

#### Creating instances

See the `example.html` file in the `docs/` folder for an example. 

You must include the `easyui-draganddrop.html` and `easyui-draganddrop.css` files in the `dist/` directory or their contents somehow in your application as well as the four PNG files. The HTML snippet in the `easyui-draganddrop.html` file includes an `img` element to preload the `marker.png` file. You may need to adjust the relative URL.

Creating instances can be done with constructors:

```js
var explorer = new Explorer('#explorer', 'Explorer', onActivateFile, onMoveFile, onMoveDirectory),
    rubbishBin = new RubbishBin('#rubbishBin', onRemoveFile, onRemoveDirectory);
```

Activating files is done by double clicking on them, in which case the `onActivateFile` handler is called with the file's path.

#### Cloning or creating instances from HTML

You can also create instances using the `clone()` factory or instance methods. Remember to remove the `id` attribute if you've used the `clone()` factory method and the jQuery selector used it. Or you can use the `fromHTML()` methods, as in the examples: 

```js
var firstExplorer = Explorer.fromHTML('<ul class="first explorer"> </ul>', 'First explorer', onActivateFile, onMoveFile, onMoveDirectory),
    secondExplorer = Explorer.fromHTML('<ul class="second explorer"> </ul>', 'Second explorer', onActivateFile, onMoveFile, onMoveDirectory),
    rubbishBin = RubbishBin.fromHTML('<div class="rubbishBin"> </div>', onRemoveFile, onRemoveDirectory);

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
```

The `addFile()` method has second, optional `readOnly` argument. The default is false. The `addDirectory()` method has a second, optional `collapsed` argument. The default is false.

The explorer will add the directories for you whenever you add a file. If you try to add a directory or file more than once, it will be ignored.

There are no `addFiles()` or `addDirectories()` methods, create your own loops!

#### Dragging between elements

Use the `addDroppableElement()` method to have one element listen for the drag events of another.

```js
firstExplorer.addDroppableElement(secondExplorer);
secondExplorer.addDroppableElement(firstExplorer);
firstExplorer.addDroppableElement(rubbishBin);
secondExplorer.addDroppableElement(rubbishBin);
```

Here the rubbish bin will listen for drag events from both of the explorers. Each of the explorers will listen for drag events of the other's.

#### Moving files and directories

Only a single file or a directory can be moved in one go. 

In the case of a single file, the `onMoveFile` handler is called with the file's path. The handler should return either the file's target directory if the file has been moved successfully; the file's source directory if the file cannot be moved and has been left in place; or null if the file has disappeared.
  
In the case of a directory, the relevant `onMoveFile` and `onMoveDirectory` handlers are called for each entry, starting with the outermost entries then working in and finishing with the directory itself. Handlers for subdirectories are guaranteed to only be called after handlers have been called for all their entries. 

```js
function onMoveFile(sourceFilePath, targetFilePath) {
  console.log('move file: ' + sourceFilePath + ' -> ' + targetFilePath)

  if (sourceFilePath === 'Second explorer/First directory/First file.fls') {
    console.log('...deleted.')

    return null;
  }

  if (sourceFilePath === 'Second explorer/First directory/Second file.fls') {
    console.log('...left in place.')

    return sourceFilePath;
  }

  return targetFilePath;
}

function onMoveDirectory(sourceDirectoryPath, targetDirectoryPath) {
  console.log('move directory: ' + sourceDirectoryPath + ' -> ' + targetDirectoryPath)

  if (sourceDirectoryPath === 'Second explorer/First directory') {
    console.log('...left in place.')

    return sourceDirectoryPath;
  }

  return targetDirectoryPath;
}
```

In this way it is possible to manage moving directories even when some of their entries cannot be moved. In the code sample above, for example, the `onMoveFile` handler returns `null` to signifiy that the `First file.fls` file has somehow disappeared and should be discarded in the move. On the other hand it results the source file path to signify that the `Second file.fls` cannot be dislodged and should be left in place in the move. If files cannot be moved their directories must also be left in place. The `onMoveDirectory` handler does just this for the folder containing these files. *It is important to note that the explorer will not automatically leave directories in place if their contents are signified ummoveable.* You must explicitly signify that it must do so.
   
#### Removing files and directories   
  
This is accomplished by dragging them in the rubbish bin.
  
```js
function onRemoveFile(sourceFilePath) {
  console.log('remove file: ' + sourceFilePath)

  if (sourceFilePath === 'Second explorer/First directory/Second file.fls') {
    console.log('...left in place.')

    return sourceFilePath;
  }

  return null;
}

function onRemoveDirectory(sourceDirectoryPath) {
  console.log('remove directory: ' + sourceDirectoryPath)

  if (sourceDirectoryPath === 'Second explorer/First directory') {
    console.log('...left in place.')

    return sourceDirectoryPath;
  }

  if (sourceDirectoryPath === 'Second explorer/First directory') {
    console.log('...left in place.')

    return sourceDirectoryPath;
  }

  return null;
}
```
 
The process for handling files and directories dragged into the rubbish bin is much the same as that for files and directcories dragged in or between explorers. Only source paths are provided as arguments, however, target paths being superfluous. Again, returning `null` signifies that the file or directory should be deleted and this should be done explicitly by default. Files or directories to be left in place should have their handlers return the source path.

If the root directory of an explorer is dragged into the rubbish bin you can check for this and remove the entire explorer if you choose:

```js
if (sourceDirectoryPath === 'First explorer') {
  console.log('...remving entire explorer.')

  secondExplorer.removeDroppableElement(firstExplorer);

  firstExplorer.remove();

  return sourceDirectoryPath;
}
```

#### Changing the CSS

Feel free to change the CSS with care. Check the `example.css` file in the `docs/` folder for some CSS that works well. Note that the triangles used are defined in the `ToggleButton` class in the `lib/` folder. You'll need to re-build the package if you want to change these.

## Contact

* james.smith@djalbat.com
* http://djalbat.com
