widget = {
  //runs when we receive data from the job
  onData: function (el, data) {

    if (data.title) {
      $('h2', el).text(data.title);
    }

    $('.content', el).html("");

    $.each(data.incidents, function (i,v) {
      var $incident = $('<div />');
      $incident.attr('class', 'incident ' + v.status);
      $incident.text(v.description);
      $('.content', el).append($incident);
    });
  }
};