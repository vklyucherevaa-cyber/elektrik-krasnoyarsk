'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { reviews } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getApprovedReviews() {
  return db
    .select()
    .from(reviews)
    .where(eq(reviews.status, 'approved'))
    .orderBy(desc(reviews.createdAt))
}

export async function submitReview(formData: {
  authorName: string
  rating: number
  body: string
  service?: string
}) {
  const authorName = formData.authorName?.trim()
  const body = formData.body?.trim()
  const rating = Number(formData.rating)

  if (!authorName || authorName.length < 2) {
    return { ok: false, error: 'Укажите ваше имя.' }
  }
  if (!body || body.length < 10) {
    return { ok: false, error: 'Отзыв должен содержать не менее 10 символов.' }
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { ok: false, error: 'Оценка должна быть от 1 до 5.' }
  }

  await db.insert(reviews).values({
    authorName: authorName.slice(0, 120),
    rating,
    body: body.slice(0, 1500),
    service: formData.service?.slice(0, 120) || null,
    status: 'pending',
  })

  revalidatePath('/admin')
  return { ok: true }
}

export async function getAllReviews() {
  await requireAdmin()
  return db.select().from(reviews).orderBy(desc(reviews.createdAt))
}

export async function setReviewStatus(id: number, status: string) {
  await requireAdmin()
  await db.update(reviews).set({ status }).where(eq(reviews.id, id))
  revalidatePath('/admin')
  revalidatePath('/')
  return { ok: true }
}

export async function deleteReview(id: number) {
  await requireAdmin()
  await db.delete(reviews).where(eq(reviews.id, id))
  revalidatePath('/admin')
  revalidatePath('/')
  return { ok: true }
}
