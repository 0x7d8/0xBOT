"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfos = exports.UserDefault = void 0;
const DatabaseObject_1 = __importDefault(require("@/models/DatabaseObject"));
exports.UserDefault = {
id: '',
name: '',
tag: '',
avatar: '',
email: '',
tokens: {
auth: '',
access: '',
refresh: ''
}, economy: {
money: 0,
quotes: 0,
votes: 0
}
};
exports.UserInfos = {
table: 'users',
mapping: {
id: 'id',
name: 'name',
tag: 'tag',
avatar: 'avatar',
email: 'email',
tokens: {
auth: 'authtoken',
access: 'accesstoken',
refresh: 'refreshtoken',
}, economy: {
money: 'economymoney',
quotes: 'economyquotes',
votes: 'economyvotes'
}
}
};
class UserObject extends DatabaseObject_1.default {
constructor() {
super();
this.default = exports.UserDefault;
this.infos = exports.UserInfos;
}
}
exports.default = UserObject;
//# sourceMappingURL=User.js.map