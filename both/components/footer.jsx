Footer = React.createClass({
    isActive() {
        return this.props.toDelete.length > 0;
    },
    handleDelete( e ) {
        e.preventDefault();

        if( this.isActive() ) {
            this.props.toDelete.forEach( ( ctx ) => {
                Meteor.call( 'deleteEntry', ctx );
            });

            this.props.toggleEditing();
        }
    },
    render() {
        activeClass = this.isActive() ? "footer__delete footer__delete--active" : "footer__delete";

        return (
            <footer className="footer" key={1}>
                <a className={activeClass} onClick={this.handleDelete}>Delete</a>
            </footer>
        );
    }
});
