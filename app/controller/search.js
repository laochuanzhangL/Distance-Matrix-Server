"use strict"

const Controller = require("egg").Controller
class HomeController extends Controller {
  async idSearch() {
    const { app, ctx } = this
    const data = this.ctx.request.body
    if (!data.start || !data.end) {
      ctx.body = {
        errormessage: "请传入正确参数",
        status: 0,
      }
    } else {
      const { start, end } = data
      let points = await ctx.service.getLatLenService.getLatLen(start, end)
      const pointsMsg = {
        startId: start,
        endId: end,
        startLatLng: points.start,
        endLatLng: points.end,
      }
      let results = await ctx.service.getKeysService.getIdSearch(pointsMsg)
      ctx.body = {
        message: "计算成功",
      }
      const { status } = results
      if (results.status) {
        ctx.body = {
          status,
          data: results.workResults,
          message: "计算成功",
        }
      } else {
        const { errorMsg } = results
        ctx.body = {
          status,
          errorMsg,
        }
      }
    }
  }
  async msgSearch() {
    const { app, ctx } = this
    const data = this.ctx.request.body
    const { start, end } = data
    let results = await ctx.service.getKeysService.getMsgSearch(data)
    const { status } = results
    if (results.status) {
      ctx.body = {
        status,
        data: results.workResults,
        message: "计算成功",
      }
    } else {
      const { errorMsg } = results
      ctx.body = {
        status,
        errorMsg,
      }
    }
  }
}
module.exports = HomeController
