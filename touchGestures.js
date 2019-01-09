function startDrag(e) {
  this.ontouchmove = this.onmspointermove = moveDrag;

  this.ontouchend = this.onmspointerup = function () {
    this.ontouchmove = this.onmspointermove = null;
    this.ontouchend = this.onmspointerup = null;
  }

  var pos = [this.offsetLeft, this.offsetTop];
  var that = this;
  var origin = getCoors(e);
  var box = document.getElementById('dragBox');

  function moveDrag(e) {
    var currentPos = getCoors(e);
    var deltaX = currentPos[0] - origin[0];
    var deltaY = currentPos[1] - origin[1];
    
    this.style.left = (pos[0] + deltaX > -1 && currentPos[0] <= box.offsetWidth) ? (pos[0] + deltaX) + 'px' : (pos[0] + deltaX < 0) ? '0px' : (box.offsetWidth - e.path[0].offsetWidth) + 'px';
    this.style.top = (pos[1] + deltaY > -1 && (pos[1] + deltaY + e.path[0].offsetHeight) <= box.offsetHeight) ? (pos[1] + deltaY) + 'px' : (pos[1] + deltaY < 0) ? '0px' : (box.offsetHeight - e.path[0].offsetHeight) + 'px';
    return false; // cancels scrolling
  }

  function getCoors(e) {
    var coors = [];
    if (e.targetTouches && e.targetTouches.length) {
      var thisTouch = e.targetTouches[0];
      coors[0] = thisTouch.clientX;
      coors[1] = thisTouch.clientY;
    } else {
      coors[0] = e.clientX;
      coors[1] = e.clientY;
    }
    return coors;
  }
}

var elements = document.querySelectorAll('.dragElement');
[].forEach.call(elements, function (element) {
  element.ontouchstart = element.onmspointerdown = startDrag;
});

document.ongesturechange = function () {
  return false;
}