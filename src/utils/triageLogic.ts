type TriageAnswers = {
  symptomId: string;
  answers: Record<string, string | number | boolean>;
};

export type TriageResult = {
  outcome: 'success' | 'warning' | 'danger';
  title: string;
  emoji: string;
  description: string;
  explanation: string;
  condition?: string;
  compassionateWord?: string;
};

// High-risk combinations that need urgent care
const redFlags: Record<string, (answers: Record<string, string | number | boolean>) => boolean> = {
  'chest-pain': (answers) => {
    // Chest pain with breathing difficulty or radiation to arm/jaw
    return (
      answers['chest-pain-breathing'] === true || 
      answers['chest-pain-radiation'] === true || 
      answers['chest-pain-type'] === 'pressure'
    );
  },
  headache: (answers) => {
    // Severe headache with other concerning symptoms
    return (
      (answers['headache-severity'] === 'severe' && answers['headache-other-symptoms'] === 'neck') ||
      (answers['headache-injury'] === true && answers['headache-other-symptoms'] === 'nausea')
    );
  },
  fever: (answers) => {
    // Very high fever or fever with severe symptoms
    return (
      answers['fever-temp'] === 'high' ||
      answers['fever-other-symptoms'] === 'severe' ||
      (answers['fever-temp'] === 'medium' && answers['fever-duration'] === 'long')
    );
  },
  injury: (answers) => {
    // Head injury with concerning symptoms
    return (
      (answers['injury-type'] === 'head' && answers['injury-other-symptoms'] !== 'none') ||
      answers['injury-severity'] === 'severe' ||
      answers['injury-type'] === 'suspected-break'
    );
  },
  rash: (answers) => {
    // Rash with breathing difficulty or facial swelling
    return (
      answers['rash-other-symptoms'] === 'breathing' ||
      answers['rash-other-symptoms'] === 'swelling'
    );
  },
  'mental-health': (answers) => {
    // Critical mental health red flags - suicidal thoughts or severe depression
    return (
      answers['mental-health-thoughts'] === 'yes' ||
      (answers['mental-health-mood'] === 'very-low' && answers['mental-health-duration'] === 'weeks')
    );
  }
};

// Medium-risk combinations that need medical attention soon
const warningFlags: Record<string, (answers: Record<string, string | number | boolean>) => boolean> = {
  'chest-pain': (answers) => {
    return (
      answers['chest-pain-type'] === 'sharp' ||
      answers['chest-pain-duration'] === 'days'
    );
  },
  headache: (answers) => {
    return (
      answers['headache-severity'] === 'severe' ||
      answers['headache-duration'] === 'week' ||
      answers['headache-other-symptoms'] === 'vision'
    );
  },
  fever: (answers) => {
    return (
      answers['fever-temp'] === 'medium' ||
      answers['fever-duration'] === 'long' ||
      answers['fever-other-symptoms'] === 'rash'
    );
  },
  'sore-throat': (answers) => {
    return (
      answers['sore-throat-severity'] === 'severe' ||
      (answers['sore-throat-duration'] === 'long' && answers['sore-throat-other-symptoms'] === 'spots')
    );
  },
  cough: (answers) => {
    return (
      answers['cough-breathing'] === 'severe' ||
      (answers['cough-duration'] === 'long' && answers['cough-type'] === 'productive')
    );
  },
  'stomach-pain': (answers) => {
    return (
      answers['stomach-pain-severity'] === 'severe' ||
      answers['stomach-pain-location'] === 'right' ||
      (answers['stomach-pain-other-symptoms'] === 'fever')
    );
  },
  rash: (answers) => {
    return (
      answers['rash-spreading'] === true ||
      answers['rash-other-symptoms'] === 'fever'
    );
  },
  injury: (answers) => {
    return (
      answers['injury-severity'] === 'moderate' ||
      answers['injury-type'] === 'burn' ||
      answers['injury-other-symptoms'] === 'numbness'
    );
  },
  'mental-health': (answers) => {
    // Warning mental health flags - persistent anxiety, sleep issues
    return (
      answers['mental-health-anxiety'] === 'often' ||
      answers['mental-health-sleep'] === 'significant' ||
      answers['mental-health-mood'] === 'low'
    );
  }
};

export function evaluateTriage(triageData: TriageAnswers): TriageResult {
  const { symptomId, answers } = triageData;
  
  // Check for red flags first - highest priority
  if (redFlags[symptomId] && redFlags[symptomId](answers)) {
    return generateDangerOutcome(symptomId, answers);
  }
  
  // Check for warning flags next
  if (warningFlags[symptomId] && warningFlags[symptomId](answers)) {
    return generateWarningOutcome(symptomId, answers);
  }
  
  // If no flags were triggered, it's likely safe to manage at home
  return generateSuccessOutcome(symptomId, answers);
}

