#!/usr/bin/python3
# -*- coding: UTF-8 -*-
"""
工具类，基于 python3.7 制作
author:msxiehui@163.com
datatime: 2020-03-30 20:00
version:1.0
Licensed under the MIT license - http://opensource.org/licenses/MIT
"""
import json
import os
import datetime
import time


class util:
    __version__ = "1.0"
    def __init__(self):
        print('hi')

    """
    # 静态方法 生成目录
    :param String dirName 目录路径，递归生成
    """
    @classmethod
    def makdir(cls, dirName):
        path = os.path.abspath(dirName)
        if not os.path.exists(path):
            try:
                # 没有返回值，所以不报错就认为创建完毕
                os.makedirs(path)
                return path
            except:
                return False
        else:
            return dirName


    """
    # 静态方法 写日志
    :param String file 日志文件夹名
    :param String str 日志内容
    :param String type 日志类型
    """
    @classmethod
    def writeLog(cls, file, str, type='debug'):
        _path = file[0:file.rfind("/")]
        if not util.makdir(_path):
            raise Exception("文件夹不存在", _path)
            return False
        __file = open(file, 'a+')
        __file.writelines(util.getDateTime()+" "+type + ':' + str + '\n')
        __file.close()

    """
     静态方法 读配置
     :param String file 配置文件
     :param String key KEY值 为空或者不传。返回所有
     :return Dict/Value 返回配置字典或值
    """
    @classmethod
    def getConfig(cls, file, key=''):
        if not os.path.exists(file):
            raise Exception("配置文件不存在", file)
            return False
        __file = open(file, 'r+')
        __str = __file.readline()
        __file.close()

        # 转换为 json 格式的字符串
        if not util.isStr(__str) or len(__str)<=0:
            return ''

        __config=json.loads(__str)
        # 替换单引号为双引号，否则无法转为字典
        if not util.isDict(__config):
            __config=__config.replace('\'', '\"')
            # 重新转为字典
            __config = json.loads(__config)

        if key !='':
          return __config.get(key)
        else:
            return __config


    # 静态方法 写配置
    @classmethod
    def setConfig(cls, file, key,value):
        try:
            _path = file[0:file.rfind("/")]
            if not util.makdir(_path):
                raise Exception("文件夹不存在", _path)
                return False
            # 如果文件存在，就取读取文件
            if os.path.exists(file):
                __config=util.getConfig(file)
                if(util.isDict(__config)):
                    __config[key] =value
                else:
                    __config={key:value}
            else:
                __config = {key: value}

            __config = json.dumps(__config)

            __file = open(file, 'w+')
            __file.write(__config)
            __file.close()
            return True
        except:
            raise Exception("配置写入失败", file)
            return False

    # 判断是否为字符串
    @classmethod
    def isStr(cls, __str):
        return isinstance(__str, str)

    # 判断是否为列表
    @classmethod
    def isList(cls, __list):
        return isinstance(__list, list)

    # 判断是否为集合
    @classmethod
    def isSet(cls, __set):
        return isinstance(__set, set)

    # 判断是否为 字典
    @classmethod
    def isDict(cls, __dict):
        return isinstance(__dict, dict)

    # 判断是否为元组
    @classmethod
    def isTuple(cls, __tupe):
        return isinstance(__tupe, tuple)

    # 判断是否为isDateTime
    @classmethod
    def isDateTime(cls, __dt):
        return isinstance(__dt, datetime.datetime)

    # 判断是否为数字 整数或者浮点数
    @classmethod
    def isNum(cls, __num):
        try:
            __num + 1
        except TypeError:
            return False
        else:
            return True

    """
    # 日期时间格式化
    # @param type  0为 返回日期时间， 1为 返回日期 2为返回时间
    # @param List/String time 需要转行的日期时间，None 代表获取当前日期时间
       List: [年，月，日，时，分，秒]
       String: "2020-01-01 15:00:00" 或者 "2020/01/01 15:00:00"
       其他格式不支持
    # @param format 返回的时间格式
    # @return string 日期时间的文本格式
    """

    @classmethod
    def getDateTime(cls, __type=0, __time=None, __format=None):

        # 默认格式 处理时间格式
        _format = '%Y-%m-%d %H:%M:%S'
        # 时间为空时，获取当前时间的时间日期
        if __format is None:
            if __type == 1:
                _format = "%Y-%m-%d"
            elif __type == 2:
                _format = "%H:%M:%S"
        else:
            _format = __format

        # 当time参数为空时 直接返回 当前时间格式
        if __time is None:
            return datetime.datetime.now().__format__(_format)

        # 当time 参数不为空时处理
        else:
            _time = []
            _date = []

            # 当时间为日期时间时，直接使用并返回
            if util.isDateTime(__time):
                _dateTime = __time
                return _dateTime.__format__(_format)

            # 当时间为 文本 时，进行格式处理
            if util.isStr(__time):
                # 分割时间日期
                _tmpTime = __time.split(" ")

                # 处理日期 当数组大于1 ，且 类型不为 2 时（日期或日期时间）
                if len(_tmpTime) >= 1 and __type != 2:
                    if _tmpTime[0].count("/") > 1:
                        _date = _tmpTime[0].split("/")

                    elif _tmpTime[0].count("-") > 1:
                        _date = _tmpTime[0].split("-")

                # 处理日期 当数组大于1 ，且 类型为 2 时（单独时间）
                elif len(_tmpTime) >= 1 and __type == 2:
                    if _tmpTime[0].count(":") >= 2:
                        _time = _tmpTime[0].split(":")

                # 处理时间 当数组大于2 ，且 类型为 0或2 时 时（日期时间）
                if len(_tmpTime) >= 2 and (__type == 0 or __type == 2):
                    if _tmpTime[0].count(":") >= 2:
                        _time = _tmpTime[0].split(":")

            # 列表类型
            elif util.isList(__time):

                if len(__time) >= 2 and (__type == 0 or __type == 1):
                    _date = __time[0:3]

                elif len(__time) >= 2 and __type ==2:
                    _time = __time[0:3]

                if len(__time) >= 5 and (__type == 0 or __type == 2):
                    _time = __time[3:6]

            # 未识别的类型
            else:
                #
                raise Exception("无法识别的time类型", __time)
                return False

            # 组合时间格式
            if __type == 1:
                print('date')
                if len(_date) < 3:
                    raise Exception("日期参数小于3", _date)
                    return False
                print(_date)
                return datetime.date(int(_date[0]), int(_date[1]),int( _date[2])).__format__(_format)
            elif __type == 2:

                if len(_time) < 3:
                    raise Exception("时间参数小于3", _time)
                    return False

                return datetime.time(int(_time[0]),int(_time[1]),int(_time[2])).__format__(_format)
            else:
                if len(_date) < 3 or len(_time) < 3:
                    print('error')
                    raise Exception("日期时间参数小于3")
                    return False
                else:
                    # 直接使用 单独的 参数方式传值
                    return datetime.datetime(int(_date[0]), int(_date[1]),int( _date[2]),int(_time[0]),int(_time[1]),int(_time[2])).__format__(_format)

    @classmethod
    def getDate(cls, _time=None, _format='%Y-%m-%d'):
        return util.getDateTime(1, _time, _format)

    @classmethod
    def getTime(cls, _time=None, _format='%H:%M:%S'):
        return util.getDateTime(2, _time, _format)
