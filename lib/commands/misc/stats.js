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
var stats_exports = {};
__export(stats_exports, {
  default: () => stats_default
});
module.exports = __toCommonJS(stats_exports);
var import_discord = require("discord.js");
var import_discord2 = require("discord.js");
var stats_default = {
  data: new import_discord2.SlashCommandBuilder().setName("stats").setDescription("SEE STATS").setDescriptionLocalizations({
    de: "SEHE STATISTIKEN"
  }).setDMPermission(false).addUserOption((option) => option.setName("user").setDescription("THE USER").setDescriptionLocalizations({
    de: "DER NUTZER"
  }).setRequired(false)),
  async execute(ctx) {
    const user = ctx.interaction.options.getUser("user");
    let userobj;
    if (!user) {
      userobj = ctx.interaction.user;
      ctx.log(false, `[CMD] STATS : 1`);
    } else {
      userobj = user;
      ctx.log(false, `[CMD] STATS : ${user.id} : 1`);
    }
    const totalStats = await ctx.bot.stat.get("t-all", "cmd");
    const guildStats = await ctx.bot.stat.get("g-" + ctx.interaction.guild.id, "cmd");
    const userStats = await ctx.bot.stat.get("u-" + userobj.id, "cmd");
    let row = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setEmoji("1055826473442873385").setLabel("UPDATE").setCustomId(`STATS-REFRESH-${userobj.id}-1-${String(!!user).toUpperCase()}`).setStyle(import_discord.ButtonStyle.Primary),
      new import_discord.ButtonBuilder().setEmoji("1055825023987888169").setCustomId(`STATS-BACK-${userobj.id}-1-${String(!!user).toUpperCase()}`).setStyle(import_discord.ButtonStyle.Secondary).setDisabled(true),
      new import_discord.ButtonBuilder().setEmoji("1055825050126786590").setCustomId(`STATS-NEXT-${userobj.id}-1-${String(!!user).toUpperCase()}`).setStyle(import_discord.ButtonStyle.Secondary)
    );
    if (ctx.metadata.language === "de") {
      row = new import_discord.ActionRowBuilder().addComponents(
        new import_discord.ButtonBuilder().setEmoji("1055826473442873385").setLabel("AKTUALISIEREN").setCustomId(`STATS-REFRESH-${userobj.id}-1-${String(!!user).toUpperCase()}`).setStyle(import_discord.ButtonStyle.Primary),
        new import_discord.ButtonBuilder().setEmoji("1055825023987888169").setCustomId(`STATS-BACK-${userobj.id}-1-${String(!!user).toUpperCase()}`).setStyle(import_discord.ButtonStyle.Secondary).setDisabled(true),
        new import_discord.ButtonBuilder().setEmoji("1055825050126786590").setCustomId(`STATS-NEXT-${userobj.id}-1-${String(!!user).toUpperCase()}`).setStyle(import_discord.ButtonStyle.Secondary)
      );
    }
    let message;
    if (!user) {
      message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:GEAR:1024404241701417011> \xBB YOUR INTERACTION STATISTICS").setDescription(`
					\u{1F916} Commands

					\xBB Globally Executed
					\`\`\`${totalStats}\`\`\`
					\xBB Guild Executed
					\`\`\`${guildStats}\`\`\`
					\xBB You Executed
					\`\`\`${userStats}\`\`\`
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version + " \xBB PAGE 1" });
      if (ctx.metadata.language === "de") {
        message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:GEAR:1024404241701417011> \xBB DEINE INTERAKTIONS STATISTIKEN").setDescription(`
						\u{1F916} Befehle

						\xBB Global Ausgef\xFChrt
						\`\`\`${totalStats}\`\`\`
						\xBB Server Ausgef\xFChrt
						\`\`\`${guildStats}\`\`\`
						\xBB Du Ausgef\xFChrt
						\`\`\`${userStats}\`\`\`
					`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version + " \xBB SEITE 1" });
      }
    } else {
      message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:GEAR:1024404241701417011> \xBB INTERACTION STATISTICS OF " + userobj.username.toUpperCase()).setDescription(`
					\u{1F916} Commands

					\xBB Globally Executed
					\`\`\`${totalStats}\`\`\`
					\xBB Guild Executed
					\`\`\`${guildStats}\`\`\`
					\xBB User Executed
					\`\`\`${userStats}\`\`\`
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version + " \xBB PAGE 1" });
      if (ctx.metadata.language === "de") {
        message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:GEAR:1024404241701417011> \xBB INTERAKTIONS STATISTIKEN VON " + userobj.username.toUpperCase()).setDescription(`
						\u{1F916} Befehle

						\xBB Global Ausgef\xFChrt
						\`\`\`${totalStats}\`\`\`
						\xBB Server Ausgef\xFChrt
						\`\`\`${guildStats}\`\`\`
						\xBB Nutzer Ausgef\xFChrt
						\`\`\`${userStats}\`\`\`
					`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version + " \xBB SEITE 1" });
      }
    }
    return ctx.interaction.reply({ embeds: [message], components: [row] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=stats.js.map
