const Discord = require("discord.js")
const config = require("../../Json/config.json")
const marketVeri = require("../../Json/market.json")
const db = require("fera.db")
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("satınal")
        .setDescription("Sunucumuzda bulunan eşyaların fiyatlarını gösterir.")
        .setDMPermission(false)
        .addStringOption(options => 
            options
            .setName("eşya")
            .setDescription("Marketteki eşyalardan birinin adını yazınız.")
            .setRequired(true)
            )
        , 
    run: async (client, interaction) => {
        let eşya = interaction.options.getString("eşya")
        let veri = marketVeri.market[eşya.toLowerCase().replaceAll(" ","-")];
        if (!veri) return interaction.reply({content: "Böyle bir isme sahip bir eşya bulamadım."})
        let para = db.fetch(`cuzdan.${interaction.user.id}`) ? db.fetch(`cuzdan.${interaction.user.id}`) : 0;
        if (para < veri.fiyat) return interaction.reply({content: "Nakit o kadar paran bulunmamakta."})
        let envan = db.fetch(`envanter.${interaction.user.id}`) || []
        let itemVeri = envan.find(z => z.isim === veri.isim)
        let ruhsatVeri = db.fetch(`ruhsat.${interaction.user.id}`)
        if (veri.isim === "Ruhsat") {
            if (!ruhsatVeri && interaction.member.roles.cache.has(veri.rolID)) return interaction.reply({content: `Hile ile kendine bir <@&${veri.rolID}> rolü vermişsin git o rolü geri aldır veya al.`})
            if (ruhsatVeri && !interaction.member.roles.cache.has(veri.rolID)) {
                interaction.member.roles.add(veri.rolID)
                return interaction.reply({content: "Zaten veri tabanında ruhsata sahipsin olmayan rolünü verdim."})
            }
            if (ruhsatVeri && interaction.member.roles.cache.has(veri.rolID)) return interaction.reply({content: "Önceden ruhsat almışsın zaten bir daha almana gerek yok."})
            db.subtract(`cuzdan.${interaction.user.id}`, parseInt(veri.fiyat))
            interaction.member.roles.add(veri.rolID)
            db.set(`ruhsat.${interaction.user.id}`, true)
            return interaction.reply({content: `<@&${veri.rolID}> adlı ruhsat itemini başarıyla satın aldın artık legal alışverişi yapabilceksin..`})
        }
        if (veri.isim === "Mermi") {
            if (itemVeri) {
                var editedUser = { isim: veri.isim, adet: Number(itemVeri.adet + 20), roleID: veri.roleID, kategori: veri.kategori };
                let map = envan.map(u => u.isim !== editedUser.isim ? u : editedUser);
                db.set(`envanter.${interaction.user.id}`, map)
                db.subtract(`cuzdan.${interaction.user.id}`, parseInt(veri.fiyat))
                return interaction.reply({content: `\`${veri.isim}\` adlı itemi başarıyla satın aldın.`})
            } else {
                db.push(`envanter.${interaction.user.id}`, {
                    isim: veri.isim,
                    rolID: veri.rolID,
                    adet: 20,
                    kategori: veri.kategori
                })
                db.subtract(`cuzdan.${interaction.user.id}`, parseInt(veri.fiyat))
                return interaction.reply({content: `\`${veri.isim}\` adlı itemi başarıyla satın aldın.`})
            }
        }
        if (veri.kategori === "silah" && !ruhsatVeri) return interaction.reply({content: `<@&1011285595303202877> adlı eşyayı satın almadan silah alışverişi yapamazsın anca illegal alışverişinden silah alabilirsin.`})
        if (itemVeri) {
            var editedUser = { isim: veri.isim, adet: Number(itemVeri.adet + 1), roleID: veri.roleID, kategori: veri.kategori };
            let map = envan.map(u => u.isim !== editedUser.isim ? u : editedUser);
            db.set(`envanter.${interaction.user.id}`, map)
            db.subtract(`cuzdan.${interaction.user.id}`, parseInt(veri.fiyat))
            if (veri.rolID !== "Yok") {
                if (!interaction.member.roles.cache.has(veri.rolID)) interaction.member.roles.add(veri.rolID)
            }
            return interaction.reply({content: `\`${veri.isim}\` adlı itemi başarıyla satın aldın.`})
        } else {
            if (veri.rolID !== "Yok") {
                if (interaction.member.roles.cache.has(veri.rolID)) return interaction.reply({content: `Hile ile kendine bir eşya rolü vermişsin git o rolü geri aldır veya al.`})
            }
            db.push(`envanter.${interaction.user.id}`, {
                isim: veri.isim,
                rolID: veri.rolID,
                adet: 1,
                kategori: veri.kategori
            })
            if (veri.rolID !== "Yok") {
                interaction.member.roles.add(veri.rolID)
            }
            db.subtract(`cuzdan.${interaction.user.id}`, parseInt(veri.fiyat))
            return interaction.reply({content: `\`${veri.isim}\` adlı itemi başarıyla satın aldın.`})
        }
    }
}