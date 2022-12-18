"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('pay')
        .setDescription('GIVE SOMEONE MONEY')
        .setDescriptionLocalizations({
        de: 'GEBE JEMANDEN GELD'
    })
        .setDMPermission(false)
        .addUserOption((option) => option.setName('user')
        .setNameLocalizations({
        de: 'nutzer'
    })
        .setDescription('THE USER')
        .setDescriptionLocalizations({
        de: 'DER NUTZER'
    })
        .setRequired(true))
        .addIntegerOption((option) => option.setName('amount')
        .setNameLocalizations({
        de: 'amount'
    })
        .setDescription('THE AMOUNT OF MONEY')
        .setDescriptionLocalizations({
        de: 'DIE amount VON GELD'
    })
        .setRequired(true)),
    async execute(ctx) {
        const user = ctx.interaction.options.getUser("user");
        const amount = ctx.getOption('amount');
        const balance = await ctx.bot.money.get(ctx.interaction.user.id);
        if (amount < 0) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You cant send negative Money!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du kannst kein negatives Geld senden!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[CMD] PAY : NEGATIVEMONEY : ${amount}€`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        if (user.bot) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You cant give a Bot Money!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du kannst einem Bot kein Geld geben!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[CMD] PAY : ${user.id} : BOT : ${amount}€`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        if (ctx.interaction.user.id === user.id) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You cant pay yourself Money?')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du kannst dir selber kein Geld überweisen?')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[CMD] PAY : ${user.id} : ${amount}€ : SAMEPERSON`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        if (balance < amount) {
            const missing = amount - balance;
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[CMD] PAY : ${user.id} : NOTENOUGHMONEY : ${amount}€`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        const transaction = await ctx.bot.transactions.log({
            success: true,
            sender: {
                id: ctx.interaction.user.id,
                amount: amount,
                type: 'negative'
            }, reciever: {
                id: user.id,
                amount: amount,
                type: 'positive'
            }
        });
        let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:BAG:1024389219558367292> » GIVE MONEY')
            .setDescription('» You gave <@' + user.id + '> **$' + amount + '**!\n\nID: ' + transaction.id)
            .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
        if (ctx.metadata.language === 'de') {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BAG:1024389219558367292> » GELD GEBEN')
                .setDescription('» Du hast <@' + user.id + '> **' + amount + '€** gegeben!\n\nID: ' + transaction.id)
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
        }
        ctx.bot.money.rem(ctx.interaction.guild.id, ctx.interaction.user.id, amount);
        ctx.bot.money.add(ctx.interaction.guild.id, user.id, amount);
        ctx.log(false, `[CMD] PAY : ${user.id} : ${amount}€`);
        return ctx.interaction.reply({ embeds: [message] });
    }
};
//# sourceMappingURL=pay.js.map