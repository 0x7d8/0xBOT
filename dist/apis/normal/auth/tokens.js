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
path: '/auth/tokens',
async code(ctr) {
if (!ctr.headers.has('authtoken'))
return ctr.print({ "success": false, "message": 'NO AUTH TOKEN' });
const userInfos = await ctr['@'].api.users.get(ctr.headers.get('authtoken'));
if (!userInfos.id)
return ctr.print({ "success": false, "message": 'USER NOT FOUND' });
return ctr.print({
"success": true,
"tokens": {
"access": userInfos.tokens.access,
"refresh": userInfos.tokens.refresh
}
});
}
};
//# sourceMappingURL=tokens.js.map