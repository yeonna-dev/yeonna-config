import { DocumentData } from 'firebase/firestore';

/* Config */
export interface Configs
{
  global: ConfigType;
  [key: string]: ConfigType;
};

export interface ConfigType
{
  prefix?: string;
  pointsName?: string;
  collectiblesName?: string;
  mostCollectiblesReward?:
  {
    channel: string;
    prizes: number[];
  };
  roleRequestsApprovalChannel?: string;
  enabledCommands?: string | string[];
  reactRepost?: {
    count?: number;
    channel?: string;
    color?: string;
  };
};

/* Firestore */
export interface Document
{
  id: string;
  data: DocumentData;
}
