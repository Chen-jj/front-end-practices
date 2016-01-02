/*
  1.直接循环添加
  2.先添加到div里再把div加入到dom
  3.先添加到document fragment里再把fragment加入到dom
  2 < （1 约等于 3）
 **/
function test1() {
	var s1 = document.getElementById("s1");
	var i = 0,
	    ele = null
	    text_node = null;
	for (i = 0; i < 100000;) {
		ele = document.createElement("P");
		text_node = document.createTextNode("round:" + ++i);
		ele.appendChild(text_node);
		s1.appendChild(ele);
	}
}

function test2() {
	var s2 = document.getElementById("s2");
	var i = 0,
	    ele = null,
	    div = document.createElement("div"),
	    text_node = null;
	for (i = 0; i < 100000;) {
		ele = document.createElement("P");
		text_node = document.createTextNode("round:" + ++i);
		ele.appendChild(text_node);
		div.appendChild(ele);
	}
	s2.appendChild(div);
}

function test3() {
	var s3 = document.getElementById("s3");
	var i = 0,
	    fragment = document.createDocumentFragment(),
	    ele = null;
	for (i = 0; i < 100000;) {
		ele = document.createElement("P");
		text_node = document.createTextNode("round:" + ++i);
		ele.appendChild(text_node);
		fragment.appendChild(ele);
	}
	s3.appendChild(fragment);
}