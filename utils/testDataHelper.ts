/**
 * Test data helper utility for managing region-specific data
 */

import path from 'path';
import fs from 'fs';
import { logData } from './logger';

export interface RegionCredentials {
  username: string;
  password: string;
}

export interface RegionData {
  [region: string]: RegionCredentials;
}

let regionsData: RegionData | null = null;

/**
 * Load regions data from JSON file
 */
function loadRegionsData(): RegionData {
  if (regionsData) {
    return regionsData;
  }

  const dataPath = path.resolve(__dirname, '../data/regions.json');
  const fileContent = fs.readFileSync(dataPath, 'utf-8');
  regionsData = JSON.parse(fileContent);
  logData('Regions loaded', Object.keys(regionsData));
  return regionsData;
}

/**
 * Get credentials for a specific region
 */
export function getRegionData(region: string): RegionCredentials {
  const data = loadRegionsData();
  if (!data[region]) {
    throw new Error(`Region '${region}' not found in regions.json`);
  }
  logData(`Credentials for ${region}`, data[region]);
  return data[region];
}

/**
 * Get all available regions
 */
export function getAllRegions(): string[] {
  const data = loadRegionsData();
  return Object.keys(data);
}

/**
 * Get all regions with their data
 */
export function getAllRegionsData(): RegionData {
  return loadRegionsData();
}

/**
 * Validate region exists
 */
export function isValidRegion(region: string): boolean {
  const data = loadRegionsData();
  return region in data;
}

/**
 * Get region count
 */
export function getRegionCount(): number {
  return getAllRegions().length;
}

/**
 * Get test data for regions with optional filtering
 */
export function getTestDataForRegions(
  regions?: string[]
): Array<{ region: string; data: RegionCredentials }> {
  const data = loadRegionsData();
  const targetRegions = regions || getAllRegions();

  return targetRegions.map((region) => ({
    region,
    data: data[region],
  }));
}

/**
 * Validate all regions have required credentials
 */
export function validateRegionsData(): boolean {
  const data = loadRegionsData();
  const requiredFields = ['username', 'password'];

  for (const [region, creds] of Object.entries(data)) {
    for (const field of requiredFields) {
      if (!creds[field as keyof RegionCredentials]) {
        throw new Error(`Missing '${field}' for region '${region}'`);
      }
    }
  }

  return true;
}

/**
 * Test data constants
 */
export const TEST_TIMEOUTS = {
  SHORT: 5000,
  MEDIUM: 10000,
  LONG: 30000,
};

export const TEST_SELECTORS = {
  USERNAME_INPUT: 'input[name="username"]',
  PASSWORD_INPUT: 'input[name="password"]',
  SUBMIT_BUTTON: 'button[type="submit"]',
  REGION_DROPDOWN: '#regionDropdown',
  LOGOUT_LINK: 'text=Logout',
  LOGIN_HEADER: 'text=Login',
  WELCOME_MESSAGE: 'text=Welcome',
};

/**
 * URL helpers
 */
export const getBaseUrl = (): string => {
  return process.env.BASE_URL || 'https://ecommerce-app.example.com';
};

export const getLoginUrl = (): string => {
  return `${getBaseUrl()}/login`;
};

export const getHomeUrl = (): string => {
  return `${getBaseUrl()}/home`;
};