function generateDangerOutcome(symptomId: string, answers: Record<string, string | number | boolean>): TriageResult {
  const outcomes: Record<string, TriageResult> = {
    'chest-pain': {
      outcome: 'danger',
      title: 'Please seek urgent medical care',
      emoji: '🚨',
      description: 'These chest pain symptoms need immediate attention.',
      explanation: "Chest pain with breathing difficulty or that radiates to your arm, jaw, or back could be signs of a serious heart condition. It's best to get this checked right away, honey!",
      condition: "Possible heart-related condition"
    },
    headache: {
      outcome: 'danger',
      title: 'Please seek urgent medical care',
      emoji: '🚨',
      description: 'Your headache symptoms need immediate attention.',
      explanation: answers['headache-injury'] === true 
        ? "Head injuries with nausea or vomiting could indicate something serious. Better safe than sorry, let's get this checked now!" 
        : "Severe headache with a stiff neck could indicate a serious condition like meningitis. Please don't wait to get help!"
    },
    fever: {
      outcome: 'danger',
      title: 'Please seek urgent medical care',
      emoji: '🚨',
      description: 'Your fever requires immediate medical attention.',
      explanation: "High fevers or fevers with severe headache or stiff neck can be signs of serious infections. Trust me, this isn't something to wait on!"
    },
    injury: {
      outcome: 'danger',
      title: 'Please seek urgent medical care',
      emoji: '🚨',
      description: 'Your injury needs immediate attention.',
      explanation: answers['injury-type'] === 'head' 
        ? "Head injuries with symptoms like dizziness or nausea need immediate evaluation. This isn't something to mess around with!" 
        : "Severe injuries or possible broken bones need proper medical care. Let's get you fixed up properly!"
    },
    rash: {
      outcome: 'danger',
      title: 'Please seek urgent medical care',
      emoji: '🚨',
      description: 'Your rash symptoms need immediate attention.',
      explanation: "A rash with breathing difficulties or facial swelling could indicate a severe allergic reaction. This requires immediate medical attention!"
    },
    'mental-health': {
      outcome: 'danger',
      title: 'Please reach out right now',
      emoji: '🚨',
      description: 'You matter and we\'re with you ❤️',
      explanation: "Having thoughts of giving up or persistent severe low mood are serious signs your mind needs immediate support. Please connect with a mental health professional today - you deserve care and there are people who want to help.",
      condition: "Possible severe depression or crisis"
    },
    // Default response if no specific match
    default: {
      outcome: 'danger',
      title: 'Please seek urgent medical care',
      emoji: '🚨',
      description: 'Your symptoms need immediate attention.',
      explanation: "Based on what you've described, these symptoms could indicate something serious that needs immediate evaluation. Better to be safe!"
    }
  };

  return outcomes[symptomId] || outcomes.default;
}

function generateWarningOutcome(symptomId: string, answers: Record<string, string | number | boolean>): TriageResult {
  const outcomes: Record<string, TriageResult> = {
    'chest-pain': {
      outcome: 'warning',
      title: 'Best to call a doctor soon',
      emoji: '⚠️',
      description: 'Your chest pain should be evaluated by a healthcare provider.',
      explanation: "While this doesn't seem immediately life-threatening, chest pain should always be checked out. Try to get an appointment in the next day or so!",
      condition: "Possible musculoskeletal pain or mild heart issue"
    },
    headache: {
      outcome: 'warning',
      title: 'Best to call a doctor soon',
      emoji: '⚠️',
      description: 'Your headache should be evaluated.',
      explanation: "Severe or prolonged headaches, especially with vision changes, should be checked by a doctor. Let's not take chances with your noggin!"
    },
    fever: {
      outcome: 'warning',
      title: 'Best to call a doctor soon',
      emoji: '⚠️',
      description: 'Your fever should be evaluated.',
      explanation: "A moderate fever that's lasted for several days or comes with a rash should be checked out. Your body is telling you something!"
    },
    'sore-throat': {
      outcome: 'warning',
      title: 'Best to call a doctor soon',
      emoji: '⚠️',
      description: 'Your sore throat should be evaluated.',
      explanation: "A severe or prolonged sore throat, especially with white spots, could be strep throat or another infection that needs treatment. Time to get this looked at!"
    },
    cough: {
      outcome: 'warning',
      title: 'Best to call a doctor soon',
      emoji: '⚠️',
      description: 'Your cough should be evaluated.',
      explanation: "A cough with breathing difficulties or one that's productive and lasting a long time should be checked out. Let's make sure your lungs are happy!"
    },
    'stomach-pain': {
      outcome: 'warning',
      title: 'Best to call a doctor soon',
      emoji: '⚠️',
      description: 'Your stomach pain should be evaluated.',
      explanation: answers['stomach-pain-location'] === 'right'
        ? "Pain in the lower right abdomen could potentially be appendicitis or another condition requiring attention. This needs a professional opinion!"
        : "Severe abdominal pain or pain with fever should be evaluated by a healthcare provider. Your tummy deserves some professional care!"
    },
    rash: {
      outcome: 'warning',
      title: 'Best to call a doctor soon',
      emoji: '⚠️',
      description: 'Your rash should be evaluated.',
      explanation: "A spreading rash or one accompanied by fever could indicate an infection or other condition that needs treatment. Let's get those spots checked out!"
    },
    injury: {
      outcome: 'warning',
      title: 'Best to call a doctor soon',
      emoji: '⚠️',
      description: 'Your injury should be evaluated.',
      explanation: "Moderate injuries, burns, or injuries with numbness should be properly assessed. No need to tough this one out alone!"
    },
    'mental-health': {
      outcome: 'warning',
      title: 'Talking to someone might really help',
      emoji: '⚠️',
      description: "You're not alone 💬",
      explanation: "It sounds like you've been going through a tough time with your mental health. Speaking with a counselor or therapist could provide valuable support and coping strategies. Your feelings are valid and deserve attention.",
      condition: "Possible anxiety or mild depression"
    },
    // Default response if no specific match
    default: {
      outcome: 'warning',
      title: 'Best to call a doctor soon',
      emoji: '⚠️',
      description: 'Your symptoms should be evaluated.',
      explanation: "Based on what you've told me, it would be a good idea to have a healthcare provider take a look at this in the next day or so. Better to be cautious!"
    }
  };

  return outcomes[symptomId] || outcomes.default;
}

