const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('inventory')
    	.setDMPermission(false)
        .setDescription('SEE YOUR INVENTORY')
        .setDescriptionLocalizations({
            de: 'SEHE DEIN INVENTAR'
        })
        .addUserOption(option =>
            option.setName('user')
                .setNameLocalizations({
                    de: 'nutzer'
                })
                .setDescription('THE USER')
                .setDescriptionLocalizations({
                    de: 'DER NUTZER'
                })
                .setRequired(false)),
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const user = interaction.options.getUser("user")
        
        let nbombs, mbombs, hbombs, cbombs

        if (user == null) {
            nbombs = await item.get(interaction.user.id + '-NBOMBS-' + interaction.guild.id, 'amount')
            mbombs = await item.get(interaction.user.id + '-MBOMBS-' + interaction.guild.id, 'amount')
            hbombs = await item.get(interaction.user.id + '-HBOMBS-' + interaction.guild.id, 'amount')
            cbombs = await item.get(interaction.user.id + '-CBOMBS-' + interaction.guild.id, 'amount')
        } else {
            nbombs = await item.get(user.toString().replace(/\D/g, '') + '-NBOMBS-' + interaction.guild.id, 'amount')
            mbombs = await item.get(user.toString().replace(/\D/g, '') + '-MBOMBS-' + interaction.guild.id, 'amount')
            hbombs = await item.get(user.toString().replace(/\D/g, '') + '-HBOMBS-' + interaction.guild.id, 'amount')
            cbombs = await item.get(user.toString().replace(/\D/g, '') + '-CBOMBS-' + interaction.guild.id, 'amount')
        }

        // Get Userinfo
        let username
        if (user != null) {
            username = await client.users.fetch(user);
        }

        // Create Embed
        let message
        if (user == null) {
            message = new EmbedBuilder()
                .setTitle('» YOUR INVENTORY')
                .setDescription('» <:NBOMB:1021783222520127508> NORMAL BOMBS\n**`' + nbombs + '/10`**\n\n» <:MBOMB:1021783295211601940> MEDIUM BOMBS\n**`' + mbombs + '/10`**\n\n» <:HBOMB:1021783351947952158> HYPER BOMBS\n**`' + hbombs + '/10`**\n\n» <:CBOMB:1021783405161091162> CRAZY BOMBS\n**`' + cbombs + '/10`**')
                .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
                    .setTitle('» DEIN INVENTAR')
                    .setDescription('» <:NBOMB:1021783222520127508> NORMALE BOMBEN\n**`' + nbombs + '/10`**\n\n» <:MBOMB:1021783295211601940> MEDIUM BOMBEN\n**`' + mbombs + '/10`**\n\n» <:HBOMB:1021783351947952158> HYPER BOMBEN\n**`' + hbombs + '/10`**\n\n» <:CBOMB:1021783405161091162> CRAZY BOMBEN\n**`' + cbombs + '/10`**')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        } else {
            message = new EmbedBuilder()
                .setTitle('» THE INVENTOR OF ' + username.username.toUpperCase() + '#' + username.discriminator)
                .setDescription('» <:NBOMB:1021783222520127508> NORMAL BOMBS\n**`' + nbombs + '/10`**\n\n» <:MBOMB:1021783295211601940> MEDIUM BOMBS\n**`' + mbombs + '/10`**\n\n» <:HBOMB:1021783351947952158> HYPER BOMBS\n**`' + hbombs + '/10`**\n\n» <:CBOMB:1021783405161091162> CRAZY BOMBS\n**`' + cbombs + '/10`**')
                .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
                    .setTitle('» DAS INVENTAR VON ' + username.username.toUpperCase() + '#' + username.discriminator)
                    .setDescription('» <:NBOMB:1021783222520127508> NORMALE BOMBEN\n**`' + nbombs + '/10`**\n\n» <:MBOMB:1021783295211601940> MEDIUM BOMBEN\n**`' + mbombs + '/10`**\n\n» <:HBOMB:1021783351947952158> HYPER BOMBEN\n**`' + hbombs + '/10`**\n\n» <:CBOMB:1021783405161091162> CRAZY BOMBEN\n**`' + cbombs + '/10`**')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] INVENTORY')
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};