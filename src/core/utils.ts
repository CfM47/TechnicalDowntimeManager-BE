import { IPlugin } from './IPlugin';
import path from 'path';
import fs from 'fs/promises';
import { Response, Request } from 'express';
import { ErrorMessage } from '../utils';

export interface ReportData {
  reportName: string;
  headers: string[];
  data: Array<{ [key: string]: any }>;
}

interface PluginType {
  name: string;
  enabled: boolean;
  format: string;
  path: string;
}

export async function getPlugin(route: string): Promise<IPlugin | undefined> {
  try {
    const pluginPath = path.resolve(__dirname, route);
    const module = await import(pluginPath);
    const plugin = module.default as new () => IPlugin;
    return new plugin();
  } catch (e) {
    console.error(e);
  }
}

export async function pickPlugin(format: string) {
  const pluginList: PluginType[] = await fs
    .readFile('src/core/config/pluginConfig.json', 'utf-8')
    .then(JSON.parse);
  const plugin = pluginList.find((plugin) => plugin.format === format && plugin.enabled);
  if (!plugin) {
    console.error('Plugin not found');
    return;
  }
  return getPlugin(plugin.path);
}

export async function getAllFormats(req: Request, res: Response) {
  try {
    const pluginList: PluginType[] = await fs
      .readFile('src/core/config/pluginConfig.json', 'utf-8')
      .then(JSON.parse);
    res.status(200).send(JSON.stringify(pluginList.map((plugin) => plugin.format)));
  } catch (e) {
    res.status(500).json(ErrorMessage(e));
  }
}
