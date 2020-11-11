const { createUserEmbed } = require('../../utils/discordUtils');
const { createError } = require('../../utils/errorUtils');
const { createMdBlock, prefix } = require('../../utils/utils');
const emojiObject = require('./categories-label.json');

function getAllCommands(client, message) {
  const embed = createUserEmbed('#009432', '📖 Command list :', {
    author: message.author,
  })
    .setDescription(`Use \`${prefix}help\` [command] for more informations 😉`)
    .setThumbnail(client.user.avatarURL());

  function commandsListToString(category) {
    const commandsByCategory = client.commands
      .filter(command => command.category === category)
      .map(c => c.name);

    if (!commandsByCategory.length) {
      return '⚠️ no command with this category';
    }

    return createMdBlock(commandsByCategory.join(' | '), 'css');
  }

  client.categories.forEach(category => {
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

  const embed = createUserEmbed('#27ae60', {
    author: message.author,
  })
    .setDescription(
      `💡 Usage for \`${prefix}${command ? command.name : 'undefined'} \``,
    )
    .setThumbnail(client.user.avatarURL());

  if (!command) {
    throw createError(
      `The command ${prefix}${input.toLowerCase()} doesn't exist!`,
      `Your command is either not available, or doesn't exist`,
      `Refer to ${prefix}help to see available commands`,
      true,
    );
  }
  if (command.name) {
    embed.addField('> 🔦 Name', createMdBlock(command.name, 'css'));
  }

  if (command.aliases) {
    embed.addField(
      '> 💬 Aliases',
      createMdBlock(command.aliases.join(' | '), 'css'),
    );
  }

  if (command.usage) {
    embed.addField(
      '> 📘 Usage',
      createMdBlock(`${prefix + command.name} ${command.usage}`, 'css'),
    );
    embed.setFooter(`<> = required - [] = optional`);
  }

  if (command.description) {
    embed.addField(
      '> 📝 Description',
      command.customDescription
        ? command.description
        : createMdBlock(command.description),
    );
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
