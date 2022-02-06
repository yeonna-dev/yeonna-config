import { Config } from '../src';
import { ConfigType } from '../src/types';

const testDiscordGuildId = '504135117296500746';

const sampleGlobalConfig: ConfigType = {
  prefix: '!',
  pointsName: 'points',
};

const sampleGuildConfig: ConfigType = {
  prefix: ';',
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

test('Should get the global config', async () =>
{
  const globalConfig = await Config.global();
  expect(globalConfig).toMatchObject({});
});

test('Should get the config of a guild', async () =>
{
  const config = await Config.ofGuild(testDiscordGuildId);
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
  let globalConfig = await Config.global();
  globalConfig.collectiblesName = 'collectibles';
  await Config.setGlobal();
  globalConfig = await Config.global();
  expect(globalConfig).toMatchObject({ collectiblesName: 'collectibles' });
});

test('Should set the config of a guild with a given new config', async () =>
{
  await Config.setGuild(testDiscordGuildId, sampleGuildConfig);
  const guildConfig = await Config.ofGuild(testDiscordGuildId);
  expect(guildConfig).toMatchObject(sampleGuildConfig);
});

test('Should set the config of a guild by mutating the current config of the guild', async () =>
{
  let guildConfig = await Config.ofGuild(testDiscordGuildId);
  guildConfig.collectiblesName = 'guild-collectibles';
  await Config.setGuild(testDiscordGuildId);
  guildConfig = await Config.ofGuild(testDiscordGuildId);
  expect(guildConfig).toMatchObject({ collectiblesName: 'guild-collectibles' });
});

test('Should update one property of the global config', async () =>
{
  const newConfig: ConfigType = { prefix: ';' };
  await Config.updateGlobal(newConfig);
  const globalConfig = await Config.global();
  expect(globalConfig).toMatchObject(newConfig);
});

test('Should update one property of a guild config', async () =>
{
  const newConfig: ConfigType = { prefix: '!' };
  await Config.updateGuild(testDiscordGuildId, newConfig);
  const guildConfig = await Config.ofGuild(testDiscordGuildId);
  expect(guildConfig).toMatchObject(newConfig);
});
