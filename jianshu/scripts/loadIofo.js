
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
                url: 'http://www.huanghanlian.com/Front_demo/jianshu/data/data.json',
                type: 'GET',
                crossDomain: true,
                dataType: 'json',
                jsonpCallback: 'jsonp_location',
                success: function(data) {
                    var state=true;
                    var updateData = function(){
                        if(state){
                            var Html='<div class="top-title">热门文章</div><ul>';
                            for (var i = 0; i < data.length; i++) {
                                if(data[i].list_image_url){
                                    Html+='<li class="have-img">\
                                        <a class="wrap-img" href="http://www.jianshu.com/p/'+data[i].slug+'">\
                                            <img src="'+data[i].list_image_url+'">\
                                        </a>\
                                        <div class="content">\
                                            <a href="http://www.jianshu.com/p/'+data[i].slug+'">\
                                                <div class="author">\
                                                    <a class="avatar" href="http://www.jianshu.com/p/'+data[i].slug+'">\
                                                        <img src="'+data[i].user.avatar+'">\
                                                    </a>\
                                                    <div class="name">\
                                                        <a href="http://www.jianshu.com/p/'+data[i].slug+'">'+data[i].user.nickname+'</a>\
                                                    </div>\
                                                    <span class="time">32 分钟前</span>\
                                                </div>\
                                                <div class="title">'+data[i].title+'</div>\
                                                <div class="meta">\
                                                    <i class="iconfont ic-list-read"></i>\
                                                    <span>'+data[i].views_count+'</span>\
                                                    <i class="iconfont ic-list-comments"></i>\
                                                    <span>'+data[i].public_comments_count+'</span>\
                                                    <i class="iconfont ic-list-like"></i>\
                                                    <span>'+data[i].likes_count+'</span>\
                                                </div>\
                                            </a>\
                                        </div>\
                                    </li>';
                                }else{
                                    Html+='<li>\
                                        <div class="content">\
                                            <a href="http://www.jianshu.com/p/'+data[i].slug+'">\
                                                <div class="author">\
                                                    <a class="avatar" href="http://www.jianshu.com/p/'+data[i].slug+'">\
                                                        <img src="'+data[i].user.avatar+'">\
                                                    </a>\
                                                    <div class="name">\
                                                        <a href="http://www.jianshu.com/p/'+data[i].slug+'">'+data[i].user.nickname+'</a>\
                                                    </div>\
                                                    <span class="time">32 分钟前</span>\
                                                </div>\
                                                <div class="title">'+data[i].title+'</div>\
                                                <div class="meta">\
                                                    <i class="iconfont ic-list-read"></i>\
                                                    <span>'+data[i].views_count+'</span>\
                                                    <i class="iconfont ic-list-comments"></i>\
                                                    <span>'+data[i].public_comments_count+'</span>\
                                                    <i class="iconfont ic-list-like"></i>\
                                                    <span>'+data[i].likes_count+'</span>\
                                                </div>\
                                            </a>\
                                        </div>\
                                    </li>';
                                }
                            }
                            Html+='</ul>';
                            $this.html(Html);
                        }
                    }

                    //初始化
                    updateData();
                    //format.province();
                }
            });
        });
    };
}));