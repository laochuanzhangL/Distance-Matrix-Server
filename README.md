# server

接口通过调用高德地图的接口返回两点之间的距离，求出距离矩阵

## QuickStart

<!-- 使用说明 -->

`/idSearch` ：传入参数两个数组，数组中是各个点的信息，求出的是距离矩阵

`/msgSearch`  : 传入两个点的经纬度，求出两点之间的路径距离



### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7002/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org
