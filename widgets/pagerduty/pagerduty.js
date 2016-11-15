widget = {
  //runs when we receive data from the job
  onData: function (el, data) {

    if (data.title) {
      $('h2', el).text(data.title);
    }

    $('.incidents', el).empty();

    if (data.incidents.length > 0) {
      data.incidents.forEach(function (incident) {
        var listItem = $("<li/>")
        listItem.addClass('incident');
        listItem.addClass(incident.status);

        var $summary = $("<div/>").addClass("incident-description").append(incident.description).appendTo(listItem);

        var $incidentData = $("<div class=\"incident-data\"/>");
        $incidentData.append($("<strong/>").addClass("incident-source").append(incident.service.summary));
        $incidentData.append($("<strong/>").addClass("incident-assignee").append(incident.assignments[0].assignee.name));
        listItem.append($incidentData);

        $('.incidents', el).append(listItem);
      });
    }

    $('.content', el).show();
  }
};