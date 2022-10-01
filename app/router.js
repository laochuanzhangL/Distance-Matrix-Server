"use strict"

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app
  router.get("/", controller.home.index)
  router.post("/idSearch", controller.search.idSearch) //两个数组
  router.post("/msgSearch", controller.search.msgSearch) //两点距离
}
