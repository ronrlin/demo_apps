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
      // @todo: ticket should be used to share information with cardcom agent dash
      // http://developer.zendesk.com/documentation/apps/reference/data.html#user-object
      var ticket;
      var user;
      var url;
      // var agent = this.currentUser();
      // @todo: add phone number parameter
      if (this.hasOwnProperty('ticket')) {
        ticket = this.ticket();
        user = ticket.requester();
        url="//www.card.com/zendesk/agent?uid=" + user.externalId() + "&email=" + user.email() + "&zid=" + user.id() + "&tid=" + ticket.id();
      }
      else if (this.hasOwnProperty('user')) {
        user = this.user();
        url="//www.card.com/zendesk/agent?uid=" + user.externalId() + "&email=" + user.email() + "&zid=" + user.id();
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
