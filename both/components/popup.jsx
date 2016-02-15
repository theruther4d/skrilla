Popup = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        var data = {};
        var handle = Meteor.subscribe( 'popups' );
        if( handle.ready() ) {
            data.popup = Popups.findOne();
        }
        return data;
    },
    cancelPopup( _id ) {
        Meteor.call( 'deletePopup', _id );
        window.current_id = false;
    },
    confirmPopup( _id, adjust ) {
        Meteor.call( 'sleepyTime', _id, adjust );
        Meteor.call( 'deletePopup', _id );
    },
    getContent() {
        if( this.data.popup ) {
            return (
                <div className="popup" key={this.data.popup._id}>
                    <div className="popup__content">
                        <div className="popup__box">
                            <p className="popup__text">{this.data.popup.text}</p>
                            <div className="popup__buttons">
                                <button className="popup__button popup__button__deny" onClick={this.cancelPopup.bind( this, this.data.popup._id )}>{this.data.popup.buttons.deny}</button>
                                <button className="popup__button popup__button__confirm" onClick={this.confirmPopup.bind( this, this.data.popup.target, this.data.popup.adjust )}>{this.data.popup.buttons.confirm}</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <span></span>
            );
        }
    },
    render() {
        return (
            <ReactCSSTransitionGroup
                transitionName={{
                    enter: "popup--enter",
                    enterActive: "popup--enter--active",
                    leave: "popup--leave",
                    leaveActive: "popup--leave--active",
                    appear: "popup--appear",
                    appearActive: "popup--appear--active"
                }}
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
            >
                {this.getContent()}
            </ReactCSSTransitionGroup>
        );
    }
});
