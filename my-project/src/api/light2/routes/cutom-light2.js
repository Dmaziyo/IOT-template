module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: "POST",
      path: "/getAllLight2/:id",
      handler: "light2.getAll",
      config: {
        auth: false,
      },
    },
  ],
};
