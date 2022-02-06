import { Configs, ConfigType } from './types';
export declare class Config {
    static config: Configs;
    static checkLoaded(): Promise<void>;
    static load(): Promise<void>;
    static global(): Promise<ConfigType>;
    static ofGuild(guildId: string): Promise<ConfigType>;
    static setGuild(guildId: string, newConfig?: ConfigType): Promise<void>;
    static setGlobal(newConfig?: ConfigType): Promise<void>;
    static updateGuild(guildId: string, newConfig: ConfigType): Promise<void>;
    static updateGlobal(newConfig: ConfigType): Promise<void>;
}
//# sourceMappingURL=config.d.ts.map