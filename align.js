// Show and hide menucon

// Laptop
$(document).ready(function () {
    $('.hover1').on({
        mouseenter: function () {
            $('.submenu1').show(500);
        },
        mouseleave: function () {
            $('.submenu1').hide(700);
        }
    });
});

// Desktop
$(document).ready(function () {
    $('.hover2').on({
        mouseenter: function () {
            $('.submenu2').show(500);
        },
        mouseleave: function () {
            $('.submenu2').hide(700);
        }
    });
});

// Phone
$(document).ready(function () {
    $('.hover3').on({
        mouseenter: function () {
            $('.submenu3').show(500);
        },
        mouseleave: function () {
            $('.submenu3').hide(700);
        }
    });
});

// Tivi
$(document).ready(function () {
    $('.hover4').on({
        mouseenter: function () {
            $('.submenu4').show(500);
        },
        mouseleave: function () {
            $('.submenu4').hide(700);
        }
    });
});

// Fridge
$(document).ready(function () {
    $('.hover5').on({
        mouseenter: function () {
            $('.submenu5').show(500);
        },
        mouseleave: function () {
            $('.submenu5').hide(700);
        }
    });
});

// Search product
$(document).ready(function () {

    $('#search').keyup(function () {
        var key = $(this).val().toLowerCase();
        var productList = $('.product');

        productList.each(function () {
            var product = $(this);
            var productInfo = product.text().toLowerCase();

            if (productInfo.indexOf(key) == -1) {
                product.hide()
            } else {
                product.show();
            }
        });
    });

    // buy product
    $('.buy').click(function () {
        var currentQuantityProduct = $('.number-cart').text();
        var inputQuantity = $(this).parent().find('input').val();
        if (inputQuantity == 0 || inputQuantity == "") {
            alert('nhập số lượng');
        }
        var quantity = parseInt(currentQuantityProduct) + parseInt(inputQuantity);

        $('.number-cart').text(quantity);

        var newName = $(this).parent().parent().find('.card-title').text();
        var newCode = $(this).parent().parent().find('i:first').text();


        var listProduct = $('.list-order-product tr');
        var hasOrderProduct = false;

        listProduct.each(function (index, product) {

            var code = $(this).find('.code').text();
            var quantity = $(this).find('.quantity').text();
            var newQuantity = 0;

            if (code == newCode) {
                hasOrderProduct = true;
                newQuantity = parseInt(quantity) + parseInt(inputQuantity);

                $(this).find('.quantity').text(newQuantity);
            }
        });

        if (hasOrderProduct == false) {
            // Render order-product html
            var htmlProduct = '<tr>'
                + '<th scope="row">1</th>'
                + '<td class="name">' + newName + '</td>'
                + '<td class="code">' + newCode + '</td>'
                + '<td class="quantity">' + inputQuantity + '</td>'
                + '</tr>';

            $('.list-order-product').append(htmlProduct);
        }
    });

    // Order buy
    $('.order').change(function () {
        var orderType = $(this).val();
        var products = $('.product');

        var orderProduct = sortProduct(products, orderType);

        products.remove();

        // show orderProduct
        $('#products').append(orderProduct);


    });

    function sortProduct(products, type) {
        var results = [];
        var prices = [];
        products.each(function (index) {
            var product = $(this);
            var priceArr = product.find('i').text().split('vnđ');
            var price = priceArr[priceArr.length - 1];
            console.log(priceArr);
            prices[index] = price;

            product.addClass(price);

        });

        if (type == 2) {
            var orderPrices = prices.sort(function (a, b) { return a - b });
        } else if (type == 1) {
            var orderPrices = prices.sort(function (a, b) { return b - a });
        } else {
            location.reload();
        }

        $.each(orderPrices, function (index, value) {
            results[index] = $('.' + value);
        });

        return results;
    }
});