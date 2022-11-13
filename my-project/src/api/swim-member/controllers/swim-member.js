"use strict";

/**
 * swim-member controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::swim-member.swim-member",
  ({ strapi }) => ({
    async updateTimes(ctx) {
      const card_num = ctx.params.card;
      const times = ctx.request.body.times;
      // 找到卡号
      let member = await strapi.services[
        "api::swim-member.swim-member"
      ].findCard(card_num);
      if (!member)
        return {
          code: 404,
          msg: "不存在该卡号",
        };
      member.times = times;
      // 使用entityService来自己实现
      await strapi.entityService.update(
        "api::swim-member.swim-member",
        member.id,
        {
          data: {
            ...member,
          },
        }
      );
      return {
        code: 200,
        msg: "修改成功",
        curmember: member,
      };
    },
  })
);
