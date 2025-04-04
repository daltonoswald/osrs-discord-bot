const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { Wiki } = require('oldschooljs');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('wiki')
    .setDescription('Returns five links to the OSRS Wiki.')
    .addStringOption(option =>
        option.setName('search')
            .setDescription('The search term to lookup.')
            .setRequired(true)),

    async execute(interaction) {
        const input = interaction.options.getString('search');
        const wikiData = await Wiki.search(input);
        if (!wikiData) {
            await interaction.reply(`No results matching ${input} found!`);
            return;
        }

        const wikiEmbed = new EmbedBuilder(wikiData)
        .setColor(0x0099FF)
        .setTitle(`Results for ${input}`)
        // .setURL(itemData.wiki_url)
        .setAuthor({ name: 'OSRS Wiki Links', iconURL: 'https://i.imgur.com/KpaqfmQ.png', url: 'https://oldschool.runescape.wiki/' })
        // .setDescription(itemData.examine)
        .setThumbnail(wikiData[0].image)
        .addFields(
            { name: '\u200B', value: '\u200B' },
        )
        .setTimestamp();
        // .addFields({ name: 'Wiki', value:`[Open wiki link](${wikiDataurl})` });
        for (const [link, values] of Object.entries(wikiData)) {
            wikiEmbed.addFields(
                { name: values.title, value: `[${values.title}](${values.url})`, inline: true },
            );
        }
        await interaction.reply({ embeds: [wikiEmbed] });
    },
};