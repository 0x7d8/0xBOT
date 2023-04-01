var import_discord = require("discord.js");
module.exports = {
  method: "POST",
  path: "/webhook/topgg",
  async code(ctr) {
    if (ctr.headers.get("authorization") !== ctr["@"].config.web.keys.topgg.webkey)
      return ctr.status(401).print({ success: false, message: "WRONG AUTHORIZATION" });
    if (!ctr.body.user)
      return;
    const random = ctr["@"].bot.random(7500, 15e3);
    let extra;
    if ((await ctr["@"].bot.votes.get(ctr.body.user + "-A") + 1) % 10 === 0)
      extra = (await ctr["@"].bot.votes.get(ctr.body.user + "-A") + 1) * 1e4 / 2;
    let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("\xBB VOTING").setDescription(`\xBB Thanks for Voting! You got **$${random}** from me :)
\xBB Danke f\xFCrs Voten! Du hast **${random}\u20AC** von mir erhalten :)`).setFooter({ text: "\xBB " + ctr["@"].config.version });
    if (await ctr["@"].bot.language.get(ctr.body.user) === "de") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("\xBB VOTING").setDescription(`\xBB Danke f\xFCrs Voten! Du hast **${random}\u20AC** von mir erhalten :)`).setFooter({ text: "\xBB " + ctr["@"].config.version });
    } else {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("\xBB VOTING").setDescription(`\xBB Thanks for Voting! You got **$${random}** from me :)`).setFooter({ text: "\xBB " + ctr["@"].config.version });
    }
    ;
    let messageBonus = new import_discord.EmbedBuilder().setColor(3604635).setTitle("\xBB VOTING").setDescription(`\xBB Thanks for Voting **${await ctr["@"].bot.votes.get(ctr.body.user + "-A") + 1}** times!
As A Gift I give you extra **$${extra}**!`).setFooter({ text: "\xBB " + ctr["@"].config.version });
    if (await ctr["@"].bot.language.get(ctr.body.user) === "de") {
      messageBonus = new import_discord.EmbedBuilder().setColor(3604635).setTitle("\xBB VOTING").setDescription(`\xBB Danke, dass du **${await ctr["@"].bot.votes.get(ctr.body.user + "-A") + 1}** mal gevotet hast!
Als Geschenk gebe ich dir extra **${extra}\u20AC**!`).setFooter({ text: "\xBB " + ctr["@"].config.version });
    }
    await ctr["@"].bot.money.add(false, ctr.body.user, random);
    console.log(`[0xBOT] [i] [${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false })}] [WEB] VOTED : ${ctr.body.user} : ${random}\u20AC : TOPGG`);
    ctr["@"].client.users.send(ctr.body.user, { embeds: [message] });
    if ((await ctr["@"].bot.votes.get(ctr.body.user + "-A") + 1) % 10 === 0) {
      ctr["@"].bot.money.add(false, ctr.body.user, extra);
      ctr["@"].client.users.send(ctr.body.user, { embeds: [messageBonus] });
    }
    ;
    ctr["@"].bot.votes.add(ctr.body.user + "-A", 1);
    ctr["@"].bot.votes.set(ctr.body.user + "-T", Date.now());
    return ctr.print({ success: true, message: "VOTE RECIEVED" });
  }
};
//# sourceMappingURL=topgg.js.map
