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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.get = void 0;
const _config_1 = __importDefault(require("@config"));
const pg_1 = __importDefault(require("pg"));
const db = new pg_1.default.Pool({
    host: _config_1.default.database.oxbot.host,
    database: _config_1.default.database.oxbot.database,
    user: _config_1.default.database.oxbot.username,
    password: _config_1.default.database.oxbot.password,
    port: 5432,
    ssl: true
});
const utils = __importStar(require("rjutils-collection"));
const get = async (transactionId) => {
    const data = await db.query(`select * from usertransactions where id = $1;`, [transactionId]);
    if (data.rowCount !== 1)
        return 'N-FOUND';
    return {
        id: data.rows[0].id,
        success: data.rows[0].success,
        timestamp: data.rows[0].timestamp,
        sender: {
            id: data.rows[0].senderid,
            amount: data.rows[0].senderamount,
            type: data.rows[0].sendertype
        }, reciever: {
            id: data.rows[0].recieverid,
            amount: data.rows[0].recieveramount,
            type: data.rows[0].recievertype
        }
    };
};
exports.get = get;
const log = async (json) => {
    const transactionId = utils.randomStr({
        length: 20,
        numbers: true,
        uppercase: true,
        lowercase: true,
        symbols: false,
        exclude: ''
    });
    if (json.sender.id === undefined)
        json.sender = {
            id: 'empty',
            amount: '0',
            type: 'empty'
        };
    if (json.reciever.id === undefined)
        json.reciever = {
            id: 'empty',
            amount: '0',
            type: 'empty'
        };
    await db.query(`insert into usertransactions values ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [
        transactionId,
        json.sender.id,
        json.sender.amount,
        json.sender.type,
        json.reciever.id,
        json.reciever.amount,
        json.reciever.type,
        json.success,
        (Math.floor(+new Date() / 1000))
    ]);
    return {
        success: true,
        id: transactionId
    };
};
exports.log = log;
//# sourceMappingURL=transactions.js.map