"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rjweb_server_1 = __importDefault(require("rjweb-server"));
module.exports = {
    type: rjweb_server_1.default.types.get,
    path: '/options/guild',
    async code(ctr) {
        if (!ctr.query.has('id'))
            return ctr.print({ "success": false, "message": 'NO ID' });
        if (!ctr.query.has('page'))
            return ctr.print({ "success": false, "message": 'NO PAGE' });
        if (!await ctr.api.checkSession(ctr.header.get('accesstoken'), ctr.header.get('tokentype'), ctr.header.get('userid'), ctr.query.get('id')))
            return ctr.print({ "success": false, "message": 'PERMISSION DENIED' });
        let response = { "success": false, "message": "NOT FOUND" };
        if (ctr.query.get('page') === 'GENERAL') {
            let guildlang = 'ENGLISH';
            if (await ctr.bot.language.get(ctr.query.get('id')) === 'de') {
                guildlang = 'GERMAN';
            }
            response = {
                "success": true,
                "language": guildlang
            };
        }
        if (ctr.query.get('page') === 'ECONOMY') {
            response = {
                "success": true,
                "businesses": await ctr.bot.settings.get(ctr.query.get('id'), 'businesses'),
                "items": await ctr.bot.settings.get(ctr.query.get('id'), 'items'),
                "cars": await ctr.bot.settings.get(ctr.query.get('id'), 'cars'),
                "stocks": await ctr.bot.settings.get(ctr.query.get('id'), 'stocks'),
                "luckgames": await ctr.bot.settings.get(ctr.query.get('id'), 'luckgames'),
                "daily": await ctr.bot.settings.get(ctr.query.get('id'), 'daily'),
                "work": await ctr.bot.settings.get(ctr.query.get('id'), 'work'),
                "rob": await ctr.bot.settings.get(ctr.query.get('id'), 'rob')
            };
        }
        if (ctr.query.get('page') === 'FUN') {
            response = {
                "success": true,
                "levels": await ctr.bot.settings.get(ctr.query.get('id'), 'levels'),
                "quotes": await ctr.bot.settings.get(ctr.query.get('id'), 'quotes'),
                "meme": await ctr.bot.settings.get(ctr.query.get('id'), 'meme')
            };
        }
        return ctr.print(response);
    }
};
//# sourceMappingURL=guild.js.map