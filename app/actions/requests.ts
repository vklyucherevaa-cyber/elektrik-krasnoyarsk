'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { requests } from '@/lib/db/schema'
import { and, desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function submitRequest(formData: {
  name: string
  phone: string
  service?: string
  message?: string
}) {
  const name = formData.name?.trim()
  const phone = formData.phone?.trim()

  if (!name || name.length < 2) {
    return { ok: false, error: 'Укажите ваше имя.' }
  }
  const digits = phone?.replace(/\D/g, '') ?? ''
  if (digits.length < 10) {
    return { ok: false, error: 'Укажите корректный номер телефона.' }
  }

  await db.insert(requests).values({
    name: name.slice(0, 120),
    phone: phone.slice(0, 40),
    service: formData.service?.slice(0, 120) || null,
    message: formData.message?.slice(0, 1000) || null,
  })

  revalidatePath('/admin')
  return { ok: true }
}

export async function getRequests() {
  await requireAdmin()
  return db.select().from(requests).orderBy(desc(requests.createdAt))
}

export async function updateRequestStatus(id: number, status: string) {
  await requireAdmin()
  await db.update(requests).set({ status }).where(eq(requests.id, id))
  revalidatePath('/admin')
  return { ok: true }
}

export async function deleteRequest(id: number) {
  await requireAdmin()
  await db.delete(requests).where(and(eq(requests.id, id)))
  revalidatePath('/admin')
  return { ok: true }
}
