 var Geolocation = document.getElementById('getGeolocation'); // Geolocation
 var watchId;
 
 function appendLocation(location, verb) {
   verb = verb || 'updated';
   Geolocation.innerHTML = 'Location ' + verb + ': <a href="https://maps.google.com/maps?&z=15&q=' + location.coords.latitude + '+' + location.coords.longitude + '&ll=' + location.coords.latitude + '+' + location.coords.longitude + '" target="_blank">' + location.coords.latitude + ', ' + location.coords.longitude + '</a>';
 }
 
 if ('geolocation' in navigator) {
   document.getElementById('geolocation').addEventListener('click', function () {
     navigator.geolocation.getCurrentPosition(function (location) {
       appendLocation(location, 'fetched');
     });
     watchId = navigator.geolocation.watchPosition(appendLocation);
   });
 } else {
   Geolocation.innerText = 'Geolocation API not supported.';
 }
