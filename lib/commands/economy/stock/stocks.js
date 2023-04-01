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
var stocks_exports = {};
__export(stocks_exports, {
  default: () => stocks_default
});
module.exports = __toCommonJS(stocks_exports);
var import_discord = require("discord.js");
var import_discord2 = require("discord.js");
var stocks_default = {
  data: new import_discord2.SlashCommandBuilder().setName("stocks").setDMPermission(false).setDescription("SEE STOCKS").setDescriptionLocalizations({
    de: "SEHE AKTIEN"
  }).addUserOption((option) => option.setName("user").setNameLocalizations({
    de: "nutzer"
  }).setDescription("THE USER").setDescriptionLocalizations({
    de: "DER NUTZER"
  }).setRequired(false)),
  async execute(ctx) {
    if (!await ctx.bot.settings.get(ctx.interaction.guild.id, "stocks")) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB Stocks are disabled on this Server!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Aktien sind auf diesem Server deaktiviert!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] STOCKS : DISABLED`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    const user = ctx.interaction.options.getUser("user");
    let userobj;
    if (!user)
      userobj = ctx.interaction.user;
    else
      userobj = user;
    const stocks = {
      "green": await ctx.bot.stocks.get(userobj.id, "green", "used"),
      "greenMax": await ctx.bot.stocks.get(userobj.id, "green", "max"),
      "blue": await ctx.bot.stocks.get(userobj.id, "blue", "used"),
      "blueMax": await ctx.bot.stocks.get(userobj.id, "blue", "max"),
      "yellow": await ctx.bot.stocks.get(userobj.id, "yellow", "used"),
      "yellowMax": await ctx.bot.stocks.get(userobj.id, "yellow", "max"),
      "red": await ctx.bot.stocks.get(userobj.id, "red", "used"),
      "redMax": await ctx.bot.stocks.get(userobj.id, "red", "max"),
      "white": await ctx.bot.stocks.get(userobj.id, "white", "used"),
      "whiteMax": await ctx.bot.stocks.get(userobj.id, "white", "max"),
      "black": await ctx.bot.stocks.get(userobj.id, "black", "used"),
      "blackMax": await ctx.bot.stocks.get(userobj.id, "black", "max"),
      "brown": await ctx.bot.stocks.get(userobj.id, "brown", "used"),
      "brownMax": await ctx.bot.stocks.get(userobj.id, "brown", "max"),
      "purple": await ctx.bot.stocks.get(userobj.id, "purple", "used"),
      "purpleMax": await ctx.bot.stocks.get(userobj.id, "purple", "max")
    };
    let row = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setEmoji("1055826473442873385").setLabel("UPDATE").setCustomId(`STOCKS-REFRESH-${userobj.id}-1-${String(!!user).toUpperCase()}`).setStyle(import_discord.ButtonStyle.Primary),
      new import_discord.ButtonBuilder().setEmoji("1055825023987888169").setCustomId(`STOCKS-BACK-${userobj.id}-1-${String(!!user).toUpperCase()}`).setStyle(import_discord.ButtonStyle.Secondary).setDisabled(true),
      new import_discord.ButtonBuilder().setEmoji("1055825050126786590").setCustomId(`STOCKS-NEXT-${userobj.id}-1-${String(!!user).toUpperCase()}`).setStyle(import_discord.ButtonStyle.Secondary)
    );
    if (ctx.metadata.language === "de") {
      row = new import_discord.ActionRowBuilder().addComponents(
        new import_discord.ButtonBuilder().setEmoji("1055826473442873385").setLabel("AKTUALISIEREN").setCustomId(`STOCKS-REFRESH-${userobj.id}-1-${String(!!user).toUpperCase()}`).setStyle(import_discord.ButtonStyle.Primary),
        new import_discord.ButtonBuilder().setEmoji("1055825023987888169").setCustomId(`STOCKS-BACK-${userobj.id}-1-${String(!!user).toUpperCase()}`).setStyle(import_discord.ButtonStyle.Secondary).setDisabled(true),
        new import_discord.ButtonBuilder().setEmoji("1055825050126786590").setCustomId(`STOCKS-NEXT-${userobj.id}-1-${String(!!user).toUpperCase()}`).setStyle(import_discord.ButtonStyle.Secondary)
      );
    }
    let message;
    if (ctx.interaction.user.id === "69") {
      message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:CHART:1024398298204876941> \xBB YOUR BOUGHT STOCKS").setDescription(`
					\xBB \u{1F7E2} Green Stock
					\`\`\`${stocks.green} / ${stocks.greenMax}\`\`\`
					\xBB \u{1F535} Blue Stock
					\`\`\`${stocks.blue} / ${stocks.blueMax}\`\`\`
					\xBB \u{1F7E1} Yellow Stock
					\`\`\`${stocks.yellow} / ${stocks.yellowMax}\`\`\`
					\xBB \u{1F534} Red Stock
					\`\`\`${stocks.red} / ${stocks.redMax}\`\`\`
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version + " \xBB PAGE 1" });
      if (ctx.metadata.language === "de") {
        message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:CHART:1024398298204876941> \xBB DEINE LISTE VON AKTIEN IM BESITZ").setDescription(`
						\xBB \u{1F7E2} Gr\xFCne Aktie
						\`\`\`${stocks.green} / ${stocks.greenMax}\`\`\`
						\xBB \u{1F535} Blaue Aktie
						\`\`\`${stocks.blue} / ${stocks.blueMax}\`\`\`
						\xBB \u{1F7E1} Gelbe Aktie
						\`\`\`${stocks.yellow} / ${stocks.yellowMax}\`\`\`
						\xBB \u{1F534} Rote Aktie
						\`\`\`${stocks.red} / ${stocks.redMax}\`\`\`
					`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version + " \xBB SEITE 1" });
      }
    } else {
      message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:CHART:1024398298204876941> \xBB THE BOUGHT STOCKS OF " + userobj.username.toUpperCase()).setDescription(`
					\xBB \u{1F7E2} Green Stock
					\`\`\`${stocks.green} / ${stocks.greenMax}\`\`\`
					\xBB \u{1F535} Blue Stock
					\`\`\`${stocks.blue} / ${stocks.blueMax}\`\`\`
					\xBB \u{1F7E1} Yellow Stock
					\`\`\`${stocks.yellow} / ${stocks.yellowMax}\`\`\`
					\xBB \u{1F534} Red Stock
					\`\`\`${stocks.red} / ${stocks.redMax}\`\`\`
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version + " \xBB PAGE 1" });
      if (ctx.metadata.language === "de") {
        message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:CHART:1024398298204876941> \xBB DIE LISTE VON AKTIEN IM BESITZ VON " + userobj.username.toUpperCase()).setDescription(`
						\xBB \u{1F7E2} Gr\xFCne Aktie
						\`\`\`${stocks.green} / ${stocks.greenMax}\`\`\`
						\xBB \u{1F535} Blaue Aktie
						\`\`\`${stocks.blue} / ${stocks.blueMax}\`\`\`
						\xBB \u{1F7E1} Gelbe Aktie
						\`\`\`${stocks.yellow} / ${stocks.yellowMax}\`\`\`
						\xBB \u{1F534} Rote Aktie
						\`\`\`${stocks.red} / ${stocks.redMax}\`\`\`
					`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version + " \xBB SEITE 1" });
      }
    }
    ctx.log(false, `[CMD] STOCKS :${!user ? "" : ` ${user.id} :`} ${stocks.green} : ${stocks.blue} : ${stocks.yellow} : ${stocks.red} : ${stocks.white} : ${stocks.black} : ${stocks.brown} : ${stocks.purple}`);
    return ctx.interaction.reply({ embeds: [message], components: [row] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=stocks.js.map
