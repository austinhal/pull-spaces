import { motion } from "framer-motion"
import classNames from "classnames"

import { Links } from "components/links"
import { FormattedText } from "components/formatted-text"
import { ParagraphProps } from "components/paragraph"
import { Section } from "components/section"
import { MediaImage } from "components/media--image"

export function ParagraphFeature({ paragraph, ...props }: ParagraphProps) {
  return (
    <Section
      data-cy="paragraph-feature"
      backgroundColor={
        paragraph.field_background_color === "muted" && "bg-gray-50"
      }
      {...props}
    >
      <div className="container px-6 mx-auto">
        <div className="grid items-center gap-8 md:grid-flow-col-dense md:grid-cols-2 md:gap-12">
          {paragraph.field_media?.field_media_image && (
            <motion.div
              className={classNames(
                "group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2",
                paragraph.field_media_position === "left"
                  ? "md:col-start-1"
                  : "md:col-start-2"
              )}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <MediaImage
                media={paragraph.field_media}
                width={500}
                height={300}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                className="rounded-lg transform scale-100 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          )}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            {paragraph.field_heading && (
              <motion.h2
                className="text-3xl font-black sm:text-4xl lg:text-5xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                {paragraph.field_heading}
              </motion.h2>
            )}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <FormattedText
                className="max-w-md mt-4 text-lg font-light leading-relaxed text-gray-600 sm:text-xl lg:text-2xl"
                processed={paragraph.field_text.processed}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-6"
            >
              {paragraph.field_link && <Links links={[paragraph.field_link]} />}
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  )
}
