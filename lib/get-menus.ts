import { GetStaticPropsContext } from "next"
import { DrupalMenuLinkContent } from "next-drupal"
import { drupal, isDrupalAvailable } from "lib/drupal"

export async function getMenus(context: GetStaticPropsContext): Promise<{
  main: DrupalMenuLinkContent[]
  footer: DrupalMenuLinkContent[]
}> {
  if (!isDrupalAvailable()) {
    console.warn("Drupal is not configured. Returning empty menus.")
    return {
      main: [],
      footer: [],
    }
  }

  try {
    const { tree: main } = await drupal.getMenu("main", {
      locale: context.locale,
      defaultLocale: context.defaultLocale,
    })
    const { tree: footer } = await drupal.getMenu("footer", {
      locale: context.locale,
      defaultLocale: context.defaultLocale,
    })

    return {
      main,
      footer,
    }
  } catch (error) {
    console.warn("Error fetching menus:", error)
    return {
      main: [],
      footer: [],
    }
  }
}
