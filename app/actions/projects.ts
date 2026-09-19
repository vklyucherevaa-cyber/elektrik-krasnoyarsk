'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { projects } from '@/lib/db/schema'
import { asc, desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getProjects() {
  return db
    .select()
    .from(projects)
    .orderBy(asc(projects.sortOrder), desc(projects.createdAt))
}

export async function createProject(data: {
  title: string
  category?: string
  location?: string
  description?: string
  imageUrl: string
  featured?: boolean
  sortOrder?: number
}) {
  await requireAdmin()
  if (!data.title?.trim() || !data.imageUrl?.trim()) {
    return { ok: false, error: 'Заполните название и укажите изображение.' }
  }
  await db.insert(projects).values({
    title: data.title.trim().slice(0, 160),
    category: data.category?.slice(0, 80) || null,
    location: data.location?.slice(0, 120) || null,
    description: data.description?.slice(0, 1000) || null,
    imageUrl: data.imageUrl.trim(),
    featured: data.featured ?? false,
    sortOrder: data.sortOrder ?? 0,
  })
  revalidatePath('/admin')
  revalidatePath('/')
  return { ok: true }
}

export async function updateProject(
  id: number,
  data: {
    title: string
    category?: string
    location?: string
    description?: string
    imageUrl: string
    featured?: boolean
    sortOrder?: number
  },
) {
  await requireAdmin()
  await db
    .update(projects)
    .set({
      title: data.title.trim().slice(0, 160),
      category: data.category?.slice(0, 80) || null,
      location: data.location?.slice(0, 120) || null,
      description: data.description?.slice(0, 1000) || null,
      imageUrl: data.imageUrl.trim(),
      featured: data.featured ?? false,
      sortOrder: data.sortOrder ?? 0,
    })
    .where(eq(projects.id, id))
  revalidatePath('/admin')
  revalidatePath('/')
  return { ok: true }
}

export async function deleteProject(id: number) {
  await requireAdmin()
  await db.delete(projects).where(eq(projects.id, id))
  revalidatePath('/admin')
  revalidatePath('/')
  return { ok: true }
}
