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
var guess_exports = {};
__export(guess_exports, {
  default: () => guess_default
});
module.exports = __toCommonJS(guess_exports);
var import_discord = require("discord.js");
var guess_default = {
  data: new import_discord.SlashCommandBuilder().setName("guess").setDMPermission(false).setDescription("GUESS NUMBERS").setDescriptionLocalizations({
    de: "RATE ZAHLEN"
  }).addStringOption((option) => option.setName("range").setNameLocalizations({
    de: "bereich"
  }).setDescription("THE RANGE").setDescriptionLocalizations({
    de: "DER BEREICH"
  }).setRequired(true).addChoices(
    // Setup Choices
    { name: "\u{1F7E2} [x2] 1-10", value: "10" },
    { name: "\u{1F7E1} [x4] 1-100", value: "100" },
    { name: "\u{1F534} [x6] 1-1000", value: "1000" }
  )).addIntegerOption((option) => option.setName("bet").setNameLocalizations({
    de: "wette"
  }).setDescription("THE BET").setDescriptionLocalizations({
    de: "DIE WETTE"
  }).setRequired(true)).addIntegerOption((option) => option.setName("number").setNameLocalizations({
    de: "nummer"
  }).setDescription("THE NUMBER").setDescriptionLocalizations({
    de: "DIE NUMMER"
  }).setRequired(true)),
  async execute(ctx) {
    if (!await ctx.bot.settings.get(ctx.interaction.guild.id, "luckgames")) {
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB Luck Games are disabled on this Server!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Gl\xFCcksspiele sind auf diesem Server deaktiviert!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] GUESS : DISABLED`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    const bet = ctx.getOption("bet");
    const range = ctx.getOption("range");
    const guess = ctx.getOption("number");
    const money = await ctx.bot.money.get(ctx.interaction.user.id);
    const random10 = ctx.bot.random(1, 10);
    const random100 = ctx.bot.random(1, 100);
    const random1000 = ctx.bot.random(1, 1e3);
    if (bet < 0) {
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You cant play with negative Money!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du kannst keine negativen Eins\xE4tze spielen!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] GUESS : NEGATIVEMONEY : ${bet}\u20AC`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    let status, result;
    if (money >= bet) {
      if (bet > 15e3) {
        let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You cant bet that much! **$15000** is the Maximum.`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        if (ctx.metadata.language === "de") {
          message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du kannst nicht soviel Wetten! **15000\u20AC** ist das Maximum.`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        }
        ctx.log(false, `[CMD] GUESS : TOOMUCHMONEY : ${bet}\u20AC`);
        return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
      }
      if (range === "10") {
        if (guess === random10) {
          status = "WON";
          result = bet * 2;
        } else {
          status = "LOST";
          result = bet;
        }
      }
      if (range === "100") {
        if (guess === random100) {
          status = "WON";
          result = bet * 4;
        } else {
          status = "LOST";
          result = bet;
        }
      }
      if (range === "1000") {
        if (guess === random1000) {
          status = "WON";
          result = bet * 6;
        } else {
          status = "LOST";
          result = bet;
        }
      }
      if (ctx.metadata.language === "de") {
        if (range === "10") {
          if (guess === random10) {
            status = "GEWONNEN";
            result = bet * 2;
          } else {
            status = "VERLOREN";
            result = bet;
          }
        }
        if (range === "100") {
          if (guess === random100) {
            status = "GEWONNEN";
            result = bet * 4;
          } else {
            status = "VERLOREN";
            result = bet;
          }
        }
        if (range === "1000") {
          if (guess === random1000) {
            status = "GEWONNEN";
            result = bet * 6;
          } else {
            status = "VERLOREN";
            result = bet;
          }
        }
      }
    } else {
      const missing = bet - money;
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You dont have enough Money for that, you are missing **$${missing}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du hast nicht genug Geld daf\xFCr, dir fehlen **${missing}\u20AC**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] GUESS : NOTENOUGHMONEY : ${missing}\u20AC`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    let transaction;
    ctx.bot.money.rem(ctx.interaction.guild.id, ctx.interaction.user.id, result);
    if (status === "GEWONNEN" || status === "WON") {
      ctx.bot.money.add(ctx.interaction.guild.id, ctx.interaction.user.id, result);
      transaction = await ctx.bot.transactions.log({
        success: true,
        sender: {
          id: "CASINO",
          amount: bet,
          type: "negative"
        },
        reciever: {
          id: ctx.interaction.user.id,
          amount: bet,
          type: "positive"
        }
      });
    } else {
      transaction = await ctx.bot.transactions.log({
        success: true,
        sender: {
          id: ctx.interaction.user.id,
          amount: bet,
          type: "negative"
        },
        reciever: {
          id: "CASINO",
          amount: bet,
          type: "positive"
        }
      });
    }
    let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:CLOVER:1024388649418235925> \xBB GUESS").setDescription(`
				\xBB You set **$${bet}** on **${guess}** and **${status}** **$${result}**!

				ID: ${transaction.id}
			`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:CLOVER:1024388649418235925> \xBB RATEN").setDescription(`
					\xBB Du hast **${bet}\u20AC** auf **${guess}** gesetzt und **${result}\u20AC** **${status}**!

					ID: ${transaction.id}
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[CMD] GUESS : ${guess} : ${status} : ${result}\u20AC`);
    return ctx.interaction.reply({ embeds: [message] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=guess.js.map
