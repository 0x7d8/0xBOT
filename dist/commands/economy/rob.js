"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('rob')
        .setDescription('ROB SOMEONE')
        .setDescriptionLocalizations({
        de: 'RAUBE JEMANDEN AUS'
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
        .addStringOption((option) => option.setName('money')
        .setNameLocalizations({
        de: 'geld'
    })
        .setDescription('THE MONEY')
        .setDescriptionLocalizations({
        de: 'DAS GELD'
    })
        .setRequired(true)
        .addChoices({ name: '💸 [35%] 10€ - 20€', value: '35' }, { name: '🤑 [20%] 30€ - 50€', value: '20' }, { name: '💰 [05%] 60€ - 100€', value: '5' })),
    async execute(ctx) {
        if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'rob')) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» The **`/rob`** Command is disabled on this Server!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Der **`/rob`** Befehl ist auf diesem Server deaktiviert!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[CMD] ROB : DISABLED`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        const user = ctx.interaction.options.getUser("user");
        const money = ctx.getOption('money');
        const moneysnd = await ctx.bot.money.get(ctx.interaction.user.id);
        const moneytar = await ctx.bot.money.get(user.id);
        if ((await ctx.bot.cooldown.get(ctx.interaction.user.id, 'rob')).onCooldown) {
            const timeLeft = (await ctx.bot.cooldown.get(ctx.interaction.user.id, 'rob')).remaining;
            const cdown = timeLeft / 1000;
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You still have a Cooldown of **' + cdown.toFixed(0) + 's**!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du hast leider noch einen Cooldown von **' + cdown.toFixed(0) + 's**!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[CMD] ROB : ONCOOLDOWN : ${cdown.toFixed(0)}s`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        if (ctx.interaction.user.id === user.id) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You cant rob yourself?!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du kannst dich nicht selber ausrauben?!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[CMD] ROB : ${user.id} : ${money}€ : SAMEPERSON`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        if (user.bot) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You cant rob a Bot!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du kannst einem Bot kein Geld klauen!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[CMD] ROB : ${user} : BOT`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        let need;
        if (money === '35')
            need = 20;
        if (money === '20')
            need = 50;
        if (money === '5')
            need = 100;
        let notenoughmoney1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
            .setDescription('» You dont have enough Money for that, you need atleast **$' + need + '**! BRUH.')
            .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
        if (ctx.metadata.language === 'de') {
            notenoughmoney1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                .setDescription('» Du hast nicht genug Geld dafür, du brauchst mindestens **' + need + '€**! BRUH.')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
        }
        if (money === '35' && moneysnd < 20) {
            ctx.log(false, '[CMD] ROB : ' + user.id + ' : NOTENOUGHMONEY');
            return ctx.interaction.reply({ embeds: [notenoughmoney1.toJSON()], ephemeral: true });
        }
        ;
        if (money === '20' && moneysnd < 50) {
            ctx.log(false, '[CMD] ROB : ' + user.id + ' : NOTENOUGHMONEY');
            return ctx.interaction.reply({ embeds: [notenoughmoney1.toJSON()], ephemeral: true });
        }
        ;
        if (money === '5' && moneysnd < 100) {
            ctx.log(false, '[CMD] ROB : ' + user.id + ' : NOTENOUGHMONEY');
            return ctx.interaction.reply({ embeds: [notenoughmoney1.toJSON()], ephemeral: true });
        }
        let notenoughmoney2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
            .setDescription('» <@' + user + '> doesnt have enough Money for that, he needs atleast **$' + need + '**! LOL.')
            .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
        if (ctx.metadata.language === 'de') {
            notenoughmoney2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                .setDescription('» <@' + user + '> hat nicht genug Geld dafür, er braucht mindestens **' + need + '€**! LOL.')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
        }
        if (money === '35' && moneytar < 20) {
            ctx.log(false, '[CMD] ROB : ' + user.id + ' : NOTENOUGHMONEY');
            return ctx.interaction.reply({ embeds: [notenoughmoney2.toJSON()], ephemeral: true });
        }
        ;
        if (money === '20' && moneytar < 50) {
            ctx.log(false, '[CMD] ROB : ' + user.id + ' : NOTENOUGHMONEY');
            return ctx.interaction.reply({ embeds: [notenoughmoney2.toJSON()], ephemeral: true });
        }
        ;
        if (money === '5' && moneytar < 100) {
            ctx.log(false, '[CMD] ROB : ' + user.id + ' : NOTENOUGHMONEY');
            return ctx.interaction.reply({ embeds: [notenoughmoney2.toJSON()], ephemeral: true });
        }
        const random35 = ctx.bot.random(1, 3);
        const random20 = ctx.bot.random(1, 5);
        const random05 = ctx.bot.random(1, 20);
        let status, amount;
        if (money === '35') {
            if (random35 == 1) {
                status = true;
                amount = ctx.bot.random(10, 20);
            }
            else {
                status = false;
                amount = ctx.bot.random(10, 20);
            }
        }
        else if (money === '20') {
            if (random20 == 1) {
                status = true;
                amount = ctx.bot.random(30, 50);
            }
            else {
                status = false;
                amount = ctx.bot.random(30, 50);
            }
        }
        else {
            if (random05 == 1) {
                status = true;
                amount = ctx.bot.random(50, 100);
            }
            else {
                status = false;
                amount = ctx.bot.random(50, 100);
            }
        }
        let punishment;
        if (moneysnd > need * 2)
            punishment = amount * 2;
        else
            punishment = amount;
        let extra;
        if (amount < 20)
            extra = 'MEH.';
        if (amount >= 20)
            extra = 'NICE.';
        if (amount >= 40)
            extra = 'WONDERFUL.';
        if (amount >= 60)
            extra = 'LOL.';
        if (amount >= 80)
            extra = 'A PRO??!!';
        if (ctx.metadata.language === 'de') {
            if (amount < 20)
                extra = 'NAJA.';
            if (amount >= 20)
                extra = 'NICE.';
            if (amount >= 40)
                extra = 'PRIMA.';
            if (amount >= 60)
                extra = 'LOL.';
            if (amount >= 80)
                extra = 'EIN PRO??!!';
        }
        let success = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:BAG:1024389219558367292> » AUSRAUBEN')
            .setDescription('» You stole <@' + user.id + '> **$' + amount + '**! ' + extra)
            .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
        let failure = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:BAG:1024389219558367292> » AUSRAUBEN')
            .setDescription('» You wanted to steal <@' + user.id + '> **$' + amount + '**, but the Police caught you! You had to pay **$' + punishment + '**! KEKW.')
            .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
        if (ctx.metadata.language === 'de') {
            success = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BAG:1024389219558367292> » AUSRAUBEN')
                .setDescription('» Du hast <@' + user.id + '> **' + amount + '€** geklaut! ' + extra)
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            failure = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BAG:1024389219558367292> » AUSRAUBEN')
                .setDescription('» Du wolltest <@' + user.id + '> **' + amount + '€** klauen, aber die Polizei hat dich erwischt! Du musstest **' + punishment + '€** Strafgeld bezahlen! KEKW.')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
        }
        if (!status) {
            ctx.bot.cooldown.set(ctx.interaction.user.id, 'rob', 1 * 60 * 1000);
            ctx.log(false, `[CMD] ROB : ${user.id} : ${amount}€ : FAILURE : ${punishment}€`);
            ctx.bot.money.rem(ctx.interaction.guild.id, ctx.interaction.user.id, punishment);
            return ctx.interaction.reply({ embeds: [failure] });
        }
        ctx.bot.cooldown.set(ctx.interaction.user.id, 'rob', 1 * 60 * 1000);
        ctx.bot.money.rem(ctx.interaction.guild.id, user.id, amount);
        ctx.bot.money.add(ctx.interaction.guild.id, ctx.interaction.user.id, amount);
        ctx.log(false, `[CMD] ROB : ${user.id} : ${amount}€ : SUCCESS`);
        return ctx.interaction.reply({ embeds: [success] });
    }
};
//# sourceMappingURL=rob.js.map