---
title: git操作
---

## 克隆仓库

```sh
git clone https:...
```

## 复制某次提交

```sh
git cherry-pick #hash
```

## 合并分支

```sh
git checkout dev #切换到dev分支
git merge --no-ff -m "合并test到dev" test #合并test到dev
```

## Git：git 取消对某个文件的跟踪

**一、通过修改.gitignore 忽视某个文件但是发现这个文件还是会被踪，只对没有被 git commit 过的文件有效，也就是说如果你的文件被 commit 过后你再修改 gitignore，这个时候 gitignore 对这个文件是无效的，这个时候就需要取消对某个文件的跟踪。**

**二、取消对某个文件的跟踪步骤：**

​1、git rm -r -n --cached 文件或目录，列出你需要取消跟踪的文件，可以查看列表，检查下是否有误操作导致一些不应该被取消的文件取消了，是为了再次确认的。-r 表示递归，-n 表示先不删除，只是列出文件。

```
git rm -r -n --cached 文件或目录
```

​ 2、git rm -r --cached 文件，取消缓存不想要跟踪的文件

```
git rm -r --cached 文件
```

​ 3、修改根目录.gitignore 文件，添加你希望忽略的文件/目录。

​ 4、 git commit 提交

```
git commit
```

​ 5、git push 推送到服务器

```
git push
```
