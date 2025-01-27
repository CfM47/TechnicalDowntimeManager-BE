import { Router, Express } from 'express';
import { IPlugin } from './IPlugin';

/**
 * Plugin management system for handling plugin lifecycle and routing
 * @class PluginManager
 * @property {Map<string, IPlugin>} plugins - Registry of loaded plugins
 * @property {Router} pluginRouter - Express router for plugin endpoints
 */
export class PluginManager {
  /**
   * Map of registered plugins by name
   * @private
   */
  private plugins: Map<string, IPlugin> = new Map();

  /**
   * Dedicated router for plugin routes
   * @private
   */
  private pluginRouter: Router = Router();

  /**
   * Creates a PluginManager instance
   * @constructor
   * @param {Express} app - Express application instance
   */
  constructor(private readonly app: Express) {}

  /**
   * Registers a plugin and initializes its routes
   * @method register
   * @param {IPlugin} plugin - Plugin instance to register
   * @returns {void}
   * @example
   * manager.register(new MyPlugin());
   */
  register(plugin: IPlugin): void {
    this.plugins.set(plugin.name, plugin);
    plugin.initialize?.(this.pluginRouter);
  }

  /**
   * Mounts all plugin routes under /api/plugins prefix
   * @method mountRoutes
   * @returns {void}
   * @example
   * manager.mountRoutes();
   */
  mountRoutes(): void {
    this.app.use('/api/plugins', this.pluginRouter);
  }

  /**
   * Starts all registered plugins asynchronously
   * @method startAll
   * @returns {Promise<void>}
   * @async
   * @example
   * await manager.startAll();
   */
  async startAll(): Promise<void> {
    for (const [name, plugin] of this.plugins) {
      await plugin.start?.();
      console.log(`[Plugin] ${name} started`);
    }
  }
}

/**
 * Module for managing plugin lifecycle and routing in an Express application
 * @module PluginManager
 * @requires express
 * @see {@link IPlugin} for plugin interface definition
 */
