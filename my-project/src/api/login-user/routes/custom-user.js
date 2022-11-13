module.exports = {
  routes: [
    {
      method: "POST",
      path: "/createUser",
      handler: "login-user.customCreate",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/login",
      handler: "login-user.Login",
      config: {
        auth: false,
      },
    },
  ],
};
