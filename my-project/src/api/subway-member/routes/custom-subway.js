module.exports = {
  routes: [
    {
      method: "POST",
      path: "/checkTicket",
      handler: "subway-member.checkTicket",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/reduceMoney",
      handler: "subway-member.reduceMoney",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/topUp",
      handler: "subway-member.topUp",
      config: {
        auth: false,
      },
    },
  ],
};
