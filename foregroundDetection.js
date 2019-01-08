var target1 = document.getElementById('foreDetectLog1');
var target2 = document.getElementById('foreDetectLog2');

var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") {
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.mozHidden !== "undefined") {
  hidden = "mozHidden";
  visibilityChange = "mozvisibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
} else {
  target1.innerText = 'Page Visibility API not supported.';
}

function handleVisibilityChange() {
  var timeBadge = new Date().toTimeString().split(' ')[0];
  if (document[hidden]) {target1.innerHTML = '<span class="badge">' + timeBadge + '</span> Page visibility changed to <b>hidden</b>.';}
  if (!document[hidden]) {target2.innerHTML = '<span class="badge">' + timeBadge + '</span> Page visibility changed to <b>visible</b>.';}
}

document.addEventListener(visibilityChange, handleVisibilityChange, false);

if (hidden in document) {
  document.getElementById('foreDetect').innerHTML = document[hidden] ? 'hidden' : 'visible';
}