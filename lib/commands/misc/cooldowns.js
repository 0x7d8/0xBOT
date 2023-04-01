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
var cooldowns_exports = {};
__export(cooldowns_exports, {
  default: () => cooldowns_default
});
module.exports = __toCommonJS(cooldowns_exports);
var import_discord = require("discord.js");
var import_discord2 = require("discord.js");
var cooldowns_default = {
  data: new import_discord2.SlashCommandBuilder().setName("cooldowns").setDescription("VIEW COOLDOWNS").setDescriptionLocalizations({
    de: "SCHAUE COOLDOWNS AN"
  }).setDMPermission(false).addUserOption((option) => option.setName("user").setDescription("THE USER").setDescriptionLocalizations({
    de: "DER NUTZER"
  }).setRequired(false)),
  async execute(ctx) {
    const ms = (await import("pretty-ms")).default;
    const user = ctx.interaction.options.getUser("user");
    let userobj;
    if (!user)
      userobj = ctx.interaction.user;
    else
      userobj = user;
    let embedDesc = "";
    const rawvalues = await ctx.db.query(`select name, expires from usercooldowns where userid = $1 and expires / 1000 > extract(epoch from now());`, [userobj.id]);
    for (const element of rawvalues.rows) {
      embedDesc += `\xBB ${element.name.toUpperCase()}
**${ms(Number(element.expires) - Date.now(), { secondsDecimalDigits: 0 })}**
`;
    }
    ;
    if (embedDesc === "") {
      embedDesc = "Nothing Found.";
      if (ctx.metadata.language === "de") {
        embedDesc = "Nichts Gefunden.";
      }
    }
    let row = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setLabel("UPDATE").setEmoji("1055826473442873385").setCustomId(`COOLDOWNS-${userobj.id}-${String(!!user).toUpperCase()}`).setStyle(import_discord.ButtonStyle.Primary)
    );
    if (ctx.metadata.language === "de") {
      row = new import_discord.ActionRowBuilder().addComponents(
        new import_discord.ButtonBuilder().setLabel("AKTUALISIEREN").setEmoji("1055826473442873385").setCustomId(`COOLDOWNS-${userobj.id}-${String(!!user).toUpperCase()}`).setStyle(import_discord.ButtonStyle.Primary)
      );
    }
    let message;
    if (!user) {
      message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:CLOCK:1054137880345329714> \xBB YOUR ACTIVE COOLDOWNS").setDescription(embedDesc).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:CLOCK:1054137880345329714> \xBB DEINE ATIVEN COOLDOWNS").setDescription(embedDesc).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
    } else {
      message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:CLOCK:1054137880345329714> \xBB ACTIVE COOLDOWNS OF " + userobj.username.toUpperCase()).setDescription(embedDesc).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:CLOCK:1054137880345329714> \xBB AKTIVE COOLDOWNS VON " + userobj.username.toUpperCase()).setDescription(embedDesc).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
    }
    ctx.log(false, `[CMD] COOLDOWNS :${user ? ` ${user.id} :` : ""} ${rawvalues.rowCount}`);
    return ctx.interaction.reply({ embeds: [message], components: [row] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=cooldowns.js.map
