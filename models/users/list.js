module.exports = (knex, User) => {
  return () => {
    return Promise.resolve(knex.select("*").from("users")).then(
      (arrayOfNames) => {
        return arrayOfNames.map((user) => new User(user));
      }
    ); //fixed
  };
};
