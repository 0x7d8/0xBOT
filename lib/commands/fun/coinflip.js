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
var coinflip_exports = {};
__export(coinflip_exports, {
  default: () => coinflip_default
});
module.exports = __toCommonJS(coinflip_exports);
var import_discord = require("discord.js");
var coinflip_default = {
  data: new import_discord.SlashCommandBuilder().setName("coinflip").setDMPermission(false).setDescription("FLIP A COIN").setDescriptionLocalizations({
    de: "WIRF EINE M\xDCNZE"
  }).addIntegerOption((option) => option.setName("amount").setNameLocalizations({
    de: "anzahl"
  }).setDescription("THE AMOUNT").setDescriptionLocalizations({
    de: "DIE ANZAHL"
  }).setRequired(false)),
  async execute(ctx) {
    let amount = ctx.getOption("amount");
    let heads = 0;
    let tails = 0;
    let tries = 0;
    if (!amount)
      amount = 1;
    if (amount < 1) {
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You need to throw atleast **1** Coin!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du musst schon mindestens **1** M\xFCnze werfen!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] COINFLIP : NOTENOUGHCOINS : ${amount}`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    if (amount > 1e3) {
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You cant throw more than **1000** Coins!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du darfst nicht mehr als **1000** M\xFCnzen werfen!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] COINFLIP : TOOMANYCOINS : ${amount}`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    let coin;
    while (amount !== tries) {
      const random = ctx.bot.random(1, 2);
      if (random === 1) {
        coin = "HEAD";
        heads++;
      }
      if (random === 2) {
        coin = "TAIL";
        tails++;
      }
      tries++;
    }
    let message;
    if (amount === 1) {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:COINS:1024392690776944803> \xBB COINFLIP").setDescription(`\xBB The Coin Landed on **${coin}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        if (coin === "HEAD")
          coin = "KOPF";
        if (coin === "TAIL")
          coin = "ZAHL";
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:COINS:1024392690776944803> \xBB COINFLIP").setDescription(`\xBB Die M\xFCnze ist auf **${coin}** gelandet!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
    } else {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:COINS:1024392690776944803> \xBB COINFLIP").setDescription(`
					\xBB Heads
					\`\`\`${heads}\`\`\`
					\xBB Tails
					\`\`\`${tails}\`\`\`
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:COINS:1024392690776944803> \xBB COINFLIP").setDescription(`
						\xBB K\xF6pfe
						\`\`\`${heads}\`\`\`
						\xBB Zahlen
						\`\`\`${tails}\`\`\`
					`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
    }
    ctx.log(false, `[CMD] COINFLIP : H[${heads}] : T[${tails}]`);
    return ctx.interaction.reply({ embeds: [message] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=coinflip.js.map
