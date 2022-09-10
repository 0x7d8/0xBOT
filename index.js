const { ShardingManager } = require('discord.js');
const { token } = require('./config.json');

// Show Logo
console.log(' ')
console.log('  /$$$$$$            /$$$$$$$   /$$$$$$  /$$$$$$$$')
console.log(' /$$$_  $$          | $$__  $$ /$$__  $$|__  $$__/')
console.log('| $$$$\\ $$ /$$   /$$| $$  \\ $$| $$  \\ $$   | $$   ')
console.log('| $$ $$ $$|  $$ /$$/| $$$$$$$ | $$  | $$   | $$   ')
console.log('| $$\\ $$$$ \\  $$$$/ | $$__  $$| $$  | $$   | $$   ')
console.log('| $$ \\ $$$  >$$  $$ | $$  \\ $$| $$  | $$   | $$   ')
console.log('|  $$$$$$/ /$$/\\  $$| $$$$$$$/|  $$$$$$/   | $$   ')
console.log(' \\______/ |__/  \\__/|_______/  \\______/    |__/   ')
console.log(' ')
console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
console.log(' ')

const manager = new ShardingManager('./bot.js', { token: token, shards: 'auto' });
manager.on('shardCreate', shard => console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] LAUNCHED SHARD #' + shard.id));
manager.spawn();