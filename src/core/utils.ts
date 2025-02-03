import { IPlugin } from './IPlugin';
import path from 'path';
import fs from 'fs/promises';
import { Response, Request } from 'express';
import { ErrorMessage } from '../utils';

/**
 * Interface representing the structure of report data.
 *
 * This interface defines the properties required for the representation
 * of a report, including its name, headers, and data content.
 *
 * Properties:
 * - `reportName`: The name of the report.
 * - `headers`: An array of string values representing the headers of the report.
 * - `data`: An array of objects, where each object represents a row in the report.
 *   The object's keys represent column names, and the values correspond to the cell values.
 */
export interface ReportData {
  reportName: string;
  headers: string[];
  data: Array<{ [key: string]: any }>;
}

/**
 * Describes the structure of a plugin type object.
 *
 * This interface is used to define the properties necessary for a plugin,
 * including its name, status, format, and file path.
 */
interface PluginType {
  name: string;
  enabled: boolean;
  format: string;
  path: string;
}

/**
 * Loads and initializes a plugin by dynamically importing the module from the provided route.
 *
 * @param {string} route - The relative path to the plugin module that needs to be imported.
 * @return {Promise<IPlugin | undefined>} A promise that resolves to an instance of the plugin if successfully loaded, or undefined if an error occurs.
 */
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

/**
 * Selects and returns a plugin based on the provided format.
 *
 * @param {string} format - The format based on which the plugin will be selected.
 * @return {Promise<PluginType | undefined>} A promise that resolves to the selected plugin if found and enabled, or undefined if no matching plugin is found.
 */
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

/**
 * Retrieves all available formats from the plugin configuration file and sends them in the response.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @return {Promise<void>} A promise that resolves when the function completes sending the response.
 */
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
