module.exports = (knex, UserMessage) => (params) => {
  return knex("user_messages")
    .insert({
      from_id: params.fromId,
      to_id: params.toId,
      message: params.message,
    })
    .then(() => {
      return knex
        .select(
          "user_messages.id",
          "user_messages.message",
          "user_messages.sent_at",
          "users.username as from",
          "user_messages.to_id"
        )
        .from("user_messages")
        .join("users", "user_messages.from_id", "users.id")
        .whereIn("user_messages.from_id", [params.fromId, params.toId])
        .whereIn("user_messages.to_id", [params.toId, params.fromId]);
    })
    .then((userMessageArr) => {
      const returnedArr = userMessageArr.map((message) => {
        return new UserMessage(message);
      });
      return returnedArr;
    });
};
