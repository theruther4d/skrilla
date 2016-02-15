if( window.current_id ) {
    window.sleep = window.sleep || {};
    window.sleep.startTime = Date.now();

    // Trigger stop resume:
    var resumeButton = document.querySelector( '.entry__stop' );
    resumeButton.click();
}
