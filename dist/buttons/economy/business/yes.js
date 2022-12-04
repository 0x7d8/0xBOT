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
        name: 'business-yes'
    },
    async execute(interaction, client, lang, vote, business, userid, type) {
        const balance = await bot.money.get(interaction.user.id);
        let businessid;
        if (business === 'market')
            businessid = '1';
        if (business === 'parking garage')
            businessid = '2';
        if (business === 'car dealership')
            businessid = '3';
        let cost;
        if (business === 'market')
            cost = 150000;
        if (business === 'parking garage')
            cost = 390000;
        if (business === 'car dealership')
            cost = 520000;
        let name;
        if (business === 'market')
            name = 'MARKET';
        if (business === 'parking garage')
            name = 'PARKING GARAGE';
        if (business === 'car dealership')
            name = 'CAR DEALERSHIP';
        if (lang == 'de') {
            if (business === 'market')
                name = 'SUPERMARKT';
            if (business === 'parking garage')
                name = 'PARKHAUS';
            if (business === 'car dealership')
                name = 'AUTOHAUS';
        }
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
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] BUSINESSBUY : NOTSENDER');
            return interaction.reply({ embeds: [message], ephemeral: true });
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
                bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] BUSINESSBUY : ' + name.toUpperCase() + ' : NOTENOUGHMONEY : ' + cost + '€');
                return interaction.reply({ embeds: [message], ephemeral: true });
            }
            if (await bot.businesses.get('u-' + interaction.user.id + '-' + interaction.guild.id + '-BUSINESS') !== 0) {
                const userbusiness = await bot.businesses.get('u-' + interaction.user.id + '-' + interaction.guild.id + '-BUSINESS');
                let name;
                if (userbusiness === 'market')
                    name = 'MARKET';
                if (userbusiness === 'parking garage')
                    name = 'PARKING GARAGE';
                if (userbusiness === 'car dealership')
                    name = 'CAR DEALERSHIP';
                if (lang == 'de') {
                    if (userbusiness === 'market')
                        name = 'SUPERMARKT';
                    if (userbusiness === 'parking garage')
                        name = 'PARKHAUS';
                    if (userbusiness === 'car dealership')
                        name = 'AUTOHAUS';
                }
                let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                    .setDescription('» You already own a **' + name + '**!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
                if (lang == 'de') {
                    message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                        .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                        .setDescription('» Du besitzt schon ein **' + name + '**!')
                        .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
                }
                bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] BUSINESSBUY : ALREADYBUSINESS');
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
                    id: `1x ${business.toUpperCase()}`,
                    amount: cost,
                    type: 'positive'
                }
            });
            bot.money.rem(interaction.guild.id, interaction.user.id, cost);
            bot.businesses.set('g-' + interaction.guild.id + '-' + businessid + '-OWNER', interaction.user.id);
            bot.businesses.set('u-' + interaction.user.id + '-' + interaction.guild.id + '-BUSINESS', business);
            if (business === 'market') {
                bot.businesses.set('g-' + interaction.guild.id + '-1-PRICE-NBOMB', '500');
                bot.businesses.set('g-' + interaction.guild.id + '-1-PRICE-MBOMB', '1500');
                bot.businesses.set('g-' + interaction.guild.id + '-1-PRICE-HBOMB', '5000');
                bot.businesses.set('g-' + interaction.guild.id + '-1-PRICE-CBOMB', '15000');
            }
            if (business === 'car dealership') {
                bot.businesses.set('g-' + interaction.guild.id + '-3-PRICE-JEEP', '10000');
                bot.businesses.set('g-' + interaction.guild.id + '-3-PRICE-KIA', '75000');
                bot.businesses.set('g-' + interaction.guild.id + '-3-PRICE-AUDI', '180000');
                bot.businesses.set('g-' + interaction.guild.id + '-3-PRICE-TESLA', '250000');
                bot.businesses.set('g-' + interaction.guild.id + '-3-PRICE-PORSCHE', '520000');
            }
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BOXCHECK:1024401101589590156> » BUY BUSINESS')
                .setDescription('» You successfully bought a **' + name + '** for **$' + cost + '**!\n\nID: ' + transaction.id)
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang == 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BOXCHECK:1024401101589590156> » GESCHÄFT KAUFEN')
                    .setDescription('» Du hast erfolgreich ein **' + name + '** für **' + cost + '€** gekauft!\n\nID: ' + transaction.id)
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] BUSINESSBUY : ' + name + ' : CONFIRM');
            return interaction.update({ embeds: [message], components: interaction.message.components });
        }
        else if (type === 'sell') {
            const business = await bot.businesses.get('u-' + interaction.user.id + '-' + interaction.guild.id + '-BUSINESS');
            let businessid;
            if (business === 'market')
                businessid = '1';
            if (business === 'parking garage')
                businessid = '2';
            if (business === 'car dealership')
                businessid = '3';
            let cost;
            if (business === 'market')
                cost = 150000;
            if (business === 'parking garage')
                cost = 390000;
            if (business === 'car dealership')
                cost = 520000;
            if (await bot.businesses.get('u-' + interaction.user.id + '-' + interaction.guild.id + '-BUSINESS', false) === 0) {
                let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                    .setDescription('» You dont own a Business!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
                if (lang === 'de') {
                    message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                        .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                        .setDescription('» Du besitzt kein Geschäft!')
                        .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
                }
                bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BUSINESSSELL : DONTOWNBUSINESS');
                return interaction.reply({ embeds: [message], ephemeral: true });
            }
            {
                interaction.message.components[0].components[0].data.disabled = true;
                interaction.message.components[0].components[1].data.disabled = true;
                interaction.message.components[0].components[1].data.style = 2;
            }
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BOXCHECK:1024401101589590156> » SELL BUSINESS')
                .setDescription('» You successfully sold your **' + name + '** for **$' + (cost / 2) + '**!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang == 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BOXCHECK:1024401101589590156> » GESCHÄFT VERKAUFEN')
                    .setDescription('» Du hast erfolgreich dein **' + name + '** für **' + (cost / 2) + '€** verkauft!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.money.add(interaction.guild.id, interaction.user.id, (cost / 2));
            bot.businesses.del('u-' + interaction.user.id + '-' + interaction.guild.id + '-BUSINESS');
            bot.businesses.del('g-' + interaction.guild.id + '-' + businessid + '-OWNER');
            if (business === 'market') {
                bot.businesses.del('g-' + interaction.guild.id + '-1-PRICE-NBOMB');
                bot.businesses.del('g-' + interaction.guild.id + '-1-PRICE-MBOMB');
                bot.businesses.del('g-' + interaction.guild.id + '-1-PRICE-HBOMB');
                bot.businesses.del('g-' + interaction.guild.id + '-1-PRICE-CBOMB');
            }
            if (business === 'car dealership') {
                bot.businesses.del('g-' + interaction.guild.id + '-3-PRICE-JEEP');
                bot.businesses.del('g-' + interaction.guild.id + '-3-PRICE-KIA');
                bot.businesses.del('g-' + interaction.guild.id + '-3-PRICE-AUDI');
                bot.businesses.del('g-' + interaction.guild.id + '-3-PRICE-TESLA');
                bot.businesses.del('g-' + interaction.guild.id + '-3-PRICE-PORSCHE');
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] BUSINESSSELL : ' + name + ' : CONFIRM');
            return interaction.update({ embeds: [message], components: interaction.message.components });
        }
    }
};
//# sourceMappingURL=yes.js.map