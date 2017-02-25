### AngularJS 作用域

* scope 本意是作用域的意思
* 根作用域 ng-init="name='努尔哈赤'" 在 ng-app的标签上。
* 子作用域 ng-controller= "顺治"

### 过滤器
* 格式化展示数据 在“{{}}”中使用“|”来调用处理器，使用“:” 传递参数
* 允许我们连续调用过滤器。
 
* 内置过滤器：
* 时间过滤器
    - {{now|date:'yyyy-MM-dd hh：mm：ss'}}
        + y:表示年份，显示四位年份 yyyy;
        + M:表示月份，一般写两位 MM;
        + d:表示日，一般也会写两位 dd;
        + h:表示小时，一般也写两位 hh;
        + m:表示分钟，一般也写两位 mm；
        + s:表示秒，一般也写两位 ss

* currency 货币过滤器
    - {{price|currency:'￥':1}};
        + ￥ 表示那个国家货币
        + 1 表示小数后面保留几位

* 转换大小写
   - 转化成大写 {{info|uppercase}}
   - 转换小写 {{info|lowercase}}

* limitTo `截取字符串`、`截取数组`
    - 'my name is itcast'
    - 截取字符串前几位 {{info|limitTo:7}} my name
    - 截取字符串后几位 {{info|limitTo:-6}} itcast 

- ['html','css','js','php'];
    - 截取数组前几位 {{info|limitTo:7}}
    - 截取数组后几位 {{info|limitTo:-6}} 

* number 保留数值类型几位小数。
    - {{num|number:2}} 保留整数后两位小数

* orderBy 对数组进行排序。第二个参数控制正倒序
- ['html','css','js','php'];
    + {{list|orderBy}} ['css','html','js','php'];
    + {{list|orderBy:'':false}} 默认是正序。

* 转 json 格式 

* filter 从数组中哪一些内容
- ['html','css','js','php'];
    + {{list|filter:'h'}}; ['html','php'];

### 自定义过滤器

- App.controller() 定义控制器
- App.directive() 定义指令

- App.filter() 定义过滤器
    + 第一个参数 名称
    + 第二个参数 回调函数

 + App.filter('itcast',function(){
    // 必须要 return 函数
    return function(arg,arg2){
        return arg + '我不是黄蓉';
    }
})

+ App.controller('DemoCtrl',['$scope',function($scope){
        $scope.info = '靖哥哥';
    }])
    - 首字母大写 过滤器 
    App.filter('capitalize',function(){
        return function(input){
            return input[0].toUpperCase() + input.slice(1);
        }
    })

###　依赖注入
    - 所谓依赖注入，即通过注入方式解决依赖关系
### 行内注入
- 对应到AngularJS 依赖注入，可以分两个部分理解，通过一个数组来解决，数组中用来声明依赖关系，以参数的形式进行传递。

### 服务
* 服务是一个对象或者函数，对外提供特定的功能。

# 内置服务

### 内置服务-$location

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>AngularJS 服务</title>
</head>
<body ng-app="App">
	<div class="box" ng-controller="DemoCtrl">
		<dl>
			<dt>$location是一个内置服务，专门用来获取地址信息的</dt>
			<dd>协议：{{protocol}}</dd>
			<dd>主机：{{host}}</dd>
			<dd>路径：{{path}}</dd>
			<dd>端口：{{port}}</dd>
			<dd>查询参数：{{search}}</dd>
			<dd>哈希：{{hash}}</dd>
		</dl>
	</div>
	<script src="./libs/angular.min.js"></script>
	<script>
		var App = angular.module('App', []);
		// 开发自已的功能，需要用到angularJS提供好的模块
		// 模块可以供某些能
		// $location内置服务，用来获取地址信息
		App.controller('DemoCtrl', ['$scope', '$location', function ($scope, $location) {
			console.log($location);
			// http://localhost:8080/01day/4-code/index.php?name=itcast#demo
			// 协议、主机、端口、路径、查询参数、哈希

			$scope.protocol = $location.protocol(); // 获取协议
			$scope.host = $location.host(); // 获取
			// 从第一个#号后面算起
			$scope.path = $location.path(); // 获取
			$scope.port = $location.port();
			// 从第一个#号后算起，？后面的部分
			$scope.search = $location.search();
			// 第2个#才是AngularJS的哈希
			$scope.hash = $location.hash();

			// AngularJS $location对象对原生BOM location
			// 进行了封装，其主要封装是 哈希部分
			// 也就重新对啥希部分进行定义

		}]);

		for(var key in location) {
			console.log(key + '=>' + location[key]);
		}

	</script>
</body>
</html>
```

###　内置服务- &timeout / $interval

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>AngularJS 服务</title>
</head>
<body ng-app="App">
	<div ng-controller="DemoCtrl">
		<ul>
			<li>现在时间是:{{now|date:'yyyy-MM-dd hh:mm:ss'}}</li>
			<li><button ng-click="stop()">停止</button></li>
		</ul>
	</div>
	<script src="./libs/angular.min.js"></script>
	<script>
		var App = angular.module('App', []);
		App.controller('DemoCtrl', ['$scope', '$timeout', '$interval', function ($scope, $timeout, $interval) {

			// $timeout(function () {
			// 	console.log('3秒后执行了');
			// }, 3000);

			// var i = 0;
			// $interval(function () {
			// 	console.log(i++);
			// }, 1000);

			var timer = $interval(function () {
				$scope.now = new Date();
			}, 1000);
            // 清除定时器
			$scope.stop = function () {
				$interval.cancel(timer);
			}
		}]);
	</script>

</body>
</html>
```
### 内置服务-filter

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>AngularJS 服务</title>
</head>
<body ng-app="App">
	<ul ng-controller="DemoCtrl">
		<li>
			当前时间 {{now}}
		</li>
		<li>价格：{{price}}</li>
		<li>后几位: {{str}}</li>
		<li>数组前几个: {{list}}</li>
	</ul>
	<script src="./libs/angular.min.js"></script>
	<script>
	
		var App = angular.module('App', []);

		// $filter是过滤器
		// 前面所学的过滤器是用在视图上
		// 过滤器是用来格式化数据的，在其它用途也是有
		// 格式化数据的需求
		App.controller('DemoCtrl', ['$filter', '$scope', function ($filter, $scope) {

			// $filter是个函数形式
 			
 			// 传date参数，就会返回一个专门用来
 			// 格式化日期的过滤器
			var date = $filter('date');

			var now = new Date();

			$scope.now = date(now, 'yyyy-MM-dd');

			// 传currency参数，就会返回一个专门用来
			// 格式化货币符号的过滤器
			var currency = $filter('currency');

			var price = 12.345;

			$scope.price = currency(price, '￥', 3);

			// 传入limitTo参数，可以返回一个专门用于
			// 截取数组或字符串的过滤器
			var limitTo = $filter('limitTo');

			var str = 'my name is itcast';

			var list = ['html', 'css', 'js'];

			$scope.str = limitTo(str, -6);

			$scope.list = limitTo(list, 2);
		}]);

	</script>

</body>
</html>
```

### 内置服务-$log

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>AngularJS 服务</title>
</head>
<body ng-app="App">
	<ul ng-controller="DemoCtrl">
		
	</ul>
	<script src="./libs/angular.min.js"></script>
	<script>
		var App = angular.module('App', []);

		// 使用日志服务 $log

		App.controller('DemoCtrl', ['$log', function ($log) {

			$log.log('提示信息');

			$log.debug('调示信息');

			$log.warn('警告信息');

			$log.error('错误信息');

			$log.info('普通信息');
		}]);
	</script>
</body>
</html>
```

### 





