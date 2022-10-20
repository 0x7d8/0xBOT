const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('apiedit')
        .setDescription('CHANGE AN API')
        .setDescriptionLocalizations({
            de: 'ÄNDERE EINE EMBED'
        })
    	.setDMPermission(false)
        .addStringOption(option =>
            option.setName('name')
                .setDescription('THE NAME')
                .setDescriptionLocalizations({
                    de: 'DER NAME'
                })
                .setRequired(true)
        		.addChoices(
            		// Setup Choices
					{ name: '💻 1', value: '1' },
					{ name: '💻 2', value: '2' },
					{ name: '💻 3', value: '3' },
            		{ name: '💻 4', value: '4' },
            		{ name: '💻 5', value: '5' },
				)),
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const name = interaction.options.getString("name")
        const amount = await bot.apis.get(interaction.user.id)

       	// Check if API even exists
        if (await uapi.get(interaction.user.id + '-' + name) !== 'N-EXIST') {
            // Create Modal
            const modal = new ModalBuilder()
			.setCustomId('API-' + name + '-EDIT')
			.setTitle('API CONTENT');

		    const contentInput = new TextInputBuilder()
			    .setCustomId('api-content')
			    .setLabel('Please enter the Content of your API.')
                .setMinLength(1)
			    .setStyle(TextInputStyle.Paragraph)

		    const content = new ActionRowBuilder().addComponents(contentInput)
		    modal.addComponents(content)

            // Send Modal
            return interaction.showModal(modal)
        } else {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» This API doesnt exist!\n</apicreate:1002107281510506516> to Create one')
        		.setFooter({ text: '» ' + config.version + ' » SLOTS ' + amount + '/5'});

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Diese API existiert nicht!\n</apicreate:1002107281510506516> um eine zu erstellen')
        		    .setFooter({ text: '» ' + config.version + ' » SLOTS ' + amount + '/5'});
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] APIEDIT : ' + name + ' : NOTFOUND')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }
    },
};