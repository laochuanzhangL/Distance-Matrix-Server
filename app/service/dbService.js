"use strict"
const Service = require("egg").Service
class getLatLenService extends Service {
  async updateDB() {
    const result = await this.app.mysql.update(
      "accounts",
      { used: 1 },
      {
        where: {
          used: 0,
        },
      }
    )
    console.log(result)
  }
}
module.exports = getLatLenService
