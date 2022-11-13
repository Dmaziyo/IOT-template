module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: "POST",
      path: "/getAllHumid1s/:id",
      handler: "humid.getAll",
      config: {
        auth: false,
      },
    },
  ],
};
