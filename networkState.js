document.getElementById('status').innerHTML = navigator.onLine ? 'online' : 'offline'; // network state
         
         var networkState = document.getElementById('networkState');
         
         function handleStateChange() {
         	var timeBadge = new Date().toTimeString().split(' ')[0];
         	var newState = document.createElement('p');
         	var state = navigator.onLine ? 'online' : 'offline';
         	newState.innerHTML = '<span class="badge">' + timeBadge + '</span> Connection state changed to <b>' + state + '</b>.';
         	networkState.appendChild(newState);
         }
         
         window.addEventListener('online', handleStateChange);
         window.addEventListener('offline', handleStateChange); 