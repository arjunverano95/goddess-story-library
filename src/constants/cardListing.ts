// export enum CARD_LISTING {
//   GSL = 'goddess-story',
//   SGH = 'senpai-goddess-haven',
//   FG = 'flower-girl',
//   FL = 'fire-legend',
// }

// export const LISTING_DATA: Record<
//   CARD_LISTING,
//   {id: string; name: string; image_url: string}
// > = {
//   [CARD_LISTING.GSL]: {
//     id: CARD_LISTING.GSL,
//     name: 'Goddess Story',
//     image_url:
//       'https://lh3.googleusercontent.com/d/1i2xIUA-9CBqjcHPJHkm3Gto4miZVmde9',
//   },
//   [CARD_LISTING.SGH]: {
//     id: CARD_LISTING.SGH,
//     name: 'Senpai Goddess Haven',
//     image_url:
//       'https://lh3.googleusercontent.com/d/1CrWk6cJOE-lDY6PoOLv7EbJzeLIhk6RP',
//   },
//   [CARD_LISTING.FG]: {
//     id: CARD_LISTING.FG,
//     name: 'Flower Girl',
//     image_url:
//       'https://lh3.googleusercontent.com/d/1q8sS8uRCLxkmHuuxYc_evzYp7oeTYuVu',
//   },
//   [CARD_LISTING.FL]: {
//     id: CARD_LISTING.FL,
//     name: 'Fire Legend',
//     image_url:
//       'https://lh3.googleusercontent.com/d/1sVqOeocBshfmKG_z5zE7QoqKWRgKv9rN',
//   },
// };

// export const LISTING_OPTIONS = Object.values(LISTING_DATA).map((listing) => ({
//   id: listing.id as CARD_LISTING,
//   name: listing.name,
// }));
export const DEFAULT_LISTING = {
  slug: 'goddess-story',
  name: 'Goddess Story',
};
