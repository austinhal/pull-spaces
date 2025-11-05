import { DrupalClient } from "next-drupal"

// Check if required environment variables are set
const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL

if (!baseUrl) {
  console.warn(
    "⚠️  NEXT_PUBLIC_DRUPAL_BASE_URL is not set. " +
    "Please set this environment variable to connect to your Drupal backend. " +
    "For development, create a .env.local file with your Drupal URL."
  )
}

// Only create Drupal client if baseUrl is available
export const drupal = baseUrl ? new DrupalClient(baseUrl, {
  frontPage: process.env.DRUPAL_FRONT_PAGE || "/home",
  auth: process.env.DRUPAL_CLIENT_ID && process.env.DRUPAL_CLIENT_SECRET ? {
    clientId: process.env.DRUPAL_CLIENT_ID,
    clientSecret: process.env.DRUPAL_CLIENT_SECRET,
  } : undefined,
}) : null

// Helper function to check if Drupal is available
export function isDrupalAvailable() {
  return !!drupal
}
