"use strict"
const Service = require("egg").Service
function RunOutError(mapKey) {
  this.message = mapKey
  this.name = "RunOutError"
}
class getLatLenService extends Service {
  async getIdSearch(pointsMsg) {
    const { app, ctx } = this
    try {
      const keys = await app.mysql.select("accounts", {
        where: {
          used: 1,
        },
      })
      if (keys.length === 0) {
        throw new Error("0")
      }
      let { map_key: mapKey, private_key: privateKey } = keys[0]
      let result = await ctx.service.getDisService.getIdDis(
        pointsMsg,
        mapKey,
        privateKey
      )
      if (!result.status) {
        throw new RunOutError(mapKey)
      }
      return {
        status: 200,
        workResults: result.workResults,
      }
    } catch (e) {
      if (e.message == 0) {
        return {
          status: 0,
          errorMsg: "今日请求次数已用完，请明日再用",
        }
      } else if (e instanceof RunOutError) {
        const result = await this.app.mysql.update(
          "accounts",
          { used: 0 },
          {
            where: {
              map_key: e.message,
            },
          }
        )
        return this.getMsgSearch(data)
      } else {
        return {
          errorMsg: e.message,
          status: 0,
        }
      }
    }
  }
  async getMsgSearch(data) {
    const { app, ctx } = this
    try {
      const keys = await app.mysql.select("accounts", {
        where: {
          used: 1,
        },
      })
      if (keys.length === 0) {
        throw new Error("0")
      }
      let { map_key: mapKey, private_key: privateKey } = keys[0]
      let result = await ctx.service.getDisService.getMsgDis(
        data,
        mapKey,
        privateKey
      )
      if (!result.status === 0) {
        throw new RunOutError(mapKey)
      }
      return {
        status: 200,
        workResults: result.workResults,
      }
    } catch (e) {
      if (e.message == 0) {
        return {
          status: 0,
          errorMsg: "今日请求次数已用完，请明日再用",
        }
      } else if (e instanceof RunOutError) {
        const result = await this.app.mysql.update(
          "accounts",
          { used: 0 },
          {
            where: {
              map_key: e.message,
            },
          }
        )
        return this.getMsgSearch(data)
      } else {
        return {
          errorMsg: e.message,
          status: 0,
        }
      }
    }
  }
}
module.exports = getLatLenService
