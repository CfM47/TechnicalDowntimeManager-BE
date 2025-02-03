import { ReportData } from './utils';

export interface IPlugin {
  name: string;
  version: string;
  generate: (reportData: ReportData) => Promise<Buffer>;
}
