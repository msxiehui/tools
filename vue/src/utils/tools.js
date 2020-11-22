/**
 * tools 用于VUE项目的 JS 组件
 * @Author: msxiehui
 * @Date:   2020-11-22 19:08
 * @Version: 1.0.201122
 * @Update:  2020-11-22 19:15:47
 *
 */

const tools = {
  version: '1.0.201122',
  imgName: function (path) {
    if (path !== '' && path != null && typeof path !== 'undefined') {
      return path.lastIndexOf('/')
    } else {
      return ''
    }
  },
  /**
   * 生成随机数
   * @param Min 最小值
   * @param Max 最大值
   * @returns {*}
   */
  rand: function(Min, Max) {
    const Range = Max - Min
    const Rand = Math.random()
    return (Min + Math.round(Rand * Range))
  },
  /**
   * 深度拷贝，适用于 数组，对象等。
   * @param data
   * @returns {*}
   */
  clone: function (data) {
    if (data) {
      const type = data.constructor
      if (type === Array) {
        const arr = []
        for (let i = 0, len = data.length; i < len; i++) {
          arr.push(tools.clone(data[i]))
        }
        return arr.concat()
      } else if (type === Object) {
        const n = {}
        for (const k in data) {
          n[k] = tools.clone(data[k])
        }
        return Object.assign({}, n)
      } else {
        return data
      }
    } else {
      return data
    }
  },
  /**
   * 获取 对象中 key=X 的对象信息 结构：{key:1,lable:"aa"},{key:2,lable:"bb"}
   * @param obj 获取的Obj对象
   * @param key key的名称，如 ：key
   * @param value key的值 如：1
   * @returns {*} 返回当前一条数据  返回{key:1,lable:"aa"} 为空返回 false
   */
  getObjKey: function (obj, keyName, value) {
    // obj.find(item=>item.key == scope.row.urgency).label
    // console.log("tools.getObjKey");
    for (const item in obj) {
      if (obj[item][keyName] === value) {
        return obj[item]
      }
    }
    return false
  },
  /**
   * 获取 对象中 key=X 的对象信息 结构：{key:1,lable:"aa"},{key:2,lable:"bb"}
   * @param obj 获取的Obj对象
   * @param key key的名称，如 ：key
   * @param value key的值 如：1
   * @returns {*} 返回当前序号  为空返回 -1
   */
  getObjKeyForID: function (obj, keyName, value) {
    // obj.find(item=>item.key == scope.row.urgency).label
    // console.log("tools.getObjKey");
    for (const item in obj) {
      if (obj[item][keyName] === value) {
        return item
      }
    }
    return -1
  },
  /**
   * 获取 对象中 key=X 的对象信息 结构：{key:1,lable:"aa"},{key:2,lable:"bb"}
   * @param obj 获取的Obj对象
   * @param key key的名称，如 ：key
   * @param value key的值 如：1
   * @param isIn  是否获取包含的 数据 如 : key = '1,2,3'  value =1 时， isIn = true 时，同样会返回数据
   * @returns {*} 返回所有相等的数据数组  返回{key:1,lable:"aa"} 为空返回 false
   */
  getObjKeyList: function (obj, keyName, value, isIn) {
    // obj.find(item=>item.key == scope.row.urgency).label
    // console.log("tools.getObjKey");
    const Arr = []
    for (const item in obj) {
      if (obj[item][keyName] === value) {
        Arr.push(obj[item])
      } else if (isIn === true) {
        if (obj[item][keyName] && obj[item][keyName].indexOf(value) !== -1) {
          Arr.push(obj[item])
        }
      }
    }
    return Arr
  },
  getCache: function (name, diff = 7200) {
    const cacheName = 'Cache' + name + '-X'
    const cache = localStorage.getItem(cacheName)
    let val = ''
    if (cache) {
      const data = JSON.parse(cache)
      if (cacheFresh(data.cacheTimestemp, diff)) {
        val = data.val
      } else {
        console.warn('getCache:' + name + '-超时，删除缓存')
        localStorage.removeItem(cacheName)
      }
    }
    return val
  },

  setCache: function (name, val) {
    const cacheName = 'Cache' + name + '-X'
    const data = {}
    data.val = val
    data.cacheTimestemp = Date.now()
    // console.log('setCache:', data)
    return localStorage.setItem(cacheName, JSON.stringify(data))
  },
  removeCache: function (name) {
    const cacheName = 'Cache' + name + '-X'
    return localStorage.removeItem(cacheName)
  },
  log: function (message, ...optionalParams) {
    if (process.env.NODE_ENV === 'development') {
      console.log(message, ...optionalParams)
    }
  },
  error: function (message, ...optionalParams) {
    if (process.env.NODE_ENV === 'development') {
      console.error(message, ...optionalParams)
    }
  },
  warn: function (message, ...optionalParams) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(message, ...optionalParams)
    }
  },
  trace: function (message, ...optionalParams) {
    if (process.env.NODE_ENV === 'development') {
      console.trace(message, ...optionalParams)
    }
  },
  /**
   * 获取时间格式
   * @param date
   * @param type
   * @returns {string}
   */

  getNowFormatDate: function (date, type) {
    if (!date) {
      date = new Date()
    }
    var seperator1 = '-'
    var seperator2 = ':'
    var year = date.getFullYear()
    var month = (date.getMonth() + 1).toString()
    var strDate = date.getDate().toString()
    var hours = date.getHours().toString()
    var minutes = date.getMinutes().toString()
    var sconds = date.getSeconds().toString()
    month = month.length === 1 ? '0' + month : month
    strDate = strDate.length === 1 ? '0' + strDate : strDate
    hours = hours.length === 1 ? '0' + hours : hours
    minutes = minutes.length === 1 ? '0' + minutes : minutes
    sconds = sconds.length === 1 ? '0' + sconds : sconds
    var currentdate
    if (type === 1) {
      currentdate = year + seperator1 + month + seperator1 + strDate
    } else if (type === 2) {
      currentdate = hours + seperator2 + minutes + seperator2 + sconds
    } else if (type === 3) {
      currentdate = year + '年' + month + '月' + strDate + '日'
    } else {
      currentdate = year + seperator1 + month + seperator1 + strDate + ' ' + hours + seperator2 + minutes + seperator2 + sconds
    }
    return currentdate
  },
  /**
   * 将 多维数组 进行组合排列
   * @param arr  传入的数组值  [[],[]]
   * @returns {*} 返回组合后的二维数组
   * @example
   * const arr = [['a', 'b'], [1, 2]]
   * doExchange(arr)
   *  // return [ [ 'a', 1 ], [ 'a', 2 ], [ 'b', 1 ], [ 'b', 2 ] ]
   */
  doExchange: function (arr) {
    const len = arr.length
    // 当数组大于等于2个的时候
    if (len >= 2) {
      // 第一个数组的长度
      var len1 = arr[0].length
      // 第二个数组的长度
      var len2 = arr[1].length
      // 2个数组产生的组合数
      var lenBoth = len1 * len2
      //  申明一个新数组
      var items = new Array(lenBoth)
      // 申明新数组的索引
      var index = 0
      for (var i = 0; i < len1; i++) {
        for (var j = 0; j < len2; j++) {
          if (arr[0][i] instanceof Array) {
            items[index] = arr[0][i].concat(arr[1][j])
          } else {
            items[index] = [arr[0][i]].concat(arr[1][j])
          }
          index++
        }
      }
      var newArr = new Array(len - 1)
      for (let i = 2; i < arr.length; i++) {
        newArr[i - 1] = arr[i]
      }
      newArr[0] = items
      return this.doExchange(newArr)
    } else {
      return arr[0]
    }
  },
  /**
   * 循环数组，更加obj某个 key的值返回 一个二维数组
   * @param arr   obj的数组 格式为：[obj,obj]
   * @param keyName   需要合并的 keyName
   * @param valueName  需要返回的 key值的 keyName
   * @returns {[]}  返回 [ [], [] ]
   * @example
   * const arr = [{id:1,name:"张三"},
   *              {id:1,name:"李四"},
   *              {id:2,name:"王五"},
   *              {id:3,name:"赵六"}]
   * // 执行
   * getArrForObjAttrTovalue(arr,"id",name)
   * // return  [ [ '张三', '李四' ], [ '王五' ], [ '赵六' ] ]
   */
  getArrForObjAttrTovalue: function(arr, keyName, valueName) {
    const arrName = []
    const arrlist = []
    arr.map((item) => {
      // console.log(item[keyName])
      const n = arrName.indexOf(item[keyName])
      if (n === -1) {
        arrName.push(item[keyName])
        arrlist[arrName.length - 1] = []
        arrlist[arrName.length - 1].push(item[valueName])
      } else {
        arrlist[n].push(item[valueName])
      }
    })
    return arrlist
  },
  /**
   * 循环数组，更加obj某个 key的值返回 一个 obj
   * @param arr   obj的数组 格式为：[obj,obj]
   * @param keyName   需要合并的 keyName
   * @returns {[]}  返回 [ [obj,obj], [obj,obj] ]
   * @example
   * const arr = [{id:1,name:"张三"},
   *              {id:1,name:"李四"},
   *              {id:2,name:"王五"},
   *              {id:3,name:"赵六"}]
   * // 执行
   * getArrForObjAttrTovalue(arr,"id",name)
   * // return  [ [ obj, obj ], [ obj ], [ obj ] ]
   */
  getArrForObjAttrTovalueObj: function(arr, keyName) {
    const arrName = []
    const arrlist = []
    arr.map((item) => {
      // console.log(item[keyName])
      const n = arrName.indexOf(item[keyName])
      if (n === -1) {
        arrName.push(item[keyName])
        arrlist[arrName.length - 1] = []
        arrlist[arrName.length - 1].push(item)
      } else {
        arrlist[n].push(item)
      }
    })
    return arrlist
  },

  /**------------------------------------------------cookies操作*/
  /**
   * 写cookies
   * @since  1.0.1
   * @param {String}[name]传入的cookies 名
   * @param {String} [value]传入的cookies 值
   * @param {number} [time] 过期时间 ，单位为 分钟 60*24*7  默认为 7天
   * @example
   * <p>   name = "name"
   */
  setCookie : function (name, value, time) {
    var exp = new Date();
    if (time == null) {
      time = 60 * 24 * 7;
    }
    console.log(time)
    exp.setTime(exp.getTime() + time * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
  },

  /**
   * 取Cookies
   * @since  1.0.1
   * @param {String} name需要取出的cookies 名
   *? @returns {String} cookies 的value值
   * @example
   * <p>   name = "name"
   */
  getCookie : function (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    // eslint-disable-next-line no-cond-assign
    if (arr = document.cookie.match(reg)) {
      return unescape(arr[2]);
    } else {
      return null;
    }
  },

  /**
   *  删除 Cookie
   * @since  1.0.1
   * @param {String} name 需要删除的cookies 名
   * @example
   * <p>   name = "name"
   */
  delCookie : function (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = tools.getCookie(name);
    if (cval != null) {
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
  },

}
/**
 * 判断缓存是否失效
 * @param {*} diff 失效时间差，默认15分钟=900s
 */
const cacheFresh = (cacheTimestemp, diff = 900) => {
  if (cacheTimestemp) {
    return ((Date.now() - cacheTimestemp) / 1000) <= diff
  } else {
    return false
  }
}

export default tools
