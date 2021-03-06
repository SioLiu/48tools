# 口袋48工具

## 软件下载链接
进入到https://github.com/duan602728596/48tools/releases 或 https://github.com/duan602728596/document/blob/master/48/README.md 下载

## 软件功能

> 在mac下需要先配置FFMpeg的位置

* 口袋48直播录源
* 口袋48录播下载
* snh48官方公演直播录制
* snh48官方公演录播下载
* B站直播录源
* B站视频下载
* A站直播录源
* A站视频下载
* 视频剪切
* 视频合并

## 许可证
本软件遵循**GNU General Public License v3.0**许可证。

## 技术栈
Pug + Sass + TypeScript + React + antd + Webpack + Electron。

## 模块
* 48tools: 软件源代码
* app：编译程序主目录
* darkTheme：提取暗黑主题的css文件
* main：Electron主程序运行源代码

## 编译
* main模块：编译主程序源代码
* darkTheme模块：编译暗黑主题的css文件
* 48tools：编译软件源代码
* 运行`scripts/unpack.js`，打包软件
* 运行`scripts/clean.js`，删除软件中的无用的文件

## 源代码托管地址
[https://github.com/duan602728596/48tools](https://github.com/duan602728596/48tools)