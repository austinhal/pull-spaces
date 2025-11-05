import { GetStaticPathsContext, GetStaticPropsContext } from "next"
import { JsonApiResponse, JsonApiResource } from "next-drupal"

// Helper function to check if Drupal is available
export function isDrupalAvailable() {
  return !!process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
}

// Simple object with methods that check for Drupal availability
export const drupal = {
  // Method proxy that checks availability before calling real Drupal client
  async getStaticPathsFromContext(resourceTypes: string[], context: GetStaticPathsContext, options?: any) {
    if (!isDrupalAvailable()) {
      console.warn("Drupal is not configured. Skipping static path generation.")
      return []
    }

    const { DrupalClient } = await import("next-drupal")
    const client = new DrupalClient(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL!)
    return client.getStaticPathsFromContext(resourceTypes, context, options)
  },

  async translatePathFromContext(context: GetStaticPropsContext, options?: any) {
    if (!isDrupalAvailable()) {
      throw new Error("Drupal is not configured.")
    }

    const { DrupalClient } = await import("next-drupal")
    const client = new DrupalClient(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL!)
    return client.translatePathFromContext(context, options)
  },

  async getResourceFromContext<T extends JsonApiResource>(path: any, context: GetStaticPropsContext, options?: any) {
    if (!isDrupalAvailable()) {
      throw new Error("Drupal is not configured.")
    }

    const { DrupalClient } = await import("next-drupal")
    const client = new DrupalClient(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL!)
    return client.getResourceFromContext<T>(path, context, options)
  },

  async getResourceCollectionFromContext(resourceType: string, context: GetStaticPropsContext, options?: any) {
    if (!isDrupalAvailable()) {
      throw new Error("Drupal is not configured.")
    }

    const { DrupalClient } = await import("next-drupal")
    const client = new DrupalClient(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL!)
    return client.getResourceCollectionFromContext(resourceType, context, options)
  },

  async getView(viewId: string, options?: any) {
    if (!isDrupalAvailable()) {
      throw new Error("Drupal is not configured.")
    }

    const { DrupalClient } = await import("next-drupal")
    const client = new DrupalClient(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL!)
    return client.getView(viewId, options)
  },

  async getMenu(menuName: string, options?: any) {
    if (!isDrupalAvailable()) {
      console.warn("Drupal is not configured. Returning empty menu.")
      return { tree: [] }
    }

    const { DrupalClient } = await import("next-drupal")
    const client = new DrupalClient(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL!)
    return client.getMenu(menuName, options)
  },

  deserialize(data: JsonApiResponse) {
    if (!isDrupalAvailable()) {
      return null
    }

    const { DrupalClient } = require("next-drupal")
    const client = new DrupalClient(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL!)
    return client.deserialize(data)
  },

  async preview(request: any, response: any) {
    if (!isDrupalAvailable()) {
      response.status(404).end("Drupal not configured")
      return
    }

    const { DrupalClient } = await import("next-drupal")
    const client = new DrupalClient(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL!)
    return client.preview(request, response)
  }
}
