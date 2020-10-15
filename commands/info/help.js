const { prefix } = require('../../config.json');
const { createEmbed } = require('../../utils/discordUtils');
const { createError } = require('../../utils/errorUtils');
const emojiObject = require('./categories-label.json');

function getAllCommands(client, message) {
  const embed = createEmbed('#0af2fa', '**📖 Command list :**')
    .setDescription(
      `Know more about a specific command using \`${prefix}help\` [command] 😉`,
    )
    .setThumbnail(
      'https://i2.wp.com/thesecuritynoob.com/wp-content/uploads/2020/02/632px-Parrot_Logo.png?fit=632%2C599&ssl=1',
    );

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
  const command =
    client.commands.get(input.toLowerCase()) ||
    client.commands.get(client.aliases.get(input.toLowerCase()));

  const embed = createEmbed('#27ae60');

  if (!command) {
    throw createError(
      `The command ${prefix}${input.toLowerCase()} doesn't exist!`,
      `Your command is either not available, or doesn't exist`,
      `Refer to ${prefix}help to see available commands`,
      true,
    );
  }
  if (command.name) {
    embed.setTitle(`💡 Usage for \`${prefix}${command.name} \``);
    embed.addField('> 🔦 Name', '```css\n' + command.name + '\n```');
  }

  if (command.aliases) {
    embed.addField(
      '> 💬 Aliases',
      '```css\n' + command.aliases.join(' | ') + '\n```',
    );
  }

  if (command.usage) {
    embed.addField(
      '> 📘 Usage',
      '```css\n' + prefix + command.name + ' ' + command.usage + '\n```',
    );
    embed.setFooter(`<> = required - [] = optional`);
  }

  if (command.description) {
    embed.addField('> 📝 Description', '```\n' + command.description + '\n```');
  }

  message.channel.send(embed);
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
  autoMessageDeletion: false,
  run,
};

module.exports = helpCommand;
