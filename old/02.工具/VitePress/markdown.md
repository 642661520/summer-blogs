---
title: markdown语法
---

## Frontmatter

``` yaml
---
title: 标题
titleTemplate: 标题模板
description: 页面描述
lang: 语言
head:
  - - meta
    - name: description
      content: hello
  - - meta
    - name: keywords
      content: super duper SEO
layout: doc #布局 类型：doc | home | page  默认：doc
---
```

## 目录
```
[[toc]]
```
## 提示框
``` md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

https://vitepress.dev/guide/markdown