const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { evaluate, pi, pow, round, sqrt } = require('mathjs')
const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder } = require('@discordjs/builders')
const { version } = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('itemuse')
        .setDescription('USE AN ITEM')
        .setDescriptionLocalizations({
            de: 'NUTZE EINEN GEGENSTAND'
        })
    	.setDMPermission(false)
        .addUserOption(option =>
            option.setName('user')
                .setNameLocalizations({
                    de: 'nutzer'
                })
                .setDescription('THE USER')
                .setDescriptionLocalizations({
                    de: 'DER NUTZER'
                })
                .setRequired(true))
        .addStringOption(option =>
            option.setName('item')
                .setNameLocalizations({
                    de: 'gegenstand'
                })
                .setDescription('THE itemid')
				.setDescriptionLocalizations({
                    de: 'DER GEGENSTAND'
                })
                .setRequired(true)
    			.addChoices(
            		// Setup Choices
            		{ name: '💣 NORMALE BOMBE', value: 'nbomb-bomb' },
            		{ name: '💣 MEDIUM BOMBE', value: 'mbomb-bomb' },
            		{ name: '💣 HYPER BOMBE', value: 'hbomb-bomb' },
            		{ name: '💣 CRAZY BOMBE', value: 'cbomb-bomb' },
				)),
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const user = interaction.options.getUser("user")
        const itemstr = interaction.options.getString("item")
        const cache = itemstr.split('-');
        const [itemid, itemcat] = cache

        // Check if Bombs are Enabled in Server
        const bes = await gopt.get(interaction.guild.id + '-BOMBS')
        if (parseInt(bes) == 1 && itemcat == bomb) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» Bombs are disabled on this Server!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Bomben sind auf diesem Server deaktiviert!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BOMB : DISABLED')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Translate to Item Names
        let name
        if (itemid == 'nbomb') { name = '<:NBOMB:1021783222520127508> NORMAL BOMB' }
        if (itemid == 'mbomb') { name = '<:MBOMB:1021783295211601940> MEDIUM BOMB' }
        if (itemid == 'hbomb') { name = '<:HBOMB:1022102357938536458> HYPER BOMB' }
        if (itemid == 'cbomb') { name = '<:CBOMB:1021783405161091162> CRAZY BOMB' }
        if (lang == 'de') {
            if (itemid == 'nbomb') { name = '<:NBOMB:1021783222520127508> NORMALE BOMBE' }
            if (itemid == 'mbomb') { name = '<:MBOMB:1021783295211601940> MEDIUM BOMBE' }
            if (itemid == 'hbomb') { name = '<:HBOMB:1022102357938536458> HYPER BOMBE' }
            if (itemid == 'cbomb') { name = '<:CBOMB:1021783405161091162> CRAZY BOMBE' }
        }

        // Check if Target is Bot
        const userinfo = await client.users.fetch(user);
        if (userinfo.bot == true) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» You cant use Items on Bots!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Du kannst keine Gegenstände auf einem Bot nutzen!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ITEMUSE : ' + user.id + ' : BOT : ' + itemid.toUpperCase())
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check if User has enough of the Item
        if (await item.get(interaction.user.id + '-' + itemid.toUpperCase() + 'S-' + interaction.guild.id, 'amount') < 1) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» You dont have enough of that Item!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Du hast nicht genug von dem Gegenstand!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ITEMUSE : ' + user.id + ' : NOTENOUGHITEMS : ' + itemid.toUpperCase())
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check if User is Author
        if (interaction.user.id == user.id && itemcat == 'bomb') {
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You cant use Bombs on yourself?')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Du kannst Bomben nicht auf dir selber nutzen?')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ITEMUSE : ' + user.id + ' : ' + itemid.toUpperCase())
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Fetch Channel for Later
        const channel = interaction.channel
        const messages = channel.messages.fetch()
        bombcache[user.id] = messages

        // Init Timeout Function
        eval('global.bombtf' + user.id + ' = true')

        // Generate Math Questions
        let math
        if (itemid == 'nbomb') { math = (Math.floor(Math.random() * (1000 - 80 + 1)) + 80) + ' + ' + (Math.floor(Math.random() * (20 - 10 + 1)) + 10) + ' - ' + (Math.floor(Math.random() * (200 - 150 + 1)) + 150) }
        if (itemid == 'mbomb') { math = (Math.floor(Math.random() * (20 - 10 + 1)) + 10) + ' * ' + (Math.floor(Math.random() * (30 - 10 + 1)) + 10) + ' - ' + (Math.floor(Math.random() * (100 - 60 + 1)) + 60) }
        if (itemid == 'hbomb') { math = (Math.floor(Math.random() * (20 - 10 + 1)) + 10) + ' * ' + (Math.floor(Math.random() * (40 - 10 + 1)) + 10) + ' * ' + (Math.floor(Math.random() * (100 - 60 + 1)) + 60) }
        if (itemid == 'cbomb') { math = (Math.floor(Math.random() * (40 - 10 + 1)) + 10) + ' * (' + (Math.floor(Math.random() * (4000 - 100 + 1)) + 100) + ' + ' + (Math.floor(Math.random() * (2000 - 600 + 1)) + 600) + ')' }

        // Solve the Math Question
        const mathres = await evaluate(math)

        // Generate Button Labels
        let b1 = (mathres - Math.floor(Math.random() * (50 - 10 + 1)) + 10)
        let b2 = (mathres + Math.floor(Math.random() * (50 - 10 + 1)) + 10)
        let b3 = (mathres + Math.floor(Math.random() * (100 - 50 + 1)) + 50)
        let b4 = (mathres - Math.floor(Math.random() * (10 - 1 + 1)) + 1)
        const sb = Math.floor(Math.random() * (4 - 1 + 1)) + 1
        await eval('b' + sb + ' = ' + mathres)

        // Create Buttons
        let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel(b1.toString())
                    .setCustomId('BOMB-' + mathres + '-' + b1 + '-' + sb + '-1-' + itemid + '-' + user.id)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
					.setLabel(b2.toString())
                    .setCustomId('BOMB-' + mathres + '-' + b2 + '-' + sb + '-2-' + itemid + '-' + user.id)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
					.setLabel(b3.toString())
                    .setCustomId('BOMB-' + mathres + '-' + b3 + '-' + sb + '-3-' + itemid + '-' + user.id)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
					.setLabel(b4.toString())
                    .setCustomId('BOMB-' + mathres + '-' + b4 + '-' + sb + '-4-' + itemid + '-' + user.id)
					.setStyle(ButtonStyle.Secondary),
			);
        
        // Create Embed
        let message
        if (itemcat == 'bomb') {
      	    message = new EmbedBuilder()
                .setTitle('<:BOXOPEN:1024395281460101213> » USE ITEM')
  		    	.setDescription('» Oh <@' + user.id + '>, <@' + interaction.user.id + '> used a **' + name + '** on you!\nIf you solve this Math Equation, it wont do anything.\n\n**```' + math + '```**\nThe Bomb explodes <t:' + (Math.floor(+new Date() / 1000) + 10) + ':R>')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
                    .setTitle('<:BOXOPEN:1024395281460101213> » GEGENSTAND NUTZEN')
  		    	    .setDescription('» Oh <@' + user.id + '>, <@' + interaction.user.id + '> hat eine **' + name + '** an dir benutzt!\nFalls du dieses Mathe Rätsel löst, passiert nichts.\n\n**```' + math + '```**\nDie Bombe explodiert <t:' + (Math.floor(+new Date() / 1000) + 10) + ':R>')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        }

        // Remove Item
        item.rem(interaction.user.id + '-' + itemid.toUpperCase() + 'S-' + interaction.guild.id, 'x', 1)

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ITEMUSE : ' + user.id + ' : ' + itemid.toUpperCase())
        if (itemcat == 'bomb') {
            const msg = await interaction.reply({ content: '<@' + user.id + '>', embeds: [message.toJSON()], components: [row], fetchReply: true })

            const expiration = async () => {
                // Check if Message wasnt already answered
                let sno
                try {
                    eval('bombtf' + user.id)
                    sno = true
                } catch (e) {
                    sno = false
                }
                if (!sno) return
                eval('delete bombtf' + user.id)
                eval('delete bombm' + user.id)
    
                // Edit Buttons
                msg.components[0].components[0].data.disabled = true
                msg.components[0].components[1].data.disabled = true
                msg.components[0].components[2].data.disabled = true
                msg.components[0].components[3].data.disabled = true
                msg.components[0].components[parseInt(sb)-1].data.style = ButtonStyle.Success

                // Punish User
                if (itemid == 'nbomb') {
                    const member = await interaction.guild.members.fetch(user.id)
                    member.timeout(15 * 1000, 'BOMB TIMEOUT FROM ' + interaction.user.id).catch((error) => {})
                }
                if (itemid == 'mbomb') {
                    const member = await interaction.guild.members.fetch(user.id)
                    member.timeout(30 * 1000, 'BOMB TIMEOUT FROM ' + interaction.user.id).catch((error) => {})
                }
                if (itemid == 'hbomb') {
                    const member = await interaction.guild.members.fetch(user.id)
                    member.timeout(45 * 1000, 'BOMB TIMEOUT FROM ' + interaction.user.id).catch((error) => {})
                }
                if (itemid == 'cbomb') {
                    bombcache.splice(user.id, user.id)

                    let i = 0;
                    const filtered = [];

                    (await messages).filter((m) => {
                        if(m.author.id === user.id && 1 > i) {
                            filtered.push(m)
                            i++
                        }
                    })

                    await channel.bulkDelete(filtered, true)
                }
    
                // Create Embed
                message = new EmbedBuilder()
            	    .setTitle('<:BOXOPEN:1024395281460101213> » USE ITEM')
  		    	    .setDescription('» <@' + user.id + '> has failed to diffused the Bomb! OHNO')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });

                if (lang == "de") {
                    message = new EmbedBuilder()
                	    .setTitle('<:BOXOPEN:1024395281460101213> » GEGENSTAND NUTZEN')
  		        	    .setDescription('» <@' + user.id + '> hat es nicht geschafft, die Bombe zu entschärfen! OH')
                	    .setFooter({ text: '» ' + vote + ' » ' + version });
                }
    
                bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ITEMUSE : ' + user.id + ' : EXPIRED')
                interaction.editReply({ content: '', embeds: [message.toJSON()], components: msg.components }).catch((error) => {})
            }

            setTimeout(() => expiration(), 10000)
        }
    },
};