# 介绍  AngularJS
AngularJS是一款由Google公司开发维护的前端MVC框架，其克服了HTML在构建应用上的诸多不足，
从而降低了开发成本提升了开发效率。

### **特点**
* AngularJS 以 **数据和逻辑** 为驱动核心，相对于jQuery 功能更加丰富
* AngularJS 有着诸多特性，最为核心的是：模块化，双向数据绑定，语义化标签，依赖注入等。
* 与之类似的框架还有　BackBone、KnoockoutJS、Vue、React 等
* 体验 AngularJS
引入 AngularJS

```html
<body ng-app>
    <input type="text" ng-model = "msg">
    <h3>{{msg}}</h3>
</body>
```
### 下载
1. 通过AngularJS官网下载，不过由于国内特殊的国情，需要翻墙才能访问。
2. 通过npm下载，npm install angular
3. 通过bower下载，bower install angular
bower是什么？

### **MVC** 
* MVC 是一种开发模式 是由 模型（Model）、视图（View）、控制器（Controller）。
* MVC 更多应用在后端开发程序里，后被引用到前段开发中。由于受到前端及时的限制便有了一些细节的调整，进而出现了很多MVC的衍生版
   - 如：MVVM、MVW、MVP、MV 等;

###  AnguLarJS 的基础页面

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="libs/angular.min.js"></script>
    <script>
    // 创建一个模块
    var App = angular.model("App",[]);
    // 创建一个控制器
    App.controller("DemoCtrl",["$scope",function($scope){

    }])
    </script>
</head>
<body ng-app="App">
    <div ng-controller="DemoCtrl"></div>
</body>
</html>
```


### **AngularJS 的用法**
    - 模块化 把某一段代码当做一个模块，可以复用，以此来进行开发。

* AngularJS 模块化组织代码

```html
    <!--通过ng-app属性 定义一个应用 -->
    <!--所表达的含义就是指 -->
    <!--ng-app 属性所在的标签 所包含的所有内容，都属于应用的一部分，都归 AnguLarJS 管理 -->
    <body ng-app="App">
	<h1>Angularjs</h1>
	<!-- 通一个ng-controller指定一个控制器 -->
	<div ng-controller="DemoCtrl">
		<!-- 通过html来定义视图 -->
		<p>我叫{{name}}，我今年{{age}}岁了，我在传智进行学习!</p>
	</div>
	<!-- 学生列表 -->
	<table ng-controller="StudentCtrl">
		<tr>
			<td>序号</td>
			<td>姓名</td>
			<td>年龄</td>
			<td>性别</td>
		</tr>
		<tr ng-repeat="aaa in students">
			<!-- AngularJS提供了$index来获得 -->
			<!-- 在遍历数组的索引值 -->
			<td>{{$index+1}}</td>
			<td>{{aaa.name}}</td>
			<td>{{aaa.age}}</td>
			<td>{{aaa.sex}}</td>
		</tr>
	</table>

<script>
		// 引入angular.js后，会提供一个全局的对象
		// angular，类似于jQuery提供的全局对象$一样

		// 在angular这个全局对象下，有若干方法
		// 使用这些方法可以实现具体业务

		// 其中使用angular.module()，创建一个模块
		// 第1个参数 模块名称
		// 第2个参数 数组用来解决依赖的
		var App = angular.module('App', []);

		// App即模块实例又有若干方法

		// 其中App.controller()方法用来创建一个控制器
		// 第1个参数 控制器的名称
		// 第2个参数 数组用来解决依赖
				  // 数组最后单元必须是一个函数
		App.controller('DemoCtrl', ['$scope', function ($scope) {
			// $scope 就是所谓的模型
			// $scope 是一个“空对象”，类似{}
			// {name: '张三', age: 18}
			$scope.name = '张三';
			$scope.age = 18;
		}]);

		// 展示学生列表
		// 展示到何处? html （视图）
		// 学生信息哪里来的？（模型）
		// 通过控制器将相应的模型数据放到对应视图模板上

		App.controller('StudentCtrl', ['$scope', function ($scope) {
			// $scope 就是模型
			$scope.students = [
				{name: '张三', age: 18, sex: '男'},
				{name: '李四', age: 19, sex: '女'},
				{name: '王五', age: 16, sex: '女'},
				{name: '赵六', age: 20, sex: '男'}
			];
		}]);

		// for(var key in obj)
	</script>

