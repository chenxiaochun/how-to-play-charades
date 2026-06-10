import type { Locale } from "@/lib/site";

export type Dictionary = {
  meta: {
    home: { title: string; description: string };
    blog: { title: string; description: string };
    about: { title: string; description: string };
    userStatement: { title: string; description: string };
    privacyPolicy: { title: string; description: string };
    rules: { title: string; description: string };
    tips: { title: string; description: string };
    guides: { title: string; description: string };
    notFound: { title: string; description: string };
  };
  nav: {
    home: string;
    blog: string;
    guides: string;
    rules: string;
    tips: string;
    userStatement: string;
    privacyPolicy: string;
    about: string;
    playNow: string;
    viewRules: string;
  };
  header: {
    title: string;
    subtitle: string;
  };
  breadcrumb: {
    home: string;
    blog: string;
    rules: string;
    tips: string;
    charades: string;
    userStatement: string;
    privacyPolicy: string;
    guides: string;
    about: string;
  };
  blogIndex: {
    hubTitle: string;
    hubIntro: string;
    readMore: string;
  };
  guides: {
    sectionTitle: string;
    sectionDescription: string;
    viewAll: string;
    hubTitle: string;
    hubIntro: string;
  };
  homePreview: {
    readMoreRules: string;
    readMoreTips: string;
  };
  features: {
    title: string;
    items: Array<{ title: string; description: string; icon: string }>;
  };
  howToPlay: {
    title: string;
    steps: Array<{ title: string; description: string }>;
  };
  rules: {
    title: string;
    items: string[];
    faq: Array<{ question: string; answer: string }>;
  };
  tips: {
    title: string;
    items: string[];
  };
  game: {
    settingsTitle: string;
    category: string;
    allCategories: string;
    animals: string;
    movies: string;
    sports: string;
    food: string;
    famous: string;
    difficulty: string;
    easy: string;
    medium: string;
    hard: string;
    timeLimit: string;
    historyTitle: string;
    clickStart: string;
    startGame: string;
    endGame: string;
    correct: string;
    wrong: string;
    skip: string;
    backToMenu: string;
    gameEnded: string;
    correctStatus: string;
    wrongStatus: string;
  };
  footer: {
    copyright: string;
    description: string;
    guidesTitle: string;
    guides: {
      charadesForKids: string;
      charadesWords: string;
      charadesParty: string;
      charadesForAdults: string;
      charadesThemes: string;
      christmasCharades: string;
      halloweenCharades: string;
      teamBuildingCharades: string;
      allGuides: string;
    };
  };
  about: {
    sections: Array<{
      heading: string;
      paragraphs?: string[];
      list?: string[];
    }>;
    backHome: string;
    lastUpdated: string;
  };
  cookie: {
    message: string;
    accept: string;
    privacy: string;
  };
  ad: {
    label: string;
  };
  userStatement: {
    sections: Array<{ heading: string; paragraphs: string[]; list?: string[] }>;
    backHome: string;
    lastUpdated: string;
  };
  privacyPolicy: {
    sections: Array<{ heading: string; paragraphs: string[]; list?: string[] }>;
    backHome: string;
    lastUpdated: string;
  };
  notFound: {
    title: string;
    message: string;
    backHome: string;
  };
};

export function isValidLocale(value: string): value is Locale {
  return value === "en" || value === "zh";
}
