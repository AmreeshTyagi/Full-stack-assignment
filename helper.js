var helper = (function () {
    return {
        usdToCent: function (usd,cb) {
         db.getLatestRates(function (data) {
                if (data.rates && data.rates.USD) {
                    var EURO = usd / data.rates.USD;
                    var cents=EURO*100;
                    cb(cents);
                } else {
                   cb(false);
                }
            });
        },

        audToCent: function (aud,cb) {
         db.getLatestRates(function (data) {
                if (data.rates && data.rates.AUD) {
                    var EURO = aud / data.rates.AUD;
                     var cents=EURO*100;
                    cb(cents);
                } else {
                   cb(false);
                }
            });
        },

        eurToCent: function (eur,cb) {
         db.getLatestRates(function (data) {
                if (data.rates && data.rates.EUR) {
                    var EURO = eur / data.rates.EUR;
                     var cents=EURO*100;
                    cb(cents);
                } else {
                   cb(false);
                }
            });
        },

        gbpToCent: function (gbp,cb) {
        db.getLatestRates(function (data) {
                if (data.rates && data.rates.GBP) {
                    var EURO = gbp / data.rates.GBP;
                     var cents=EURO*100;
                    cb(cents);
                } else {
                    cb(false);
                }
            });
        }
    };
})();