EntryList = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        var data        = {},
            handle      = Meteor.subscribe( 'entries' );

        if( handle.ready() ) {
            data.visible = Entries.find( { visible: true } ).fetch();
        }

        return data;
    },
    getDateGroups() {
        var lastDate = 0;

        if( this.data.visible.length === 0 && !this.props.inProgress ) {
            return (
                <h4 className="no__entries">You don't have any time entries yet, start one above!</h4>
            );
        }

        return this.data.visible.reverse().map( ( entry ) => {
            if( !lastDate || lastDate !== entry.date ) {
                lastDate = entry.date;

                return (
                    <span key={lastDate}>
                        <EntryHeader
                            date={entry.date}
                            createNotification={this.props.createNotification}
                            removeNotification={this.props.removeNotification}
                        />
                        <Entry
                            key={this.props.current_id}
                            date={entry.date}
                            startProgress={this.props.startProgress}
                            current_id={this.props.current_id}
                            toggleEditing={this.props.toggleEditing}
                            editing={this.props.editing}
                            addDelete={this.props.addDelete}
                            removeDelete={this.props.removeDelete}
                            clearDeletes={this.props.clearDeletes}
                            toDelete={this.props.toDelete}
                        />
                    </span>
                );
            }
        });
    },
    render() {
        return (
            <div className="entry__content">
                {this.data.visible ? this.getDateGroups() : <p>Loading...</p>}
            </div>
        );
    }
});
