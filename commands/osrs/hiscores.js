const { SlashCommandBuilder } = require('discord.js');
const { Hiscores } = require('oldschooljs');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('hiscores')
    .setDescription('Searches user on the hiscores')
    .addStringOption(option =>
        option.setName('input')
            .setDescription('The RSN to lookup')
            .setRequired(true)),

    async execute(interaction) {
        await interaction.deferReply();
        const input = interaction.options.getString('input');
        const response = await Hiscores.fetch(input);
        console.log(response.skills.overall.rank);
        await interaction.editReply(`${input} is ranked ${response.skills.overall.rank.toString()} overall!`);
    },
};