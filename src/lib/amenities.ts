import type { ComponentType, SVGProps } from 'react';
import { WiFiIcon } from '@/app/components/icons/WiFiIcon';
import { PoolIcon } from '@/app/components/icons/PoolIcon';
import { KitchenIcon } from '@/app/components/icons/KitchenIcon';
import { ParkingIcon } from '@/app/components/icons/ParkingIcon';
import { SnowIcon } from '@/app/components/icons/SnowIcon';
import { UmbreallaBeachIcon } from '@/app/components/icons/UmbrellaBeachIcon';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type AmenityInfo = { label: string; short: string; icon: IconComponent };

export const AMENITIES: Record<string, AmenityInfo> = {
  wifi: { label: 'High-speed Wifi', short: 'Free Wi-Fi', icon: WiFiIcon },
  pool: { label: 'Infinity pool', short: 'Pool', icon: PoolIcon },
  kitchen: { label: 'Gourmet kitchen', short: 'Full Kitchen', icon: KitchenIcon },
  parking: { label: 'Free parking on premises', short: 'Parking', icon: ParkingIcon },
  ac: { label: 'Central air conditioning', short: 'Air Conditioning', icon: SnowIcon },
  beach: { label: 'Private beach access', short: 'Beach Access', icon: UmbreallaBeachIcon },
};

export function formatPrice(cents: number): string {
  return `$${Math.round(cents / 100).toLocaleString('en-US')}`;
}
