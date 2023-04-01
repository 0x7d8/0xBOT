var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var level_exports = {};
__export(level_exports, {
  default: () => level_default
});
module.exports = __toCommonJS(level_exports);
var import_discord = require("discord.js");
var import_discord2 = require("discord.js");
var canvas = __toESM(require("canvacord"));
var level_default = {
  data: new import_discord.SlashCommandBuilder().setName("level").setDMPermission(false).setDescription("VIEW THE LEVELS").setDescriptionLocalizations({
    de: "SEHE DIE LEVEL"
  }).addUserOption((option) => option.setName("user").setNameLocalizations({
    de: "nutzer"
  }).setDescription("THE USER").setDescriptionLocalizations({
    de: "DER NUTZER"
  }).setRequired(false)),
  async execute(ctx) {
    if (!await ctx.bot.settings.get(ctx.interaction.guild.id, "levels")) {
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB The Level System is disabled on this Server!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Das Level System ist auf diesem Server deaktiviert!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] LEVEL : DISABLED`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    const user = ctx.interaction.options.getUser("user");
    let userobj;
    if (!user)
      userobj = ctx.interaction.user;
    else
      userobj = user;
    await ctx.interaction.deferReply();
    const counts = [];
    if (!user) {
      counts.push(await ctx.bot.stat.get("u-" + ctx.interaction.user.id + "-" + ctx.interaction.guild.id + "-C", "msg"));
      counts.push(await ctx.bot.stat.get("u-" + ctx.interaction.user.id + "-" + ctx.interaction.guild.id + "-A", "msg"));
      ctx.log(false, `[CMD] LEVEL : ${counts[0]}`);
    } else {
      counts.push(await ctx.bot.stat.get("u-" + user.id + "-" + ctx.interaction.guild.id + "-C", "msg"));
      counts.push(await ctx.bot.stat.get("u-" + user.id + "-" + ctx.interaction.guild.id + "-A", "msg"));
      ctx.log(false, `[CMD] LEVEL : ${user.id} : ${counts[0]}`);
    }
    const XP = Math.round(counts[0] / 5);
    let level = 0, levelXP = XP;
    while (levelXP >= 500) {
      level++;
      levelXP -= 500;
    }
    let totalxp = "TOTAL XP";
    if (ctx.metadata.language === "de")
      totalxp = "ALLE XP";
    const rankCard = new canvas.Rank().setAvatar(userobj.displayAvatarURL({ format: "png" })).setCurrentXP(levelXP).setRequiredXP(500).setProgressBar("#90CDF4", "COLOR").setUsername(userobj.username).setDiscriminator(userobj.discriminator).setOverlay("#00000000").setBackground("COLOR", "#00000000").setProgressBarTrack("#413E4D").setLevel(level, "LEVEL ", true).setRank(XP, totalxp, true);
    let attachment;
    const buildCard = async () => {
      await rankCard.build().then((data) => {
        attachment = new import_discord2.AttachmentBuilder(data, { name: "rank.png", description: "Rank Card Image" });
      });
      return;
    };
    await buildCard();
    let message;
    if (!user) {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GLOBE:1024403680503529583> \xBB YOUR LEVEL").setImage("attachment://rank.png").setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GLOBE:1024403680503529583> \xBB DEIN LEVEL").setImage("attachment://rank.png").setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
    } else {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GLOBE:1024403680503529583> \xBB THE LEVEL OF " + user.username.toUpperCase()).setImage("attachment://rank.png").setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GLOBE:1024403680503529583> \xBB DAS LEVEL VON " + user.username.toUpperCase()).setImage("attachment://rank.png").setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
    }
    return ctx.interaction.editReply({ embeds: [message], files: [attachment] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=level.js.map
