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
var count_exports = {};
__export(count_exports, {
  default: () => count_default
});
module.exports = __toCommonJS(count_exports);
var import_discord = require("discord.js");
var count_default = {
  data: {
    name: "count"
  },
  async execute(ctx, type) {
    const cache = ctx.interaction.message.embeds;
    let number = Number(cache[0].description.toString().match(/\d+/g));
    if (typeof ctx.interaction.message.components[0].components[1] !== "undefined") {
      if (number === 1) {
        ctx.components.rows[0].components[1].setDisabled(true);
        await ctx.interaction.message.edit({ components: ctx.components.getAPI() });
      } else {
        ctx.components.rows[0].components[1].setDisabled(false);
        await ctx.interaction.message.edit({ components: ctx.components.getAPI() });
      }
    }
    if (type === "plus")
      number++;
    else
      number--;
    let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:INFINITE:1024406060380979300> \xBB COUNTING").setDescription(`
				\xBB Current Number
				\`\`\`${number}\`\`\`
			`).setFooter({ text: "\xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:INFINITE:1024406060380979300> \xBB Z\xC4HLEN").setDescription(`
					\xBB Aktuelle Nummer
					\`\`\`${number}\`\`\`
				`).setFooter({ text: "\xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[BTN] COUNT : ${number}`);
    return ctx.interaction.update({ embeds: [message], components: ctx.components.getAPI() });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=count.js.map
