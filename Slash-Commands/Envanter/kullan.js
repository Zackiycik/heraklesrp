const Discord = require("discord.js")
const config = require("../../Json/config.json")
const marketVeri = require("../../Json/market.json")
const db = require("fera.db")
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("kullan")
        .setDescription("Ürünlerden bazılarını kullanmak için kullanılır.")
        .setDMPermission(false)
        .addStringOption(z => z.setName("eşya").setDescription("Kullanmak istediğiniz eşyayı kullanın."))
        , 
    run: async (client, interaction) => {
        let eşya = interaction.options.getString("eşya");
        let inv = db.fetch(`envanter.${interaction.user.id}`) || [];
        let gıdalar = [];
        inv.forEach((item) => {
            if(item.kategori == "araba" || item.kategori == "ev" || item.kategori == "motor" || item.kategori == "telefon" || item.kategori == "silah" || item.kategori == "mermi" || item.kategori == "illegal" || item.kategori == "gemi") return;
            gıdalar.push(item)
        });
        if(gıdalar.length == 0) return interaction.reply({content: "Kullanılcak hiç bir eşya yok."})
        if(!eşya){
            let liste = "```Bir Ürün Belirtmelisin!```\n";
            gıdalar.forEach((item) => {
                if(item.adet <= 0) return;
                liste += `**${item.isim}:** \`${item.adet}\`\n`;
            });
            const emb = new Discord.EmbedBuilder()
            .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({dynamic: true})}`})
            .setFooter({ text: `${config.Footer}`, iconURL: `${interaction.user.avatarURL({dynamic: true}) ? interaction.user.avatarURL({dynamic: true}) : client.user.avatarURL({dynamic: true})}`})
            .setThumbnail(`${client.user.avatarURL({dynamic: true})}`)
            .setColor("00ff00")
            .setTitle(`__${interaction.user.username} Kullanabilceğin Eşyalar__`)
            .setDescription(liste);
            interaction.reply({embeds: [emb]})
        }else{
            let liste = "```Bir Ürün Belirtmelisin!```\n";
            gıdalar.forEach((item) => {
                if(item.adet <= 0) return;
                liste += `**${item.isim}:** \`${item.adet}\`\n`;
            });
            const emb = new Discord.EmbedBuilder()
            .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({dynamic: true})}`})
            .setFooter({ text: `${config.Footer}`, iconURL: `${interaction.user.avatarURL({dynamic: true}) ? interaction.user.avatarURL({dynamic: true}) : client.user.avatarURL({dynamic: true})}`})
            .setThumbnail(`${client.user.avatarURL({dynamic: true})}`)
            .setColor("00ff00")
            .setTitle(`__${interaction.user.username} Kullanabilceğin Eşyalar__`)
            .setDescription(liste);
            let veri = marketVeri.market[eşya.toLowerCase().replaceAll(" ", "-")];
            if(!veri) return interaction.reply({embeds: [emb]})
            let urun = gıdalar.find(a => a.isim === veri.isim);
            if(!urun) return interaction.reply({embeds: [emb]})
            if(urun.adet <= 0) return interaction.reply({embeds: [emb]})
            var editedUser = { isim: veri.isim, adet: Number(urun.adet - 1), roleID: veri.roleID, kategori: veri.kategori };
            let map = inv.map(u => u.isim !== editedUser.isim ? u : editedUser);
            db.set(`envanter.${interaction.user.id}`, map)
            let msga = "";
            if (eşya.toLowerCase() === "sigara") msga += "Cebinden sigarayı çıkarıp ucunu yaktıktan sonra içmeye başladı."
            if (eşya.toLowerCase() !== "sigara") msga += `${urun.isim} adlı içkiyi kullanmaya başladın.`
            return interaction.reply({content: `***${msga}***`})
        }
    }
}