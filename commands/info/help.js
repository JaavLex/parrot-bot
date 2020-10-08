const { MessageEmbed } = require('discord.js');
const { prefix } = require('../../config.json');

function getAllCommands(client, message) {
  const embed = new MessageEmbed()
    .setColor('#32CD32')
    .setTitle('**Command list :**')
    .addField(
      `To know usage of one command use \`${prefix}/help\` <command> 😁`,
    )
    .setThumbnail(
      'https://i2.wp.com/thesecuritynoob.com/wp-content/uploads/2020/02/632px-Parrot_Logo.png?fit=632%2C599&ssl=1',
    )
    .setTimestamp();

  function commandsListToString(category) {
    const commandsByCategory = client.commands
      .filter(command => command.category === category)
      .map(c => c.name);

    if (!commandsByCategory.length) {
      return '⚠️ no command with this category';
    }

    return '```css\n' + commandsByCategory.join(' | ') + '\n```';
  }

  client.categories.map(category => {
    embed.addField(
      '> ' + category.toUpperCase() || '-',
      commandsListToString(category) || '-',
    );
  });

  message.channel.send(embed);
}

// function getSingleCommand(client, message, input) {
//   const embed = new MessageEmbed();

//   const cmd =
//     client.commands.get(input.toLowerCase()) ||
//     client.commands.get(client.aliases.get(input.toLowerCase()));

//   let info = `No info for command : **${input.toLowerCase()}**`;

//   if (!cmd) {
//     return message.channel.send(embed.setColor('RED').setDescription(info));
//   }

//   if (cmd.name) info = `**Command name**: ${cmd.name}`;
//   if (cmd.aliases)
//     info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(', ')}`;
//   if (cmd.description) info += `\n**Description**: ${cmd.description}`;
//   if (cmd.usage) {
//     info += `\n**Usage**: ${cmd.usage}`;
//     embed.setFooter(`Syntax: <> = required, [] = optional`);
//   }

//   return message.channel.send(embed.setColor('GREEN').setDescription(info));
// }

async function run(client, message, args) {
  if (args[0]) {
    getSingleCommand(client, message, args[0]);
  } else {
    getAllCommands(client, message);
  }
}

const helpCommand = {
  name: 'help',
  aliases: ['h'],
  category: 'info',
  description: 'Gives a list of all the commands',
  usage: '[command | alias]',
  run,
};

module.exports = helpCommand;
