"use strict";

/**
 * bicycle controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::bicycle.bicycle", ({ strapi }) => ({
  async createBicycle(ctx) {
    let body = ctx.request.body;

    let bicycle = await strapi.services["api::bicycle.bicycle"].create({
      data: {
        publishedAt: new Date(),
        bicycleId: body.bicycleId,
        GPS: body.GPS,
        state: body.state,
        power: body.power,
      },
    });
    return {
      code: 200,
      msg: "添加成功",
      ...bicycle,
    };
  },
  async changeState(ctx) {
    const { id, work_s } = ctx.request.body;
    const result = await strapi.entityService.update(
      "api::bicycle.bicycle",
      id,
      {
        data: {
          state: work_s,
        },
      }
    );
    return {
      code: 200,
      msg: "修改成功",
      result,
    };
  },
}));
