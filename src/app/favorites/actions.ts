'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getOrCreateDbUser } from '@/lib/auth';

export async function toggleFavorite(roomId: string): Promise<void> {
  const user = await getOrCreateDbUser();
  if (!user) redirect('/sign-in');

  const existing = await prisma.favorite.findUnique({
    where: { userId_roomId: { userId: user.id, roomId } },
  });

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } });
  } else {
    await prisma.favorite.create({ data: { userId: user.id, roomId } });
  }

  revalidatePath('/favorites');
  revalidatePath('/rooms');
  revalidatePath(`/rooms/${roomId}`);
}
