RadioGroup = React.createClass({
    handleSelection( val, e ) {
        e.preventDefault();

        this.props.action( val );
    },
    outputOptions() {
        return Object.keys( this.props.items ).map( (ctx, idx ) => {
            var childClassName  = `${this.props.className}__item`,
                isChecked       = this.props.current == ctx ? "checked" : "";
                childClassName  = `${childClassName} ${childClassName}--${ctx}`;

            return (
                <input key={idx} type="radio" className={childClassName} onChange={this.handleSelection.bind( this, ctx )} value={ctx} checked={isChecked} />
            );
        });
    },
    render() {
        return (
            <radiogroup className={this.props.className}>
                {this.outputOptions()}
            </radiogroup>
        )
    }
})
