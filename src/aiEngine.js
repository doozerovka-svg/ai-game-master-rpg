// AI Game Master Parser & Calibration Engine

// Local Simulated AI Game Master (NLP & Rules Engine)
const ATTRIBUTE_KEYWORDS = {
  str: ['тяжелая', 'атлетика', 'зал', 'жим', 'штанга', 'гантели', 'отжимания', 'подтягивания', 'приседания', 'мышцы', 'силовая', 'пресс', 'турник', 'брусья'],
  end: ['бег', 'пробежал', 'велосипед', 'кардио', 'бассейн', 'плавание', 'лыжи', 'ходьба', 'дорожка', 'шагов', 'дистанция', 'темп', 'велотренажер'],
  agi: ['растяжка', 'йога', 'пилатес', 'гибкость', 'шпагат', 'разминка', 'суставы', 'гимнастика', 'стретчинг', 'плиометрика']
};

const HP_KEYWORDS = ['сон', 'выспался', 'чистое питание', 'вода', 'овощи', 'белок', 'калории', 'отдых', 'медитация'];

const NEGATIVE_KEYWORDS = [
  'бургер', 'кола', 'сладкое', 'фастфуд', 'пиво', 'алкоголь', 'чипсы',
  'пицца', 'тортик', 'конфет', 'шоколад', 'ленился', 'пропустил', 'забыл',
  'не сделал', 'проспал', 'согрешил', 'косяк', 'срыв', 'объелся', 'газировк',
  'пончик', 'фаст-фуд', 'сигарет', 'курил', 'курен', 'кальян', 'вейп', 'электронк', 'табак'
];

const NEGATION_KEYWORDS = ['не ', 'нет', 'отказ', 'избеж', 'преодол', 'без '];

