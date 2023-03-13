"use strict";

/**
 * parking-spot controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
let timer = null;
module.exports = createCoreController(
  "api::parking-spot.parking-spot",
  ({ strapi }) => ({
    // 自制create，会判断是否存在该卡号
    async recharge(ctx) {
      try {
        let { card, money } = ctx.request.body;
        let { balance, id } = await strapi.db
          .query("api::parking-spot.parking-spot")
          .findOne({ where: { card } });

        let result = await strapi.entityService.update(
          "api::parking-spot.parking-spot",
          id,
          {
            data: {
              balance: parseInt(money) + parseInt(balance),
            },
          }
        );
        return {
          code: 200,
          msg: "添加成功",
          ...result,
        };
      } catch (error) {
        return {
          code: 444,
          msg: "卡号不存在",
        };
      }
    },

    async checkState(ctx) {
      let result = null;
      let timer = null;
      let { card, type } = ctx.request.body;
      try {
        let { balance, id, state, entertime } = await strapi.db
          .query("api::parking-spot.parking-spot")
          .findOne({ where: { card } });
        if (balance <= 5) {
          return {
            code: 444,
            msg: "余额不足",
          };
        }
        switch (state) {
          // 入库,加载时间,改状态
          case false:
            result = await strapi.entityService.update(
              "api::parking-spot.parking-spot",
              id,
              {
                data: {
                  state: true,
                  entertime: Date.now(),
                  type,
                },
              }
            );
            return {
              code: 200,
              msg: "入库成功",
              ...result,
            };
          case true:
            // 出库，扣钱，该状态
            let interval = Math.floor(
              (Date.now() - parseInt(entertime)) / 1000
            );
            const fee = Math.floor(interval / 10) * 5 + 5;
            result = await strapi.entityService.update(
              "api::parking-spot.parking-spot",
              id,
              {
                data: {
                  state: 0,
                  balance: balance - fee,
                  entertime: Date.now(),
                  type: "无",
                },
              }
            );
            // 添加停车记录
            if (timer) clearTimeout(timer);
            timer = setTimeout(async () => {
              await strapi.services[
                "api::parking-history.parking-history"
              ].create({
                data: {
                  type: type,
                  card: card,
                  fee: `${fee}元`,
                  entertime: `${new Date(parseInt(entertime)).toString()}秒`,
                  time: `${interval}秒`,
                },
              });
            }, 1000);
            return {
              code: 200,
              msg: `出库成功,停留${interval}秒`,
              ...result,
            };
          default:
            break;
        }
      } catch (error) {
        return {
          code: 444,
          msg: `卡号错误`,
        };
      }
    },
  })
);
