Meteor.publish( 'userSettings', () => {
    return UserSettings.find();
});
