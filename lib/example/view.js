"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _index = require("../index");
var _explorer = _interopRequireDefault(require("./explorer"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var View = function(properties) {
    var explorer = /*#__PURE__*/ React.createElement(_explorer.default, {
        topmostDirectoryName: "explorer",
        onOpen: openHandler,
        onMove: moveHandler
    }), rubbishBin = /*#__PURE__*/ React.createElement(_index.RubbishBin, {
        onRemove: removeHandler
    });
    explorer.addDirectoryPath("explorer/directory1");
    explorer.addDirectoryPath("explorer/directory2");
    explorer.addFilePath("explorer/directory1/file1.txt");
    explorer.addFilePath("explorer/directory1/file2.txt");
    explorer.addFilePath("explorer/directory2/file3.txt");
    explorer.addDropTarget(rubbishBin);
    rubbishBin.addDropTarget(explorer);
    return(/*#__PURE__*/ React.createElement("div", {
        className: "view"
    }, explorer, rubbishBin));
};
var _default = View;
exports.default = _default;
function openHandler(filePath) {
    alert(filePath);
}
function moveHandler(pathMaps, done) {
    done();
}
function removeHandler(pathMaps, done) {
    done();
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9leGFtcGxlL3ZpZXcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IFJ1YmJpc2hCaW4gfSBmcm9tIFwiLi4vaW5kZXhcIjsgIC8vL1xuXG5pbXBvcnQgRXhwbG9yZXIgZnJvbSBcIi4vZXhwbG9yZXJcIjtcblxuY29uc3QgVmlldyA9IChwcm9wZXJ0aWVzKSA9PiB7XG4gIGNvbnN0IGV4cGxvcmVyID1cblxuICAgICAgICAgIDxFeHBsb3JlciB0b3Btb3N0RGlyZWN0b3J5TmFtZT1cImV4cGxvcmVyXCIgb25PcGVuPXtvcGVuSGFuZGxlcn0gb25Nb3ZlPXttb3ZlSGFuZGxlcn0gLz5cblxuICAgICAgICAsXG4gICAgICAgIHJ1YmJpc2hCaW4gPVxuXG4gICAgICAgICAgPFJ1YmJpc2hCaW4gb25SZW1vdmU9e3JlbW92ZUhhbmRsZXJ9IC8+XG5cbiAgICAgICAgO1xuXG4gIGV4cGxvcmVyLmFkZERpcmVjdG9yeVBhdGgoXCJleHBsb3Jlci9kaXJlY3RvcnkxXCIpO1xuICBleHBsb3Jlci5hZGREaXJlY3RvcnlQYXRoKFwiZXhwbG9yZXIvZGlyZWN0b3J5MlwiKTtcbiAgZXhwbG9yZXIuYWRkRmlsZVBhdGgoXCJleHBsb3Jlci9kaXJlY3RvcnkxL2ZpbGUxLnR4dFwiKTtcbiAgZXhwbG9yZXIuYWRkRmlsZVBhdGgoXCJleHBsb3Jlci9kaXJlY3RvcnkxL2ZpbGUyLnR4dFwiKTtcbiAgZXhwbG9yZXIuYWRkRmlsZVBhdGgoXCJleHBsb3Jlci9kaXJlY3RvcnkyL2ZpbGUzLnR4dFwiKTtcblxuICBleHBsb3Jlci5hZGREcm9wVGFyZ2V0KHJ1YmJpc2hCaW4pO1xuXG4gIHJ1YmJpc2hCaW4uYWRkRHJvcFRhcmdldChleHBsb3Jlcik7XG5cbiAgcmV0dXJuIChcblxuICAgIDxkaXYgY2xhc3NOYW1lPVwidmlld1wiPlxuICAgICAge2V4cGxvcmVyfVxuICAgICAge3J1YmJpc2hCaW59XG4gICAgPC9kaXY+XG5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFZpZXc7XG5cbmZ1bmN0aW9uIG9wZW5IYW5kbGVyKGZpbGVQYXRoKSB7XG4gIGFsZXJ0KGZpbGVQYXRoKVxufVxuXG5mdW5jdGlvbiBtb3ZlSGFuZGxlcihwYXRoTWFwcywgZG9uZSkge1xuICBkb25lKCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUhhbmRsZXIocGF0aE1hcHMsIGRvbmUpIHtcbiAgZG9uZSgpO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJDQUFBLFVBQVk7Ozs7O0lBRWUsTUFBVTtJQUVoQixTQUFZOzs7Ozs7SUFFM0IsSUFBSSxZQUFJLFVBQVU7UUFDaEIsUUFBUSxxQ0FISyxTQUFZO1FBS2Isb0JBQW9CLEdBQUMsUUFBVTtRQUFDLE1BQU0sRUFBRSxXQUFXO1FBQUUsTUFBTSxFQUFFLFdBQVc7UUFHcEYsVUFBVSxxQ0FWUyxNQUFVO1FBWWYsUUFBUSxFQUFFLGFBQWE7O0lBSTNDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBQyxtQkFBcUI7SUFDL0MsUUFBUSxDQUFDLGdCQUFnQixFQUFDLG1CQUFxQjtJQUMvQyxRQUFRLENBQUMsV0FBVyxFQUFDLDZCQUErQjtJQUNwRCxRQUFRLENBQUMsV0FBVyxFQUFDLDZCQUErQjtJQUNwRCxRQUFRLENBQUMsV0FBVyxFQUFDLDZCQUErQjtJQUVwRCxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVU7SUFFakMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxRQUFROzhDQUk5QixHQUFHO1FBQUMsU0FBUyxHQUFDLElBQU07T0FDbEIsUUFBUSxFQUNSLFVBQVU7O2VBTUYsSUFBSTs7U0FFVixXQUFXLENBQUMsUUFBUTtJQUMzQixLQUFLLENBQUMsUUFBUTs7U0FHUCxXQUFXLENBQUMsUUFBUSxFQUFFLElBQUk7SUFDakMsSUFBSTs7U0FHRyxhQUFhLENBQUMsUUFBUSxFQUFFLElBQUk7SUFDbkMsSUFBSSJ9