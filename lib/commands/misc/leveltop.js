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
var leveltop_exports = {};
__export(leveltop_exports, {
  default: () => leveltop_default
});
module.exports = __toCommonJS(leveltop_exports);
var import_discord = require("discord.js");
var leveltop_default = {
  data: new import_discord.SlashCommandBuilder().setName("leveltop").setDMPermission(false).setDescription("SEE THE TOP LEVELS").setDescriptionLocalizations({
    de: "SEHE DIE TOP LEVEL"
  }),
  async execute(ctx) {
    await ctx.interaction.deferReply();
    let embedDesc = "";
    let count = 0;
    const rawvalues = await ctx.db.query(`select * from stats where name like $1 and type = 'msg' order by value desc;`, ["%" + ctx.interaction.guild.id + "-C"]);
    for (const element of rawvalues.rows) {
      count++;
      let formattedcount = count.toString();
      const cache = element.name.split("-");
      const XP = Math.round(element.value / 5);
      let level = 0, levelXP = XP;
      while (levelXP >= 500) {
        level++;
        levelXP -= 500;
      }
      if (count < 10)
        formattedcount = "0" + count;
      if (cache[1] !== ctx.interaction.user.id)
        embedDesc += `\`${formattedcount}.\` \xBB <@${cache[1]}> (**LVL ${level}, ${XP} XP**)
`;
      else
        embedDesc += `**\`${formattedcount}.\`** \xBB <@${cache[1]}> (**LVL ${level}, ${XP} XP**)
`;
    }
    ;
    if (embedDesc === "") {
      embedDesc = "Nothing to Display.";
      if (ctx.metadata.language === "de") {
        embedDesc = "Nichts zum Anzeigen.";
      }
    }
    let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GLOBE:1024403680503529583> \xBB TOP LEVELS").setDescription(embedDesc).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GLOBE:1024403680503529583> \xBB TOP LEVEL").setDescription(embedDesc).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[CMD] LEVELTOP`);
    return ctx.interaction.editReply({ embeds: [message] }).catch(() => {
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=leveltop.js.map
