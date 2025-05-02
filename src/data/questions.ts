
import { Answer } from '../components/AnswerOption';

export type Question = {
  id: string;
  text: string;
  answers: Answer[];
};

export const questionsBySymptom: Record<string, Question[]> = {
  fever: [
    {
      id: 'fever-temp',
      text: 'How high is your temperature? 🌡️',
      answers: [
        { id: 'low', text: 'Just a bit warm (up to 100°F/38°C)', emoji: '🙂', value: 'low' },
        { id: 'medium', text: 'Quite hot (100-102°F/38-39°C)', emoji: '😓', value: 'medium' },
        { id: 'high', text: 'Very high (103°F/39.5°C or higher)', emoji: '🥵', value: 'high' },
        { id: 'unknown', text: "I haven't checked", emoji: '🤷', value: 'unknown' },
      ],
    },
    {
      id: 'fever-duration',
      text: 'How long have you had this fever? ⏱️',
      answers: [
        { id: 'short', text: 'Less than a day', emoji: '🕐', value: 'short' },
        { id: 'medium', text: '1-3 days', emoji: '📅', value: 'medium' },
        { id: 'long', text: 'More than 3 days', emoji: '📆', value: 'long' },
      ],
    },
    {
      id: 'fever-other-symptoms',
      text: 'Any other concerning symptoms? 🧐',
      answers: [
        { id: 'none', text: 'No other major symptoms', emoji: '👍', value: 'none' },
        { id: 'mild', text: 'Mild cough/sore throat', emoji: '😕', value: 'mild' },
        { id: 'rash', text: 'Unusual rash', emoji: '🫨', value: 'rash' },
        { id: 'severe', text: 'Severe headache or stiff neck', emoji: '😣', value: 'severe' },
      ],
    },
  ],
  cough: [
    {
      id: 'cough-type',
      text: 'What kind of cough is it? 🤔',
      answers: [
        { id: 'dry', text: 'Dry and tickly', emoji: '😮‍💨', value: 'dry' },
        { id: 'productive', text: 'Producing mucus/phlegm', emoji: '🤧', value: 'productive' },
        { id: 'severe', text: 'Severe/barking/wheezing', emoji: '😰', value: 'severe' },
      ],
    },
    {
      id: 'cough-duration',
      text: 'How long have you been coughing? ⏱️',
      answers: [
        { id: 'short', text: 'Just started (less than 3 days)', emoji: '🕐', value: 'short' },
        { id: 'medium', text: 'Several days to a week', emoji: '📅', value: 'medium' },
        { id: 'long', text: 'More than a week', emoji: '📆', value: 'long' },
      ],
    },
    {
      id: 'cough-breathing',
      text: 'Any trouble with breathing? 💨',
      answers: [
        { id: 'none', text: 'Breathing normally', emoji: '😌', value: 'none' },
        { id: 'mild', text: 'Slightly harder to breathe', emoji: '😕', value: 'mild' },
        { id: 'severe', text: 'Difficult to breathe', emoji: '😰', value: 'severe' },
      ],
    },
  ],
  'chest-pain': [
    {
      id: 'chest-pain-type',
      text: 'How would you describe the pain? 💭',
      answers: [
        { id: 'sharp', text: 'Sharp and stabbing', emoji: '🔪', value: 'sharp' },
        { id: 'pressure', text: 'Pressure or squeezing', emoji: '✊', value: 'pressure' },
        { id: 'burning', text: 'Burning sensation', emoji: '🔥', value: 'burning' },
        { id: 'mild', text: 'Mild discomfort', emoji: '😕', value: 'mild' },
      ],
    },
    {
      id: 'chest-pain-duration',
      text: 'How long has it been hurting? ⏱️',
      answers: [
        { id: 'minutes', text: 'Just minutes', emoji: '⏱️', value: 'minutes' },
        { id: 'hours', text: 'Hours', emoji: '🕐', value: 'hours' },
        { id: 'days', text: 'Days', emoji: '📅', value: 'days' },
      ],
    },
    {
      id: 'chest-pain-breathing',
      text: 'Any trouble breathing with the pain? 😮‍💨',
      answers: [
        { id: 'none', text: 'Breathing normally', emoji: '😌', value: false },
        { id: 'yes', text: 'Yes, hard to breathe', emoji: '😰', value: true },
      ],
    },
    {
      id: 'chest-pain-radiation',
      text: 'Does the pain spread to your arm, jaw, or back? 🤔',
      answers: [
        { id: 'no', text: 'No, just in my chest', emoji: '👍', value: false },
        { id: 'yes', text: 'Yes, it spreads', emoji: '😨', value: true },
      ],
    },
  ],
  headache: [
    {
      id: 'headache-severity',
      text: 'How bad is your headache? 😵',
      answers: [
        { id: 'mild', text: 'Mild annoyance', emoji: '🙂', value: 'mild' },
        { id: 'moderate', text: 'Moderately painful', emoji: '😣', value: 'moderate' },
        { id: 'severe', text: 'Severe/worst ever', emoji: '😫', value: 'severe' },
      ],
    },
    {
      id: 'headache-duration',
      text: 'How long has it been hurting? ⏱️',
      answers: [
        { id: 'hours', text: 'Hours', emoji: '🕐', value: 'hours' },
        { id: 'days', text: 'Days', emoji: '📅', value: 'days' },
        { id: 'week', text: 'A week or more', emoji: '📆', value: 'week' },
      ],
    },
    {
      id: 'headache-other-symptoms',
      text: 'Any other symptoms with your headache? 🤔',
      answers: [
        { id: 'none', text: 'Just the headache', emoji: '👍', value: 'none' },
        { id: 'nausea', text: 'Nausea or vomiting', emoji: '🤢', value: 'nausea' },
        { id: 'vision', text: 'Vision changes', emoji: '👁️', value: 'vision' },
        { id: 'neck', text: 'Stiff neck', emoji: '😖', value: 'neck' },
      ],
    },
    {
      id: 'headache-injury',
      text: 'Any recent head injury? 🩹',
      answers: [
        { id: 'no', text: 'No injury', emoji: '👍', value: false },
        { id: 'yes', text: 'Yes, I hit my head', emoji: '💥', value: true },
      ],
    },
  ],
  'sore-throat': [
    {
      id: 'sore-throat-severity',
      text: 'How sore is your throat? 😣',
      answers: [
        { id: 'mild', text: 'Mildly scratchy', emoji: '🙂', value: 'mild' },
        { id: 'moderate', text: 'Quite painful', emoji: '😣', value: 'moderate' },
        { id: 'severe', text: 'Severe pain when swallowing', emoji: '😫', value: 'severe' },
      ],
    },
    {
      id: 'sore-throat-duration',
      text: 'How long has it been sore? ⏱️',
      answers: [
        { id: 'short', text: '1-2 days', emoji: '🕐', value: 'short' },
        { id: 'medium', text: '3-5 days', emoji: '📅', value: 'medium' },
        { id: 'long', text: 'More than 5 days', emoji: '📆', value: 'long' },
      ],
    },
    {
      id: 'sore-throat-other-symptoms',
      text: 'Any other symptoms? 🤔',
      answers: [
        { id: 'none', text: 'Just the sore throat', emoji: '👍', value: 'none' },
        { id: 'cold', text: 'Runny nose/sneezing', emoji: '🤧', value: 'cold' },
        { id: 'fever', text: 'Fever', emoji: '🤒', value: 'fever' },
        { id: 'spots', text: 'White spots in throat', emoji: '👀', value: 'spots' },
      ],
    },
  ],
  'stomach-pain': [
    {
      id: 'stomach-pain-location',
      text: 'Where exactly is the pain? 🤔',
      answers: [
        { id: 'general', text: 'All over abdomen', emoji: '⭕', value: 'general' },
        { id: 'upper', text: 'Upper abdomen', emoji: '⬆️', value: 'upper' },
        { id: 'lower', text: 'Lower abdomen', emoji: '⬇️', value: 'lower' },
        { id: 'right', text: 'Lower right side', emoji: '↘️', value: 'right' },
      ],
    },
    {
      id: 'stomach-pain-severity',
      text: 'How bad is the pain? 😣',
      answers: [
        { id: 'mild', text: 'Mild discomfort', emoji: '🙂', value: 'mild' },
        { id: 'moderate', text: 'Moderate pain', emoji: '😣', value: 'moderate' },
        { id: 'severe', text: 'Severe pain', emoji: '😫', value: 'severe' },
      ],
    },
    {
      id: 'stomach-pain-other-symptoms',
      text: 'Any other symptoms? 🤔',
      answers: [
        { id: 'none', text: 'Just the pain', emoji: '👍', value: 'none' },
        { id: 'nausea', text: 'Nausea or vomiting', emoji: '🤢', value: 'nausea' },
        { id: 'diarrhea', text: 'Diarrhea', emoji: '💨', value: 'diarrhea' },
        { id: 'fever', text: 'Fever', emoji: '🤒', value: 'fever' },
      ],
    },
  ],
  rash: [
    {
      id: 'rash-appearance',
      text: 'What does the rash look like? 👀',
      answers: [
        { id: 'red', text: 'Flat red patches', emoji: '🟥', value: 'red' },
        { id: 'bumps', text: 'Raised bumps', emoji: '🔴', value: 'bumps' },
        { id: 'blisters', text: 'Blisters or pus-filled spots', emoji: '💧', value: 'blisters' },
        { id: 'hives', text: 'Hives or welts', emoji: '🫨', value: 'hives' },
      ],
    },
    {
      id: 'rash-itching',
      text: 'Is it itchy? 🤔',
      answers: [
        { id: 'none', text: 'Not itchy at all', emoji: '👍', value: 'none' },
        { id: 'mild', text: 'Mildly itchy', emoji: '🙂', value: 'mild' },
        { id: 'severe', text: 'Extremely itchy', emoji: '😫', value: 'severe' },
      ],
    },
    {
      id: 'rash-spreading',
      text: 'Is the rash spreading? 👀',
      answers: [
        { id: 'no', text: 'No, staying in one area', emoji: '👍', value: false },
        { id: 'yes', text: 'Yes, it\'s spreading', emoji: '😨', value: true },
      ],
    },
    {
      id: 'rash-other-symptoms',
      text: 'Any other symptoms? 🤔',
      answers: [
        { id: 'none', text: 'Just the rash', emoji: '👍', value: 'none' },
        { id: 'fever', text: 'Fever', emoji: '🤒', value: 'fever' },
        { id: 'breathing', text: 'Difficulty breathing', emoji: '😰', value: 'breathing' },
        { id: 'swelling', text: 'Facial swelling', emoji: '😵', value: 'swelling' },
      ],
    },
  ],
  injury: [
    {
      id: 'injury-type',
      text: 'What kind of injury is it? 🤔',
      answers: [
        { id: 'cut', text: 'Cut or scrape', emoji: '✂️', value: 'cut' },
        { id: 'burn', text: 'Burn', emoji: '🔥', value: 'burn' },
        { id: 'sprain', text: 'Sprain or strain', emoji: '🤕', value: 'sprain' },
        { id: 'suspected-break', text: 'Possible broken bone', emoji: '😨', value: 'suspected-break' },
        { id: 'head', text: 'Head injury', emoji: '💥', value: 'head' },
      ],
    },
    {
      id: 'injury-severity',
      text: 'How severe is it? 😣',
      answers: [
        { id: 'mild', text: 'Mild - minor pain/bleeding', emoji: '🙂', value: 'mild' },
        { id: 'moderate', text: 'Moderate - quite painful', emoji: '😣', value: 'moderate' },
        { id: 'severe', text: 'Severe - extreme pain/bleeding', emoji: '😫', value: 'severe' },
      ],
    },
    {
      id: 'injury-other-symptoms',
      text: 'Any concerning symptoms? 🤔',
      answers: [
        { id: 'none', text: 'No other symptoms', emoji: '👍', value: 'none' },
        { id: 'dizziness', text: 'Dizziness', emoji: '😵', value: 'dizziness' },
        { id: 'nausea', text: 'Nausea or vomiting', emoji: '🤢', value: 'nausea' },
        { id: 'numbness', text: 'Numbness or tingling', emoji: '🥴', value: 'numbness' },
      ],
    },
  ]
};
