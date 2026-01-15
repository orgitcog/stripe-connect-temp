import {NextResponse} from 'next/server';
import {getZoneConfig} from '@/lib/zoneConfig';

export async function GET() {
  try {
    const config = getZoneConfig();
    return NextResponse.json(config);
  } catch (error) {
    console.error('Failed to load zone config:', error);
    return NextResponse.json(
      {error: 'Failed to load configuration'},
      {status: 500}
    );
  }
}
