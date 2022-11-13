module.exports = {
  routes: [
    {
      method: "POST",
      path: "/b-create",
      handler: "book.customCreate",
      config: {
        auth: false,
      },
    },
  ],
};
