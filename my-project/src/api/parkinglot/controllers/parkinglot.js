"use strict";

/**
 * parkinglot controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::parkinglot.parkinglot",
  ({ strapi }) => ({
    // 获取所有正在上班的人
    async add() {
      return await strapi.services["api::parkinglot.parkinglot"].changeParklot(
        "+"
      );
    },

    async initParkinglot() {
      return await strapi.services["api::parkinglot.parkinglot"].changeParklot(
        "0"
      );
    },

    // 自制create，会判断是否存在该卡号
    async minus() {
      return await strapi.services["api::parkinglot.parkinglot"].changeParklot(
        "-"
      );
    },

    async find(ctx) {
      const { data } = await super.find(ctx);
      console.log(data);
      return { code: 200, usingNum: data.attributes.num };
    },
  })
);
