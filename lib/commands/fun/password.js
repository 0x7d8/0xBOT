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
var password_exports = {};
__export(password_exports, {
  default: () => password_default
});
module.exports = __toCommonJS(password_exports);
var import_discord = require("discord.js");
var utils = __toESM(require("rjutils-collection"));
var password_default = {
  data: new import_discord.SlashCommandBuilder().setName("password").setDMPermission(false).setDescription("GENERATE A PASSWORD").setDescriptionLocalizations({
    de: "GENERIERE EIN PASSWORT"
  }).addIntegerOption((option) => option.setName("length").setNameLocalizations({
    de: "l\xE4nge"
  }).setDescription("THE length").setDescriptionLocalizations({
    de: "DIE L\xC4NGE"
  }).setRequired(true)),
  async execute(ctx) {
    const length = ctx.getOption("length");
    if (length > 512) {
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB The Maximum Size is **512**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Die Maximale Gr\xF6\xDFe ist **512**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] PASSWORD : TOOBIG : ${length}`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    if (length < 4) {
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB The Minimum Size is **4**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Die Minimale Gr\xF6\xDFe ist **4**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] PASSWORD : TOOSMALL : ${length}`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    const password = utils.randomStr({
      "numbers": true,
      "uppercase": true,
      "symbols": true,
      "length": length
    });
    let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:KEY:1024392167130664980> \xBB GENERATE PASSWORD").setDescription(`
				\xBB Password
				\`\`\`${password.replace("```", '``"')}\`
			`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:KEY:1024392167130664980> \xBB PASSWORT GENERIEREN").setDescription(`
					\xBB Passwort
					\`\`\`${password.replace("```", '``"')}\`\`\`
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[CMD] PASSWORD : ${length}`);
    return ctx.interaction.reply({ embeds: [message], ephemeral: true });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=password.js.map
