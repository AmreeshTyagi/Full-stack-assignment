var model = (function (options) {
    var baseURL = 'http://localhost:3000/payments';
    return {
        getPaymentByHighestAmount: function (cb) {
            db.getPayment(function (response) {
                if (response instanceof Array) {

                    var data = response;
                    for (index = 0; index < data.length; ++index) {
                        switch (data[index].currency) {
                            case "USD":
                                var amountInUsd = data[index].amount;
                                helper.usdToCent(amountInUsd, function (convertedAmount) {
                                    data[index].amount = convertedAmount;
                                    data[index].currency = 'CENTS';
                                });
                                break;

                            case "AUD":
                                var amountInAud = data[index].amount;
                                helper.audToCent(amountInAud, function (convertedAmount) {
                                    data[index].amount = convertedAmount;
                                    data[index].currency = 'CENTS';
                                });
                                break;

                            case "EUR":
                                var amountInEur = data[index].amount;
                                helper.eurToCent(amountInEur, function (convertedAmount) {
                                    data[index].amount = convertedAmount;
                                    data[index].currency = 'CENTS';
                                });
                                break;

                            case "GBP":
                                var amountInGbp = data[index].amount;
                                helper.gbpToCent(amountInGbp, function (convertedAmount) {
                                    data[index].amount = convertedAmount;
                                    data[index].currency = 'CENTS';
                                });
                                break;
                        }
                    }

                    var sortedData = _.sortBy(data, 'amount');

                    cb(sortedData.reverse());
                }
            });
        },

        getPaymentByMerchentName: function () {
            var d = $.Deferred();

            db.getPaymentByMerchentName()
                .done(function (data) {
                    d.resolve(data);
                })
                .fail(d.reject);

            return d.promise();
        },

        setPayment: function (request, cb) {
            db.setPayment(request, function (response) {
                cb(response);
            });

        }
    };
})();