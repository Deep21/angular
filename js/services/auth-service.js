'use strict'

app.service('testService', function() {
        var text = "start value";
        return {
            saveEmail: function(data) {
                text = data;
            },

            getEmail: function() {
                return text;
            }
        };
    });