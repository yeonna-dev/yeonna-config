import { Configs, ConfigType } from './types';
import { Firestore } from './firestore';

const globalConfigDocumentId = 'global';

let loaded = false;

export class Config
{
  static config: Configs = { global: {} };

  static async checkLoaded()
  {
    if(!loaded)
      await Config.load();
  }

  static async load()
  {
    /* Load the configs from Firestore. */
    const configs: { [key: string]: ConfigType; } = await Firestore.getDocuments() || [];

    /* Initialize it if it's not yet created. */
    if(!configs.global)
      await Firestore.setDocument(globalConfigDocumentId, {});

    Config.config = {
      global: {},
      ...configs
    };

    loaded = true;
  }

  static async all()
  {
    await Config.checkLoaded();
    return Config.config;
  }

  static async global()
  {
    await Config.checkLoaded();
    return Config.config.global;
  }

  static async ofGuild(guildId: string)
  {
    await Config.checkLoaded();

    /* Initialize the guild config if not yet existing. */
    if(!Config.config[guildId])
    {
      await Firestore.setDocument(guildId, {});
      Config.config[guildId] = {};
    }

    return Config.config[guildId];
  }

  static async setGuild(guildId: string, newConfig?: ConfigType)
  {
    await Config.checkLoaded();
    await Firestore.setDocument(guildId, newConfig || Config.config[guildId]);
    if(newConfig)
      Config.config[guildId] = newConfig;
  }

  static async setGlobal(newConfig?: ConfigType)
  {
    await Config.setGuild(globalConfigDocumentId, newConfig);
  }

  static async updateGuild(guildId: string, newConfig: ConfigType)
  {
    await Config.checkLoaded();
    const updatedConfig = await Firestore.updateDocument(guildId, newConfig);
    Config.config[guildId] = updatedConfig as ConfigType;
  }

  static async updateGlobal(newConfig: ConfigType)
  {
    await Config.updateGuild(globalConfigDocumentId, newConfig);
  }

  static async getSetting(guildId: string, key: keyof ConfigType)
  {
    const setting = Config.config[guildId][key];
    return setting || Config.config.global[key];
  }
};
