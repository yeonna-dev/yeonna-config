import { Config } from '../src';
import { ConfigType } from '../src/types';

const sampleDiscordGuildId = 'test';

const sampleGlobalConfig: ConfigType = {
  prefix: '`',
  pointsName: 'points',
};

const sampleTextChannel = 'test-channel';

const sampleGuildConfig: ConfigType = {
  mostCollectiblesReward:
  {
    channel: sampleTextChannel,
    prizes: [1, 2, 3, 4, 5, 6, 7, 9, 10],
  },
  pointsName: 'guild-points',
};


test('Should throw an error if the config is not loaded', () =>
{
  try
  {
    Config.global();
  }
  catch(error: any)
  {
    expect(error.message).toBe('Config not loaded');
  }
});

test('Should initialize the config', async () =>
{
  await Config.load();
  expect(Config.config).toMatchObject({ global: {} });
});

test('Should get all configs (global and guild configs)', async () =>
{
  const configs = await Config.all();
  expect(configs).toMatchObject({ global: {}, test: {} });
});

test('Should get the global config', async () =>
{
  const globalConfig = await Config.global();
  expect(globalConfig).toMatchObject({});
});

test('Should get the config of a guild', async () =>
{
  const config = await Config.ofGuild(sampleDiscordGuildId);
  expect(config).toMatchObject({});
});

test('Should set the global config with a given new config', async () =>
{
  await Config.setGlobal(sampleGlobalConfig);
  const globalConfig = await Config.global();
  expect(globalConfig).toMatchObject(sampleGlobalConfig);
});

test('Should set the global config by mutating the current global config', async () =>
{
  const enabledCommands = [
    'ping',
    'rolerequest',
    'rolerequestapprove',
    'rolerequestdecline',
    'rolerequestchannel',
  ];

  let globalConfig = await Config.global();
  globalConfig.enabledCommands = enabledCommands;
  await Config.setGlobal();
  globalConfig = await Config.global();
  expect(globalConfig).toMatchObject({ enabledCommands });
});

test('Should set the config of a guild with a given new config', async () =>
{
  await Config.setGuild(sampleDiscordGuildId, sampleGuildConfig);
  const guildConfig = await Config.ofGuild(sampleDiscordGuildId);
  expect(guildConfig).toMatchObject(sampleGuildConfig);
});

test('Should set the config of a guild by mutating the current config of the guild', async () =>
{
  let guildConfig = await Config.ofGuild(sampleDiscordGuildId);
  guildConfig.collectiblesName = 'guild-collectibles';
  await Config.setGuild(sampleDiscordGuildId);
  guildConfig = await Config.ofGuild(sampleDiscordGuildId);
  expect(guildConfig).toMatchObject({ collectiblesName: 'guild-collectibles' });
});

test('Should update one property of the global config', async () =>
{
  const newConfig: ConfigType = { roleRequestsApprovalChannel: sampleTextChannel };
  await Config.updateGlobal(newConfig);
  const globalConfig = await Config.global();
  expect(globalConfig).toMatchObject(newConfig);
});

test('Should update one property of a guild config', async () =>
{
  const newConfig =
  {
    mostCollectiblesReward:
    {
      prizes: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    }
  };
  await Config.updateGuild(sampleDiscordGuildId, newConfig as ConfigType);
  const guildConfig = await Config.ofGuild(sampleDiscordGuildId);
  expect(guildConfig).toMatchObject(newConfig);
});

test('Should get a specific setting from the global config if not in a guild config', async () =>
{
  const setting = await Config.getSetting(sampleDiscordGuildId, 'roleRequestsApprovalChannel');
  expect(setting).toBe(sampleTextChannel);
});
