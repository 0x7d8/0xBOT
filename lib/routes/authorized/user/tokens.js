module.exports = {
  method: "GET",
  path: "/auth/tokens",
  async code(ctr) {
    return ctr.print({
      success: true,
      tokens: {
        access: ctr["@"].user.tokens.access,
        refresh: ctr["@"].user.tokens.refresh
      }
    });
  }
};
//# sourceMappingURL=tokens.js.map
