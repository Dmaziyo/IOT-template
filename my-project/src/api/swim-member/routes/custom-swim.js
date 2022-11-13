module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: "POST",
      path: "/updateUserTimes/:card",
      handler: "swim-member.updateTimes",
      config: {
        auth: false,
      },
    },
  ],
};
