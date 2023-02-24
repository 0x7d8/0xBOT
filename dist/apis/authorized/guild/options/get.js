"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
if (k2 === undefined) k2 = k;
var desc = Object.getOwnPropertyDescriptor(m, k);
if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
  desc = { enumerable: true, get: function() { return m[k]; } };
}
Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
if (k2 === undefined) k2 = k;
o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
if (mod && mod.__esModule) return mod;
var result = {};
if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
__setModuleDefault(result, mod);
return result;
};
const webserver = __importStar(require("rjweb-server"));
module.exports = {
method: webserver.types.get,
path: '/options/guild',
async code(ctr) {
if (!ctr.queries.has('id'))
return ctr.status(422).print({ "success": false, "message": 'NO ID' });
let guildlang = 'ENGLISH';
if (await ctr['@'].bot.language.get(ctr.queries.get('id')) === 'de')
guildlang = 'GERMAN';
return ctr.print({
"success": true,
"language": guildlang,
"businesses": await ctr['@'].bot.settings.get(ctr.queries.get('id'), 'businesses'),
"items": await ctr['@'].bot.settings.get(ctr.queries.get('id'), 'items'),
"cars": await ctr['@'].bot.settings.get(ctr.queries.get('id'), 'cars'),
"stocks": await ctr['@'].bot.settings.get(ctr.queries.get('id'), 'stocks'),
"luckgames": await ctr['@'].bot.settings.get(ctr.queries.get('id'), 'luckgames'),
"daily": await ctr['@'].bot.settings.get(ctr.queries.get('id'), 'daily'),
"work": await ctr['@'].bot.settings.get(ctr.queries.get('id'), 'work'),
"rob": await ctr['@'].bot.settings.get(ctr.queries.get('id'), 'rob'),
"levels": await ctr['@'].bot.settings.get(ctr.queries.get('id'), 'levels'),
"quotes": await ctr['@'].bot.settings.get(ctr.queries.get('id'), 'quotes'),
"showerthought": await ctr['@'].bot.settings.get(ctr.queries.get('id'), 'showerthought'),
"cursedimage": await ctr['@'].bot.settings.get(ctr.queries.get('id'), 'cursedimage'),
"meme": await ctr['@'].bot.settings.get(ctr.queries.get('id'), 'meme')
});
}
};
//# sourceMappingURL=get.js.map