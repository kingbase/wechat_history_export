## 安装

将于近期上线 Chrome Store，假如我能及时搞定开发者注册。

目前可以先尝试用 Chrome 的开发者模式手动加载此扩展。

## 使用说明

1. 设置PC版微信（~~Mac~~ or Windows），开启选项：`设置 --> 通用设置 --> 使用系统默认浏览器打开网页`，并将安装了此扩展的 Chrome 浏览器设置为默认浏览器。
2. 选取要导出的微信公众号的某一篇文章，通过`PC版微信中点击该文章`，此时会在已安装此扩展的 Chrome 浏览器中打开该文章。
3. 点击浏览器扩展栏中本扩展栏按钮。点击后会`自动跳转到该公众号的历史文章页面`。
4. 在历史文章页面的页面右上角会出现本扩展的工具条，点击Start后，会`自动模拟向下滑动以加载所有历史文章`。
5. 待所有历史文章加载结束后（Start按钮会变为End），可以将历史文章导出为CSV，此时所有链接也可以点击了（默认情况下会在当前页面跳转，阅读时来回跳转并不方便）。

Todo
- 去掉“点击扩展按钮”那一步，直接在文章页面展示是否跳转
- 导出为PDF
- 不污染全局命名空间
- 规范变量名
- 让代码更干净