// Calibrate challenge difficulty based on level and onboarding metrics
function calibrateActivity(text, charState) {
  const level = charState.char.level;
  const metrics = charState.metrics || { goal: 'gain', level: 'beginner', badHabit: 'сахар' };
  
  const lowerText = text.toLowerCase();

  // 1. Detect negative action / violation
  let isNegative = false;
  const hasNegativeWord = NEGATIVE_KEYWORDS.some(word => lowerText.includes(word));
  if (hasNegativeWord) {
    const hasNegation = NEGATION_KEYWORDS.some(neg => lowerText.includes(neg));
    if (!hasNegation) {
      isNegative = true;
    }
  }

  if (isNegative) {
    // Deduce severity based on numbers if any
    const numMatch = lowerText.match(/\d+/g);
    let primaryNumber = numMatch ? parseInt(numMatch[0]) : 1;
    
    let damage = 20;
    let bossRageIncrease = 15;
    
    if (lowerText.includes('пять') || lowerText.includes('5')) {
      primaryNumber = 5;
    }
    
    if (primaryNumber > 1) {
      damage = Math.min(50, 20 + primaryNumber * 2);
      bossRageIncrease = Math.min(40, 15 + primaryNumber * 3);
    }
    
    let narrative = `Гейм-Мастер хмурится во тьме. Твой проступок ("${text}") оскверняет волю аватара. Тьма Лени высасывает жизненные силы, а Теневой Босс питается твоей слабостью!`;
    if (lowerText.includes('бургер') || lowerText.includes('кола')) {
      narrative = `Гейм-Мастер с отвращением наблюдает, как ты поглощаешь жирные бургеры и колу. Сила твоего аватара тает, а его доспехи покрываются ржавчиной вины. Получено ${damage} ед. урона.`;
    }
    
    return {
      attribute: 'hp',
      rarity: 'Провал',
      xp: 0,
      damage: damage,
      bossRageIncrease: bossRageIncrease,
      isNegative: true,
      narrative: narrative
    };
  }

  let matchedAttr = null;
  let score = 5; // Base arbitrary score

  // Find attribute category
  for (const [attr, words] of Object.entries(ATTRIBUTE_KEYWORDS)) {
    if (words.some(word => lowerText.includes(word))) {
      matchedAttr = attr;
      break;
    }
  }

  const isHp = HP_KEYWORDS.some(word => lowerText.includes(word));
  if (!matchedAttr && isHp) {
    matchedAttr = 'hp';
  }

  if (!matchedAttr) {
    // Default fallback
    matchedAttr = Math.random() < 0.5 ? 'str' : 'end';
  }

  // Parse numbers (km, reps, min, kg) to adjust score
  const numMatch = lowerText.match(/\d+/g);
  let primaryNumber = numMatch ? parseInt(numMatch[0]) : 10;

  if (matchedAttr === 'end') {
    if (lowerText.includes('км') || lowerText.includes('km')) {
      score = primaryNumber * 12; // 5km = 60 points
    } else if (lowerText.includes('шаг')) {
      score = (primaryNumber / 1000) * 8; // 10000 steps = 80 points
    } else {
      score = primaryNumber * 1.5; // minutes of cardio
    }
  } else if (matchedAttr === 'str') {
    if (lowerText.includes('кг') || lowerText.includes('kg')) {
      score = primaryNumber * 0.8; // 80kg = 64 points
    } else if (lowerText.includes('раз') || lowerText.includes('отжался') || lowerText.includes('присел')) {
      score = primaryNumber * 1.2; // 50 reps = 60 points
    } else {
      score = primaryNumber * 1.0; // minutes of lifting
    }
  } else if (matchedAttr === 'agi') {
    score = primaryNumber * 1.8; // minutes of yoga/stretching
  } else if (matchedAttr === 'hp') {
    score = primaryNumber * 5; // hours of sleep or clean meals
  }

  // CALIBRATION: Apply experience level factor
  // A pro needs 2x more effort to get the same score. A beginner gets a boost.
  if (metrics.level === 'beginner') {
    score *= 1.4;
  } else if (metrics.level === 'pro') {
    score *= 0.65;
  }

  // Rarity scale based on score vs avatar level
  let rarity = 'Common';
  let rarityRu = 'Обычный';
  let xpReward = 30;

  const levelFactor = level * 10;
  const ratio = score / (15 + levelFactor);

  if (ratio >= 2.5) {
    rarity = 'Legendary';
    rarityRu = 'Легендарный';
    xpReward = 150 + level * 10;
  } else if (ratio >= 1.5) {
    rarity = 'Epic';
    rarityRu = 'Эпический';
    xpReward = 100 + level * 5;
  } else if (ratio >= 0.8) {
    rarity = 'Rare';
    rarityRu = 'Редкий';
    xpReward = 60 + level * 2;
  } else {
    rarity = 'Common';
    rarityRu = 'Обычный';
    xpReward = 25 + Math.floor(score * 0.5);
  }

  // Cap max XP
  xpReward = Math.min(250, xpReward);

  // Generate Narratives in Russian
  let narrative = "";
  if (matchedAttr === 'str') {
    if (rarity === 'Common') {
      narrative = "Гейм-Мастер кивает. Твои мышцы наливаются силой, а базовый инвентарь выдерживает нагрузку. Рутина кует характер.";
    } else if (rarity === 'Rare') {
      narrative = "Гейм-Мастер удивлен твоим рвением. Руны на твоем щите вспыхивают фиолетовым светом, закаляя сталь твоих сухожилий.";
    } else {
      narrative = "Гейм-Мастер восхищен! Невероятный подвиг силы сотрясает чертоги. Вокруг твоего аватара вспыхивает багровая аура мощи!";
    }
  } else if (matchedAttr === 'end') {
    if (rarity === 'Common') {
      narrative = "Гейм-Мастер наблюдает за твоим дыханием. Твои шаги легки, легкие насыщаются ветром странствий. Выносливость растет.";
    } else if (rarity === 'Rare') {
      narrative = "Твоя скорость превосходит ожидания. Пыль дорог ложится под твои сапоги, а выносливость кочевника наполняет твой дух.";
    } else {
      narrative = "Эпический забег! Твой аватар оставляет за собой огненный след на карте. Ветры Дисциплины несут тебя сквозь любые преграды!";
    }
  } else if (matchedAttr === 'agi') {
    if (rarity === 'Common') {
      narrative = "Гейм-Мастер видит твою грацию. Связки тянутся, тело обретает гибкость тростника под ветром. Ловкость повышена.";
    } else {
      narrative = "Твои движения плавны и молниеносны. Гейм-Мастер отмечает, как аватар легко уворачивается от невидимых ловушек лени.";
    }
  } else {
    narrative = "Гейм-Мастер благословляет твой покой. Клетки твоего тела восстанавливаются, залечивая раны былых сражений. Жизнь бьет ключом.";
  }

  // Add personalized detail based on body metrics
  let bodyDetail = "";
  const weight = metrics ? metrics.weight : null;
  const height = metrics ? metrics.height : null;
  
  if (weight && height) {
    if (matchedAttr === 'str') {
      bodyDetail = ` При росте ${height} см и весе ${weight} кг силовые тренировки отлично развивают мускулатуру.`;
    } else if (matchedAttr === 'end') {
      if (weight > 90) {
        bodyDetail = ` Учитывая твой вес в ${weight} кг, бег и кардио требуют особой бережности к суставам. Отличная работа над выносливостью!`;
      } else {
        bodyDetail = ` Кардио тренировка развивает сердце и сосуды для твоих ${weight} кг веса.`;
      }
    } else if (matchedAttr === 'agi') {
      bodyDetail = ` Развитие гибкости улучшает осанку и координацию твоего тела при росте ${height} см.`;
    }
  } else if (matchedAttr === 'hp') {
    bodyDetail = ` Забота о восстановлении — важнейший шаг в здоровом образе жизни.`;
  }
  
  narrative += bodyDetail;

  return {
    attribute: matchedAttr,
    rarity: rarityRu,
    xp: xpReward,
    damage: 0,
    bossRageIncrease: 0,
    isNegative: false,
    narrative: narrative
  };
}

