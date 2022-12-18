"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const ms_1 = __importDefault(require("ms"));
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('quote')
        .setDescription('QUOTE SOMETHING')
        .setDescriptionLocalizations({
        de: 'ZITIERE ETWAS'
    })
        .setDMPermission(false)
        .addStringOption((option) => option.setName('quote')
        .setNameLocalizations({
        de: 'zitat'
    })
        .setDescription('THE QUOTE')
        .setDescriptionLocalizations({
        de: 'DAS ZITAT'
    })
        .setRequired(true))
        .addUserOption((option) => option.setName('author')
        .setNameLocalizations({
        de: 'autor'
    })
        .setDescription('THE AUTHOR')
        .setDescriptionLocalizations({
        de: 'DER AUTOR'
    })
        .setRequired(false)),
    async execute(ctx) {
        if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'quotes')) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» Quotes are disabled on this Server!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Zitate sind auf diesem Server deaktiviert!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[CMD] QUOTE : DISABLED`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        const quote = ctx.getOption('quote');
        const author = ctx.interaction.options.getUser("author");
        if ((await ctx.bot.cooldown.get(ctx.interaction.user.id, 'quote')).onCooldown) {
            const timeLeft = (await ctx.bot.cooldown.get(ctx.interaction.user.id, 'quote')).remaining;
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You still have a Cooldown of **' + (0, ms_1.default)(timeLeft) + '**!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du hast leider noch einen Cooldown von **' + (0, ms_1.default)(timeLeft) + '**!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[CMD] QUOTE : ONCOOLDOWN : ${(0, ms_1.default)(timeLeft)}`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        let message;
        if (!author || ctx.interaction.user.id === author.id) {
            const amount = await ctx.bot.quotes.get(ctx.interaction.user.id) + 1;
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:QUOTES:1024406448127623228> » A WISE QUOTE')
                .setDescription('» "' + quote + '" ~<@' + ctx.interaction.user.id + '>')
                .setFooter({ text: '» ' + ctx.client.config.version + ' » QUOTES: ' + amount });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:QUOTES:1024406448127623228> » EIN WEISES ZITAT')
                    .setDescription('» "' + quote + '" ~<@' + ctx.interaction.user.id + '>')
                    .setFooter({ text: '» ' + ctx.client.config.version + ' » ZITATE: ' + amount });
            }
            ctx.log(false, `[CMD] QUOTE : ${quote.toUpperCase()}`);
        }
        else {
            const amount = await ctx.bot.quotes.get(author.toString().replace(/\D/g, '')) + 1;
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:QUOTES:1024406448127623228> » A QUOTE')
                .setDescription('» "' + quote + '" ~<@' + author + '>')
                .setFooter({ text: '» ' + ctx.client.config.version + ' » QUOTES: ' + amount });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:QUOTES:1024406448127623228> » EIN ZITAT')
                    .setDescription('» "' + quote + '" ~<@' + author + '>')
                    .setFooter({ text: '» ' + ctx.client.config.version + ' » ZITATE: ' + amount });
            }
            ctx.log(false, `[CMD] QUOTE : ${quote.toUpperCase()} : ${author.id}`);
            ctx.bot.quotes.add(author.toString().replace(/\D/g, ''), 1);
        }
        ctx.bot.cooldown.set(ctx.interaction.user.id, 'quote', 1 * 60 * 1000);
        return ctx.interaction.reply({ embeds: [message] });
    }
};
//# sourceMappingURL=quote.js.map