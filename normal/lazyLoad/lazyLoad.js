window.addEventListener('scroll', function() {
	throttle(initLoad);
})


//节流函数
function throttle(func, threshold) {
	if(func.tid) 
		clearTimeout(func.tid);

	func.tid = setTimeout(function() {
		func();
	}, threshold || 200); 
}

//判断加入待加载队列的逻辑
function initLoad() {
	var img_list = document.getElementsByTagName('img');
	var load_list = [], len = img_list.length;
	var winHeight = window.innerHeight,//屏幕高度,
		imgHeight;//元素距离屏幕顶部高度;

	for (var i = 0; i < len; i++) {
		var imgHeight = img_list[i].getBoundingClientRect().top;

		if (imgHeight < winHeight)
			load_list.push(img_list[i]);
	}

	setSrc(load_list);
}


//抓data-scr塞入img的src属性以加载图片
function setSrc(list) {
	[].forEach.apply(list, [function(item) {
		src = item.getAttribute("data-src");
		item.setAttribute("src", src);
	}])
}