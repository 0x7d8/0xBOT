module.exports = {
  method: "GET",
  path: "/fetch/guild",
  async code(ctr) {
    if (!ctr.queries.has("id"))
      return ctr.status(422).print({ success: false, message: "NO ID" });
    let guild;
    try {
      guild = await ctr["@"].client.guilds.fetch(ctr.queries.get("id"));
    } catch {
      return ctr.print({ success: false, message: "INVALID GUILD" });
    }
    return ctr.print({
      success: true,
      ...guild.toJSON()
    });
  }
};
//# sourceMappingURL=fetch.js.map
