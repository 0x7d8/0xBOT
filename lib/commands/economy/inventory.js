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
var inventory_exports = {};
__export(inventory_exports, {
  default: () => inventory_default
});
module.exports = __toCommonJS(inventory_exports);
var import_discord = require("discord.js");
var inventory_default = {
  data: new import_discord.SlashCommandBuilder().setName("inventory").setDMPermission(false).setDescription("SEE YOUR INVENTORY").setDescriptionLocalizations({
    de: "SEHE DEIN INVENTAR"
  }).addUserOption((option) => option.setName("user").setNameLocalizations({
    de: "nutzer"
  }).setDescription("THE USER").setDescriptionLocalizations({
    de: "DER NUTZER"
  }).setRequired(false)),
  async execute(ctx) {
    const user = ctx.interaction.options.getUser("user");
    let nbombs, mbombs, hbombs, cbombs, carname;
    if (!user) {
      nbombs = await ctx.bot.items.get(ctx.interaction.user.id + "-NBOMBS-" + ctx.interaction.guild.id, "amount");
      mbombs = await ctx.bot.items.get(ctx.interaction.user.id + "-MBOMBS-" + ctx.interaction.guild.id, "amount");
      hbombs = await ctx.bot.items.get(ctx.interaction.user.id + "-HBOMBS-" + ctx.interaction.guild.id, "amount");
      cbombs = await ctx.bot.items.get(ctx.interaction.user.id + "-CBOMBS-" + ctx.interaction.guild.id, "amount");
      const car = await ctx.bot.items.get(ctx.interaction.user.id + "-CAR-" + ctx.interaction.guild.id, "value");
      carname = "NONE";
      if (ctx.metadata.language === "de")
        carname = "KEINS";
      if (car === "jeep")
        carname = "2016 JEEP PATRIOT SPORT";
      if (car === "kia")
        carname = "2022 KIA SORENTO";
      if (car === "audi")
        carname = "AUDI R8 COUPE V10";
      if (car === "tesla")
        carname = "TESLA MODEL Y";
      if (car === "porsche")
        carname = "2019 PORSCHE 911 GT2RS";
    } else {
      nbombs = await ctx.bot.items.get(user.id + "-NBOMBS-" + ctx.interaction.guild.id, "amount");
      mbombs = await ctx.bot.items.get(user.id + "-MBOMBS-" + ctx.interaction.guild.id, "amount");
      hbombs = await ctx.bot.items.get(user.id + "-HBOMBS-" + ctx.interaction.guild.id, "amount");
      cbombs = await ctx.bot.items.get(user.id + "-CBOMBS-" + ctx.interaction.guild.id, "amount");
      const car = await ctx.bot.items.get(user.id + "-CAR-" + ctx.interaction.guild.id, "value");
      carname = "NONE";
      if (ctx.metadata.language === "de")
        carname = "KEINS";
      if (car === "jeep")
        carname = "2016 JEEP PATRIOT SPORT";
      if (car === "kia")
        carname = "2022 KIA SORENTO";
      if (car === "audi")
        carname = "AUDI R8 COUPE V10";
      if (car === "tesla")
        carname = "TESLA MODEL Y";
      if (car === "porsche")
        carname = "2019 PORSCHE 911 GT2RS";
    }
    let message;
    if (!user) {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOX:1024394572555624510> \xBB YOUR INVENTORY").setDescription(`
					\xBB <:NBOMB:1021783222520127508> NORMAL BOMBS
					\`\`\`${nbombs}/15\`\`\`
					\xBB <:MBOMB:1021783295211601940> MEDIUM BOMBS
					\`\`\`${mbombs}/15\`\`\`
					\xBB <:HBOMB:1022102357938536458> HYPER BOMBS
					\`\`\`${hbombs}/15\`\`\`
					\xBB <:CBOMB:1021783405161091162> CRAZY BOMBS
					\`\`\`${cbombs}/15\`\`\`
					\xBB <:CAR:1021844412998877294> CAR
					\`\`\`${carname}\`\`\`
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOX:1024394572555624510> \xBB DEIN INVENTAR").setDescription(`
						\xBB <:NBOMB:1021783222520127508> NORMALE BOMBEN
						\`\`\`${nbombs}/15\`\`\`
						\xBB <:MBOMB:1021783295211601940> MEDIUM BOMBEN
						\`\`\`${mbombs}/15\`\`\`
						\xBB <:HBOMB:1022102357938536458> HYPER BOMBEN
						\`\`\`${hbombs}/15\`\`\`
						\xBB <:CBOMB:1021783405161091162> CRAZY BOMBEN
						\`\`\`${cbombs}/15\`\`\`
						\xBB <:CAR:1021844412998877294> AUTO
						\`\`\`${carname}\`\`\`
					`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
    } else {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOX:1024394572555624510> \xBB THE INVENTORY OF " + user.username.toUpperCase()).setDescription(`
					\xBB <:NBOMB:1021783222520127508> NORMAL BOMBS
					\`\`\`${nbombs}/15\`\`\`
					\xBB <:MBOMB:1021783295211601940> MEDIUM BOMBS
					\`\`\`${mbombs}/15\`\`\`
					\xBB <:HBOMB:1022102357938536458> HYPER BOMBS
					\`\`\`${hbombs}/15\`\`\`
					\xBB <:CBOMB:1021783405161091162> CRAZY BOMBS
					\`\`\`${cbombs}/15\`\`\`
					\xBB <:CAR:1021844412998877294> CAR
					\`\`\`${carname}\`\`\`
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOX:1024394572555624510> \xBB DAS INVENTAR VON " + user.username.toUpperCase()).setDescription(`
						\xBB <:NBOMB:1021783222520127508> NORMALE BOMBEN
						\`\`\`${nbombs}/15\`\`\`
						\xBB <:MBOMB:1021783295211601940> MEDIUM BOMBEN
						\`\`\`${mbombs}/15\`\`\`
						\xBB <:HBOMB:1022102357938536458> HYPER BOMBEN
						\`\`\`${hbombs}/15\`\`\`
						\xBB <:CBOMB:1021783405161091162> CRAZY BOMBEN
						\`\`\`${cbombs}/15\`\`\`
						\xBB <:CAR:1021844412998877294> AUTO
						\`\`\`${carname}\`\`\`
					`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
    }
    ctx.log(false, `[CMD] INVENTORY`);
    return ctx.interaction.reply({ embeds: [message] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=inventory.js.map
