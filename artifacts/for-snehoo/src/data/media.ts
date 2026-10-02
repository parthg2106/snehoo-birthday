// Single source of truth for every photo and video on the page.
// See MEDIA.md in the project root for how to add or replace media.

const m = (file: string) => `${import.meta.env.BASE_URL}media/${file}`;

export interface Photo {
  id: string;
  src: string;
  alt: string;
  /** intrinsic pixel size of the file as stored */
  width: number;
  height: number;
  /** quarter-turn applied at display time (file stored sideways). Never crops. */
  turn?: -90 | 90;
  title: string;
  caption: string;
}

export interface Clip {
  id: string;
  src: string;
  poster: string;
  label: string;
  title: string;
  caption: string;
}

export const photos: Record<string, Photo> = {
  cover: {
    id: "expressions",
    src: m("1_expressions.jpeg"),
    alt: "Snehoo scrunching her face into a shy, crinkle-eyed half smile, wearing a navy and gold embroidered top",
    width: 959,
    height: 1280,
    title: "The Scrunch",
    caption: "the face that says 'I'm not laughing' while laughing",
  },
  closeUp: {
    id: "close-up",
    src: m("0_close_up.jpeg"),
    alt: "Close-up selfie of Snehoo with a flower in her hair, resting her cheek on her hand and sticking her tongue out",
    width: 1280,
    height: 960,
    title: "The Dramatic One",
    caption: "Tongue out, zero warning, full commitment.",
  },
  glasses: {
    id: "glasses",
    src: m("2_glasses.jpeg"),
    alt: "Snehoo in clear-framed glasses and a blue floral kurta, tongue out, standing on a brick path with greenery",
    width: 1280,
    height: 960,
    title: "The Main Character",
    caption: "Glasses on. Opinions loaded. Do not interrupt.",
  },
  purple: {
    id: "purple",
    src: m("4_purple.jpeg"),
    alt: "Snehoo in a pink-purple printed kurta with a white flower in her hair, biting her fingertip and smiling shyly past the camera, a white building and blue sky behind her",
    width: 810,
    height: 1080,
    title: "The Shy-ish One",
    caption: "Pretending she's not about to burst out laughing. Failing beautifully.",
  },
  saree: {
    id: "saree",
    src: m("5_saree.jpeg"),
    alt: "Snehoo seated on the floor in a bright pink saree with a teal border and marigold garlands hanging behind her, smiling with her hand in her hair",
    width: 1280,
    height: 720,
    title: "The Festival Queen",
    caption: "Marigolds hanging everywhere, and she is still the brightest thing in the room.",
  },
  redRoom: {
    id: "red-room",
    src: m("6_red_room.jpeg"),
    alt: "Snehoo resting her chin on her folded arms in warm red-orange light, looking softly at the camera",
    width: 720,
    height: 1280,
    turn: -90,
    title: "The Quiet One",
    caption: "Warm light, soft look. The one who notices everything and says it later.",
  },
  last: {
    id: "last",
    src: m("3_last.jpeg"),
    alt: "Snehoo smiling in a navy jacket and glasses in an office lobby, while a friend behind the glass flashes two peace signs over her shoulder",
    width: 1280,
    height: 960,
    title: "And always",
    caption: "Someone is always in the background of your best moments, grinning.",
  },
};

export const versions: Photo[] = [
  photos.closeUp,
  photos.glasses,
  photos.purple,
  photos.saree,
  photos.redRoom,
];

export const clips: Clip[] = [
  {
    id: "video-1",
    src: m("video-1.mp4"),
    poster: m("video-1-poster.jpg"),
    label: "Reel 01",
    title: "Roll one",
    caption: "A little piece of a day I'd happily watch on repeat.",
  },
  {
    id: "video-2",
    src: m("video-2.mp4"),
    poster: m("video-2-poster.jpg"),
    label: "Reel 02",
    title: "Roll two",
    caption: "Proof that ordinary moments with you are the good ones.",
  },
];

export const wishes = [
  {
    word: "Happiness",
    note: "The loud kind and the quiet kind. The kind that shows up on ordinary Tuesdays for no reason at all.",
  },
  {
    word: "Freedom",
    note: "To be every version of yourself without asking permission, and to change your mind as often as you like.",
  },
  {
    word: "Dreams",
    note: "Big ones, strange ones, unreasonable ones. May you chase them with that same stubborn sparkle.",
  },
  {
    word: "Choices",
    note: "Real ones, all yours. May the right doors open, and may you always have the courage to walk through.",
  },
];
