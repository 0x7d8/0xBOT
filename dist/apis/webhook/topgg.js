"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rjweb_server_1 = __importDefault(require("rjweb-server"));
const discord_js_1 = require("discord.js");
module.exports = {
    type: rjweb_server_1.default.types.post,
    path: '/webhook/topgg',
    async code(ctr) {
        if (ctr.header.get('authorization') !== ctr.config.web.keys.topgg.webkey)
            return ctr.print({ "success": false, "message": 'WRONG AUTHORIZATION' });
        if (!ctr.reqBody.user)
            return;
        const random = ctr.bot.random(7500, 15000);
        let extra;
        if ((await ctr.bot.votes.get(ctr.reqBody.user + '-A') + 1) % 10 === 0)
            extra = ((await ctr.bot.votes.get(ctr.reqBody.user + '-A') + 1) * 10000) / 2;
        let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('» VOTING')
            .setDescription('» Thanks for Voting! You got **$' + random + '** from me :)\n» Danke fürs Voten! Du hast **' + random + '€** von mir erhalten :)')
            .setFooter({ text: '» ' + ctr.config.version });
        if (await ctr.bot.language.get(ctr.reqBody.user) === 'de') {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('» VOTING')
                .setDescription('» Danke fürs Voten! Du hast **' + random + '€** von mir erhalten :)')
                .setFooter({ text: '» ' + ctr.config.version });
        }
        else {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('» VOTING')
                .setDescription('» Thanks for Voting! You got **$' + random + '** from me :)')
                .setFooter({ text: '» ' + ctr.config.version });
        }
        ;
        let messageBonus = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('» VOTING')
            .setDescription('» Thanks for Voting **' + ((await ctr.bot.votes.get(ctr.reqBody.user + '-A')) + 1) + '** times!\nAs A Gift I give you extra **$' + extra + '**!')
            .setFooter({ text: '» ' + ctr.config.version });
        if (await ctr.bot.language.get(ctr.reqBody.user) === 'de') {
            messageBonus = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('» VOTING')
                .setDescription('» Danke, dass du **' + ((await ctr.bot.votes.get(ctr.reqBody.user + '-A')) + 1) + '** mal gevotet hast!\nAls Geschenk gebe ich dir extra **' + extra + '€**!')
                .setFooter({ text: '» ' + ctr.config.version });
        }
        await ctr.bot.money.add(false, ctr.reqBody.user, random);
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] VOTED : ' + ctr.reqBody.user + ' : ' + random + '€');
        ctr.client.users.send(ctr.reqBody.user, { embeds: [message] });
        if ((await ctr.bot.votes.get(ctr.reqBody.user + '-A') + 1) % 10 === 0) {
            ctr.bot.money.add(false, ctr.reqBody.user, extra);
            ctr.client.users.send(ctr.reqBody.user, { embeds: [messageBonus] });
        }
        ;
        ctr.bot.votes.add(ctr.reqBody.user + '-A', 1);
        ctr.bot.votes.set(ctr.reqBody.user + '-T', Date.now());
        return ctr.print({ "success": true, "message": 'VOTE RECIEVED' });
    }
};
//# sourceMappingURL=topgg.js.map