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
      let results = await ctx.service.getDisService.getIdDis(pointsMsg)
      const { status, result } = results
      if (results.status) {
        ctx.body = {
          status,
          data: result,
          message: "计算成功",
        }
      } else {
        ctx.body = {
          status,
          message: "计算失败",
        }
      }
    }
  }
  async msgSearch() {
    const { app, ctx } = this
    const data = this.ctx.request.body
    const { start, end } = data
    let results = await ctx.service.getDisService.getMsgDis(start, end)
    ctx.body = {
      data: results,
      status: 200,
    }
  }
}
module.exports = HomeController
