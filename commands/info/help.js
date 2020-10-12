const { MessageEmbed } = require('discord.js');
const { prefix } = require('../../config.json');
const createEmbed = require('../../utils/disocrdUtils');
const emojiObject = require('./categories-label.json');

function getAllCommands(client, message) {
  const embed = createEmbed('#0af2fa', '**📖 Command list :**')
    .setDescription(
      `Know more about a specific command using \`${prefix}help\` [command] 😉`,
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
  const embed = createEmbed();

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

  if (command.usage) {
    embed.addField(
      '📘 Usage',
      '```css\n' + prefix + command.name + ' ' + command.usage + '\n```',
    );
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
