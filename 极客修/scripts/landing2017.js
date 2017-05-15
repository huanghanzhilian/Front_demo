//轮播
function focusFun(obj, jdpic, jdmenu) {
	//插入图片
	$(jdpic).find("ul").append('<li><img src="http://rs.jikexiu.com/resources/Nimages/landing/cdb.jpg"/></li><li class="animated"><img src="http://rs.jikexiu.com/resources/Nimages/landing/focus1.jpg"/></li><!-- <li class="animated"><img src="http://rs.jikexiu.com/resources/Nimages/landing/focus2.jpg"/></li> --><li class="animated"><img src="http://rs.jikexiu.com/resources/Nimages/landing/focus3.jpg"/></li><li class="animated"><a id="gionee"><img src="http://rs.jikexiu.com/resources/Nimages/landing/focus4.jpg"/></a></li>');
	var len = $(jdpic).find("li").length;//获取图片张数
	var index = 1; //$(obj).find(".jdpic li").index(this);
	var time;

	for (var i = 1; i <= len; i++) {
		$(jdmenu).find("ul").append("<li></li>");
		$(jdmenu).find("ul").find("li").eq(0).addClass("active")
	}
	show(0);

	//鼠标经过圆点index等于他的索引并运行show()
	$(jdmenu).find("li").hover(function() {
		index = $(this).index();
		show(index);
	});

	//鼠标悬浮在图片时候停止定时 离开开始计时器
	$(obj).find(jdpic).hover(function() {
		clearInterval(time);
	}, function() {
		time = setInterval(function() {
			show(index);
			index++;
			if (index == len) {
				index = 0;
			}
		}, 5000);
	}).trigger("mouseleave");


	function show(index) {
		$(jdmenu).find("li").eq(index).addClass("active").siblings().removeClass("active");
		$(jdpic).find("li").eq(index).stop().animate({
			opacity: '1'
		}, 1000).siblings().stop().animate({
			opacity: '0'
		}, 1000);
		$(jdpic).find("li").eq(index).css("z-index", "10").siblings().css("z-index", "-1");
	}

	/*var orderSource = getQueryString("orderSource");
	if (null == orderSource) orderSource = '0';
	$("#gionee").attr("href", "http://www.jikexiu.com/gionee/index?brandId=20&orderSource=" + orderSource);

	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	}*/
}

//下单流程查看
$(".processBox").find(".selectP span").unbind().bind("click", function(even) {
	$(this).siblings("ul").toggle(0, function() {
		$(this).find("li").each(function(i) {
			$(this).unbind().bind("click", function() {
				var _txt = $(this).text();
				$(".processBox").find(".selectP span").text(_txt);
				$(this).closest("ul").hide();
				$(".process_pic").find("li").eq(i).show().siblings("li").hide();
			});
		});
	});
	even.stopPropagation();
});



$(function(){
	focusFun("#focus",".jdpic",".jdmenu")
})
