var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var User_exports = {};
__export(User_exports, {
  UserDefault: () => UserDefault,
  UserInfos: () => UserInfos,
  default: () => UserObject
});
module.exports = __toCommonJS(User_exports);
var import_DatabaseObject = __toESM(require("@/models/DatabaseObject"));
const UserDefault = {
  id: "",
  name: "",
  tag: "",
  avatar: "",
  email: "",
  tokens: {
    auth: "",
    access: "",
    refresh: ""
  },
  economy: {
    money: 0,
    quotes: 0,
    votes: 0
  }
};
const UserInfos = {
  table: "users",
  mapping: {
    id: "id",
    name: "name",
    tag: "tag",
    avatar: "avatar",
    email: "email",
    tokens: {
      auth: "authtoken",
      access: "accesstoken",
      refresh: "refreshtoken"
    },
    economy: {
      money: "economymoney",
      quotes: "economyquotes",
      votes: "economyvotes"
    }
  }
};
class UserObject extends import_DatabaseObject.default {
  /** Create a new User Object */
  constructor() {
    super();
    this.default = UserDefault;
    this.infos = UserInfos;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserDefault,
  UserInfos
});
//# sourceMappingURL=User.js.map
