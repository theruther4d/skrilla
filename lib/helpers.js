formatTime = function( num ) {
    return num < 10 ? `0${num}` : `${num}`;
};

msToLegible = function( ms ) {
    var totalSecs   = ms / 1000;

    return {
        hours       : formatTime( Math.floor( ( totalSecs / 3600 ) % 24 ) ),
        minutes     : formatTime( Math.floor( ( totalSecs / 60 ) % 60 ) ),
        seconds     : formatTime( Math.floor( totalSecs % 60 ) )
    };
};

legibleToMs = function( hours, mins ) {
    return ( ( hours * 60 * 60 ) + ( mins * 60 ) ) * 1000;
};

removeFromArray = function( needle, haystack ) {
    var index = haystack.indexOf( needle );
    if( index > -1 ) {
        haystack.splice( index, 1 );
    }

    return haystack;
}
