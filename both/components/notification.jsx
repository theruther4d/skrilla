Notification = React.createClass({
    getInitialState() {
        return {
            visible: false,
            text: '',
            icon: false
        }
    },
    getContent() {
        // This isn't reactive!!!:
        if( this.props.notification ) {
            return (
                <div className="notification" key={1}>
                    <div className="notification__content">
                        <svg className="notification__content__icon" width="100" height="100" viewBox="44 -41.5 100 100">
                            <path d="M124.2-25.7h-4.5v-3.5c0-0.8-0.7-1.6-1.6-1.6h-15.7v-4.2c0-0.8-0.7-1.6-1.6-1.6H87.1c-0.8,0-1.6,0.7-1.6,1.6v4.2H69.9
                            	c-0.8,0-1.6,0.7-1.6,1.6v3.5h-4.5c-0.8,0-1.6,0.7-1.6,1.6v76.1c0,0.8,0.7,1.6,1.6,1.6h60.2c0.8,0,1.6-0.7,1.7-1.6v-76.1
                            	C125.7-25,125-25.7,124.2-25.7z M88.7-33.4h10.6v2.6H88.7V-33.4z M71.5-27.6h15.7h13.7h15.7v3.5v4.8H71.5v-4.8V-27.6z M122.5,50.4
                            	H65.4h-0.1v-72.9h2.9v4.9c0,0.8,0.7,1.6,1.6,1.6H118c0.3,0,0.6-0.1,0.9-0.3c0.5-0.2,0.8-0.7,0.8-1.4v-4.8h2.8L122.5,50.4L122.5,50.4
                            	z"/>
                            <polyline className="notification__content__icon__checkmark" points="79.7,17.7 89.8,28.3 108.3,6 " fill="none" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" />
                        </svg>
                        <p className="notification__content__text">{this.props.notificationText}</p>
                    </div>
                </div>
            );
        } else {
            return <span></span>
        }
    },
    render() {
        return (
            <ReactCSSTransitionGroup
                transitionName={{
                    enter: "notification--enter",
                    enterActive: "notification--enter--active",
                    leave: "notification--leave",
                    leaveActive: "notification--leave--active",
                    appear: "notification--appear",
                    appearActive: "notification--appear--active"
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
