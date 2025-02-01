import { Event, MediaBase } from '@/types/event';

export const getImageUrl = (image: MediaBase | null | undefined): string => {
  if (!image?.url) return "/images/placeholder.jpg";
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${image.url}`;
};

export const getThumbnailUrl = (media: MediaBase): string => {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  if (!baseUrl) return "/images/placeholder.jpg";

  // Media is now directly the image/video object
  if (media.mime?.startsWith("video/")) {
    return media.previewUrl || "/images/video-placeholder.jpg";
  } else {
    if (!media.formats?.thumbnail?.url) return "/images/placeholder.jpg";
    return `${baseUrl}${media.formats.thumbnail.url}`;
  }
};

export const getVideoUrl = (media: MediaBase): string => {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  if (!baseUrl) return "";

  if (!media.mime?.startsWith("video/")) return "";
  if (!media.url) return "";
  return `${baseUrl}${media.url}`;
};

export const createMediaSlides = (event: Event) => {
  const slides: any[] = [];

  // Add hero image if exists
  if (event.heroImage?.url) {
    slides.push({
      src: getImageUrl(event.heroImage),
      alt: event.heroImage.alternativeText || event.title,
      width: event.heroImage.width,
      height: event.heroImage.height,
    });
  }

  // Add media items
  event.media?.forEach((media) => {
    // Media is now directly the image/video object
    if (media.mime?.startsWith("video/")) {
      if (media.url) {
        slides.push({
          type: "video",
          poster: media.previewUrl,
          sources: [
            {
              src: getVideoUrl(media),
              type: media.mime,
            },
          ],
        });
      }
    } else {
      if (media.url) {
        slides.push({
          src: getImageUrl(media),
          alt: media.alternativeText || event.title,
          width: media.width,
          height: media.height,
        });
      }
    }
  });

  return slides;
};
