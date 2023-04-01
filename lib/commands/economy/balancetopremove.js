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
var balancetopremove_exports = {};
__export(balancetopremove_exports, {
  default: () => balancetopremove_default
});
module.exports = __toCommonJS(balancetopremove_exports);
var import_discord = require("discord.js");
var import_v10 = require("discord-api-types/v10");
var balancetopremove_default = {
  data: new import_discord.SlashCommandBuilder().setName("balancetopremove").setDMPermission(false).setDescription("REMOVE SOMEONE FROM BALANCE TOP").setDescriptionLocalizations({
    de: "ENTFERNE JEMANDEN VON TOP KONTOST\xC4NDEN"
  }).addUserOption((option) => option.setName("user").setNameLocalizations({
    de: "nutzer"
  }).setDescription("THE USER").setDescriptionLocalizations({
    de: "DER NUTZER"
  }).setRequired(true)).setDefaultMemberPermissions(import_v10.PermissionFlagsBits.Administrator),
  async execute(ctx) {
    const user = ctx.interaction.options.getUser("user");
    let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:WALLET:1024387370793050273> \xBB TOP BALANCE REMOVAL").setDescription(`
				\xBB Successfully removed <@${user.id}> from your Servers Top Balance!
				If this User interacts with money again he will be on the List again.
			`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:WALLET:1024387370793050273> \xBB TOP KONTOST\xC4NDE ENTFERNUNG").setDescription(`
					\xBB Erfolgreich <@${user.id}> von der Top Kontost\xE4nde Liste des Servers entfernt!
					Wenn dieser Nutzer wieder mit Geld interagiert, wird er wieder auf der Liste sein.
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    await ctx.db.query(`update usermoney set guilds = array_remove(guilds, $1) where userid = $2;`, [ctx.interaction.guild.id, user.id]);
    ctx.log(false, `[CMD] BALANCETOPREMOVE : ${user.id}`);
    return ctx.interaction.reply({ embeds: [message], ephemeral: true }).catch(() => {
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=balancetopremove.js.map
