import { ReportData } from './utils';

/**
 * Interface representing a plugin used for generating reports.
 *
 * @interface IPlugin
 */
export interface IPlugin {
  name: string;
  version: string;
  generate: (reportData: ReportData) => Promise<Buffer>;
}
