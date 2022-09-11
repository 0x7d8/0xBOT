const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('action')
    	.setDMPermission(false)
        .setDescription('DO INTERACTIONS WITH USERS')
        .setDescriptionLocalizations({
            de: 'FÜHRE AKTIONEN MIT NUTZERN AUS'
        })
        .addUserOption(option =>
            option.setName('user')
                .setNameLocalizations({
                    de: 'nutzer'
                })
                .setDescription('THE PERSON')
                .setDescriptionLocalizations({
                    de: 'DIE PERSON'
                })
                .setRequired(true))
        .addStringOption(option =>
            option.setName('action')
                .setNameLocalizations({
                    de: 'aktion'
                })
                .setDescription('THE ACTION')
                .setDescriptionLocalizations({
                    de: 'DIE AKTION'
                })
                .setRequired(true)
    			.addChoices(
            		// Setup Choices
					{ name: '👊 SCHLAGEN', value: 'Schlagen' },
					{ name: '💀 TÖTEN', value: 'Töten' },
					{ name: '👀 ANSTARREN', value: 'Anstarren' },
            		{ name: '🧐 TWERKEN', value: 'Twerken' },
            		{ name: '🏁 FANGEN', value: 'Fangen' },
            		{ name: '😠 RUFEN', value: 'Rufen' },
				)),
    async execute(interaction, client, vote) {
        // Set Variables
        const user = interaction.options.getUser("user")
        const event = interaction.options.getString("action")
        const sender = interaction.user.id

        // Create Embeds
        const box = new EmbedBuilder()
        	.setTitle('» ACTION!')
  			.setDescription("» **<@" + sender + ">** hat <@" + user + "> Geschlagen! AUA.")
  			.setImage("https://media2.giphy.com/media/qyjexFwQwJp9yUvMxq/giphy.gif?cid=ecf05e479xhsqd2p8ap5zmeqbog4w7dn6kykqanap5j4zklq&rid=giphy.gif&ct=g")
        	.setFooter({ text: '» ' + vote + ' » ' + version });
        const kill = new EmbedBuilder()
        	.setTitle('» ACTION!')
  			.setDescription("» **<@" + sender + ">** hat <@" + user + "> Getötet! RIP.")
  			.setImage("https://media1.giphy.com/media/yNFjQR6zKOGmk/giphy.gif?cid=ecf05e47tyf8463zbs3431j0spus4vugtaq22m4occdccspm&rid=giphy.gif&ct=g")
        	.setFooter({ text: '» ' + vote + ' » ' + version });
        const stare = new EmbedBuilder()
        	.setTitle('» ACTION!')
  			.setDescription("» **<@" + sender + ">** starrt <@" + user + "> an! Gruselig.")
  			.setImage("https://media2.giphy.com/media/aXUU30cDBa9tVQz37V/giphy.gif?cid=ecf05e474vdm6e12euchkog2475qj5srvqa3ozinvz7xse0j&rid=giphy.gif&ct=g")
        	.setFooter({ text: '» ' + vote + ' » ' + version });
        const twerk = new EmbedBuilder()
        	.setTitle('» ACTION!')
  			.setDescription("» **<@" + sender + ">** twerkt <@" + user + "> an! Sehr Sus.")
  			.setImage("https://media2.giphy.com/media/DqhwoR9RHm3EA/giphy.gif?cid=ecf05e47jxhd2do5ws18knygottsfiz0qqci5qm6x8w5ikjc&rid=giphy.gif&ct=g")
        	.setFooter({ text: '» ' + vote + ' » ' + version });
        const catchp = new EmbedBuilder()
        	.setTitle('» ACTION!')
  			.setDescription("» **<@" + sender + ">** fängt <@" + user + ">! WIESO?")
  			.setImage("https://media3.giphy.com/media/vsyKKf1t22nmw/giphy.gif?cid=ecf05e47kzkk3lkzs7wsxrpluelxo9pvve8x5946n7mj5rzv&rid=giphy.gif&ct=g")
        	.setFooter({ text: '» ' + vote + ' » ' + version });
        const call = new EmbedBuilder()
        	.setTitle('» ACTION!')
  			.setDescription("» **<@" + sender + ">** ruft <@" + user + ">! KOMM DOCH.")
  			.setImage("https://media2.giphy.com/media/NPFQpRI1KpIq9S0YKa/giphy.gif?cid=ecf05e47xfvrmgjqorm0p5hn2iz9kxjw6ngykph6bireyunn&rid=giphy.gif&ct=g")
        	.setFooter({ text: '» ' + vote + ' » ' + version });
        const err = new EmbedBuilder()
        	.setTitle('» ACTION?')
  			.setDescription("» Du kannst dich nicht selber " + event + "?")
        	.setFooter({ text: '» ' + vote + ' » ' + version });
        
        // Check if User is Sender
        if (sender == user) {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] ACTION : SAMEPERSON : ' + user)
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }
        
        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] ACTION : ' + user + ' : ' + event.toUpperCase())
        if (event == 'Schlagen') {
        	return interaction.reply({ embeds: [box.toJSON()] })
        }
        if (event == 'Töten') {
        	return interaction.reply({ embeds: [kill.toJSON()] })
        }
        if (event == 'Anstarren') {
        	return interaction.reply({ embeds: [stare.toJSON()] })
        }
        if (event == 'Twerken') {
        	return interaction.reply({ embeds: [twerk.toJSON()] })
        }
        if (event == 'Fangen') {
        	return interaction.reply({ embeds: [catchp.toJSON()] })
        }
        if (event == 'Rufen') {
        	return interaction.reply({ embeds: [call.toJSON()] })
        }
    },
};