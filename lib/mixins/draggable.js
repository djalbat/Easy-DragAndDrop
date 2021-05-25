"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _easy = require("easy");
var _constants = require("../constants");
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
    _easy.window.off(_constants.BLUR, mouseUpHandler, this); ///
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
    _easy.window.on(_constants.BLUR, mouseUpHandler, this); ///
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taXhpbnMvZHJhZ2dhYmxlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyB3aW5kb3csIGNvbnN0YW50cyB9IGZyb20gXCJlYXN5XCI7XG5cbmltcG9ydCB7IEJMVVIgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBtb3VzZVRvcEZyb21FdmVudCwgbW91c2VMZWZ0RnJvbUV2ZW50IH0gZnJvbSBcIi4uL3V0aWxpdGllcy9ldmVudFwiO1xuXG5jb25zdCB7IExFRlRfTU9VU0VfQlVUVE9OIH0gPSBjb25zdGFudHM7XG5cbmZ1bmN0aW9uIGVuYWJsZURyYWdnaW5nKCkge1xuICBjb25zdCB0aW1lb3V0ID0gbnVsbCxcbiAgICAgICAgdG9wT2Zmc2V0ID0gbnVsbCxcbiAgICAgICAgbGVmdE9mZnNldCA9IG51bGwsXG4gICAgICAgIHN0YXJ0TW91c2VUb3AgPSBudWxsLFxuICAgICAgICBzdGFydE1vdXNlTGVmdCA9IG51bGw7XG5cbiAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgdGltZW91dCxcbiAgICB0b3BPZmZzZXQsXG4gICAgbGVmdE9mZnNldCxcbiAgICBzdGFydE1vdXNlVG9wLFxuICAgIHN0YXJ0TW91c2VMZWZ0XG4gIH0pO1xuXG4gIHRoaXMub25Nb3VzZURvd24obW91c2VEb3duSGFuZGxlciwgdGhpcyk7XG59XG5cbmZ1bmN0aW9uIGRpc2FibGVEcmFnZ2luZygpIHtcbiAgdGhpcy5vZmZNb3VzZURvd24obW91c2VEb3duSGFuZGxlciwgdGhpcyk7XG59XG5cbmZ1bmN0aW9uIGlzRHJhZ2dpbmcoKSB7XG4gIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5oYXNDbGFzcyhcImRyYWdnaW5nXCIpO1xuXG4gIHJldHVybiBkcmFnZ2luZztcbn1cblxuZnVuY3Rpb24gZ2V0VGltZW91dCgpIHtcbiAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXG4gICAgICB7IHRpbWVvdXQgfSA9IHN0YXRlO1xuXG4gIHJldHVybiB0aW1lb3V0O1xufVxuXG5mdW5jdGlvbiByZXNldFRpbWVvdXQoKSB7XG4gIGNvbnN0IHRpbWVvdXQgPSBudWxsO1xuXG4gIHRoaXMudXBkYXRlVGltZW91dCh0aW1lb3V0KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlVGltZW91dCh0aW1lb3V0KSB7XG4gIHRoaXMudXBkYXRlU3RhdGUoe1xuICAgIHRpbWVvdXRcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldFRvcE9mZnNldCgpIHtcbiAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXG4gICAgICAgIHsgdG9wT2Zmc2V0IH0gPSBzdGF0ZTtcblxuICByZXR1cm4gdG9wT2Zmc2V0O1xufVxuXG5mdW5jdGlvbiBnZXRMZWZ0T2Zmc2V0KCkge1xuICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcbiAgICAgICAgeyBsZWZ0T2Zmc2V0IH0gPSBzdGF0ZTtcblxuICByZXR1cm4gbGVmdE9mZnNldDtcbn1cblxuZnVuY3Rpb24gc2V0VG9wT2Zmc2V0KHRvcE9mZnNldCkge1xuICB0aGlzLnVwZGF0ZVN0YXRlKHtcbiAgICB0b3BPZmZzZXRcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNldExlZnRPZmZzZXQobGVmdE9mZnNldCkge1xuICB0aGlzLnVwZGF0ZVN0YXRlKHtcbiAgICBsZWZ0T2Zmc2V0XG4gIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGVuYWJsZURyYWdnaW5nLFxuICBkaXNhYmxlRHJhZ2dpbmcsXG4gIGlzRHJhZ2dpbmcsXG4gIGdldFRpbWVvdXQsXG4gIHJlc2V0VGltZW91dCxcbiAgdXBkYXRlVGltZW91dCxcbiAgZ2V0VG9wT2Zmc2V0LFxuICBnZXRMZWZ0T2Zmc2V0LFxuICBzZXRUb3BPZmZzZXQsXG4gIHNldExlZnRPZmZzZXRcbn07XG5cbmZ1bmN0aW9uIG1vdXNlVXBIYW5kbGVyKGV2ZW50LCBlbGVtZW50KSB7XG4gIHdpbmRvdy5vZmYoQkxVUiwgbW91c2VVcEhhbmRsZXIsIHRoaXMpOyAgLy8vXG5cbiAgd2luZG93Lm9mZk1vdXNlVXAobW91c2VVcEhhbmRsZXIsIHRoaXMpO1xuXG4gIHdpbmRvdy5vZmZNb3VzZU1vdmUobW91c2VNb3ZlSGFuZGxlciwgdGhpcyk7XG5cbiAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICBpZiAoZHJhZ2dpbmcpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeSA9IHRoaXM7ICAvLy9cblxuICAgIGV4cGxvcmVyLnN0b3BEcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgKCkgPT4ge1xuICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnN0b3BXYWl0aW5nVG9EcmFnKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbW91c2VEb3duSGFuZGxlcihldmVudCwgZWxlbWVudCkge1xuICBjb25zdCB7IGJ1dHRvbiB9ID0gZXZlbnQ7XG5cbiAgd2luZG93Lm9uKEJMVVIsIG1vdXNlVXBIYW5kbGVyLCB0aGlzKTsgLy8vXG5cbiAgd2luZG93Lm9uTW91c2VVcChtb3VzZVVwSGFuZGxlciwgdGhpcyk7XG5cbiAgd2luZG93Lm9uTW91c2VNb3ZlKG1vdXNlTW92ZUhhbmRsZXIsIHRoaXMpO1xuXG4gIGlmIChidXR0b24gPT09IExFRlRfTU9VU0VfQlVUVE9OKSB7XG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmICghZHJhZ2dpbmcpIHtcbiAgICAgIGNvbnN0IG1vdXNlVG9wID0gbW91c2VUb3BGcm9tRXZlbnQoZXZlbnQpLFxuICAgICAgICAgICAgbW91c2VMZWZ0ID0gbW91c2VMZWZ0RnJvbUV2ZW50KGV2ZW50KTtcblxuICAgICAgdGhpcy5zdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG1vdXNlTW92ZUhhbmRsZXIoZXZlbnQsIGVsZW1lbnQpIHtcbiAgY29uc3QgeyBwYWdlWCwgcGFnZVkgfSA9IGV2ZW50LFxuICAgICAgICBtb3VzZVRvcCA9IHBhZ2VZLFxuICAgICAgICBtb3VzZUxlZnQgPSBwYWdlWDtcblxuICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gIGlmIChkcmFnZ2luZykge1xuICAgIHRoaXMuZHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQ0FBQSxVQUFZOzs7OztJQUVzQixLQUFNO0lBRW5CLFVBQWM7SUFDbUIsTUFBb0I7SUFFbEUsaUJBQWlCLEdBTFMsS0FBTSxXQUtoQyxpQkFBaUI7U0FFaEIsY0FBYztRQUNmLE9BQU8sR0FBRyxJQUFJLEVBQ2QsU0FBUyxHQUFHLElBQUksRUFDaEIsVUFBVSxHQUFHLElBQUksRUFDakIsYUFBYSxHQUFHLElBQUksRUFDcEIsY0FBYyxHQUFHLElBQUk7U0FFdEIsUUFBUTtRQUNYLE9BQU8sRUFBUCxPQUFPO1FBQ1AsU0FBUyxFQUFULFNBQVM7UUFDVCxVQUFVLEVBQVYsVUFBVTtRQUNWLGFBQWEsRUFBYixhQUFhO1FBQ2IsY0FBYyxFQUFkLGNBQWM7O1NBR1gsV0FBVyxDQUFDLGdCQUFnQjs7U0FHMUIsZUFBZTtTQUNqQixZQUFZLENBQUMsZ0JBQWdCOztTQUczQixVQUFVO1FBQ1gsUUFBUSxRQUFRLFFBQVEsRUFBQyxRQUFVO1dBRWxDLFFBQVE7O1NBR1IsVUFBVTtRQUNYLEtBQUssUUFBUSxRQUFRLElBQ3JCLE9BQU8sR0FBSyxLQUFLLENBQWpCLE9BQU87V0FFTixPQUFPOztTQUdQLFlBQVk7UUFDYixPQUFPLEdBQUcsSUFBSTtTQUVmLGFBQWEsQ0FBQyxPQUFPOztTQUduQixhQUFhLENBQUMsT0FBTztTQUN2QixXQUFXO1FBQ2QsT0FBTyxFQUFQLE9BQU87OztTQUlGLFlBQVk7UUFDYixLQUFLLFFBQVEsUUFBUSxJQUNuQixTQUFTLEdBQUssS0FBSyxDQUFuQixTQUFTO1dBRVYsU0FBUzs7U0FHVCxhQUFhO1FBQ2QsS0FBSyxRQUFRLFFBQVEsSUFDbkIsVUFBVSxHQUFLLEtBQUssQ0FBcEIsVUFBVTtXQUVYLFVBQVU7O1NBR1YsWUFBWSxDQUFDLFNBQVM7U0FDeEIsV0FBVztRQUNkLFNBQVMsRUFBVCxTQUFTOzs7U0FJSixhQUFhLENBQUMsVUFBVTtTQUMxQixXQUFXO1FBQ2QsVUFBVSxFQUFWLFVBQVU7Ozs7SUFLWixjQUFjLEVBQWQsY0FBYztJQUNkLGVBQWUsRUFBZixlQUFlO0lBQ2YsVUFBVSxFQUFWLFVBQVU7SUFDVixVQUFVLEVBQVYsVUFBVTtJQUNWLFlBQVksRUFBWixZQUFZO0lBQ1osYUFBYSxFQUFiLGFBQWE7SUFDYixZQUFZLEVBQVosWUFBWTtJQUNaLGFBQWEsRUFBYixhQUFhO0lBQ2IsWUFBWSxFQUFaLFlBQVk7SUFDWixhQUFhLEVBQWIsYUFBYTs7O1NBR04sY0FBYyxDQUFDLEtBQUssRUFBRSxPQUFPO0lBN0ZKLEtBQU0sUUE4Ri9CLEdBQUcsQ0E1RlMsVUFBYyxPQTRGaEIsY0FBYyxRQUFVLENBQUcsQUFBSCxFQUFHLEFBQUgsQ0FBRztJQTlGWixLQUFNLFFBZ0cvQixVQUFVLENBQUMsY0FBYztJQWhHQSxLQUFNLFFBa0cvQixZQUFZLENBQUMsZ0JBQWdCO1FBRTlCLFFBQVEsUUFBUSxVQUFVO1FBRTVCLFFBQVE7WUFDSixRQUFRLFFBQVEsV0FBVyxJQUMzQixjQUFjLFFBQVUsQ0FBRyxBQUFILEVBQUcsQUFBSCxDQUFHO1FBRWpDLFFBQVEsQ0FBQyxZQUFZLENBQUMsY0FBYztpQkFDN0IsWUFBWTs7O2FBR2QsaUJBQWlCOzs7U0FJakIsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLE9BQU87UUFDOUIsTUFBTSxHQUFLLEtBQUssQ0FBaEIsTUFBTTtJQW5Ia0IsS0FBTSxRQXFIL0IsRUFBRSxDQW5IVSxVQUFjLE9BbUhqQixjQUFjLFFBQVMsQ0FBRyxBQUFILEVBQUcsQUFBSCxDQUFHO0lBckhWLEtBQU0sUUF1SC9CLFNBQVMsQ0FBQyxjQUFjO0lBdkhDLEtBQU0sUUF5SC9CLFdBQVcsQ0FBQyxnQkFBZ0I7UUFFL0IsTUFBTSxLQUFLLGlCQUFpQjtZQUN4QixRQUFRLFFBQVEsVUFBVTthQUUzQixRQUFRO2dCQUNMLFFBQVEsT0E1SGtDLE1BQW9CLG9CQTRIakMsS0FBSyxHQUNsQyxTQUFTLE9BN0hpQyxNQUFvQixxQkE2SC9CLEtBQUs7aUJBRXJDLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxTQUFTOzs7O1NBS3hDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxPQUFPO1FBQzlCLEtBQUssR0FBWSxLQUFLLENBQXRCLEtBQUssRUFBRSxLQUFLLEdBQUssS0FBSyxDQUFmLEtBQUssRUFDZCxRQUFRLEdBQUcsS0FBSyxFQUNoQixTQUFTLEdBQUcsS0FBSztRQUVqQixRQUFRLFFBQVEsVUFBVTtRQUU1QixRQUFRO2FBQ0wsUUFBUSxDQUFDLFFBQVEsRUFBRSxTQUFTIn0=