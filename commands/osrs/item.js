const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { Items } = require('oldschooljs');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('items')
    .setDescription('Searches an item.')
    .addStringOption(option =>
        option.setName('item_name')
            .setDescription('The item to lookup.')
            .setRequired(true)),

    async execute(interaction) {
        const input = interaction.options.getString('item_name');
        const itemData = Items.get(input);
        if (!itemData) {
            await interaction.reply(`No items matching ${input} found!`);
            return;
        }

        const itemEmbed = new EmbedBuilder(itemData)
        .setColor(0x0099FF)
        .setTitle(itemData.name)
        .setURL(itemData.wiki_url)
        .setAuthor({ name: 'From oldschooljs', iconURL: 'https://i.imgur.com/KpaqfmQ.png', url: 'https://github.com/oldschoolgg/oldschooljs' })
        .setDescription(itemData.examine)
        .setThumbnail(`https://oldschool.runescape.wiki/images/${itemData.name.replace(/ /g, '_')}.png`)
        .addFields(
            // { name: 'Regular field title', value: 'Some value here' },
            { name: '\u200B', value: '\u200B' },
            { name: 'Grand Exchange Value', value: itemData.price.toString(), inline: true },
            { name: 'High Alch Value', value: itemData.highalch.toString(), inline: true },
        )
        // .setImage('https://i.imgur.com/Affp7pu.png')
        .setTimestamp()
        .addFields({ name: 'Wiki', value:`[Open wiki link](${itemData.wiki_url})` });
        await interaction.reply({ embeds: [itemEmbed] });
    },
};