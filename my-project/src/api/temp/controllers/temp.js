"use strict";

/**
 * temp controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::temp.temp", ({ strapi }) => ({
  async getAll(ctx) {
    const id = ctx.params.id;
    let { limit, curPage, startTime, endTime } = ctx.request.body;
    limit = limit ? +limit : 50;
    curPage = curPage ? +curPage : 1;
    startTime = startTime ? +startTime : 0;
    endTime = endTime ? +endTime : Date.now();
    console.log("startTime", limit, curPage, startTime, endTime);
    let data = await strapi.db
      .query("api::temp.temp")
      .findMany({ where: { board_id: id } });

    // 唯一数据
    let uniqueData = [];
    // 唯一日期
    let unique_date = [];
    data.forEach((item) => {
      let cur_time = new Date(item.created_time).getTime();
      if (!unique_date.includes(cur_time)) {
        if (cur_time > startTime && cur_time < endTime) {
          unique_date.push(cur_time);
          uniqueData.push(item);
        }
      }
    });
    uniqueData.sort((a, b) => {
      const tipA = new Date(a.created_time).getTime();
      const tipB = new Date(b.created_time).getTime();
      return tipB - tipA;
    });
    let start = (curPage - 1) * limit;
    return {
      count: uniqueData.length,
      curPage: limit ? uniqueData.slice(start, start + limit) : uniqueData,
    };
  },
}));
