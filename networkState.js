document.getElementById('isOnline').innerHTML = navigator.onLine ? 'online' : 'offline'; // network state
         
         var networkState = document.getElementById('networkState');
         
         function handleStateChange() {
         	var timeBadge = new Date().toTimeString().split(' ')[0];
         	var state = navigator.onLine ? 'online' : 'offline';
         	networkState.innerHTML = '<span class="badge">' + timeBadge + '</span> Connection state changed to <b>' + state + '</b>.';
         }
         
         window.addEventListener('online', handleStateChange);
         window.addEventListener('offline', handleStateChange); 