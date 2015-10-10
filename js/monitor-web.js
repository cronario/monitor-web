var MonitorWeb = MonitorWeb || {};

MonitorWeb = {

    container: null,
    wait: null,

    init: function (selector, wait) {
        this.container = $(selector);
        this.wait = wait;
    },

    getData: function () {

    },

    render: function (data) {

        var html = '';

        for (var prop in data) {
            var appId = prop;
            var daemon = data[prop]['daemon'];
            var queues = data[prop]['queues'];
            var managers = data[prop]['managers'];

            html += this.buildHtml(appId, daemon, queues, managers);

        }

        this.container.html(html);
    },

    buildHtml: function (appId, daemon, queues, managers) {
        var html = '';

        html += appId + 'daemon :) ';
        return html;
    }


};