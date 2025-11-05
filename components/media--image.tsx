import Image, { ImageProps } from "next/image"

import { absoluteURL } from "lib/utils/absolute-url"
import { MediaProps } from "components/media"

interface MediaImageProps extends MediaProps, Partial<ImageProps> {
  sizes?: string
  priority?: boolean
}

export function MediaImage({
  media,
  width,
  height,
  sizes,
  priority = false,
  style,
  ...props
}: MediaImageProps) {
  const image = media?.field_media_image

  if (!image) {
    return null
  }

  // Generate responsive sizes if not provided
  const defaultSizes = sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

  return (
    <Image
      src={absoluteURL(image.uri.url)}
      width={width || image.resourceIdObjMeta.width}
      height={height || image.resourceIdObjMeta.height}
      sizes={defaultSizes}
      priority={priority}
      alt={image.resourceIdObjMeta.alt || "Image"}
      title={image.resourceIdObjMeta.title}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R/xjqNzTakmeZQQM5xQB5Df/9k="
      style={{
        objectFit: style?.objectFit || 'cover',
        ...style,
      }}
      className={`transition-all duration-300 ${props.className || ''}`}
      {...props}
    />
  )
}
