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
    const bicycleId = ctx.params.id;
    const type = +ctx.params.type;
    const body = ctx.request.body;
    switch (type) {
      case 0: {
        let ret = await strapi.services["api::bicycle.bicycle"].updateGPS(
          bicycleId,
          body.GPS
        );
        return ret;
      }
      case 1: {
        let ret = await strapi.services["api::bicycle.bicycle"].updatePower(
          bicycleId,
          body.power
        );
        return ret;
      }
      case 2: {
        let ret = await strapi.services["api::bicycle.bicycle"].changeState(
          bicycleId
        );
        console.log(ret);
        return ret;
      }
    }
    return {
      code: 200,
      msg: "修改成功",
    };
  },
}));
