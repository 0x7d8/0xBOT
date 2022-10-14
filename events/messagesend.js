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
                // Create Embed
                let embed = new EmbedBuilder()
                    .setTitle('<:AWARD:1024385473524793445> » LEVEL')
                    .setDescription('» Good Writing! You are now level **' + newlevel[0] + '** on **' + message.guild.name + '**.')
                    .setFooter({ text: ' » ' + config.version });

                if (await lang.get(message.author.id) == 1) {
                    embed = new EmbedBuilder()
                        .setTitle('<:AWARD:1024385473524793445> » LEVEL')
                        .setDescription('» Gutes Schreiben! Du bist nun Level **' + newlevel[0] + '** auf **' + message.guild.name + '**.')
                        .setFooter({ text: '» ' + config.version });
                }

                // Send Message
                return client.users.send(message.author.id, { embeds: [embed] });
            }
        }
	},
};