"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const ms_1 = __importDefault(require("ms"));
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('cooldowns')
        .setDescription('VIEW COOLDOWNS')
        .setDescriptionLocalizations({
        de: 'SCHAUE COOLDOWNS AN'
    })
        .setDMPermission(false)
        .addUserOption((option) => option.setName('user')
        .setDescription('THE USER')
        .setDescriptionLocalizations({
        de: 'DER NUTZER'
    })
        .setRequired(false)),
    async execute(ctx) {
        const user = ctx.interaction.options.getUser("user");
        let embedDesc = '', userobj;
        if (!user)
            userobj = ctx.interaction.user;
        else
            userobj = user;
        const rawvalues = await ctx.db.query(`select name, expires from usercooldowns where userid = $1 and expires / 1000 > extract(epoch from now());`, [userobj.id]);
        for (const element of rawvalues.rows) {
            embedDesc += `» ${element.name.toUpperCase()}\n**${(0, ms_1.default)(Number(element.expires) - Date.now())}**\n`;
        }
        ;
        if (embedDesc === '') {
            embedDesc = 'Nothing Found.';
            if (ctx.metadata.language === 'de') {
                embedDesc = 'Nichts Gefunden.';
            }
        }
        let message;
        if (!user) {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BAG:1024389219558367292> » COOLDOWNS')
                .setDescription(embedDesc)
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BAG:1024389219558367292> » COOLDOWNS')
                    .setDescription(embedDesc)
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
        }
        else {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BAG:1024389219558367292> » COOLDOWNS OF ' + user.username)
                .setDescription(embedDesc)
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BAG:1024389219558367292> » COOLDOWNS VON ' + user.username)
                    .setDescription(embedDesc)
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
        }
        ctx.log(false, `[CMD] COOLDOWNS : ${userobj.id}`);
        return ctx.interaction.reply({ embeds: [message] });
    }
};
//# sourceMappingURL=cooldowns.js.map