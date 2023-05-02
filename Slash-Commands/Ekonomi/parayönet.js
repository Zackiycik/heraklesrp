const Discord = require("discord.js")
const config = require("../../Json/config.json")
const db = require("fera.db")
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("parayönet")
        .setDescription("Etiketlenen kullanıcının veya bir rolün parasını yönetir.")
        .setDMPermission(false)
        .setDefaultMemberPermissions(Discord.PermissionFlagsBits.Administrator)
        .addSubcommand(subcommand =>
            subcommand
                .setName('üye')
                .setDescription('Etiketlenen kullanıcının parasını yönetir.')
                .addUserOption(z => z.setName("etiket").setDescription("Parası yönetilcek kişiyi etiketle.").setRequired(true))
                .addStringOption(z => z.setName("işlem").setDescription("Yönetme işleminin türünü seçiniz.").setRequired(true).addChoices({name:"Ekle", value:"ekle"},  {name:"Çıkar", value:"çıkar"}))
                .addIntegerOption(z => z.setName("miktar").setDescription("Yönetilcek miktarı girmelisin.").setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('rol')
                .setDescription('Etiketlenen kullanıcının parasını yönetir.')
                .addRoleOption(option => option.setName("rol").setDescription("Bir rolü etiketle.").setRequired(true))
                .addIntegerOption(option => option.setName("miktar").setDescription("Yatırılacak miktar.").setRequired(true)))
        , 
    run: async (client, interaction) => {
        if (interaction.options.getSubcommand() === "üye") {
            let user = interaction.options.getUser("etiket")
            let islem = interaction.options.getString("işlem")
            let miktar = interaction.options.getInteger("miktar")
            if (!user) {
                return interaction.reply({
                    content: "Birini etiketlemelisin!",
                    ephemeral: true,
                });
            }
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
            if (islem === "ekle") {
                db.add(`banka.${user.id}`, miktar)
                const emb = new Discord.EmbedBuilder()
                .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({dynamic: true})}`})
                .setFooter({ text: `${config.Footer}`, iconURL: `${user.avatarURL({dynamic: true}) ? user.avatarURL({dynamic: true}) : client.user.avatarURL({dynamic: true})}`})
                .setColor("00ff00")
                .setThumbnail(`${client.user.avatarURL({dynamic: true})}`)
                .setDescription(`${user}, adlı kullanıcıya ${interaction.user} tarafından ${miktar} para eklendi!`)
                interaction.reply({embeds: [emb]})
            } else if ( islem === "çıkar") {
                db.subtract(`banka.${user.id}`, miktar)
                const emb = new Discord.EmbedBuilder()
                .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({dynamic: true})}`})
                .setFooter({ text: `${config.Footer}`, iconURL: `${user.avatarURL({dynamic: true}) ? user.avatarURL({dynamic: true}) : client.user.avatarURL({dynamic: true})}`})
                .setColor("00ff00")
                .setThumbnail(`${client.user.avatarURL({dynamic: true})}`)
                .setDescription(`${interaction.user} tarafından ${user} adlı kullanıcının ${miktar} kadar parası çıkarıldı.`)
                interaction.reply({embeds: [emb]})
            } else return interaction.reply({content: "Hata aldım."})
        } else if (interaction.options.getSubcommand() === "rol") {
            let rol = interaction.options.getRole("rol");
            if (!rol) {
                return interaction.reply({
                    content: "Birini etiketlemelisin!",
                    ephemeral: true,
                });
            }
            let miktar = interaction.options.getInteger("miktar");
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
            interaction.guild.members.cache.forEach(user => {
                if (user.roles.cache.has(rol.id)) {
                    db.add(`banka.${user.id}`, miktar)
                }
            })
            const embed = new Discord.EmbedBuilder()
            .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({dynamic: true})}`})
            .setFooter({ text: `${config.Footer}`, iconURL: `${interaction.user.avatarURL({dynamic: true}) ? interaction.user.avatarURL({dynamic: true}) : client.user.avatarURL({dynamic: true})}`})
            .setColor("00ff00")
            .setDescription(`<@&${rol.id}> adlı role sahip herkese para yatırıldı!`)
            interaction.reply({embeds: [embed]})
        }
    }
}