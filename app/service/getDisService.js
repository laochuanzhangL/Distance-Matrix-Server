"use strict"
const md5 = require("md5")
const Service = require("egg").Service
let mapkey = ""
let privatekey = ""
class getDisService extends Service {
  async getIdDis(pointsMsg) {
    let status = 200
    const { endId, startId, startLatLng, endLatLng } = pointsMsg
    let results = []
    let startStr = await this.getStartString(startLatLng)
    for (let i in endLatLng) {
      let endStr = await this.getEndString(endLatLng, i)
      let sig = md5(
        `destination=${endStr}&key=${mapkey}&origins=${startStr}&type=1${privatekey}`
      )
      let temp = await this.app.curl(
        `//restapi.amap.com/v3/distance?key=${mapkey}&origins=${startStr}&destination=${endStr}&type=1&sig=${sig}`,
        {
          method: "GET",
          dataType: "json",
        }
      )
      const result = temp.data.results
      for (let item of result) {
        const { origin_id, distance } = item
        const startIndex = parseInt(origin_id) - 1
        const endIndex = i
        item.origin_id = startId[startIndex]
        item.dest_id = endId[endIndex]
        item.distance = parseFloat(item.distance)
        try {
          const insertResult = await this.app.mysql.insert("edges", {
            from_node: startId[startIndex],
            to_node: endId[endIndex],
            distance,
          })
          if (insertResult.affectedRows !== 1) status = 0
        } catch (err) {
          continue
        }
      }
      results.push(result)
    }
    return { status, result: results }
  }
  async getMsgDis(start, end) {
    let results = []
    let startStr = await this.getStartString(start)
    for (let i in end) {
      let endStr = await this.getEndString(end, i)
      let sig = md5(
        `destination=${endStr}&key=${mapkey}&origins=${startStr}&type=1${privatekey}`
      )
      let temp = await this.app.curl(
        `//restapi.amap.com/v3/distance?key=${mapkey}&origins=${startStr}&destination=${endStr}&type=1&sig=${sig}`,
        {
          method: "GET",
          dataType: "json",
        }
      )
      const result = temp.data.results
      result.map((item) => {
        item.dest_id = parseInt(i) + 1
        item.origin_id = parseInt(item.origin_id)
      })
      const data = {
        result,
      }
      results.push(data)
    }
    return results
  }

  async getStartString(arr) {
    let str = ""
    let len = arr.length
    arr.map((item, index) => {
      const { lng, lat } = item
      index == len - 1
        ? (str += lng + "," + lat)
        : (str += lng + "," + lat + "|")
    })
    return str
  }

  async getEndString(arr, i) {
    const { lng, lat } = arr[i]
    let str = lng + "," + lat
    return str
  }
}
module.exports = getDisService
