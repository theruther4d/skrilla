var app             = require('app'),
    browser         = require('browser-window'),
    electrify       = require('electrify')(__dirname),
    fs              = require( 'fs' ),
    window          = null,
    jsPath          = `${process.argv[1]}/js`;
    // clipboard       = null;

function readJS( file, callback ) {
    try {
        return fs.readFileSync( `${jsPath}/${file}`, 'utf8' );
    } catch( e ) {
        console.log( 'error in readJS: ', e );
        return false;
    }
}

app.on('ready', function() {

  // electrify start
  electrify.start(function(meteor_root_url) {

    // creates a new electron window
    window = new browser({
      width: 320,
      height: 480,
      x: 0,
      y: 0,
      'title-bar-style': 'hidden',
      'node-integration': false,
      icon: 'skrilla.png'
    });

    // open up meteor root url
    window.loadURL(meteor_root_url);

    webContents = window.webContents;

    var watchSleep = require( 'electron' ).powerMonitor;

    watchSleep.on( 'suspend', function() {
        webContents.executeJavaScript( readJS( 'suspend.js' ) );
    });

    watchSleep.on( 'resume', function() {
        webContents.executeJavaScript( readJS( 'resume.js' ) );
    });


    // clipboard = require( 'electron' ).clipboard;
  });
});


app.on('window-all-closed', function() {
  app.quit();
});


app.on('will-quit', function terminate_and_quit(event) {

  // if electrify is up, cancel exiting with `preventDefault`,
  // so we can terminate electrify gracefully without leaving child
  // processes hanging in background
  if( electrify.isup() && event ) {

    // holds electron termination
    event.preventDefault();

    // gracefully stops electrify
    electrify.stop(function(){

      // and then finally quit app
      app.quit();
    });
  }
});

electrify.methods({
    'copyToClipBoard': function( text, done ) {
        var clipboard = require( 'electron' ).clipboard;
        var written = clipboard.writeText( text );
        done( null, written );
    },
    'sizeDownWindow': function() {
        var sizes = window.getSize();

        // cache original window size for later:
        window.webContents.executeJavaScript(`
            window.originW = ${sizes[0]};
            window.originH = ${sizes[1]};
        `);

        // Size it down:
        window.setSize( sizes[0], 86 );

        // Make sure it can't be resized:
        window.setResizable( false );
    },
    'sizeUpWindow': function( w, h ) {
        window.setSize( w, h );
        window.setResizable( true );
    }
});

//
// =============================================================================
//
// the methods bellow can be called seamlessly from your Meteor's
// client and server code, using:
//
//    Electrify.call('methodname', [..args..], callback);
//
// ATENTION:
//    From meteor, you can only call these methods after electrify is fully
//    started, use the Electrify.startup() convenience method for this
//
//
// Electrify.startup(function(){
//   Electrify.call(...);
// });
//
// =============================================================================
//
// electrify.methods({
//   'method.name': function(name, done) {
//     // do things... and call done(err, arg1, ..., argN)
//     done(null);
//   }
// });
//
