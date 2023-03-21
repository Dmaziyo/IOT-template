module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: "POST",
      path: "/getAllLight/:id",
      handler: "light.getAll",
      config: {
        auth: false,
      },
    },
  ],
};
