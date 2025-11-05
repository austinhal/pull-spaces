import * as React from "react"
import { startTransition, Suspense } from "react"
import Router from "next/router"
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query"
import { motion, AnimatePresence } from "framer-motion"
import NProgress from "nprogress"
import { syncDrupalPreviewRoutes } from "next-drupal"
import "nprogress/nprogress.css"

import "styles/globals.css"

NProgress.configure({ showSpinner: false })

Router.events.on("routeChangeStart", function (path) {
  syncDrupalPreviewRoutes(path)
  NProgress.start()
})
Router.events.on("routeChangeComplete", () => NProgress.done())
Router.events.on("routeChangeError", () => NProgress.done())

function LoadingFallback() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center space-y-4">
        <motion.div
          className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="text-sm text-gray-600 animate-pulse">Loading...</p>
      </div>
    </motion.div>
  )
}

function pageVariants() {
  return {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  }
}

function pageTransition() {
  return {
    duration: 0.5,
    ease: "easeInOut"
  }
}

export default function App({ Component, pageProps }) {
  const queryClientRef = React.useRef<QueryClient>()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000, // 1 minute
          cacheTime: 5 * 60 * 1000, // 5 minutes
          retry: 3,
          retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
          refetchOnWindowFocus: false,
          suspense: true,
        },
        mutations: {
          retry: 1,
        }
      }
    })
  }

  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    const handleStart = (url: string) => {
      url !== Router.asPath && setIsLoading(true)
    }
    const handleComplete = () => setIsLoading(false)

    Router.events.on("routeChangeStart", handleStart)
    Router.events.on("routeChangeComplete", handleComplete)
    Router.events.on("routeChangeError", handleComplete)

    return () => {
      Router.events.off("routeChangeStart", handleStart)
      Router.events.off("routeChangeComplete", handleComplete)
      Router.events.off("routeChangeError", handleComplete)
    }
  }, [])

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <Suspense fallback={<LoadingFallback />}>
            <AnimatePresence mode="wait">
              <motion.div
                key={Router.asPath}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants()}
                transition={pageTransition()}
                className="min-h-screen"
              >
                <Component {...pageProps} />
              </motion.div>
            </AnimatePresence>
            {isLoading && <LoadingFallback />}
          </Suspense>
        </Hydrate>
      </QueryClientProvider>
    </React.StrictMode>
  )
}
