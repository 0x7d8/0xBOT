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
var refresh_exports = {};
__export(refresh_exports, {
  default: () => refresh_default
});
module.exports = __toCommonJS(refresh_exports);
var import_discord = require("discord.js");
var refresh_default = {
  data: {
    name: "stats-refresh"
  },
  async execute(ctx, userId, pageNumber, selfCmd) {
    const statsType = ["cmd", "btn", "mod"][pageNumber - 1];
    const totalStats = await ctx.bot.stat.get("t-all", statsType);
    const guildStats = await ctx.bot.stat.get("g-" + ctx.interaction.guild.id, statsType);
    const userStats = await ctx.bot.stat.get("u-" + userId, statsType);
    ctx.components.rows[0].components[0].setCustomId(`STATS-REFRESH-${userId}-${pageNumber}-${String(selfCmd).toUpperCase()}`);
    ctx.components.rows[0].components[1].setCustomId(`STATS-BACK-${userId}-${pageNumber}-${String(selfCmd).toUpperCase()}`);
    ctx.components.rows[0].components[2].setCustomId(`STATS-NEXT-${userId}-${pageNumber}-${String(selfCmd).toUpperCase()}`);
    let userobj;
    if (selfCmd)
      userobj = await ctx.client.users.fetch(userId);
    let message;
    if (!selfCmd) {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GEAR:1024404241701417011> \xBB YOUR INTERACTION STATISTICS").setDescription(`
					${statsType === "cmd" ? "\u{1F916} Commands" : statsType === "btn" ? "\u{1F5B1}\uFE0F Buttons" : "\u{1F4BB} Modals"}

					\xBB Globally Executed
					\`\`\`${totalStats}\`\`\`
					\xBB Guild Executed
					\`\`\`${guildStats}\`\`\`
					\xBB You Executed
					\`\`\`${userStats}\`\`\`
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version + " \xBB PAGE " + pageNumber });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GEAR:1024404241701417011> \xBB DEINE INTERAKTIONS STATISTIKEN").setDescription(`
						${statsType === "cmd" ? "\u{1F916} Befehle" : statsType === "btn" ? "\u{1F5B1}\uFE0F Buttons" : "\u{1F4BB} Modale"}

						\xBB Global Ausgef\xFChrt
						\`\`\`${totalStats}\`\`\`
						\xBB Server Ausgef\xFChrt
						\`\`\`${guildStats}\`\`\`
						\xBB Du Ausgef\xFChrt
						\`\`\`${userStats}\`\`\`
					`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version + " \xBB SEITE " + pageNumber });
      }
    } else {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GEAR:1024404241701417011> \xBB INTERACTION STATISTICS OF " + userobj.username.toUpperCase()).setDescription(`
					${statsType === "cmd" ? "\u{1F916} Commands" : statsType === "btn" ? "\u{1F5B1}\uFE0F Buttons" : "\u{1F4BB} Modals"}

					\xBB Globally Executed
					\`\`\`${totalStats}\`\`\`
					\xBB Guild Executed
					\`\`\`${guildStats}\`\`\`
					\xBB User Executed
					\`\`\`${userStats}\`\`\`
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version + " \xBB PAGE " + pageNumber });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GEAR:1024404241701417011> \xBB INTERAKTIONS STATISTIKEN VON " + userobj.username.toUpperCase()).setDescription(`
						${statsType === "cmd" ? "\u{1F916} Befehle" : statsType === "btn" ? "\u{1F5B1}\uFE0F Buttons" : "\u{1F4BB} Modale"}

						\xBB Global Ausgef\xFChrt
						\`\`\`${totalStats}\`\`\`
						\xBB Server Ausgef\xFChrt
						\`\`\`${guildStats}\`\`\`
						\xBB Nutzer Ausgef\xFChrt
						\`\`\`${userStats}\`\`\`
					`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version + " \xBB SEITE " + pageNumber });
      }
    }
    ctx.log(false, `[BTN] STATS :${ctx.interaction.user.id !== userId ? ` ${userId} :` : ""} REFRESH : ${pageNumber}`);
    return ctx.interaction.update({ embeds: [message], components: ctx.components.getAPI() });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=refresh.js.map
