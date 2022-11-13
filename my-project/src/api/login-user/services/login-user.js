"use strict";
/**
 * worker service
 */
const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
  "api::login-user.login-user",
  ({ strapi }) => ({
    findUser: async (username) => {
      let result = await strapi.db.query("api::login-user.login-user").findOne({
        where: { username },
      });
      return result;
    },
    verifyUser: async (username, password) => {
      let result = await strapi.db.query("api::login-user.login-user").findOne({
        where: { username, password },
      });
      return result;
    },
  })
);
