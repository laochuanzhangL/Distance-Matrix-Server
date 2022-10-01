const Subscription = require("egg").Subscription
class UpdateDB extends Subscription {
  static get schedule() {
    return {
      type: "worker",
      cron: "0 0 0 * * *",
      // interval: '1h',
      // immediate: true,
    }
  }
  async subscribe() {
    await this.ctx.service.dbService.updateDB()
  }
}

module.exports = UpdateDB
