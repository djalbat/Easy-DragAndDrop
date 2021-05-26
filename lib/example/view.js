"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _easyWithStyle = _interopRequireDefault(require("easy-with-style"));
var _explorer = _interopRequireDefault(require("./explorer"));
var _rubbishBin = _interopRequireDefault(require("./rubbishBin"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _taggedTemplateLiteral(strings, raw) {
    if (!raw) {
        raw = strings.slice(0);
    }
    return Object.freeze(Object.defineProperties(strings, {
        raw: {
            value: Object.freeze(raw)
        }
    }));
}
function _templateObject() {
    var data = _taggedTemplateLiteral([
        "\n\n  display: grid;\n  min-height: 100vh;\n      \n  grid-template-rows: auto auto auto;\n  grid-template-columns: auto auto auto;  \n  grid-template-areas:\n  \n       \"rubbish-bin . .\"\n    \n        \". explorer .\"        \n    \n           \". . .\"\n    \n  ;\n\n"
    ]);
    _templateObject = function _templateObject() {
        return data;
    };
    return data;
}
var View = function(properties) {
    var className = properties.className, explorer = /*#__PURE__*/ React.createElement(_explorer.default, {
        topmostDirectoryName: "explorer",
        onOpen: openHandler,
        onMove: moveHandler
    }), rubbishBin = /*#__PURE__*/ React.createElement(_rubbishBin.default, {
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
        className: "".concat(className, " view")
    }, explorer, rubbishBin));
};
var _default = (0, _easyWithStyle).default(View)(_templateObject());
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9leGFtcGxlL3ZpZXcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB3aXRoU3R5bGUgZnJvbSBcImVhc3ktd2l0aC1zdHlsZVwiOyAgLy8vXG5cbmltcG9ydCBFeHBsb3JlciBmcm9tIFwiLi9leHBsb3JlclwiO1xuaW1wb3J0IFJ1YmJpc2hCaW4gZnJvbSBcIi4vcnViYmlzaEJpblwiO1xuXG5jb25zdCBWaWV3ID0gKHByb3BlcnRpZXMpID0+IHtcbiAgY29uc3QgeyBjbGFzc05hbWUgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgIGV4cGxvcmVyID1cblxuICAgICAgICAgIDxFeHBsb3JlciB0b3Btb3N0RGlyZWN0b3J5TmFtZT1cImV4cGxvcmVyXCIgb25PcGVuPXtvcGVuSGFuZGxlcn0gb25Nb3ZlPXttb3ZlSGFuZGxlcn0gLz5cblxuICAgICAgICAsXG4gICAgICAgIHJ1YmJpc2hCaW4gPVxuXG4gICAgICAgICAgPFJ1YmJpc2hCaW4gb25SZW1vdmU9e3JlbW92ZUhhbmRsZXJ9IC8+XG5cbiAgICAgICAgO1xuXG4gIGV4cGxvcmVyLmFkZERpcmVjdG9yeVBhdGgoXCJleHBsb3Jlci9kaXJlY3RvcnkxXCIpO1xuICBleHBsb3Jlci5hZGREaXJlY3RvcnlQYXRoKFwiZXhwbG9yZXIvZGlyZWN0b3J5MlwiKTtcbiAgZXhwbG9yZXIuYWRkRmlsZVBhdGgoXCJleHBsb3Jlci9kaXJlY3RvcnkxL2ZpbGUxLnR4dFwiKTtcbiAgZXhwbG9yZXIuYWRkRmlsZVBhdGgoXCJleHBsb3Jlci9kaXJlY3RvcnkxL2ZpbGUyLnR4dFwiKTtcbiAgZXhwbG9yZXIuYWRkRmlsZVBhdGgoXCJleHBsb3Jlci9kaXJlY3RvcnkyL2ZpbGUzLnR4dFwiKTtcblxuICBleHBsb3Jlci5hZGREcm9wVGFyZ2V0KHJ1YmJpc2hCaW4pO1xuXG4gIHJ1YmJpc2hCaW4uYWRkRHJvcFRhcmdldChleHBsb3Jlcik7XG5cbiAgcmV0dXJuIChcblxuICAgIDxkaXYgY2xhc3NOYW1lPXtgJHtjbGFzc05hbWV9IHZpZXdgfT5cbiAgICAgIHtleHBsb3Jlcn1cbiAgICAgIHtydWJiaXNoQmlufVxuICAgIDwvZGl2PlxuXG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGUoVmlldylgXG5cbiAgZGlzcGxheTogZ3JpZDtcbiAgbWluLWhlaWdodDogMTAwdmg7XG4gICAgICBcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIGF1dG8gYXV0bztcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBhdXRvIGF1dG8gYXV0bzsgIFxuICBncmlkLXRlbXBsYXRlLWFyZWFzOlxuICBcbiAgICAgICBcInJ1YmJpc2gtYmluIC4gLlwiXG4gICAgXG4gICAgICAgIFwiLiBleHBsb3JlciAuXCIgICAgICAgIFxuICAgIFxuICAgICAgICAgICBcIi4gLiAuXCJcbiAgICBcbiAgO1xuXG5gO1xuXG5mdW5jdGlvbiBvcGVuSGFuZGxlcihmaWxlUGF0aCkge1xuICBhbGVydChmaWxlUGF0aClcbn1cblxuZnVuY3Rpb24gbW92ZUhhbmRsZXIocGF0aE1hcHMsIGRvbmUpIHtcbiAgZG9uZSgpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVIYW5kbGVyKHBhdGhNYXBzLCBkb25lKSB7XG4gIGRvbmUoKTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQ0FBQSxVQUFZOzs7OztJQUVVLGNBQWlCO0lBRWxCLFNBQVk7SUFDVixXQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FtQ04sZ1JBaUIvQjs7Ozs7OztJQWxETSxJQUFJLFlBQUksVUFBVTtRQUNkLFNBQVMsR0FBSyxVQUFVLENBQXhCLFNBQVMsRUFDWCxRQUFRLHFDQUxLLFNBQVk7UUFPYixvQkFBb0IsR0FBQyxRQUFVO1FBQUMsTUFBTSxFQUFFLFdBQVc7UUFBRSxNQUFNLEVBQUUsV0FBVztRQUdwRixVQUFVLHFDQVRLLFdBQWM7UUFXZixRQUFRLEVBQUUsYUFBYTs7SUFJM0MsUUFBUSxDQUFDLGdCQUFnQixFQUFDLG1CQUFxQjtJQUMvQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUMsbUJBQXFCO0lBQy9DLFFBQVEsQ0FBQyxXQUFXLEVBQUMsNkJBQStCO0lBQ3BELFFBQVEsQ0FBQyxXQUFXLEVBQUMsNkJBQStCO0lBQ3BELFFBQVEsQ0FBQyxXQUFXLEVBQUMsNkJBQStCO0lBRXBELFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVTtJQUVqQyxVQUFVLENBQUMsYUFBYSxDQUFDLFFBQVE7OENBSTlCLEdBQUc7UUFBQyxTQUFTLEtBQWUsTUFBSyxDQUFmLFNBQVMsR0FBQyxLQUFLO09BQy9CLFFBQVEsRUFDUixVQUFVOzttQkFoQ0ssY0FBaUIsVUFzQ2QsSUFBSTs7U0FtQnBCLFdBQVcsQ0FBQyxRQUFRO0lBQzNCLEtBQUssQ0FBQyxRQUFROztTQUdQLFdBQVcsQ0FBQyxRQUFRLEVBQUUsSUFBSTtJQUNqQyxJQUFJOztTQUdHLGFBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSTtJQUNuQyxJQUFJIn0=