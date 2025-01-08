
简体中文
# Luckysheet

点击 [#1454](https://github.com/dream-num/Luckysheet/issues/1454) 查看更多详情。


## 介绍
🚀Luckysheet ，一款纯前端类似excel的在线表格，功能强大、配置简单、完全开源。


## 相关链接
 | 源码   | 文档 | Demo | 插件Demo | 论坛 |
 | ------ | -------- | ------ | ------ | ------ |
 | [Github](https://github.com/mengshukeji/Luckysheet)| [在线文档](https://dream-num.github.io/LuckysheetDocs/zh/) | [在线Demo](https://dream-num.github.io/LuckysheetDemo) / [协同编辑Demo](http://luckysheet.lashuju.com/demo/) | [导入Excel Demo](https://dream-num.github.io/LuckyexcelDemo/) | [中文论坛](https://support.qq.com/product/288322) |
 | [Gitee镜像](https://gitee.com/mengshukeji/Luckysheet)| [Gitee在线文档](https://mengshukeji.gitee.io/LuckysheetDocs/zh/) | [Gitee在线Demo](https://mengshukeji.gitee.io/luckysheetdemo/) | [Gitee导入Excel Demo](https://mengshukeji.gitee.io/luckyexceldemo/) | [Google Group](https://groups.google.com/g/luckysheet) |

![演示](/docs/.vuepress/public/img/LuckysheetDemo.gif)

## 插件
- [Luckyexcel](https://gitee.com/mengshukeji/Luckyexcel)：excel导入导出库 
- [chartMix](https://gitee.com/mengshukeji/chartMix)：图表插件

## 生态

| 工程 | 描述 |
|---------|-------------|
| [Luckysheet Vue]          | 在vue cli 3项目中使用Luckysheet和Luckyexcel|
| [Luckysheet Vue3]          | 在vue3, vite项目中使用Luckysheet和Luckyexcel|
| [Luckysheet React]          | 在React项目中使用Luckysheet |
| [Luckyexcel Node]          | 在koa2中使用Luckyexcel |
| [Luckysheet Server]          | Java后台Luckysheet Server |
| [Luckysheet Server Starter]          | LuckysheetServer 一键docker部署 |

[Luckysheet Vue]: https://gitee.com/mengshukeji/luckysheet-vue
[Luckysheet Vue3]: https://gitee.com/hjwforever/luckysheet-vue3-vite.git
[Luckysheet React]: https://gitee.com/mengshukeji/luckysheet-react
[Luckyexcel Node]: https://gitee.com/mengshukeji/Luckyexcel-node
[Luckysheet Server]: https://gitee.com/mengshukeji/LuckysheetServer
[Luckysheet Server Starter]: https://gitee.com/mengshukeji/LuckysheetServerStarter

## 特性

- **格式设置**：样式，条件格式，文本对齐及旋转，文本截断、溢出、自动换行，多种数据类型，单元格内多样式
- **单元格**：拖拽，下拉填充，多选区，查找和替换，定位，合并单元格，数据验证
- **行和列操作**：隐藏、插入、删除行或列，冻结，文本分列
- **操作体验**：撤销、重做，复制、粘贴、剪切，快捷键，格式刷，选区拖拽
- **公式和函数**：内置公式，远程公式，自定义公式
- **表格操作**：筛选，排序
- **增强功能**：数据透视表，图表，评论，共享编辑，插入图片，矩阵计算，截图，复制到其他格式，EXCEL导入及导出等

更详细的功能列表，请查阅：[特性](https://dream-num.github.io/LuckysheetDocs/zh/guide/#%E7%89%B9%E6%80%A7)

## 📖 学习资源

- 新用户优先阅读：[用户指引](https://github.com/mengshukeji/Luckysheet/wiki/User-Guide)
- 社区提供的教程、学习资料及配套解决方案请查阅：[教程与资源](https://dream-num.github.io/LuckysheetDocs/zh/guide/resource.html)

## 📜 更新日志

每个版本的详细更改都记录在 [CHANGELOG.md](CHANGELOG.md) 中。

## ❗️ 问题反馈

在反馈问题之前，请确保仔细阅读 [如何提交问题](https://dream-num.github.io/LuckysheetDocs/zh/guide/contribute.html#如何提交问题)。 不符合准则的问题可能会立即被移除。

## ✅ 开发计划

通过 [GitHub Projects](https://github.com/mengshukeji/Luckysheet/projects/1) 管理

## 💪 贡献

在提交PR之前，请确保仔细阅读 [贡献指南](https://dream-num.github.io/LuckysheetDocs/zh/guide/contribute.html)。

## 用法

### 第一步
通过CDN引入依赖

```
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/plugins/css/pluginsCss.css' />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/plugins/plugins.css' />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/css/luckysheet.css' />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/assets/iconfont/iconfont.css' />
<script src="https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/plugins/js/plugin.js"></script>
<script src="https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/luckysheet.umd.js"></script>
```
### 第二步
指定一个表格容器
```
<div id="luckysheet" style="margin:0px;padding:0px;position:absolute;width:100%;height:100%;left: 0px;top: 0px;"></div>
```
### 第三步
创建一个表格
```
<script>
    $(function () {
        //配置项
        var options = {
            container: 'luckysheet' //luckysheet为容器id
        }
        luckysheet.create(options)
    })
</script>
```
## 开发

### 环境
[Node.js](https://nodejs.org/en/) Version >= 6 

### 安装
```
npm install
npm install gulp -g
```
### 开发
```
npm run dev
```
### 打包
```
npm run build
```

## 版权信息
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020-present, mengshukeji
