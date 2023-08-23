
发布路径：


发布场景：

体验馆 
experiencemode: none
HashRouter
language: zh

体验馆国际站（暂无）
experiencemode: none
HashRouter
language: en

独立站点（域名访问）
experiencemode: block
BrowserRouter
language: zh

独立站点国际站（路径访问）
experiencemode: block
HashRouter
language: en


独立站
tcplayer-1306264703 -> 根目录

国内
tcplayer-1306264703 -> experience-center

国际
tcplayer-1306264703 -> intl

release 为测试路径

发布后如果未能生效，可前往cdn刷新。

遇到过的问题：
上传后，找不到js文件和css文件，这些资源文件会fallback到index.html文件，手动在cdn刷新了这些js和css资源文件才好，这里后面要排查下。