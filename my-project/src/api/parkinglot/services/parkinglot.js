"use strict";

/**
 * parkinglot service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
  "api::parkinglot.parkinglot",
  ({ strapi }) => ({
    changeParklot: async (type) => {
      const parkinglot = await strapi.services[
        "api::parkinglot.parkinglot"
      ].find();
      switch (type) {
        case "+":
          parkinglot.num = +parkinglot.num + 1;
          break;
        case "-": {
          let temp = +parkinglot.num - 1;
          parkinglot.num = temp > 0 ? temp : 0;
          break;
        }
        case "0":
          {
            parkinglot.num = 0;
          }
          break;
      }
      await strapi.entityService.update(
        "api::parkinglot.parkinglot",
        parkinglot.id,
        {
          data: {
            ...parkinglot,
          },
        }
      );
      return {
        code: 200,
        msg: "修改成功",
        usingNum: parkinglot.num,
      };
    },
  })
);
