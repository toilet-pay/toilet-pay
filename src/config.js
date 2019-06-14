const config = require('configchecker').ConfigChecker.from(require('dotenv').config().parsed);
config.load(process.env);

module.exports = {
    SERVER_URL: config
        .get('SERVER_URL')
        //TODO: .url()
        .required().value,
    MESSENGER_APP_SECRET: config.get('MESSENGER_APP_SECRET').required().value,
    MESSENGER_VALIDATION_TOKEN: config.get('MESSENGER_VALIDATION_TOKEN').required().value,
    MESSENGER_PAGE_ACCESS_TOKEN: config.get('MESSENGER_PAGE_ACCESS_TOKEN').required().value,
    GOOGLE_API_KEY: config.get('GOOGLE_API_KEY').required().value,
};
