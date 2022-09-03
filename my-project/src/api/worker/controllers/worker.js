"use strict";

/**
 * worker controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::worker.worker", ({ strapi }) => ({
  // 根据卡号来修改状态
  async changeState(ctx) {
    const card_num = ctx.params.card;
    // 找到卡号
    let worker = await strapi.services["api::worker.worker"].findCard(card_num);
    console.log(worker);
    if (!worker)
      return {
        code: 404,
        msg: "不存在该卡号",
      };
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
      curState: worker.work_state,
      pastState: !worker.work_state,
    };
  },

  // 获取所有正在上班的人
  async workingPeople() {
    const worker = await strapi.entityService.findMany("api::worker.worker", {
      filters: { work_state: true },
    });
    return { length: worker.length };
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
