const validateChannelName = (uName) =>
  typeof uName === "string" && uName.replace(" ", "").length > 3;

module.exports = (knex, Channel) => {
  return (params) => {
    return Promise.resolve(params).then((value) => {
      return knex("channels")
        .insert({ name: value.name.toLowerCase() })
        .then(() => {
          return knex("channels")
            .where({ name: value.name.toLowerCase() })
            .select();
        })
        .then((channel) => {
          return new Channel(channel[0]);
        })
        .catch((err) => {
          if (err.code.match("23505")) {
            return Promise.reject(new Error("That channel already exists"));
          }
        });
    }); // fixed!
  };
};
