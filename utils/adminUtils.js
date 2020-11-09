const { createEmbed } = require('./discordUtils');

// official list of permissions : https://discord.js.org/#/docs/main/stable/class/Permissions
const Permissions = Object.freeze({
  ADMINISTRATOR: { name: 'ADMINISTRATOR', description: 'administrateur' },
  CREATE_INVITE: {
    name: 'CREATE_INSTANT_INVITE',
    description: 'have create instant invite permission',
  }, // create invitations to the guild
  KICK_MEMBERS: { name: 'KICK_MEMBERS', description: 'have kick member permission' },
  BAN_MEMBERS: { name: 'BAN_MEMBERS', description: 'have ban member permission' },
  MANAGE_CHANNELS: {
    name: 'MANAGE_CHANNELS',
    description: 'have edit and reorder channels permission',
  }, // edit and reorder channels
  MANAGE_GUILD: {
    name: 'MANAGE_GUILD',
    description: 'have edit the guild information, region, etc. permission',
  }, // edit the guild information, region, etc.
  ADD_REACTIONS: {
    name: 'ADD_REACTIONS',
    description: 'have add new reactions to messages permission',
  }, // add new reactions to messages
  VIEW_LOG: { name: 'VIEW_AUDIT_LOG', description: 'have see log of server permission' }, // see log of server
  PRIORITY_SPEAKER: {
    name: 'PRIORITY_SPEAKER',
    description: 'have turn on the priority speaker permission',
  },
  STREAM: { name: 'STREAM', description: 'have start a steam permission' },
  VIEW_CHANNEL: { name: 'VIEW_CHANNEL', description: 'have view channel permission' },
  SEND_MESSAGES: { name: 'SEND_MESSAGES', description: 'have send message permission' },
  SEND_TTS_MESSAGES: {
    name: 'SEND_TTS_MESSAGES',
    description: 'have send tts message permission',
  },
  MANAGE_MESSAGES: {
    name: 'MANAGE_MESSAGES',
    description: 'have delete messages and reactions permission',
  }, // delete messages and reactions
  EMBED_LINKS: {
    name: 'EMBED_LINKS',
    description: 'have send message with links with preview embed permission',
  }, // links posted will have a preview embedded
  ATTACH_FILES: { name: 'ATTACH_FILES', description: 'have attach files permission' },
  READ_MESSAGE_HISTORY: {
    name: 'READ_MESSAGE_HISTORY',
    description: 'have view channels history permission',
  }, // view messages that were posted prior to opening Discord
  MENTION_EVERYONE: {
    name: 'MENTION_EVERYONE',
    description: 'have mention @everyone permission',
  },
  USE_EXTERNAL_EMOJIS: {
    name: 'USE_EXTERNAL_EMOJIS',
    description: 'have use emojis from different guilds permission',
  }, // use emojis from different guilds
  VIEW_GUILD_INSIGHTS: { name: 'VIEW_GUILD_INSIGHTS', description: 'todo' },
  CONNECT: { name: 'CONNECT', description: 'have connect to a voice channel permission' }, // connect to a voice channel
  SPEAK: { name: 'SPEAK', description: 'have speak in a voice channel permission' }, // speak in a voice channel
  MUTE_MEMBERS: {
    name: 'MUTE_MEMBERS',
    description: 'have mute members across all voice channels permission',
  }, // mute members across all voice channels
  DEAFEN_MEMBERS: {
    name: 'DEAFEN_MEMBERS',
    description: 'jave deafen members across all voice channels permission',
  }, // deafen members across all voice channels
  MOVE_MEMBERS: {
    name: 'MOVE_MEMBERS',
    description: 'have move members between voice channels permission',
  }, // move members between voice channels
  USE_VAD: { name: 'USE_VAD', description: 'have use voice activity detection permission' }, // use voice activity detection
  CHANGE_NICKNAME: {
    name: 'CHANGE_NICKNAME',
    description: 'have change other members nicknames permission',
  }, // change other members' nicknames
  MANAGE_NICKNAMES: {
    name: 'MANAGE_NICKNAMES',
    description: 'have manage nicknames permission',
  },
  MANAGE_ROLES: { name: 'MANAGE_ROLES', description: 'have manage roles permission' },
  MANAGE_WEBHOOKS: {
    name: 'MANAGE_WEBHOOKS',
    description: 'have manage webhooks permission',
  },
  MANAGE_EMOJIS: { name: 'MANAGE_EMOJIS', description: 'have manage emojis permission' },
});

/**
 * Check author permissions
 *
 * @param {Array<Permissions>} requiredPermissions Array of permissions of Permissions object
 * @param {Client} client Discord client
 * @return {Array<Permissions>} Return isAuthorized for know if user can ran command and an Array of permissions who user do not have
 */
function checkAuthorPermissions(requiredPermissions, author) {
  let localPermissions = [];
  const missingPermissions = [];

  if (!Array.isArray(requiredPermissions)) {
    localPermissions.push(requiredPermissions);
  } else {
    localPermissions = requiredPermissions;
  }

  localPermissions.forEach(permission => {
    if (!author.hasPermission(permission.name)) {
      missingPermissions.push(permission);
    }
  });

  return missingPermissions;
}

function createMissingPermissionsMessage(missingPermissions) {
  return createEmbed('#c0392b', "⭕️ You don't have the necessary permissions")
    .setDescription(
      `You must ${missingPermissions
        .map(p => `**${p.description}**`)
        .join(' and ')}.`,
    )
    .setFooter('Contact the administrator of this server to have permissions.');
}

module.exports = {
  Permissions,
  checkAuthorPermissions,
  createMissingPermissionsMessage,
};
