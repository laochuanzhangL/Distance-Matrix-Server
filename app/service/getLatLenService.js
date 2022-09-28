"use strict"
const Service = require("egg").Service
class getLatLenService extends Service {
  async getMsg(nodeId) {
    const { app, ctx } = this
    const point = await app.mysql.get("node", { node_id: nodeId })
    const { lat, lng } = point
    const result = { lat, lng }
    return result
  }
  async getLatLen(arrOne, arrTwo) {
    const start = [],
      end = []
    for (let i of arrOne) {
      const point = await this.ctx.service.getLatLenService.getMsg(i)
      start.push(point)
    }
    for (let i of arrTwo) {
      const point = await this.ctx.service.getLatLenService.getMsg(i)
      end.push(point)
    }
    return { end, start }
  }
}
module.exports = getLatLenService
