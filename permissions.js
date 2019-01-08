if ('permissions' in navigator) {
  var logTarget = document.getElementById('permissionLog');

  function handleChange(permissionName, newState) {
    var timeBadge = new Date().toTimeString().split(' ')[0];
    logTarget.innerHTML = '<span class="badge">' + timeBadge + '</span> State of <b>' + permissionName + '</b> permission status changed to <b>' + newState + '</b>.';
  }

  function checkPermission(permissionName, descriptor) {
    try {
    navigator.permissions.query(Object.assign({name: permissionName}, descriptor))
      .then(function (permission) {
        document.getElementById(permissionName + '-status').innerHTML = permission.state;
        permission.addEventListener('change', function (e) {
          document.getElementById(permissionName + '-status').innerHTML = permission.state;
          handleChange(permissionName, permission.state);
        });
      });
    } catch (e) {
    }
  }

  checkPermission('geolocation');
  checkPermission('notifications');
  checkPermission('push', {userVisibleOnly: true});
  checkPermission('midi', {sysex: true});
  checkPermission('camera');
  checkPermission('microphone');
  checkPermission('background-sync');
  checkPermission('accelerometer');
  checkPermission('gyroscope');
  checkPermission('magnetometer');

  var noop = function () {};
  navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
  
  function requestGeolocation() {
    navigator.geolocation.getCurrentPosition(noop);
  }

  function requestNotifications() {
    Notification.requestPermission();
  }

  function requestPush() {
    navigator.serviceWorker.getRegistration()
      .then(function (serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.subscribe();
      });
  }

  function requestMidi() {
    navigator.requestMIDIAccess({sysex: true});
  }
  
  function requestCamera() {
    navigator.getUserMedia({video: true}, noop, noop)
  }
  
  function requestMicrophone() {
    navigator.getUserMedia({audio: true}, noop, noop)
  }
}