import { DrupalClient } from "next-drupal"

// Helper function to check if Drupal is available
export function isDrupalAvailable() {
  return !!process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
}

// Lazy Drupal client creation
function createDrupalClient() {
  const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL

  if (!baseUrl) {
    console.warn(
      "⚠️  NEXT_PUBLIC_DRUPAL_BASE_URL is not set. " +
      "Please set this environment variable to connect to your Drupal backend. " +
      "For development, create a .env.local file with your Drupal URL."
    )
    return null
  }

  return new DrupalClient(baseUrl, {
    frontPage: process.env.DRUPAL_FRONT_PAGE || "/home",
    auth: process.env.DRUPAL_CLIENT_ID && process.env.DRUPAL_CLIENT_SECRET ? {
      clientId: process.env.DRUPAL_CLIENT_ID,
      clientSecret: process.env.DRUPAL_CLIENT_SECRET,
    } : undefined,
  })
}

// Create Drupal client lazily - only when first accessed
let _drupalClient: DrupalClient | null = null

export const drupal = {
  get client() {
    if (!_drupalClient) {
      _drupalClient = createDrupalClient()
    }
    return _drupalClient
  }
}

// Proxy to maintain backward compatibility
export const drupalProxy = new Proxy({}, {
  get(target, prop) {
    const client = drupal.client
    if (!client) {
      throw new Error('Drupal client is not available. Please check your environment variables.')
    }
    return typeof client[prop] === 'function' ? client[prop].bind(client) : client[prop]
  }
}) as any
