var db = (function(options) {
    var apiBaseUrl = 'http://localhost:3000/payments';
    var conversionRate = null;
    return {
        getPayment: function(cb) {
            return $.ajax({
                method: "GET",
                url: apiBaseUrl //+ '?_limit=20&_page=1'
            })
                .done(function(response) {
                    cb(response);
                });
        },

        getPaymentByMerchentName: function() {

            var d = $.Deferred();
            $.ajax({
                method: "GET",
                url: apiBaseUrl + '?merchant=Ginger'
            })
                .done(function(response) {
                    d.resolve(response);
                })
                .fail(d.reject);

            return d.promise();
        },

        setPayment: function(request, cb) {
            return $.ajax({
                method: "POST",
                url: apiBaseUrl,
                data:request,
                dataType: "json",
            })
                .done(function(response) {
                    cb([response]);
                });
        },

        getLatestRates: function(cb) {

            var latestRates = {
                "base": "EUR",
                "date": "2016-11-15",
                "rates": {
                    "AUD": 1.424,
                    "GBP": 0.86638,
                    "USD": 1.0765,
                    "EUR": 1
                }
            };

            cb(latestRates);
        }
    };
})();