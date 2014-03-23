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
        this.showIframe({ width: '300px', height: '500px' });
      }
    },

    paneActivated: function(data) { //load content if app is at top_bar and nav_bar
      if (data.firstLoad) {
        this.showIframe({ width: '1024px', height: '500px' });
      }
    },

    showIframe: function(dimensions) {
      // Some notes on the Zendesk Data API.
      // user.id() -> zendesk user id
      // user.externalId() -> card.com uid
      // this.currentUser() -> card.com agent
      var ticket;
      var user;
      var url;
      if (this.hasOwnProperty('ticket')) {
        ticket = this.ticket();
        user = ticket.requester();
        url="//www.card.com/zendesk/agent?uid=" + user.externalId() + "&email=" + user.email() + "&tid=" + ticket.id();
      }
      else if (this.hasOwnProperty('user')) {
        user = this.user();
        url="//www.card.com/zendesk/agent?email=" + user.email();
      }
      else {
        url="//www.card.com/zendesk/agent?uid=0";
      }
      this.switchTo('iframePage', {
        dimension: dimensions,
        href: url
      });
    }
  };
}());
