import StrapiMedia, { MediaFormat } from "../types/StrapiMedia";

export type mediaSize =
  | "xs"
  | "s"
  | "m"
  | "l"
  | "xl"
  | "original"
  | "thumbnail";

const getSizeFromKey = (media: StrapiMedia, key: mediaSize): MediaFormat => {
  switch (key) {
    case "xs":
      return media.attributes.formats.xsmall;
    case "s":
      return media.attributes.formats.small;
    case "m":
      return media.attributes.formats.medium;
    case "l":
      return media.attributes.formats.large;
    case "xl":
      return media.attributes.formats.xlarge;
    case "thumbnail":
      return media.attributes.formats.thumbnail;
    case "original":
      return media.attributes;
  }
};

export const getMedia = (
  media: StrapiMedia,
  size: mediaSize = "original"
): MediaFormat => {
  const sizeKeys: mediaSize[] = [
    "thumbnail",
    "xl",
    "l",
    "m",
    "s",
    "xs",
    "original",
  ];
  let matched = false;
  let mediaFormat = getSizeFromKey(media, "original");

  for (let i = 0; i < sizeKeys.length; i++) {
    if (size === sizeKeys[i]) {
      matched = true;
    }
    if (matched && getSizeFromKey(media, sizeKeys[i])) {
      try {
        mediaFormat = getSizeFromKey(media, sizeKeys[i]);
        break;
      } catch (TypeError) {
        continue;
      }
    }
  }

  return mediaFormat;
};

export const getMediaURL = (
  media: StrapiMedia,
  size: mediaSize = "original"
) => {
  const sizedMedia = getMedia(media, size);
  return sizedMedia.url;
};
