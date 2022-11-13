"use strict";

/**
 * trespass controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::trespass.trespass",
  ({ strapi }) => ({
    // 自制create，会判断是否存在该卡号
    async customCreate(ctx) {
      let body = ctx.request.body;

      await strapi.services["api::trespass.trespass"].create({
        data: {
          publishedAt: new Date(),
          trespass_time: body.time,
          classroom: body.id,
        },
      });
      return {
        code: 200,
        msg: "添加成功",
      };
    },
  })
);
