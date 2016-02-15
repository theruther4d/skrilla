EntryHeader = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        var data = {};
        var handle = Meteor.subscribe( 'entries' );
        var settings = Meteor.subscribe( 'userSettings' );

        if( handle.ready() ) {
            data.post = Entries.find( { date: this.props.date } ).fetch();
        }

        if( settings.ready() ) {
            data.settings = UserSettings.findOne();
        }

        return data;
    },
    formatDate( date ) {
        var newDate = new Date(),
            newDate = `${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()}`;

        if( newDate == date ) {
            return "Today";
        }

        var months  = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
            day     = date.substring( 2, 4 ),
            month   = months[ parseInt( date.substring( 0, 2 ) ) - 1 ];

        return `${day} ${month}`;
    },
    tallyTime() {
        var tally = 0;

        this.data.post.forEach( function( ctx, idx ) {
            tally += parseInt( ctx.legible.hour ) * 60;
            tally += parseInt( ctx.legible.min );
        });

        var talliedHours    = formatTime( Math.floor( tally / 60 ) );
        var talliedMins     = formatTime( Math.round( ( ( tally / 60 ) - talliedHours ) * 60 ) );

        return `${talliedHours}:${talliedMins}`;
    },
    tallyDollars() {
        if( !this.data.settings || !this.data.post ) {
            return "$0.00";
        }

        var rate    = this.data.settings.baseSalary,
            tally   = 0,
            result  = 0;

        this.data.post.forEach( function( ctx, idx ) {
            tally += parseInt( ctx.legible.hour ) * 60;
            tally += parseInt( ctx.legible.min );
        });

        result = ( ( tally / 60 ) * rate ).toFixed( 2 );

        return `${this.data.settings.currency}${result}`;
    },
    copyDailyTotal( e ) {
        e.preventDefault();

        var that        = this,
            input       = e.target.text,
            ms          = legibleToMs( input.split( ':' )[0], input.split( ':' )[1] ),
            output      = ( ( ( ms / 1000 ) / 3600 ) % 24 ).toFixed( 2 );

        Electrify.call( "copyToClipBoard", [output], function( err, msg ) {
            that.props.createNotification({
                text: `${output} copied to the clipboard!`
            });

            window.setTimeout( ()  => {
                that.props.removeNotification();
            }, 2000 );
        });
    },
    showIncomeToggle() {
        if( this.data.settings ) {
            if( this.data.settings.showIncome ) {
                return (
                    <span key={this.props.date}>
                        {this.tallyDollars()}
                    </span>
                )
            }
        }
    },
    render() {
        return (
            <h4 className="entry__summary">
                <span className="entry__date">
                    {this.formatDate( this.props.date )}
                </span>

                <span className="entry__dollar-total">
                    <ReactCSSTransitionGroup
                        transitionName={{
                            enter: "dollar--enter",
                            enterActive: "dollar--enter--active",
                            leave: "dollar--leave",
                            leaveActive: "dollar--leave--active",
                            appear: "dollar--appear",
                            appearActive: "dollar--appear--active"
                        }}
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                        className="entry__dollar-total__content"
                    >
                        {this.showIncomeToggle()}
                    </ReactCSSTransitionGroup>
                </span>

                <span className="entry__time-total">
                    <a className="entry__time-total__copy" title="copy the total for today into your clipboard" onClick={this.copyDailyTotal}>
                        {this.data.post ? this.tallyTime() : '00:00'}
                    </a>
                </span>
            </h4>
        )
    }
});
