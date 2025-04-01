const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('long')
		.setDescription('Replies after a long time!'),
	async execute(interaction) {
		await interaction.deferReply();
        await wait(5_000);
        await interaction.editReply('Long!');
	},
};