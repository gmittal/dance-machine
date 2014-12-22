var express = require('express');
var app = express();
var spotify = require('spotify-node-applescript');
var request = require('request');

app.get('/', function (req, res) {
  res.send('Hello World!');
  spotify.playTrack('spotify:track:3AhXZa8sUQht0UEdBJgpGc', function(){
    // track is playing
	});
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

function getBPM() {
	spotify.getTrack(function(err, track){

    /*
    track = {
        artist: 'Bob Dylan',
        album: 'Highway 61 Revisited',
        disc_number: 1,
        duration: 370,
        played count: 0,
        track_number: 1,
        starred: false,
        popularity: 71,
        id: 'spotify:track:3AhXZa8sUQht0UEdBJgpGc',
        name: 'Like A Rolling Stone',
        album_artist: 'Bob Dylan',
        spotify_url: 'spotify:track:3AhXZa8sUQht0UEdBJgpGc' }
    }
    */
	    // console.log(track);

	    var artist = track.artist;
	    var song_name = track.name;
	    // console.log(song_name +" by "+artist);

	    request('http://developer.echonest.com/api/v4/song/search?api_key=YXADCMBT8KNFUXQRW&artist='+ artist +'&title='+song_name, function(err, response, body) {
	    	var data = JSON.parse(body);
	    	if (data.response) {
	    		// console.log(data.response.songs[0].id);
		    	request('http://developer.echonest.com/api/v4/song/profile?api_key=YXADCMBT8KNFUXQRW&id='+data.response.songs[0].id+'&bucket=audio_summary', function (err0, response0, body0) {
	    		var data0 = JSON.parse(body0);
	    		// console.log(body0);
	    		// console.log("BPM: "+data0.response.songs[0].audio_summary.tempo);


	    		return data0.response.songs[0].audio_summary.tempo;

	    	});	
	    	}
	    	
	    	// console.log()



	    });



	});

}

 
// getBPM();


setInterval(function() { console.log(getBPM()); console.log('WUB'); }, 500);

// setInterval(getBPM, 5000);






