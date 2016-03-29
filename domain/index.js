module.exports = function(databaseClient){
  var UserModel = require('./UserModel')(databaseClient);
  return {
    UserModel: UserModel,
    UserRepository: require('./UserRepository')(databaseClient, UserModel)
  };

};
