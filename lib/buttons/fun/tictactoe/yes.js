var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var yes_exports = {};
__export(yes_exports, {
  default: () => yes_default
});
module.exports = __toCommonJS(yes_exports);
var import_discord = require("discord.js");
var import_discord2 = require("discord.js");
var yes_default = {
  data: {
    name: "ttt-yes"
  },
  async execute(ctx, bet) {
    const cache = ctx.interaction.message.embeds;
    const description = cache[0].description.toString().replace(/[^\d@!]/g, "").split("!")[0].substring(1).split("@");
    const [sender, reciever] = description;
    const balance = await ctx.bot.money.get(reciever);
    const otherbalance = await ctx.bot.money.get(sender);
    if (ctx.interaction.user.id !== reciever) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB <@${reciever}> has to decide this!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB <@${reciever}> muss das entscheiden!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[BTN] TICTACTOE : YES : NOTALLOWED`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    if (ctx.bot.game.has("PLAYING-" + reciever)) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You are already in a Lobby!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du bist schon in einer Lobby!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[BTN] TICTACTOE : ${reciever} : ALREADYLOBBY`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    if (ctx.bot.game.has("PLAYING-" + sender)) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB <@${sender}> is already in a Lobby!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB <@${sender}> ist schon in einer Lobby!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[BTN] TICTACTOE : ${sender} : ALREADYLOBBY`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    if (balance < bet) {
      const missing = bet - balance;
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You dont have enough Money for that, you are missing **$${missing}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du hast nicht genug Geld daf\xFCr, dir fehlen **${missing}\u20AC**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[BTN] TICTACTOE : ${reciever} : ${bet}\u20AC : NOTENOUGHMONEY`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    if (otherbalance < bet) {
      const missing = bet - otherbalance;
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB <@${sender}> doesnt have enough Money, he is Missing **$${missing}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB <@${sender}> hat nicht genug Geld, im fehlen **${missing}\u20AC**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[BTN] TICTACTOE : ${reciever} : ${bet}\u20AC : NOTENOUGHMONEY`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    ctx.bot.ttt.delete("TIMEOUT-" + sender + "-" + ctx.interaction.message.id);
    let row1 = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setEmoji("1020411843644243998").setCustomId(`TTT-1-${bet}`).setStyle(import_discord.ButtonStyle.Secondary),
      new import_discord.ButtonBuilder().setEmoji("1020411843644243998").setCustomId(`TTT-2-${bet}`).setStyle(import_discord.ButtonStyle.Secondary),
      new import_discord.ButtonBuilder().setEmoji("1020411843644243998").setCustomId(`TTT-3-${bet}`).setStyle(import_discord.ButtonStyle.Secondary)
    );
    let row2 = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setEmoji("1020411843644243998").setCustomId(`TTT-4-${bet}`).setStyle(import_discord.ButtonStyle.Secondary),
      new import_discord.ButtonBuilder().setEmoji("1020411843644243998").setCustomId(`TTT-5-${bet}`).setStyle(import_discord.ButtonStyle.Secondary),
      new import_discord.ButtonBuilder().setEmoji("1020411843644243998").setCustomId(`TTT-6-${bet}`).setStyle(import_discord.ButtonStyle.Secondary)
    );
    let row3 = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setEmoji("1020411843644243998").setCustomId(`TTT-7-${bet}`).setStyle(import_discord.ButtonStyle.Secondary),
      new import_discord.ButtonBuilder().setEmoji("1020411843644243998").setCustomId(`TTT-8-${bet}`).setStyle(import_discord.ButtonStyle.Secondary),
      new import_discord.ButtonBuilder().setEmoji("1020411843644243998").setCustomId(`TTT-9-${bet}`).setStyle(import_discord.ButtonStyle.Secondary)
    );
    let row4 = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setEmoji("1024382939020152982").setLabel("CANCEL").setCustomId(`TTT-CANCEL-${bet}`).setStyle(import_discord.ButtonStyle.Danger)
    );
    if (ctx.metadata.language === "de") {
      row4 = new import_discord.ActionRowBuilder().addComponents(
        new import_discord.ButtonBuilder().setEmoji("1024382939020152982").setLabel("ABBRECHEN").setCustomId(`TTT-CANCEL-${bet}`).setStyle(import_discord.ButtonStyle.Danger)
      );
    }
    ctx.bot.game.set("PLAYING-" + sender, "TICTACTOE");
    ctx.bot.game.set("PLAYING-" + reciever, "TICTACTOE");
    ctx.bot.ttt.set("TURN-" + sender, sender);
    ctx.bot.ttt.set("FIELDS-" + sender, []);
    ctx.bot.ttt.set("FIELDS-" + reciever, []);
    ctx.bot.ttt.set("FIELD-1-" + sender, null);
    ctx.bot.ttt.set("FIELD-2-" + sender, null);
    ctx.bot.ttt.set("FIELD-3-" + sender, null);
    ctx.bot.ttt.set("FIELD-4-" + sender, null);
    ctx.bot.ttt.set("FIELD-5-" + sender, null);
    ctx.bot.ttt.set("FIELD-6-" + sender, null);
    ctx.bot.ttt.set("FIELD-7-" + sender, null);
    ctx.bot.ttt.set("FIELD-8-" + sender, null);
    ctx.bot.ttt.set("FIELD-9-" + sender, null);
    ctx.bot.money.rem(ctx.interaction.guild.id, sender, bet);
    ctx.bot.money.rem(ctx.interaction.guild.id, reciever, bet);
    let message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:GAMEPAD:1024395990679167066> \xBB TICTACTOE").setDescription(`
				\xBB <@${sender}> is playing Tic Tac Toe with <@${reciever}>!
				The Bet is **$${bet}**
				
				\u{1F535} \xBB <@${sender}>
\u{1F534} \xBB <@${reciever}>
			`).setFooter({ text: "\xBB " + ctx.client.config.version + " \xBB CURRENT TURN: \u{1F535}" });
    if (ctx.metadata.language === "de") {
      message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:GAMEPAD:1024395990679167066> \xBB TICTACTOE").setDescription(`
					\xBB <@${sender}> spielt mit <@${reciever}> Tic Tac Toe!
					Die Wette ist **${bet}\u20AC**
					
					\u{1F535} \xBB <@${sender}>
\u{1F534} \xBB <@${reciever}>
				`).setFooter({ text: "\xBB " + ctx.client.config.version + " \xBB AM ZUG: \u{1F535}" });
    }
    ctx.log(false, `[BTN] TICTACTOE : ${sender} : ACCEPT`);
    return ctx.interaction.update({ content: "", embeds: [message], components: [row1, row2, row3, row4] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=yes.js.map
