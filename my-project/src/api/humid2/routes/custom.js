module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: "POST",
      path: "/getAllHumid2s/:id",
      handler: "humid2.getAll",
      config: {
        auth: false,
      },
    },
  ],
};
