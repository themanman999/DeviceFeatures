var $status = document.getElementById('noticeStatus');

if ('Notification' in window) {
  $status.innerText = Notification.permission;
}

function requestPermission() {
  if (!('Notification' in window)) {
    alert('Notification API not supported!');
    return;
  }
  
  Notification.requestPermission(function (result) {
    $status.innerText = result;
  });
}


function nonPersistentNotification() {
  if (window.Notification && Notification.permission == 'granted') {
      // We would only have prompted the user for permission if new
      // Notification was supported (see below), so assume it is supported.
      var notification = new Notification("Hi there - non-persistent!");
  } else if (isNewNotificationSupported()) {
      // new Notification is supported, so prompt the user for permission.
          if (!window.Notification || !Notification.requestPermission)
          return false;
      if (Notification.permission == 'granted')
          throw new Error('You must only call this *before* calling Notification.requestPermission(), otherwise this feature detect would bug the user with an actual notification!');
      try {
          new Notification('');
      } catch (e) {
          if (e.name == 'TypeError')
              return false;
      }
      return true;
  }
}
/*
function nonPersistentNotification() {
  if (!('Notification' in window)) {
    alert('Notification API not supported!');
    return;
  }
  
  try {
    var notification = new Notification("Hi there - non-persistent!");
  } catch (err) {
    alert('Notification API error: ' + err);
  }
}*/

function persistentNotification() {
  if (!('Notification' in window) || !('ServiceWorkerRegistration' in window)) {
    alert('Persistent Notification API not supported!');
    return;
  }
  
  try {
    navigator.serviceWorker.getRegistration()
      .then(reg => reg.showNotification("Hi there - persistent!"))
      .catch(err => alert('Service Worker registration error: ' + err));
  } catch (err) {
    alert('Notification API error: ' + err);
  }
}