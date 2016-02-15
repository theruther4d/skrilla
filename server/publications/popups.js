Meteor.publish( 'popups', () => {
    return Popups.find();
});
