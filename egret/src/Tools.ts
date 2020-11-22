/**
 * 静态工具类
 * @Author: msxiehui
 * @Date:   2020-11-18 17:36
 * @Version 1.0
 * @description: 不同时期制作和完善的工具类
 * @update: 2020-11-18 17:36
 */

class Tools {
    public instance;

    constructor() {
        if (!this.instance) {
            this.instance = new Tools()
            // console.log("新建Tools")
        }
        return this.instance;
    }

    public static scale: number = 0;
    public static bodyW: number = 0;
    public static bodyH: number = 0;
    public static diffX: number = 0;
    public static diffY: number = 0;
    public static stageW: number = 0;
    public static stageH: number = 0;
    public static designW: number = 0;
    public static designH: number = 0;
    public static offsetY: number = 0;
    public static AlertWindow;

    /**
     * 初始化，需要在项目 main 使用
     * @param w 舞台宽度
     * @param h 舞台高度
     * @param dw 设计宽度
     * @param dh 设计高度
     */
    public static init(w: number, h: number, dw: number = 750, dh: number = 1624) {
        // console.log("Tools.init",w,h,dw,dh)
        Tools.bodyW = document.body.clientWidth;
        Tools.bodyH = document.body.clientHeight;
        Tools.scale = Tools.bodyW / Tools.bodyH;

        Tools.stageW = w
        Tools.stageH = h
        Tools.designW = dw
        Tools.designH = dh

        Tools.diffX = Tools.stageW - Tools.designW >> 1;
        Tools.diffY = Tools.stageH - Tools.designH >> 1;
        Tools.offsetY = (h - dh) / 2
    }

    /**
     * 根据name关键字创建一个Bitmap对象。
     * @param name  name属性请参考resources/resource.json配置文件的内容。
     * @param x {number} x=0 X坐标位置
     * @param y {number} y=0 Y 坐标位置
     * @param alpha {number} alpha=1 透明度
     */
    public static createBitmapByName(name: string, x = 0, y = 0, alpha = 1) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        result.x = x
        result.y = y
        result.alpha = alpha

