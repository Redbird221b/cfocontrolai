import { createBrowserRouter } from 'react-router-dom'

const basename = import.meta.env.BASE_URL === '/' ? undefined : import.meta.env.BASE_URL

export const router = createBrowserRouter(
  [
    {
      path: '/',
      lazy: async () => {
        const { LandingPage } = await import('../pages/LandingPage')
        return { Component: LandingPage }
      },
    },
    {
      path: '/deck',
      lazy: async () => {
        const { DeckPage } = await import('../pages/DeckPage')
        return { Component: DeckPage }
      },
    },
    {
      path: '/privacy',
      lazy: async () => {
        const { PrivacyPage } = await import('../pages/PrivacyPage')
        return { Component: PrivacyPage }
      },
    },
  ],
  { basename },
)