</body>
```

### **内置指令**

* `ng-app` 指定应用的根元素，可以为任何元素添加属性，并且可以设置多个，但是不能进行嵌套。往往一个页面只会一个 ng-app 。

* `ng-controller` 指定控制器

* `ng-show="true"` 当指令值为true时，则显示属性所在标签的内容。接收bool值

* `ng-hide="true"` 当指令值为true时，则隐藏属性所在标签的内容。接收bool值

* `ng-if="true"` 当指令值为true时，则显示属性所在标签的内容。接收bool值// 当值为false时整个标签都被删除

* `ng-src=""` 增强图片路径

* `ng-href=""` 增强地址路径

* `ng-class` 控制类名// 值为对象时其对象属性为类名、其对象属性值为布尔类型，当为true，则添加属性名为真实类名。false不添加
    - ng-class="{{red}}"; 直接添加属性
    - ng-class="{red:true, blue:false}"; 当为true，则添加属性名为真实类名。false不添加。

* `ng-disabled="true"` 表单禁用 当值为true的时候，禁用表单，值为false的时候解禁。
    - 在HTML中有一些属性没有值，当取消时就必须删掉这个属性，需要时再添加

* `ng-readonly="true"` 只读 当值为true的时候，只读表单，值为false的时候可写的。

* `ng-checked="true"` 默认选中 当值为true的时候，选中表单，值为false的时候可未选中。

* `ng-select="true"` 默认选中下拉表单的属性 当值为true的时候，选中表单，值为false的时候可未选中。

* `ng-include` 引入文件

* `ng-click` 单击事件

```html
	<body>
    <!-- ng-include 的用法 -->
		<!-- 使用服务器打开文件 -->
		<!-- 引入头部文件 -->
		<div ng-include="'字符串路径'"></div>
		<section>网页的主体//当多个页面上的内容可以提取相同的公共部分的时候，可以放到不同的文件中，通过  **ng-include**  </section>
		<!-- 引入底部文件  -->
		<div ng-include="'./foorter.html'"></div>
		</body>
```

### 自定义属性
* App.directive(); 这个方法来定义指令。
	- 参数一：名称
	- 参数二：函数，函数定义指令的逻辑
	- 自定义指令
		+ App 是模块实例，在此实例下有若干方法
		+ App.controller() 用来定义控制器

```html
	<script src="./libs/angular.min.js"></script>
	<script>
		var App = angular.module('App', []);
		App.directive('tag',function(){
			// 通过返回一个对象
			// 对指令进行定义
			return {
				// E element 表示将指令当成标签使用  <div tag></div>

				// A attribute 表示将指令当属性使用  <tag></tag>

				// C class 表示将指令当成类名来使用	 <div class="tag"></div>

				// M mark 表示将指令当注释来解析	  <!-- directive:tag -->	
				restrict:'ECMA',
				// 模板内容必须要有一个根元素
				template:'<h1>hello AnguLarJS!</h1>'
				// replace：true；// 可以将内部注释标签解注释
				// 模板内容必须要有一个根元素
				templateUrl:'./header.html'
		}
	})
	</script>
	<body ng-app="App">
		<div tag></div>
		<tag></tag>
		<div class="tag"></div>
		<!-- directive:tag -->
		<!-- dfasdfaf -->
	</body>
```

###　**数据绑定**


```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script src="../libs/angular.min.js"></script>
	<script>
		var  App = angular.module('App',[]);
		App.controller('DemoCtrl',['$scope',function($scope){


		}])
	</script>
</head>
<body ng-app="App">
	<p>数据绑定是一种实现模型里的数据展示到试图中的相应位置的思路，
	有专门独立的模板引擎实现这一思路
	AnguLarJS 也有自己的实现。
	</p>

	<div></div>	
</body>
</html>

```

* 单项数据绑定  是从模型->视图或者从视图->模型
- 数据绑定分为单向和双向
- 数据绑定是在模型和视图之间处理的

```html     
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>AngularJS</title>
    <script src="./libs/angular.min.js"></script>
