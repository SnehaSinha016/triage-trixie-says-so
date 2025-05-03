
export const physicalHealthWords = [
  "You're stronger than you feel today. One step at a time 💛",
  "This moment won't last forever. You're doing your best 💪",
  "You matter. Rest, breathe, and don't be afraid to reach out 💬",
  "Healing takes time, and that's okay. Be gentle with yourself today 🌱",
  "Sometimes the bravest thing is asking for help. You've got this 💫",
  "Your health matters - you deserve care and support 💙",
  "One day at a time. Small steps still move you forward 🦶",
  "Remember to breathe deeply when things feel overwhelming 🧘‍♀️",
  "It's okay to rest today. Your body is telling you what it needs 💤",
  "You're never alone in this journey. Reach out when you need to 🤝"
];

export const mentalHealthWords = [
  "Your emotions are valid. Take a moment to be kind to yourself 🫶",
  "Even the darkest night ends with sunrise. Hold on 🌅",
  "Your feelings matter. You matter. And this will pass 💫",
  "Small acts of self-care can be powerful anchors in the storm 🛟",
  "It's brave to acknowledge your struggles. You've taken an important step 🦋",
  "Your mind deserves the same care as your body. Be gentle with both 💭",
  "You're carrying a lot right now, and that's okay. You don't have to carry it alone 🫂",
  "This moment doesn't define you. Better days are coming 🌈",
  "You have survived all your difficult days so far - that's a 100% success rate 💪",
  "Your heart is resilient, even when it doesn't feel that way 💓"
];

export const getRandomCompassionateWord = (wordsList: string[]): string => {
  const randomIndex = Math.floor(Math.random() * wordsList.length);
  return wordsList[randomIndex];
};
