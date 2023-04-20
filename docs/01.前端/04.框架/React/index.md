# Rreact 总结

## 1.基础

### 官网

英文官网:[ https://reactjs.org/](https://reactjs.org/)

中文官网: https://react.docschina.org/

### 相关 js 库

react.js：React 核心库。

react-dom.js：提供操作 DOM 的 react 扩展库。

babel.min.js：解析 JSX 语法代码转为 JS 代码的库。

### 组件三大核心属性 1: state

强制绑定 this: 1.通过函数对象的 bind() 2.箭头函数

**_更新state，在react调用的函数中，是异步的，可通过回调函数实现同步_**

### 组件三大核心属性 2: props

props 中的属性值进行类型限制和必要性限制:使用 prop-types 库进限制（需要引入 prop-types 库）

### 组件三大核心属性 3: refs 与事件处理

三种形式 ref：

 字符串形式的 ref

 回调形式的 ref

 **推荐使用：**createRef 创建 ref 容器 :

 创建：ref=React.createRef() 使用：this.ref.current

### 组件三大核心 Demo

```jsx
//Demo
import React, { Component } from 'react'
import Demo2 from './demo2'
export default *class* Demo *extends* Component {
    state={
        value:'hello react'
    }
    onClick=()=>{
        console.log(this.demo2Ref.current.getvalue)//'demo2'
        this.setState({value:'react onClick'})
        //div.innerhtml:'hello react'->'react onClick'
    }
    demo2Ref=React.createRef()
 render() {
  return (
   <div  onClick={this.onClick}>
          <demo2 ref={this.demo2Ref} propsdata={this.state.value}></demo2>//props名称任意
        {this.state.value}
   </div>
  )
 }
}
//Demo2
import React, { Component } from 'react'
export default *class* Demo2 *extends* Component {
    state={
        value:'demo2'
    }
    getvalue=()=>{
        return this.state.value
    }
 render() {
  return (
   <div>
      {this.props.propsdata}
   </div>
  )
 }
}
```

## 2.生命周期

### 1.初始化阶段:

由 ReactDOM.render()触发---初次渲染

constructor()

**getDerivedStateFromProps**

render()

componentDidMount()

### **2. 更新阶段:**

由组件内部 this.setSate()或父组件重新 render 触发

**getDerivedStateFromProps**

shouldComponentUpdate()

render()

**getSnapshotBeforeUpdate**

componentDidUpdate()

### **3. 卸载组件:**

由 ReactDOM.unmountComponentAtNode()触发

componentWillUnmount()

### 生命周期 Demo

```jsx
import React, { Component } from 'react'
export default *class* Demo *extends* Component {
 constructor(props) {
     super(props)
     this.state = {
         isHot: false
     }
     this.f1=this.f1.bind(this)//普通函数绑定this
    }
 f1(){
      this.setState({isHot:!this.state.isHot})
      console.log(this.state.isHot);
     }
 statc getDerivedStateFromProps(){
	//
 }
 render() {
  return (
   <h2 onClick={this.f1}>{this.state.isHot ? 1 : 2}</h2>
  )
 }
 componentDidMount(){
     //因为废弃了componentWillMount() 初始化数据，ajax请求，等在componentDidMount内完成
}
 statc getDerivedStateFromProps(){
     //
}
 componentDidUpdate(){
     //更新后执行
 }
 componentWillUnmount(){
     //卸载前取消定时器等
 }
}
```

## 3.React 脚手架

### 1.创建项目并启动

**第一步**，全局安装：npm i -g create-react-app

**第二步**，切换到想创项目的目录，使用命令：create-react-app hello-react

**第三步**，进入项目文件夹：cd hello-react

**第四步**，启动项目：npm start

### **2.react 脚手架项目结构**

public ---- 静态资源文件夹

favicon.icon ------ 网站页签图标

**index.html -------- 主页面**

logo192.png ------- logo 图

logo512.png ------- logo 图

manifest.json ----- 应用加壳的配置文件

robots.txt -------- 爬虫协议文件

src ---- 源码文件夹

App.css -------- App 组件的样式

**App.js --------- App 组件**

App.test.js ---- 用于给 App 做测试

index.css ------ 样式

**index.js ------- 入口文件**

logo.svg ------- logo 图

reportWebVitals.js --- 页面性能分析文件(需要 web-vitals 库的支持)

setupTests.js ---- 组件单元测试的文件(需要 jest-dom 库的支持)

## 4.React 路由

### ?.非路由组件使用路由

使用withRouter包裹组件

```jsx
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
export default class Index extends Component {
  render() {
    return (
      <div>  
      </div>
    )
  }
}
export default withRouter(Index)
```

### ?.刷新问题

1.强制刷新白屏解决：

使用*HashRouter*代替*BrowserRouter*

2.*HashRouter*没有参数解决：

使用内存保存对象

3.使用*HashRouter*强制刷新页面，内存保存对象消失？待解决

目前通过强制返回前一页拦截bug

初步测试，内存数据只能保存在当前路由不刷新，

## 5.antd

### ?.Modal+Form

#### 子页面选中问题

selectedKeys

#### ?.重置数据

1.*Modal*添加destroyOnClose属性

2.*Form*添加preserve={false}

#### ?.Modal触发Form提交

1.Form绑定Ref，或由包含Form的组件通过props传递Ref给Form绑定

2.触发表单验证：this.*[refname]*.current.validateFields()

?.图片上传问题

图片上传却没有给到对应的商品中，造成服务器资源浪费，

服务端设计应设置对应关系，或按商品id建立文件夹，每次更改后删除多余图片

客户端设置图片数量限制

### Table组件

1.需要设置rowkey

```jsx
<Table 
    columns={this.columns} //表头
    dataSource={opticals} //数据来源 
    loading={searching} //加载状态 
    bordered //边框
    rowKey={'_id'} //每行数据的key
    ></Table>
```

