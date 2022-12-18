"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
exports.default = {
    data: new discord_js_2.SlashCommandBuilder()
        .setName('itembuy')
        .setDMPermission(false)
        .setDescription('BUY ITEMS')
        .setDescriptionLocalizations({
        de: 'KAUFE GEGENSTÄNDE'
    })
        .addStringOption((option) => option.setName('item')
        .setNameLocalizations({
        de: 'gegenstand'
    })
        .setDescription('THE ITEM')
        .setDescriptionLocalizations({
        de: 'DER GEGENSTAND'
    })
        .setRequired(true)
        .addChoices({ name: '💣 NORMALE BOMBE', value: 'nbomb' }, { name: '💣 MEDIUM BOMBE', value: 'mbomb' }, { name: '💣 HYPER BOMBE', value: 'hbomb' }, { name: '💣 CRAZY BOMBE', value: 'cbomb' }))
        .addIntegerOption((option) => option.setName('amount')
        .setNameLocalizations({
        de: 'anzahl'
    })
        .setDescription('THE AMOUNT')
        .setDescriptionLocalizations({
        de: 'DIE ANZAHL'
    })
        .setRequired(false)),
    async execute(ctx) {
        if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'items')) {
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» Items are disabled on this Server!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Items sind auf diesem Server deaktiviert!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, '[CMD] ITEM : DISABLED');
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        const itemid = ctx.getOption('item');
        const amount = ctx.getOption('amount');
        const balance = await ctx.bot.money.get(ctx.interaction.user.id);
        let costmul;
        if (!amount)
            costmul = 1;
        else
            costmul = amount;
        let cost;
        if (await ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-1-PRICE-' + itemid.toUpperCase()) === '0' || await ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-1-PRICE-' + itemid.toUpperCase()) === 0) {
            if (itemid === 'nbomb')
                cost = 500 * costmul;
            if (itemid === 'mbomb')
                cost = 1000 * costmul;
            if (itemid === 'hbomb')
                cost = 5000 * costmul;
            if (itemid === 'cbomb')
                cost = 15000 * costmul;
        }
        else {
            cost = Number(await ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-1-PRICE-' + itemid.toUpperCase())) * costmul;
        }
        let name;
        if (itemid === 'nbomb')
            name = '<:NBOMB:1021783222520127508> NORMAL BOMB';
        if (itemid === 'mbomb')
            name = '<:MBOMB:1021783295211601940> MEDIUM BOMB';
        if (itemid === 'hbomb')
            name = '<:HBOMB:1022102357938536458> HYPER BOMB';
        if (itemid === 'cbomb')
            name = '<:CBOMB:1021783405161091162> CRAZY BOMB';
        if (ctx.metadata.language === 'de') {
            if (itemid === 'nbomb')
                name = '<:NBOMB:1021783222520127508> NORMALE BOMBE';
            if (itemid === 'mbomb')
                name = '<:MBOMB:1021783295211601940> MEDIUM BOMBE';
            if (itemid === 'hbomb')
                name = '<:HBOMB:1022102357938536458> HYPER BOMBE';
            if (itemid === 'cbomb')
                name = '<:CBOMB:1021783405161091162> CRAZY BOMBE';
        }
        if (balance < cost) {
            const missing = cost - balance;
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[CMD] ITEMBUY : ${itemid.toUpperCase()} : NOTENOUGHMONEY : ${cost}€`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        let pamount;
        if (!amount)
            pamount = 1;
        else
            pamount = amount;
        const oldamount = await ctx.bot.items.get(ctx.interaction.user.id + '-' + itemid.toUpperCase() + 'S-' + ctx.interaction.guild.id, 'amount');
        if ((pamount + oldamount) > 15) {
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You dont have enough Slots for that!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du hast nicht genug Slots dafür!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[CMD] ITEMBUY : ${itemid.toUpperCase()} : MAXSLOTS`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        let row = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setLabel('YES')
            .setCustomId('ITEM-BUY-YES-' + itemid + '-' + ctx.interaction.user.id + '-' + pamount)
            .setEmoji('1024382935618572299')
            .setStyle(discord_js_1.ButtonStyle.Success)
            .setDisabled(false), new discord_js_1.ButtonBuilder()
            .setLabel('NO')
            .setCustomId('ITEM-BUY-NO-' + itemid + '-' + ctx.interaction.user.id + '-' + pamount)
            .setEmoji('1024382939020152982')
            .setStyle(discord_js_1.ButtonStyle.Danger)
            .setDisabled(false));
        if (ctx.metadata.language === 'de') {
            row = new discord_js_1.ActionRowBuilder()
                .addComponents(new discord_js_1.ButtonBuilder()
                .setLabel('JA')
                .setCustomId('ITEM-BUY-YES-' + itemid + '-' + ctx.interaction.user.id + '-' + pamount)
                .setEmoji('1024382935618572299')
                .setStyle(discord_js_1.ButtonStyle.Success)
                .setDisabled(false), new discord_js_1.ButtonBuilder()
                .setLabel('NEIN')
                .setCustomId('ITEM-BUY-NO-' + itemid + '-' + ctx.interaction.user.id + '-' + pamount)
                .setEmoji('1024382939020152982')
                .setStyle(discord_js_1.ButtonStyle.Danger)
                .setDisabled(false));
        }
        let message;
        if (amount === null || amount === 1) {
            message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BOXCHECK:1024401101589590156> » BUY ITEM')
                .setDescription('» Do you want to buy a **' + name + '** for **$' + cost + '**?')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BOXCHECK:1024401101589590156> » GEGENSTAND KAUFEN')
                    .setDescription('» Willst du eine **' + name + '** für **' + cost + '€** kaufen?')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
        }
        else {
            message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BOXCHECK:1024401101589590156> » BUY ITEMS')
                .setDescription('» Do you want to buy **' + amount + 'x** **' + name + '** for **$' + cost + '**?')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BOXCHECK:1024401101589590156> » GEGENSTÄNDE KAUFEN')
                    .setDescription('» Willst du **' + amount + 'x** **' + name + '** für **' + cost + '€** kaufen?')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
        }
        ctx.log(false, `[CMD] ITEMBUY : ${amount}x : ${itemid.toUpperCase()} : ${cost}€`);
        return ctx.interaction.reply({ embeds: [message], components: [row] });
    }
};
//# sourceMappingURL=itembuy.js.map