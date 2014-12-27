var express = require('express');
var app = express();
var spotify = require('spotify-node-applescript');
var request = require('request');
var Cylon = require("cylon");

// Initialize the robot


// USED FOR TESTING PUPROSES
app.get('/', function (req, res) {
  res.send('Hello World!');
  spotify.playTrack('spotify:track:3AhXZa8sUQht0UEdBJgpGc', function(){
    // track is playing
	});
});

// ALLOWS EXTERNAL PROGRAMS TO ACCESS THE BPM
app.get('/tempo', function (req, res) {
  res.end(bpm.toString());
});


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

function getBPM() {
	spotify.getTrack(function(err, track){
    // console.log(track);

    // var track_info = JSON.parse(track);
    // console.log(track['artist']);
    // var arts = (track['artist']).split('&');

	    // var artist = track.artist;
	    // var song_name = track.name;
	    // console.log(song_name +" by "+artist);
      if (track) {
      	    request('http://developer.echonest.com/api/v4/song/search?api_key=YXADCMBT8KNFUXQRW&artist='+ encodeURIComponent(((track['artist']).split("&"))[0]) +'&title='+encodeURIComponent(track['name']), function(err, response, body) {
      	    	var data = JSON.parse(body);
              console.log(body);
      	    	if (typeof data.response.songs[0] != 'undefined') {
      	    		// console.log(data.response.songs[0].id);
                // console.log(data);
                // console.log(data.response.songs[0]);
      		    	request('http://developer.echonest.com/api/v4/song/profile?api_key=YXADCMBT8KNFUXQRW&id='+data.response.songs[0].id+'&bucket=audio_summary', function (err0, response0, body0) {
      	    		var data0 = JSON.parse(body0);
      	    		// console.log(body0);
      	    		// console.log("BPM: "+data0.response.songs[0].audio_summary.tempo);

                console.log(data0.response.songs[0].audio_summary.tempo);
                bpm = data0.response.songs[0].audio_summary.tempo;
      	    		return data0.response.songs[0].audio_summary.tempo;

      	    	});	
      	    	}


      	    });
        }



	});

}

// console.log(getBPM());


var trackID = "spotify:track:535XCWF5UOV32J2hxq1GAr";
var bpm = getBPM();


function checkTrack() {
    spotify.getState(function(err, state){
      console.log(state);
      
      if (typeof state != 'undefined') {

              if (state.track_id != trackID) {
                console.log("TRACK CHANGED. RE-CHECK BPM.");
                trackID = state.track_id;
                bpm = getBPM();

               // var r = Cylon.robot({
               //    // Change the port to the correct port for your Arduino.
               //    connections: {
               //      arduino: { adaptor: 'firmata', port: '/dev/tty.usbmodem1421' }
               //    },

               //    devices: {
               //      led: { driver: 'led', pin: 13 }
               //    },

               //    work: function(my) {
               //      every((30/bpm).second(), function() {
               //        my.led.toggle();
               //      });
               //    }
               //  });

               // // r.stop();
               // r.start();

                
              }

              if (typeof bpm === 'undefined') {
                bpm = getBPM();
              }

            console.log("BPM: "+bpm);

      }

  });


}


checkTrack();

setInterval(checkTrack, 7500);





beat();

function beat() {
  setTimeout(function() {
    console.log("BEAT");

    beat();
  }, 60000/bpm);


}










