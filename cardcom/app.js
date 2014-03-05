(function() {

  // not using SIDE_BAR_HREF
  var SIDE_BAR_HREF = "https://www.wikipedia.org",
      SIDE_BAR_REGEX = /_sidebar$/;

  return {
    events: {
      'app.activated': 'init',
      'pane.activated': 'paneActivated'
    },

    init: function(data){ //load content if app is at new_ticket_sidebar, ticket_sidebar and user_sidebar
      if (data.firstLoad && SIDE_BAR_REGEX.test(this.currentLocation())) {
        this.showIframe({ width: '300px', height: '260px' });
      }
    },

    paneActivated: function(data) { //load content if app is at top_bar and nav_bar
      if (data.firstLoad) {
        this.showIframe({ width: '1024px', height: '500px' });
      }
    },

    showIframe: function(dimensions) {
      // @todo: ticket should be used to share information with cardcom agent dash
      var ticket;
      if (this.ticket() == null) {
        // @todo: figure this out later
      }
      else {
        ticket = this.ticket();
      }

      var cUser = this.currentUser();
      var url="//www.card.com/zendesk/agent?uid=" + cUser.id();
      this.switchTo('iframePage', {
        dimension: dimensions,
        href: url
      });
    }
  };
}());
