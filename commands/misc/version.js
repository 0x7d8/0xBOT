const { SlashCommandBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');
const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('version')
    	.setDMPermission(false)
        .setDescription('THE BOT VERSION')
        .setDescriptionLocalizations({
            de: 'DIE BOT VERSION'
        }),
    async execute(interaction, client, lang, vote) {
        // Create Embed
        let message = new EmbedBuilder()
        		.setTitle('<:GEAR:1024404241701417011> » BOT VERSION')
        		.setDescription('» VERSION\n`' + version + '`\n\n» FRAMEWORK\n`discord.js v14 (14.6.0)`\n\n» AUTHOR\n`0x4096#7678`')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

        if (lang == "de") {
            message = new EmbedBuilder()
        		.setTitle('<:GEAR:1024404241701417011> » BOT VERSION')
        		.setDescription('» VERSION\n`' + version + '`\n\n» FRAMEWORK\n`discord.js v14 (14.6.0)`\n\n» AUTOR\n`0x4096#7678`')
        		.setFooter({ text: '» ' + vote + ' » ' + version });
        }

        // Send Correct Response
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] VERSION')
        return interaction.reply({ embeds: [message], ephemeral: true })
    },
};