function generateSuccessOutcome(symptomId: string, answers: Record<string, string | number | boolean>): TriageResult {
  const outcomes: Record<string, TriageResult> = {
    'chest-pain': {
      outcome: 'success',
      title: "You're probably okay",
      emoji: '✅',
      description: 'Monitor your symptoms at home.',
      explanation: "Mild chest discomfort without other concerning symptoms can often be due to muscle strain or mild heartburn. Rest and take it easy, but if anything changes, don't hesitate to reach out for help!",
      condition: "Likely muscle strain or mild indigestion"
    },
    headache: {
      outcome: 'success',
      title: "You're probably okay",
      emoji: '✅',
      description: 'Rest and monitor your symptoms.',
      explanation: "Mild to moderate headaches without other symptoms are often due to tension, dehydration, or lack of sleep. Try drinking water, resting in a dark room, and taking over-the-counter pain relievers if needed!"
    },
    fever: {
      outcome: 'success',
      title: "You're probably okay",
      emoji: '✅',
      description: 'Rest, hydrate, and monitor your symptoms.',
      explanation: "Low-grade fevers of short duration are often part of your body fighting off a minor infection. Rest, drink plenty of fluids, and use fever reducers if needed. You've got this!"
    },
    'sore-throat': {
      outcome: 'success',
      title: "You're probably okay",
      emoji: '✅',
      description: 'Rest your voice and stay hydrated.',
      explanation: "Mild to moderate sore throats without other concerning symptoms are often viral and resolve on their own. Warm tea with honey, throat lozenges, and rest can help you feel better!"
    },
    cough: {
      outcome: 'success',
      title: "You're probably okay",
      emoji: '✅',
      description: 'Rest and monitor your symptoms.',
      explanation: "Mild coughs without breathing difficulties are often due to minor irritations or viruses. Stay hydrated, use cough drops if needed, and get plenty of rest. Your body knows what to do!"
    },
    'stomach-pain': {
      outcome: 'success',
      title: "You're probably okay",
      emoji: '✅',
      description: 'Rest your digestive system.',
      explanation: "Mild abdominal discomfort without other concerning symptoms is often due to gas, indigestion, or minor stomach bugs. Try a bland diet, stay hydrated, and let your tummy settle down!"
    },
    rash: {
      outcome: 'success',
      title: "You're probably okay",
      emoji: '✅',
      description: 'Monitor your rash for changes.',
      explanation: "Mild, non-spreading rashes without other symptoms are often due to minor irritations or allergies. Keep the area clean, avoid scratching, and try over-the-counter anti-itch cream if needed!"
    },
    injury: {
      outcome: 'success',
      title: "You're probably okay",
      emoji: '✅',
      description: 'Rest and care for your injury at home.',
      explanation: "Minor cuts, scrapes, or strains can typically be managed at home. Clean wounds with soap and water, apply antibiotic ointment and bandages. For strains, remember RICE: Rest, Ice, Compression, and Elevation!"
    },
    'mental-health': {
      outcome: 'success',
      title: "Rough patch? You've got this 💛",
      emoji: '✅',
      description: 'Take it slow today.',
      explanation: "Everyone has ups and downs, and it sounds like you're managing yours well. Keep up your self-care routine, and remember that it's always okay to reach out if things change.",
      condition: "Normal life stressors"
    },
    // Default response if no specific match
    default: {
      outcome: 'success',
      title: "You're probably okay",
      emoji: '✅',
      description: 'Rest and monitor your symptoms.',
      explanation: "Based on what you've shared, your symptoms seem mild and can typically be managed at home with rest and self-care. If things change or worsen, don't hesitate to check back in!"
    }
  };

  return outcomes[symptomId] || outcomes.default;
}
