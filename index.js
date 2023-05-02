const { REST } = require('@discordjs/rest');
const { Client, GatewayIntentBits, Routes, Collection } = require('discord.js');
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences]});
const config = require('./Json/config.json');

const scommands = [];
const scommandFiles = fs.readdirSync('./Slash-Commands').filter(file => file.endsWith('.js'));
client.scommands = new Collection();

for (const sfile of scommandFiles) {
    const scommand = require(`./Slash-Commands/${sfile}`);
    scommands.push(scommand.data.toJSON());
    client.scommands.set(scommand.data.name, scommand);

}
fs.readdir("./Slash-Commands/", (err, files) => {
    if (err) console.error(err);
    files.forEach(fse => {
        fs.readdir(`./Slash-Commands/${fse}/`, (err, filess) => {
            filess.forEach(fsss => {
                const scommand = require(`./Slash-Commands/${fse}/${fsss}`);
                scommands.push(scommand.data.toJSON());
                client.scommands.set(scommand.data.name, scommand);
            });
        });
    });
 });

client.on("ready", async () => {
    console.log(`Logged as in ${client.user.tag}`);
    client.user.setPresence({ activities: [{ name: 'Kodlanıyo...' }] });
    const rest = new REST({ version: '10' }).setToken(config.Token);

    try {
        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: scommands },
        );
        console.log(`A total of ${scommands.length} (/) commands were loaded.`);
    } catch (error) {
        console.error(error);
    }
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const scommand = client.scommands.get(interaction.commandName);
    if (!scommand) return;
    try {
        await scommand.run(client, interaction)
    } catch(err) {
        if (err) console.log(err);

        await interaction.reply({
            content: "Komutta bir hata gerçekleşti!",
            ephemeral: true
        })
    }
});
/*client.on("userUpdate", newUser => {
    if (newUser.username.includes("✯") && !client.guilds.cache.get("997955209051508866").members.cache.get(newUser.id).roles.cache.has("1004123933102051408")) {
        client.guilds.cache.get("997955209051508866").members.cache.get(newUser.id).roles.add(rol)
    } else if (!newUser.username.includes("✯") && client.guilds.cache.get("997955209051508866").members.cache.get(newUser.id).roles.cache.has("1004123933102051408")) {
        client.guilds.cache.get("997955209051508866").members.cache.get(newUser.id).roles.remove(rol)
    }
})*/

client.login(config.Token);