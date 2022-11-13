module.exports = {
  routes: [
    {
      method: "POST",
      path: "/c-trespass",
      handler: "trespass.customCreate",
      config: {
        auth: false,
      },
    },
  ],
};
