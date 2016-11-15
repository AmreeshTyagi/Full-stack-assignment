(function () {

    var _data = {};
    var payment = {
        method: 'iDeal',
        amount: null,
        currency: 'USD',
        created: null,
        status: null,
        merchant: null
    };
    var selection = null;
    var options = { tableName: 'Default' };


    var callBackButtonAction = function () {

        model.getPaymentByHighestAmount(function (response) {
            _data = response;
            options.tableName = 'Payments Table using callback';
            _renderPaymentTable(options, response);
        });
    };

    var promiseButtonAction = function () {
        var name='Ginger';
        model.getPaymentByMerchentName(name).then(function (response) {
            _data = response;
            options.tableName = 'Merchant data using Promise for merchant name '+name;
            _renderPaymentTable(options, response);
        });
    };

    var addPaymentButtonAction = function () {
        payment.amount = $('#amount').val();
        payment.status = 'accepted';
        payment.merchant = $('#merchant').val();
        payment.created = Date.now();

        if (!payment.merchant.length) {
            $('.alert').css('opacity', 1);
            $('.alert').removeClass('alert-success');
            $('.alert').addClass('alert-danger');
             $('.alert').html('<strong>Error!</strong> Merchant name can not be blank.');
            $('.alert').show().animate({ opacity: 0 }, { duration: 2000 });
        } else {
            model.setPayment(payment, function (response) {
                options.tableName = 'Payment added';
                $('.alert').css('opacity', 1);
                $('.alert').removeClass('alert-danger');
                $('.alert').addClass('alert-success');
                 $('.alert').html('<strong>Success!</strong> Payment added.');
                $('.alert').show().animate({ opacity: 0 }, { duration: 2000 });
               
                _renderPaymentTable(options, response);
            });
        }


    };

    var _renderPaymentTable = function (options, data) {
        var tablePre = '<table class="table table-striped">' +
            '<caption>' + options.tableName + '</caption>' +
            '<thead> <tr> <th>#</th><th> Merchant Name </th> <th>Amount</th><th>Currency</th> <th>Payment method</th>  </tr> </thead>' +
            '<tbody>';

        var tableData = '';
        for (var i = 0; i < data.length; ++i) {
            tableData += '<tr> <th scope="row">' + (i + 1) + '</th><td>' + data[i].merchant + '</th><td>' + Math.round(data[i].amount) + '</td> <td>' + data[i].currency + '</td> <td>' + data[i].method + '</td> </tr>';
        }

        var tablePost = '</tbody></table>';

        var tableBody = tablePre + tableData + tablePost;
        $('.table').hide();
        $('#payment-table').html(tableBody).show();
    };

    var _filterPayment = function (item) {
        if (item && item.method && item.method === selection) {
            return item;
        }
    }

    $('document').ready(function () {
        $('.js-action-callbackbutton').click(callBackButtonAction);

        $('.js-action-promisebutton').click(promiseButtonAction);

        $('.js-action-addpayment').click(addPaymentButtonAction);

        $("#filter-payment-dropdown ul.dropdown-menu li a").click(function () {
            $("#filter-payment-dropdown ul.dropdown-menu li a").removeClass('selected');
            $(this).dropdown("toggle");
            $(this).addClass("selected");
            selection = $(this).attr('data-payment-method');
            $("#filter-payment-dropdown button").html($(this).attr('data-payment-name'));

            if (_data && _data.length) {
                var filteredData = _data.filter(_filterPayment);
                options.tableName = "Filtered by: " + $(this).attr('data-payment-name');
                _renderPaymentTable(options, filteredData);
            }
            return false;
        });

        $("#add-payment-method-dropdown ul.dropdown-menu li a").click(function () {
            $("#add-payment-method-dropdown ul.dropdown-menu li a").removeClass('selected');
            $(this).dropdown("toggle");
            $(this).addClass("selected");
            $("#add-payment-method-dropdown button").html($(this).attr('data-payment-name'));
            payment.method = $(this).attr('data-payment-method');
            return false;
        });

        $("#add-currency-dropdown ul.dropdown-menu li a").click(function () {
            $("#aadd-currency-dropdown ul.dropdown-menu li a").removeClass('selected');
            $(this).dropdown("toggle");
            $(this).addClass("selected");
            $("#add-currency-dropdown button").html($(this).attr('data-currency-type'));
            payment.currency = $(this).attr('data-currency-type');
            return false;
        });
    });

})();