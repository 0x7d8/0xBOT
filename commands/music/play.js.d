const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders')

module.exports = {
	data: new SlashCommandBuilder()
        .setName('play')
    	.setDMPermission(false)
        .setDescription('PLAY A SONG')
        .setDescriptionLocalizations({
            de: 'SPIELE EINEN SONG'
        })
        .addStringOption(option =>
            option.setName('url')
                .setDescription('THE URL')
                .setDescriptionLocalizations({
                    de: 'DIE URL'
                })
                .setRequired(true)),
    async execute(interaction, client, lang, vote) {
		// Set Variables
        const query = interaction.options.getString('url')
        console.log(interaction.user.voice)

        // Check if Channel is available
		if (!interaction.user.voice.channel) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription(`» Please join ${interaction.user.guild.me.voice.channel ? "__my__" : "a"} Voice Channel first!`)
                .setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription(`» Bitte betritt erst ${interaction.user.guild.me.voice.channel ? "__meinen__" : "einen"} Sprachkanal!`)
                    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] PLAY : ' + songurl + ' : NOTVC')
            interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Check if Channel is Full
		if (interaction.user.voice.channel !== 0 && interaction.user.voice.channel.full) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You Voice Channel is full!')
                .setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Dein Sprachkanal ist voll!')
                    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild, '[CMD] PLAY : ' + songurl + ' : FULLVC')
			return interaction.reply({ embeds: [message], ephemeral: true })
        }

			/*if (channel.guild.me.voice.channel && channel.guild.me.voice.channel.id !== interaction.user.voice.channel.id) {
				return message.reply({
					embeds: [new MessageEmbed()
						.setColor(ee.wrongcolor)
						.setFooter(ee.footertext, ee.footericon)
						.setTitle(`${client.allEmojis.x} I am already connected somewhere else`)
					],
				});
			}
			if (!args[0]) {
				return message.reply({
					embeds: [new MessageEmbed()
						.setColor(ee.wrongcolor)
						.setFooter(ee.footertext, ee.footericon)
						.setTitle(`${client.allEmojis.x} **Please add a Search Query!**`)
						.setDescription(`**Usage:**\n> \`${client.settings.get(message.guild.id, "prefix")}play <Search/Link>\``)
					],
				});
			}*/

        // Set Queue
		const queue = client.distube.getQueue(interaction.guild.id)
		let options = {
			"member": interaction.user,
		}; if (!queue) options.textChannel = guild.channels.cache.get(interaction.channel.id)

        // Play Song
		await client.distube.playVoiceChannel(interaction.user.voice.channel, query, options)

        // Create Embed
        let message = new EmbedBuilder().setColor(0x37009B)
            .setTitle('<:EXCLAMATION:1024407166460891166> » MUSIC')
            .setDescription('» Playing **' + query + '**!')
            .setFooter({ text: '» ' + vote + ' » ' + config.version });

        if (lang === 'de') {
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » MUSIC')
                .setDescription('» Spiele **' + query + '**!')
                .setFooter({ text: '» ' + vote + ' » ' + config.version });
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild, '[CMD] PLAY : ' + songurl)
		return interaction.reply({ embeds: [message] })
	}
}