const Discord = require("discord.js")
const config = require("../../Json/config.json")
const marketVeri = require("../../Json/market.json")
const db = require("fera.db")
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("vur")
        .setDescription("Etiketlenen kullanıcıya saldırı yapmanızı sağlar.")
        .setDMPermission(false)
        .addUserOption(z => z.setName("etiket").setDescription("Saldırmak istediğiniz kişiyi etiketleyin.").setRequired(true))
        , 
    run: async (client, interaction) => {
        let user = interaction.options.getUser("etiket");
        let array = [
            {bölge: "Gövde", hasar: 30},
            {bölge: "Sol Kol", hasar: 20},
            {bölge: "Sağ Kol", hasar: 20},
            {bölge: "Sol Bacak", hasar: 20},
            {bölge: "Sağ Bacak", hasar: 20},
            {bölge: "Sol El", hasar: 10},
            {bölge: "Sağ El", hasar: 10},
            {bölge: "Sol Ayak", hasar: 10},
            {bölge: "Sağ Ayak", hasar: 10}
        ]
        let randomHasar = array[Math.floor(Math.random() * array.length)]
        let envan = db.fetch(`envanter.${interaction.user.id}`) || [];
        let sar = envan.find(z => z.isim.toLowerCase().replaceAll(" ", "-") === marketVeri.market["sar-9-cx"].isim.toLowerCase().replaceAll(" ", "-"))
        let glock = envan.find(z => z.isim.toLowerCase().replaceAll(" ", "-") === marketVeri.market["glock-19"].isim.toLowerCase().replaceAll(" ", "-"))
        let mermi = envan.find(z => z.isim.toLowerCase().replaceAll(" ", "-") === marketVeri.market.mermi.isim.toLowerCase().replaceAll(" ", "-"))
        let ilkDurum = db.fetch(`sağlık.${user.id}`) ? db.fetch(`sağlık.${user.id}`) : 0;
        if (ilkDurum < 1) return interaction.reply({content: "Etiketlediğin kullanıcıya saldıramazsın çünkü o kullanıcının canı yok."})
        if (!sar && !glock) return interaction.reply({content: "Etiketlediğin kullanıcıya saldırmak için silahın yok."})
        if (!mermi) return interaction.reply({content: "Ateş etmek için yeterli mermin bulunmamaktadır."})
        if (mermi.adet < 1) return interaction.reply({content: "Ateş etmek için yeterli mermin bulunmamaktadır."})
        var editedUser = { isim: mermi.isim, adet: Number(mermi.adet - 1), roleID: mermi.roleID, kategori: mermi.kategori };
        let map = envan.map(u => u.isim !== editedUser.isim ? u : editedUser);
        db.set(`envanter.${interaction.user.id}`, map)
        let sonDurum = db.subtract(`sağlık.${user.id}`, parseInt(randomHasar.hasar))
        if (sonDurum < 0) db.set(`sağlık.${user.id}`, 0)
        let durum = db.fetch(`sağlık.${user.id}`) ? db.fetch(`sağlık.${user.id}`) : 0;
        const emb = new Discord.EmbedBuilder()
        .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({dynamic: true})}`})
        .setFooter({ text: `${config.Footer}`, iconURL: `${interaction.user.avatarURL({dynamic: true}) ? interaction.user.avatarURL({dynamic: true}) : client.user.avatarURL({dynamic: true})}`})
        .setThumbnail(`${client.user.avatarURL({dynamic: true})}`)
        .setColor("00ff00")
        .setDescription(`${interaction.user} adlı kullanıcı ${user} adlı kullanıcıya saldırdı.\n\n**Saldırı Bilgileri:**\`\`\`Vurulan Bölge: ${randomHasar.bölge}\nVurulan Hasar: ${randomHasar.hasar}\`\`\`\n**Saldırılan Bilgileri:**\`\`\`Sağlık: ${durum}\`\`\``)
        interaction.reply({embeds: [emb]})
    }
}