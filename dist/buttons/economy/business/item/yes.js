"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const bot = __importStar(require("@functions/bot.js"));
exports.default = {
    data: {
        name: 'item-yes'
    },
    async execute(interaction, client, lang, vote, itemid, userid, type, amount) {
        if (interaction.user.id !== userid) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» This choice is up to <@' + userid + '>!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Diese Frage ist für <@' + userid + '>!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] ITEMBUY : NOTSENDER');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        const balance = await bot.money.get(interaction.user.id);
        let cost, dopay = false;
        if (await bot.businesses.get('g-' + interaction.guild.id + '-1-PRICE-' + itemid.toUpperCase()) === '0' || await bot.businesses.get('g-' + interaction.guild.id + '-1-PRICE-' + itemid.toUpperCase()) === 0) {
            if (itemid === 'nbomb')
                cost = 500 * amount;
            if (itemid === 'mbomb')
                cost = 1000 * amount;
            if (itemid === 'hbomb')
                cost = 5000 * amount;
            if (itemid === 'cbomb')
                cost = 15000 * amount;
        }
        else {
            dopay = true;
            cost = Number(await bot.businesses.get('g-' + interaction.guild.id + '-1-PRICE-' + itemid.toUpperCase())) * amount;
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
        if (lang == 'de') {
            if (itemid === 'nbomb')
                name = '<:NBOMB:1021783222520127508> NORMALE BOMBE';
            if (itemid === 'mbomb')
                name = '<:MBOMB:1021783295211601940> MEDIUM BOMBE';
            if (itemid === 'hbomb')
                name = '<:HBOMB:1022102357938536458> HYPER BOMBE';
            if (itemid === 'cbomb')
                name = '<:CBOMB:1021783405161091162> CRAZY BOMBE';
        }
        if (type === 'buy') {
            if (balance < cost) {
                const missing = cost - balance;
                let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                    .setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
                if (lang === 'de') {
                    message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                        .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                        .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
                        .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
                }
                bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] ITEMBUY : ' + itemid.toUpperCase() + ' : NOTENOUGHMONEY : ' + cost + '€');
                return interaction.reply({ embeds: [message], ephemeral: true });
            }
            const oldamount = await bot.items.get(interaction.user.id + '-' + itemid.toUpperCase() + 'S-' + interaction.guild.id, 'amount');
            if ((amount + oldamount) > 15) {
                let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                    .setDescription('» You dont have enough Slots for that!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
                if (lang === 'de') {
                    message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                        .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                        .setDescription('» Du hast nicht genug Slots dafür!')
                        .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
                }
                bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] ITEMBUY : ' + itemid.toUpperCase() + ' : MAXSLOTS');
                return interaction.reply({ embeds: [message], ephemeral: true });
            }
            {
                interaction.message.components[0].components[0].data.disabled = true;
                interaction.message.components[0].components[1].data.disabled = true;
                interaction.message.components[0].components[1].data.style = 2;
            }
            const transaction = await bot.transactions.log({
                success: true,
                sender: {
                    id: interaction.user.id,
                    amount: cost,
                    type: 'negative'
                }, reciever: {
                    id: `${amount}x ${itemid.toUpperCase()}`,
                    amount: cost,
                    type: 'positive'
                }
            });
            let message;
            if (amount === 1) {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BOXCHECK:1024401101589590156> » BUY ITEM')
                    .setDescription('» You successfully bought a **' + name + '** for **$' + cost + '**!\n\nID: ' + transaction.id)
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
                if (lang == 'de') {
                    message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                        .setTitle('<:BOXCHECK:1024401101589590156> » GEGENSTAND KAUFEN')
                        .setDescription('» Du hast erfolgreich eine **' + name + '** für **' + cost + '€** gekauft!\n\nID: ' + transaction.id)
                        .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
                }
            }
            else {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BOXCHECK:1024401101589590156> » BUY ITEMS')
                    .setDescription('» You successfully bought **' + amount + 'x** **' + name + '** for **$' + cost + '**!\n\nID: ' + transaction.id)
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
                if (lang == 'de') {
                    message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                        .setTitle('<:BOXCHECK:1024401101589590156> » GEGENSTÄNDE KAUFEN')
                        .setDescription('» Du hast erfolgreich **' + amount + 'x** **' + name + '** für **' + cost + '€** gekauft!\n\nID: ' + transaction.id)
                        .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
                }
            }
            bot.money.rem(interaction.guild.id, interaction.user.id, cost);
            if (dopay) {
                const businessowner = await bot.businesses.get('g-' + interaction.guild.id + '-1-OWNER');
                if (itemid == 'nbomb') {
                    bot.money.add(interaction.guild.id, businessowner, cost - 250);
                    bot.businesses.add('g-' + interaction.guild.id + '-1-EARNING', cost - 250);
                }
                if (itemid == 'mbomb') {
                    bot.money.add(interaction.guild.id, businessowner, cost - 750);
                    bot.businesses.add('g-' + interaction.guild.id + '-1-EARNING', cost - 750);
                }
                if (itemid == 'hbomb') {
                    bot.money.add(interaction.guild.id, businessowner, cost - 2500);
                    bot.businesses.add('g-' + interaction.guild.id + '-1-EARNING', cost - 2500);
                }
                if (itemid == 'cbomb') {
                    bot.money.add(interaction.guild.id, businessowner, cost - 7500);
                    bot.businesses.add('g-' + interaction.guild.id + '-1-EARNING', cost - 7500);
                }
            }
            bot.items.add(interaction.user.id + '-' + itemid.toUpperCase() + 'S-' + interaction.guild.id, amount);
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] ITEMBUY : ' + amount + 'x : ' + itemid.toUpperCase() + ' : CONFIRM');
            return interaction.update({ embeds: [message], components: interaction.message.components });
        }
        else if (type === 'sell') {
        }
    }
};
//# sourceMappingURL=yes.js.map