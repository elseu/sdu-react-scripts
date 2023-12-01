// index.d.ts
import { LinguiConfig } from '@lingui/conf';

// Define the structure of a locale item
export interface LocaleItem {
  title: string;
  value: string;
}

// Declare the module export structure
export interface ModuleExport {
  config: LinguiConfig;
  localeList: LocaleItem[];
}

// Declare the locales array
export declare const locales: string[];

// Declare the localeList array
export declare const localeList: LocaleItem[];

// Declare the module export
export declare const moduleConfig: ModuleExport;
