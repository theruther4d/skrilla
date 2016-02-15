ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

MainLayout = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        var data = {};
        var handle = Meteor.subscribe( 'userSettings' );

        if( handle.ready() ) {
            data.settings = UserSettings.findOne();
        }

        return data;
    },
    getInitialState() {
        return {
            inProgress: false,
            current_id: false,
            currentNote: false,
            currentHours: false,
            currentMins: false,
            notification: false,
            notificationText: '',
            settingsOpen: false,
            editing: false,
            toDelete: []
        }
    },
    startProgress( _id ) {
        var mainComponent = this;
        window.current_id = _id;

        Electrify.call( "sizeDownWindow", [], function( err, msg ) {
            console.log( err );
            console.log( msg );
        });

        Meteor.call( 'getEntryById', _id, function( err, res ) {
            if( !err ) {
                mainComponent.setState({
                    inProgress: true,
                    current_id: _id,
                    currentNote: res.note,
                    currentHours: parseInt( res.legible.hour ),
                    currentMins: parseInt( res.legible.min )
                });
            }
        });
    },
    stopProgress() {
        Meteor.call( 'showEntry', this.state.current_id );

        Electrify.call( "sizeUpWindow", [window.originW, window.originH], function( err, msg ) {
            console.log( err );
            console.log( msg );
        });

        // Is there shorthand for resetting
        // back to intial state?
        this.setState({
            inProgress: false,
            current_id: false,
            currentNote: false,
            currentHours: false,
            currentMins: false,
        });
    },

    // combine all of these setstate functions
    // into key: value pair in one function:
    createNotification( notification ) {
        this.setState({
            notification: true,
            notificationText: notification.text
        });
    },
    removeNotification() {
        this.setState({
            notification: false,
            notificationText: ''
        });
    },
    toggleSettings() {
        this.setState({
            settingsOpen: !this.state.settingsOpen
        });
    },
    toggleEditing() {
        this.setState({
            editing: !this.state.editing,
            toDelete: []
        });
    },
    setColorScheme( color ) {
        Meteor.call( 'updateSetting', {
            name: 'colorScheme',
            value: color
        });
    },
    addDelete( _id ) {
        var clonedArray = this.state.toDelete;
        clonedArray.push( _id );

        this.setState({
            toDelete: clonedArray
        });

        console.log( 'addDelete: ', this.state.toDelete );
    },
    removeDelete( _id ) {
        this.setState({
            toDelete: removeFromArray( _id, this.state.toDelete )
        });
        console.log( 'removeDelete: ', this.state.toDelete );
    },
    showFooter() {
        if( this.state.editing ) {
            return (
                <Footer
                    toggleEditing={this.toggleEditing}
                    toggleSettings={this.toggleSettings}
                    toDelete={this.state.toDelete}
                />
            );
        }
    },
    showChrome() {
        if( this.state.inProgress ) {
            return (
                <main className="entry">
                    <Header
                        inProgress={this.state.inProgress}
                        startProgress={this.startProgress}
                        stopProgress={this.stopProgress}
                        current_id={this.state.current_id}
                        currentNote={this.state.currentNote}
                        initialHours={this.state.currentHours}
                        initialMins={this.state.currentMins}
                        toggleSettings={this.toggleSettings}
                        toggleEditing={this.toggleEditing}
                        editing={this.state.editing}
                    />
                </main>
            );
        } else {
            return (
                <main className="entry">
                    <Header
                        inProgress={this.state.inProgress}
                        startProgress={this.startProgress}
                        stopProgress={this.stopProgress}
                        current_id={this.state.current_id}
                        currentNote={this.state.currentNote}
                        initialHours={this.state.currentHours}
                        toggleSettings={this.toggleSettings}
                        initialMins={this.state.currentMins}
                        toggleEditing={this.toggleEditing}
                        editing={this.state.editing}
                    />
                    <section className="entry__content">
                        <EntryList
                            current_id={this.state.current_id}
                            inProgress={this.state.inProgress}
                            startProgress={this.startProgress}
                            createNotification={this.createNotification}
                            removeNotification={this.removeNotification}
                            editing={this.state.editing}
                            addDelete={this.addDelete}
                            removeDelete={this.removeDelete}
                            clearDeletes={this.clearDeletes}
                            toDelete={this.state.toDelete}
                            entriesPerPage={this.data.settings ? this.data.settings.entriesPerPage : 5 }
                        />
                    </section>
                    <Settings
                        settingsOpen={this.state.settingsOpen}
                        setColorScheme={this.setColorScheme}
                        current={this.data.settings ? this.data.settings.colorScheme : 'dark'}
                        toggleSettings={this.toggleSettings}
                    />
                    <ReactCSSTransitionGroup
                        transitionName={{
                            enter: "footer--enter",
                            enterActive: "footer--enter--active",
                            leave: "footer--leave",
                            leaveActive: "footer--leave--active"
                        }}
                        transitionEnterTimeout={250}
                        transitionLeaveTimeout={250}
                        component="div"
                        className="footer--animation"
                    >
                        {this.showFooter()}
                    </ReactCSSTransitionGroup>
                </main>
            );
        }
    },
    render() {
        return(
            <div className={this.data.settings ? `main-wrapper ${this.data.settings.colorScheme}` : 'main-wrapper dark'}>
                <Popup />
                <Notification
                    notification={this.state.notification}
                    notificationText={this.state.notificationText}
                />
                {this.showChrome()}
            </div>
        );
    }
});
