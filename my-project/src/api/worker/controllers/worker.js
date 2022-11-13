"use strict";

/**
 * worker controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::worker.worker", ({ strapi }) => ({
  // // 根据卡号来修改状态,手动changeState
  // async changeState(ctx) {
  //   const card_num = ctx.params.card;
  //   const { balance, state } = ctx.request.body;
  //   // 找到卡号
  //   let worker = await strapi.services["api::worker.worker"].findCard(card_num);
  //   if (!worker)
  //     return {
  //       code: 404,
  //       msg: "不存在该卡号",
  //     };
  //   worker.balance = balance;
  //   worker.work_state = state;
  //   // 使用entityService来自己实现
  //   await strapi.entityService.update("api::worker.worker", worker.id, {
  //     data: {
  //       ...worker,
  //     },
  //   });
  //   return {
  //     code: 200,
  //     msg: "修改成功",
  //     curWorker: worker,
  //   };
  // },
  async changeState(ctx) {
    const card_num = ctx.params.card;
    // 找到卡号
    let worker = await strapi.services["api::worker.worker"].findCard(card_num);
    if (!worker)
      return {
        code: 404,
        msg: "不存在该卡号",
      };
    if (!worker.work_state) {
      worker.start_time = Date.now();
    }
    worker.work_state = !worker.work_state;
    // 使用entityService来自己实现
    await strapi.entityService.update("api::worker.worker", worker.id, {
      data: {
        ...worker,
      },
    });
    return {
      code: 200,
      msg: "修改成功",
      curWorker: worker,
    };
  },

  // 获取所有正在上班的人
  async workingPeople() {
    const worker = await strapi.entityService.findMany("api::worker.worker", {
      filters: { work_state: true },
    });
    return { workers: worker };
  },

  async findSpecific(ctx) {
    const card = ctx.params.card;
    let worker = await strapi.services["api::worker.worker"].findCard(card);

    // 使用entityService来自己实现
    await strapi.entityService.update("api::worker.worker", worker.id, {
      data: {
        ...worker,
      },
    });
    return { worker };
  },

  // 自制create，会判断是否存在该卡号
  async customCreate(ctx) {
    let worker = ctx.request.body;

    let result = await strapi.services["api::worker.worker"].findCard(
      worker.card_num
    );
    if (result) {
      return {
        code: 444,
        msg: "卡号已经绑定!",
      };
    } else {
      worker = await strapi.services["api::worker.worker"].create({
        data: {
          publishedAt: new Date(),
          name: worker.name,
          card_num: worker.card_num,
        },
      });
      return {
        code: 200,
        msg: "添加成功",
        ...worker,
      };
    }
  },

  // 目前不需要，因为刷卡后就直接修改工作状态
  // async verifyCard(ctx) {
  //   let body = ctx.request.body;
  //   let result = await strapi.services["api::worker.worker"].findCard(
  //     body.card_num
  //   );
  //   if (!result) {
  //     return {
  //       id: -1,
  //       work_state: -1,
  //     };
  //   } else {
  //     return {
  //       id: result.id,
  //       work_state: result.work_state,
  //       name: result.name,
  //     };
  //   }
  // },
}));
