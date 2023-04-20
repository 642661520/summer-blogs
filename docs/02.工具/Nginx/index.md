---
title: 配置
---

# nginx 配置

## http 配置

```
location /test/ {
         proxy_pass http://127.0.0.1:5500/api/;
}
```

## ws 配置

## 斜杠问题

### 推荐使用

::: tip location 后面带 / proxy_pass 后面带 / proxy_pass 不带后缀

```
location /test/ {
         proxy_pass http://127.0.0.1:5500/;
}
```

:::
location 被替换
这种情况下 请求 /test/a => http://127.0.0.1:5500/a;

### 推荐使用

::: tip location 后面带 / proxy_pass 后面带 / proxy_pass 带后缀

```
location /test/ {
         proxy_pass http://127.0.0.1:5500/api/;
}
```

:::
location 被替换
这种情况下 请求 /test/a => http://127.0.0.1:5500/api/a;

### 可以使用

::: info location 后面带 / proxy_pass 后面不带 / proxy_pass 不带后缀

```
location /test/ {
         proxy_pass http://127.0.0.1:5500;
}
```

:::

location 不被替换
这种情况下 请求 /test/a => http://127.0.0.1:5500/test/a;
请求 /test123/a 不会被匹配上

### 谨慎使用

::: warning location 后面不带 / proxy_pass 后面也不带 / proxy_pass 不带后缀

```
location /test {
         proxy_pass http://127.0.0.1:5500;
}
```

:::
location 不会被替换
这种情况下 请求 /test/a => http://127.0.0.1:5500/test/a;
请求 /test123/a => http://127.0.0.1:5500/test123/a;

### 谨慎使用

::: warning location 后面不带 / proxy_pass 后面也不带 / proxy_pass 带后缀

```
location /test {
         proxy_pass http://127.0.0.1:5500/api;
}
```

:::
location 会被替换
这种情况下 请求 /test/a => http://127.0.0.1:5500/api/a;
请求 /test123/a => http://127.0.0.1:5500/api123/a;

### 不推荐使用

::: danger location 后面带 / proxy_pass 后面不带 / proxy_pass 带后缀

```
location /test/ {
         proxy_pass http://127.0.0.1:5500/api;
}
```

:::
location 被替换
这种情况下 请求 /test/a => http://127.0.0.1:5500/apia;
请求 /test123/a 不会被匹配上

### 错误使用

::: danger

location 后面不带 /
proxy_pass 后面带 /
proxy_pass 不带后缀

```
location /test {
         proxy_pass http://127.0.0.1:5500/;
}
```

:::

location 被替换
这种情况下 请求 /test/a => http://127.0.0.1:5500//a;
多了/ 不可取！

### 错误使用

::: danger
location 后面不带 /
proxy_pass 后面带 /
proxy_pass 带后缀

```
location /test {
         proxy_pass http://127.0.0.1:5500/aaa/;
}
```

:::
location 被替换 这种情况下 请求 /test/a => http://127.0.0.1:5500/aaa//a;
多了/ 不可取！
