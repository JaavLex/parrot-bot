const { createEmbed } = require('./discordUtils');

// official list of permissions : https://discord.js.org/#/docs/main/stable/class/Permissions
const Permissions = Object.freeze({
  ADMINISTRATOR: { name: 'ADMINISTRATOR', description: 'administrateur' },
  CREATE_INVITE: {
    name: 'CREATE_INSTANT_INVITE',
    description: 'can create instant invite',
  }, // create invitations to the guild
  KICK_MEMBERS: { name: 'KICK_MEMBERS', description: 'can kick member' },
  BAN_MEMBERS: { name: 'BAN_MEMBERS', description: 'can ban member' },
  MANAGE_CHANNELS: {
    name: 'MANAGE_CHANNELS',
    description: 'can edit and reorder channels',
  }, // edit and reorder channels
  MANAGE_GUILD: {
    name: 'MANAGE_GUILD',
    description: 'can edit the guild information, region, etc.',
  }, // edit the guild information, region, etc.
  ADD_REACTIONS: {
    name: 'ADD_REACTIONS',
    description: 'can add new reactions to messages',
  }, // add new reactions to messages
  VIEW_LOG: { name: 'VIEW_AUDIT_LOG', description: 'can see log of server' }, // see log of server
  PRIORITY_SPEAKER: {
    name: 'PRIORITY_SPEAKER',
    description: 'can turn on the priority speaker',
  },
  STREAM: { name: 'STREAM', description: 'can start a steam' },
  VIEW_CHANNEL: { name: 'VIEW_CHANNEL', description: 'can view channel' },
  SEND_MESSAGES: { name: 'SEND_MESSAGES', description: 'can send message' },
  SEND_TTS_MESSAGES: {
    name: 'SEND_TTS_MESSAGES',
    description: 'can send tts message',
  },
  MANAGE_MESSAGES: {
    name: 'MANAGE_MESSAGES',
    description: 'can delete messages and reactions',
  }, // delete messages and reactions
  EMBED_LINKS: {
    name: 'EMBED_LINKS',
    description: 'can send message with links with preview embed',
  }, // links posted will have a preview embedded
  ATTACH_FILES: { name: 'ATTACH_FILES', description: 'can attach files' },
  READ_MESSAGE_HISTORY: {
    name: 'READ_MESSAGE_HISTORY',
    description: 'can view channels history',
  }, // view messages that were posted prior to opening Discord
  MENTION_EVERYONE: {
    name: 'MENTION_EVERYONE',
    description: 'can mentio @everyone',
  },
  USE_EXTERNAL_EMOJIS: {
    name: 'USE_EXTERNAL_EMOJIS',
    description: 'can use emojis from different guilds',
  }, // use emojis from different guilds
  VIEW_GUILD_INSIGHTS: { name: 'VIEW_GUILD_INSIGHTS', description: 'todo' },
  CONNECT: { name: 'CONNECT', description: 'can onnect to a voice channel' }, // connect to a voice channel
  SPEAK: { name: 'SPEAK', description: 'can speak in a voice channel' }, // speak in a voice channel
  MUTE_MEMBERS: {
    name: 'MUTE_MEMBERS',
    description: 'can mute members across all voice channels',
  }, // mute members across all voice channels
  DEAFEN_MEMBERS: {
    name: 'DEAFEN_MEMBERS',
    description: 'can deafen members across all voice channels',
  }, // deafen members across all voice channels
  MOVE_MEMBERS: {
    name: 'MOVE_MEMBERS',
    description: 'can move members between voice channels',
  }, // move members between voice channels
  USE_VAD: { name: 'USE_VAD', description: 'can use voice activity detection' }, // use voice activity detection
  CHANGE_NICKNAME: {
    name: 'CHANGE_NICKNAME',
    description: 'can change other members nicknames',
  }, // change other members' nicknames
  MANAGE_NICKNAMES: {
    name: 'MANAGE_NICKNAMES',
    description: 'can manage nicknames',
  },
  MANAGE_ROLES: { name: 'MANAGE_ROLES', description: 'can manage roles' },
  MANAGE_WEBHOOKS: {
    name: 'MANAGE_WEBHOOKS',
    description: 'can manage webhooks',
  },
  MANAGE_EMOJIS: { name: 'MANAGE_EMOJIS', description: 'can manage emojis' },
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
