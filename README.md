# 项目说明

接口通过调用高德地图的接口返回两点之间的距离，求出距离矩阵

## 使用说明

`/idSearch` ：传入参数两个数组，数组中是各个点的nodeId（需要数据库），求出的是距离矩阵，并添加到数据库中

`/msgSearch`  : 传入参数两个数组，数组中是各个点的经纬度，求出两点之间的路径距离并返回



### 如何启动

```bash
$ npm i 安装依赖
$ npm run dev 启动egg服务
$ open http://localhost:7002/ 根据此路径进行调用
```


