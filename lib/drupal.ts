import { DrupalClient } from "next-drupal"

// Helper function to check if Drupal is available
export function isDrupalAvailable() {
  return !!process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
}

// Simple object with methods that check for Drupal availability
export const drupal = {
  // Method proxy that checks availability before calling real Drupal client
  async getStaticPathsFromContext(...args: any[]) {
    if (!isDrupalAvailable()) {
      console.warn("Drupal is not configured. Skipping static path generation.")
      return []
    }

    const { DrupalClient } = await import("next-drupal")
    const client = new DrupalClient(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL!)
    return client.getStaticPathsFromContext(...args)
  },

  async translatePathFromContext(...args: any[]) {
    if (!isDrupalAvailable()) {
      throw new Error("Drupal is not configured.")
    }

    const { DrupalClient } = await import("next-drupal")
    const client = new DrupalClient(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL!)
    return client.translatePathFromContext(...args)
  },

  async getResourceFromContext(...args: any[]) {
    if (!isDrupalAvailable()) {
      throw new Error("Drupal is not configured.")
    }

    const { DrupalClient } = await import("next-drupal")
    const client = new DrupalClient(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL!)
    return client.getResourceFromContext(...args)
  },

  async getResourceCollectionFromContext(...args: any[]) {
    if (!isDrupalAvailable()) {
      throw new Error("Drupal is not configured.")
    }

    const { DrupalClient } = await import("next-drupal")
    const client = new DrupalClient(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL!)
    return client.getResourceCollectionFromContext(...args)
  },

  async getView(...args: any[]) {
    if (!isDrupalAvailable()) {
      throw new Error("Drupal is not configured.")
    }

    const { DrupalClient } = await import("next-drupal")
    const client = new DrupalClient(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL!)
    return client.getView(...args)
  },

  async getMenu(...args: any[]) {
    if (!isDrupalAvailable()) {
      console.warn("Drupal is not configured. Returning empty menu.")
      return { tree: [] }
    }

    const { DrupalClient } = await import("next-drupal")
    const client = new DrupalClient(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL!)
    return client.getMenu(...args)
  },

  deserialize(data: any) {
    const { DrupalClient } = require("next-drupal")
    const client = new DrupalClient(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL!)
    return client.deserialize(data)
  }
}
