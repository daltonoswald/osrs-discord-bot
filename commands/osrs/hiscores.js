const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { Hiscores } = require('oldschooljs');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('hiscores')
    .setDescription('Searches user on the hiscores')
    .addStringOption(option =>
        option.setName('username')
            .setDescription('The username to lookup.')
            .setRequired(true)),

    async execute(interaction) {
        await interaction.deferReply();
        const input = interaction.options.getString('username');
        const hiscoreData = await Hiscores.fetch(input);
        if (!hiscoreData) {
            await interaction.reply(`No username matching ${input} found!`);
            return;
        }

        const userEmbed = new EmbedBuilder(hiscoreData)
        .setColor(0x0099FF)
        .setTitle(hiscoreData.username)
        // .setURL(itemData.wiki_url)
        // .setAuthor({ name: 'From oldschooljs', iconURL: 'https://i.imgur.com/KpaqfmQ.png', url: 'https://github.com/oldschoolgg/oldschooljs' })
        .setDescription(`Hiscores for ${hiscoreData.username}, currently ${hiscoreData.skills.overall.rank} rank overall!`)
        .setThumbnail('https://oldschool.runescape.wiki/images/Old_School_RuneScape_client_icon_%28Windows%29.png?83ac0')
        .setTimestamp();
        for (const [skill, values] of Object.entries(hiscoreData.skills)) {
            if (values.rank <= 0) {
                continue;
            };
            userEmbed.addFields(
                { name: skill, value: `level: ${values.level.toString()}, xp: ${values.xp.toString()}, rank: ${values.rank.toString()}`, inline: true },
            );
        }
        await interaction.editReply({ embeds: [userEmbed] });
    },
    // async execute(interaction) {
    //     await interaction.deferReply();
    //     const input = interaction.options.getString('username');
    //     const hiscoreData = await Hiscores.fetch(input);
    //     if (!hiscoreData) {
    //         await interaction.reply(`No username matching ${input} found!`);
    //         return;
    //     }

    //     const userEmbed = new EmbedBuilder(hiscoreData)
    //     .setColor(0x0099FF)
    //     .setTitle(hiscoreData.username)
    //     .setDescription(`Hiscores for ${hiscoreData.username}, currently ${hiscoreData.skills.overall.rank} rank overall!`)
    //     .setThumbnail('https://oldschool.runescape.wiki/images/Old_School_RuneScape_client_icon_%28Windows%29.png?83ac0')
    //     .setTimestamp();
    //     for (const [minigame, values] of Object.entries(hiscoreData.minigames)) {
    //         if (values.rank <= 0) {
    //             continue;
    //         };
    //         userEmbed.addFields(
    //             { name: minigame, value: `score: ${values.score.toString()}, rank: ${values.rank.toString()}`, inline: true },
    //         );
    //     }
    //     for (const [clue, values] of Object.entries(hiscoreData.clues)) {
    //         if (values.rank <= 0) {
    //             continue;
    //         };
    //         userEmbed.addFields(
    //             { name: clue, value: `score: ${values.score.toString()}, rank: ${values.rank.toString()}`, inline: true },
    //         );
    //     }
    //     await interaction.editReply({ embeds: [userEmbed] });
    // }
};