const { ShardingManager } = require('discord.js');
const { token } = require('./config.json');

const manager = new ShardingManager('./bot.js', { token: token, shards: 'auto' });

manager.on('shardCreate', shard => console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] LAUNCHED SHARD #' + shard.id));
manager.spawn();