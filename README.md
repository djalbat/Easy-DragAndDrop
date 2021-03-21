# Easy DragAndDrop

Drag and drop elements including an explorer and a rubbish bin.

The explorer element is populated with list of files and directories. It takes handlers for opening files and for moving and removing files an directories. Removing files and directories is done by dragging them into the rubbish bin. Or the explorer element can be altered programmatically.

### JSX support

There is now support for JSX in the form of [Juxtapose](https://github.com/djalbat/Juxtapose). So although you will always be able to call constructors directly if you wish, creating Easy elements by way of JSX is *highly recommended*. The contents of this readme file will stay as a reference, however a much better place to start from now on is the online documentation for Juxtapose. The section dealing directly with this project is here:

**[Juxtapose online documentation - Easy-DragAndDrop](http://juxtapose.info/#easy-draganddrop)**

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

When created, the `Explorer` and `RubbishBin` elements can be passed optional handlers:

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

### Adding and removing files and directories

You can add file or empty directory paths:

```
explorer.addDirectoryPath("Explorer/Directory");
explorer.addFilePath("Explorer/Directory/First file.fls");
explorer.addFilePath("Explorer/Directory/Second file.fls");
```

The `addDirectoryPath()` method has a second, optional `collapsed` argument. The default is `false`. The explorer will add the necessary parent directories for you whenever you add a file. If you try to add a file or directory more than once, nothing will happen.

You can also remove files and non-empty directories programmatically:

```
explorer.removeFilePath("Explorer/Directory/Second file.fls", true);
explorer.removeDirectoryPath("Explorer/Directory", false);
```

You cannot remove the topmost directory, and if you try to remove a file or directory more than once, nothing happens.

### Dragging between elements

Use the `addDropTarget()` method to have one element listen for the dragging events of another.

```
explorer.addDropTarget(explorer);
```

Now the rubbish bin will listen for dragging events from the explorer.

### Opening files

This is done by double clicking on them, in which case the requisite handler is called with the file's path.

```
function openHandler(filePath) {
  console.log(`Open: '${filePath}'.`)
}
```

It is fine not to define the open handler.

### Handling moving files and directories

The requisite handler is invoked with two arguments: an array of path maps and a `done` callback method. You *must* call the `done()` method when you are done. Each element of the array of path maps is a mutable plain old JavaScript object with `sourcePath`, `targetPath` and `directory` properties. The `directory` property is set to `true` if the entry is a directory. If you want the entry to be moved, leave the object as-is. If you want the entry to be left in place, change the target path to the source path. If you want the entry to be removed, change the target path to `null`. Simply leaving the array of path maps alone with therefore move the entries as expected.

```
function moveHandler(pathMaps, done) {
  pathMaps.forEach((pathMap) => {
    const sourcePath = pathMap["sourcePath"],
          targetPath = pathMap["targetPath"];
          
    console.log(`Move file: '${sourcePath}' -> '${targetPath}'.`)

    switch(sourcePath) {
      case "Explorer/Directory/First file.fls":
        console.log("...deleted.")

        targetPath = null;
        break;

      case "Explorer/Directory/Second file.fls":
      case "Explorer/Directory":
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
   
### Handling removing files and directories
  
The requisite handler is invoked with two arguments: an array of path maps and a `done` callback method. You *must* call the `done()` method when you are done. Each element of the array of path maps is a mutable plain old JavaScript object again with `sourcePath`, `targetPath` and `directory` properties. The target path will be set to `null` and again the `directory` property is set to `true` if the entry is a directory. If you want the entry to be removed, leave the object as-is. If you want the entry to be left in place, change the the target path to the source path. Simply leaving the array of path maps alone will therefore remove the entries as expected.

```
function removeHandler(pathMaps, done) {
  pathMaps.forEach((pathMap) => {
    const sourcePath = pathMap["sourcePath"],
          targetPath = pathMap["targetPath"];

    console.log(`Remove file: '${sourcePath}'.`)

    switch(sourcePath) {
      case "Explorer/Directory/Second file.fls":
      case "Explorer/Directory":
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

## Building

Automation is done with [npm scripts](https://docs.npmjs.com/misc/scripts), have a look at the `package.json` file. The pertinent commands are:

    npm run build-debug
    npm run watch-debug

## Contact

* james.smith@djalbat.com
