const { EmbedBuilder, SlashCommandBuilder, bold } = require('discord.js');
const { Hiscores } = require('oldschooljs');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('bosses-hs')
    .setDescription('Searches a user\'s boss kill count on the hiscores')
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
        .setDescription(`Hiscores for ${hiscoreData.username}`)
        .setThumbnail('https://oldschool.runescape.wiki/images/Old_School_RuneScape_client_icon_%28Windows%29.png?83ac0')
        .setTimestamp();
        for (const [boss, values] of Object.entries(hiscoreData.bossRecords)) {
            if (values.rank <= 0) {
                continue;
            };
            userEmbed.addFields(
                // { name: skill, value: `level: ${values.level.toString()}, xp: ${values.xp.toString()}, rank: ${values.rank.toString()}`, inline: true },
                { name: boss, value: `${bold('Killcount')}: ${values.score.toString()} ${bold('rank')}: ${values.rank.toString()}`, inline: true },
            );
        }
        await interaction.editReply({ embeds: [userEmbed] });
    },
};