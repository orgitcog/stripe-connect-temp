import fs from 'fs';
import path from 'path';

export interface ZoneConfig {
  zone: {
    name: string;
    description: string;
    domain: string;
  };
  branding: {
    displayName: string;
    tagline: string;
    heroDescription: string;
    logo: {
      path: string;
      alt: string;
    };
    favicon: string;
    heroImage: string;
    primaryColor?: string;
    accentColor?: string;
  };
  terminology: {
    account: {
      singular: string;
      plural: string;
    };
    entity: {
      singular: string;
      plural: string;
      displayName: string;
    };
    service: {
      provider: string;
      session: string;
      schedule: string;
    };
  };
  features: {
    title: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  testimonial?: {
    quote: string;
    author: string;
    authorTitle: string;
    authorImage: string;
    image: string;
  };
  cta?: {
    title: string;
    description: string;
  };
  data?: {
    entities?: string;
    schedule?: string;
  };
  stripe?: {
    statementDescriptor?: string;
    supportEmail?: string;
    supportUrl?: string;
  };
}

let cachedConfig: ZoneConfig | null = null;

/**
 * Load zone configuration from the specified config file
 * Defaults to ZONE_CONFIG_PATH environment variable or 'furever.zone.json'
 */
export function loadZoneConfig(): ZoneConfig {
  if (cachedConfig) {
    return cachedConfig;
  }

  const configPath = process.env.ZONE_CONFIG_PATH || 'furever.zone.json';
  const fullPath = path.join(process.cwd(), configPath);

  try {
    const configFile = fs.readFileSync(fullPath, 'utf-8');
    cachedConfig = JSON.parse(configFile) as ZoneConfig;
    return cachedConfig;
  } catch (error) {
    console.error(`Failed to load zone config from ${fullPath}:`, error);
    throw new Error(
      `Zone configuration file not found or invalid: ${configPath}`
    );
  }
}

/**
 * Get the zone configuration (cached)
 */
export function getZoneConfig(): ZoneConfig {
  return loadZoneConfig();
}

/**
 * Reset the cached configuration (useful for testing)
 */
export function resetZoneConfigCache(): void {
  cachedConfig = null;
}