        return result;
    }

    /**
     * 原地渐变显示
     * @param target  需要显示的目标
     * @param prent  目标的父级
     * @param from  初始的透明度  默认： 0
     * @param to  目标透明度 默认：1
     * @param time 渐变时间 默认：500ms
     * @param ease 缓动函数 默认：egret.Ease.backOut
     * @param callback 完成事件
     * @param wait  延迟执行 默认：0
     */
    public static fadeIn(target, prent, from: number = 0, to: number = 1, time: number = 500, ease = egret.Ease.backOut, callback = null, wait = 0) {
        target.alpha = from;
        prent.addChild(target);
        egret.Tween.get(target).wait(wait).to({alpha: to}, time, ease)

        if (callback != null) {
            callback()
        }
    }

    /**
     * 渐变显示--从下弹出
     * @param target  需要显示的目标
     * @param prent  目标的父级
     * @param from  初始的透明度  默认： 0
     * @param to  目标透明度 默认：1
     * @param time 渐变时间 默认：500ms
     * @param ease 缓动函数 默认：egret.Ease.backOut
     * @param callback 完成事件
     * @param wait  延迟执行 默认：0
     */
    public static fadeInUp(target, prent, from: number = 0, to: number = 1, time: number = 500, ease = egret.Ease.backOut, callback = null, wait = 0) {
        target.alpha = from;
        prent.addChild(target);
        let dy = target.y
        target.y = dy + 20
        egret.Tween.get(target).wait(wait).to({alpha: to, y: dy}, time, ease)

        if (callback != null) {
            callback()
        }
    }

    /**
     * 原地渐变隐藏
     * @param target 需要隐藏的目标
     * @param prent 目标的父级
     * @param from   初始的透明度  默认：1
     * @param to 目标透明度 默认：0
     * @param time 渐变时间 默认：500ms
     * @param ease 缓动函数 默认：egret.Ease.backOut
     * @param callback 完成事件
     * @param wait 延迟执行 默认：0
     */
    public static fadeOut(target, prent, from: number = 1, to: number = 0, time: number = 500, ease = egret.Ease.backOut, callback = null, wait = 0) {
        target.alpha = from;
        // prent.addChild(target);
        egret.Tween.get(target).wait(wait).to({alpha: to}, time, ease).call(function () {
            prent.removeChild(target);
            if (callback != null) {
                callback()
            }
        })
    }

    /**
     * 原地渐变隐藏
     * @param target 需要隐藏的目标
     * @param prent 目标的父级
     * @param from   初始的透明度  默认：1
     * @param to 目标透明度 默认：0
     * @param time 渐变时间 默认：500ms
     * @param ease 缓动函数 默认：egret.Ease.backOut
     * @param callback 完成事件
     * @param wait 延迟执行 默认：0
     */
    public static fadeOutUp(target, prent, from: number = 1, to: number = 0, time: number = 500, ease = egret.Ease.backOut, callback = null, wait = 0) {
        target.alpha = from;
        // prent.addChild(target);
        egret.Tween.get(target).wait(wait).to({alpha: to, y: target.y - 20}, time, ease).call(function () {
            prent.removeChild(target);
            if (callback != null) {
                callback()
            }
        })
    }

    /**
     * 放大进入
     * @param target 需要隐藏的目标
     * @param prent 目标的父级
     * @param from   初始的缩放值  默认：0.2
     * @param to 目标缩放值 默认：1
     * @param time 渐变时间 默认：500ms
     * @param ease 缓动函数 默认：egret.Ease.backOut
     * @param callback 完成事件
     * @param wait 延迟执行 默认：0
     */
    public static scaleIn(target, prent, from: number = 0.2, to: number = 1, time: number = 500, ease = egret.Ease.backOut, callback = null, wait = 0) {
        //  console.time("scaleIn");
        //   if(!target.resetType){
        //       target.resetType=true;
        //       target.anchorOffsetX=target.width/2
        //       target.anchorOffsetY=target.height/2
        //       target.x=target.x+target.width/2;
        //       target.y=target.y+target.height/2;
        //   }

        target.alpha = 0;
        target.scaleX = from;
        target.scaleY = from;
        prent.addChild(target);
        egret.Tween.get(target).wait(wait).to({alpha: 1, scaleX: to, scaleY: to}, time, ease).wait(0).call(function () {

            //   console.timeEnd("scaleIn");
            if (callback != null) {
                callback()
            }

        });

    }
    /**
     * 放大退出
     * @param target 需要隐藏的目标
     * @param prent 目标的父级
     * @param from   初始的缩放值  默认：1
     * @param to 目标缩放值 默认：0
     * @param time 渐变时间 默认：500ms
     * @param ease 缓动函数 默认：egret.Ease.backOut
     * @param callback 完成事件
     * @param wait 延迟执行 默认：0
     */
    public static scaleOut(target, prent, from: number = 1, to: number = 0.2, time: number = 500, ease = egret.Ease.backIn, callback = null) {

        //  console.time("scaleOut");

        if (!target.resetType) {
            target.resetType = true;
            target.anchorOffsetX = target.width / 2
            target.anchorOffsetY = target.height / 2
            target.x = target.x + target.width / 2;
            target.y = target.y + target.height / 2;
        }

        target.scaleX = from;
        target.scaleY = from;
        prent.addChild(target);

        egret.Tween.get(target).to({alpha: 0, scaleX: to, scaleY: to}, time, ease).call(function () {
            prent.removeChild(target);
            //    console.timeEnd("scaleOut");
            if (callback != null) {
                callback()
            }
        })

    }

    /**
     * 获取随机数
     * @param Min
     * @param Max
     */
    public static rand(Min, Max): number {
        let Range: number = Max - Min;
        let Rand: number = Math.random();
        return (Min + Math.round(Rand * Range));
    }


    /**
     * 碰撞检测
     * @param obj1  需要检测的物体1
     * @param obj2  需要检测的物体2
     */
    public static hitTest(obj1: egret.DisplayObject, obj2: egret.DisplayObject): boolean {
        let rect1: egret.Rectangle = obj1.getBounds();

        let rect2: egret.Rectangle = obj2.getBounds();

        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        return rect1.intersects(rect2);
    }

    /**
     * 基于矩形的碰撞检测
     * @param obj1  需要检测的物体1
     * @param obj2  需要检测的物体2
     * @
     */
    public static hit_sub(obj1: egret.DisplayObject, obj2: egret.DisplayObject): boolean {
        let rect1: egret.Rectangle = obj1.getBounds();
        let rect2: egret.Rectangle = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.parent.x + obj2.x;
        rect2.y = obj2.parent.y + obj2.y;
        rect2.width = obj2.width;
        rect2.height = obj2.height;
        return rect1.intersects(rect2);
    }

    /**
     * 判断两矩形是否相交
     * @param x1
     * @param y1
     * @param w1
     * @param h1
     * @param x2
     * @param y2
     * @param w2
     * @param h2
     */

    public static hit2(x1, y1, w1, h1, x2, y2, w2, h2) {
        // 矩形A位于矩形B的右侧
        if (x1 >= x2 && x1 >= x2 + w2) {
            return false;
            // 矩形A位于矩形B的左侧
        } else if (x1 <= x2 && x1 + w1 <= x2) {
            return false;
            // 矩形A位于矩形B的下侧
        } else if (y1 >= y2 && y1 >= y2 + h2) {
            return false;
            // 矩形A位于矩形B的上侧
        } else if (y1 <= y2 && y1 + h1 <= y2) {
            return false;
        }
        // 不相交都不满足，那就是相交了
        return true;
    }

    /**
     * 生成全局的 Loading 页面
     * @param str  需要显示的 文本
     * @constructor
     */
    public static Alert_loading_add(str: string): void {
        //    let bg=myTool.drawRect(myTool.getStageW(),myTool.getStageH());
        if (Tools.AlertWindow) {
            try {
                let text = Tools.AlertWindow.getChildByName('text')
                if (text) {
                    text.text = str;
                }
            } catch (e) {
            }
            return;
        }

        let bg = Tools.drawRect(0, 0, Tools.designW, Tools.designH, 0x0000);
        bg.touchEnabled = true
        bg.alpha = 0.4;
        Tools.AlertWindow = new egret.Sprite();
        Tools.AlertWindow.addChild(bg);
        let t: egret.TextField = new egret.TextField();
        t.name = "text"
        t.width = Tools.designW;
        t.textAlign = "center";
        t.height = 40;
        t.text = str;
        t.y = Tools.designH / 2 - 20;
        Tools.AlertWindow.addChild(t);
        Tools.AlertWindow.touchEnabled = true;
        Tools.AlertWindow.x = Tools.diffX
        Tools.AlertWindow.y = Tools.diffY

        // console.log(Tools.diffX)
        // console.log(Tools.diffY)
        let stage = egret.MainContext.instance.stage;

        stage.addChildAt(Tools.AlertWindow, stage.numChildren + 1);


    }

    /**
     * 删除 全局的Loading
     * @constructor
     */
    public static Alert_loading_remove(): void {
        if (Tools.AlertWindow != null) {
            console.debug('Remvoie')
            let stage = egret.MainContext.instance.stage;
            stage.removeChild(Tools.AlertWindow);
            Tools.AlertWindow = null;
        }
    }

    /**
     * 下载远程图片并回调
     * @param url  远程图片链接
     * @param callback  成功回调
     * @param error  失败回调
     */
    public static getImg(url, callback, error = null) {
        let imgLoader: egret.ImageLoader = new egret.ImageLoader;
        imgLoader.crossOrigin = "anonymous";

        imgLoader.once(egret.Event.COMPLETE, callback, this);

        if (error != null) {
            imgLoader.once(egret.IOErrorEvent.IO_ERROR, error, this);
        }
        imgLoader.load(url);
    }

    /**
     * 异步获取 远程图片，并生成 BitMap 类型返回----使用 Promise方式
     * @param url 链接
     */
    public static getImgOfBitmap(url) {
        return new Promise((resolve, reject) => {
            Tools.getImg(url, function (data) {
                let imageLoader = <egret.ImageLoader>data.currentTarget;
                let texture = new egret.Texture();
                texture._setBitmapData(imageLoader.data);
                let box: egret.Bitmap = new egret.Bitmap(texture);
                resolve(box);
            }, function (error) {
                reject(error);
            })
        })
    }

    /**
     * 给物体增加 阴影
     * @param obj
     */
    public static filters_shadow(obj: egret.DisplayObject) {
        let distance: number = 6;           /// 阴影的偏移距离，以像素为单位
        let angle: number = 45;              /// 阴影的角度，0 到 360 度
        let color: number = 0x000000;        /// 阴影的颜色，不包含透明度
        let alpha: number = 0.7;             /// 光晕的颜色透明度，是对 color 参数的透明度设定
        let blurX: number = 16;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
        let blurY: number = 16;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        let strength: number = 0.65;                /// 压印的强度，值越大，压印的颜色越深，而且阴影与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        let quality: number = egret.BitmapFilterQuality.LOW;              /// 应用滤镜的次数，暂无实现
        let inner: boolean = false;            /// 指定发光是否为内侧发光
        let knockout: boolean = false;            /// 指定对象是否具有挖空效果
        let dropShadowFilter: egret.DropShadowFilter = new egret.DropShadowFilter(distance, angle, color, alpha, blurX, blurY,
            strength, quality, inner, knockout);
        obj.filters = [dropShadowFilter];

    }

    /**
     * 用于 TS 操作  DOM 元素的显示
     * @param id  元素ID值
     * @param alpha  目标透明度
     */
    public static fadeIn_html(id, alpha = 1): void {
        var elem = document.getElementById(id)
        elem.style.opacity = "0";

        elem.style.display = "block";
        var i = 0;
        var ss = setInterval(function () {
            i++
            elem.style.opacity = (0.1 * i).toString()

            if (elem.style.opacity >= alpha.toString()) {
                clearInterval(ss);
            }
            // console.log("fadeOut_html+++")
            if (i > 10) {
                clearInterval(ss);
            }
        }, 20)
    }

    /**
     * 用于 TS 操作  DOM 元素的 隐藏
     * @param id  元素ID值
     * @param alpha  初始透明度
     */
    public static fadeOut_html(id: string, alpha: number = 1): void {
        var elem = document.getElementById(id);
        elem.style.opacity = alpha.toString();

        var i = 0;
        var ss = setInterval(function () {
            i++
            elem.style.opacity = (alpha - 0.1 * i).toString();
            // console.log("fadeOut_html---")
            if (i > 10) {
                elem.style.display = "none"
                clearInterval(ss);
            }
        }, 20)
    }

    /**
     * 将元素重置为灰色
     * @param m
     */
    public static grey(m: egret.DisplayObject): void {
        var colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        m.filters = [colorFlilter];
    }

    /**
     * 将 元素的恢复彩色
     * @param m
     */
    public static colors(m: egret.DisplayObject): void {
        m.filters = [];
    }

    /**
     * 绘制圆角矩形
     * @param x x值
     * @param y y值
     * @param w 宽度
     * @param h 高度
     * @param ew 圆角宽度
     * @param wh 圆角高度
     * @param color 填充颜色
     * @param alpha 透明度
     * @return egret.Shape
     */
    public static drawRoundRect(x = 0, y = 0, w = 100, h = 100, ew: number = 5, wh: number = 5, color = 0x000000, alpha = 1) {
        let d: egret.Shape = new egret.Shape();
        d.graphics.beginFill(color, alpha);
        d.graphics.drawRoundRect(0, 0, w, h, ew, wh);
        d.graphics.endFill();
        d.x = x
        d.y = y
        return d;

    }
    /**
     * 绘制 矩形
     * @param x x值
     * @param y y值
     * @param w 宽度
     * @param h 高度
     * @param color 填充颜色
     * @param alpha 透明度
     * @return egret.Shape
     */
    public static drawRect(x = 0, y = 0, w: number = 100, h: number = 50, color: number = 0xff00ff, alpha = 1): egret.Shape {
        var d: egret.Shape = new egret.Shape();
        d.graphics.beginFill(color, alpha);
        d.graphics.drawRect(0, 0, w, h);
        d.graphics.endFill();
        d.x = x
        d.y = y
        return d;
    }

    /**
     * 绘制圆形
     * @param radius 直径
     * @param color  颜色
     * @return egret.Shape
     */
    public static drawCircle(radius: number = 50, color: number = 0xff00ff): egret.Shape {
        var d: egret.Shape = new egret.Shape();
        d.graphics.beginFill(color);
        d.graphics.drawCircle(0, 0, radius)
        d.graphics.endFill();
        return d;
    }

    /**
     * 封装POST方法，
     * @param url 链接地址
     * @param data:string POST的数据 键值对 a=1&b=2
     * @param callbak 成功回调
     * @param error 失败回调
     * @param type 返回的文本类型
     * @deprecated 放弃
     */
    public static post(url: string, data: string, callbak = null, error = null, type: String = "json") {
        // return;
        var loader: egret.URLLoader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function (e: egret.Event) {
            var loader: egret.URLLoader = <egret.URLLoader>e.target;
            var data: egret.URLVariables = loader.data;
            // console.log("myTool->post:" + data.toString());
            if (callbak != null) {
                if (type == "json") {
                    var obj = {};
                    obj = eval('(' + decodeURI(data.toString()) + ')');
                    callbak(obj);
                } else {
                    callbak(data);
                }

            }
        }, this);
        loader.addEventListener(egret.IOErrorEvent.IO_ERROR, function (e: egret.IOErrorEvent): void {
            // console.log("myTool->post error : " + e);
            if (error != null) {
                error(e);
            }
        }, this);
        let request: egret.URLRequest = new egret.URLRequest(url);
        request.method = egret.URLRequestMethod.POST;
        //增加协议头
        // let header: egret.URLRequestHeader = new egret.URLRequestHeader("TOKEN");
        let header2: egret.URLRequestHeader = new egret.URLRequestHeader("Content-Type", 'application/json');
        // request.requestHeaders.push(header);
        request.requestHeaders.push(header2);
        request.data = new egret.URLVariables(data);
        request.data = data;
        loader.load(request);
    }

    /**
     * ajax 请求接口，类型为POST，--使用 Promise 方式
     * @param url 需要访问的链接
     * @param data POST的数据  默认：空
     * @param isLoading 是否显示 Loading 默认：true
     * @param str  Loading的提示信息 默认：'加载中...'
     */
    public static ajax(url: string, data: string = "", isLoading: boolean = true, str: string = '加载中...') {

        if (isLoading) {
            Tools.Alert_loading_add(str)
        }
        return new Promise((resolve, reject) => {
            var loader: egret.URLLoader = new egret.URLLoader();
            loader.addEventListener(egret.Event.COMPLETE, function (e: egret.Event) {
                Tools.Alert_loading_remove()
                var loader: egret.URLLoader = <egret.URLLoader>e.target;
                let data = JSON.parse(loader.data)
                //全局处理 返回信息 200 为成功。直接传入 data值。
                if (data.code == 200) {
                    resolve(data.data);
                } else {
                    // 非200的直接作为错误处理，这里是业务错误
                    reject({status: true, data});
                }

            }, this);
            loader.addEventListener(egret.IOErrorEvent.IO_ERROR, function (e: egret.IOErrorEvent): void {
                //这里是接口错误 注意区分 status 的值
                Tools.Alert_loading_remove()
                reject({status: false, error: e});
            }, this);

            let request: egret.URLRequest = new egret.URLRequest(url);
            request.method = egret.URLRequestMethod.POST;
            //增加协议头
            // let header: egret.URLRequestHeader = new egret.URLRequestHeader("TOKEN", GameData.openid);
            let header2: egret.URLRequestHeader = new egret.URLRequestHeader("Content-Type", 'application/json');
            // request.requestHeaders.push(header);
            request.requestHeaders.push(header2);
            request.data = data;
            // request.data = new egret.URLVariables(data);
            loader.load(request);
        })

    }

    /**
     * 通过URL 获取图片
     * @param url
     * @param callbak
     * @param error
     * @deprecated 弃用
     */
    public static getUrlImg(url: string, callbak = null, error = null) {
        //创建 URLLoader 对象
        var loader: egret.URLLoader = new egret.URLLoader();
        //设置加载方式
        loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        //添加加载完成侦听
        loader.addEventListener(egret.Event.COMPLETE, function (event: egret.Event) {
            var loader: egret.URLLoader = <egret.URLLoader>event.target;
            //获取加载到的对象
            var data: any = loader.data;
            if (callbak != null) {
                callbak(data);
            }
        }, this);
        loader.addEventListener(egret.IOErrorEvent.IO_ERROR, function (e: egret.IOErrorEvent): void {
            // console.log("myTool->post error : " + e);
            if (error != null) {
                error(e);
            }
        }, this);

        var request: egret.URLRequest = new egret.URLRequest(url);
        //开始加载
        loader.load(request);
    }

    /**
     * 通过 ID 获取 DOM的操作对象
     * @param str
     */
    public static getID(str: string) {
        return document.getElementById(str);
    }

    /**
     * 判断名称是否为空
     * @param name
     */
    public static isName(name: string): boolean {
        if (name != "" || name.search(/^[\u0391-\uFFE5\w]+$/) != -1) {
            return true;
        }
        return false;
    }

    /**
     * 判断是否为手机号
     * @param str
     */
    public static isPhone(str: string): boolean {
        var pattern = /^1[3456789]\d{9}$/;
        if (pattern.test(str)) {
            return true;
        }
        return false;
    }

    /**
     * 验证邮箱
     * @param str
     */
    public static isEmail(str: string): boolean {
        var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
        if (re.test(str)) {
            return true;
        }
        return false;
    }

    /**
     * 判断 openid是否为空值
     * @param wxid
     * @deprecated 弃用
     */
    public static isOpenID(wxid: string): boolean {
        // console.log("检查：是否是OPENID---->",typeof (wxid));
        var n: number = parseInt(wxid);
        if (typeof (wxid) == "undefined" || wxid == "" || wxid == null) {
            return false;
        } else if (n <= 0 || wxid == "undefined" || wxid == "null") {
            return false;
        } else {
            return true
        }
    }

    /**
     * 返回 元素 在数组中的位置；
     * @param n {any} 需要查找的元素。
     * @param arr {any} 元素所在数组。
     * @return {number}
     */
    public static getArrNum(n: any, arr: Array<any>): number {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === n) {
                return i;
            }
        }
        return -1;
    }
    /**
     * 根据 参数名 获取 URL 参数值
     * @since  1.0.1
     * @param {String} 传入的参数名
     * @returns {String} 参数值
     * @example
     * <p>   str = "2"
     */
    public static getArg (name) {
        let url = document.location.href;
        let arrStr = url.substring(url.indexOf("?") + 1).split("&");
        for (let i = 0; i < arrStr.length; i++) {
            let loc = arrStr[i].indexOf(name + "=");
            if (loc != -1) {
                return arrStr[i].replace(name + "=", "").replace("?", "");
                break;
            }
        }
        return "";
    }
    /**
     * 跳转授权页
     * @param wxid {string}
     * @deprecated 弃用
     */
    public static reUrl(wxid: string): boolean {
        if (Tools.isOpenID(wxid) == false) {
            if (window.confirm('用户信息获取失败！是否刷新页面？')) {
                var Reurl = "index.php";
                window.location.href = Reurl;
                // window.open(Reurl);
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

    /**
     * 获取项目路径
     * @return {string} 路径文本
     */
    public static getPathName() {
        var webPath = window.location.pathname;
        var num = webPath.indexOf(".");
        if (num != -1) {
            webPath = webPath.substring(0, num);
        }
        var newPath = webPath.substring(0, webPath.lastIndexOf("/"));
        return newPath
    }


    /**
     * 获取项目链接（域名+目录）不包含  文件名 /index.html
     * @since 1.0.5
     * @return {string}
     *
     */

    public static getHost() {
        return window.location.protocol + "//" + window.location.host + Tools.getPathName() + "/";
    }

    /**
     * 根据 图片 name 生成一个 Bitmap对象 并且，设置位置 x,y 根据适配规则，自动调整位置。
     * @param name
     * @param x
     * @param y
     */
    public static createBitmapByNameSetPosition(name: string, x = 0, y = 0, alpha = 1) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);

        result.texture = texture;
        result.x = x + result.width / 2
        result.y = y + Tools.offsetY + result.height / 2
        result.alpha = alpha;
        result.anchorOffsetX = result.width / 2
        result.anchorOffsetY = result.height / 2
        result['oldx'] = x
        result['oldy'] = y

        return result;
    }

    /**
     *  画线
     * @param x
     * @param y
     * @param xx
     * @param yy
     */

    public static createLine(x, y, xx, yy) {
        let line = new egret.Shape()
        line.graphics.lineStyle(1, 0xff00ff)
        line.graphics.moveTo(x, y)
        line.graphics.lineTo(xx, yy)
        line.graphics.endFill()
        return line;
    }

    /**
     * 判断是否为安卓
     * @return {boolean}
     */
    public static isAndroid() {
        var u = navigator.userAgent;
        if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
            return true;
        }
        return false;
    }

    /**
     * 提示信息，2秒后自动关闭
     * @param str  提示文本，建议不要超过2行
     * @param time 关闭时间，默认：2秒
     */
    public static msg(str: string, time: number = 2, callback?: Function) {
        let box: egret.Sprite = new egret.Sprite()
        let label: egret.TextField = new egret.TextField();
        label.width = Tools.stageW * 0.7;
        label.x = Tools.stageW * 0.15
        // label.fontFamily = "Arial";
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;
        label.textColor = 0xffffff;
        label.size = 20;
        label.lineSpacing = 5;
        label.text = str
        //根据高度设置 文本Y的位置  size+linSpacting 的值
        label.y = 25

        //计算背景宽度
        let bgWidth = label.textWidth * 1.4
        if (bgWidth > Tools.stageW * 0.8) {
            bgWidth = Tools.stageW * 0.8
        }
        //高度 =     size+linSpacting *2 的值
        let bgHight = label.textHeight + 50
        let bg = Tools.drawRoundRect((Tools.stageW - bgWidth) / 2, 0, bgWidth, bgHight, 20, 20, 0x000000, 0.8)
        box.addChild(bg)
        box.addChild(label);
        box.y = (Tools.stageH - box.height) / 2
        let stage: egret.Stage = egret.MainContext.instance.stage;
        Tools.fadeInUp(box, stage)
        let timer = new egret.Timer(1000, time)
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function (event: egret.TimerEvent) {
            Tools.fadeOutUp(box, stage)
            if (callback) {
                callback()
            }
        }, this)
        timer.start()
    }

    /**
     * 输出日志信息--用于调试
     * @param message
     * @param optionalParams
     */
    public static log(message?: any, ...optionalParams: any[]): void{
        if (window.debug){
            egret.log(message,...optionalParams)
        }
    }
    /**
     * 输出断言信息--用于调试
     * @param assertion
     * @param message
     * @param optionalParams
     */
    public static assert(assertion?: boolean, message?: string, ...optionalParams: any[]): void{
        if (window.debug){
            egret.assert(assertion,message,...optionalParams)
        }
    }

    /**
     * 输出警告信息--用于调试
     * @param message
     * @param optionalParams
     */
    public static warn(message?: any, ...optionalParams: any[]): void{
        if (window.debug){
            egret.warn(message,...optionalParams)
        }
    }
    /**
     * 输出错误信息--用于调试
     * @param message
     * @param optionalParams
     */
    public static error(message?: any, ...optionalParams: any[]): void{
        if (window.debug){
            egret.error(message,...optionalParams)
        }
    }
}
