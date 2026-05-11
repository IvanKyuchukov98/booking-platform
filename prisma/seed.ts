import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rooms = [
  {
    name: 'Azure Horizon Infinity Villa',
    description:
      'Cliffside villa in Oia with unobstructed caldera views, hand-carved marble surfaces, and a heated infinity pool overlooking the Aegean.',
    location: 'Santorini, Greece',
    pricePerNight: 120000,
    maxGuests: 10,
    bedrooms: 5,
    beds: 6,
    baths: 5.5,
    imageUrl: '/images/santoriniGreece.png',
    amenities: ['wifi', 'pool', 'kitchen', 'parking', 'ac', 'beach'],
  },
  {
    name: 'Modernist Desert Retreat',
    description:
      'Architect-designed retreat in Joshua Tree with floor-to-ceiling glass, a private plunge pool, and panoramic desert views.',
    location: 'Joshua Tree, California',
    pricePerNight: 38200,
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2,
    imageUrl: '/images/modernistRetreat.png',
    amenities: ['wifi', 'pool', 'kitchen', 'parking', 'ac'],
  },
  {
    name: 'The Glass A-Frame',
    description:
      'Secluded cabin on the Tofino coastline. Wood-burning fireplace, soaking tub, and direct access to a quiet pebble beach.',
    location: 'Tofino, British Columbia',
    pricePerNight: 21500,
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 1,
    imageUrl: '/images/theGlassFrame.png',
    amenities: ['wifi', 'kitchen', 'parking', 'beach'],
  },
  {
    name: 'Roman Skyline Suite',
    description:
      'Penthouse suite in central Rome with a private rooftop terrace overlooking the Pantheon. Steps from the Spanish Steps.',
    location: 'Rome, Italy',
    pricePerNight: 51000,
    maxGuests: 4,
    bedrooms: 2,
    beds: 3,
    baths: 2,
    imageUrl: '/images/romanSkyline.png',
    amenities: ['wifi', 'kitchen', 'ac'],
  },
  {
    name: 'Shibuya Sky Loft',
    description:
      'Minimalist loft in the heart of Shibuya. Floor-to-ceiling windows, a Japanese soaking tub, and 24-hour concierge.',
    location: 'Tokyo, Japan',
    pricePerNight: 18000,
    maxGuests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    imageUrl: '/images/tokyoJapan.png',
    amenities: ['wifi', 'kitchen', 'ac'],
  },
  {
    name: 'Amazon Jungle Lodge',
    description:
      'Eco-lodge perched above the rainforest canopy. Includes guided hikes, river excursions, and farm-to-table meals.',
    location: 'Iquitos, Peru',
    pricePerNight: 12500,
    maxGuests: 6,
    bedrooms: 3,
    beds: 4,
    baths: 2,
    imageUrl: '/images/unique.png',
    amenities: ['wifi', 'kitchen', 'parking'],
  },
];

async function main() {
  console.log('Seeding rooms…');

  for (const room of rooms) {
    const existing = await prisma.room.findFirst({ where: { name: room.name } });
    if (existing) {
      await prisma.room.update({ where: { id: existing.id }, data: room });
      console.log(`  updated: ${room.name}`);
    } else {
      await prisma.room.create({ data: room });
      console.log(`  created: ${room.name}`);
    }
  }

  console.log(`Done. ${rooms.length} rooms in DB.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
