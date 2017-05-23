


/**
 * jquery.accordion.js 1.0
 * http://jquerywidget.com
 */
;
(function(factory) {
    if (typeof define === "function" && (define.amd || define.cmd) && !jQuery) {
        // AMD或CMD
        define(["jquery"], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function(root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        //Browser globals
        factory(jQuery);
    }
}(function($) {

    $.fn.loadIofo = function(parameter, getApi) {
        if (typeof parameter == 'function') { //重载
            getApi = parameter;
            parameter = {};
        } else {
            parameter = parameter || {};
            getApi = getApi || function() {};
        }
        var defaults = {
            triggerCls: "trigger", //主列表的class值
            afterEvent: function() { //切换后执行;传入一个对象,包含：target当前导航项对象,tabs导航列表对象,panels内容列表对象,index当前导航项索引,event事件对象;
            }
        };
        var options = $.extend({}, defaults, parameter);
        return this.each(function() {
            //对象定义
            var $this = $(this);
            $.ajax({
                url: './data/data.json',
                type: 'GET',
                crossDomain: true,
                dataType: 'json',
                jsonpCallback: 'jsonp_location',
                success: function(data) {
                    console.log(data)
                }
            });
        });
    };
}));