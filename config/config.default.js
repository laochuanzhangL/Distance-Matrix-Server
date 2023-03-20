/* eslint valid-jsdoc: "off" */

"use strict"

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1657795847979_4216"

  // add your middleware config here
  config.middleware = []

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ["*"],
  }
  config.cors = {
    origin: "*",
    credentials: true,
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
  }

  config.mysql = {
    // database configuration
    client: {
      // host
      host: "42.192.236.76",
      // port
      port: "3306",
      // username
      user: "root",
      // password
      password: "YiBamJ1T",
      // database
      database: "pathdemo",
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  }

  config.cluster = {
    listen: {
      port: 7002,
    },
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  return {
    ...config,
    ...userConfig,
  }
}
