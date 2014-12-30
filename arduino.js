var Cylon = require("cylon");
var request = require('request');

// Initialize the robot
Cylon.robot({
  // Change the port to the correct port for your Arduino.
  connections: {
    arduino: { adaptor: 'firmata', port: '/dev/tty.usbmodem1421' }
  },

  devices: {
    led: { driver: 'led', pin: 13 }
  },

  work: function(my) {
        var bpm;

        beat();

        function beat() {
          

          request('http://upbeat.ngrok.com/tempo', function (err, response, body) {

                // console.log(body);
                bpm = parseInt(body, 10);
          });



          setTimeout(function() {
            my.led.toggle();

            beat();
          }, 30100/bpm);


        }
          

  }
}).start();


