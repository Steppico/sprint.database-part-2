module.exports = (knex, channelMessage) => (params) => {
  return knex("channel_messages")
    .insert({
      from_id: params.fromId,
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
        .join("users", "channel_messages.from_id", "users.id");
    })
    .then((messageObj) => {
      const returnedObj = messageObj.map((message) => {
        return new channelMessage(message);
      });
      return returnedObj;
    });
};
