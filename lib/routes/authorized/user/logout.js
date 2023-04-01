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
  method: "POST",
  path: "/auth/logout",
  async code(ctr) {
    ctr["@"].api.users.rem(ctr["@"].user.id);
    await oAuth.revokeToken(
      ctr["@"].user.tokens.access,
      Buffer.from(`${ctr["@"].config.client.id}:${ctr["@"].config.client.secret}`).toString("base64")
    );
    return ctr.print({
      success: true
    });
  }
};
//# sourceMappingURL=logout.js.map
