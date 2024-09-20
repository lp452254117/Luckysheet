
# Luckysheet

English| [简体中文](./README-zh.md)

## Introduction
🚀Luckysheet is an online spreadsheet like excel that is powerful, simple to configure, and completely open source.


## Links
| Source Code   | Documentation | Demo | Plugins Demo | Forum |
 | ------ | -------- | ------ | ------ | ------ |
| [Github](https://github.com/mengshukeji/Luckysheet)| [Online Documentation](https://dream-num.github.io/LuckysheetDocs/) | [Online Demo](https://dream-num.github.io/LuckysheetDemo) / [Cooperative editing demo](http://luckysheet.lashuju.com/demo/) | [Import Excel Demo](https://dream-num.github.io/LuckyexcelDemo/) | [Chinese Forum](https://support.qq.com/product/288322)  |
| [Gitee Mirror](https://gitee.com/mengshukeji/Luckysheet)| [Gitee Online Documentation](https://mengshukeji.gitee.io/LuckysheetDocs/) | [Gitee Online Demo](https://mengshukeji.gitee.io/luckysheetdemo/) | [Gitee Import Excel Demo](https://mengshukeji.gitee.io/luckyexceldemo/) | [Google Group](https://groups.google.com/g/luckysheet) |

![Demo](/docs/.vuepress/public/img/LuckysheetDemo.gif)

## Plugins
- [Luckyexcel](https://github.com/mengshukeji/Luckyexcel): Excel import and export library
- [chartMix](https://github.com/mengshukeji/chartMix): Chart plugin

## Ecosystem

| Project | Description |
|---------|-------------|
| [Luckysheet Vue]          | Luckysheet and Luckyexcel in a vue cli3 project |
| [Luckysheet Vue3]          | Luckysheet and Luckyexcel in a vue3 project with vite|
| [Luckysheet React]          | Luckysheet in a React project |
| [Luckyexcel Node]          | Use Luckyexcel in koa2 |
| [Luckysheet Server]          | Java backend Luckysheet Server |
| [Luckysheet Server Starter]          | LuckysheetServer docker deployment startup template |

[Luckysheet Vue]: https://github.com/mengshukeji/luckysheet-vue
[Luckysheet Vue3]: https://github.com/hjwforever/luckysheet-vue3-vite
[Luckysheet React]: https://github.com/mengshukeji/luckysheet-react
[Luckyexcel Node]: https://github.com/mengshukeji/Luckyexcel-node
[Luckysheet Server]: https://github.com/mengshukeji/LuckysheetServer
[Luckysheet Server Starter]: https://github.com/mengshukeji/LuckysheetServerStarter


## Features

- **Formatting**: style, conditional formatting, text alignment and rotation, text truncation, overflow, automatic line wrapping, multiple data types, cell segmentation style
- **Cells**: drag and drop, fill handle, multiple selection, find and replace, location, merge cells, data verification
- **Row & column**: hide, insert, delete rows or columns, freeze, and split text
- **Operation**: undo, redo, copy, paste, cut, hot key, format painter, drag and drop selection
- **Formulas & Functions**: Built-in, remote and custom formulas
- **Tables**: filter, sort
- **Enhanced functions**: Pivot tables, charts, comments, cooperative editing, insert picture, matrix calculations, screenshots, copying to other formats, EXCEL import and export, etc.

For a more detailed feature list, please refer to: [Features](https://dream-num.github.io/LuckysheetDocs/guide/#features)

## 📖 Resources
- Priority reading for new users: [User Guide](https://github.com/mengshukeji/Luckysheet/wiki/User-Guide)
- For the tutorials, learning materials and supporting solutions provided by the community, please refer to: [Tutorials and Resources](https://dream-num.github.io/LuckysheetDocs/guide/resource.html)

## 📜 Changelog

Detailed changes for each release are documented in the [CHANGELOG.md](CHANGELOG.md).

## ❗️ Issues

Please make sure to read the [Issue Reporting Checklist](https://dream-num.github.io/LuckysheetDocs/guide/contribute.html#how-to-submit-issues) before opening an issue. Issues not conforming to the guidelines may be closed immediately.

## ✅ TODO

Managed with [GitHub Projects](https://github.com/mengshukeji/Luckysheet/projects/1)

## 💪Contribution

Please make sure to read the[ Contributing Guide](https://dream-num.github.io/LuckysheetDocs/guide/contribute.html) before making a pull request.

## Usage

### First step
Introduce dependencies through CDN
```
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/plugins/css/pluginsCss.css' />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/plugins/plugins.css' />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/css/luckysheet.css' />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/assets/iconfont/iconfont.css' />
<script src="https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/plugins/js/plugin.js"></script>
<script src="https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/luckysheet.umd.js"></script>
```
### Second step
Specify a table container
```
<div id="luckysheet" style="margin:0px;padding:0px;position:absolute;width:100%;height:100%;left: 0px;top: 0px;"></div>
```
### Third step
Create a table
```
<script>
    $(function () {
        //Configuration item
        var options = {
            container: 'luckysheet' //luckysheet is the container id
        }
        luckysheet.create(options)
    })
</script>
```

## Development

### Requirements
[Node.js](https://nodejs.org/en/) Version >= 6

### Installation
```
npm install
npm install gulp -g
```
### Development
```
npm run dev
```
### Package
```
npm run build
```

## License
[MIT](http://opensource.org/licenses/MIT)
