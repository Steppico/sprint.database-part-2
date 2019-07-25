module.exports = (knex, channelMessage) => (params) =>
  Promise.resolve(params).then((params) => {
    console.log("checkmeoutyo", params);
    return knex("channel_messages")
      .insert({
        from_id: params.id,
        channel_id: params.channelId,
        message: params.message,
      })
      .then(() => {
        return knex("channel_messages")
          .where({
            from_id: knex
              .from("channel_messages")
              .innerJoin("users", "id", params.id),
            channel_id: knex("channels")
              .select("*")
              .where("id", params.channelId),
            message: params.message,
          })
          .select();
      })
      .then((messageObj) => {
        console.log(new channelMessage(messageObj[0]));
        return new channelMessage(messageObj[0]);
      });
  });

//knex.select("*").from("users").where('id', params.fromId)
