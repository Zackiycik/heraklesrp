const Discord = require("discord.js")
const config = require("../../Json/config.json")
const db = require("fera.db")
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("kur")
        .setDescription("Kur ile ilgili komutlar.")
        .setDMPermission(false)
        .addSubcommand(subcommand =>
            subcommand
                .setName('bilgi')
                .setDescription('Kur bilgilerini gösterir.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('al')
                .setDescription('Kur satın alır.')
                .setRequired(true)
                .addChoices(
                    { name: 'Euro', value: 'euro' },
                    { name: 'Pound', value: 'pound' },
                    { name: 'Japon Yeni', value: 'yen' },
                    { name: 'Çin Yuanı', value: 'yuan' },
                    { name: 'Türk Lirası', value: 'lira' },
                    { name: 'Rus Rublesi', value: 'ruble' },
                    { name: 'ONS Altın', value: 'altın' },
                    { name: 'Dolar Endeksi', value: 'endeksi' }
                )
                .addIntegerOption(z => z.setName("miktar").setDescription("Alınacak kur miktarını giriniz.").setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('sat')
                .setDescription('Aldığın kurlardan satış yapar.')
                .setRequired(true)
                .addChoices(
                    { name: 'Euro', value: 'euro' },
                    { name: 'Pound', value: 'pound' },
                    { name: 'Japon Yeni', value: 'yen' },
                    { name: 'Çin Yuanı', value: 'yuan' },
                    { name: 'Türk Lirası', value: 'lira' },
                    { name: 'Rus Rublesi', value: 'ruble' },
                    { name: 'ONS Altın', value: 'altın' },
                    { name: 'Dolar Endeksi', value: 'endeksi' }
                )
                .addIntegerOption(z => z.setName("miktar").setDescription("Satılacak kur miktarını yazınız.").setRequired(true))))
        , 
    run: async (client, interaction) => {
        if (interaction.options.getSubcommand() === "bilgi") {
            
        } else if (interaction.options.getSubcommand() === "al") {
            
        } else if (interaction.options.getSubcommand() === "sat") {
            
        }
    }
}