const {
  getCurrentChatId,
  renameChat,
} = SillyTavern.getContext();
import { ToolManager } from '../../../tool-calling.js';
import { humanizedDateTime } from '../../../RossAscends-mods.js';

// can inhibit all tools from being registered here
const tools = true;

// can enable the getter tool (GetChatTitle) here
const getter = false;

async function doRenameChat(args) {
  const currentChatName = getCurrentChatId();

  if (!currentChatName) {
    throw new Error('Cannot rename chat because it is temporary');
  }
  if (!args?.title) {
    throw new Error('Cannot rename chat because no title was provided');
  }
  if (args?.title.length < 4) {
    throw new Error('Cannot rename chat because the title is too short');
  }

  const newChatName = `${args.title} - ${humanizedDateTime()}`;

  if (newChatName.length > 100) {
    throw new Error('Cannot rename chat because the title is too long');
  }

  if (newChatName === currentChatName) {
    // unlikely
    return;
  }

  await renameChat(currentChatName, newChatName);
  return {'title': newChatName};
}

async function registerTools() {
  if (!ToolManager.isToolCallingSupported()) return;

  ToolManager.registerFunctionTool({
    name: 'SetChatTitle',
    displayName: 'Set Chat Title',
    description: 'Sets the title of this chat. Use this to help the user remember what this chat is about.',
    parameters: {
      $schema: 'http://json-schema.org/draft-04/schema#',
      type: 'object',
      properties: {
        title: {
          type: 'string',
          title: 'New chat title (suggested length 4 words)',
        },
      },
      required: ['title'],
    },
    action: doRenameChat,
    formatMessage: (args) => args?.title ? `New chat title: ${args?.title}` : '',
    shouldRegister: async () => getCurrentChatId() !== null,
  });

  ToolManager.registerFunctionTool({
    name: 'GetChatTitle',
    displayName: 'Get Chat Title',
    description: 'Returns the current title of this chat.',
    parameters: {
      $schema: 'http://json-schema.org/draft-04/schema#',
      type: 'object',
      properties: {},
    },
    action: async () => {
      return {'title': getCurrentChatId() || null};
    },
    shouldRegister: async () => getter && getCurrentChatId() !== null,
  });
}

jQuery(async () => {
  if (tools) await registerTools();
});
