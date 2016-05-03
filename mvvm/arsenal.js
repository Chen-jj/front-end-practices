(function(DOC) {
	var Arsenal = {},
		PREFIX = "ar-",
		ROOT = DOC.documentElement;
		VMODELS = {},
		EXPOSE = new Date() - 0,//随机数
		REGISTRY = {};//将依赖暴露于此对象上方便进行依赖收集

	/************************************/
	/*           构建viewmodel           */
	/************************************/

	/**
	 * [define description]
	 * 定义viewmodel的入口
	 */
	Arsenal.define = function(name, fn) {
		var scope = {},
			vmodel;

		fn(scope);//收集依赖

		vmodel = modelFactory(scope);//制作viewmodel

		vmodel.$id = name;

		console.log(vmodel);
	};

	/**
	 * [modelFactory description]
	 * 制作viewModel
	 */
	function modelFactory(scope) {
		var json = {},
			vmodel = {},
			normalProps = {},
			accessors = {},
			name;

		for (name in scope) {
			json[name] = scope[name];//保存原始值

			if (typeof scope[name] === "function") {
				//函数不处理
				normalProps[name] = scope[name];
			} else {
				//暂时只实现基本数据类型
				accessors[name] = makeAccessor(name);
			}

		}

		Object.defineProperties(vmodel, makeDescription(accessors));

		for (name in normalProps)
			vmodel[name] = normalProps[name];

		vmodel.$json = json;

		return vmodel;
	}

	/**
	 * [makeAccessor description]
	 * 制作监控属性的存取器
	 */
	function makeAccessor(name) {
		function accessor(val) {
			var oldValue = this.$json[name];

			if (val) {
				//set
				if (oldValue !== val) {
					this.$json[name] = val;
					notiflySubscribers(accessor.subscribers);//通知监察队列
				}
			} else {
				//get
				collectSubscribers(accessor.subscribers);
				return oldValue;
			}
		}

		accessor.subscribers = [];
		return accessor;
	}

	/**
	 * [makeDescription description]
	 * 分解accessor构建属性描述符
	 */
	function makeDescription(accessor) {
		var i,
			desc = {};
		for (i in accessor) {
			desc[i] = {
				set: accessor[i],
				get: accessor[i],
				enumerable: true
			}
		}
		return desc;
	}

	/**
	 * [collectSubscriber description]
	 * 收集依赖
	 */
	function collectSubscribers(list) {
		if (REGISTRY[EXPOSE]) {
			list && ensure(list, REGISTRY[EXPOSE]);//若此依赖未收集，收集它
		}
	}

	function ensure(list, item) {
		if (list.indexOf(item) < 0)
			list.push(item);
	}

	function notiflySubscribers(list) {
		var i, data;

		for (i = 0; data = list[i++];) {
			data.
		}
	}
	/************************************/
	/*             模版扫描              */
	/************************************/

	Arsenal.scan = function(elem, vmodels) {
		elem = elem || ROOT;
		vmodels = vmodels || [];

		scanTag(elem, vmodels);
	};

	function scanTag(elem, vmodels) {
		//扫描是否存在ar-controller
		var ctrl = elem.getAttribute(PREFIX + "controller");

		if (ctrl) {
			var vmodel = VMODELS[ctrl];

			if (!vmodel)
				return;

			vmodels.unshift(vmodel);
			elem.removeAttribute(PREFIX + "controller")
		}

		//扫描属性节点
		scanAttrs(elem, vmodels);

		//扫描子节点
		scanNodes(elem, vmodels);

	}

	function scanAttrs(elem, vmodels) {
		var i,
			attr;
			name,
			value,
			type,
			args,
			bindings = [];

		for (i = 0; attr = elem.attributes[i++];) {
			if (attr.specified) {
				name = attr.name;
				if (name.indexOf(PREFIX) < 0 )
					continue;

				//若attr是框架指定属性
				type = name.replace(PREFIX, "");
				if (type.indexOf("-") > 0) {
					args = type.split("-");
					type = args.shift();
				}

				if (typeof bindingHandlers[type] === "function") {
					bindings.push({
						type: type,
						args: args,
						value: attr.value,
						elem: elem,
						node: attr
					})
				}
			}
		}
		if (bindings.length)
			executeBindings(bingings, vmodels);
	}

	function scanNodes(parent, vmodels) {
		var nodes = [].slice.call(parent.childNodes);//nodeList对象，类似数组，但没有数组对象的一些基本方法

		for (var i in nodes) {
			var node = nodes[i];
			if (node.type ==)
		}
	}

	function scanTexts(elem, vmodels) {

	}

	function executeBindings(bingings, vmodels) {
		var i, data, flag;

		for(i in bingings) {
			data = bingings[i];
			flag = bindingHandlers[data.type](data, vmodels);
			if (flag)
				data.elem.removeAttribute(PREFIX + data.node.name);
		}
	}

	function parseExprProxy(data, vmodels) {
		parseExpr(data);

		//若存在求值函数
		if (data.evaluate) {
			//执行最终的绑定处理
			data.handler = bindingExecutors[data.type];
			registerSubscriber(data, vmodels);
		}
	}

	/**
	 * [parseExpr description]
	 * 生成求值函数
	 */
	function parseExpr(data) {
		var val = data.value;
		var arg = "vm" + EXPOSE;
		var body = "var " + val + " = vm" + EXPOSE + "." + val + ";\n";
		body += "return " + val;

		data.evaluate = new Function(arg, body) {};
		console.log(data.evaluate.toString());
	}

	function registerSubscriber(data, vmodels) {
		REGISTRY[EXPOSE] = data;
		var fn = data.evaluate;
		fn && data.handler(fn(vmodels.shift()), data.elem, data);
		delete REGISTRY[EXPOSE];
	}

	bindingHandlers = {
		css: function(data, vmodels) {
			parseExprProxy(data, vmodels);
		},
		click: function(data, vmodels) {

		},
		text: function() {

		}
	}

	bindingExecutors = {
		css: function(value, elem, data) {
			$(elem).css(type, value);
		},
		click: function(value, elem, data) {
			callback = function(e) {
				value.call(this, e);
			}
			elem.addEventListener("click", callback, false);
		},
		text: function() {

		}
	}










	this.Arsenal = Arsenal;
})(DOCument)