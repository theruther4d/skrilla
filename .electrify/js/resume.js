alert( 'woke!' );

if( window.current_id ) {
    var amt         = Date.now() - window.sleep.startTime;

    if( amt >= 60000 ) {
        var legible     = msToLegible( amt ),
            newPopup    = {
                text: `Hi there. It looks like you were doing something else for a bit. Would you like me to adjust your time by ${legible.hours}:${legible.minutes}?`,
                buttons: {
                    confirm: 'Yes, please',
                    deny: 'No, thanks'
                },
                adjust: amt,
                target: window.current_id
        };

        Meteor.call( 'createPopup', newPopup );

        window.current_id = false;
    } else {
        console.log( 'less than 1 minute :/' );
    }
}
