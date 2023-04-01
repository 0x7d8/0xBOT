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
var ball_exports = {};
__export(ball_exports, {
  default: () => ball_default
});
module.exports = __toCommonJS(ball_exports);
var import_discord = require("discord.js");
var ball_default = {
  data: new import_discord.SlashCommandBuilder().setName("8ball").setDescription("ASK A MAGIC BALL").setDescriptionLocalizations({
    de: "FRAGE EINEN MAGISCHEN BALL"
  }).setDMPermission(false).addStringOption((option) => option.setName("question").setNameLocalizations({
    de: "frage"
  }).setDescription("THE QUESTION").setDescriptionLocalizations({
    de: "DIE FRAGE"
  }).setRequired(true)),
  async execute(ctx) {
    const question = ctx.getOption("question");
    const random = ctx.bot.random(1, 20);
    let result;
    if (random === 1)
      result = "Certainly.";
    if (random === 2)
      result = "Its Guaranteed!";
    if (random === 3)
      result = "Without question!";
    if (random === 4)
      result = "Definitely yes!";
    if (random === 5)
      result = "You betcha!";
    if (random === 6)
      result = "As I see it, yes!";
    if (random === 7)
      result = "Most likely.";
    if (random === 8)
      result = "Looks good!";
    if (random === 9)
      result = "Yes!";
    if (random === 10)
      result = "Looks all right!";
    if (random === 11)
      result = "Im not sure, ask again.";
    if (random === 12)
      result = "Ask me again later.";
    if (random === 13)
      result = "Id rather not answer that right now.";
    if (random === 14)
      result = "I cant tell you at all.";
    if (random === 15)
      result = "Concentrate and ask again!";
    if (random === 16)
      result = "I wouldnt count on it!";
    if (random === 17)
      result = "Computer says no.";
    if (random === 18)
      result = "After much deliberation, I would say no.";
    if (random === 19)
      result = "I dont think so!";
    if (random === 20)
      result = "I doubt it.";
    if (ctx.metadata.language === "de") {
      if (random === 1)
        result = "Sicherlich.";
      if (random === 2)
        result = "Es ist Garantiert!";
      if (random === 3)
        result = "Ohne question!";
      if (random === 4)
        result = "Definitiv ja!";
      if (random === 5)
        result = "Da kannst du drauf wetten!";
      if (random === 6)
        result = "Wie ich das sehe, ja!";
      if (random === 7)
        result = "H\xF6chstwahrscheinlich.";
      if (random === 8)
        result = "Sieht gut aus!";
      if (random === 9)
        result = "Ja!";
      if (random === 10)
        result = "Sieht ganz so aus.";
      if (random === 11)
        result = "Ich bin mir nicht sicher, frag nochmal.";
      if (random === 12)
        result = "Frag mich sp\xE4ter nochmal.";
      if (random === 13)
        result = "Das w\xFCrde ich jetzt lieber nicht beantworten.";
      if (random === 14)
        result = "Kann ich dir garnicht sagen.";
      if (random === 15)
        result = "Konzentrier dich und frag nochmal!";
      if (random === 16)
        result = "Ich w\xFCrde nicht darauf z\xE4hlen!";
      if (random === 17)
        result = "Computer sagt nein.";
      if (random === 18)
        result = "Nach reichlicher \xDCberlegung w\xFCrde ich nein sagen.";
      if (random === 19)
        result = "Ich glaube nicht!";
      if (random === 20)
        result = "Ich bezweifle es.";
    }
    let formatted;
    if (question.slice(-1) === "?")
      formatted = question;
    else
      formatted = question + "?";
    let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:QUESTION:1024402860210921503> \xBB MAGIC BALL").setDescription(`\xBB "${formatted}" -> ${result}`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:QUESTION:1024402860210921503> \xBB MAGISCHER BALL").setDescription(`\xBB "${formatted}" -> ${result}`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, "[CMD] 8BALL : " + formatted.toUpperCase() + " : " + result.toUpperCase());
    return ctx.interaction.reply({ embeds: [message] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=8ball.js.map
