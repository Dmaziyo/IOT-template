"use strict";

/**
 * bicycle service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::bicycle.bicycle", ({ strapi }) => ({
  changeState: async (bicycleId) => {
    let result = await strapi.services["api::bicycle.bicycle"].findOne(
      bicycleId
    );
    console.log(result);
    result.state = !result.state;
    // 使用entityService来自己实现
    await strapi.entityService.update("api::bicycle.bicycle", bicycleId, {
      data: {
        ...result,
      },
    });
    return {
      code: 200,
      msg: "修改状态成功",
      curState: result.state,
      pastState: !result.state,
    };
  },
  updateGPS: async (bicycleId, GPS) => {
    let result = await strapi.services["api::bicycle.bicycle"].findOne(
      bicycleId
    );
    result.GPS = GPS;
    // 使用entityService来自己实现
    await strapi.entityService.update("api::bicycle.bicycle", bicycleId, {
      data: {
        ...result,
      },
    });
    return {
      code: 200,
      msg: "修改GPS成功",
    };
  },
  updatePower: async (bicycleId, power) => {
    let result = await strapi.services["api::bicycle.bicycle"].findOne(
      bicycleId
    );
    result.power = power;
    // 使用entityService来自己实现
    await strapi.entityService.update("api::bicycle.bicycle", bicycleId, {
      data: {
        ...result,
      },
    });
    return {
      code: 200,
      msg: "修改电量成功",
    };
  },
}));
