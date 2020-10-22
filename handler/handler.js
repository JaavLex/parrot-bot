const { readdirSync } = require('fs');
const AsciiTable = require('ascii-table');

const table = new AsciiTable().setHeading('Command', 'Status');

function handler(client) {
  readdirSync('./commands/').forEach(dir => {
    const commandsFolder = readdirSync(`./commands/${dir}/`).filter(file =>
      file.endsWith('.js'),
    );

    commandsFolder.forEach(file => {
      // we know what we do.
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const pull = require(`../commands/${dir}/${file}`);

      if (pull.name) {
        client.commands.set(pull.name, pull);
        table.addRow(file, '✅');
      } else {
        table.addRow(file, '❌');
        return;
      }

      if (pull.aliases && Array.isArray(pull.aliases)) {
        pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
      }
    });
  });

  console.info(`Detected commands :\n`, table.toString());
}
module.exports = handler;
