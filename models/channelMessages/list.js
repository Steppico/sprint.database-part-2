module.exports = (knex, ChannelMessage) => (params) => {
  return Promise.resolve(
    knex
      .select(
        "channel_messages.id",
        "channels.name as to",
        "users.username as from",
        "channel_messages.message",
        "channel_messages.sent_at"
      )
      .from("channel_messages")
      .join("channels", "channel_messages.channel_id", "channels.id")
      .join("users", "channel_messages.from_id", "users.id")
      .where({ channel_id: params.channelId })
  ).then((arrayOfMessages) => {
    const returnedMessages = arrayOfMessages.map((message) => {
      return new ChannelMessage(message);
    });
    return returnedMessages;
  });
};
