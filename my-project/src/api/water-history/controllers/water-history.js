"use strict";

/**
 * water-history controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::water-history.water-history",
  ({ strapi }) => ({
    async getWaterVolume(ctx) {
      let { limit, curPage, startTime, endTime, id } = ctx.request.body;
      limit = limit ? +limit : 50;
      curPage = curPage ? +curPage : 1;
      startTime = startTime ? +startTime : 0;
      endTime = endTime ? +endTime : Date.now();

      let data = await strapi.db
        .query("api::water-history.water-history")
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
      let f_tot = 0;
      uniqueData.forEach((val, index) => {
        f_tot = f_tot + parseInt(val.f_tot);
      });
      return {
        count: uniqueData.length,
        f_tot,
        curPage: limit ? uniqueData.slice(start, start + limit) : uniqueData,
      };
    },
    async getSpecificVolume(ctx) {
      let { card, limit, curPage, startTime, endTime, id } = ctx.request.body;
      limit = limit ? +limit : 50;
      curPage = curPage ? +curPage : 1;
      startTime = startTime ? +startTime : 0;
      endTime = endTime ? +endTime : Date.now();

      let data = await strapi.db
        .query("api::water-history.water-history")
        .findMany({ where: { card_num: card } });
      console.log("board_id", id, "card_num", card, data);
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
      let f_tot = 0;
      uniqueData.forEach((val, index) => {
        f_tot = f_tot + parseInt(val.f_tot);
      });
      console.log(f_tot);
      return {
        count: uniqueData.length,
        f_tot,
        curPage: limit ? uniqueData.slice(start, start + limit) : uniqueData,
      };
    },
  })
);
