/**
 * Copyright © 2017 Mozg. All rights reserved.
 * See LICENSE.txt for license details.
 */

//

// 2019-04-05 01:37:18

//

/*
- object literals
*/

//

var debugData = [];

var Mozg = Mozg || {};

Mozg.Pagseguro = {

    _version: '1.0.0',

    construct: function(){

        debugData.push(arguments.callee.name);

        console.log('Mozg.Pagseguro.construct');

        console.log(arguments);

        //

        //console.log(IWD);
        //console.log(typeof IWD);

        //

    },

    variableObject: {},

    initialize: function(){

        debugData.push(arguments.callee.name);

        console.log('Mozg.Pagseguro.initialize');

        console.log(arguments);

        //

        Mozg.Pagseguro.construct();

        //

        if (typeof IWD !== 'undefined') {
            //IWD.OPC.Checkout.showLoader();
        }

        //

        var variableObject = Mozg.Pagseguro.variableObject;

        variableObject.config = arguments[0];

        variableObject.errors = {
            10000:"Bandeira de cartão de crédito inválida.",
            10001:"Número de cartão de crédito com comprimento inválido.",
            10006:"Tamanho do CVV inválido.",
            30400:"Dados do cartão inválidos.",
            30405:"Data de validade incorreta.",
            59001:"ID da sessão web desconhecida",
        };

        variableObject.messages = [
            "mozg_pagseguro_api_cc_message",
            "mozg_pagseguro_api_boleto_message",
            "mozg_pagseguro_api_eletronictransfer_message"
            ];

        //

        //Mozg.Pagseguro.getAmount();

        //

        debugData.push(variableObject.config);

        //

    },

    getAmount: function(){

        var calleeName = arguments.callee.name;

        debugData.push(calleeName);

        console.log('Mozg.Pagseguro.getAmount');

        //

        var variableObject = Mozg.Pagseguro.variableObject;
        var config = variableObject.config;
        console.log(variableObject);
        var base_url = config.base_url;
        var url = base_url + 'mozg_pagseguro/index/getSubtotal/';

        console.log(url);

        var req = new Ajax.Request( url, {
            //evalScripts: true,
            //method: 'post',
            //asynchronous: true,
            //parameters:'',
            onCreate: function(response) {
                console.log('onCreate ' + calleeName);
                console.log(response);
            },
            onLoading: function(response) {
                console.log('onLoading ' + calleeName);
                console.log(response);
            },
            onSuccess: function(response) {
                console.log('onSuccess ' + calleeName);
                console.log(response);

                var amount = response.responseText;

                Mozg.Pagseguro.setAmount(amount);

            },
            onComplete: function(response) {
                console.log('onComplete ' + calleeName);
                console.log(response);
            },
            onFailure: function(response){
                console.log('onFailure ' + calleeName);
                console.log(response);

                alert('Server Error. Please try again.');
            }
        });

        //

    },

    setAmount: function(amount){

        debugData.push(arguments.callee.name);

        console.log('Mozg.Pagseguro.setAmount');

        //

        var variableObject = Mozg.Pagseguro.variableObject;

        variableObject.config.amount = amount;

        console.log(variableObject);

        //

    },

    loader: function(){

        //

        setTimeout(function(){

            console.log('# Checando biblioteca');
            console.log(PagSeguroDirectPayment);
            console.log(PagSeguroDirectPayment.ready);
            if(!PagSeguroDirectPayment.ready){
                alert('Após 3 segundos, a biblioteca do PagSeguro não foi carregada, recarregue a página do browser ou tente em outro browser.');
            }

        }, 3000);

        //

        var methods = $$('#p_method_mozg_pagseguro_api_cc', '#p_method_mozg_pagseguro_api_dc', '#p_method_mozg_pagseguro_api_boleto', '#p_method_mozg_pagseguro_api_eletronictransfer');

        //console.log(methods);
        //console.log(methods.length);

        if(!methods.length){
            console.log('PagSeguro: Não há métodos de pagamento habilitados em exibição.');
            //return;
        }

        methods.forEach(function(item) {
            //console.log(item);
            //console.log(item.checked);
        });

        //

        jQuery(document).on('click', '.opc-btn-checkout', function () {
            //Mozg.Pagseguro.construct();
            //Mozg.Pagseguro.isValidForm();
        });

        //

        Mozg.Pagseguro.setSessionId();

        //

        setTimeout(function(){

            Mozg.Pagseguro.getPaymentMethods();

        }, 1000);

        //

        // Attach an event handler for an element

        live('p_method_mozg_pagseguro_api_cc', 'change', function(){
            console.log(arguments);
            Mozg.Pagseguro.observerFieldsCc();
            Mozg.Pagseguro.getPaymentMethods();
        });

        live('p_method_mozg_pagseguro_api_boleto', 'change', function(){
            console.log(arguments);
            Mozg.Pagseguro.observerFieldsBoleto();
            Mozg.Pagseguro.getPaymentMethods();
        });

        live('p_method_mozg_pagseguro_api_eletronictransfer', 'change', function(){
            console.log(arguments);
            Mozg.Pagseguro.observerFieldsTEF();
            Mozg.Pagseguro.getPaymentMethods();
        });

        //

    },

    setSessionId: function(){

        debugData.push(arguments.callee.name);

        console.log('Mozg.Pagseguro.setSessionId');

        var variableObject = Mozg.Pagseguro.variableObject;

        var config = variableObject.config;

        var pagseguro_session_id = config.pagseguro_session_id;

        console.log(pagseguro_session_id);
        //console.log(Mozg.Pagseguro);

        PagSeguroDirectPayment.setSessionId(pagseguro_session_id);

    },

    setMessage: function(type, message){

        debugData.push(arguments.callee.name);

        console.log('Mozg.Pagseguro.setMessage');

        var html = '<ul class="messages"><li class="'+type+'-msg"><ul><li>' + message + '</li></ul></li></ul>';

        var variableObject = Mozg.Pagseguro.variableObject;

        var messages = variableObject.messages;

        messages.forEach(function(item) {
            if($(item)){
                $(item).update(html);
            }
        });

    },

    isValidFormField: function(){

        debugData.push(arguments.callee.name);

        console.log('Mozg.Pagseguro.isValidFormField');

        Mozg.Pagseguro.getSenderHash();

        var getCurrentMethod = Mozg.Pagseguro.getCurrentMethod();

        if(getCurrentMethod == 'mozg_pagseguro_api_cc'){
            Mozg.Pagseguro.getDataCc();
            Mozg.Pagseguro.getBrand();
        }


    },

    getCurrentMethod: function(){

        debugData.push(arguments.callee.name);

        console.log('Mozg.Pagseguro.getCurrentMethod');

        console.log(payment);

        currentMethod = false;

        if (payment['currentMethod']){
            currentMethod = payment['currentMethod'];
        };

        console.log(currentMethod);

        return currentMethod;

    },

    isValidForm: function(){

        debugData.push(arguments.callee.name);

        console.log('Mozg.Pagseguro.isValidForm');

        if (typeof IWD !== 'undefined') {
            //IWD.OPC.Checkout.showLoader();
        }

        var getCurrentMethod = Mozg.Pagseguro.getCurrentMethod();

        if(getCurrentMethod == 'mozg_pagseguro_api_cc'){
            Mozg.Pagseguro.createCardToken();
        }else{
            Mozg.Pagseguro.setMessage('success', 'Armazenando retorno da PagSeguro');
            Mozg.Pagseguro.updatePaymentHashes();
        }

        setTimeout(function(){

            console.log('# - # - # - # - ');
            console.log(Mozg.Pagseguro);
            console.log(debugData);

        }, 2000);

    },

    getSenderHash: function(){

        debugData.push(arguments.callee.name);

        console.log('Mozg.Pagseguro.getSenderHash');

        console.log(PagSeguroDirectPayment);

        var response = PagSeguroDirectPayment.getSenderHash();

        console.log(response);

        var variableObject = Mozg.Pagseguro.variableObject;

        variableObject.getSenderHash = response;
    },

    getDataCc: function(){

        debugData.push(arguments.callee.name);

        console.log('Mozg.Pagseguro.getDataCc');

        //

        console.log(arguments);

        /*args = [].slice.apply(arguments); // ArgumentsToArray

        console.log(args);
        console.log(args[0]);

        args.forEach(function(value) {
            console.log('value ===', value);
        });*/

        //

        var cardNumber = document.getElementById( 'mozg_pagseguro_api_cc_cc_number' ).value;
        var expirationMonth = document.getElementById( 'mozg_pagseguro_api_cc_expiration' ).value;
        var expirationYear = document.getElementById( 'mozg_pagseguro_api_cc_expiration_yr' ).value;
        var cvv = document.getElementById( 'mozg_pagseguro_api_cc_cc_cid' ).value;

        var cardNumber = cardNumber.replace(/ /g, "");
        var cardBin = cardNumber.substring(0, 6);

        //

        var variableObject = Mozg.Pagseguro.variableObject;

        variableObject.cardNumber = cardNumber;
        variableObject.expirationMonth = expirationMonth;
        variableObject.expirationYear = expirationYear;
        variableObject.cvv = cvv;
        variableObject.cardBin = cardBin;

        //

    },

    getPaymentMethods: function(){

        debugData.push(arguments.callee.name);

        console.log('Mozg.Pagseguro.getPaymentMethods');

        //Mozg.Pagseguro.setMessage('warning', 'Obtendo métodos de pagamento');

        var variableObject = Mozg.Pagseguro.variableObject;

        console.log(variableObject);

        if(variableObject.getPaymentMethods){
            Mozg.Pagseguro.showBrands();
            return false;
        }

        var config = variableObject.config;

        var amount = config.amount;

        var getCurrentMethod = Mozg.Pagseguro.getCurrentMethod();

        /*if( (getCurrentMethod == 'mozg_pagseguro_api_cc') && $('mozg_pagseguro_api_cc_grand_total') ){
            var amount = $('mozg_pagseguro_api_cc_grand_total').value;
        }
        if( (getCurrentMethod == 'mozg_pagseguro_api_boleto') && $('mozg_pagseguro_api_boleto_grand_total') ){
            var amount = $('mozg_pagseguro_api_boleto_grand_total').value;
        }
        if( (getCurrentMethod == 'mozg_pagseguro_api_eletronictransfer') && $('mozg_pagseguro_api_eletronictransfer_grand_total') ){
            var amount = $('mozg_pagseguro_api_eletronictransfer_grand_total').value;
        }*/

        console.log(amount);

        var param = {
            amount: amount,
            success: function(response) {
                //meios de pagamento disponíveis
                console.log('Mozg.Pagseguro.getPaymentMethods.success');
                console.log(response);
                //console.log(response.paymentMethods);

                variableObject.getPaymentMethods = response;

                debugData.push(response);

                if (response.error == true) {
                    alert('Não foi possível obter os meios de pagamento que estão funcionando no momento.');
                }

                //

                /*var i = 0;
                for(pagamento in response.paymentMethods){
                    var paymentMethods = Object.keys(response.paymentMethods).map(function(k) {
                    return response.paymentMethods[k]
                    });

                    console.log(paymentMethods[i].name);
                    i++;
                }*/

                //

                Mozg.Pagseguro.showBrands();

            //

            },
            error: function(response) {
                //tratamento do erro
                console.log('Mozg.Pagseguro.getPaymentMethods.error');
                console.log(response);

                var errors = response.errors;

                //console.log(errors);

                var keys = Object.keys(errors);
                var values = Object.values(errors);

                //console.log(keys);
                //console.log(values);

                var key = keys[0];
                var value = values[0];

                var variableObject = Mozg.Pagseguro.variableObject;

                var errors = variableObject.errors;

                var _error = errors[key];

                var message = value;

                if (typeof _error !== 'undefined') {
                    var message = _error;
                }

                //

                Mozg.Pagseguro.setMessage('error', message);

            },
            complete: function(response) {
                //tratamento comum para todas chamadas
                console.log('Mozg.Pagseguro.getPaymentMethods.complete');
                console.log(response);

                if (typeof IWD !== 'undefined') {
                    //IWD.OPC.Checkout.hideLoader();
                }

            }
        };

        console.log(param);

        PagSeguroDirectPayment.getPaymentMethods(param);

    },

    showBrands: function(){

        //return;

        debugData.push(arguments.callee.name);

        console.log('Mozg.Pagseguro.showBrands');

        var variableObject = Mozg.Pagseguro.variableObject;

        var getPaymentMethods = variableObject.getPaymentMethods;

        try {

            //

            if($('mozg_pagseguro_api_cc_message')){

                //console.log('CREDIT_CARD');

                credit_card_name = [];

                var cards_avaliable_innerHTML = $('mozg_pagseguro_cards_avaliable').innerHTML;

                //console.log(cards_avaliable_innerHTML);

                if(cards_avaliable_innerHTML == ''){

                    count = 0;
                    for (y in getPaymentMethods.paymentMethods.CREDIT_CARD.options) {
                        var optName = getPaymentMethods.paymentMethods.CREDIT_CARD.options[y].name.toString();
                        var optDisplayName = getPaymentMethods.paymentMethods.CREDIT_CARD.options[y].displayName.toString();
                        var optImage = getPaymentMethods.paymentMethods.CREDIT_CARD.options[y].images.SMALL.path.toString();
                        var optStatus = getPaymentMethods.paymentMethods.CREDIT_CARD.options[y].status;

                        //console.log(optName + ' - ' + optStatus);

                        if (optStatus != 'UNAVAILABLE') {

                            //console.log(optName);

                            credit_card_name.push(optName);

                            //console.log(optDisplayName);
                            //console.log(optImage);
                            //console.log(credit_card_name);

                            var imgElement = new Image(42, 20);
                            imgElement.id = 'mozg_pagseguro_cc_' + optName;
                            imgElement.src = 'https://stc.pagseguro.uol.com.br/' + optImage;

                            //console.log(imgElement);

                            /*imgElement.addEventListener('load', function(){
                                //console.log('imgElement load');
                                //console.log(arguments);
                                //console.log(this);
                            });
                            imgElement.addEventListener('error', function(){
                                console.log('imgElement error');
                                console.log(arguments);
                                console.log(this);
                            })*/

                            var _html = imgElement;

                            //console.log(_html);

                            //$('mozg_pagseguro_cards_avaliable').append(_html);

                            //$('mozg_pagseguro_cards_avaliable').innerHTML = (_html);

                            document.getElementById("mozg_pagseguro_cards_avaliable").appendChild(_html);


                            count++;

                        }
                    }

                }

            }

            //

        } catch (err) {
            console.log(err.message);
        }

        //

        try {

            //

            if($('mozg_pagseguro_api_boleto_message')){

                //console.log('BOLETO');

                //$('mozg_pagseguro_api_boleto_service_type').options.length = 0;

                var select = $('mozg_pagseguro_api_boleto_service_type');

                select.remove(1);

                var boleto_type_length = select.options.length;

                console.log(boleto_type_length);

                if(boleto_type_length == 1){

                    /*var optElm = new Element('option', {value: ''}).update('');
                    $('mozg_pagseguro_api_boleto_service_type').insert(optElm);*/

                    for (y in getPaymentMethods.paymentMethods.BOLETO.options) {
                        var optName = getPaymentMethods.paymentMethods.BOLETO.options[y].name.toString();
                        var optDisplayName = getPaymentMethods.paymentMethods.BOLETO.options[y].displayName.toString();
                        var optStatus = getPaymentMethods.paymentMethods.BOLETO.options[y].status;

                        //console.log(optName + ' - ' + optStatus);

                        if (optStatus != 'UNAVAILABLE') {

                            var optElm = new Element('option', {value: optName}).update(optDisplayName);

                            $('mozg_pagseguro_api_boleto_service_type').insert(optElm);
                        }
                    }

                }

            }

            //

        } catch (err) {
            console.log(err.message);
        }

        //

        try {

            //

            if($('mozg_pagseguro_api_eletronictransfer_message')){

                //console.log('ONLINE_DEBIT');

                //$('mozg_pagseguro_api_eletronictransfer_service_type').options.length = 0;

                var select = $('mozg_pagseguro_api_eletronictransfer_service_type');

                select.remove(1);

                var eletronictransfer_type_length = select.options.length;

                console.log(eletronictransfer_type_length);

                //console.log(eletronictransfer_type_length);

                if(eletronictransfer_type_length == 1){

                    /*var optElm = new Element('option', {value: ''}).update('');
                    $('mozg_pagseguro_api_eletronictransfer_service_type').insert(optElm);*/

                    for (y in getPaymentMethods.paymentMethods.ONLINE_DEBIT.options) {
                        var optName = getPaymentMethods.paymentMethods.ONLINE_DEBIT.options[y].name.toString();
                        var optDisplayName = getPaymentMethods.paymentMethods.ONLINE_DEBIT.options[y].displayName.toString();
                        var optStatus = getPaymentMethods.paymentMethods.ONLINE_DEBIT.options[y].status;

                        //console.log(optName + ' - ' + optStatus);

                        if (optStatus != 'UNAVAILABLE') {

                            var optElm = new Element('option', {value: optName}).update(optDisplayName);

                            $('mozg_pagseguro_api_eletronictransfer_service_type').insert(optElm);
                        }
                    }

                }

            }

            //

        } catch (err) {
            console.log(err.message);
        }

        //

        //Mozg.Pagseguro.setMessage('success', 'Métodos obtidos, prossiga');

        //

    },

    getBrand: function(){

        debugData.push(arguments.callee.name);

        console.log('Mozg.Pagseguro.getBrand');

        var variableObject = Mozg.Pagseguro.variableObject;

        console.log(variableObject);

        var config = variableObject.config;

        var cardBin = variableObject.cardBin;

        var getPaymentMethods = variableObject.getPaymentMethods;

        var param = {
            cardBin: cardBin,
            success: function(response) {
                //bandeira encontrada
                console.log('Mozg.Pagseguro.getBrand.success');
                console.log(response);

                debugData.push(response);

                variableObject.getBrand = response;

                var brandName = response.brand.name;
                var flag = config.flag;

                //

                //$('mozg_pagseguro_card_brand').innerHTML = '<img src="https://stc.pagseguro.uol.com.br/public/img/payment-methods-flags/' +flag + '/' + brandName + '.png" alt="' + brandName + '" title="' + brandName + '"/>';

                //

                Mozg.Pagseguro.cardSetCardBrand(brandName);

                Mozg.Pagseguro.getInstallments(brandName);

                //

            },
            error: function(response) {
                //tratamento do erro
                console.log('Mozg.Pagseguro.getBrand.error');
                console.log(response);

                Mozg.Pagseguro.setMessage('error', 'Cartão inválido');

                var textbox = document.getElementById("mozg_pagseguro_api_cc_cc_number");
                textbox.focus();

                var blockPayment = document.getElementById("payment_form_mozg_pagseguro_api_cc");
                blockPayment.scrollIntoView();

            },
            complete: function(response) {
                //tratamento comum para todas chamadas
                console.log('Mozg.Pagseguro.getBrand.complete');
                console.log(response);
            }
        };

        console.log(param);

        PagSeguroDirectPayment.getBrand(param);

    },

    cardSetCardBrand: function(){

        debugData.push(arguments.callee.name);

        console.log('Mozg.Pagseguro.cardSetCardBrand');

        var brandName = arguments[0];

        console.log(brandName);

        var variableObject = Mozg.Pagseguro.variableObject;

        var getPaymentMethods = variableObject.getPaymentMethods;

        for (y in getPaymentMethods.paymentMethods.CREDIT_CARD.options) {
            var optName = getPaymentMethods.paymentMethods.CREDIT_CARD.options[y].name.toString();
            var optStatus = getPaymentMethods.paymentMethods.CREDIT_CARD.options[y].status;

            if (optStatus != 'UNAVAILABLE') {

                var imageId = 'mozg_pagseguro_cc_' + optName;
                var brandName = brandName.toUpperCase();
                //console.log(imageId + ' - ' + optName + ' - ' + brandName);
                if(optName == brandName) {
                    $(imageId).removeClassName('grey');
                } else {
                    $(imageId).addClassName('grey');
                }
                document.getElementById(imageId).style.display="inline";

            }

        }

    },

    getInstallments: function(){

        debugData.push(arguments.callee.name);

        console.log('Mozg.Pagseguro.getInstallments');
        console.log(arguments);
        console.log(typeof arguments);
        var args = [].slice.apply(arguments); // ArgumentsToArray
        console.log(args);

        var brandName = arguments[0];

        var variableObject = Mozg.Pagseguro.variableObject;

        var config = variableObject.config;

        var amount = config.amount;

        var getCurrentMethod = Mozg.Pagseguro.getCurrentMethod();

        /*if(getCurrentMethod == 'mozg_pagseguro_api_cc'){
            var amount = $('mozg_pagseguro_api_cc_grand_total').value;
        }
        if(getCurrentMethod == 'mozg_pagseguro_api_boleto'){
            var amount = $('mozg_pagseguro_api_boleto_grand_total').value;
        }
        if(getCurrentMethod == 'mozg_pagseguro_api_eletronictransfer'){
            var amount = $('mozg_pagseguro_api_eletronictransfer_grand_total').value;
        }*/

        console.log(amount);

        var param = {
            amount: amount,
            brand: brandName,
            //maxInstallmentNoInterest: 2,
            success: function(response) {
                //opções de parcelamento disponível
                console.log('Mozg.Pagseguro.getInstallments.success');
                console.log(response);

                debugData.push(response);

                variableObject.getInstallments = response;

                var parcelsDrop = $('mozg_pagseguro_api_cc_installments');
                parcelsDrop.length = 0;

                for(installment in response.installments) break;
                console.log(response.installments);

                var b = response.installments[brandName];
                var selectedInstallment = 1;

                if(config.force_installments_selection){
                    var option = document.createElement('option');
                    option.text = "Selecione a quantidade de parcelas";
                    option.value = "";
                    parcelsDrop.add(option);
                }

                for(var x=0; x < b.length; x++){
                    var option = document.createElement('option');
                    option.text = b[x].quantity + "x de R$" + b[x].installmentAmount.toFixed(2).toString().replace('.',',');
                    option.text += (b[x].interestFree)?" sem juros":" com juros";
                    if(config.show_total){
                        option.text += " (total R$" + (b[x].installmentAmount*b[x].quantity).toFixed(2).toString().replace('.', ',') + ")";
                    }
                    option.selected = (b[x].quantity == selectedInstallment);
                    option.value = b[x].quantity + "|" + b[x].installmentAmount;
                    parcelsDrop.add(option);
                }

                console.log(b[0].quantity);
                console.log(b[0].installmentAmount);

            },
            error: function(response) {
                //tratamento do erro
                console.log('Mozg.Pagseguro.getInstallments.error');
                console.log(response);

                Mozg.Pagseguro.setMessage('error', 'Houve um erro no retorno das parcelas');
            },
            complete: function(response) {
                //tratamento comum para todas chamadas
                console.log('Mozg.Pagseguro.getInstallments.complete');
                console.log(response);
            }
        };

        console.log(param);

        PagSeguroDirectPayment.getInstallments(param);

    },

    createCardToken: function(){

        debugData.push(arguments.callee.name);

        console.log('Mozg.Pagseguro.createCardToken');

        var variableObject = Mozg.Pagseguro.variableObject;

        var cardNumber = variableObject.cardNumber;
        var cvv = variableObject.cvv;
        var expirationMonth = variableObject.expirationMonth;
        var expirationYear = variableObject.expirationYear;

        var param = {
            cardNumber: cardNumber,
            cvv: cvv,
            expirationMonth: expirationMonth,
            expirationYear: expirationYear,
            success: function(response) {
                //token gerado, esse deve ser usado na chamada da API do Checkout Transparente
                console.log('Mozg.Pagseguro.createCardToken.success');
                console.log(response);

                variableObject.createCardToken = response;

                debugData.push(response);

                Mozg.Pagseguro.setMessage('success', 'Armazenando retorno da PagSeguro');

                Mozg.Pagseguro.updatePaymentHashes();

            },
            error: function(response) {
                //tratamento do erro
                console.log('Mozg.Pagseguro.createCardToken.error');
                console.log(response);

                //

                var errors = response.errors;

                var keys = Object.keys(errors);
                var values = Object.values(errors);

                //console.log(keys);
                //console.log(values);

                var key = keys[0];
                var value = values[0];

                var variableObject = Mozg.Pagseguro.variableObject;

                var errors = variableObject.errors;

                var _error = errors[key];

                var message = value;

                if (typeof _error !== 'undefined') {
                    var message = _error;
                }

                //

                $('mozg_pagseguro_api_cc_cc_cid').value = '';

                console.error('Falha ao obter o token do cartao.');

                Mozg.Pagseguro.setMessage('error', message);

                var textbox = document.getElementById("mozg_pagseguro_api_cc_cc_number");
                textbox.focus();

                var blockPayment = document.getElementById("payment_form_mozg_pagseguro_api_cc");
                blockPayment.scrollIntoView();

                //
            },
            complete: function(response) {
                //tratamento comum para todas chamadas
                console.log('Mozg.Pagseguro.createCardToken.complete');
                console.log(response);

                if (typeof IWD !== 'undefined') {
                    //IWD.OPC.Checkout.hideLoader();
                }

            }
        }

        if (typeof brandName !== 'undefined') {
            param.brand = brandName;
        }

        console.log(param);

        PagSeguroDirectPayment.createCardToken(param);
    },

    updatePaymentHashes: function(){

        debugData.push(arguments.callee.name);

        console.log('Mozg.Pagseguro.updatePaymentHashes');
        console.log(arguments);

        var getCurrentMethod = Mozg.Pagseguro.getCurrentMethod();

        var variableObject = Mozg.Pagseguro.variableObject;

        console.log(variableObject);

        var config = variableObject.config;
        var sender_hash = variableObject.getSenderHash;

        if(getCurrentMethod == 'mozg_pagseguro_api_cc'){
            var createCardToken = variableObject.createCardToken;
            var token = createCardToken.card.token;
            var getBrand = variableObject.getBrand;
            var brandName = getBrand.brand.name;

            Mozg.Pagseguro.setMessage('success', 'Token: ' + token);
        }

        var _sender_hash = sender_hash.substring(1, 10) + '...';

        //Mozg.Pagseguro.setMessage('success', 'Hash: ' + _sender_hash);
        Mozg.Pagseguro.setMessage('success', 'Finalize o pedido');

        if(getCurrentMethod == 'mozg_pagseguro_api_cc'){
            $('mozg_pagseguro_api_cc_credit_card_token').value = token;
            $('mozg_pagseguro_api_cc_sender_hash').value = sender_hash;
        }
        if(getCurrentMethod == 'mozg_pagseguro_api_boleto'){
            $('mozg_pagseguro_api_boleto_sender_hash').value = sender_hash;
        }
        if(getCurrentMethod == 'mozg_pagseguro_api_eletronictransfer'){
            $('mozg_pagseguro_api_eletronictransfer_sender_hash').value = sender_hash;
        }

        Mozg.Pagseguro.varienForm();

        /*var _url = config.base_url + 'mozg_pagseguro/process/updatePaymentHashes/';

        var _paymentHashes = {
            "payment[sender_hash]": sender_hash
        };
        if(getCurrentMethod == 'mozg_pagseguro_api_cc'){
            var _paymentHashes = {
                "payment[sender_hash]": sender_hash,
                "payment[credit_card_token]": token,
                "payment[cc_type]": brandName
            };
        }

        new Ajax.Request(_url, {
            method: 'post',
            parameters: _paymentHashes,
            onSuccess: function(response){
                console.log('Mozg.Pagseguro.updatePaymentHashes.onSuccess');
                console.log(response);
            },
            onFailure: function(response){
                console.log('Mozg.Pagseguro.updatePaymentHashes.Failure');
                console.log(response);

                var message = 'Pagseguro.updatePaymentHashes.onFailure';

                Mozg.Pagseguro.setMessage('error', message);
            }
        });*/
    },

    varienForm: function(){

        debugData.push(arguments.callee.name);

        console.log('Mozg.Pagseguro.varienForm');
        console.log(arguments);

        var objectForm = new VarienForm('co-payment-form', true);
        var elementForm = objectForm.form;
        var formId = elementForm.id;
        var validator = new Validation(formId);
        var failedElements = Form.getElements(elementForm).findAll(function(elm){
            //console.log(arguments);
            return $(elm).hasClassName('validation-failed')
        });

        console.log(objectForm);
        console.log(elementForm);
        console.log(formId);
        console.log(validator);
        console.log(failedElements);
        console.log(validator.validate());

        // Check the valid input
        if (!validator.validate()) {
            return;
        }

    },

    eventFieldsCc: function(){

        debugData.push(arguments.callee.name);

        console.log('Mozg.Pagseguro.eventFieldsCc');
        console.log(arguments);

        /*console.log(arguments[0][0].target);
        console.log(arguments[0][0].type);
        console.log(arguments[0][0].target.id);*/

        //

        var variableObject = Mozg.Pagseguro.variableObject;

        var messages = variableObject.messages;

        messages.forEach(function(item) {
            if($(item)){
                $(item).innerHTML = '';
            }
        });

        //

        console.log('Mozg.Pagseguro.eventFieldsCc.validateField');

        //

        Mozg.Pagseguro.isValidFormField();

        //

        var items = $([
            'mozg_pagseguro_api_cc_cc_number',
            'mozg_pagseguro_api_cc_cc_owner',
            'mozg_pagseguro_api_cc_cc_number',
            'mozg_pagseguro_api_cc_expiration',
            'mozg_pagseguro_api_cc_expiration_yr',
            'mozg_pagseguro_api_cc_cc_cid',
            'mozg_pagseguro_api_cc_social_security_number',
        ]);

        console.log(items);

        console.log(items.map(Validation.validate).all());

        // Check the valid input
        if (!items.map(Validation.validate).all()) {
            return;
        }

        //

        //Mozg.Pagseguro.varienForm();

        Mozg.Pagseguro.getDataCc();

        Mozg.Pagseguro.isValidForm();

        //

    },

    eventFieldsBoleto: function(){

        debugData.push(arguments.callee.name);

        console.log('Mozg.Pagseguro.eventFieldsBoleto');
        console.log(arguments);

        /*console.log(arguments[0][0].target);
        console.log(arguments[0][0].type);
        console.log(arguments[0][0].target.id);*/

        //

        var variableObject = Mozg.Pagseguro.variableObject;

        var messages = variableObject.messages;

        messages.forEach(function(item) {
            if($(item)){
                $(item).innerHTML = '';
            }
        });

        //

        console.log('Mozg.Pagseguro.eventFieldsBoleto.validateField');

        //

        Mozg.Pagseguro.isValidFormField();

        //

        var items = $([
            'mozg_pagseguro_api_boleto_social_security_number',
            'mozg_pagseguro_api_boleto_service_type',
            'mozg_pagseguro_api_boleto_firstname',
            'mozg_pagseguro_api_boleto_lastname',
        ]);

        console.log(items);

        // Check the valid input
        if (!items.map(Validation.validate).all()) {
            return;
        }

        //

        var objectForm = new VarienForm('co-payment-form', true);
        var elementForm = objectForm.form;
        var formId = elementForm.id;
        var validator = new Validation(formId);
        var failedElements = Form.getElements(elementForm).findAll(function(elm){
            //console.log(arguments);
            return $(elm).hasClassName('validation-failed')
        });

        /*console.log(objectForm);
        console.log(elementForm);
        console.log(formId);
        console.log(validator);*/
        console.log(failedElements);

        if (validator.validate()){
            console.log('Validate true');
            Mozg.Pagseguro.isValidForm();
        }else{
            console.log('Validate false');
        }

    },

    eventFieldsTEF: function(){

        debugData.push(arguments.callee.name);

        console.log('Mozg.Pagseguro.eventFieldsTEF');
        console.log(arguments);

        /*console.log(arguments[0][0].target);
        console.log(arguments[0][0].type);
        console.log(arguments[0][0].target.id);*/

        //

        var variableObject = Mozg.Pagseguro.variableObject;

        var messages = variableObject.messages;

        messages.forEach(function(item) {
            if($(item)){
                $(item).innerHTML = '';
            }
        });

        //

        console.log('Mozg.Pagseguro.eventFieldsTEF.validateField');

        //

        Mozg.Pagseguro.isValidFormField();

        //

        var items = $([
            'mozg_pagseguro_api_eletronictransfer_social_security_number',
            'mozg_pagseguro_api_eletronictransfer_service_type',
            'mozg_pagseguro_api_eletronictransfer_firstname',
            'mozg_pagseguro_api_eletronictransfer_lastname',
        ]);

        console.log(items);

        // Check the valid input
        if (!items.map(Validation.validate).all()) {
            return;
        }

        //

        var objectForm = new VarienForm('co-payment-form', true);
        var elementForm = objectForm.form;
        var formId = elementForm.id;
        var validator = new Validation(formId);
        var failedElements = Form.getElements(elementForm).findAll(function(elm){
            //console.log(arguments);
            return $(elm).hasClassName('validation-failed')
        });

        /*console.log(objectForm);
        console.log(elementForm);
        console.log(formId);
        console.log(validator);*/
        console.log(failedElements);

        if (validator.validate()){
            console.log('Validate true');
            Mozg.Pagseguro.isValidForm();
        }else{
            console.log('Validate false');
        }

    },

    observerFieldsCc: function(){

        debugData.push(arguments.callee.name);

        console.log('Mozg.Pagseguro.observerFieldsCc');

        try {

            //

            var arr = [
                "mozg_pagseguro_api_cc_expiration",
                "mozg_pagseguro_api_cc_expiration_yr"
                ];

            var arr = jQuery.map( arr, function( n, i ) {
                //console.log(arguments);
                elem = document.getElementById(n);
                //elem.onblur = onblur_Event;
                elem.onchange = onchange_Event;
            });

            function onchange_Event()
            {
                console.log(arguments.callee.name);
                console.log(arguments);

                Mozg.Pagseguro.eventFieldsCc(arguments);
            }

            //

            var arr = [
                "mozg_pagseguro_api_cc_cc_number",
                "mozg_pagseguro_api_cc_cc_cid"
                ];

            var arr = jQuery.map( arr, function( n, i ) {
                //console.log(arguments);
                elem = document.getElementById(n);
                elem.onkeyup = onkeyup_Event;
            });

            function onkeyup_Event()
            {
                console.log(arguments.callee.name);
                console.log(arguments);

                Mozg.Pagseguro.eventFieldsCc(arguments);
            }

            //

        }catch(e){
            console.error('Erro em observerFieldsCc: ' + e.message);
        }

    },

    observerFieldsBoleto: function(){

        debugData.push(arguments.callee.name);

        console.log('Mozg.Pagseguro.observerFieldsBoleto');

        try {

            //

            var arr = [
                "mozg_pagseguro_api_boleto_service_type"
                ];

            var arr = jQuery.map( arr, function( n, i ) {
                //console.log(arguments);
                elem = document.getElementById(n);
                elem.onchange = onchange_Event;
            });

            function onchange_Event()
            {
                console.log(arguments.callee.name);
                console.log(arguments);

                Mozg.Pagseguro.eventFieldsBoleto(arguments);
            }

            //

            var arr = [
                "mozg_pagseguro_api_boleto_social_security_number",
                "mozg_pagseguro_api_boleto_firstname",
                "mozg_pagseguro_api_boleto_lastname"
                ];

            var arr = jQuery.map( arr, function( n, i ) {
                //console.log(arguments);
                elem = document.getElementById(n);
                elem.onkeyup = onkeyup_Event;
            });

            function onkeyup_Event()
            {
                console.log(arguments.callee.name);
                console.log(arguments);

                Mozg.Pagseguro.eventFieldsBoleto(arguments);
            }

            //

        }catch(e){
            console.error('Erro em observerFieldsBoleto: ' + e.message);
        }

    },

    observerFieldsTEF: function(){

        debugData.push(arguments.callee.name);

        console.log('Mozg.Pagseguro.observerFieldsTEF');

        try {

            //

            var arr = [
                "mozg_pagseguro_api_eletronictransfer_service_type"
                ];

            var arr = jQuery.map( arr, function( n, i ) {
                //console.log(arguments);
                elem = document.getElementById(n);
                elem.onchange = onchange_Event;
            });

            function onchange_Event()
            {
                console.log(arguments.callee.name);
                console.log(arguments);

                Mozg.Pagseguro.eventFieldsTEF(arguments);
            }

            //

            var arr = [
                "mozg_pagseguro_api_eletronictransfer_social_security_number",
                "mozg_pagseguro_api_eletronictransfer_firstname",
                "mozg_pagseguro_api_eletronictransfer_lastname"
                ];

            var arr = jQuery.map( arr, function( n, i ) {
                //console.log(arguments);
                elem = document.getElementById(n);
                elem.onkeyup = onkeyup_Event;
            });

            function onkeyup_Event()
            {
                console.log(arguments.callee.name);
                console.log(arguments);

                Mozg.Pagseguro.eventFieldsTEF(arguments);
            }

            //

        }catch(e){
            console.error('Erro em observerFieldsTEF: ' + e.message);
        }

    },

    //

};

//
