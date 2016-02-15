Meteor.startup( () => {
    // UserSettings.remove({});
    if( UserSettings.find().count() === 0 ) {
        UserSettings.insert({
            "baseSalary": 85,
            "showIncome": true,
            "currency": "$"
        });
    };
});

Meteor.methods({
    addEntry( doc ) {
        return Entries.insert( doc );
    },
    editEntry( args ) {
        if( !args._id ) {
            return false;
        }

        var oldEntry = Entries.findOne( { _id: args._id } );

        var updatedEntry = {
            _id: args._id,
            note: args.note || oldEntry.note,
            legible: {
                hour: args.legible && args.legible.hour ? args.legible.hour : oldEntry.legible.hour,
                min: args.legible && args.legible.min ? args.legible.min : oldEntry.legible.min,
            }
        };

        Entries.update( args._id, { $set: { note: updatedEntry.note, legible: updatedEntry.legible } }, handleUpdate );

        function handleUpdate( err, docs ) {
            if( err ) {
                console.log( 'editEntry error: ', err );
            }
        }

    },
    deleteEntry( _id ) {
        Entries.remove( _id, function( err ) {
            if( err ) {
                console.log( err );
            } else {
                console.log( 'successfully deleted the document!' );
            }
        });
    },
    showEntry( _id ) {
        Entries.update( _id, { $set: { visible: true } } );
    },
    hideEntry( _id ) {
        Entries.update( _id, { $set: { visible: false } } );
    },
    getEntryById( _id ) {
        return Entries.findOne( { _id: _id } );
    },
    sleepyTime( _id, amt ) {
        var doc         = Entries.findOne( { _id: _id } ),
            difference  = legibleToMs( parseInt( doc.legible.hour ), parseInt( doc.legible.min ) ) - amt,
            newTime     = msToLegible( difference );

        var updated = {
            _id: _id,
            legible: {
                hour: newTime.hours,
                min: newTime.minutes
            }
        };

        Meteor.call( 'editEntry', updated, function( err, res ) {
            if( err ) {
                console.log( 'error from sleepTime call of editEntry: ', err );
            }

            console.log( 'result of sleepyTime call of editEntry: ', res );
        });
    },
    createPopup( doc ) {
        return Popups.insert( doc );
    },
    deletePopup() {
        Popups.remove( {} );
    },
    updateSetting( doc ) {
        var currentSettingsDoc  = UserSettings.findOne()._id,
            updated             = {};

        updated[doc.name] = doc.value;

        UserSettings.update( currentSettingsDoc, { $set: updated } );
    }
});
