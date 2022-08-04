const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');
const fetch = require("node-fetch");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
    	.setDMPermission(false)
        .setDescription('BEKOMME EIN MEME'),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)

        // Set Variables
        const url = await fetch("https://www.reddit.com/r/memes/random/.json");
        const random = await url.json();
        
        var upvotes = random[0].data.children[0].data.ups;
        var comments = random[0].data.children[0].data.num_comments;
        
        // Check Maintenance
        const { maintenance } = require('../../config.json');
        if (maintenance == 'yes' && interaction.user.id != '745619551865012274') {
            // Create Embed
            var err = new EmbedBuilder()
        		.setTitle('» FEHLER')
        		.setDescription('» Der Bot ist aktuell unter Wartungsarbeiten!')
        		.setFooter({ text: '» ' + version });
            
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }

        // 187 Easter Egg
        if (upvotes == 187) { var upvotes = upvotes + ' 🐊' }
        if (comments == 187) { var comments = comments + ' 🐊' }
        
        // Create Embed
        var message = new EmbedBuilder()
            .setTitle(`» ${random[0].data.children[0].data.title.toUpperCase()}`)
            .setDescription('» SUBREDDIT:\n`r/memes`\n» UPVOTES:\n`' + upvotes + '`\n» KOMMENTARE:\n`' + comments + '`')
            .setImage(random[0].data.children[0].data.url)
        	.setFooter({ text: '» ' + version });
        
        // Send Message
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] MEME')
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};