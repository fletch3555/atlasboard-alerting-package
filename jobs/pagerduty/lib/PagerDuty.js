(function () {

    module.exports = function (apikey, dependencies) {

        var async = dependencies.async,
            request = dependencies.request,
            extend = dependencies.extend,
            logger = dependencies.logger;

        var pagerduty = {
            _APIHOST: 'https://api.pagerduty.com',
            _getHeaders: function () {
                return {
                    'Authorization': 'Token token=' + apikey,
                    'Accept': 'application/vnd.pagerduty+json;version=2',
                    'Content-Type': 'application/json'
                };
            },
            _getSortQS: function (field, direction) {

            },
            _getDefaultAJAXOptions: function () {
                return {
                    'url': this._APIHOST,
                    'headers': this._getHeaders()
                };
            },
            _getResponse: function (path, options, callback) {
                options = extend(this._getDefaultAJAXOptions(), options);
                options.url = this._APIHOST + path;

                request(options, function (err, response, body) {
                    function handleError(err, response) {
                        var err_msg = err || "bad response from " + options.url + (response ? " - status code: " + response.statusCode : "");
                        logger.error(err_msg);
                        return callback(err || err_msg, response, null);
                    }

                    if (err || !response || response.statusCode != 200) {
                        return handleError(err, response);
                    } else {
                        return callback(null, response, body);
                    }
                });
            },
            _getJsonResponse: function (path, options, callback) {
                var sort;
                if (options.sortfield) {
                    if (options.sortfield == "status") {
                        sort = true;
                    } else {
                        path += "&" + encodeURIComponent(options.sortfield);
                    }
                    delete options.sortfield;
                }
                this._getResponse(path, options, function(err, response, body) {
                    if (err) {
                        return callback(err, body);
                    }
                    else {
                        var json_body;
                        try {
                            json_body = JSON.parse(body);

                            if (sort) {
                                json_body.incidents.sort(function(a,b) {
                                    if (a.status == b.status) { return a.incident_number > b.incident_number; }
                                    if (a.status == "triggered" || b.status == "resolved") return -1;
                                    if (a.status == "resolved" || b.status == "triggered") return 1;
                                    return 0
                                });
                            }
                        }
                        catch (e) {
                            return callback(e, null);
                        }
                        return callback(null, json_body);
                    }
                });
            },
            getAllIncidents: function (options, callback) {
                this._getJsonResponse('/incidents', extend(options || {}, {
                    'method': 'GET'
                }), callback);
            },
            getAllUnresolvedIncidents: function (options, callback) {
                this._getJsonResponse('/incidents?statuses%5B%5D=triggered&statuses%5B%5D=acknowledged&include%5B%5D=services&include%5B%5D=assignees', extend(options || {}, {
                    'method': 'GET'
                }), callback);
            }
        };

        return pagerduty;
    };

})();