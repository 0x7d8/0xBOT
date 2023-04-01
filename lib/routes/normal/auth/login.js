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
var utils = __toESM(require("rjutils-collection"));
var import_discord_oauth2 = __toESM(require("discord-oauth2"));
const oAuth = new import_discord_oauth2.default();
module.exports = {
  method: "POST",
  path: "/auth/login",
  async code(ctr) {
    if (!ctr.headers.has("code"))
      return ctr.status(422).print({ success: false, message: "NO CODE" });
    const token = await oAuth.tokenRequest({
      clientId: ctr["@"].config.client.id,
      clientSecret: ctr["@"].config.client.secret,
      grantType: "authorization_code",
      scope: ["identify", "guilds", "email"],
      redirectUri: "https://0xbot.de/auth/discord",
      code: ctr.headers.get("code")
    }).catch((e) => {
    });
    if (!token)
      return ctr.print({ success: false, message: "INVALID TOKEN" });
    const userInfos = await oAuth.getUser(token.access_token);
    const base = `${userInfos.id} ${token.access_token}`;
    const authToken = utils.hashStr({ text: base, algorithm: "sha256", output: "hex" });
    ctr["@"].api.users.set({
      auth: authToken,
      user: {
        id: userInfos.id,
        name: userInfos.username,
        tag: userInfos.discriminator,
        email: userInfos.email,
        avatar: userInfos.avatar
      },
      tokens: {
        access: token.access_token,
        refresh: token.refresh_token
      }
    });
    return ctr.print({
      success: true,
      authToken,
      infos: userInfos
    });
  }
};
//# sourceMappingURL=login.js.map
