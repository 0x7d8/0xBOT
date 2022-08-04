const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');
const fetch = require("node-fetch");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
    	.setDMPermission(false)
        .setDescription('BEKOMME EIN MEME'),
        /* Not Finished
        .addStringOption(option =>
            option.setName('upvotes')
                .setDescription('DIE UPVOTES')
                .setRequired(false)
        		.addChoices(
            		// Setup Choices
					{ name: '💻 100+', value: '100' },
					{ name: '💻 500+', value: '500' },
					{ name: '💻 1000+', value: '1000' },
            		{ name: '💻 5000+', value: '5000' },
            		{ name: '💻 10000+', value: '10000' },
				)),
                    */
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)

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

        // Set Variables
        const res = Math.floor(Math.random() * (3 - 1 + 1)) + 1;

        // Set Subreddit
        if (res == 1) { var subreddit = "memes" }
        if (res == 2) { var subreddit = "me_irl" }
        if (res == 3) { var subreddit = "CrappyDesign" }

        // Get Initial Meme
        var url = await fetch("https://www.reddit.com/r/" + subreddit + "/random/.json");
        var random = await url.json();

        var upvotes = random[0].data.children[0].data.ups;
        var comments = random[0].data.children[0].data.num_comments;

        /* Set Variables
        var upvote = interaction.options.getString("upvotes")
        if (upvote == null) { var upvote = 0 }

        if (upvotes < upvote) {
            loop:
            while (upvotes < upvote) {
                // Get Meme
                var url = await fetch("https://www.reddit.com/r/memes/random/.json");
                var random = await url.json();
        
                var upvotes = random[0].data.children[0].data.ups;
                var comments = random[0].data.children[0].data.num_comments;

                continue loop;
            }
        }
        */

        // 187 Easter Egg
        if (upvotes == 187) { var upvotes = upvotes + ' 🐊' }
        if (comments == 187) { var comments = comments + ' 🐊' }
        
        // Create Embed
        var message = new EmbedBuilder()
            .setTitle(`» ${random[0].data.children[0].data.title.toUpperCase()}`)
            .setDescription('» SUBREDDIT:\n`r/' + subreddit + '`\n\n» UPVOTES:\n`' + upvotes + '`\n\n» KOMMENTARE:\n`' + comments + '`')
            .setImage(random[0].data.children[0].data.url)
        	.setFooter({ text: '» ' + version });
        
        // Send Message
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] MEME : ' + upvotes + '^ : ' + comments)
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};