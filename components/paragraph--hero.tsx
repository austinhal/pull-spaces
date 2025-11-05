import { motion } from "framer-motion"
import classNames from "classnames"

import { ParagraphProps } from "components/paragraph"
import { MediaImage } from "components/media--image"
import { SectionHeader } from "components/section-header"

export function ParagraphHero({ paragraph, ...props }: ParagraphProps) {
  return (
    <motion.section
      data-cy="paragraph-hero"
      className={classNames(
        "relative overflow-hidden",
        paragraph.field_media?.field_media_image
          ? "pt-16 md:pt-20 lg:pt-32 pb-8 md:pb-12 lg:pb-16"
          : "pt-20 md:pt-24 lg:pt-32 pb-16 md:pb-20 lg:pb-24"
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      {...props}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 via-blue-600/10 to-pink-600/10 animate-gradient-x bg-400% transition-all duration-1000" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SectionHeader
            level={1}
            heading={paragraph.field_heading}
            text={paragraph.field_text?.processed}
            links={paragraph.field_links}
          />
        </motion.div>

        <div className="container px-6 mx-auto">
          {paragraph.field_media && (
            <motion.div
              className="w-full h-64 md:h-80 lg:h-96 mt-8 md:mt-12 lg:mt-16 relative group"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl transform scale-105 group-hover:scale-110 transition-transform duration-500" />
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <MediaImage
                  media={paragraph.field_media}
                  style={{ objectFit: 'cover' }}
                  priority
                  className="w-full h-full transform scale-100 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  )
}
