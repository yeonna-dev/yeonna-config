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
    const configs = await Firestore.getDocuments() || [];

    const loadedConfig: { [key: string]: ConfigType; } = {};

    /* Populate the config object with all the configs from Firestore. */
    for(const config of configs)
      loadedConfig[config.id] = config.data;

    /* Initialize it if it's not yet created. */
    if(!loadedConfig.global)
      await Firestore.setDocument(globalConfigDocumentId, {});

    Config.config = {
      global: {},
      ...loadedConfig
    };

    loaded = true;
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
      await Firestore.setDocument(guildId, {});

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
    await Firestore.updateDocument(guildId, newConfig);
    Config.config[guildId] = {
      ...Config.config[guildId],
      ...newConfig,
    };
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
