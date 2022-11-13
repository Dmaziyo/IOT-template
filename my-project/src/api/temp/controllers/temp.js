"use strict";

/**
 * temp controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::temp.temp", ({ strapi }) => ({
  async getAll(ctx) {
    const id = ctx.params.id;
    let { limit = false } = ctx.request.body;
    let data = await strapi.db
      .query("api::temp.temp")
      .findMany({ where: { board_id: id } });

    // 唯一数据
    let uniqueData = [];
    // 唯一日期
    let unique_date = [];
    data.forEach((item) => {
      let cur_time = item.created_time;
      if (!unique_date.includes(cur_time)) {
        unique_date.push(cur_time);
        uniqueData.push(item);
      }
    });
    uniqueData.sort((a, b) => {
      const tipA = new Date(a.created_time).getTime();
      const tipB = new Date(b.created_time).getTime();
      return tipB - tipA;
    });

    return limit ? uniqueData.slice(0, +limit) : uniqueData;
  },
}));
