var everyauth = require('everyauth');

var usersById = {};
var usersByTwitId = {};
var nextUserId = 0;

var addUser = function (source, sourceUser) {
    var user;
    user = usersById[++nextUserId] = {id:nextUserId};
    user[source] = sourceUser;
    return user;
};

module.exports = {
    attach:function (server, config) {

        everyauth.everymodule.findUserById(function (id, callback) {
            callback(null, usersById[id]);
        });

        everyauth.twitter
            .consumerKey(config.keys.twitter.consumerKey)
            .consumerSecret(config.keys.twitter.consumerSecret)
            .findOrCreateUser(function (session, accessToken, accessTokenSecret, twitUser) {
                return usersByTwitId[twitUser.id]
                    || (usersByTwitId[twitUser.id] = addUser('twitter', twitUser));
            })
            .redirectPath('/');

        server.use(everyauth.middleware());
        everyauth.helpExpress(server);
    }
};
