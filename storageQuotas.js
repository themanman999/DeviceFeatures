         if ('storage' in navigator && 'estimate' in navigator.storage) { // Storage Quotas
         navigator.storage.estimate()
         .then(estimate => {
         document.getElementById('usage').innerHTML = estimate.usage;
         document.getElementById('quota').innerHTML = estimate.quota;
         document.getElementById('percent').innerHTML = (estimate.usage * 100 / estimate.quota).toFixed(0);
         });
         }