# Easy DragAndDrop

Drag and drop elements including an explorer and a rubbish bin.

The explorer element is populated with list of files and directories. It takes handlers for opening files and for moving and removing files an directories. Removing files and directories is done by dragging them into the rubbish bin. Or the explorer element can be altered programmatically.

### JSX support

There is now support for JSX in the form of [Juxtapose](https://github.com/djalbat/Juxtapose). JSX brings with it [several benefits](http://djalbat.com/juxtapose#jsxIsGreat). So although you will always be able to call constructors directly if you wish, creating Easy elements by way of JSX is *highly recommended*. The contents of this readme file will stay as a reference, however a much better place to start from now on is the online documentation for Juxtapose. The section dealing directly with this project is here:

* [Juxtapose online documentation - Easy-DragAndDrop](http://juxtapose.info/#easyDragAndDrop)

From there you can easily navigate to get an overview of Juxtapose.

### Related projects

- [Easy](https://github.com/djalbat/easy) Elements that abstract away from the DOM.
- [Easy Layout](https://github.com/djalbat/easy-layout) Layout elements that work with CSS flexbox.
- [Easy RichTextarea](https://github.com/djalbat/easy-richrextarea) A textarea element that handles and hands off events well.

## Installation

You can install Easy-DragAndDrop with [npm](https://www.npmjs.com/):

    npm install easy-draganddrop

You can also clone the repository with [Git](https://git-scm.com/)...

    git clone https://github.com/djalbat/easy-draganddrop.git

...and then install the dependencies with npm from within the project's topmost directory:

    npm install

## Usage

```
import { Explorer, RubbishBin } from "easy-draganddrop";

const topmostDirectoryName = "First explorer",
      explorer =

        <Explorer topmostDirectoryName={topmostDirectoryName} onMove={moveHandler} onOpen={openHandler} />,

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

```
secondExplorer.addDirectoryPath("Second explorer/First directory");
secondExplorer.addDirectoryPath("Second explorer/Second directory");
secondExplorer.addFilePath("Second explorer/First directory/First file.fls");
secondExplorer.addFilePath("Second explorer/First directory/Second file.fls");
secondExplorer.addFilePath("Second explorer/Second directory/Third file.fls");
```

The `addDirectoryPath()` method has a second, optional `collapsed` argument. The default is `false`. The explorer will add the necessary parent directories for you whenever you add a file. If you try to add a file or directory more than once, nothing will happen.

You can also remove files and non-empty directories programmatically:

```
secondExplorer.removeFilePath("Second explorer/First directory/Second file.fls", true);
secondExplorer.removeFilePath("Second explorer/Second directory/Third file.fls", false);
secondExplorer.removeDirectoryPath("Second explorer/Second directory", false);
```

You cannot remove the topmost directory, and if you try to remove a file or directory more than once, nothing happens.

Note that the methods are `addFilePath()`, `removeDirectoryPath()` and so on. This is because the explorer is simply a visual widget for maninpulating paths, there are no actual files and directories directly involved.

## Dragging between elements

Use the `addDropTarget()` method to have one element listen for the dragging events of another.

```
firstExplorer.addDropTarget(secondExplorer);
secondExplorer.addDropTarget(firstExplorer);
firstExplorer.addDropTarget(rubbishBin);
secondExplorer.addDropTarget(rubbishBin);
```

Here the rubbish bin will listen for dragging events from both of the explorers. Each of the explorers will listen for dragging events of the other one.

## Opening files

This is done by double clicking on them, in which case the requisite handler is called with the file's path.

```
function openHandler(filePath) {
  console.log(`Open: '${filePath}'.`)
}
```

It is fine not to define the open handler.

## Handling moving files and directories

The requisite handler is invoked with an array of path maps and a `done` argument. You must call the `done()` method when you are done. Each element of the array of path maps is a mutable plain old JavaScript object with `sourcePath`, `targetPath` and `directory` properties. The `directory` property is set to `true` if the entry is a directory. If you want the entry to be moved, leave the object as-is. If you want the entry to be left in place, change the target path to the source path. If you want the entry to be removed, change the target path to `null`. Simply leaving the array of path maps alone with therefore move the entries as expected. 

```
function moveHandler(pathMaps, done) {
  pathMaps.forEach((pathMap) => {
    const sourcePath = pathMap["sourcePath"],
          targetPath = pathMap["targetPath"];
          
    console.log(`Move file: '${sourcePath}' -> '${targetPath}'.`)

    switch(sourcePath) {
      case "Second explorer/First directory/First file.fls":
        console.log("...deleted.")

        targetPath = null;
        break;

      case "Second explorer/First directory/Second file.fls":
      case "Second explorer/First directory":
        console.log("...left in place.")

        targetPath = sourcePath;
        break;
    }

    pathMap["targetPath"] = targetPath;
  });

  done();
}
```

If no move handler is provided the array of path maps is left unchanged.
   
## Handling removing files and directories
  
The requisite handler is invoked with an array of path maps and a `done` argument. You must call the `done()` method when you are done. Each element of the array of path maps is a mutable plain old JavaScript object again with `sourcePath`, `targetPath` and `directory` properties. The target path will be set to `null` and again the `directory` property is set to `true` if the entry is a directory. If you want the entry to be removed, leave the object as-is. If you want the entry to be left in place, change the the target path to the source path. Simply leaving the array of path maps alone will therefore remove the entries as expected.

```
function removeHandler(pathMaps, done) {
  pathMaps.forEach((pathMap) => {
    const sourcePath = pathMap["sourcePath"],
          targetPath = pathMap["targetPath"];

    console.log(`Remove file: '${sourcePath}'.`)

    switch(sourcePath) {
      case "Second explorer/First directory/Second file.fls":
      case "Second explorer/First directory":
        console.log(""...left in place.")

        targetPath = sourcePath;
        break;
    }

    pathMap["targetPath"] = targetPath;
  });

  done();
}
```

If no remove handler is provided the array of path maps is left unchanged.

## Styles

There is a small amount of default styling. All the elements have class names, however, allowing you to override this with CSS. Or a better way is to use [Easy with Style](https://github.com/djalbat/easy-with-style). For example:

```
import withStyle from "easy-with-style";

export default (Explorer)`

  background: transparent;

`;
```
In order to style the explorer's child elements, such as buttons and markers, you must appraise the parent element of the re-styled element by setting it as a static property. For example:

```
import FileNameDraggableEntry from "...";
import DirectoryNameMarkerEntry from "...";

export default class extends Explorer {
  static FileNameDraggableEntry = FileNameDraggableEntry;

  static DirectoryNameMarkerEntry = DirectoryNameMarkerEntry;
};
```
Here an anonymous class with overriding static fields is exported. The five child classes of the `Explorer` class whose styles can be overridden in this way are:

 * `Entries`
 * `FileNameMarkerEntry`
 * `FileNameDraggableEntry`
 * `DirectoryNameMarkerEntry`
 * `DirectoryNameDraggableEntry`

The `DirectoryNameDraggableEntry` class has two:

 * `ToggleButton`
 * `DirectoryNameButton`

And the `FileNameDraggableEntry` class has one:

 * `FileNameButton`

Finally, the `font-family`, `font-size` and `font-weight` properties of all of the buttons have been set to `inherit`. Therefore you can affect these properties for the explorer overall by setting them on the explorer itself, saving you the trouble of overriding any of the font styles by the above means.

## Compiling from source

Automation is done with [npm scripts](https://docs.npmjs.com/misc/scripts), have a look at the `package.json` file. The pertinent commands are:

    npm run build-debug
    npm run watch-debug

## Contact

* james.smith@djalbat.com
* http://djalbat.com
