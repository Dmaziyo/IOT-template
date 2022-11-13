module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: "POST",
      path: "/changeState/:card",
      handler: "worker.changeState",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/getWorkingPeople",
      handler: "worker.workingPeople",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/c-create",
      handler: "worker.customCreate",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/getUser/:card",
      handler: "worker.findSpecific",
      config: {
        auth: false,
      },
    },
  ],
};
