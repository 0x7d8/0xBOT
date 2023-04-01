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
var businessinfo_exports = {};
__export(businessinfo_exports, {
  default: () => businessinfo_default
});
module.exports = __toCommonJS(businessinfo_exports);
var import_discord = require("discord.js");
var businessinfo_default = {
  data: new import_discord.SlashCommandBuilder().setName("businessinfo").setDMPermission(false).setDescription("VIEW INFO ABOUT BUSINESSES").setDescriptionLocalizations({
    de: "SEHE INFOS VON GESCH\xC4FTEN"
  }).addStringOption((option) => option.setName("business").setNameLocalizations({
    de: "gesch\xE4ft"
  }).setDescription("THE BUSINESS").setDescriptionLocalizations({
    de: "DAS GESCH\xC4FT"
  }).setRequired(true).addChoices(
    // Setup Choices
    { name: "\u{1F7E2} SUPERMARKT", value: "market" },
    { name: "\u{1F535} PARKHAUS", value: "parking garage" },
    { name: "\u{1F7E1} AUTOHAUS", value: "car dealership" }
  )),
  async execute(ctx) {
    if (!await ctx.bot.settings.get(ctx.interaction.guild.id, "businesses")) {
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB Businesses are disabled on this Server!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Gesch\xE4fte sind auf diesem Server deaktiviert!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] BUSINESS : DISABLED`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    const business = ctx.getOption("business");
    let businessid;
    if (business === "market")
      businessid = "1";
    if (business === "parking garage")
      businessid = "2";
    if (business === "car dealership")
      businessid = "3";
    let businessowner;
    if (await ctx.bot.businesses.get("g-" + ctx.interaction.guild.id + "-" + businessid + "-OWNER") != 0) {
      let oldleft = false;
      businessowner = await ctx.bot.businesses.get("g-" + ctx.interaction.guild.id + "-" + businessid + "-OWNER");
      const businessearning = await ctx.bot.businesses.get("g-" + ctx.interaction.guild.id + "-" + businessid + "-EARNING", true);
      try {
        await ctx.interaction.guild.members.fetch(businessowner);
      } catch (e) {
        oldleft = true;
      }
      if (!oldleft) {
        let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:QUESTION:1024402860210921503> \xBB BUSINESS INFO").setDescription(`
						\xBB Business Infos:
						
						Owner: <@${businessowner}>
						Earnings: ${businessearning}\u20AC
					`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        if (ctx.metadata.language === "de") {
          message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:QUESTION:1024402860210921503> \xBB GESCH\xC4FTS INFO").setDescription(`
							\xBB Gesch\xE4fts Infos:
							
							Besitzer: <@${businessowner}>
							Einkommen: ${businessearning}\u20AC
						`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        }
        ctx.log(false, `[CMD] BUSINESSINFO : ${business.toUpperCase()}`);
        return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
      }
    }
    let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:QUESTION:1024402860210921503> \xBB BUSINESS INFO").setDescription(`
				\xBB Noone owns this Business, people say its profitable though!
				*mhm, I say that for everything*
			`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:QUESTION:1024402860210921503> \xBB GESCH\xC4FTS INFO").setDescription(`
					\xBB Niemanden geh\xF6rt dieses Gesch\xE4ft, es besagt sich es sei aber profitabel!
					*naja, das sag ich bei jedem*
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[CMD] BUSINESSINFO : ${business.toUpperCase()} : NOTOWNED`);
    return ctx.interaction.reply({ embeds: [message], ephemeral: true });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=businessinfo.js.map
