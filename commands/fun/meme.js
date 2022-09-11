const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');
const fetch = require("node-fetch");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
    	.setDMPermission(false)
        .setDescription('GET A MEME')
        .setDescriptionLocalizations({
            de: 'BEKOMME EIN MEME'
        }),
    async execute(interaction, client) {
        // Set Variables
        const res = Math.floor(Math.random() * (4 - 1 + 1)) + 1;

        // Set Subreddit
        let subreddit
        if (res == 1) { subreddit = "memes" }
        if (res == 2) { subreddit = "me_irl" }
        if (res == 3) { subreddit = "CrappyDesign" }
        if (res == 4) { subreddit = "Gittertiere" }

        // Get Initial Meme
        const url = await fetch("https://www.reddit.com/r/" + subreddit + "/random/.json");
        const random = await url.json();

        let upvotes = random[0].data.children[0].data.ups;
        let comments = random[0].data.children[0].data.num_comments;

        // 187 Easter Egg
        if (upvotes == 187) { upvotes = upvotes + ' 🐊' }
        if (comments == 187) { comments = comments + ' 🐊' }
        
        // Create Embed
        let message = new EmbedBuilder()
            .setTitle(`» ${random[0].data.children[0].data.title.toUpperCase()}`)
            .setDescription('» SUBREDDIT:\n`r/' + subreddit + '`\n\n» UPVOTES:\n`' + upvotes + '`\n\n» COMMENTS:\n`' + comments + '`')
            .setImage(random[0].data.children[0].data.url)
        	.setFooter({ text: '» ' + version });

        if (interaction.guildLocale == "de") {
            message = new EmbedBuilder()
                .setTitle(`» ${random[0].data.children[0].data.title.toUpperCase()}`)
                .setDescription('» SUBREDDIT:\n`r/' + subreddit + '`\n\n» UPVOTES:\n`' + upvotes + '`\n\n» KOMMENTARE:\n`' + comments + '`')
                .setImage(random[0].data.children[0].data.url)
        	    .setFooter({ text: '» ' + version });
        }
        
        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] MEME : ' + subreddit.toUpperCase() + ' : ' + upvotes + '^ : ' + comments)
        await return interaction.reply({ embeds: [message.toJSON()] })
    },
};