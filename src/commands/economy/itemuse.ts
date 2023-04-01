import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import { ChannelType } from "discord.js"
import CommandInteraction from "@/interfaces/CommandInteraction"
export default {
	data: new SlashCommandBuilder()
		.setName('itemuse')
		.setDescription('USE AN ITEM')
		.setDescriptionLocalizations({
			de: 'NUTZE EINEN GEGENSTAND'
		})
		.setDMPermission(false)
		.addUserOption((option) =>
			option.setName('user')
				.setNameLocalizations({
					de: 'nutzer'
				})
				.setDescription('THE USER')
				.setDescriptionLocalizations({
					de: 'DER NUTZER'
				})
				.setRequired(true))
		.addStringOption((option) =>
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

	async execute(ctx: CommandInteraction) {
		const mathjs = await import('mathjs')

		// Check if Items are Enabled in Server
		if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'items')) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription(`» Items are disabled on this Server!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription(`» Items sind auf diesem Server deaktiviert!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] ITEM : DISABLED`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Check if Channel is wrong type
		if (ctx.interaction.channel.type === ChannelType.GuildStageVoice) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription(`» I dont think I can do that here!`)
				.setFooter({ text: '» ' + ctx.client.config.version })
			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription(`» Ich denke nicht, dass ich das hier machen kann!`)
					.setFooter({ text: '» ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] ITEMUSE : WRONGCHANNEL`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}
		
		// Set Variables
		const user = ctx.interaction.options.getUser("user")
		const itemstr = ctx.getOption('item') as string
		const cache = itemstr.split('-')
		const [ itemid, itemcat ] = cache

		// Translate to Item Names
		let name: string
		if (itemid === 'nbomb') name = '<:NBOMB:1021783222520127508> NORMAL BOMB'
		if (itemid === 'mbomb') name = '<:MBOMB:1021783295211601940> MEDIUM BOMB'
		if (itemid === 'hbomb') name = '<:HBOMB:1022102357938536458> HYPER BOMB'
		if (itemid === 'cbomb') name = '<:CBOMB:1021783405161091162> CRAZY BOMB'
		if (ctx.metadata.language === 'de') {
			if (itemid === 'nbomb') name = '<:NBOMB:1021783222520127508> NORMALE BOMBE'
			if (itemid === 'mbomb') name = '<:MBOMB:1021783295211601940> MEDIUM BOMBE'
			if (itemid === 'hbomb') name = '<:HBOMB:1022102357938536458> HYPER BOMBE'
			if (itemid === 'cbomb') name = '<:CBOMB:1021783405161091162> CRAZY BOMBE'
		}

		// Check if Target is Bot
		if (user.bot) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription(`» You cant use Items on Bots!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription(`» Du kannst keine Gegenstände auf einem Bot nutzen!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] ITEMUSE : ${user.id} : BOT : ${itemid.toUpperCase()}`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Check if User has enough of the Item
		if (await ctx.bot.items.get(ctx.interaction.user.id + '-' + itemid.toUpperCase() + 'S-' + ctx.interaction.guild.id, 'amount') < 1) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription(`» You dont have enough of that Item!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription(`» Du hast nicht genug von dem Gegenstand!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] ITEMUSE : ${user.id} : NOTENOUGHITEMS : ${itemid.toUpperCase()}`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Check if User is Author
		if (ctx.interaction.user.id === user.id && itemcat === 'bomb') {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  			.setDescription(`» You cant use Bombs on yourself?`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				.setDescription(`» Du kannst Bomben nicht auf dir selber nutzen?`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}

			// Send Message
			ctx.log(false, `[CMD] ITEMUSE : ${user.id} : ${itemid.toUpperCase()}`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Check if Reciever is already being Bombed
		if (ctx.bot.bomb.has('TIMEOUT-' + user.id + '-' + ctx.interaction.guild.id)) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  			.setDescription(`» <@${user.id}> is already being bombed!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				.setDescription(`» <@${user.id}> wird schon bombadiert!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}

			// Send Message
			ctx.log(false, `[CMD] ITEMUSE : ${user.id} : ${itemid.toUpperCase()}`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Fetch Channel for Later
		const channel = ctx.interaction.channel
		const messages = channel.messages.fetch()
		ctx.bot.bomb.set('MESSAGES-' + user.id + '-' + ctx.interaction.guild.id, messages)

		// Init Timeout Function
		ctx.bot.bomb.set('TIMEOUT-' + user.id + '-' + ctx.interaction.guild.id, true)

		// Generate Math Questions
		let math: string
		if (itemid === 'nbomb') math = ctx.bot.random(80, 1000) + ' + ' + ctx.bot.random(10, 20) + ' - ' + ctx.bot.random(150, 200)
		if (itemid === 'mbomb') math = ctx.bot.random(10, 20) + ' * ' + ctx.bot.random(10, 30) + ' - ' + ctx.bot.random(60, 100)
		if (itemid === 'hbomb') math = ctx.bot.random(10, 20) + ' * ' + ctx.bot.random(10, 40) + ' * ' + ctx.bot.random(60, 100)
		if (itemid === 'cbomb') math = ctx.bot.random(10, 40) + ' * (' + ctx.bot.random(100, 4000) + ' + ' + ctx.bot.random(600, 2000) + ')'

		// Solve the Math Question
		const mathres = await mathjs.evaluate(math)

		// Generate Button Labels
		let b1 = (mathres - ctx.bot.random(10, 50))
		let b2 = (mathres + ctx.bot.random(10, 50) + ctx.bot.random(10, 50))
		let b3 = (mathres + ctx.bot.random(50, 100) + 50)
		let b4 = (mathres - ctx.bot.random(100, 150) + ctx.bot.random(5, 25))
		const sb = ctx.bot.random(1, 4)

		// Create Buttons
		const row = new ActionRowBuilder()
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
			)
		
		// Create Embed
		let message: EmbedBuilder
		if (itemcat === 'bomb') {
	  		message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:BOXOPEN:1024395281460101213> » USE ITEM')
  			.setDescription(`
					» Oh <@${user.id}>, <@${ctx.interaction.user.id}> used a **${name}** on you!
					If you solve this Math Equation, it wont do anything.

					**\`\`\`${math}\`\`\`**
					The Bomb explodes <t:${Math.floor(+new Date() / 1000) + 10}:R>
				`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:BOXOPEN:1024395281460101213> » GEGENSTAND NUTZEN')
  				.setDescription(`
						» Oh <@${user.id}>, <@${ctx.interaction.user.id}> hat eine **${name}** an dir benutzt!
						Falls du dieses Mathe Rätsel löst, passiert nichts.

						**\`\`\`${math}\`\`\`**
						Die Bombe explodiert <t:${Math.floor(+new Date() / 1000) + 10}:R>
					`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
		}

		// Remove Item
		ctx.bot.items.rem(ctx.interaction.user.id + '-' + itemid.toUpperCase() + 'S-' + ctx.interaction.guild.id, 1)

		// Send Message
		ctx.log(false, `[CMD] ITEMUSE : ${user.id} : ${itemid.toUpperCase()}`)
		if (itemcat === 'bomb') {
			let msg = await ctx.interaction.reply({ content: '<@' + user.id + '>', embeds: [message], components: [row as any], fetchReply: true })

			const expiration = async() => {
				// Check if Message wasnt already answered
				if (!ctx.bot.bomb.has('TIMEOUT-' + user.id + '-' + ctx.interaction.guild.id)) return
				ctx.bot.bomb.delete('TIMEOUT-' + user.id + '-' + ctx.interaction.guild.id)
				ctx.bot.bomb.delete('MESSAGES-' + user.id + '-' + ctx.interaction.guild.id)
	
				// Edit Buttons
				{
					(msg.components[0].components[0].data.disabled as boolean) = true;
					(msg.components[0].components[1].data.disabled as boolean) = true;
					(msg.components[0].components[2].data.disabled as boolean) = true;
					(msg.components[0].components[3].data.disabled as boolean) = true;
				}; (msg.components[0].components[Number(sb)-1] as any).data.style = ButtonStyle.Success

				// Punish User
				if (itemid === 'nbomb') {
					const member = await ctx.interaction.guild.members.fetch(user.id)
					member.timeout(15 * 1000, 'BOMB TIMEOUT FROM ' + ctx.interaction.user.id).catch(() => {})
				}; if (itemid === 'mbomb') {
					const member = await ctx.interaction.guild.members.fetch(user.id)
					member.timeout(30 * 1000, 'BOMB TIMEOUT FROM ' + ctx.interaction.user.id).catch(() => {})
				}; if (itemid === 'hbomb') {
					const member = await ctx.interaction.guild.members.fetch(user.id)
					member.timeout(45 * 1000, 'BOMB TIMEOUT FROM ' + ctx.interaction.user.id).catch(() => {})
				}; if (itemid === 'cbomb') {
					const filtered = []
					let i = 0

					{(await messages).filter((m) => {
						if (m.author.id === user.id && 1 > i) {
							filtered.push(m)
							i++
						}
					})}

					await channel.bulkDelete(filtered, true)
				}
	
				// Create Embed
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:BOXOPEN:1024395281460101213> » USE ITEM')
  				.setDescription(`» <@${user.id}> has failed to diffuse the Bomb! OHNO`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

				if (ctx.metadata.language === 'de') {
					message = new EmbedBuilder().setColor(0x37009B)
						.setTitle('<:BOXOPEN:1024395281460101213> » GEGENSTAND NUTZEN')
  					.setDescription(`» <@${user.id}> hat es nicht geschafft, die Bombe zu entschärfen! OH`)
						.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
				}
	
				ctx.log(false, `[CMD] ITEMUSE : ${user.id} : EXPIRED`)
				ctx.interaction.editReply({ content: '', embeds: [message], components: msg.components }).catch(() => {})
			}

			setTimeout(() => expiration(), 10000)
		}
	}
}