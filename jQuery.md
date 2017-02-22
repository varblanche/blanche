### Git工作流程

* 创建本地仓库：git init 或者 git clone remoteUrl
* 在工作目录上进行项目开发（新功能、协同、Bug）
* 根据分支策略，不要在master分支开发，而是要根据开发的功能来使用分支进行开发。
	eg：协同开发：此时要创建一个协同分支，在保存完本地版本后，要推送到远程仓库时，
	首先 拉取最新版本代码，如果出现冲突就 手动合并后在重新生成本地版本，在推送。
	不需要协同的，就直接保存成本地版本后直接推送即可。
* 如果需要版本的回退，就使用git reset --hard sha值，恢复到该版本。
* 如果要撤销文件的修改，就使用git checkout -- filename
* 在提交之前想查看 工作目录 文件和 版本（暂存区）文件 的差异，
	就使用 git difftool filename
* 删除不需要的分支，git branch -d branchName
	注意远程分支，不要随意删除。

### select方法

* select(selector[, context]);
* 根据选择器selector，在context指定的范围下获取相应dom元素

```javascript
	function select(selector, context) {
		// 存储所有获取到的dom元素
		var ret = [];
		// 判断是否指定了context
		if(context){
			// context 是 dom对象
			// 使用context调用querySelectorAll 获取dom元素
			// 将其转换成真数组返回
			if(context.nodeType === 1){
				return Array.prototype.slice.call(context.querySelectorAll(selector));
			}
			// context 是 dom数组或伪数组
			// 遍历context，使用当前遍历到的元素调用querySelectorAll 获取dom元素
			// 得到结果doms，要将其所有dom元素 追加到 ret数组内，
			else if(context instanceof Array || 
				(typeof context === 'object' && 'length' in context)){
				for(var i = 0, l = context.length; i < l; i++){
					var doms = context[i].querySelectorAll(selector);
					for(var j = 0, k = doms.length; j < k; j++){
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
	}
```

### each方法

* each(arr, callback);
* 遍历数组arr，执行callback回调函数 对遍历到每一个元素进行相关操作。
* callback内部this 指向当前遍历到的元素
* 实现结束循环操作

```javascript
function each(arr, callback) {
	var i = 0,
			l;

	for(l = arr.length; i < l; i++){
		// 如果函数callback执行后的返回值为false，结束循环
		// 使用call来调用callback，是为了改变this ——> 当前遍历到的元素
		//  arr[i], i 是给callback执行时所传入的实参。
		if(callback.call(arr[i], arr[i], i) === false){
			break;
		}
	} 
}
```

## 课程笔记

### map方法封装

1. 语法：map(arr, callback)
	* arr:      遍历的数组对象
	* callback：对数组元素进行的操作，要指定返回值，作为新数组元素。

2. 功能：遍历数组arr，对每一个元素进行操作，并且根据回调函数的返回值，得到新数组对象。

3. 实现思路
	* 定义value变量，存储回调函数的返回值
	* 遍历数组arr元素，执行callback函数，并且为其传入实参 arr[i], i
	* 用value接收上述函数的返回值
	* 如果value的值不为 null undefined值，就追加到 ret新数组中
	* 返回新数组ret。

```js
	function map(arr, callback, args) {
	// 临时存储 callback执行后的返回值
	var value;
	// 定义新数组
	var ret = [];
	var i = 0,
			l = arr.length;

	for(; i < l; i++){
		// 获取callback执行后的结果
		value = callback(arr[i], i, args);
		// 判断是否 为null 或者 undefined值
		// 如果不为上述值，就将其追加到ret数组内。
		if(value != null){
			ret.push(value);
		}
	}
	// 返回新数组对象
	// 同时将多维数组转换成一维数组
	return Array.prototype.concat.apply([], ret);
	}

```
### 判断数组与伪数组的方法

0. 对象类型的确定
	已该对象的构造函数的小写方式来描述其类型

1. 判断数组类型 

稀疏数组 --不一定包含所有的索引值，但是如果稀疏数组长度为n，
那么该数组必须具有n-1的索引值。

