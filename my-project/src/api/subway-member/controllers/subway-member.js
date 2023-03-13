"use strict";

/**
 * subway-member controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::subway-member.subway-member",
  ({ strapi }) => ({
    async checkTicket(ctx) {
      const { card } = ctx.request.body;
      try {
        let { money, id } = await strapi.db
          .query("api::subway-member.subway-member")
          .findOne({ where: { card } });
        if (parseInt(money) < 2) {
          return {
            code: 444,
            msg: "余额不足",
          };
        }
        //修改状态，但不扣钱
        else {
          await strapi.entityService.update(
            "api::subway-member.subway-member",
            id,
            {
              data: {
                state: true,
              },
            }
          );
          return {
            money,
            open: true,
          };
        }
      } catch (error) {
        return {
          code: 444,
          msg: `卡号错误`,
        };
      }
    },
    async reduceMoney(ctx) {
      const { card } = ctx.request.body;
      try {
        let { money, state, id } = await strapi.db
          .query("api::subway-member.subway-member")
          .findOne({ where: { card } });
        // 没有进站信息,报警
        if (!state) {
          return {
            code: 444,
            msg: "没有进站信息",
            open: false,
          };
        }
        //扣钱，修改状态
        else {
          await strapi.entityService.update(
            "api::subway-member.subway-member",
            id,
            {
              data: {
                state: false,
                money: money - 2,
              },
            }
          );
          return {
            money: money - 2,
            open: true,
          };
        }
      } catch (error) {
        return {
          code: 444,
          msg: `卡号错误`,
        };
      }
    },
    async topUp(ctx) {
      try {
        let { card, amount } = ctx.request.body;
        let { money, id } = await strapi.db
          .query("api::subway-member.subway-member")
          .findOne({ where: { card } });

        let result = await strapi.entityService.update(
          "api::subway-member.subway-member",
          id,
          {
            data: {
              money: parseInt(money) + parseInt(amount),
            },
          }
        );
        return {
          code: 200,
          msg: "充值成功",
          ...result,
        };
      } catch (error) {
        return {
          code: 444,
          msg: "卡号不存在",
        };
      }
    },
  })
);
