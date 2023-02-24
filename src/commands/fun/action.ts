import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import CommandInteraction from "@interfaces/CommandInteraction.js"
export default {
	data: new SlashCommandBuilder()
		.setName('action')
		.setDMPermission(false)
		.setDescription('EXECUTE ACTIONS ON USERS')
		.setDescriptionLocalizations({
			de: 'FÜHRE AKTIONEN AN NUTZERN AUS'
		})
		.addUserOption((option) =>
			option.setName('user')
				.setNameLocalizations({
					de: 'nutzer'
				})
				.setDescription('THE PERSON')
				.setDescriptionLocalizations({
					de: 'DIE PERSON'
				})
				.setRequired(true))
		.addStringOption((option) =>
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
					{ name: '👊 SCHLAGEN', value: 'box' },
					{ name: '💀 TÖTEN', value: 'kill' },
					{ name: '👀 ANSTARREN', value: 'stare' },
					{ name: '🧐 TWERKEN', value: 'twerk' },
					{ name: '🏁 FANGEN', value: 'catch' },
					{ name: '😠 RUFEN', value: 'call' },
				)),

	async execute(ctx: CommandInteraction) {
		// Set Variables
		const user = ctx.interaction.options.getUser("user")
		const event = ctx.getOption('action') as string
		
		// Check if User is Author
		if (ctx.interaction.user.id === user.id) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  			.setDescription(`» You cant execute Actions on yourself?`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				.setDescription(`» Du kannst keine Aktionen auf dir selbst ausführen?`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}

			// Send Message
			ctx.log(false, `[CMD] ACTION : ${user.id} : ${event.toUpperCase()} : SAMEPERSON`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}
		
		// Send Message
		ctx.log(false, `[CMD] ACTION : ${user.id} : ${event.toUpperCase()}`)
		if (event === 'box') {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:BURST:1024393250611671170> » ACTION!')
  			.setDescription(`» <@${ctx.interaction.user.id}> boxed <@${user.id}>! AHH.`)
  			.setImage("https://media2.giphy.com/media/qyjexFwQwJp9yUvMxq/giphy.gif?cid=ecf05e479xhsqd2p8ap5zmeqbog4w7dn6kykqanap5j4zklq&rid=giphy.gif&ct=g")
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:BURST:1024393250611671170> » ACTION!')
					.setDescription(`» **<@${ctx.interaction.user.id}>** hat <@${user.id}> Geschlagen! AUA.`)
					.setImage("https://media2.giphy.com/media/qyjexFwQwJp9yUvMxq/giphy.gif?cid=ecf05e479xhsqd2p8ap5zmeqbog4w7dn6kykqanap5j4zklq&rid=giphy.gif&ct=g")
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}

			// Send Message
			return ctx.interaction.reply({ embeds: [message] })
		}; if (event === 'kill') {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:BURST:1024393250611671170> » ACTION!')
  			.setDescription(`» <@${ctx.interaction.user.id}> killed <@${user.id}>! MH.`)
  			.setImage("https://media1.giphy.com/media/yNFjQR6zKOGmk/giphy.gif?cid=ecf05e47tyf8463zbs3431j0spus4vugtaq22m4occdccspm&rid=giphy.gif&ct=g")
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:BURST:1024393250611671170> » ACTION!')
					.setDescription(`» **<@${ctx.interaction.user.id}>** hat <@${user.id}> Getötet! MH.`)
					.setImage("https://media1.giphy.com/media/yNFjQR6zKOGmk/giphy.gif?cid=ecf05e47tyf8463zbs3431j0spus4vugtaq22m4occdccspm&rid=giphy.gif&ct=g")
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}

			// Send Message
			return ctx.interaction.reply({ embeds: [message] })
		}; if (event === 'stare') {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:BURST:1024393250611671170> » ACTION!')
  			.setDescription(`» <@${ctx.interaction.user.id}> stares at <@${user.id}>! MENACINGLY.`)
  			.setImage("https://media2.giphy.com/media/aXUU30cDBa9tVQz37V/giphy.gif?cid=ecf05e474vdm6e12euchkog2475qj5srvqa3ozinvz7xse0j&rid=giphy.gif&ct=g")
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:BURST:1024393250611671170> » ACTION!')
					.setDescription("» **<@" + ctx.interaction.user.id + ">** starrt <@" + user.id + "> an! STILL.")
					.setImage("https://media2.giphy.com/media/aXUU30cDBa9tVQz37V/giphy.gif?cid=ecf05e474vdm6e12euchkog2475qj5srvqa3ozinvz7xse0j&rid=giphy.gif&ct=g")
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}

			// Send Message
			return ctx.interaction.reply({ embeds: [message] })
		}; if (event === 'twerk') {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:BURST:1024393250611671170> » ACTION!')
  			.setDescription(`» <@${ctx.interaction.user.id}> twerks over <@${user.id}>! EWW!`)
  			.setImage("https://media2.giphy.com/media/DqhwoR9RHm3EA/giphy.gif?cid=ecf05e47jxhd2do5ws18knygottsfiz0qqci5qm6x8w5ikjc&rid=giphy.gif&ct=g")
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:BURST:1024393250611671170> » ACTION!')
					.setDescription("» **<@" + ctx.interaction.user.id + ">** twerkt über <@" + user.id + ">! EKLIG!")
					.setImage("https://media2.giphy.com/media/DqhwoR9RHm3EA/giphy.gif?cid=ecf05e47jxhd2do5ws18knygottsfiz0qqci5qm6x8w5ikjc&rid=giphy.gif&ct=g")
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}

			// Send Message
			return ctx.interaction.reply({ embeds: [message] })
		}; if (event === 'catch') {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:BURST:1024393250611671170> » ACTION!')
  			.setDescription(`» <@${ctx.interaction.user.id}> catches <@${user.id}>! WHY?`)
  			.setImage("https://media3.giphy.com/media/vsyKKf1t22nmw/giphy.gif?cid=ecf05e47kzkk3lkzs7wsxrpluelxo9pvve8x5946n7mj5rzv&rid=giphy.gif&ct=g")
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:BURST:1024393250611671170> » ACTION!')
					.setDescription("» **<@" + ctx.interaction.user.id + ">** fängt <@" + user.id + ">! WIESO?")
					.setImage("https://media3.giphy.com/media/vsyKKf1t22nmw/giphy.gif?cid=ecf05e47kzkk3lkzs7wsxrpluelxo9pvve8x5946n7mj5rzv&rid=giphy.gif&ct=g")
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}

			// Send Message
			return ctx.interaction.reply({ embeds: [message] })
		}; if (event === 'call') {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:BURST:1024393250611671170> » ACTION!')
  			.setDescription(`» <@${ctx.interaction.user.id}> calls <@${user.id}>! ARE YOU THERE?`)
  			.setImage("https://media2.giphy.com/media/NPFQpRI1KpIq9S0YKa/giphy.gif?cid=ecf05e47xfvrmgjqorm0p5hn2iz9kxjw6ngykph6bireyunn&rid=giphy.gif&ct=g")
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:BURST:1024393250611671170> » ACTION!')
					.setDescription("» **<@" + ctx.interaction.user.id + ">** ruft <@" + user.id + "> an! BIST DU DRAN?")
					.setImage("https://media2.giphy.com/media/NPFQpRI1KpIq9S0YKa/giphy.gif?cid=ecf05e47xfvrmgjqorm0p5hn2iz9kxjw6ngykph6bireyunn&rid=giphy.gif&ct=g")
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}

			// Send Message
			return ctx.interaction.reply({ embeds: [message] })
		}
	}
}