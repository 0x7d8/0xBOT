"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    data: {
        name: 'business-no'
    },
    async execute(ctx, business, userid, type) {
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
        if (ctx.metadata.language == 'de') {
            if (business === 'market')
                name = 'SUPERMARKT';
            if (business === 'parking garage')
                name = 'PARKHAUS';
            if (business === 'car dealership')
                name = 'AUTOHAUS';
        }
        if (ctx.interaction.user.id !== userid) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» This choice is up to <@' + userid + '>!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Diese Frage ist für <@' + userid + '>!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[BTN] BUSINESSBUY : NOTSENDER`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        {
            ctx.interaction.message.components[0].components[0].data.disabled = true;
            ctx.interaction.message.components[0].components[1].data.disabled = true;
            ctx.interaction.message.components[0].components[1].data.style = 2;
        }
        if (type === 'buy') {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BOXCHECK:1024401101589590156> » BUY BUSINESS')
                .setDescription('» <@' + ctx.interaction.user.id + '> said **NO** to a **' + name + '**.')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BOXCHECK:1024401101589590156> » GESCHÄFT KAUFEN')
                    .setDescription('» <@' + ctx.interaction.user.id + '> hat **NEIN** zu einem **' + name + '** gesagt.')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[BTN] BUSINESSBUY : ${name} : DENY`);
            return ctx.interaction.update({ embeds: [message], components: ctx.interaction.message.components });
        }
        else if (type === 'sell') {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BOXCHECK:1024401101589590156> » SELL BUSINESS')
                .setDescription('» <@' + ctx.interaction.user.id + '> said **NO** to selling his **' + name + '**.')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BOXCHECK:1024401101589590156> » GESCHÄFT VERKAUFEN')
                    .setDescription('» <@' + ctx.interaction.user.id + '> hat **NEIN** zum verkaufen von seinem **' + name + '** gesagt.')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[BTN] BUSINESSSELL : ${name} : DENY`);
            return ctx.interaction.update({ embeds: [message], components: ctx.interaction.message.components });
        }
    }
};
//# sourceMappingURL=no.js.map