export const USER_AVATAR =
  "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png";

export const OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_TMDB_ACCESS_TOKEN,
  },
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w300/";

export const IMG_BG_URL =
  "https://assets.nflxext.com/ffe/siteui/vlv3/b58c77e5-b2f6-4eaf-8352-fe8236c9d3f0/3e4e726c-ed2a-472c-94fa-b6c8880b7da2/US-en-20240820-TRIFECTA_GLOBAL_FALLBACK-perspective_WEB_2e8a07bd-505c-4bc0-9503-81884f6b5bcb_large.jpg";

export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "spanish", name: "Spanish" },
];
