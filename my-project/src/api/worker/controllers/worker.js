"use strict";

/**
 * worker controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::worker.worker", ({ strapi }) => ({
  async changeState(ctx) {
    const id = ctx.params.id;
    const { query } = ctx;
    let worker = await strapi.services["api::worker.worker"].findOne(id, query);
    console.log(worker);
    worker.work_state = !worker.work_state;

    await strapi.services["api::worker.worker"].update(
      {
        id,
      },
      worker
    );
    return {
      code: 200,
      msg: "修改成功",
      curState: worker.work_state,
      pastState: !worker.work_state,
    };
  },
  async workingPeople() {
    let worker = await strapi.services["api::worker.worker"].find({
      work_state: true,
    });
    return { length: worker.length };
  },
  async customCreate(ctx) {
    let worker = ctx.request.body;
    console.log("创造用户", worker);

    let result = await strapi.services["api::worker.worker"].findCard(
      worker.card_num
    );
    console.log("查找结果", result);
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
  async verifyCard(ctx) {
    let body = ctx.request.body;
    let result = await strapi.services["api::worker.worker"].findCard(
      body.card_num
    );
    if (!result) {
      return {
        id: -1,
        work_state: -1,
      };
    } else {
      return {
        id: result.id,
        work_state: result.work_state,
        name: result.name,
      };
    }
  },
}));
