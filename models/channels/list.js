module.exports = (knex, Channel) => {
  return () => {
    return Promise.resolve(knex.select("*").from("channels")).then(
      (arrayOfChannelNames) => {
        return arrayOfChannelNames.map((channel) => {
          return new Channel(channel);
        });
      }
    ); // fixed!
  };
};
