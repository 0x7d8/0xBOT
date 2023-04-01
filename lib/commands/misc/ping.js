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
var ping_exports = {};
__export(ping_exports, {
  default: () => ping_default
});
module.exports = __toCommonJS(ping_exports);
var import_discord = require("discord.js");
var ping_default = {
  data: new import_discord.SlashCommandBuilder().setName("ping").setDMPermission(false).setDescription("THE BOT PING").setDescriptionLocalizations({
    de: "DER BOT PING"
  }),
  async execute(ctx) {
    const ping = ctx.client.ws.ping;
    let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GLOBE:1024403680503529583> \xBB BOT PING").setDescription(`\xBB The Bot Ping is **${ping}ms**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GLOBE:1024403680503529583> \xBB BOT PING").setDescription(`\xBB Der Ping vom Bot ist **${ping}ms**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[CMD] PING : ${ping}ms`);
    return ctx.interaction.reply({ embeds: [message], ephemeral: true });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=ping.js.map
