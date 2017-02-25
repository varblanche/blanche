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

### 内置服务
1. 





