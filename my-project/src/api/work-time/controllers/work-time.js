"use strict";

/**
 * work-time controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::work-time.work-time",
  ({ strapi }) => ({
    // 自制create，会判断是否存在该卡号
    async customCreate(ctx) {
      let record = ctx.request.body;

      let worker = await strapi.services["api::work-time.work-time"].create({
        data: {
          publishedAt: new Date(),
          name: record.name,
          card_num: record.card_num,
          duration: record.duration,
          start_time: record.start_time,
        },
      });
      return {
        code: 200,
        msg: "添加成功",
        ...worker,
      };
    },
  })
);
