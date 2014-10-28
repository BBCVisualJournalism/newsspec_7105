define([
    'jquery',
    'lib/news_special/iframemanager__frame',
    'lib/news_special/imager',
    'istats',
    'pubsub'
], function ($, iframemanager__frame, Imager, istats) {

    // responsive iframe
    iframemanager__frame.init();

    // responsive images
    var imager = new Imager({
        availableWidths: [303, 394, 399, 498],
        regex: /(\/news\/.*img\/)\d+(\/.*)$/i
    });
    $.on('resize_images', function () {
        imager.resize_images();
    });
    $.on('init_images', function () {
        imager.change_divs_to_imgs();
    });

    // istats
    istats.init();
    $.on('istats', function (actionType, actionName, newLabels) {
        istats.log(actionType, actionName, newLabels);
    });

    return {
        $: $,
        pubsub: $,
        setStaticIframeHeight: function (newStaticHeight) {
            iframemanager__frame.setStaticHeight(newStaticHeight);
        },
        hostPageSetup: function (callback) {
            iframemanager__frame.setHostPageInitialization(callback);
        }
    };

});