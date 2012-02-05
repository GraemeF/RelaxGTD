module.exports = {
    "port": process.env.npm_package_config_port,
    "session": {
        "secret": process.env.npm_package_config_sessionSecret
    },
    "keys": {
        "twitter": {
            "consumerKey": process.env.npm_package_config_twitterConsumerKey,
            "consumerSecret": process.env.npm_package_config_twitterConsumerSecret
        }
    }
};