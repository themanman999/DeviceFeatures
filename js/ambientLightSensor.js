const details = document.getElementsByClassName("ligntSensorLog");
// Feature detection
if (window.AmbientLightSensor){
    try{
      const sensor = new AmbientLightSensor();
      // Detect changes in the light
      sensor.onreading = () => {
        details[0].innerHTML = sensor.illuminance;

          // Read the light levels in lux 
          // < 50 is dark room
          if (sensor.illuminance < 50) {
            document.body.className = 'darkLight';
            details[1].innerHTML = 'Dark Light';
            document.getElementById('mediaContainer').classList.add('darkLight')
          } else {
            document.body.className = 'brightLight';
            details[1].innerHTML = 'Bright Light';
            document.getElementById('mediaContainer').classList.remove('darkLight')
          }
      }

      // Has an error occured?
      sensor.onerror = event => document.getElementsByClassName("ligntSensorLog")[0].innerHTML = event.error.message;
      sensor.start();
    } catch(err) {
      details[0].innerHTML = err.message;
    }
} else {
  details[0].innerHTML = 'It looks like your browser doesnt support this feature'; 
}