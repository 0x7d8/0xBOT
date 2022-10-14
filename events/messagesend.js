const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders')

module.exports = {
	name: 'MESSAGE SEND',
	event: 'messageCreate',
	once: false,
	async execute(message, client) {
		if (!message.author.bot && parseInt(message.guildId) > 1000 && parseInt(await gopt.get(message.guildId + '-LEVEL')) === 0) {
            let cache

            // Get Old Level
            cache = await bot.stat.get('u-' + message.author.id + '-' + message.guildId + '-C', 'msg')
            const oldlevel = (Math.round(((cache/2)/500/5) * 1000) / 1000).toString().split('.')

            // Level Stats
            await bot.stat.add('u-' + message.author.id + '-TOTAL-A', 'msg', 1)
            await bot.stat.add('u-' + message.author.id + '-' + message.guildId + '-A', 'msg', 1)
            await bot.stat.add('u-' + message.author.id + '-TOTAL-C', 'msg', message.content.length)
            await bot.stat.add('u-' + message.author.id + '-' + message.guildId + '-C', 'msg', message.content.length)

            // Get New Level
            cache = await bot.stat.get('u-' + message.author.id + '-' + message.guildId + '-C', 'msg')
            const newlevel = (Math.round(((cache/2)/500/5) * 1000) / 1000).toString().split('.')

            // Send LevelUp Message if needed
            if (parseInt(oldlevel[0]) < parseInt(newlevel[0])) {
                // Get Guild Language
	            let guildlang = "en"
	            const glang = await lang.get(message.guildId)
                if (parseInt(glang) == 1) { guildlang = "de" }

                // Create Button
                const button = new ActionRowBuilder()
			        .addComponents(
			        	new ButtonBuilder()
			        		.setEmoji('1030476921777180672')
                            .setCustomId('rem-levelmsg')
			        		.setStyle(ButtonStyle.Danger),
			        );

                // Create Embed
                let content = `» Good Writing <@${message.author.id}>! You are now Level **${newlevel[0]}**.\nTo view your level do </level:1030147810194100245>`

                if (guildlang === 'de') {
                    content = `» Gutes schreiben <@${message.author.id}>! Du bist nun Level **${newlevel[0]}**.\nZum anschauen deines Levels mach </level:1030147810194100245>`
                }

                // Send Message
                return message.channel.send({ content: content, components: [button] });
            }
        }
	},
};