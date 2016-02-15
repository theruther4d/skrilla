ResumeButton = React.createClass({
    render() {
        return (
            <svg className="entry__continue__play" width="12" height="16" viewBox="0 0 12 16">
                <path d="M0.4,15.8c-0.1,0.1-0.3,0-0.3-0.2V8V0.4c0-0.2,0.2-0.3,0.3-0.2l11.4,7.6c0.1,0.1,0.1,0.3,0,0.4 L0.4,15.8z"/>
            </svg>
        );
    }
});

StopButton = React.createClass({
    render() {
        return (
            <svg className="entry__continue__stop" width="12" height="16" viewBox="0 0 12 16">
                <path d="M0.5,16C0.2,16,0,15.8,0,15.5V12V8V4V0.5C0,0.2,0.2,0,0.5,0h11C11.8,0,12,0.2,12,0.5v15 c0,0.3-0.2,0.5-0.5,0.5H6H0.5z"/>
            </svg>
        );
    }
});

Entry = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        var newDate = new Date();
        var data = {};
        var handle = Meteor.subscribe( 'entries' );
        if( handle.ready() ) {
            data.post = Entries.find( { date: this.props.date } ).fetch();
            data.visible = Entries.find( { visible: true, date: this.props.date } ).fetch();
        }
        return data;
    },
    // Combine timeChange,
    // noteChange, and calcChange
    // into one function:
    noteChange( _id, e ) {
        Meteor.call( 'editEntry', {
            _id: _id,
            note: e.target.value,
        });
    },
    timeChange( _id, e ) {
        e.preventDefault();

        e.target.value = formatTime( e.target.value );

        var isHours     = e.target.className.indexOf( 'hours' ) > -1,
            args        = {
                _id: _id,
                legible: {}
            };

        if( isHours ) {
            args.legible.hour  = e.target.value;
        } else {
            args.legible.min   = e.target.value;
        }

        Meteor.call( 'editEntry', args );
    },
    incomeChange( _id, e ) {
        e.preventDefault;

        var args = {
            _id: _id,
            calcIncome: e.target.checked
        }

        Meteor.call( 'editEntry', args );
    },
    selectText( e ) {
        e.target.setSelectionRange( 0, 9999 );
    },
    deleteEntry( _id ) {
        Meteor.call( 'deleteEntry', _id );
    },
    handleResume( _id ) {
        if( typeof this.props.startProgress === 'function' ) {
            this.props.startProgress( _id );
        }
    },
    getContent() {
        if( this.data.visible ) {
            return this.data.visible.reverse().map( ( entry ) => {
                var isResumed   = this.props.current_id && this.props.current_id == entry._id,
                liClass     = isResumed ? 'entries__item active' : 'entries__item';

                return (
                    <SingleEntry
                    className={liClass}
                    key={entry._id}
                    id={entry._id}
                    hour={entry.legible.hour}
                    min={entry.legible.min}
                    title={entry.note}
                    isResumed={isResumed}
                    calcIncome={entry.calcIncome ? entry.calcIncome : true}
                    incomeChange={this.incomeChange}
                    handleResume={this.handleResume}
                    timeChange={this.timeChange}
                    noteChange={this.noteChange}
                    selectText={this.selectText}
                    toggleEditing={this.props.toggleEditing}
                    editing={this.props.editing}
                    addDelete={this.props.addDelete}
                    removeDelete={this.props.removeDelete}
                    clearDeletes={this.props.clearDeletes}
                    toDelete={this.props.toDelete}
                    />
                )
            });
        } else {
            return(
                <p>Loading...</p>
            );
        }
    },
    render() {
        return (
            <ul className="entries">
                <ReactCSSTransitionGroup
                    transitionName={{
                        enter: "item--enter",
                        enterActive: "item--enter--active",
                        leave: "item--leave",
                        leaveActive: "item--leave--active"
                    }}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                    component="div"
                    className="item--animation"
                >
                    {this.getContent()}
                </ReactCSSTransitionGroup>
            </ul>
        )
    },
});
