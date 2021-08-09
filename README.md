#### TODO：
在对此项目进行生产构建时，html-loader 在生产环境下会默认压缩引用的文件，导致要预览的代码不再换行展示，需要在设置 html-loader 规则时，将 options 中的 minimize 设置为 false（或将其中具体的配置项设置为 false），然而通过 customize-cra 配置 html-loader 的 options 无效，暂未解决，目前手动将 html-loader 中 minimizer-plugin.js 主体函数 process 中处理的步骤注释掉，这样打包出来的文件中要预览的 html 代码就可以正常换行展示了。

```
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _htmlMinifierTerser = require("html-minifier-terser");

var _default = options => function process(html) {
  // try {
  //   // eslint-disable-next-line no-param-reassign
  //   html = (0, _htmlMinifierTerser.minify)(html, options.minimize);
  // } catch (error) {
  //   options.errors.push(error);
  // }

  return html;
};

exports.default = _default;
```