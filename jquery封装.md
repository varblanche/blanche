<p style="border-bottom:1px solid #ccc;font-size:*5em;font-weight:bold;">前端JS原生框架第1天</p>
<hr>

# 课程内容

## 课程笔记

### Git基本常用命令

* mkdir XX 
	(创建一个空目录 XX指目录名)

* pwd              
	显示当前目录的路径。

* git init           
	把当前的目录变成可以管理的git仓库，生成隐藏.git文件。

* git add XX        
	把xx文件添加到暂存区去。　

* git commit –m “XX”  
	提交文件 –m 后面的是注释。

* git status         
	主要查看工作目录文件状态（查看仓库文件状态）　

* git diff  XX       
	查看XX文件修改了那些内容

* git log           
	查看历史记录　

* git reset --hard HEAD^ 或者 git reset --hard HEAD~
	回退到上一个版本(如果想回退到100个版本，使用git reset –hard HEAD~100 )　

* cat XX         
	查看XX文件内容　　

* git reflog       
	查看历史记录的版本号id　　

* git checkout -- XX  
	把XX文件在工作区的修改全部撤销。

* git rm XX          
	删除XX文件　　

* git remote add origin URL
	关联一个远程库　

* git push –u(第一次要用-u 以后不需要) origin master 
	把当前master分支推送到远程库　

* git clone URL  
	从远程库中克隆　

* git checkout –b dev  
	创建dev分支 并切换到dev分支上

* git branch  
	查看当前所有的分支　

* git checkout master 
	切换回master分支　

* git merge dev    
	在当前的分支上合并dev分支　

* git branch –d dev
	删除dev分支　　

* git branch name
	创建分支　
	　
* git stash 
	把当前的工作隐藏起来 等以后恢复现场后继续工作

* git stash list 
	查看所有被隐藏的文件列表

* git stash apply 
	恢复被隐藏的文件，但是内容不删除

* git stash drop 
	删除文件

* git stash pop 
	恢复文件的同时 也删除文件　　

* git remote 
	查看远程库的信息

* git remote –v 
	查看远程库的详细信息　

* git push origin master  
	Git会把master分支推送到远程库对应的远程分支上

### 合并分支

1. git merge branchName
	将 指定的分支 合并到 当前分支。如果想把 A分支 合并到 B分支，就要先切换到 B分支，
	在使用该指令 来合并分支。

2. 在合并分支时，会在当前分支上 重新生成一个新版本。相当于在当前分支提交了一次。

3. 在合并分支时，默认使用 fast-forward 模式（快进）,将分支提交的版本信息 直接拷贝到主分支，来实现分支的合并。而如果使用以下指令合并分支：
git merge --no-ff branchName 不使用快进模式合并，会在主分支上 重新创建一个版本id，
此时要指定该版本的备注信息。

### 删除分支

1. git branch -d branchName
	删除指定的分支。

### 从远程仓库克隆

1. git clone URL
	从远程服务器 下载 项目，会在在当前目录下创建新目录，名称为远程仓库的名字。在
	该目录下 就已存在一个.git文件夹，说明不需要使用git init 来初始化一个空仓库了。

2. git push URL branchName
	将本地仓库指定的分支 推送到 远程服务器上。

### 定义变量关联远程仓库地址

1. git remote add <name> URL

这样在往URL上的远程仓库推送文件 就可以使用 变量<name> 来代替 URL值。

### 冲突解决

在 协同分支上开发时，如果想将本地仓库 推送到 远程仓库，应该先pull拉取最新版本，在推送。
而在 拉取最新版本时，会出现冲突，那么就手动解决。手动解决后，要重新生成本地仓库版本，
然后在推送到 远程仓库内。

### 从远程仓库拉取最新文件内容

1. git pull 

### 本地仓库分支与远程仓库分支建立关联

1. git branch --set-upstream-to=origin/<branchName> dev

可以跟踪远程仓库 dev分支的相关信息

### .gitignore文件

1. 忽略当前目录文件：filename

2. 忽略文件夹：folderName

3. 忽略某路径下文件：dir/filename

4. 忽略同一类文件：*.<文件的类型名> eg: *.md

### 比较差异

1. git difftool filename
如果 暂存区具有指定的文件，那么比较的就是 工作目录文件 和 暂存区文件 的差异；
如果 暂存区没有，那么 就是比较 工作目录文件 和 版本库（最近提交的版本）文件 的差异。
