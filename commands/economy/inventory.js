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
        
        let nbombs, mbombs, hbombs, cbombs, carname

        if (user == null) {
            nbombs = await item.get(interaction.user.id + '-NBOMBS-' + interaction.guild.id, 'amount')
            mbombs = await item.get(interaction.user.id + '-MBOMBS-' + interaction.guild.id, 'amount')
            hbombs = await item.get(interaction.user.id + '-HBOMBS-' + interaction.guild.id, 'amount')
            cbombs = await item.get(interaction.user.id + '-CBOMBS-' + interaction.guild.id, 'amount')

            const car = await item.get(interaction.user.id + '-CAR-' + interaction.guild.id, 'value')
            carname = 'NONE'
            if (lang == 'de') {
                carname = 'KEINS'
            }
            if (car == 'jeep') { carname = '2016 JEEP PATRIOT SPORT' }
            if (car == 'kia') { carname = '2022 KIA SORENTO' }
            if (car == 'audi') { carname = 'AUDI R8 COUPE V10' }
            if (car == 'tesla') { carname = 'TESLA MODEL Y' }
            if (car == 'porsche') { carname = '2019 PORSCHE 911 GT2RS' }
        } else {
            nbombs = await item.get(user.id + '-NBOMBS-' + interaction.guild.id, 'amount')
            mbombs = await item.get(user.id + '-MBOMBS-' + interaction.guild.id, 'amount')
            hbombs = await item.get(user.id + '-HBOMBS-' + interaction.guild.id, 'amount')
            cbombs = await item.get(user.id + '-CBOMBS-' + interaction.guild.id, 'amount')

            const car = await item.get(user.id + '-CAR-' + interaction.guild.id, 'value')
            carname = 'NONE'
            if (lang == 'de') {
                carname = 'KEINS'
            }
            if (car == 'jeep') { carname = '2016 JEEP PATRIOT SPORT' }
            if (car == 'kia') { carname = '2022 KIA SORENTO' }
            if (car == 'audi') { carname = 'AUDI R8 COUPE V10' }
            if (car == 'tesla') { carname = 'TESLA MODEL Y' }
            if (car == 'porsche') { carname = '2019 PORSCHE 911 GT2RS' }
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
                .setDescription('» <:NBOMB:1021783222520127508> NORMAL BOMBS\n**`' + nbombs + '/15`**\n\n» <:MBOMB:1021783295211601940> MEDIUM BOMBS\n**`' + mbombs + '/15`**\n\n» <:HBOMB:1022102357938536458> HYPER BOMBS\n**`' + hbombs + '/15`**\n\n» <:CBOMB:1021783405161091162> CRAZY BOMBS\n**`' + cbombs + '/15`**\n\n» <:CAR:1021844412998877294> CAR\n**`' + carname + '`**')
                .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
                    .setTitle('» DEIN INVENTAR')
                    .setDescription('» <:NBOMB:1021783222520127508> NORMALE BOMBEN\n**`' + nbombs + '/15`**\n\n» <:MBOMB:1021783295211601940> MEDIUM BOMBEN\n**`' + mbombs + '/15`**\n\n» <:HBOMB:1022102357938536458> HYPER BOMBEN\n**`' + hbombs + '/15`**\n\n» <:CBOMB:1021783405161091162> CRAZY BOMBEN\n**`' + cbombs + '/15`**\n\n» <:CAR:1021844412998877294> AUTO\n**`' + carname + '`**')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        } else {
            message = new EmbedBuilder()
                .setTitle('» THE INVENTOR OF ' + username.username.toUpperCase() + '#' + username.discriminator)
                .setDescription('» <:NBOMB:1021783222520127508> NORMAL BOMBS\n**`' + nbombs + '/15`**\n\n» <:MBOMB:1021783295211601940> MEDIUM BOMBS\n**`' + mbombs + '/15`**\n\n» <:HBOMB:1022102357938536458> HYPER BOMBS\n**`' + hbombs + '/15`**\n\n» <:CBOMB:1021783405161091162> CRAZY BOMBS\n**`' + cbombs + '/15`**\n\n» <:CAR:1021844412998877294> CAR\n**`' + carname + '`**')
                .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
                    .setTitle('» DAS INVENTAR VON ' + username.username.toUpperCase() + '#' + username.discriminator)
                    .setDescription('» <:NBOMB:1021783222520127508> NORMALE BOMBEN\n**`' + nbombs + '/15`**\n\n» <:MBOMB:1021783295211601940> MEDIUM BOMBEN\n**`' + mbombs + '/15`**\n\n» <:HBOMB:1022102357938536458> HYPER BOMBEN\n**`' + hbombs + '/15`**\n\n» <:CBOMB:1021783405161091162> CRAZY BOMBEN\n**`' + cbombs + '/15`**\n\n» <:CAR:1021844412998877294> AUTO\n**`' + carname + '`**')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] INVENTORY')
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};