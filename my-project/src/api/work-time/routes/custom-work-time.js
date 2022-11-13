module.exports = {
  routes: [
    {
      method: "POST",
      path: "/c-work-times",
      handler: "work-time.customCreate",
      config: {
        auth: false,
      },
    },
  ],
};