var ar = [];
ar[4] = 6;

Object.prototype.toString.call(数组).slice(8, -1).toLowerCase();

instanceof

2. 判断伪数组类型
	* 排除window对象以及函数对象，他们也有length属性，但是含义和数组的length属性不同。
	数组和伪数组对象的length含义为：元素的个数；
	window对象的length含义为：页面中iframe标签的个数
	函数对象的length含义为：定义形参的个数
	* 满足以下至少一个条件就为 伪数组对象。
		* 该对象length属性值为 0
		* 如果length属性值 为 number类型 并且 值 > 0 并且 对象至少含有索引 length - 1。
		eg: {length: "1"} -NO, {length: 4} -NO, {length: 5, 4: "name"} -Yes
			{length: 6, 4: "name"} -NO
			{length: 2, 1: "name", 0: 'age'} -Yes
			{length: 2, 1: "name", 3: 'age'} -Yes

### 获取内置对象的类型

1. 语法：getType(obj)

2. 功能：获取传入参数的类型，返回值 为string 表示参数的类型

3. 实现思路
	* 如果 obj 为 null，返回值为字符串 'null'
	* 如果 obj 为 undefined，返回值 为 字符串 'undefined'
  * 如果 obj 为 基本数据类型，返回值为 typeof obj
  * 如果 obj 为 复合数据类型（内置对象），使用Object.prototype.toString来获取该对象的
  构造函数名字，已其小写形式作为 该函数的返回值。

### 判断是否为伪数组对象

1. 语法：isLikeArray(obj)

2. 功能：判断obj是否为 伪数组。如果是，返回true，否则返回false。

3. 实现思路
	* 排除window对象和函数对象以及真数组, 返回值为false
	* 获取length属性值，
	* 如果为 0 直接返回true
	* 如果 > 0 并且具有 length - 1 索引，此时返回true；否则返回false

```js
function getType(obj) {		
			if(obj == null){
				return obj + '';
			}
			return typeof obj !== 'object' ? 
				typeof obj : 
				Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
		}

function isLikeArray(obj) {
	var type, length;
	// 过滤null 和 undefined值
	if(obj == null){
		return false;
	}
	type = getType(obj); // 获取obj类型
	// 如果obj不是对象类型，返回值为false；
	// 如果 obj 是对象，但是没有length属性，返回值为false
	// 如果 obj 是对象并且 具有length属性，返回值 obj.length
	length = typeof obj === 'object' && 'length' in obj && obj.length;

	// 排除window 函数 真数组
	if(type === 'array' || type === 'function' || type === 'window'){
		return false;
	}
	return length === 0 || // 如果length 值为 0 就返回true
		// 或者 length 类型为 number 并且值 > 0 并且 具有 length - 1索引，返回true
		typeof length === 'number' && length > 0 && (length - 1) in obj;
}

```

### jq对象本质

1. 通过$函数的返回值来获取jq对象

2. 指定$函数的参数，来获取dom元素，是以伪数组对象的方式来存储获取到dom元素。
	最终将dom存储在jq对象。也就说，jq对象本质就是用来存储指定选择器获取到的dom元素的
	伪数组对象。

3. 本质就是伪数组对象，功能就是存储获取到的dom元素；
	 它的原型对象用来存储操作dom元素的方法

### 工厂函数的意义

1. 好处：在使用工厂模式来创建对象时，new 或 不 new 都能正确地得到相应的对象.

```js
// 在创建对象时，不直接使用构造函数或者直面量方式来创建
// 而是通过一个函数，来创建，那么只需要传入该对象的相关属性即可。
// 1: 基本工厂函数
function createPerson(name, age) {
	var obj = {};
	obj.name = name;
	obj.age = age;
	return obj;
}
// 2: 扩展写法
/*function Person(name, age) {
	this.name = name;
	this.age = age;
}

function createPerson(name, age) {
	return new Person(name, age);
}
*/
	
function createPerson(name, age) {
	return new createPerson.prototype.Person(name, age);
}

createPerson.prototype.Person = function (name, age) {
	this.name = name;
	this.age = age;
};
```