</head>
<body ng-app="App">
    <p>数据绑定是一种实现模型里数据展示到视图中相应位置的一种思路
    <br>有专门独立模板引擎实现这一思路
    <br>AngularJS也有自已的实现，接下来就AngularJS如何使用数据绑定的
    </p>
    <div class="box" ng-controller="DemoCtrl">
        <!-- bind 是数据绑定 {{是简写形式}} -->
        <!-- 两者的差异：bind 并且不可以重复添加 ng-bind-template可以绑定多个数据{{}} 是ng-bind的简写形式 添加ng-cloak可以解决“闪烁”现象
         -->
        <!-- <h1 ng-bind="name"></h1> -->
        <h1 ng-cloak>{{name}}{{age}}</h1>
        <ul>
            <!-- <li ng-bind="course[0]"></li>
            <li ng-bind="course[1]"></li> -->
            <li ng-repeat="item in course" ng-bind="item" ng-cloak></li>
            <!-- <li ng-repeat="item in course">{{item}}</li> -->
        </ul>
    </div>
    <!-- 视图 -> 模型 -->
    <div class="box" ng-controller="DoubleCtrl">
        <input type="text" ng-model="msg">
        <input type="button" value="显示" ng-click="show()">
    </div>
    <script>
        var App = angular.module('App', []);
        App.controller('DemoCtrl', ['$scope', function ($scope) {
            // $scope 是模型
            $scope.name = '张三';
            $scope.age = 18;
            $scope.course = ['html', 'css', 'js'];
        }]);
        App.controller('DoubleCtrl', ['$scope', function ($scope) {
            // alert($scope.msg);
            $scope.show = function () {
                alert($scope.msg);
            }
        }]);
    </script>
</body>
</html>
```

* 双向绑定 值的是 模型 <-> 视图  只能为表单元素添加 module

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>AngularJS 双向绑定</title>
    <script src="./libs/angular.min.js"></script>
    <script>
        var App = angular.module('App', []);

        App.controller('DemoCtrl', ['$scope', function ($scope) {
            $scope.msg = '';
        }]);

        // 双向绑定指的是 模型 <-> 视图
    </script>
</head>
<body ng-app="App">
    <div class="box" ng-controller="DemoCtrl">
        <input type="text" ng-model="msg">
        <h3>{{msg}}</h3>
    </div>
</body>
</html>
```

###　初始化模型

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    // ng-init初始化模型 不常用
    <div ng-controller="DemoCtrl" ng-init="title='课程信息'; info='前端内容'">
		<h1>{{title}}{{info}}</h1>
	</div>
    <script src="./libs/angular.min.js"></script>
	<script>
		var App = angular.module('App', []);

		// 通过控制器来分配模型和视图
		App.controller('DemoCtrl', ['$scope', function ($scope) {
			// $scope

			// $scope.title = '课程信息';
			// $scope.info = '前端内容';
		}])
	</script>
</body>
</html>
```
###　AngularJS 事件处理机制

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>事件处理</title>
</head>
<body ng-app='App'>
	<!-- 通过指令实现事件的处理 -->
	<div class="box" ng-controller="DemoCtrl">
		<li ng-click="single()">单击事件</li>
		<li ng-dblclick="double()">双击事件</li>
		<li ng-mouseover="xuanting()">悬停事件</li>
		<li ng-mouseout="likai()">离开事件</li>
	</div>

	<script src="./libs/angular.min.js"></script>
	<script>
		var App = angular.module('App', []);

		App.controller('DemoCtrl', ['$scope', function ($scope) {
			$scope.single = function () {
				alert('单击事件');
			}

			$scope.double = function () {
				alert('双击事件');
			}

			$scope.xuanting = function () {
				console.log('鼠标来了');
			}

			$scope.likai = function () {
				console.log('鼠标走了');
			}
		}]);
	</script>
</body>
</html>
```


### AnguLarJS 数据处理
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>AngularJS 数据处理</title>
</head>
<body ng-app="App">
	
	<div ng-controller="DemoCtrl">
		<ul>
			<!-- <li ng-repeat="item in list" ng-bind="item"></li> -->
			<li ng-repeat="item in list">{{item}}</li>
		</ul>
		<table>
			<tr ng-repeat="(key, val) in obj">
				<td>{{key}}</td><td>{{val}}</td>
			</tr>
		</table>
		<ul>
			<li ng-repeat="(key, val) in list">
				{{key}}{{val}}
			</li>
		</ul>
		<!-- 希望实现在遍历过程中根据的值进行不同的处理 -->
		<!-- 例如只有当值为css才显示 -->
		<ul>
			<!-- <li ng-repeat="item in list" ng-switch on="item"> -->
			<li ng-repeat="item in list" ng-switch="item">
				<span ng-switch-when="css">{{item}}</span>
				<a href="javascript:;" ng-switch-when="js">{{item}}</a>
			</li>
		</ul>
	</div>

	<script src="./libs/angular.min.js"></script>
	<script>
		var App = angular.module('App', []);

		App.controller('DemoCtrl', ['$scope', function ($scope) {

			// 根据数据类型使用不同方式处理
			// $scope.title = ''

			$scope.list = ['html', 'css', 'js'];

			$scope.obj = {
				name: 'laozhao',
				age: 18,
				sex: '男',
				hobby: '吹牛'
			}
		}]);
	</script>
</body>
</html>
```
