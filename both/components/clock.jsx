var setIntervalMixin = {
    componentWillMount: function() {
        this.intervals = [];
    },
    setInterval: function() {
        this.intervals.push( setInterval.apply( null, arguments ) );
    },
    componentWillUnmount: function() {
        this.intervals.forEach( clearInterval );
    }
};

Clock = React.createClass({
    mixins: [setIntervalMixin],
    getInitialState: function() {
        return {
            initialTime: Date.now() - legibleToMs( this.props.initialHours, this.props.initialMins ),
            hours: formatTime( this.props.initialHours ),
            minutes: formatTime( this.props.initialMins ),
            seconds: '00'
        };
    },
    componentDidMount: function() {
        this.setInterval( this.tick, 1000 );
    },
    tick: function() {
        var difference  = Date.now() - this.state.initialTime,
            current     = msToLegible( difference ),
            newDate     = new Date();

        var doc = {
            _id: this.props.current_id,
            legible: {
                hour: current.hours,
                min: current.minutes
            },
            date: `${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()}`
        };

        Meteor.call( 'editEntry', doc );

        // Update hours, mins, secs:
        this.setState({
            hours: current.hours,
            minutes: current.minutes,
            seconds: current.seconds,
        });
    },
    render: function() {
        return (
            <span className="clock">{this.state.hours}:{this.state.minutes}:{this.state.seconds}</span>
        );
    }
});
