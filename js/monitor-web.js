var MonitorWeb = MonitorWeb || {};

MonitorWeb = {

    holder: null,
    wait: null,
    template: null,

    init: function (options) {

        options = options || {};

        this.holder = $(options.holder || '.js-holder');
        this.template = $(options.template || '#js-template').html();
        this.wait = parseInt(options.wait || 3); // 3 seconds
        console.log(this.template);
        this.events();
        this.refresh();
    },

    events: function () {
        var self = this;

        $('[data-command]').off('click').on('click', function (e) {
            var command = $(this).attr('data-command');
            var appId = $(this).attr('data-app-id');
            self.command(appId, command);
        });
    },

    test: function () {

        var data = {
            'title': 'title...',
            'calc': 'calc...',
            "array": [
                {"name": "Moe"},
                {"name": "Larry"},
                {"name": "Curly"}
            ],
            "data": {
                'scoppe': [
                    {"name": "Moe"},
                    {"name": "Larry"},
                    {"name": "Curly"}
                ]
            }


        };

        var template = $('.js-test-template').html();
        var holder = $('.js-test-holder');

        holder.html(
            Mustache.render(template, data)
        );
    },

    render: function (data) {
        console.log('... render');
        this.holder.html(
            Mustache.render(this.template, data)
        );
        this.events(); // refresh
    }
    ,

    command: function (appId, command) {
        console.log('... commandr', appId, command);
        var url = '';
        var method = 'POST';
        var data = {
            'action': 'command',
            'appId': appId,
            'command': command
        };


        this.request(url, method, data).then(function (respomse) {
            console.log('respomse : ', respomse);
            this.refresh();
        }.bind(this));
    }
    ,


    refresh: function () {
        console.log('... refresh');
        var url = '/api';
        var method = 'GET';
        var data = {
            'action': 'stats'
        };

        this.request(url, method, data).then(function (respomse) {
            console.log('respomse : ', respomse);
            this.render(respomse);
        }.bind(this))
    }
    ,

    request: function (url, method, data) {
        console.log('... request', url, method, data);
        var dfd = $.Deferred();


        setTimeout(function () {

            var scope = {
                'command': {
                    'ok': true,
                    'msg': 'mock msg ....'
                },

                'stats': {
                    'ok': true,
                    'msg': 'mock msg ....',
                    'data': [
                        {
                            'appId': 'default',
                            'daemon': {
                                'key-1': 'value-1',
                                'key-2': 'value-2',
                                'key-3': 'value-3',
                                'key-4': 'value-4',
                                'key-5': 'value-5',
                                'key-6': 'value-6',
                                'key-7': 'value-7',
                                'key-8': 'value-8',
                                'key-9': 'value-9',
                                'key-10': 'value-10'
                            },
                            'queues': [
                                {
                                    'name': '\\Messenger\\Class',
                                    'count': 123,
                                    'active': true
                                },
                                {
                                    'name': '\\Messenger\\Class2',
                                    'count': 99,
                                    'active': false
                                }
                            ],
                            'managers': [
                                {
                                    'name': '\\Messenger\\Class',
                                    'count': 123,
                                    'active': true
                                },
                                {
                                    'name': '\\Messenger\\Class2',
                                    'count': 99,
                                    'active': false
                                }
                            ]
                        }
                    ]
                }
            };
            var s = scope[data['action']];
            dfd.resolve(s);
        }, 500);

        return dfd.promise();

        return $.when(
            $.ajax({
                url: url,
                method: method,
                data: data || {}
            })
        );
    }

}
;