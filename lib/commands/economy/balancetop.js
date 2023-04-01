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
var balancetop_exports = {};
__export(balancetop_exports, {
  default: () => balancetop_default
});
module.exports = __toCommonJS(balancetop_exports);
var import_discord = require("discord.js");
var balancetop_default = {
  data: new import_discord.SlashCommandBuilder().setName("balancetop").setDMPermission(false).setDescription("SEE THE TOP BALANCE").setDescriptionLocalizations({
    de: "SEHE DEN KONTOSTAND"
  }).addStringOption((option) => option.setName("list").setNameLocalizations({
    de: "liste"
  }).setDescription("THE LIST").setDescriptionLocalizations({
    de: "DIE LISTE"
  }).setRequired(true).addChoices(
    // Setup Choices
    { name: "\u{1F30D} GLOBAL", value: "global" },
    { name: "\u{1F3D8}\uFE0F SERVER", value: "server" }
  )),
  async execute(ctx) {
    const listtype = ctx.getOption("list");
    await ctx.interaction.deferReply();
    let embedDesc = "";
    let count = 0;
    if (listtype === "global") {
      const rawvalues = await ctx.db.query(`select * from usermoney order by money DESC`);
      for (const element of rawvalues.rows) {
        if (count >= 10)
          break;
        let skip = false;
        const userinfo = await ctx.bot.userdb.get(element.userid);
        if (!skip) {
          count++;
          let formattedcount = count.toString();
          if (count < 10)
            formattedcount = "0" + count;
          if (element.userid !== ctx.interaction.user.id)
            embedDesc += `\`${formattedcount}.\` \xBB ${userinfo.username}#${userinfo.usertag} (**${element.money}\u20AC**)
`;
          else
            embedDesc += `**\`${formattedcount}.\`** \xBB ${userinfo.username}#${userinfo.usertag} (**${element.money}\u20AC**)
`;
        }
      }
    } else {
      const rawvalues = await ctx.db.query(`select * from usermoney where $1 = any(guilds) order by money DESC limit 10`, [ctx.interaction.guild.id]);
      for (const element of rawvalues.rows) {
        count++;
        let formattedcount = count.toString();
        if (count < 10)
          formattedcount = "0" + count;
        if (element.userid !== ctx.interaction.user.id)
          embedDesc += `\`${formattedcount}.\` \xBB <@${element.userid}> (**${element.money}\u20AC**)
`;
        else
          embedDesc += `**\`${formattedcount}.\`** \xBB <@${element.userid}> (**${element.money}\u20AC**)
`;
      }
    }
    ;
    if (embedDesc === "") {
      embedDesc = "Nothing to Display.";
      if (ctx.metadata.language === "de") {
        embedDesc = "Nichts zum Anzeigen.";
      }
    }
    let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:WALLET:1024387370793050273> \xBB TOP BALANCES [" + listtype.toUpperCase() + "]").setDescription(embedDesc).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:WALLET:1024387370793050273> \xBB TOP KONTOST\xC4NDE [" + listtype.toUpperCase() + "]").setDescription(embedDesc).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[CMD] BALANCETOP : ${listtype.toString().toUpperCase()}`);
    return ctx.interaction.editReply({ embeds: [message] }).catch(() => {
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=balancetop.js.map
