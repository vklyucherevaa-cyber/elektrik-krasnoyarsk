'use client'

import { createContext, useContext, useMemo, useState } from 'react'

export type QuoteData = {
  objectType: string
  area: number
  outlets: number
  switches: number
  lights: number
  wallMaterial: string
  panelType: string
  panelModules: string
  routeType: string
  routeLength: number
  pointsCost: number
  panelCost: number
  routeCost: number
  total: number
}

type QuoteContextValue = {
  quote: QuoteData | null
  setQuote: (quote: QuoteData) => void
  clearQuote: () => void
}

const QuoteContext = createContext<QuoteContextValue | null>(null)

export function QuoteProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [quote, setQuote] = useState<QuoteData | null>(null)

  const value = useMemo(
    () => ({
      quote,
      setQuote,
      clearQuote: () => setQuote(null),
    }),
    [quote],
  )

  return (
    <QuoteContext.Provider value={value}>
      {children}
    </QuoteContext.Provider>
  )
}

export function useQuote() {
  const context = useContext(QuoteContext)

  if (!context) {
    throw new Error('useQuote must be used inside QuoteProvider')
  }

  return context
}