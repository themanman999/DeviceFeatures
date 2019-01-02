 if ('getBattery' in navigator || ('battery' in navigator && 'Promise' in window)) { // Battery Status
           var BatteryStatus = document.getElementById('BatteryStatus');
         
           function handleChange(change) {
             var timeBadge = new Date().toTimeString().split(' ')[0];
             var newState = document.createElement('p');
             newState.innerHTML = '<span class="badge">' + timeBadge + '</span> ' + change + '.';
             BatteryStatus.appendChild(newState);
           }
           
           function onChargingChange() {
             handleChange('Battery charging changed to <b>' + (this.charging ? 'charging' : 'discharging') + '</b>')
           }
           function onChargingTimeChange() {
             handleChange('Battery charging time changed to <b>' + this.chargingTime + ' s</b>');
           }
           function onDischargingTimeChange() {
             handleChange('Battery discharging time changed to <b>' + this.dischargingTime + ' s</b>');
           }
           function onLevelChange() {
             handleChange('Battery level changed to <b>' + this.level + '</b>');
           }
         
           var batteryPromise;
           
           if ('getBattery' in navigator) {
             batteryPromise = navigator.getBattery();
           } else {
             batteryPromise = Promise.resolve(navigator.battery);
           }
           
           batteryPromise.then(function (battery) {
             document.getElementById('charging').innerHTML = battery.charging ? 'charging' : 'discharging';
             document.getElementById('chargingTime').innerHTML = battery.chargingTime + ' s';
             document.getElementById('dischargingTime').innerHTML = battery.dischargingTime + ' s';
             document.getElementById('level').innerHTML = Math.floor(battery.level * 100) + "%" ;
             
             battery.addEventListener('chargingchange', onChargingChange);
             battery.addEventListener('chargingtimechange', onChargingTimeChange);
             battery.addEventListener('dischargingtimechange', onDischargingTimeChange);
             battery.addEventListener('levelchange', onLevelChange);
           });
         } 