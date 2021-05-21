"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _easy = require("easy");
var _event = require("../utilities/event");
var LEFT_MOUSE_BUTTON = _easy.constants.LEFT_MOUSE_BUTTON;
function enableDragging() {
    var timeout = null, topOffset = null, leftOffset = null, startMouseTop = null, startMouseLeft = null;
    this.setState({
        timeout: timeout,
        topOffset: topOffset,
        leftOffset: leftOffset,
        startMouseTop: startMouseTop,
        startMouseLeft: startMouseLeft
    });
    this.onMouseDown(mouseDownHandler, this);
}
function disableDragging() {
    this.offMouseDown(mouseDownHandler, this);
}
function isDragging() {
    var dragging = this.hasClass("dragging");
    return dragging;
}
function getTimeout() {
    var state = this.getState(), timeout = state.timeout;
    return timeout;
}
function resetTimeout() {
    var timeout = null;
    this.updateTimeout(timeout);
}
function updateTimeout(timeout) {
    this.updateState({
        timeout: timeout
    });
}
function getTopOffset() {
    var state = this.getState(), topOffset = state.topOffset;
    return topOffset;
}
function getLeftOffset() {
    var state = this.getState(), leftOffset = state.leftOffset;
    return leftOffset;
}
function setTopOffset(topOffset) {
    this.updateState({
        topOffset: topOffset
    });
}
function setLeftOffset(leftOffset) {
    this.updateState({
        leftOffset: leftOffset
    });
}
var _default = {
    enableDragging: enableDragging,
    disableDragging: disableDragging,
    isDragging: isDragging,
    getTimeout: getTimeout,
    resetTimeout: resetTimeout,
    updateTimeout: updateTimeout,
    getTopOffset: getTopOffset,
    getLeftOffset: getLeftOffset,
    setTopOffset: setTopOffset,
    setLeftOffset: setLeftOffset
};
exports.default = _default;
function mouseUpHandler(event, element) {
    _easy.window.off("blur", mouseUpHandler, this); ///
    _easy.window.offMouseUp(mouseUpHandler, this);
    _easy.window.offMouseMove(mouseMoveHandler, this);
    var dragging = this.isDragging();
    if (dragging) {
        var explorer = this.getExplorer(), draggableEntry = this; ///
        explorer.stopDragging(draggableEntry, (function() {
            this.stopDragging();
        }).bind(this));
    } else {
        this.stopWaitingToDrag();
    }
}
function mouseDownHandler(event, element) {
    var button = event.button;
    _easy.window.on("blur", mouseUpHandler, this); ///
    _easy.window.onMouseUp(mouseUpHandler, this);
    _easy.window.onMouseMove(mouseMoveHandler, this);
    if (button === LEFT_MOUSE_BUTTON) {
        var dragging = this.isDragging();
        if (!dragging) {
            var mouseTop = (0, _event).mouseTopFromEvent(event), mouseLeft = (0, _event).mouseLeftFromEvent(event);
            this.startWaitingToDrag(mouseTop, mouseLeft);
        }
    }
}
function mouseMoveHandler(event, element) {
    var pageX = event.pageX, pageY = event.pageY, mouseTop = pageY, mouseLeft = pageX;
    var dragging = this.isDragging();
    if (dragging) {
        this.dragging(mouseTop, mouseLeft);
    }
}
var counter = 0;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taXhpbnMvZHJhZ2dhYmxlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyB3aW5kb3csIGNvbnN0YW50cyB9IGZyb20gXCJlYXN5XCI7XG5cbmNvbnN0IHsgTEVGVF9NT1VTRV9CVVRUT04gfSA9IGNvbnN0YW50cztcblxuaW1wb3J0IHsgbW91c2VUb3BGcm9tRXZlbnQsIG1vdXNlTGVmdEZyb21FdmVudCB9IGZyb20gXCIuLi91dGlsaXRpZXMvZXZlbnRcIjtcblxuZnVuY3Rpb24gZW5hYmxlRHJhZ2dpbmcoKSB7XG4gIGNvbnN0IHRpbWVvdXQgPSBudWxsLFxuICAgICAgICB0b3BPZmZzZXQgPSBudWxsLFxuICAgICAgICBsZWZ0T2Zmc2V0ID0gbnVsbCxcbiAgICAgICAgc3RhcnRNb3VzZVRvcCA9IG51bGwsXG4gICAgICAgIHN0YXJ0TW91c2VMZWZ0ID0gbnVsbDtcblxuICB0aGlzLnNldFN0YXRlKHtcbiAgICB0aW1lb3V0LFxuICAgIHRvcE9mZnNldCxcbiAgICBsZWZ0T2Zmc2V0LFxuICAgIHN0YXJ0TW91c2VUb3AsXG4gICAgc3RhcnRNb3VzZUxlZnRcbiAgfSk7XG5cbiAgdGhpcy5vbk1vdXNlRG93bihtb3VzZURvd25IYW5kbGVyLCB0aGlzKTtcbn1cblxuZnVuY3Rpb24gZGlzYWJsZURyYWdnaW5nKCkge1xuICB0aGlzLm9mZk1vdXNlRG93bihtb3VzZURvd25IYW5kbGVyLCB0aGlzKTtcbn1cblxuZnVuY3Rpb24gaXNEcmFnZ2luZygpIHtcbiAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmhhc0NsYXNzKFwiZHJhZ2dpbmdcIik7XG5cbiAgcmV0dXJuIGRyYWdnaW5nO1xufVxuXG5mdW5jdGlvbiBnZXRUaW1lb3V0KCkge1xuICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcbiAgICAgIHsgdGltZW91dCB9ID0gc3RhdGU7XG5cbiAgcmV0dXJuIHRpbWVvdXQ7XG59XG5cbmZ1bmN0aW9uIHJlc2V0VGltZW91dCgpIHtcbiAgY29uc3QgdGltZW91dCA9IG51bGw7XG5cbiAgdGhpcy51cGRhdGVUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVUaW1lb3V0KHRpbWVvdXQpIHtcbiAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgdGltZW91dFxuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0VG9wT2Zmc2V0KCkge1xuICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcbiAgICAgICAgeyB0b3BPZmZzZXQgfSA9IHN0YXRlO1xuXG4gIHJldHVybiB0b3BPZmZzZXQ7XG59XG5cbmZ1bmN0aW9uIGdldExlZnRPZmZzZXQoKSB7XG4gIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxuICAgICAgICB7IGxlZnRPZmZzZXQgfSA9IHN0YXRlO1xuXG4gIHJldHVybiBsZWZ0T2Zmc2V0O1xufVxuXG5mdW5jdGlvbiBzZXRUb3BPZmZzZXQodG9wT2Zmc2V0KSB7XG4gIHRoaXMudXBkYXRlU3RhdGUoe1xuICAgIHRvcE9mZnNldFxuICB9KTtcbn1cblxuZnVuY3Rpb24gc2V0TGVmdE9mZnNldChsZWZ0T2Zmc2V0KSB7XG4gIHRoaXMudXBkYXRlU3RhdGUoe1xuICAgIGxlZnRPZmZzZXRcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZW5hYmxlRHJhZ2dpbmcsXG4gIGRpc2FibGVEcmFnZ2luZyxcbiAgaXNEcmFnZ2luZyxcbiAgZ2V0VGltZW91dCxcbiAgcmVzZXRUaW1lb3V0LFxuICB1cGRhdGVUaW1lb3V0LFxuICBnZXRUb3BPZmZzZXQsXG4gIGdldExlZnRPZmZzZXQsXG4gIHNldFRvcE9mZnNldCxcbiAgc2V0TGVmdE9mZnNldFxufTtcblxuZnVuY3Rpb24gbW91c2VVcEhhbmRsZXIoZXZlbnQsIGVsZW1lbnQpIHtcbiAgd2luZG93Lm9mZihcImJsdXJcIiwgbW91c2VVcEhhbmRsZXIsIHRoaXMpOyAgLy8vXG5cbiAgd2luZG93Lm9mZk1vdXNlVXAobW91c2VVcEhhbmRsZXIsIHRoaXMpO1xuXG4gIHdpbmRvdy5vZmZNb3VzZU1vdmUobW91c2VNb3ZlSGFuZGxlciwgdGhpcyk7XG5cbiAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICBpZiAoZHJhZ2dpbmcpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeSA9IHRoaXM7ICAvLy9cblxuICAgIGV4cGxvcmVyLnN0b3BEcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgKCkgPT4ge1xuICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnN0b3BXYWl0aW5nVG9EcmFnKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbW91c2VEb3duSGFuZGxlcihldmVudCwgZWxlbWVudCkge1xuICBjb25zdCB7IGJ1dHRvbiB9ID0gZXZlbnQ7XG5cbiAgd2luZG93Lm9uKFwiYmx1clwiLCBtb3VzZVVwSGFuZGxlciwgdGhpcyk7IC8vL1xuXG4gIHdpbmRvdy5vbk1vdXNlVXAobW91c2VVcEhhbmRsZXIsIHRoaXMpO1xuXG4gIHdpbmRvdy5vbk1vdXNlTW92ZShtb3VzZU1vdmVIYW5kbGVyLCB0aGlzKTtcblxuICBpZiAoYnV0dG9uID09PSBMRUZUX01PVVNFX0JVVFRPTikge1xuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICBpZiAoIWRyYWdnaW5nKSB7XG4gICAgICBjb25zdCBtb3VzZVRvcCA9IG1vdXNlVG9wRnJvbUV2ZW50KGV2ZW50KSxcbiAgICAgICAgICAgIG1vdXNlTGVmdCA9IG1vdXNlTGVmdEZyb21FdmVudChldmVudCk7XG5cbiAgICAgIHRoaXMuc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBtb3VzZU1vdmVIYW5kbGVyKGV2ZW50LCBlbGVtZW50KSB7XG4gIGNvbnN0IHsgcGFnZVgsIHBhZ2VZIH0gPSBldmVudCxcbiAgICAgICAgbW91c2VUb3AgPSBwYWdlWSxcbiAgICAgICAgbW91c2VMZWZ0ID0gcGFnZVg7XG5cbiAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICBpZiAoZHJhZ2dpbmcpIHtcbiAgICB0aGlzLmRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICB9XG59XG5cbmxldCBjb3VudGVyID0gMDsiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkNBQUEsVUFBWTs7Ozs7SUFFc0IsS0FBTTtJQUljLE1BQW9CO0lBRmxFLGlCQUFpQixHQUZTLEtBQU0sV0FFaEMsaUJBQWlCO1NBSWhCLGNBQWM7UUFDZixPQUFPLEdBQUcsSUFBSSxFQUNkLFNBQVMsR0FBRyxJQUFJLEVBQ2hCLFVBQVUsR0FBRyxJQUFJLEVBQ2pCLGFBQWEsR0FBRyxJQUFJLEVBQ3BCLGNBQWMsR0FBRyxJQUFJO1NBRXRCLFFBQVE7UUFDWCxPQUFPLEVBQVAsT0FBTztRQUNQLFNBQVMsRUFBVCxTQUFTO1FBQ1QsVUFBVSxFQUFWLFVBQVU7UUFDVixhQUFhLEVBQWIsYUFBYTtRQUNiLGNBQWMsRUFBZCxjQUFjOztTQUdYLFdBQVcsQ0FBQyxnQkFBZ0I7O1NBRzFCLGVBQWU7U0FDakIsWUFBWSxDQUFDLGdCQUFnQjs7U0FHM0IsVUFBVTtRQUNYLFFBQVEsUUFBUSxRQUFRLEVBQUMsUUFBVTtXQUVsQyxRQUFROztTQUdSLFVBQVU7UUFDWCxLQUFLLFFBQVEsUUFBUSxJQUNyQixPQUFPLEdBQUssS0FBSyxDQUFqQixPQUFPO1dBRU4sT0FBTzs7U0FHUCxZQUFZO1FBQ2IsT0FBTyxHQUFHLElBQUk7U0FFZixhQUFhLENBQUMsT0FBTzs7U0FHbkIsYUFBYSxDQUFDLE9BQU87U0FDdkIsV0FBVztRQUNkLE9BQU8sRUFBUCxPQUFPOzs7U0FJRixZQUFZO1FBQ2IsS0FBSyxRQUFRLFFBQVEsSUFDbkIsU0FBUyxHQUFLLEtBQUssQ0FBbkIsU0FBUztXQUVWLFNBQVM7O1NBR1QsYUFBYTtRQUNkLEtBQUssUUFBUSxRQUFRLElBQ25CLFVBQVUsR0FBSyxLQUFLLENBQXBCLFVBQVU7V0FFWCxVQUFVOztTQUdWLFlBQVksQ0FBQyxTQUFTO1NBQ3hCLFdBQVc7UUFDZCxTQUFTLEVBQVQsU0FBUzs7O1NBSUosYUFBYSxDQUFDLFVBQVU7U0FDMUIsV0FBVztRQUNkLFVBQVUsRUFBVixVQUFVOzs7O0lBS1osY0FBYyxFQUFkLGNBQWM7SUFDZCxlQUFlLEVBQWYsZUFBZTtJQUNmLFVBQVUsRUFBVixVQUFVO0lBQ1YsVUFBVSxFQUFWLFVBQVU7SUFDVixZQUFZLEVBQVosWUFBWTtJQUNaLGFBQWEsRUFBYixhQUFhO0lBQ2IsWUFBWSxFQUFaLFlBQVk7SUFDWixhQUFhLEVBQWIsYUFBYTtJQUNiLFlBQVksRUFBWixZQUFZO0lBQ1osYUFBYSxFQUFiLGFBQWE7OztTQUdOLGNBQWMsQ0FBQyxLQUFLLEVBQUUsT0FBTztJQTVGSixLQUFNLFFBNkYvQixHQUFHLEVBQUMsSUFBTSxHQUFFLGNBQWMsUUFBVSxDQUFHLEFBQUgsRUFBRyxBQUFILENBQUc7SUE3RmQsS0FBTSxRQStGL0IsVUFBVSxDQUFDLGNBQWM7SUEvRkEsS0FBTSxRQWlHL0IsWUFBWSxDQUFDLGdCQUFnQjtRQUU5QixRQUFRLFFBQVEsVUFBVTtRQUU1QixRQUFRO1lBQ0osUUFBUSxRQUFRLFdBQVcsSUFDM0IsY0FBYyxRQUFVLENBQUcsQUFBSCxFQUFHLEFBQUgsQ0FBRztRQUVqQyxRQUFRLENBQUMsWUFBWSxDQUFDLGNBQWM7aUJBQzdCLFlBQVk7OzthQUdkLGlCQUFpQjs7O1NBSWpCLGdCQUFnQixDQUFDLEtBQUssRUFBRSxPQUFPO1FBQzlCLE1BQU0sR0FBSyxLQUFLLENBQWhCLE1BQU07SUFsSGtCLEtBQU0sUUFvSC9CLEVBQUUsRUFBQyxJQUFNLEdBQUUsY0FBYyxRQUFTLENBQUcsQUFBSCxFQUFHLEFBQUgsQ0FBRztJQXBIWixLQUFNLFFBc0gvQixTQUFTLENBQUMsY0FBYztJQXRIQyxLQUFNLFFBd0gvQixXQUFXLENBQUMsZ0JBQWdCO1FBRS9CLE1BQU0sS0FBSyxpQkFBaUI7WUFDeEIsUUFBUSxRQUFRLFVBQVU7YUFFM0IsUUFBUTtnQkFDTCxRQUFRLE9BMUhrQyxNQUFvQixvQkEwSGpDLEtBQUssR0FDbEMsU0FBUyxPQTNIaUMsTUFBb0IscUJBMkgvQixLQUFLO2lCQUVyQyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsU0FBUzs7OztTQUt4QyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsT0FBTztRQUM5QixLQUFLLEdBQVksS0FBSyxDQUF0QixLQUFLLEVBQUUsS0FBSyxHQUFLLEtBQUssQ0FBZixLQUFLLEVBQ2QsUUFBUSxHQUFHLEtBQUssRUFDaEIsU0FBUyxHQUFHLEtBQUs7UUFFakIsUUFBUSxRQUFRLFVBQVU7UUFFNUIsUUFBUTthQUNMLFFBQVEsQ0FBQyxRQUFRLEVBQUUsU0FBUzs7O0lBSWpDLE9BQU8sR0FBRyxDQUFDIn0=