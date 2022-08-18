const { Routes } = require('discord.js')
const { REST } = require('@discordjs/rest')
const discord = require("discord.js");
const client = new discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: 32767,
    disableMentions: 'everyone',
});
const db = require("better-sqlite3");
const database = new db("Userinfo.sqlite");
const token = "SIKE";

const commands = [
  {
    "name": "post",
    "description": "Post a post",
    "options": [
      {
        "type": 3,
        "name": "link",
        "description": "Link to the post",
        "required": true
      }
    ]
  },
  {
    "name": "postinfo",
    "description": "Get post information of a user",
    "options": [
      {
        "type": 6,
        "name": "user",
        "description": "User ",
        "required": true
      }
    ]
  }
]

database.exec("CREATE TABLE IF NOT EXISTS `posts` (`user` varchar(255) NOT NULL, `link` varchar(255) NOT NULL)");

client.on("ready", () => {
    const rest = new REST({ version: '10' }).setToken(token)
    rest.put(Routes.applicationCommands('1009491992142688307', '1002311893014286446'), {body: commands})
            .then(() => console.log("asi er sej"))
            .catch(console.error)
    console.log("Frackz er tyk.")
})

client.on("interactionCreate", (interation) => {
    if (!interation.isCommand()) return;
    if (interation.guildId == null) return interation.reply("No channel");
    if (interation.commandName == "post") {
      const link = interation.options.getString("link")
      
      const data = database.prepare("SELECT * FROM `posts` WHERE `link` = ?").get(link)
      if (data != null) {return interation.reply("Post has already been claimed by user <@"+data.user+">")}


      database.prepare("INSERT INTO `posts` (`user`, `link`) VALUES (?, ?)").run(interation.user.id, link)

      const allPosts = database.prepare("SELECT * FROM `posts` WHERE `user` = ?").all(interation.user.id)
      return interation.reply({embeds:[
        {
          "title": "POST",
          "description": "You have posted a link and now have\n"+allPosts.length+" post(s)\n\n"+link,
          "color": 65300
        }
      ]})
    } else if (interation.commandName == "postinfo") {

      const target = interation.options.getUser('user')

      const allPosts = database.prepare("SELECT * FROM `posts` WHERE `user` = ?").all(target.id)

      var posts = '\n'

      allPosts.forEach(e => {
        posts=posts+e.link+'\n'
      })

      return interation.reply('All posts of user <@'+target.id+'>:```'+posts+'```')
    }
  }
)


client.login(token)