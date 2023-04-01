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
var roulette_exports = {};
__export(roulette_exports, {
  default: () => roulette_default
});
module.exports = __toCommonJS(roulette_exports);
var import_discord = require("discord.js");
var roulette_default = {
  data: new import_discord.SlashCommandBuilder().setName("roulette").setDMPermission(false).setDescription("PLAY ROULETTE").setDescriptionLocalizations({
    de: "SPIELE ROULETTE"
  }).addStringOption((option) => option.setName("color").setNameLocalizations({
    de: "farbe"
  }).setDescription("THE COLOR").setDescriptionLocalizations({
    de: "DIE FARBE"
  }).setRequired(true).addChoices(
    // Setup Choices
    { name: "\u{1F7E2} [x4] GR\xDCN", value: "gr\xFCn" },
    { name: "\u26AB [x2] SCHWARZ", value: "schwarz" },
    { name: "\u{1F534} [x2] ROT", value: "rot" }
  )).addIntegerOption((option) => option.setName("bet").setNameLocalizations({
    de: "wette"
  }).setDescription("THE BET").setDescriptionLocalizations({
    de: "DIE WETTE"
  }).setRequired(true)),
  async execute(ctx) {
    if (!await ctx.bot.settings.get(ctx.interaction.guild.id, "luckgames")) {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB Luck Games are disabled on this Server!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Gl\xFCcksspiele sind auf diesem Server deaktiviert!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] ROULETTE : DISABLED`);
      return ctx.interaction.reply({ embeds: [message], ephemeral: true });
    }
    const farbe = ctx.getOption("color");
    const wette = ctx.getOption("bet");
    const money = await ctx.bot.money.get(ctx.interaction.user.id);
    const random = ctx.bot.random(1, 21);
    if (wette < 0) {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You cant play with negative Money!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du kannst keine negativen Eins\xE4tze spielen!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] ROULETTE : NEGATIVEMONEY : ${wette}\u20AC`);
      return ctx.interaction.reply({ embeds: [message], ephemeral: true });
    }
    let color;
    if (random == 1)
      color = "gr\xFCn";
    if (random >= 2)
      color = "schwarz";
    if (random >= 11)
      color = "rot";
    let status, transaction;
    if (color === farbe) {
      status = "WON";
      transaction = await ctx.bot.transactions.log({
        success: true,
        sender: {
          id: "CASINO",
          amount: wette,
          type: "negative"
        },
        reciever: {
          id: ctx.interaction.user.id,
          amount: wette,
          type: "positive"
        }
      });
    }
    ;
    if (color !== farbe) {
      status = "LOST";
      transaction = await ctx.bot.transactions.log({
        success: true,
        sender: {
          id: ctx.interaction.user.id,
          amount: wette,
          type: "negative"
        },
        reciever: {
          id: "CASINO",
          amount: wette,
          type: "positive"
        }
      });
    }
    if (ctx.metadata.language === "de") {
      if (color === farbe)
        status = "GEWONNEN";
      if (color !== farbe)
        status = "VERLOREN";
    }
    if (money >= wette) {
      if (wette > 15e3) {
        let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You cant bet that much! **$15000** is the Maximum.`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        if (ctx.metadata.language === "de") {
          message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du kannst nicht soviel Wetten! **15000\u20AC** ist das Maximum.`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        }
        ctx.log(false, `[CMD] ROULETTE : TOOMUCHMONEY : ${wette}\u20AC`);
        return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
      }
      let resultmul;
      if (color === farbe && color === "gr\xFCn")
        resultmul = 4;
      if (color === farbe && color !== "gr\xFCn")
        resultmul = 2;
      if (color !== farbe)
        resultmul = 0;
      const result = wette * resultmul;
      const resultadd = result - wette;
      let resultdis;
      if (result == 0)
        resultdis = wette;
      else
        resultdis = result;
      let colordis;
      if (farbe === "gr\xFCn")
        colordis = "green";
      if (farbe === "rot")
        colordis = "red";
      if (farbe === "schwarz")
        colordis = "black";
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:CLOVER:1024388649418235925> \xBB ROULETTE").setDescription(`
					\xBB You bet **$${wette}** on **${colordis.toUpperCase()}** and **${status}** **$${resultdis}**!
					${status === "LOST" ? `The Color was **${color.toUpperCase()}**
` : ""}
					ID: ${transaction.id}
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:CLOVER:1024388649418235925> \xBB ROULETTE").setDescription(`
						\xBB Du hast **${wette}\u20AC** auf **${farbe.toUpperCase()}** gesetzt und **${resultdis}\u20AC** **${status}**!
						${status === "VERLOREN" ? `Die Farbe war **${color.toUpperCase()}**
` : ""}
						ID: ${transaction.id}
					`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      if (color !== farbe)
        ctx.bot.money.rem(ctx.interaction.guild.id, ctx.interaction.user.id, wette);
      if (color === farbe)
        ctx.bot.money.add(ctx.interaction.guild.id, ctx.interaction.user.id, resultadd);
      ctx.log(false, `[CMD] ROULETTE : ${farbe.toUpperCase()} [W:${color.toUpperCase()}] : ${status} : ${resultdis}\u20AC`);
      return ctx.interaction.reply({ embeds: [message] });
    } else {
      const missing = wette - money;
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You dont have enough Money for that, you are missing **$${missing}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du hast nicht genug Geld daf\xFCr, dir fehlen **${missing}\u20AC**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] ROULETTE : NOTENOUGHMONEY : ${missing}\u20AC`);
      return ctx.interaction.reply({ embeds: [message], ephemeral: true });
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=roulette.js.map
