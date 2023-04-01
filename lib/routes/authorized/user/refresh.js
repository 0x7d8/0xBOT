var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_discord_oauth2 = __toESM(require("discord-oauth2"));
const oAuth = new import_discord_oauth2.default();
module.exports = {
  method: "GET",
  path: "/auth/refresh",
  async code(ctr) {
    const token = await oAuth.tokenRequest({
      clientId: ctr["@"].config.client.id,
      clientSecret: ctr["@"].config.client.secret,
      grantType: "refresh_token",
      scope: ["identify", "guilds", "email"],
      redirectUri: "https://0xbot.de/auth/discord",
      refreshToken: ctr["@"].user.tokens.refresh
    });
    ctr["@"].api.users.set({
      auth: ctr.headers.get("authtoken"),
      user: {
        id: ctr["@"].user.id,
        name: ctr["@"].user.name,
        tag: ctr["@"].user.tag,
        email: ctr["@"].user.email,
        avatar: ctr["@"].user.avatar
      },
      tokens: {
        access: token.access_token,
        refresh: token.refresh_token
      }
    });
    return ctr.print({
      success: true,
      tokens: {
        access: token.access_token,
        refresh: token.refresh_token
      }
    });
  }
};
//# sourceMappingURL=refresh.js.map
