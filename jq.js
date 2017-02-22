(function(global) {
	var document = global.document,
		arr = [],
		slice = arr.slice,
		push = arr.push;


	var init,
		itcast = function(selector, context) {
			return new itcast.fn.init(selector, context);
		};

	itcast.fn = itcast.prototype = {
		constructor: itcast,
		length: 0, // 保持itcast对象 在任何条件下都是 伪数组对象
		splice: arr.splice,
		// push: arr.push,
		// slice: arr.slice,
		// concat: arr.concat,
		// sort: arr.sort,
		toArray: function() {
			return slice.call(this);
		},
		get: function(index) {
			// 如果 index 为null 或undefined值，就将所有元素以数组形式返回。
			if (index == null) {
				return slice.call(this);
			}
			// 根据索引值 获取对应的dom元素
			return this[index >= 0 ? index - 0 : index - 0 + this.length];
		},
		eq: function(index) {
			return itcast(this.get(index));
		},
		first: function() {
			return itcast(this.get(0));
		},
		last: function() {
			return itcast(this.get(-1));
		},
		each: function(callback) {
			return itcast.each(this, callback);
		},
		map: function(callback) {
			return itcast(itcast.map(this, function(elem, i) {
				return callback.call(elem, elem, i);
			}));
		}
	};

	init = itcast.fn.init = function(selector, context) {
		// 处理null undefined ''
		if (!selector) {
			return this;
		}
		// 处理字符串类型
		if (itcast.isString(selector)) {
			// html字符串
			if (itcast.isHTML(selector)) {
				// 创建dom
				// var doms = itcast.parseHTML(selector);
				// 以伪数组形成存储在this上
				push.apply(this, itcast.parseHTML(selector));
			} else { // 选择器
				// var doms = select(selector, context);
				push.apply(this, select(selector, context));
			}
		}
		// 处理Dom对象
		else if (itcast.isDOM(selector)) {
			// Array.prototype.push.call(this, selector);
			this[0] = selector;
			this.length = 1;
		}
		// 处理DOM数组或者伪数组对象
		else if (itcast.isArrayLike(selector)) {
			push.apply(this, selector);
		}
		// 处理函数
		else if (typeof selector === 'function') {
			// 首先判断dom树是否加载完毕，
			// 如果已加载完毕，就直接执行该函数
			if (itcast.isReady) {
				selector();
			} else { // 如果没有加载完毕，就将该函数注册到DOMContentLoaded这个事件上
				document.addEventListener('DOMContentLoaded', function() {
					itcast.isReady = true;
					selector();
				});
			}
		}
	};

	init.prototype = itcast.fn;
	// 提供可扩展的接口
	itcast.extend = itcast.fn.extend = function(source) {
		// 枚举 source对象上所有属性
		for (var k in source) {
			// 添加到调用者身上
			this[k] = source[k];
		}
	};
	// 工具类
	// 类型判断方法
	itcast.extend({
		isString: function(obj) {
			return typeof obj === 'string';
		},
		// 判断是否为html字符串
		isHTML: function(obj) {
			return (obj + '').charAt(0) === '<' && // 以 '<' 开头
				(obj + '').charAt((obj + '').length - 1) === '>' && // 以 '>' 结尾
				(obj + '').length >= 3; // 最小长度 为 3
		},
		// 判断是否为元素节点
		isDOM: function(obj) {
			return 'nodeType' in obj && obj.nodeType === 1;
		},
		// 判断是否为全局window对象
		isWindow: function(obj) {
			return !!obj && obj.window === obj;
		},
		// 判断是否为数组或伪数组对象
		isArrayLike: function(obj) {
			// 如果obj不为null或undefined，并且具有length属性，就获取其length值
			// 否则 length为 bool值。
			var length = !!obj && 'length' in obj && obj.length,
				type = itcast.type(obj); // 存储obj的类型

			// 过滤函数和window对象
			if (type === 'function' || itcast.isWindow(obj)) {
				return false;
			}

			return type === 'array' || length === 0 ||
				typeof length === 'number' && length > 0 && (length - 1) in obj;
		}
	});
	itcast.extend({
		isReady: false,
		each: function(obj, callback) {
			var i = 0,
				l = obj.length;

			for (; i < l; i++) {
				if (callback.call(obj[i], obj[i], i) === false) {
					break;
				}
			}
			// 返回遍历的对象
			return obj;
		},
		map: function(arr, callback, args) {
			// 临时存储 callback执行后的返回值
			var value;
			// 定义新数组
			var ret = [];
			var i = 0,
				l = arr.length;

			for (; i < l; i++) {
				// 获取callback执行后的结果
				value = callback(arr[i], i, args);
				// 判断是否 为null 或者 undefined值
				// 如果不为上述值，就将其追加到ret数组内。
				if (value != null) {
					ret.push(value);
				}
			}
			// 返回新数组对象
			// 同时将多维数组转换成一维数组
			return Array.prototype.concat.apply([], ret);
		},
		// 将html字符串 转化成 html元素
		parseHTML: function(html) {
			// 存储所有创建出来的元素节点
			var ret = [];
			// 动态创建一个div，使用其innerHML属性，来将html字符串转换成元素
			var div = document.createElement('div');
			div.innerHTML = html;
			// 遍历div所有子节点
			for (var i = 0, l = div.childNodes.length; i < l; i++) {
				// 如果类型为 元素节点，就是要创建的元素节点
				// 就追加到ret内。
				if (div.childNodes[i].nodeType === 1) {
					ret.push(div.childNodes[i]);
				}
			}
			// 返回结果
			return ret;
		},
		type: function(obj) {
			if (obj == null) {
				return obj + '';
			}
			return typeof obj === 'object' ?
				Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() :
				typeof obj;
		}
	});

	// DOM操作模块
	itcast.fn.extend({
		appendTo: function(target) {
			// 缓存this指向的对象
			var self = this,
					node, // 临时存储要被追加的源节点
					ret = []; // 存储所有被追加的节点
			// 统一类型
			target = itcast(target);

			// 遍历target
			target.each(function(telem, i) {
				// 遍历源节点
				self.each(function(selem) {
					// 如果i === 0，表示当前telem为第一个目标元素，不需要拷贝源节点selem
					// 否则要拷贝。
					// 将上面得到源节点，追加到目标元素上，telem
					node = i === 0 ? selem : selem.cloneNode(true);
					/*node = selem;
					if( i > 0){
						node = selem.cloneNode(true);
						// ret.push(node);
					}*/
					ret.push(node);
					telem.appendChild(node);
				});
			});
			// 实现链式编程
			// arr.push.apply(this, ret);
			// return this;
			return itcast(ret);
		},
		append: function(source) {
			// 如果source为普通字符串类型
			// 用该变量临时存储一下
			var text;
			// 是字符串类型，但不是html字符串
			// 就认为是普通字符串 'p'
			// 如果 source为普通字符串，就将其转换成文本节点，追加到目标DOM元素上
			if(itcast.isString(source) && !itcast.isHTML(source)){
				// 将source赋值给text保存起来
				text = source;
				// 将source赋值为 itcast对象（空）
				// 统一source类型， 为itcast对象
				source = itcast();
				// 把字符串转换文本节点并且 存储在 source上
				source[0] = document.createTextNode(text);
				// 同时设置其伪数组长度为1
				source.length = 1;
			} else {
				// 将其他source类型统一为itcast对象
				source = itcast(source);
			}
			// 使用已封装好的appendTo方法，将source上的元素追加到 this目标元素上
			source.appendTo(this);
			// 实现链式编程
			return this;
		},
		prependTo: function(target) {
			var firstChild, // 缓存目标元素的第一个子节点
					self = this,
					node,
					ret = [];
			// 统一target类型为itcast对象
			target = itcast(target);
			// 遍历target
			target.each(function(telem, i) {
				// 缓存目标元素的第一个子节点
				firstChild = telem.firstChild;
				// 遍历self上所有源节点
				self.each(function(selem) {
					node = i === 0 ? selem : selem.cloneNode(true);
					ret.push(node);
					// 在目标元素的第一子节点前 添加子节点
					telem.insertBefore(node, firstChild);
					// telem.insertBefore(node, telem.firstChild);
				});
			});
			// 实现链式编程
			return itcast(ret);
		},
		prepend: function(source) {
			// 如果source为普通字符串类型
			// 用该变量临时存储一下
			var text;
			// 是字符串类型，但不是html字符串
			// 就认为是普通字符串
			// 如果 source为普通字符串，就将其转换成文本节点，追加到目标DOM元素上
			if(itcast.isString(source) && !itcast.isHTML(source)){
				// 将source赋值给text保存起来
				text = source;
				// 将source赋值为 itcast对象（空）
				// 统一source类型， 为itcast对象
				source = itcast();
				// 把字符串转换文本节点并且 存储在 source上
				source[0] = document.createTextNode(text);
				// 同时设置其伪数组长度为1
				source.length = 1;
			} else {
				// 将其他source类型统一为itcast对象
				source = itcast(source);
			}
			// 使用已封装好的appendTo方法，将source上的元素追加到 this目标元素上
			source.prependTo(this);
			// 实现链式编程
			return this;
		},
		remove: function() {
			return this.each(function(elem) {
				// this 就是 当前遍历到的 元素
				// this === elem
				this.parentNode.removeChild(this);
			});
		},
		before: function(newNode) {
			var text;
			// 如果newNode不是 html字符串
			if(itcast.isString(newNode) && !itcast.isHTML(newNode)){
				// 临时存储文本节点值
				text = newNode;
				// 创建一个空itcast对象
				newNode = itcast();
				// 把创建的文本节点添加到 itcast对象上
				newNode[0] = document.createTextNode(text);
				// 指定length属性值为 1
				newNode.length = 1;
			} 
			// 如果为其他类型，就直接转换成 itcast对象
			else {	
				newNode = itcast(newNode);
			}

			// 遍历this
			this.each(function(elem, i) {
				// 遍历newNode
				newNode.each(function() {
					// 拿到elem的父节点，调用insertBefore方法
					// 在elem前添加this新节点
					elem.parentNode.insertBefore(i === 0 ? this : this.cloneNode(true), elem);
				});
			});
			// 实现链式编程
			return this;
		},
		after: function(newNode) {
			var text;
			var that = this;
			// var frag;
			// 不是html字符串
			if(itcast.isString(newNode) && !itcast.isHTML(newNode)){
				text = newNode;
				newNode = this.constructor();
				newNode[0] = document.createTextNode(text);
				newNode.length = 1;
			}
			// 其他类型
			else {
				newNode = this.constructor(newNode);
			}

			this.each(function(elem, i) {
				// 用倒序方式遍历newNode
				for(var j = newNode.length - 1; j >= 0; j--){
					that.constructor.insertAfter(i === 0 ? newNode[j] : newNode[j].cloneNode(true),
						elem);
				}
			});

			return this;
		},
		// after: function(newNode) {
		// 	var text;
		// 	var that = this;
		// 	var frag;
		// 	// 不是html字符串
		// 	if(itcast.isString(newNode) && !itcast.isHTML(newNode)){
		// 		text = newNode;
		// 		newNode = this.constructor();
		// 		newNode[0] = document.createTextNode(text);
		// 		newNode.length = 1;
		// 	}
		// 	// 其他类型
		// 	else {
		// 		newNode = this.constructor(newNode);
		// 	}

		// 	this.each(function(elem, i) {
		// 		// 每一次遍历都 新建一个文档片段
		// 		frag = document.createDocumentFragment();
		// 		// 把所有要添加的元素节点，统一存储在frag上
		// 		newNode.each(function() {
		// 			frag.appendChild(i === 0 ? this : this.cloneNode(true));
		// 		});
		// 		// 在一起添加到指定目标元素后
		// 		that.constructor.insertAfter(frag, elem);
		// 	});

		// 	return this;
		// }
		next: function() {
			// 存储所有兄弟元素
			var ret = [];
			// 遍历this
			this.each(function() {
				// 遍历当前dom元素下的所有兄弟节点
				for(var node = this.nextSibling; node; node = node.nextSibling){
					// 如果当前兄弟节点类型为 元素
					if(node.nodeType === 1){
						// 那么，就push到ret结果集
						ret.push(node);
						// 同时结束循环
						break;
					}
				}
			});
			// 将ret转换成itcast对象，返回结果
			return this.constructor(ret);
		},
		nextAll: function() {
			var ret = [];
			this.each(function(elem) {
				for(var node = elem.nextSibling; node; node = node.nextSibling){
					if(node.nodeType === 1){
						ret.push(node);
					}
				}
			});
			// 先ret去重后，在转换成itcast对象返回
			return this.constructor( this.constructor.unique(ret) );
		},
		prev: function() {
			// 存储所有兄弟元素
			var ret = [];
			// 遍历this
			this.each(function() {
				// 遍历当前dom元素下的所有兄弟节点
				for(var node = this.previousSibling; node; node = node.previousSibling){
					// 如果当前兄弟节点类型为 元素
					if(node.nodeType === 1){
						// 那么，就push到ret结果集
						ret.push(node);
						// 同时结束循环
						break;
					}
				}
			});
			// 将ret转换成itcast对象，返回结果
			return this.constructor(ret);
		},
		prevAll: function() {
			var ret = [];
			this.each(function(elem) {
				for(var node = elem.previousSibling; node; node = node.previousSibling){
					if(node.nodeType === 1){
						ret.push(node);
					}
				}
			});
			// 先ret去重后，在转换成itcast对象返回
			return this.constructor( this.constructor.unique(ret) );
		},
		parent: function() {
			// 存储所有获取到的父节点
			var ret = [];
			// 遍历this上dom元素
			this.each(function() {
				// 如果当前dom元素的父节点不为 null
				// 就push到ret中。
				this.parentNode && ret.push(this.parentNode);
			});
			// 最后将ret转换成itcast对象，返回
			return this.constructor( this.constructor.unique(ret) );
		},
		siblings: function() {
			// 存储所有兄弟元素
			var ret = [],
					node;
			// 遍历this上dom元素
			this.each(function() {
				// 遍历其父节点下所有的子节点
				for(node = this.parentNode.firstChild; node; node = node.nextSibling){
					// 如果当前节点类型 为 元素节点，并且不是 this自己本身
					if(node.nodeType === 1 && node !== this){
						// 那么就添加到ret中
						ret.push(node);
					}
				}
			});

			return this.constructor( this.constructor.unique(ret) );
		}
	});

	itcast.extend({
		insertAfter: function(newNode, node) {
			node.parentNode.insertBefore(newNode, node.nextSibling);
		},
		unique: function(arr) {
			// 存储去重后的数组元素	
			var ret = [];
			// 遍历原数组arr
			arr.forEach(function(v) {
				// 如果ret中不存在元素v
				if(ret.indexOf(v) === -1){
					// 将添加到ret结果数组中
					ret.push(v);
				}
			});
			// 最后将去重后的数组元素，返回
			return ret;
		}
	});

	// 事件模块
	itcast.fn.extend({
		/*click: function click(callback, data) {
			return this.each(function() {
				this.addEventListener('click', function(e) {
					callback.call( this , e, data)
				});
			});			
		},*/
		on: function(type, callback) {
			return this.each(function() {
				this.addEventListener(type, callback);
			});
		},
		off: function(type, callback) {
			return this.each(function() {
				this.removeEventListener(type, callback);
			});
		}
	});
	// 添加快捷事件绑定的方法
	// click dblclick mouseover mouseout mouseenter mouseleave mousemove
	// keypress keydown keyup 
	// focus blur 
	// 在数组元素中每一个都是 要添加到原型上的方法的名字，也是事件类型的名字。
	itcast.each(('click dblclick mouseover mouseout mouseenter mouseleave mousemove ' + 
		'keypress keydown keyup focus blur').split(' '), function(type) {
			itcast.fn[type] = function(callback) {
				return this.on(type, callback);
			};
		});

	// 样式模块
	function getCss(dom, name) {
		// return dom.style[name];
		return window.getComputedStyle(dom)[name];
	}

	function setCss(dom, name, value) {
		// 如果value值为 undefined，表示给dom同时设置多个样式
		if(value == undefined){
			// 枚举name对象属性，
			// 对象的属性是要给dom添加样式属性名，name对象属性对应值，就是样式属性值
			for(var k in name){
				dom.style[k] = name[k];
			}
		} else { // 否则，就设置dom元素的单个样式
			dom.style[name] = value;
		}
	}

	itcast.fn.extend({
		css: function(name, value) {
			// 只传入一个参数
			if(value == undefined){
				// 如果name类型为对象
				// 设置多样式
				if(typeof name === 'object'){
					// 遍历this上dom元素
					this.each(function() {
						// 给当前遍历到的dom元素设置多样式
						setCss(this, name);
					});
				} else { // 如果name不是对象，就获取第一个dom元素的指定样式值
					// 如果itcast对象没有任何dom元素。就返回空字符串
					return this.length > 0 ? getCss(this[0], name) : '';
				}
			} else { 
				// 遍历this上dom元素
				this.each(function() {
					// 给当前遍历到的dom元素设置单个样式
					setCss(this, name, value);
				});
			}
			// 如果css方法表示设置，此时要实现链式编程
			return this;
		},
		hasClass: function(className) {
			// 定义该方法的返回ret，默认为false
			var ret = false;
			// 遍历this上dom元素
			this.each(function() {
				// 如果当前dom元素具有指定的样式类
				// ret值 为 true，同时结束循环
				if(this.className.split(' ').indexOf(className) > -1){
					ret = true;
				 	return false;
				}
				/*if((' ' + this.className + ' ').indexOf(' ' + className + ' ') > -1 ){
					ret = true;
					return false;
				}*/
			});
			// 返回结果
			return ret;
		},
		addClass: function(className) {
			// 遍历this。并返回each方法的返回值，实现链式编程
			return this.each(function() {
				// 将this（当前遍历到的dom）转换成itcast对象
				// 调用hasClass方法，判断当前dom是否具有样式类
				// 如果没有，就添加上。
				if(!itcast(this).hasClass(className)){
					this.className = this.className + ' ' + className;
				}
			});
		},
		removeClass: function(className) {
			return this.each(function() {
				// 将当前dom元素的所有样式类 已数组形式存储
				var classNames = this.className.split(' ');
				// 查找要删除的样式类在数组的索引值
				var start  = classNames.indexOf(className);
				// 如果索引值大于 - 1，表示含有该样式类				
				if(start > -1){
					// 使用splice方法将其删除
					classNames.splice(start, 1);
					// 在将数组中元素以空格拼接成字符串,赋值给当前dom的className属性
					this.className = classNames.join(' ');
				}
				/*this.className = (' ' + this.className + ' ').replace(' ' + className + ' ',
					' ');*/
			});
		},
		toggleClass: function(className) {
			return this.each(function() {
				var $this = itcast(this);
				if( $this.hasClass(className) ){
					$this.removeClass(className);
				} else {
					$this.addClass(className);
				}
			});
		}
	});

	// 属性模块
	itcast.extend({
		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	});
	
	itcast.fn.extend({
		attr: function(name, value) {
			// 只传入1个参数
			if(value == undefined){
				// 如果name的类型为对象
				if(typeof name === 'object'){
					// 遍历this上dom元素
					this.each(function(elem) {
						// 枚举name上属性
						for(var k in name){
							// 给当前遍历到的dom元素设置属性节点值
							elem.setAttribute(k, name[k]);
						}
					});
				} else { // 如果name的类型为 字符串
					// 如果this不为空，就获取第1个dom元素的指定属性节点值
					// 否则就 返回 空字符串
					return this[0] ? this[0].getAttribute(name) : '';
				}
			} else { // 传入2个参数
				this.each(function() {
					this.setAttribute(name, value);
				});
			}

			return this;
		},
		prop: function(name, value) {
			// 临时存储正确的属性名字
			var propName;
			if(value == undefined){
				if(typeof name === 'object'){
					this.each(function() {
						for(var k in name){
							// 如果 k 是itcast.propFix对象的一个属性的话
							// 此时该改变 属性名称，该为 itcast.propFix[k]
							// 否则就不需要更改
							propName = itcast.propFix[k] || k;
							this[propName] = name[k];
						}
					});
				} else {
					propName = itcast.propFix[name] || name;
					return this[0] ? this[0][propName] : '';
				}
			} else {
				this.each(function() {
					propName = itcast.propFix[name] || name;
					this[propName] = value;
				});
			}

			return this;
		},
		html: function(html) {
			// 如果html值为 undefined，表示获取第一个dom元素 的innerHTML属性值
			// 如果itcast对象是空的，就返回空字符串
			if(html == undefined){
				return this.length > 0 ? this[0].innerHTML : '';
			} else {
				// 如果html值 不为undefined,表示给所有dom设置innerHTML属性值
				// 遍历this所有dom，并返回this实现链式编程
				return this.each(function() {
					// 拿到当前dom元素，设置其innerHTML属性值 为 指定html字符串
					this.innerHTML = html;
				});
			}
		},
		text: function(txt) {
			if(txt == undefined){
				return this[0] ? this[0].textContent : '';
			} else {
				return this.each(function() {
					this.textContent = txt;
				});
			}
		},
		val: function(value) {
			// var ret = '';
			if(value == undefined){
				// if(this[0] && this[0].nodeName = 'SELECT'){

				// } else if (this[0] && this[0].nodeName = 'input'){

				// }
				return this[0] ? this[0].value : '';
			} else {
				this.each(function() {
					this.value = value;
				});
			}
		}
	});

	itcast.each( [
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
		], function() {
			itcast.propFix[ this.toLowerCase() ] = this;
	} );

	// 选择器引擎
	// 通过select函数 来查询dom元素
	var select = function(selector, context) {
		// 存储所有获取到的dom元素
		var ret = [];
		// 判断是否指定了context
		if (context) {
			// context 是 dom对象
			// 使用context调用querySelectorAll 获取dom元素
			// 将其转换成真数组返回
			if (context.nodeType === 1) {
				return Array.prototype.slice.call(context.querySelectorAll(selector));
			}
			// context 是 dom数组或伪数组
			// 遍历context，使用当前遍历到的元素调用querySelectorAll 获取dom元素
			// 得到结果doms，要将其所有dom元素 追加到 ret数组内，
			else if (context instanceof Array ||
				(typeof context === 'object' && 'length' in context)) {
				for (var i = 0, l = context.length; i < l; i++) {
					var doms = context[i].querySelectorAll(selector);
					for (var j = 0, k = doms.length; j < k; j++) {
						ret.push(doms[j]);
					}
				}
			}
			// context 为 字符串即选择器
			else {
				return Array.prototype.slice.call(
					document.querySelectorAll(context + ' ' + selector));
			}
			return ret;
		}
		// 如果context没有传入实参
		// 通过document调用querySelectorAll来直接获取dom元素
		else {
			return Array.prototype.slice.call(document.querySelectorAll(selector));
		}
	};
	function formatData(data) {
		var ret = [];
		for(var k in data){
			ret.push( window.encodeURIComponent(k) + '=' +  window.encodeURIComponent(data[k]));
		}

		return ret.join('&');
	}
	itcast.extend({
		ajaxSettings: {
			url: '',
			data: null,
			type: 'get',
			dataType: 'json',
			success: null,
			fail: null,
			contentType: 'application/x-www-form-urlencoded',
			async: true,
			timeout: 0
		},
		ajax: function(option) {
			// 过滤无效参数
			if(!option || !option.url){
				return;
			}
			// 存储默认配置信息以及用户信息的整合
			var context = {};
			for(var k in itcast.ajaxSettings){
				context[k] = itcast.ajaxSettings[k];
			}
			for(var k in option){
				context[k] = option[k];
			}
			// 1：创建请求对象
			var xhr = window.XMLHttpRequest ? new window.XMLHttpRequest()
				: new window.ActiveXObject('XMLHTTP');

			var postData; // 存储post请求所要向服务器发送的数据

			// 2：格式化数据
			postData = formatData(option.data);
			
			// 3：与服务器建立连接
			if(context.type.toLowerCase() === 'get'){
				context.url += '?' + postData;
				postData = null;
			}
			xhr.open(context.type.toLowerCase(), context.url, context.async);
			if(context.type.toLowerCase() === 'post'){
				xhr.setRequestHeader('Content-Type', context.contentType);
			}

			// 4: 监听请求状态
			xhr.onreadystatechange = function() {
				var readyState = xhr.readyState,
						status = xhr.status;

				if(readyState === 4){
					if(status >= 200 && status < 300 || status === 304){
						context.success && context.success(
								context.dataType.toLowerCase() === 'json' ? 
								JSON.parse(xhr.responseText) :
								xhr.responseText
							);
					} else {
						context.fail && context.fail({"errcode": status, "message": "请求错误"});
					}
				}
			};

			// 5: 发送请求
			xhr.send(postData);
		},
		jsonp: function(option) {
			var context = {
				url: '',
				data: null,
				type: 'get',
				dataType: 'jsonp',
				success: null,
				fail: null,
				timeout: 0,
				callback: 'callback'
			};
			// 过滤无效参数
			if(!option || !option.url){
				return;
			}
			// 将用户的配置信息 合并到 context
			for(var k in option){
				context[k]  =option[k]
			}
			// 1: 创建请求对象
			var scriptElem = document.createElement('script'),
					headElem = document.getElementsByTagName('head')[0];

			headElem.appendChild(scriptElem);

			// 2: 创建全局回调函数
			var callbackName = ('jsonp_' + Math.random(new Date)).replace('.', '');
			window[callbackName] = function(data) {
				// 卸磨杀驴
				headElem.removeChild(scriptElem);
				delete window[callbackName];
				// 清除延时函数
				global.clearTimeout(scriptElem.timer);
				context.success && context.success(data);
			};
			// 3: 格式化数据
			context.data = context.data || {};
			context.data[ context.callback ] = callbackName;
			context.url += "?" + formatData(context.data);

			// 4: 监听请求状态
			if(context.timeout){
				scriptElem.timer = global.setTimeout(function() {
					// 卸磨杀驴
					headElem.removeChild(scriptElem);
					delete window[callbackName];
					context.fail && context.fail({"message": "请求超时"});
				}, context.timeout);
			}
			// 5: 发送请求
			scriptElem.src = context.url;
		}
	});
	

	global.$ = global.itcast = itcast;
	// 注册DOM树加载完毕的时间
	// 用来更新itcast.isReady值
	document.addEventListener('DOMContentLoaded', function() {
		itcast.isReady = true;
	});
}(window));


