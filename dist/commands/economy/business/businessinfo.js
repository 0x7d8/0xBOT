"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('businessinfo')
        .setDMPermission(false)
        .setDescription('VIEW INFO ABOUT BUSINESSES')
        .setDescriptionLocalizations({
        de: 'SEHE INFOS VON GESCHÄFTEN'
    })
        .addStringOption((option) => option.setName('business')
        .setNameLocalizations({
        de: 'geschäft'
    })
        .setDescription('THE BUSINESS')
        .setDescriptionLocalizations({
        de: 'DAS GESCHÄFT'
    })
        .setRequired(true)
        .addChoices({ name: '🟢 SUPERMARKT', value: 'market' }, { name: '🔵 PARKHAUS', value: 'parking garage' }, { name: '🟡 AUTOHAUS', value: 'car dealership' })),
    async execute(ctx) {
        if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'businesses')) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» Businesses are disabled on this Server!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Geschäfte sind auf diesem Server deaktiviert!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[CMD] BUSINESS : DISABLED`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        const business = ctx.getOption('business');
        let businessid;
        if (business === 'market')
            businessid = '1';
        if (business === 'parking garage')
            businessid = '2';
        if (business === 'car dealership')
            businessid = '3';
        let businessowner;
        if (await ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-' + businessid + '-OWNER') != 0) {
            let oldleft = false;
            businessowner = await ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-' + businessid + '-OWNER');
            const businessearning = await ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-' + businessid + '-EARNING', true);
            try {
                await ctx.interaction.guild.members.fetch(businessowner);
            }
            catch (e) {
                oldleft = true;
            }
            if (!oldleft) {
                let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:QUESTION:1024402860210921503> » BUSINESS INFO')
                    .setDescription('» Business Infos:\n\nOwner: <@' + businessowner + '>\nEarnings: ' + businessearning + '€')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
                if (ctx.metadata.language === 'de') {
                    message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                        .setTitle('<:QUESTION:1024402860210921503> » GESCHÄFTS INFO')
                        .setDescription('» Geschäfts Infos:\n\nBesitzer: <@' + businessowner + '>\nEinkommen: ' + businessearning + '€')
                        .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
                }
                ctx.log(false, `[CMD] BUSINESSINFO : ${business.toUpperCase()}`);
                return ctx.interaction.reply({ embeds: [message], ephemeral: true });
            }
        }
        let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:QUESTION:1024402860210921503> » BUSINESS INFO')
            .setDescription('» Noone owns this Business, people say its profitable though!\n*mhm, I say that for everything*')
            .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
        if (ctx.metadata.language === 'de') {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:QUESTION:1024402860210921503> » GESCHÄFTS INFO')
                .setDescription('» Niemanden gehört dieses Geschäft, es besagt sich es sei aber profitabel!\n*naja, das sag ich bei jedem*')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
        }
        ctx.log(false, `[CMD] BUSINESSINFO : ${business.toUpperCase()} : NOTOWNED`);
        return ctx.interaction.reply({ embeds: [message], ephemeral: true });
    }
};
//# sourceMappingURL=businessinfo.js.map