Header = React.createClass({
    startEntry( e ) {
        e.preventDefault();

        var inputValue  = e.target.childNodes[0].value,
            newDate     = new Date();

        if( !inputValue.length ) {
            return false;
        }

        // Create the new entry,
        // but make it hidden from
        // the list.
        var doc = {
            date: `${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()}`,
            note: inputValue,
            legible: {
                hour: '00',
                min: '00',
            },
            visible: false
        };

        headerComponent = this;
        Meteor.call( 'addEntry', doc, function( err, res ) {
            if( err ) {
                alert( 'error!' );
            } else {
                if( typeof headerComponent.props.startProgress === 'function' ) {
                    headerComponent.props.startProgress( res );
                }
            }
        });
    },
    stopEntry( e ) {
        e.preventDefault();

        if( typeof this.props.stopProgress === 'function' ) {
            this.props.stopProgress();
        }
    },
    renderSettings() {
        if( !this.props.editing ) {
            return (
                <a
                    className="entry__head__actions__action entry__head__actions__action--settings"
                    onClick={this.props.toggleSettings}
                    key={1}
                >
                    <svg viewBox="0 0 20 20">
                        <path d="M19.9,8.9c0-0.3-0.4-0.5-0.6-0.5c-0.9,0-1.7-0.5-2.1-1.4c-0.3-0.9-0.1-1.8,0.6-2.5C18,4.4,18,4,17.8,3.8 c-0.5-0.6-1-1.1-1.6-1.6C16,2,15.7,2,15.5,2.3c-0.6,0.7-1.7,0.9-2.5,0.6c-0.9-0.4-1.4-1.2-1.4-2.2c0-0.3-0.2-0.5-0.5-0.6 C10.4,0,9.7,0,8.9,0.1c-0.3,0-0.5,0.3-0.5,0.6c0,0.9-0.5,1.8-1.4,2.1C6.2,3.1,5.2,2.9,4.6,2.2C4.4,2,4,2,3.8,2.1 c-0.6,0.5-1.1,1-1.6,1.6C2,4,2,4.3,2.3,4.5C3,5.1,3.2,6.1,2.8,7C2.5,7.8,1.6,8.3,0.6,8.3c-0.3,0-0.5,0.2-0.6,0.5 C0,9.6,0,10.4,0.1,11.1c0,0.3,0.4,0.5,0.7,0.5c0.9,0,1.7,0.5,2.1,1.4c0.3,0.9,0.1,1.8-0.6,2.5C2,15.6,2,16,2.2,16.2 c0.5,0.6,1,1.1,1.6,1.6C4,18,4.3,18,4.5,17.7c0.6-0.7,1.7-0.9,2.5-0.6c0.9,0.4,1.4,1.2,1.4,2.2c0,0.3,0.2,0.6,0.5,0.6 C9.2,20,9.6,20,10,20c0.4,0,0.7,0,1.1-0.1c0.3,0,0.5-0.3,0.5-0.6c0-0.9,0.5-1.8,1.4-2.1c0.8-0.3,1.9-0.1,2.5,0.6 c0.2,0.2,0.5,0.2,0.8,0.1c0.6-0.5,1.1-1,1.6-1.6c0.2-0.2,0.2-0.6-0.1-0.8c-0.7-0.6-0.9-1.6-0.6-2.5c0.3-0.8,1.2-1.4,2-1.4l0.1,0 c0.3,0,0.6-0.2,0.6-0.5C20,10.4,20,9.6,19.9,8.9z M10,13.4c-1.8,0-3.3-1.5-3.3-3.3c0-1.8,1.5-3.3,3.3-3.3c1.8,0,3.3,1.5,3.3,3.3 C13.4,11.9,11.9,13.4,10,13.4z" />
                    </svg>
                </a>
            );
        }
    },
    renderActions() {
        return (
            <div className="entry__head__actions">
                <a className="entry__head__actions__action entry__head__actions__action--edit" onClick={this.props.toggleEditing}>{this.props.editing ? "Cancel" : "Edit"}</a>
                <ReactCSSTransitionGroup
                    transitionName={{
                        enter: "settings-icon--enter",
                        enterActive: "settings-icon--enter--active",
                        leave: "settings-icon--leave",
                        leaveActive: "settings-icon--leave--active"
                    }}
                    transitionEnterTimeout={250}
                    transitionLeaveTimeout={250}
                    component="div"
                    className="settings-icon--animation"
                >
                    {this.renderSettings()}
                </ReactCSSTransitionGroup>
            </div>
        )
    },
    render() {
        var toggledClass = this.props.inProgress ? 'entry__head active' : 'entry__head';

        if( !this.props.inProgress ) {
            return (
                <div className={toggledClass}>
                    <div className="entry__form__wrapper">
                        <form className="entry__form" onSubmit={this.startEntry}>
                            <input type="text" className="entry__input" placeholder="What are you working on?" />
                            <input type="submit" className="entry__button" value="start" />
                        </form>
                    </div>
                    {this.renderActions()}
                </div>
            );
        } else {
            return (
                <div className={toggledClass}>
                    <div className="inProgress__indicator"></div>
                    <div className="entry__head__wrapper">
                        <div className="inProgress">
                            <h3 className="inProgress__title">{this.props.currentNote}</h3>
                            <Clock current_id={this.props.current_id} initialHours={this.props.initialHours} initialMins={this.props.initialMins} />
                            <button className="entry__stop" onClick={this.stopEntry}>Stop</button>
                        </div>
                    </div>
                    {this.renderActions()}
                </div>
            );
        }
    }
});
