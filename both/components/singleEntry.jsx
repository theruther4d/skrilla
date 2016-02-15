SingleEntry = React.createClass({
    getInitialState() {
        return {
            willDelete: false
        }
    },
    handleDelete( _id, e ) {
        var unDelete = this.state.willDelete;

        if( unDelete ) {
            this.props.removeDelete( _id );
        } else {
            this.props.addDelete( _id );
        }

        this.setState({
            willDelete: !this.state.willDelete
        });
    },
    render() {
        var editClass   = this.props.editing ? `${this.props.className} editing` : this.props.className,
            finalClass  = this.props.editing && this.state.willDelete ? `${editClass} deleting` : editClass;

        return (
            <li className={finalClass} key={this.props.id}>
                <input
                    type="checkbox"
                    className="radio-checkbox entries__item__checkbox"
                    onChange={this.handleDelete.bind( this, this.props.id )}
                />
                <div className="entries__item__wrapper">
                    <input className="entries__title" value={this.props.title} onChange={ this.props.noteChange.bind( null, this.props.id ) } onClick={this.props.selectText} />
                    <span className="entries__time">
                        <input type="number" min="0" max="24" step="1" className="entries__hours" value={this.props.hour} onChange={this.props.timeChange.bind( null, this.props.id )} />
                        <span className="colon">:</span>
                        <input type="number" min="0" max="59" step="1" className="entries__minute" value={this.props.min} onChange={this.props.timeChange.bind( null, this.props.id )} />
                    </span>
                    <a href="#" title="resume time" className="entry__continue" onClick={this.props.handleResume.bind( null, this.props.id )}>
                        {this.props.isResumed ? <StopButton /> : <ResumeButton />}
                    </a>
                </div>
            </li>
        )
    }
});
