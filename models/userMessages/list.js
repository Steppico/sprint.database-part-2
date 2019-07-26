module.exports = (knex, UserMessage) => {
  return (params) => {
    console.log("params in list", params);
    return Promise.resolve(
      knex
        .select(
          "user_messages.id",
          "user_messages.message",
          "user_messages.sent_at",
          "users.username as from",
          "user_messages.to_id"
        )
        .from("user_messages")
        .join("users", "user_messages.from_id", "users.id")
      //.where({ from_id: params.fromId })
    ).then((messages) => {
      console.log("messages in list", messages);
      const mappedMessages = messages.map((message) => {
        return new UserMessage(message);
      });
      console.log("mapped messages", mappedMessages);
      return mappedMessages.slice(1);
    });
  };
};
