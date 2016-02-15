Incrementer = React.createClass({
    getInitialState() {
        return {
            value: this.props.currency + this.props.defaultValue
        }
    },
    stripCurrency( val ) {
        return parseInt( val.replace( /\D/, '' ) );
    },
    increment( e ) {
        e.preventDefault();
        
        this.setState({
            value: this.props.currency + ( this.stripCurrency( this.state.value ) + 1 )
        });

        this.handleChange();
    },
    decrement( e ) {
        e.preventDefault();
        
        this.setState({
            value: this.props.currency + ( this.stripCurrency( this.state.value ) - 1 )
        });

        this.handleChange();
    },
    handleChange() {
        var setting = {
            name: this.props.name,
            value: this.stripCurrency( this.state.value )
        };

        Meteor.call( 'updateSetting', setting );
    },
    render() {
        return (
            <div className="incrementer">
                <a href="#" className="incrementer__button incrementer__button--decrement" onClick={this.decrement}>-</a>
                <input className="incrementer__value" value={this.state.value} onChange={this.handleChange} />
                <a href="#" className="incrementer__button incrementer__button--increment" onClick={this.increment}>+</a>
            </div>
        )
    }
})
