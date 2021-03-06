module.exports = function(databaseClient, MatchModel) {
  return {

    /**
    * Yield every matchs
    * @param  {function} f(err, matchs), matchs=Array[MatchModel]
    */
    getAll: function(f) {
      var query = databaseClient.query(`SELECT * FROM matchs`, function(err, result) {
        if (err) {
          return f(err);
        }

        f(null, result.rows.map(function(row) {
          return new MatchModel(row);
        }));
      });
    },

    /**
    * Create table
    * @param  {function} f(err)
    */
    createTable: function(f) {
      var query = databaseClient.query(`
        CREATE TABLE IF NOT EXISTS matchs
        (
          id serial NOT NULL,
          date timestamp,
          players int,
          PRIMARY KEY ("id")
        )
        `, function(err, result) {
          f(err);
        });
      },

      dropTable: function(f) {
        var query = databaseClient.query(`DROP TABLE matchs`, f);
      },

      /**
      *
      * @param  {MatchModel} user [description]
      * @return {[type]}      [description]
      * Usage: UserRepository.insert(new MatchModel({username: }));
      */
      insert: function(matchModel) {
        var query = databaseClient.query(`
          INSERT INTO matchs
          (
            date,
            players
          )
          VALUES
          (
            req.query.date +
            req.query.players
          )
          `, function(err, result) {
            f(err);
          });
        },

        delete: function(matchModel) {
          var query = databaseClient.query(`
            DELETE FROM matchs WHERE id ="+ req.query.id")
            `, function(err, result) {
              f(err);
            });
          }

        };
      }
