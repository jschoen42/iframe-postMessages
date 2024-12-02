  // https://developer.vimeo.com/player/sdk/reference#about-player-methods

var gVimeoPlatformLink = "https://player.vimeo.com/video/[id]";
var gVimeoParameter = "autoplay=1&dnt=1&quality=1080p";

var gVideoSeconds = -1;
var gVideoSecondsMax = -1;

var player, vimeoID, vimeoPlay;
var vimeoDebug = true;
var inSeconds = 0; // 30;

if( parent ){
  if( parent.window.cssPatchWebObject !== "done") {
    style = document.createElement('style');
    style.textContent = `
      .webobject {
        width:  100% !important;
        height: 100% !important;

        transform: none !important;
      }`;

    parent.document.body.appendChild(style);
    parent.window.cssPatchWebObject = "done";

    console.info("CSS Patch web object: ", parent.window.cssPatchWebObject);
  }
}

if( typeof parent.GetPlayer == "function" ){
  player = parent.GetPlayer();

  vimeoPlay = player.GetVar("vimeoPlay");
  vimeoID   = player.GetVar("vimeoID");
  // console.log( "webobject - vimeoID: " + vimeoID );

  var ret = player.GetVar( "vimeoDebug" );
  // console.log( "webobject - vimeoDebug: " + ret );
  if(ret){
    vimeoDebug = ret;
  }

  player.SetVar( "vimeoPos", inSeconds );
  player.SetVar( "vimeoDuration", 0 );

  initVimeo( vimeoID );
} else {
  initVimeo("820425861"); // initVimeo( "744482489" );
  console.error("parent.GetPlayer not found");
}

function initVimeo( inID ){
  var myVideo = document.getElementById('vimeo');
  var myUrl = gVimeoPlatformLink.replace("[id]", inID ) + "?" + gVimeoParameter;

  myVideo.setAttribute("src", myUrl );

  gVimeoPlayer = new Vimeo.Player(myVideo);

  if( gVimeoPlayer ){
    gVimeoPlayer.ready().then(function() {
      if( vimeoDebug ){
        console.log("vimeo ready");
      }
    });


    /* wenn mehrere vimeo videos auf einer seite */
    /*
    gVimeoPlayer.setAutopause(false).then(function(autopause) {
      if( vimeoDebug ){
        console.log("vimeo setAutopause()", autopause);
      }
    }).catch(function(error) {
      switch (error.name) {
        case 'UnsupportedError':
          // Autopause isn't supported by the current player or browser
          break;

        default:
          // Some other error occurred
        break;
      }
    });
    */

    /*
    gVimeoPlayer.setColor('#00ad00').then(function(_color) {
      // The new color value: #00ADEF
    }).catch(function(_error) {
      // An error occurred while setting the color
    });
    */

    gVimeoPlayer.on('loaded', function( data ) { // {id: 689271951}
      if( vimeoDebug ){
        console.log("vimeo on.loaded()", data);
      }
    });

    gVimeoPlayer.on('bufferstart', function( data ) { // kommt nicht ????
      if( vimeoDebug ){
        console.log("vimeo on.bufferstart()", data);
      }
    });

    gVimeoPlayer.getDuration().then(function(duration) {
      if( vimeoDebug ){
        console.log("vimeo getDuration()", duration);
      }

      if( player ){
        player.SetVar( "vimeoDuration", duration );
      }
    });

    gVimeoPlayer.getVideoTitle().then(function(title) {
      if( vimeoDebug ){
        console.log('vimeo getVideoTitle()', title);
      }
    });

    gVimeoPlayer.on('play', function(data){ // seeking -> undefined oder {seconds: 0, percent: 0, duration: 69.207}
      if( vimeoDebug ){
        console.log( "vimeo on.play()", data);
      }

      if( data ){
        if( player ){
          player.SetVar( "vimeoPos", data.seconds );
          player.SetVar( "vimeoDuration", data.duration );
          player.SetVar( "vimeoPlay", true );
        }
      }
    });

    gVimeoPlayer.on('seeked', function(data){ // undefined oder {seconds: 0, percent: 0, duration: 69.207}
      if( vimeoDebug ){
        console.log( "vimeo on.seeked()", data);
      }
    });

    gVimeoPlayer.on('pause', function(data){ // undefined oder {seconds: 0, percent: 0, duration: 69.207}
      if( vimeoDebug ){
        console.log( "vimeo on.pause()", data);
      }

      if( data ){
        if( player ){
           player.SetVar( "vimeoPlay", false );
        }
      }
    });

    gVimeoPlayer.on('timeupdate', function(data){ // {seconds: 0, percent: 0, duration: 69.207}
      gVideoSeconds = data.seconds;

      if (gVideoSeconds>gVideoSecondsMax){
        gVideoSecondsMax = gVideoSeconds;
      }

      if( vimeoDebug ){
        console.log( "vimeo on.timeupdate()", data, gVideoSeconds + " sec - ", gVideoSecondsMax + " sec"  );
      }

      if( player ){
        player.SetVar( "vimeoPos", gVideoSeconds );
        player.SetVar( "vimeoDuration", data.duration );
      }

      /*
      if( data.seconds >= data.duration ){
        console.error( data.seconds >= data.duration, data.seconds, data.duration );

        gVimeoPlayer.pause().then(function() {
          if( vimeoDebug ){
            console.log( "vimeo pause()");
          }
        }).catch(function(error) {
          console.error( "vimeo - pause", error.name );
          switch (error.name) {
            case 'PasswordError':
                // The video is password-protected
                break;
            case 'PrivacyError':
                // The video is private
                break;
            default:
                // Some other error occurred
                break;
          }
        });
      }
      */

    });

    gVimeoPlayer.on('ended', function(data) { // {seconds: 0, percent: 0, duration: 69.207}
      if( vimeoDebug ){
        console.log( "vimeo on.ended()", data );
      }
    });

    /*
    gVimeoPlayer.getAutopause().then(function(autopause) {
      if( vimeoDebug ){
        console.log( "vimeo getAutopause()", autopause );
      }
    }).catch(function(error) {
      console.error("vimeo getAutopause(): ", error.name);

      switch (error.name) {
        case 'UnsupportedError':
          // Autopause isn't supported by the current player or browser
          break;
        default:
          // Some other error occurred
          break;
      }
    });
    */

    /*
    gVimeoPlayer.play().then(function() {
      console.log("playing");

      // The video is playing
    }).catch(function(error) {
      console.error("play: " + error.name);

      switch (error.name) {
        case 'PasswordError':
            // The video is password-protected
            break;
        case 'PrivacyError':
            // The video is private
            break;
        default:
            // Some other error occurred
            break;
      }
    });
    */

    gVimeoPlayer.setCurrentTime( inSeconds ).then( function( _seconds ){
      if( vimeoDebug ){
        console.log( "vimeo - setCurrentTime()", inSeconds );
      }

      /*
      var playPromise = gVimeoPlayer.play();
      if (playPromise !== undefined) {
        playPromise.catch(function(error) {
          console.error( "vimeo play", error.name );
        });
      }
      */
    }).catch(function(error) {
      console.error( "vimeoPlay.setCurrentTime", error );
    });
  }
}

/*
    if( gVimeoPlayer ){
      gVimeoPlayer.destroy().then(function() {
        gVimeoPlayer = null;
        // console.log( "The player is destroyed" );
      });
    }
*/



