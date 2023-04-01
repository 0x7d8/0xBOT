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
var rps_exports = {};
__export(rps_exports, {
  default: () => rps_default
});
module.exports = __toCommonJS(rps_exports);
var import_discord = require("discord.js");
var import_discord2 = require("discord.js");
var rps_default = {
  data: new import_discord2.SlashCommandBuilder().setName("rps").setDescription("PLAY ROCK-PAPER-SCISSORS").setDescriptionLocalizations({
    de: "SPIELE SCHERE-STEIN-PAPIER"
  }).setDMPermission(false).addUserOption((option) => option.setName("user").setNameLocalizations({
    de: "nutzer"
  }).setDescription("THE USER").setDescriptionLocalizations({
    de: "DER NUTZER"
  }).setRequired(true)).addIntegerOption((option) => option.setName("bet").setNameLocalizations({
    de: "wette"
  }).setDescription("THE AMOUNT OF MONEY").setDescriptionLocalizations({
    de: "DIE ANZAHL VON GELD"
  }).setRequired(false)),
  async execute(ctx) {
    const user = ctx.interaction.options.getUser("user");
    let bet = ctx.getOption("bet");
    const money = await ctx.bot.money.get(ctx.interaction.user.id);
    const othermoney = await ctx.bot.money.get(user.id);
    if (user.bot) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You cant play Rock Paper Scissors with a Bot!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du kannst Schere Stein Papier nicht mit einem Bot spielen!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] RPS : ${user.id} : BOT`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    if (ctx.bot.game.has("PLAYING-" + ctx.interaction.user.id)) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You are already in a Lobby!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du bist schon in einer Lobby!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] RPS : ${user.id} : ALREADYLOBBY`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    if (ctx.bot.game.has("PLAYING-" + user.id)) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB <@${user.id}> is already in a Lobby!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB <@${user.id}> ist schon in einer Lobby!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] RPS : ${user.id} : ALREADYLOBBY`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    if (bet < 0 && bet !== null) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You cant bet negative Money!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du kannst kein negatives Geld wetten!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] RPS : ${user.id} : NEGATIVEMONEY : ${bet}\u20AC`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    if (ctx.interaction.user.id === user.id) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You cant play Rock Paper Scissors with yourself?`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du kannst Schere Stein Papier nicht mit dir selber spielen?`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] RPS : ${user.id} : ${bet}\u20AC : SAMEPERSON`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    if (money < bet && bet !== null) {
      const missing = bet - money;
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You dont have enough Money for that, you are missing **$${missing}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du hast nicht genug Geld daf\xFCr, dir fehlen **${missing}\u20AC**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] RPS : ${user.id} : NOTENOUGHMONEY`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    if (othermoney < bet && bet !== null) {
      const missing = bet - othermoney;
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB <@${user.id}> doesnt have enough Money for that, he is Missing **$${missing}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB <@${user.id}> hat daf\xFCr nicht genug Geld, im fehlen **${missing}\u20AC**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] RPS : ${user.id} : NOTENOUGHMONEY`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    if (!bet)
      bet = 0;
    let row = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setLabel("YES").setCustomId("RPS-YES-" + bet).setEmoji("1024382942153285632").setStyle(import_discord.ButtonStyle.Success),
      new import_discord.ButtonBuilder().setLabel("NO").setCustomId("RPS-NO-" + bet).setEmoji("1024382939020152982").setStyle(import_discord.ButtonStyle.Danger)
    );
    if (ctx.metadata.language === "de") {
      row = new import_discord.ActionRowBuilder().addComponents(
        new import_discord.ButtonBuilder().setLabel("JA").setCustomId("RPS-YES-" + bet).setEmoji("1024382942153285632").setStyle(import_discord.ButtonStyle.Success),
        new import_discord.ButtonBuilder().setLabel("NEIN").setCustomId("RPS-NO-" + bet).setEmoji("1024382939020152982").setStyle(import_discord.ButtonStyle.Danger)
      );
    }
    let message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:GAMEPAD:1024395990679167066> \xBB ROCK PAPER SCISSORS").setDescription(`
				\xBB <@${ctx.interaction.user.id}> challenges you, <@${user.id}> to a battle of Rock Paper Scissors! The Bet is **$${bet}**.
				Do you accept?
				
				\xBB This Request expires <t:${Math.floor(+/* @__PURE__ */ new Date() / 1e3) + 29}:R>
			`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:GAMEPAD:1024395990679167066> \xBB SCHERE STEIN PAPIER").setDescription(`
					\xBB <@${ctx.interaction.user.id}> fordert dich, <@${user.id}> zu einem Spiel von Schere Stein Papier heraus! Die Wette ist **${bet}\u20AC**.
					Akzeptierst du?
					
					\xBB Diese Anfrage wird ung\xFCltig <t:${Math.floor(+/* @__PURE__ */ new Date() / 1e3) + 29}:R>
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[CMD] RPS : ${user.id} : ${bet}\u20AC`);
    let msg = await ctx.interaction.reply({ content: "<@" + user.id + ">", embeds: [message], components: [row], fetchReply: true });
    ctx.bot.rps.set("TIMEOUT-" + ctx.interaction.user.id + "-" + msg.id, true);
    const expiration = async () => {
      if (!ctx.bot.rps.has("TIMEOUT-" + ctx.interaction.user.id + "-" + msg.id))
        return;
      ctx.bot.rps.delete("TIMEOUT-" + ctx.interaction.user.id + "-" + msg.id);
      {
        msg.components[0].components[0].data.disabled = true;
        msg.components[0].components[1].data.disabled = true;
        msg.components[0].components[0].data.style = 2;
        msg.components[0].components[1].data.style = 2;
      }
      message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:GAMEPAD:1024395990679167066> \xBB ROCK PAPER SCISSORS").setDescription(`\xBB The Request expired.`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:GAMEPAD:1024395990679167066> \xBB SCHERE STEIN PAPIER").setDescription(`\xBB Die Anfrage ist abgelaufen.`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] RPS : ${user.id} : EXPIRED`);
      ctx.interaction.editReply({ content: "", embeds: [message], components: msg.components }).catch(() => {
      });
    };
    setTimeout(() => expiration(), 27e3);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=rps.js.map
