const Discord = require("discord.js")
const config = require("../../Json/config.json")
const db = require("fera.db")
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("para")
        .setDescription("Para ile ilgili komutlar.")
        .setDMPermission(false)
        .addSubcommand(subcommand =>
            subcommand
                .setName('bilgi')
                .setDescription('Para bilgini gösterir.')
                .addUserOption(z => z.setName("etiket").setDescription("Parasına bakmak istediğin kullanıcıyı etiketle.")))
        .addSubcommand(subcommand =>
            subcommand
                .setName('çek')
                .setDescription('Bankadan para çeker.')
                .addIntegerOption(z => z.setName("miktar").setDescription("Bankadan çekmek istediğin miktarı gir.").setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('yatır')
                .setDescription('Bankaya para yatırır.')
                .addIntegerOption(z => z.setName("miktar").setDescription("Bankaya yatırmak istediğin miktarı gir.").setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('gönder')
                .setDescription('Para göndermeni sağlar.')
                .addUserOption(z => z.setName("etiket").setDescription("Para göndermek istediğin kişi seç.").setRequired(true))
                .addIntegerOption(z => z.setName("miktar").setDescription("Gönderceğin para miktarını gir.").setRequired(true)))
        , 
    run: async (client, interaction) => {
        if (interaction.options.getSubcommand() === "bilgi") {
            let user = interaction.options.getUser("etiket") || interaction.user
            let para = db.fetch(`cuzdan.${user.id}`) ? db.fetch(`cuzdan.${user.id}`) : 0;
            let banka = db.fetch(`banka.${user.id}`) ? db.fetch(`banka.${user.id}`) : 0;
            const emb = new Discord.EmbedBuilder()
            .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({dynamic: true})}`})
            .setFooter({ text: `${config.Footer}`, iconURL: `${user.avatarURL({dynamic: true}) ? user.avatarURL({dynamic: true}) : client.user.avatarURL({dynamic: true})}`})
            .setColor("00ff00")
            .setThumbnail(`${client.user.avatarURL({dynamic: true})}`)
            .setDescription(`**${user} Adlı Kullanıcının Bakiyesi:**`)
            .addFields(
                { name: ':purse: Cüzdan', value: `${para}HŁ`, inline: true},
                { name: ':bank: Banka', value: `${banka}HŁ`, inline: true},
                { name: ':moneybag: Toplam Bakiye', value: `${para + banka}HŁ`, inline: true},
            );
            interaction.reply({embeds: [emb]})
        } else if (interaction.options.getSubcommand() === "çek") {
            let miktar = interaction.options.getInteger("miktar")
            if (!miktar) {
                return interaction.reply({
                    content: "Gönderilecek miktarı girmelisin!",
                    ephemeral: true,
                });
            }
            if (miktar < 1) {
                return interaction.reply({
                    content: "Gönderilecek miktarı düzgün girmelisin!",
                    ephemeral: true,
                });
            }
            let bankan = db.fetch(`banka.${interaction.user.id}`) ? db.fetch(`banka.${interaction.user.id}`) : 0;
            if (bankan < miktar) {
                return interaction.reply({
                    content: "Bankada o kadar paran bulunmamakta.",
                    ephemeral: true,
                });
            }
            db.add(`cuzdan.${interaction.user.id}`, miktar)
            db.subtract(`banka.${interaction.user.id}`, miktar)
            const emb = new Discord.EmbedBuilder()
            .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({dynamic: true})}`})
            .setFooter({ text: `${config.Footer}`, iconURL: `${interaction.user.avatarURL({dynamic: true}) ? interaction.user.avatarURL({dynamic: true}) : client.user.avatarURL({dynamic: true})}`})
            .setDescription(`Bankadan ${miktar}HŁ miktar çekildi.`)
            .setColor("00ff00")
            interaction.reply({embeds: [emb]})
        } else if (interaction.options.getSubcommand() === "yatır") {
            let miktar = interaction.options.getInteger("miktar")
            if (!miktar) {
                return interaction.reply({
                    content: "Gönderilecek miktarı girmelisin!",
                    ephemeral: true,
                });
            }
            if (miktar < 1) {
                return interaction.reply({
                    content: "Gönderilecek miktarı düzgün girmelisin!",
                    ephemeral: true,
                });
            }
            let paran = db.fetch(`cuzdan.${interaction.user.id}`) ? db.fetch(`cuzdan.${interaction.user.id}`) : 0;
            if (paran < miktar) {
                return interaction.reply({
                    content: "O kadar nakit paran bulunmamakta.",
                    ephemeral: true,
                });
            }
            db.subtract(`cuzdan.${interaction.user.id}`, miktar)
            db.add(`banka.${interaction.user.id}`, miktar)
            const emb = new Discord.EmbedBuilder()
            .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({dynamic: true})}`})
            .setFooter({ text: `${config.Footer}`, iconURL: `${interaction.user.avatarURL({dynamic: true}) ? interaction.user.avatarURL({dynamic: true}) : client.user.avatarURL({dynamic: true})}`})
            .setColor("00ff00")
            .setDescription(`Bankaya ${miktar}HŁ miktar yatırıldı.`)
            interaction.reply({embeds: [emb]})
        } else if (interaction.options.getSubcommand() === "gönder") {
            let user = interaction.options.getUser("etiket")
            if (user.id === interaction.user.id) {
                return interaction.reply({
                    content: "Kendine para gönderemezsin!",
                    ephemeral: true,
                });
            }
            let miktar = interaction.options.getInteger("miktar")
            if (!miktar) {
                return interaction.reply({
                    content: "Gönderilecek miktarı girmelisin!",
                    ephemeral: true,
                });
            }
            if (miktar < 1) {
                return interaction.reply({
                    content: "Gönderilecek miktarı düzgün girmelisin!",
                    ephemeral: true,
                });
            }
            let paran = db.fetch(`cuzdan.${interaction.user.id}`) ? db.fetch(`cuzdan.${interaction.user.id}`) : 0;
            if (paran < miktar) {
                return interaction.reply({
                    content: "O kadar nakit paran bulunmamakta.",
                    ephemeral: true,
                });
            }
            db.subtract(`cuzdan.${interaction.user.id}`, miktar)
            db.add(`cuzdan.${user.id}`, miktar)
            const emb = new Discord.EmbedBuilder()
            .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({dynamic: true})}`})
            .setFooter({ text: `${config.Footer}`, iconURL: `${interaction.user.avatarURL({dynamic: true}) ? interaction.user.avatarURL({dynamic: true}) : client.user.avatarURL({dynamic: true})}`})
            .setColor("00ff00")
            .setDescription(`${user}, adlı kullanıcıya ${miktar} para gönderdin.`)
            interaction.reply({embeds: [emb]})
        }
    }
}