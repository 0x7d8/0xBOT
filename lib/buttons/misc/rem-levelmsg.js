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
var rem_levelmsg_exports = {};
__export(rem_levelmsg_exports, {
  default: () => rem_levelmsg_default
});
module.exports = __toCommonJS(rem_levelmsg_exports);
var import_discord = require("discord.js");
var rem_levelmsg_default = {
  data: {
    name: "rem-levelmsg"
  },
  async execute(ctx) {
    const [mention] = ctx.interaction.message.mentions.parsedUsers.values();
    if (ctx.interaction.user.id !== mention.id) {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB <@${mention.id}> has to decide this!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB <@${mention.id}> muss das entscheiden!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[BTN] REM-LEVELMSG : NOTALLOWED`);
      return ctx.interaction.reply({ embeds: [message], ephemeral: true });
    }
    return ctx.interaction.message.delete();
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=rem-levelmsg.js.map
