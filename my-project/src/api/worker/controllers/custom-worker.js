const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::worker.worker", ({ strapi }) => ({
  async changeState(ctx) {
    const id = ctx.params.id;
    const { query } = ctx;
    let worker = await strapi.services["api::worker.worker"].findOne(id, query);
    console.log(worker);
    worker.work_state = !worker.work_state;
    await strapi.services["worker"].update(
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
    let worker = await strapi.services["worker"].find({
      work_state: true,
    });
    return { length: worker.length };
  },
  async customCreate(ctx) {
    let worker = ctx.request.body;
    let result = await strapi.services["worker"].findCard(worker.card_num);
    if (result) {
      return {
        code: 444,
        msg: "卡号已经绑定!",
      };
    } else {
      worker = await strapi.services["worker"].create(worker);
      return {
        code: 200,
        msg: "添加成功",
        ...worker,
      };
    }
  },
  async verifyCard(ctx) {
    let body = ctx.request.body;
    let result = await strapi.services["worker"].findCard(body.card_num);
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
