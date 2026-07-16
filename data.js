/* ============================================================
   20 LETTERS FOR MY LOVE — CONTENT FILE
   Edit everything in this file to personalize the experience.
   You never need to touch index.html / style.css / script.js
   just to update text, names, or media.
   ============================================================ */

const SITE = {
  herName: "[Her Name]",
  yourName: "[Your Name]",

  // Background music. Leave src empty ('') to disable the music screen's
  // actual playback (the UI will still show, just silently).
  music: {
    src: "music/background-song.mp3"
  },

  welcome: {
    subheadingLines: ["Twenty letters.", "Twenty hearts.", "One unforgettable birthday."],
    intro: "In the next few minutes, you're going to open twenty letters written by twenty people who love you. Take your time. There's no rush — this is all for you."
  },

  introduction: {
    // Your personal introduction page, shown before the letters begin.
    paragraphs: [
      "[Placeholder: This is where your personal introduction goes — why you created this gift.]",
      "[Placeholder: Explain why twenty people came together for this, and how much she means to each of them.]",
      "[Placeholder: A closing line building anticipation for what's about to unfold.]"
    ]
  },

  // Transition / memory pages inserted between certain letters.
  // "afterLetter" = insert this page right after that letter number.
  transitions: [
    {
      afterLetter: 5,
      title: "Our Favourite Memories",
      quote: "[Placeholder favourite quote goes here.]",
      caption: "[Placeholder: a short caption about a memory, an inside joke, or a childhood story.]",
      photos: ["images/memory1.jpg", "images/memory2.jpg", "images/memory3.jpg"]
    },
    {
      afterLetter: 10,
      title: "Little Moments We Loved",
      quote: "[Placeholder favourite quote goes here.]",
      caption: "[Placeholder: another memory or funny screenshot caption.]",
      photos: ["images/memory4.jpg", "images/memory5.jpg", "images/memory6.jpg"]
    },
    {
      afterLetter: 15,
      title: "Almost There",
      quote: "[Placeholder favourite quote goes here.]",
      caption: "[Placeholder: a final memory before the last few letters.]",
      photos: ["images/memory7.jpg", "images/memory8.jpg", "images/memory9.jpg"]
    }
  ],

  ending: {
    revealLines: ["Twenty letters.", "Twenty beautiful hearts.", "One unforgettable birthday.", "Happy 20th Birthday.", "I love you.", "Forever."],
    collagePhotos: [
      "images/collage1.jpg", "images/collage2.jpg", "images/collage3.jpg",
      "images/collage4.jpg", "images/collage5.jpg", "images/collage6.jpg"
    ]
  }
};

// Each letter object:
// id              - 1 through 20
// senderName      - who the letter is from
// relationship    - e.g. "Friend", "Mother", "Brother" (optional, leave '' to hide)
// photo           - path to sender's photo (optional, leave '' to hide)
// letterText      - array of paragraphs
// voiceSrc        - path to a voice note mp3 (optional, leave '' to hide the voice player)
// videoSrc        - path to a birthday video (optional, leave '' to hide the video button)
// gallery         - array of extra photo paths for a swipeable gallery (optional, leave [] to hide)
// isFinal         - true only for letter 20, triggers the special dramatic sequence

const LETTERS = Array.from({ length: 19 }, (_, i) => {
  const n = i + 1;
  return {
    id: n,
    senderName: `[Person ${n} Name]`,
    relationship: "[Relationship]",
    photo: "",
    letterText: [
      `[Placeholder letter ${n}, paragraph one. A warm opening line from this person, about what your friendship or bond means to them.]`,
      `[Placeholder letter ${n}, paragraph two. A specific memory or moment they cherish, written in their own voice.]`,
      `[Placeholder letter ${n}, closing line. A short birthday wish or heartfelt sign-off.]`
    ],
    voiceSrc: "",
    videoSrc: "",
    gallery: [],
    isFinal: false
  };
});

// Letter 20 — the special final letter, from you.
LETTERS.push({
  id: 20,
  senderName: SITE.yourName,
  relationship: "The one who loves you most",
  photo: "",
  letterText: [
    "[Placeholder: the opening of your final letter — the longest, most personal one in the whole experience.]",
    "[Placeholder paragraph two — a memory only the two of you share.]",
    "[Placeholder paragraph three — what she means to you, in your own words.]",
    "[Placeholder paragraph four — your hopes for the two of you going forward.]",
    "[Placeholder closing line — sign off however feels right.]"
  ],
  voiceSrc: "audio/my-voice-message.mp3",
  videoSrc: "video/my-birthday-video.mp4",
  gallery: [],
  isFinal: true
});
