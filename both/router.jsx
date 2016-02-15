FlowRouter.route( '/', {
    name: 'home',
    action() {
        ReactLayout.render( MainLayout );
    }
});
