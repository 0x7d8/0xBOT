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
var say_exports = {};
__export(say_exports, {
  default: () => say_default
});
module.exports = __toCommonJS(say_exports);
const { EmbedBuilder } = require("discord.js");
var say_default = {
  data: {
    name: "say"
  },
  async execute(ctx) {
    const title = ctx.interaction.fields.getTextInputValue("say-title");
    const content = ctx.interaction.fields.getTextInputValue("say-content");
    let message;
    if (ctx.interaction.user.id !== "745619551865012274") {
      message = new EmbedBuilder().setColor(3604635).setTitle(title).setDescription(content).setFooter({ text: "\xBB " + ctx.client.config.version + " \xBB NOT OFFICIAL" });
      if (ctx.metadata.language === "de") {
        message = new EmbedBuilder().setColor(3604635).setTitle(title).setDescription(content).setFooter({ text: "\xBB " + ctx.client.config.version + " \xBB NICHT OFFIZIELL" });
      }
    } else {
      message = new EmbedBuilder().setColor(3604635).setTitle(title).setDescription(content).setFooter({ text: "\xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[MOD] SAY : ${title.toUpperCase()} : ${content.toUpperCase()}`);
    return ctx.interaction.reply({ embeds: [message] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=say.js.map
