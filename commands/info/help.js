const {
  MessageEmbed
} = require('discord.js');
const {
  prefix
} = require('../../config.json');
const emojiObject = require('./messageHandler.json');

function getAllCommands(client, message) {
  const embed = new MessageEmbed()
    .setColor('#32CD32')
    .setTitle('**📖 Command list :**')
    .setDescription(
      `To know usage of one command use \`${prefix}help\` <command> 😉`,
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
      `> ${emojiObject[category]} ${category.toUpperCase()} `,
      commandsListToString(category) || '-',
    );
  });

  message.channel.send(embed);
}

function getSingleCommand(client, message, input) {
  const embed = new MessageEmbed();

  const command =
    client.commands.get(input.toLowerCase()) ||
    client.commands.get(client.aliases.get(input.toLowerCase()));

  let info = `No info for command : **${input.toLowerCase()}**`;

  if (!command) {
    const errorMessage = message.channel.send(
      embed.setColor('RED').setDescription(info),
    );
    setTimeout(() => errorMessage.destroy(), 2000);
    return;
  }

  if (command.name) {
    embed.addField('📞 Name', '```css\n' + command.name + '\n```');
  }

  // if (command.aliases)
  //   info += `\n**Aliases**: ${command.aliases.map(a => `\`${a}\``).join(', ')}`;
  // if (command.description) info += `\n**Description**: ${command.description}`;

  if (command.usage) {
    embed.addField('📘 Usage', '```css\n' + prefix + command.name + ' ' + command.usage + '\n```')
    embed.setFooter(`<> = required - [] = optional`);
  }

  if (command.description) {
    embed.addField('📝 Description', '```\n' + command.description + '\n```');
  }

  message.channel.send(
    embed
    .setColor('GREEN')
    .setTitle(`❕ Usage for \`${prefix}${command.name} \``),
  );
}

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
  usage: '[command]',
  run,
};

module.exports = helpCommand;