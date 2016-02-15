// Entries.remove({});
// var stubEntries = [{
//     note: "Dribbble",
//     legible: {
//         hour: "01",
//         min: "17"
//     },
//     date: "1-10-2016",
//     visible: true
// }, {
//     note: "Electrified with Electron",
//     legible: {
//         hour: "01",
//         min: "17"
//     },
//     date: "1-10-2016",
//     visible: true
// }, {
//     note: "Messing with Meteor",
//     legible: {
//         hour: "01",
//         min: "17"
//     },
//     date: "1-11-2016",
//     visible: true
// }, {
//     note: "Rumbling react",
//     legible: {
//         hour: "01",
//         min: "17"
//     },
//     date: "1-11-2016",
//     visible: true
// }];
//
// for( var i = 0; i < stubEntries.length; i++ ) {
//     Entries.insert( stubEntries[i] );
// }

Meteor.publish( 'entries', () => {
    return Entries.find();
});
