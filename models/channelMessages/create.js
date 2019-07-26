module.exports = (knex, channelMessage) => (params) =>
  Promise.resolve(params)
    .then((params) => {
      return knex("channel_messages")
        .insert({
          from_id: params.id,
          channel_id: params.channelId,
          message: params.message,
        })
        .then(() => {
          return knex
            .select(
              "channel_messages.id",
              "channels.name as to",
              "users.username as from",
              "channel_messages.message",
              "channel_messages.sent_at"
            )
            .from("channel_messages")
            .join("channels", "channel_messages.channel_id", "channels.id")
            .join("users", "users.id", "=", "channel_messages.id");
        });
    })
    .then((messageObj) => {
      const returnedObj = new channelMessage(messageObj[0]);
      console.log(returnedObj);
      return [returnedObj];
    });
