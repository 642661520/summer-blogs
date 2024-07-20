---
title: HTML
---

## HTML 元信息

### 主语言 lang

```HTML
<html lang="zh-CN">
  …
</html>
```

### 标题 `<title>`

```HTML
 <title>我的测试页面</title>
```

### 元数据：`<meta>`

```HTML
<meta charset="utf-8" />
```

### 图标 favicon

<link rel="icon" href="favicon.ico" type="image/x-icon" />

## 多媒体与嵌入

### 显示音轨文本 `<track>`

```HTML
<video controls>
    <source src="example.mp4" type="video/mp4">
    <source src="example.webm" type="video/webm">
    <track kind="subtitles" src="subtitles_en.vtt" srclang="en">
</video>
```

### `<iframe>`

<iframe src="//player.bilibili.com/player.html?aid=19390801&bvid=BV1bW411n7fY&cid=31621681&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

```HTML
<iframe
src="//player.bilibili.com/player.html?aid=19390801&bvid=BV1bW411n7fY&cid=31621681&page=1"
scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true">
</iframe>
```
### `<object>`
<object type="application/pdf"
    data="https://interactive-examples.mdn.mozilla.net/media/examples/In-CC0.pdf"
    width="250"
    height="200">
</object>

```HTML
<object type="application/pdf"
    data="https://interactive-examples.mdn.mozilla.net/media/examples/In-CC0.pdf"
    width="250"
    height="200">
</object>

```
