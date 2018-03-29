# SnailDev.GifMaker
一个生成gif并添加自定义字幕的工具

client  微信小程序

server  nodejs + express

欢迎 star&fork  如果您有好的commit 也可以pull request

## Introduction
参考于[sorry](https://github.com/xtyxtyx/sorry), 由@xtyxtyx编写
但并不使用aegisub为模板视频创建字幕，采用的是FFmpeg 中的filter drawtext, 另，笔者还将继续深入了解FFmpeg,争取早日实现**创作自动化**。

可生成如下案列：
![](src/server/public/demo/gif/1.gif)

开放接口：

1.获取category

```
GET https://gifmaker.develophelper.com/gif/category
```

2.制作gif

```
POST https://gifmaker.develophelper.com/gif/make
Content-Type: application/x-www-form-urlencoded
Body: tplid=1&                         // 模板ID
        quality=1&                       // 画质（暂时无效）                
        content=好啊##$@?$?@$##就算你是一流工程师##$@?$?@$##就算你出报告再完美##$@?$?@$##我叫你改报告你就要改##$@?$?@$##毕竟我是客户##$@?$?@$##客户了不起啊##$@?$?@$##sorry 客户真的了不起##$@?$?@$##以后叫他天天改报告##$@?$?@$##天天改 天天改  //字幕内容（以##$@?$?@$##作为分隔符）
```

3.返回结果
```javascript
{
"m": 0,      // code 0 successful
"d":{        // d data
    "gifurl": "http://gifmaker.develophelper.com/cache/1_1a322f1b7dd9633e5433d0e0152e18a6a924cb23.gif"
},
"e": ""      // e errMsg
}
```

## Structure
```
├─client                    // 客户端参考微信小程序结构
│
└─server                    // 服务端
   │
   ├─data                   // 模板配置目录
   │
   ├─public                 // 静态资源目录
   │  │
   │  ├─cache               // 动态生成的gif目录
   │  │
   │  └─demo                // 示例目录
   │
   ├─test                   // 测试目录
   │
   ├─app.js                 // 主程序入口
   │
   ├─gifmaker.js            // gif创建
   │
   ├─util.js                // 工具类
   │
   └─test                   // 测试目录
```

## DependOn
server

```
"ffmpeg-static": "^2.2.0",
"fluent-ffmpeg": "^2.1.2"
```

## How to Use
1. 制作视频模板 放到 data/template/ 目录下
2. 给data/category.js 和data/template.js 添加相关配置
3. 将做好的demo放到 public/demo/gif/下 缩略图放到 public/demo/thumbnail/下

## Interpretation
```javascript
{
    filter: "drawtext",                     // filter类型 
    options: {
        "text": "我就是饿死",                // 文本内容
        "x": "(w-text_w)/2",                // 文本出现的横坐标
        "y": "h-text_h-4",                  // 文本出现的纵坐标
        "enable": "between(t,0,1.04)",      // 文本出现的时间范围
        'fontfile': 'msyhbd.ttc',           // 字体文件
        'fontcolor': 'white',               // 字体颜色
        "fontsize": "14"                    // 字体大小
    }
}
```
更多参考 [FFmpeg Filters Documentation](http://www.ffmpeg.org/ffmpeg-filters.html#drawtext-1)

## License

The MIT License (MIT). Please see [LICENSE](LICENSE) for more information.
