"use strict";

/**
 * login-user controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::login-user.login-user",
  ({ strapi }) => ({
    async customCreate(ctx) {
      let user = ctx.request.body;

      let result = await strapi.services["api::login-user.login-user"].findUser(
        user.username
      );
      if (result) {
        return {
          code: 444,
          msg: "该用户已存在!",
        };
      } else {
        user = await strapi.services["api::login-user.login-user"].create({
          data: {
            publishedAt: new Date(),
            username: user.username,
            password: user.password,
          },
        });
        return {
          code: 200,
          msg: "添加成功",
          ...user,
        };
      }
    },
    async Login(ctx) {
      let user = ctx.request.body;

      let result = await strapi.services[
        "api::login-user.login-user"
      ].verifyUser(user.username, user.password);
      if (result) {
        return {
          code: 200,
          msg: "验证成功",
        };
      } else {
        return {
          code: 444,
          msg: "账号或密码不存在",
        };
      }
    },
  })
);
