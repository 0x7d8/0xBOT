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
Object.defineProperty(exports, "__esModule", { value: true });
const bot = __importStar(require("@functions/bot.js"));
exports.default = {
    data: {
        name: 'poll'
    },
    async execute(interaction, client, lang, vote, choice) {
        // Get Choices
        const cache = interaction.message.components[0];
        let yes = Number((cache.components[0].data.label.split(' ['))[0]);
        let no = Number((cache.components[1].data.label.split(' ['))[0]);
        // Count Choice
        const dbChoice = await bot.polls.get(interaction.message.id, interaction.user.id);
        if (dbChoice === '') {
            if (choice === 'yes')
                yes++;
            if (choice === 'no')
                no++;
            bot.polls.set(interaction.message.id, interaction.user.id, (choice === 'yes'));
        }
        else {
            if ((choice === 'yes') === dbChoice) {
                if (dbChoice)
                    yes--;
                if (!dbChoice)
                    no--;
                bot.polls.del(interaction.message.id, interaction.user.id);
            }
            else {
                if (dbChoice)
                    yes--;
                if (!dbChoice)
                    no--;
                if (choice === 'yes')
                    yes++;
                if (choice === 'no')
                    no++;
                bot.polls.set(interaction.message.id, interaction.user.id, (choice === 'yes'));
            }
        }
        // Edit Buttons
        if (yes + no === 0) {
            interaction.message.components[0].components[0].data.label = `0 [0%]`;
            interaction.message.components[0].components[1].data.label = `0 [0%]`;
        }
        else {
            interaction.message.components[0].components[0].data.label = `${yes} [${Math.round(100 * yes / (yes + no))}%]`;
            interaction.message.components[0].components[1].data.label = `${no} [${Math.round(100 * no / (yes + no))}%]`;
        }
        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] POLL : ' + choice.toUpperCase());
        return interaction.update({ components: interaction.message.components });
    }
};
//# sourceMappingURL=poll.js.map