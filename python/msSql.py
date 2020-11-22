#!/usr/bin/python3
# -*- coding: UTF-8 -*-
"""
工具类，基于 python3.7 制作
author:msxiehui@163.com
datatime: 2020-03-30 20:00
version:1.0
Licensed under the MIT license - http://opensource.org/licenses/MIT
"""

import pymysql

class msSql:
    __db = ''
    __version='1.0'
    __info = {}

    def __init__(self, host, user, password, db, port=3306, charset='utf8'):
        try:
            self.__db = pymysql.connect(host=host,
                                        user=user,
                                        password=password,
                                        db=db,
                                        charset=charset,
                                        port=port)

            # print(self.__db)
            self.__info['host'] = host
            self.__info['user'] = user
            self.__info['password'] = password
            self.__info['db'] = db
            self.__info['charset'] = charset
            self.__info['port'] = port

            # print(self.__info)

        except:
            print("数据库连接错误")
            raise

    def execute(self, sql):
        __cursor = self.__db.cursor()
        # 使用 execute()  方法执行 SQL 查询
        __cursor.execute(sql)
        return __cursor

    def fetchone(self, sql):
        __cursor = self.__db.cursor()
        # 使用 execute()  方法执行 SQL 查询
        __cursor.execute(sql)
        data = __cursor.fetchone()
        return data

    def fetchall(self, sql):
        __cursor = self.__db.cursor()
        # 使用 execute()  方法执行 SQL 查询
        __cursor.execute(sql)
        data = __cursor.fetchall()
        return data

    '''
     @切换 数据库，仅限同一台服务器
    '''
    def useDB(self, dbName):
        self.close()
        self.__init__(self.__info["host"],self.__info["user"],self.__info["password"],dbName,self.__info["port"],self.__info["charset"])

    def close(self):
        if self.__db == "":
            print('error db is null')
            return
        self.__db.close()
