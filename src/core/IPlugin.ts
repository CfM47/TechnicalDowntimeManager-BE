import { Router } from 'express';

/**
 * Interface defining the contract for plugins in the system
 * @interface IPlugin
 * @property {string} name - Unique identifier for the plugin
 * @property {string} version - Semantic version of the plugin
 * @property {function} [initialize] - Optional route initialization hook
 * @property {function} [start] - Optional async startup hook
 * @property {function} [stop] - Optional async shutdown hook
 *
 * @example
 * class MyPlugin implements IPlugin {
 *   name = 'MyPlugin';
 *   version = '1.0.0';
 *
 *   initialize(router: Router) {
 *     router.get('/my-endpoint', () => {...});
 *   }
 * }
 */
export interface IPlugin {
  name: string;
  version: string;
  initialize?: (router: Router) => void;
  start?: () => Promise<void>;
  stop?: () => Promise<void>;
}

/**
 * Core plugin interface for extending application functionality
 * @module IPlugin
 * @see {@link PluginManager} for plugin management implementation
 */
