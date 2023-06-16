

### VOD 发布路径

发布到：https://tcplayer.vcube.tencent.com/
tcplayer-1306264703 根目录


与体验馆相比：
> 路由方式不一样，index.js 里不能用`HashRouter`，需要用`BrowserRouter`
> 页面样式不一样，需要在 tcplayer.js 设置`experienceMode='block'`

考虑统一到体验馆，不过体验馆不支持 http 协议，无法播放 http 协议分发的视频。



### 体验馆发布路径
发布到 https://web.sdk.qcloud.com/component/experience-center/index.html#/detail?scene=player

国内
tcplayer-1306264703 -> experience-center

国际
tcplayer-1306264703 -> intl

测试
tcplayer-1306264703 -> release

发布后如果未能生效，可前往cdn刷新