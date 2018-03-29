var gif = require("../gifmaker");

gif.makewithfilters("../template/9564a00ec44567367a07bee43868c420a8c48e60.mp4",
    [
        {
            filter: "drawtext",
            options: {
                "text": "好啊",
                "x": "(w-text_w)/2",
                "y": "h-text_h-4",
                "enable": "between(t,1.18,1.56)",
                "fontfile": "siyunheiti",
                "fontcolor": "white",
                "fontsize": "24"
            }
        },
        {
            filter: "drawtext",
            options: {
                "text": "就算你是一流工程师",
                "x": "(w-text_w)/2",
                "y": "h-text_h-4",
                "enable": "between(t,3.18,4.43)",
                "fontfile": "siyunheiti",
                "fontcolor": "white",
                "fontsize": "24"
            }
        },
        {
            filter: "drawtext",
            options: {
                "text": "就算你出报告再完美",
                "x": "(w-text_w)/2",
                "y": "h-text_h-4",
                "enable": "between(t,5.31,7.43)",
                "fontfile": "siyunheiti",
                "fontcolor": "white",
                "fontsize": "24"
            }
        },
        {
            filter: "drawtext",
            options: {
                "text": "我叫你改报告你就要改",
                "x": "(w-text_w)/2",
                "y": "h-text_h-4",
                "enable": "between(t,7.56,9.93)",
                "fontfile": "siyunheiti",
                "fontcolor": "white",
                "fontsize": "24"
            }
        },
        {
            filter: "drawtext",
            options: {
                "text": "毕竟我是客户",
                "x": "(w-text_w)/2",
                "y": "h-text_h-4",
                "enable": "between(t,10.06,11.56)",
                "fontfile": "siyunheiti",
                "fontcolor": "white",
                "fontsize": "24"
            }
        },
        {
            filter: "drawtext",
            options: {
                "text": "客户了不起啊",
                "x": "(w-text_w)/2",
                "y": "h-text_h-4",
                "enable": "between(t,11.93,13.06)",
                "fontfile": "siyunheiti",
                "fontcolor": "white",
                "fontsize": "24"
            }
        },
        {
            filter: "drawtext",
            options: {
                "text": "sorry 客户真的了不起",
                "x": "(w-text_w)/2",
                "y": "h-text_h-4",
                "enable": "between(t,13.81,16.31)",
                "fontfile": "siyunheiti",
                "fontcolor": "white",
                "fontsize": "24"
            }
        },
        {
            filter: "drawtext",
            options: {
                "text": "以后叫他天天改报告",
                "x": "(w-text_w)/2",
                "y": "h-text_h-4",
                "enable": "between(t,18.06,19.56)",
                "fontfile": "siyunheiti",
                "fontcolor": "white",
                "fontsize": "24"
            }
        },
        {
            filter: "drawtext",
            options: {
                "text": "天天改 天天改",
                "x": "(w-text_w)/2",
                "y": "h-text_h-4",
                "enable": "between(t,19.59,21.60)",
                "fontfile": "siyunheiti",
                "fontcolor": "white",
                "fontsize": "24"
            }
        },
    ]
).save("public/123.gif").on('end', function () {
    console.log('Convert Success');
})