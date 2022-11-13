"use strict";

/**
 * battery controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::battery.battery", ({ strapi }) => ({
  async getAll(ctx) {
    const id = ctx.params.id;

    const data = await strapi.db
      .query("api::battery.battery")
      .findMany({ where: { board_id: id } });

    return { data };
  },
}));