// Live Gemini API Call
async function analyzeWithGemini(text, apiKey, charState, imageBase64 = null) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const prompt = `
You are the Game Master (Гейм-Мастер) of a dark fantasy solo RPG life-tracker. The player submits a workout log or daily habit report.
Player Text: "${text}"
Player Current Stats: Level ${charState.char.level}, STR ${charState.attrs.str}, END ${charState.attrs.end}, AGI ${charState.attrs.agi}.
Player Body Metrics: Weight: ${charState.metrics.weight || 'unknown'}kg, Height: ${charState.metrics.height || 'unknown'}cm.

Your task:
1. Detect if the player is reporting a failure, violation of discipline, laziness, or consuming unhealthy food/drink (like burgers, sweets, soda/cola, pizza, beer/alcohol). If they are reporting a violation (e.g. eating burgers/cola, skipping workouts), set "isNegative" to true, "xp" to 0, and assign a "damage" penalty (15 to 45 HP depending on severity) and "bossRageIncrease" (10 to 30% depending on severity). Write a dark, gothic, ominous narrative in Russian reprimanding the player for giving in to temptation.
2. If it is a positive action (workout, healthy habit), set "isNegative" to false, "damage" to 0, "bossRageIncrease" to 0. Categorize this action into one primary attribute: 'str' (strength), 'end' (endurance), 'agi' (agility), or 'hp' (regeneration/sleep/diet).
3. Rate the difficulty/rarity grade of positive actions. Choose one of: 'Обычный' (Common), 'Редкий' (Rare), 'Эпический' (Epic), 'Легендарный' (Legendary). If it is a failure, use 'Провал' for rarity.
4. Assign a numerical XP reward for positive actions (suggested ranges: Common 20-40, Rare 50-80, Epic 90-140, Legendary 150-220).
5. Incorporate the player's height (${charState.metrics.height || 'unknown'}cm) and weight (${charState.metrics.weight || 'unknown'}kg) in your narrative and calibration if relevant. For example, if a player is heavy, running (endurance) has a higher load on joints, which you should acknowledge respectfully in the dark fantasy flavor text.
6. CRITICAL REQUIREMENT: Do NOT reference calorie counting, food calories, or water balance volumes.
7. Write a flavorful 2-sentence RPG narrative in Russian (на русском языке) in a dark gothic fantasy tone detailing how this action translates to the avatar's visual development or state. Keep it atmospheric!

Return ONLY a valid JSON object matching this schema (do not output markdown formatting tags, just raw JSON):
{
  "attribute": "str|end|agi|hp",
  "rarity": "Обычный|Редкий|Эпический|Легендарный|Провал",
  "xp": 50,
  "damage": 0,
  "bossRageIncrease": 0,
  "isNegative": false,
  "narrative": "RPG text in Russian"
}
`;

  const contents = [
    {
      parts: [
        { text: prompt }
      ]
    }
  ];

  if (imageBase64) {
    contents[0].parts.push({
      inlineData: {
        mimeType: "image/jpeg",
        data: imageBase64
      }
    });
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: contents })
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.statusText}`);
  }

  const data = await response.json();
  const rawText = data.candidates[0].content.parts[0].text.trim();
  
  // Clean JSON response (remove markdown code blocks if any)
  const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
  return JSON.parse(cleanJson);
}
// Exported Interface
export const aiEngine = {
  async analyzeActivity(text, apiKey, charState, imageBase64 = null) {
    if (apiKey && apiKey.trim() && !apiKey.includes("Автоматически из .env")) {
      try {
        const result = await analyzeWithGemini(text, apiKey, charState, imageBase64);
        return { ...result, isGemini: true };
      } catch (e) {
        console.warn("Gemini API failed or key is invalid, falling back to local simulator", e);
        const result = calibrateActivity(text, charState);
        return { ...result, isGemini: false };
      }
    } else {
      // Return local simulated response
      return new Promise((resolve) => {
        setTimeout(() => {
          const result = calibrateActivity(text, charState);
          resolve({ ...result, isGemini: false });
        }, 800); // Small delay to feel like "AI thinking"
      });
    }
  }
};
