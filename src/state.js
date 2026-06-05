// Global Game State Management for AI Game Master RPG

// =====================================================
// ITEM CATALOG — All obtainable items with rarity tiers
// =====================================================
export const ITEM_CATALOG = {
  // ===== WEAPONS (STR stat) =====
  weapon_club: {
    id: 'weapon_club',
    name: 'Деревянная Дубина',
    slot: 'weapon',
    rarity: 'common',
    stat: 'str',
    bonus: 3,
    icon: '🪵',
    image: 'item_weapon_common.png',
    desc: 'Грубое оружие из тёмного дуба. Первый шаг на пути силача.',
    unlockType: 'str_streak',
    unlockCount: 2,
    rarityColor: '#9ca3af'
  },
  weapon_iron_sword: {
    id: 'weapon_iron_sword',
    name: 'Железный Гладиус',
    slot: 'weapon',
    rarity: 'rare',
    stat: 'str',
    bonus: 6,
    icon: '⚔️',
    image: 'item_weapon_rare.png',
    desc: 'Надёжный клинок опытного воина. Сотни отжиманий закалили руку.',
    unlockType: 'str_streak',
    unlockCount: 5,
    rarityColor: '#60a5fa'
  },
  weapon_runic_blade: {
    id: 'weapon_runic_blade',
    name: 'Рунический Клинок',
    slot: 'weapon',
    rarity: 'epic',
    stat: 'str',
    bonus: 12,
    icon: '🔮',
    image: 'item_weapon_epic.png',
    desc: 'Клинок покрыт древними рунами Силы. Каждый удар отзывается магией.',
    unlockType: 'str_streak',
    unlockCount: 10,
    rarityColor: '#a855f7'
  },
  weapon_flame_sword: {
    id: 'weapon_flame_sword',
    name: 'Пламенный Меч Легенды',
    slot: 'weapon',
    rarity: 'legendary',
    stat: 'str',
    bonus: 22,
    icon: '🔥',
    image: 'item_weapon_legendary.png',
    desc: 'Оружие богов. Лишь тот, кто не отступал НИКОГДА, может держать его.',
    unlockType: 'str_streak',
    unlockCount: 20,
    rarityColor: '#f59e0b'
  },

  // ===== SHIELDS / OFFHAND (maxHP stat) =====
  shield_wood: {
    id: 'shield_wood',
    name: 'Деревянный Щит',
    slot: 'offhand',
    rarity: 'common',
    stat: 'hp',
    bonus: 10,
    icon: '🛡️',
    image: 'item_shield.png',
    desc: 'Простой щит из досок. Слабая, но хоть какая-то защита.',
    unlockType: 'habit_streak',
    unlockCount: 2,
    rarityColor: '#9ca3af'
  },
  shield_iron: {
    id: 'shield_iron',
    name: 'Железный Бастион',
    slot: 'offhand',
    rarity: 'rare',
    stat: 'hp',
    bonus: 20,
    icon: '🛡️',
    image: 'item_shield.png',
    desc: 'Прочный железный щит. Дни чистой воли куют стальную защиту.',
    unlockType: 'habit_streak',
    unlockCount: 5,
    rarityColor: '#60a5fa'
  },
  shield_runic: {
    id: 'shield_runic',
    name: 'Рунический Щит',
    slot: 'offhand',
    rarity: 'epic',
    stat: 'hp',
    bonus: 35,
    icon: '🔷',
    image: 'item_shield.png',
    desc: 'Щит с магическими рунами отражает урон Тени.',
    unlockType: 'habit_streak',
    unlockCount: 12,
    rarityColor: '#a855f7'
  },
  shield_eternal_will: {
    id: 'shield_eternal_will',
    name: 'Щит Вечной Воли',
    slot: 'offhand',
    rarity: 'legendary',
    stat: 'hp',
    bonus: 60,
    icon: '⚡',
    image: 'item_shield.png',
    desc: 'Непробиваемая защита тех, кто никогда не сдаётся.',
    unlockType: 'habit_streak',
    unlockCount: 25,
    rarityColor: '#f59e0b'
  },

  // ===== HELMETS (STR stat) =====
  helmet_leather: {
    id: 'helmet_leather',
    name: 'Кожаный Шлем',
    slot: 'helmet',
    rarity: 'common',
    stat: 'str',
    bonus: 2,
    icon: '🪖',
    image: 'item_helmet_common.png',
    desc: 'Потрёпанный кожаный шлем странника.',
    unlockType: 'total_workouts',
    unlockCount: 3,
    rarityColor: '#9ca3af'
  },
  helmet_iron: {
    id: 'helmet_iron',
    name: 'Железный Шлем',
    slot: 'helmet',
    rarity: 'rare',
    stat: 'str',
    bonus: 5,
    icon: '⛑️',
    image: 'item_helmet_common.png',
    desc: 'Крепкий железный шлем воина.',
    unlockType: 'total_workouts',
    unlockCount: 8,
    rarityColor: '#60a5fa'
  },
  helmet_runic: {
    id: 'helmet_runic',
    name: 'Рунический Шлем',
    slot: 'helmet',
    rarity: 'epic',
    stat: 'str',
    bonus: 10,
    icon: '🔮',
    image: 'item_helmet_epic.png',
    desc: 'Рогатый шлем с светящимися рунами ярости.',
    unlockType: 'total_workouts',
    unlockCount: 15,
    rarityColor: '#a855f7'
  },
  helmet_crown: {
    id: 'helmet_crown',
    name: 'Корона Чемпиона',
    slot: 'helmet',
    rarity: 'legendary',
    stat: 'str',
    bonus: 18,
    icon: '👑',
    image: 'item_helmet_legendary.png',
    desc: 'Золотая корона для тех, кто победил Тень 3 раза.',
    unlockType: 'boss_wins',
    unlockCount: 3,
    rarityColor: '#f59e0b'
  },

  // ===== BOOTS (END stat) =====
  boots_leather: {
    id: 'boots_leather',
    name: 'Кожаные Сапоги',
    slot: 'feet',
    rarity: 'common',
    stat: 'end',
    bonus: 3,
    icon: '🥾',
    image: 'item_boots.png',
    desc: 'Удобные кожаные сапоги для первых пробежек.',
    unlockType: 'end_streak',
    unlockCount: 2,
    rarityColor: '#9ca3af'
  },
  boots_iron: {
    id: 'boots_iron',
    name: 'Крылатые Сапоги',
    slot: 'feet',
    rarity: 'rare',
    stat: 'end',
    bonus: 6,
    icon: '🥾',
    image: 'item_boots.png',
    desc: 'Сапоги со стальными крыльями у лодыжек.',
    unlockType: 'end_streak',
    unlockCount: 5,
    rarityColor: '#60a5fa'
  },
  boots_speed: {
    id: 'boots_speed',
    name: 'Сапоги Скорости',
    slot: 'feet',
    rarity: 'epic',
    stat: 'end',
    bonus: 12,
    icon: '💨',
    image: 'item_boots.png',
    desc: 'Каждый шаг превращается в молнию.',
    unlockType: 'end_streak',
    unlockCount: 12,
    rarityColor: '#a855f7'
  },
  boots_wind: {
    id: 'boots_wind',
    name: 'Сапоги Ветра',
    slot: 'feet',
    rarity: 'legendary',
    stat: 'end',
    bonus: 22,
    icon: '🌪️',
    image: 'item_boots.png',
    desc: 'Для тех, кто никогда не останавливается.',
    unlockType: 'end_streak',
    unlockCount: 20,
    rarityColor: '#f59e0b'
  },

  // ===== AMULETS / NECK (AGI stat) =====
  amulet_stone: {
    id: 'amulet_stone',
    name: 'Амулет Камня',
    slot: 'neck',
    rarity: 'common',
    stat: 'agi',
    bonus: 3,
    icon: '🔮',
    image: 'item_amulet.png',
    desc: 'Оберег из тёмного камня. Тело становится гибким.',
    unlockType: 'agi_streak',
    unlockCount: 2,
    rarityColor: '#9ca3af'
  },
  amulet_silver: {
    id: 'amulet_silver',
    name: 'Серебряный Медальон',
    slot: 'neck',
    rarity: 'rare',
    stat: 'agi',
    bonus: 6,
    icon: '🌙',
    image: 'item_amulet.png',
    desc: 'Серебряный медальон усиливает реакцию.',
    unlockType: 'agi_streak',
    unlockCount: 5,
    rarityColor: '#60a5fa'
  },
  amulet_magic: {
    id: 'amulet_magic',
    name: 'Магический Кристалл',
    slot: 'neck',
    rarity: 'epic',
    stat: 'agi',
    bonus: 12,
    icon: '💎',
    image: 'item_amulet.png',
    desc: 'Кристалл резонирует с каждым движением тела.',
    unlockType: 'agi_streak',
    unlockCount: 12,
    rarityColor: '#a855f7'
  },
  amulet_soul: {
    id: 'amulet_soul',
    name: 'Амулет Духа Воли',
    slot: 'neck',
    rarity: 'legendary',
    stat: 'agi',
    bonus: 22,
    icon: '⚡',
    image: 'item_amulet.png',
    desc: 'Артефакт, дарующий скорость мысли.',
    unlockType: 'agi_streak',
    unlockCount: 20,
    rarityColor: '#f59e0b'
  },

  // ===== GLOVES / HANDS (STR stat) =====
  gloves_leather: {
    id: 'gloves_leather',
    name: 'Кожаные Перчатки',
    slot: 'hands',
    rarity: 'common',
    stat: 'str',
    bonus: 2,
    icon: '🥊',
    image: 'item_gloves.png',
    desc: 'Кожаные перчатки защищают руки при тренировках.',
    unlockType: 'str_streak',
    unlockCount: 4,
    rarityColor: '#9ca3af'
  },
  gloves_iron: {
    id: 'gloves_iron',
    name: 'Железные Рукавицы',
    slot: 'hands',
    rarity: 'rare',
    stat: 'str',
    bonus: 5,
    icon: '🦾',
    image: 'item_gloves.png',
    desc: 'Тяжёлые рукавицы из вороненой стали.',
    unlockType: 'str_streak',
    unlockCount: 8,
    rarityColor: '#60a5fa'
  },
  gloves_power: {
    id: 'gloves_power',
    name: 'Перчатки Мощи',
    slot: 'hands',
    rarity: 'epic',
    stat: 'str',
    bonus: 10,
    icon: '💪',
    image: 'item_gloves.png',
    desc: 'Усиливают каждый удар трёхкратно.',
    unlockType: 'str_streak',
    unlockCount: 15,
    rarityColor: '#a855f7'
  },
  gloves_titan: {
    id: 'gloves_titan',
    name: 'Рукавицы Титана',
    slot: 'hands',
    rarity: 'legendary',
    stat: 'str',
    bonus: 20,
    icon: '⚡',
    image: 'item_gloves.png',
    desc: 'Сила Титана буквально в твоих руках.',
    unlockType: 'str_streak',
    unlockCount: 25,
    rarityColor: '#f59e0b'
  },

  // ===== RINGS (HP stat) =====
  ring_bronze: {
    id: 'ring_bronze',
    name: 'Бронзовое Кольцо',
    slot: 'ring',
    rarity: 'common',
    stat: 'hp',
    bonus: 8,
    icon: '💍',
    image: null,
    desc: 'Простое кольцо. Маленькая стойкость.',
    unlockType: 'habit_streak',
    unlockCount: 4,
    rarityColor: '#9ca3af'
  },
  ring_silver: {
    id: 'ring_silver',
    name: 'Серебряное Кольцо',
    slot: 'ring',
    rarity: 'rare',
    stat: 'hp',
    bonus: 15,
    icon: '💍',
    image: null,
    desc: 'Изящное серебро увеличивает жизнестойкость.',
    unlockType: 'habit_streak',
    unlockCount: 8,
    rarityColor: '#60a5fa'
  },
  ring_rebirth: {
    id: 'ring_rebirth',
    name: 'Кольцо Возрождения',
    slot: 'ring',
    rarity: 'epic',
    stat: 'hp',
    bonus: 25,
    icon: '♾️',
    image: null,
    desc: 'Это кольцо восстанавливает жизнь в критический момент.',
    unlockType: 'habit_streak',
    unlockCount: 15,
    rarityColor: '#a855f7'
  },
  ring_eternity: {
    id: 'ring_eternity',
    name: 'Перстень Вечности',
    slot: 'ring',
    rarity: 'legendary',
    stat: 'hp',
    bonus: 40,
    icon: '🌟',
    image: null,
    desc: 'Бессмертие для тех, кто не знает поражений.',
    unlockType: 'boss_wins',
    unlockCount: 5,
    rarityColor: '#f59e0b'
  },
};

// Unlock check for items — returns list of newly unlocked item IDs
export function checkItemUnlocks(state) {
  const newItems = [];
  const allOwnedIds = [
    ...state.inventory,
    ...Object.values(state.equipped).filter(Boolean)
  ];

  for (const [itemId, item] of Object.entries(ITEM_CATALOG)) {
    if (allOwnedIds.includes(itemId)) continue;

    let unlocked = false;
    switch (item.unlockType) {
      case 'str_streak':
        unlocked = state.streaks.str >= item.unlockCount;
        break;
      case 'end_streak':
        unlocked = state.streaks.end >= item.unlockCount;
        break;
      case 'agi_streak':
        unlocked = state.streaks.agi >= item.unlockCount;
        break;
      case 'habit_streak':
        unlocked = state.streaks.habit >= item.unlockCount;
        break;
      case 'total_workouts':
        unlocked = state.streaks.totalWorkouts >= item.unlockCount;
        break;
      case 'boss_wins':
        unlocked = (state.boss.wins || 0) >= item.unlockCount;
        break;
    }

    if (unlocked) {
      newItems.push(itemId);
    }
  }
  return newItems;
}

// =====================================================
// DAILY CONTRACT POOL
// =====================================================
const DAILY_POOL = [
  { id: 'pushups_20', text: 'Отжаться 20 раз', attr: 'str', xp: 20, gp: 5, icon: '💪' },
  { id: 'pushups_30', text: 'Отжаться 30 раз', attr: 'str', xp: 30, gp: 8, icon: '💪' },
  { id: 'pullups_10', text: 'Подтянуться 10 раз', attr: 'str', xp: 25, gp: 7, icon: '🏋️' },
  { id: 'squats_30', text: 'Присесть 30 раз', attr: 'str', xp: 20, gp: 5, icon: '🦵' },
  { id: 'squats_50', text: 'Присесть 50 раз', attr: 'str', xp: 35, gp: 10, icon: '🦵' },
  { id: 'plank_60', text: 'Планка 60 секунд', attr: 'str', xp: 18, gp: 5, icon: '🧗' },
  { id: 'run_2km', text: 'Пробежать 2 км', attr: 'end', xp: 28, gp: 8, icon: '🏃' },
  { id: 'run_5km', text: 'Пробежать 5 км', attr: 'end', xp: 55, gp: 15, icon: '🏃' },
  { id: 'walk_30min', text: 'Прогуляться 30 минут', attr: 'end', xp: 15, gp: 4, icon: '🚶' },
  { id: 'bike_20min', text: 'Велосипед 20 минут', attr: 'end', xp: 22, gp: 6, icon: '🚴' },
  { id: 'swim_30min', text: 'Плавать 30 минут', attr: 'end', xp: 35, gp: 10, icon: '🏊' },
  { id: 'steps_8000', text: '8000 шагов за день', attr: 'end', xp: 25, gp: 7, icon: '👟' },
  { id: 'yoga_20min', text: 'Йога или растяжка 20 мин', attr: 'agi', xp: 20, gp: 5, icon: '🧘' },
  { id: 'stretch_15min', text: 'Растяжка 15 минут', attr: 'agi', xp: 14, gp: 4, icon: '🤸' },
  { id: 'no_junk', text: 'День без фастфуда', attr: 'hp', xp: 18, gp: 5, icon: '🥗' },
  { id: 'sleep_8h', text: 'Спать 8 часов', attr: 'hp', xp: 16, gp: 4, icon: '😴' },
  { id: 'water_2l', text: 'Выпить достаточно воды', attr: 'hp', xp: 10, gp: 3, icon: '💧' },
  { id: 'meditation_10min', text: 'Медитация 10 минут', attr: 'agi', xp: 15, gp: 4, icon: '🧠' },
  { id: 'no_sweets', text: 'День без сладкого', attr: 'hp', xp: 20, gp: 6, icon: '🍎' },
  { id: 'core_workout', text: 'Тренировка пресса (3 сета)', attr: 'str', xp: 22, gp: 6, icon: '🏋️' },
];

// =====================================================
// DEFAULT STATE
// =====================================================
const DEFAULT_STATE = {
  onboarded: true,
  metrics: {
    weight: null,
    height: null
  },
  char: {
    level: 1,
    xp: 0,
    xpNeeded: 100,
    hp: 100,
    maxHp: 100,
    gold: 50,
    willpower: 0,
    title: 'Странник',
    classTitle: 'Ученик Гейм-Мастера'
  },
  attrs: {
    str: 10,
    end: 10,
    agi: 10,
    str_xp: 0,
    end_xp: 0,
    agi_xp: 0
  },
  inventory: [],     // Array of item IDs in bag
  equipped: {
    weapon: null,    // weapon slot
    offhand: null,   // shield/offhand slot
    helmet: null,    // head slot
    feet: null,      // boots slot
    neck: null,      // amulet slot
    hands: null,     // gloves slot
    ring: null,      // ring slot
  },
  streaks: {
    str: 0,
    end: 0,
    agi: 0,
    habit: 0,
    totalWorkouts: 0
  },
  buffs: [],
  debuffs: {},
  rustLevel: 0,
  boss: {
    rage: 30,
    lastFightTime: 0,
    wins: 0
  },
  dailies: [],
  dailiesGeneratedDate: '',
  logs: [],
  sync: {
    code: '',
    enabled: false
  },
  apiKey: '',
  lastPureWillDeclaration: 0,
  lastWeighInTime: 0,
  lastChecked: Date.now(),
  lastActivityTime: Date.now()
};

let currentState = JSON.parse(JSON.stringify(DEFAULT_STATE));
let onStateChangeCallback = null;

// =====================================================
// STATE HELPERS
// =====================================================

export function saveState() {
  localStorage.setItem('ai_rpg_state', JSON.stringify(currentState));
  if (onStateChangeCallback) onStateChangeCallback(currentState);
  if (currentState.sync.enabled && currentState.sync.code) {
    window.dispatchEvent(new CustomEvent('sync-push-state'));
  }
}

export function loadState() {
  const saved = localStorage.getItem('ai_rpg_state');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      currentState = { ...DEFAULT_STATE, ...parsed };
      currentState.char = { ...DEFAULT_STATE.char, ...parsed.char };
      currentState.attrs = { ...DEFAULT_STATE.attrs, ...parsed.attrs };
      currentState.boss = { ...DEFAULT_STATE.boss, ...parsed.boss };
      currentState.sync = { ...DEFAULT_STATE.sync, ...parsed.sync };
      currentState.metrics = { ...DEFAULT_STATE.metrics, ...parsed.metrics };
      currentState.equipped = { ...DEFAULT_STATE.equipped, ...parsed.equipped };
      currentState.streaks = { ...DEFAULT_STATE.streaks, ...parsed.streaks };
    } catch (e) {
      console.error('Failed to parse saved state', e);
      currentState = JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
  } else {
    currentState = JSON.parse(JSON.stringify(DEFAULT_STATE));
    addLogEntry('Система', 'Аватар создан! Введите параметры тела на вкладке Задания.', 'system');
  }
  refreshDailiesIfNeeded();
  processElapsedTime();
  saveState();
}

export function getState() {
  return currentState;
}

export function resetState() {
  currentState = JSON.parse(JSON.stringify(DEFAULT_STATE));
  refreshDailiesIfNeeded();
  addLogEntry('Система', 'Прогресс аватара полностью сброшен.', 'system');
  saveState();
}

export function registerOnStateChange(callback) {
  onStateChangeCallback = callback;
}

export function addLogEntry(speaker, text, type = 'gm', rewardText = '') {
  currentState.logs.unshift({
    id: Math.random().toString(36).substr(2, 9),
    timestamp: Date.now(),
    speaker, text, type, rewardText
  });
  if (currentState.logs.length > 50) currentState.logs.pop();
}

// =====================================================
// DAILIES
// =====================================================

function getTodayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function generateDailies() {
  const shuffled = [...DAILY_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3).map(c => ({ ...c, completed: false, completedAt: null }));
}

export function refreshDailiesIfNeeded() {
  const today = getTodayStr();
  if (currentState.dailiesGeneratedDate !== today) {
    if (currentState.dailiesGeneratedDate && currentState.dailies.length > 0) {
      const unfinished = currentState.dailies.filter(d => !d.completed).length;
      if (unfinished > 0) {
        modifyBossRage(unfinished * 10);
        addLogEntry('Гейм-Мастер',
          `Вчера выполнено ${3 - unfinished} из 3 контрактов. Тень питается невыполненными обещаниями! (+${unfinished * 10}% ярости)`,
          'rust');
      }
    }
    currentState.dailies = generateDailies();
    currentState.dailiesGeneratedDate = today;
  }
}

export function completeDaily(index) {
  if (index < 0 || index >= currentState.dailies.length) return false;
  const daily = currentState.dailies[index];
  if (daily.completed) return false;

  daily.completed = true;
  daily.completedAt = Date.now();

  gainXp(daily.xp, daily.attr);
  currentState.char.gold += daily.gp;

  addLogEntry('Контракт', `✅ Контракт выполнен: "${daily.text}"`, 'gm', `Награда: +${daily.xp} XP | +${daily.gp} GP`);
  window.dispatchEvent(new CustomEvent('play-sound', { detail: 'xp' }));
  saveState();
  return true;
}

// =====================================================
// ELAPSED TIME & DECAY
// =====================================================

export function processElapsedTime() {
  const now = Date.now();
  const elapsedMs = now - currentState.lastChecked;
  if (elapsedMs <= 0) return;

  const msInHour = 3600000;
  const elapsedHours = elapsedMs / msInHour;

  if (currentState.debuffs['heavy-legs']) {
    currentState.debuffs['heavy-legs'] -= elapsedHours;
    if (currentState.debuffs['heavy-legs'] <= 0) {
      delete currentState.debuffs['heavy-legs'];
      addLogEntry('Система', "Дебафф 'Тяжелые ноги' спал. Полный опыт восстановлен!", 'system');
    }
  }
  currentState.lastChecked = now;
}

export function triggerInactivityDecay() {
  const shieldIdx = currentState.buffs.indexOf('frost-shield');
  if (shieldIdx > -1) {
    currentState.buffs.splice(shieldIdx, 1);
    addLogEntry('Система', "Сработала 'Заморозка Энтропии'! Ржавчина поглощена щитом.", 'system');
    currentState.lastActivityTime = Date.now();
    saveState();
    return;
  }

  currentState.rustLevel = Math.min(currentState.rustLevel + 1, 3);
  const decay = currentState.rustLevel * 0.1;
  currentState.attrs.str_xp = Math.max(0, Math.floor(currentState.attrs.str_xp * (1 - decay)));
  currentState.attrs.end_xp = Math.max(0, Math.floor(currentState.attrs.end_xp * (1 - decay)));
  currentState.attrs.agi_xp = Math.max(0, Math.floor(currentState.attrs.agi_xp * (1 - decay)));

  modifyBossRage(20);

  const now = Date.now();
  const oneWeek = 7 * 24 * 3600000;
  if (currentState.lastWeighInTime > 0 && (now - currentState.lastWeighInTime > oneWeek)) {
    modifyBossRage(15);
    addLogEntry('Гейм-Мастер', 'Просрочен еженедельный отчёт! Тень Лени становится сильнее (+15% ярости).', 'rust');
  }

  addLogEntry('Гейм-Мастер', `Охватывает Ржавчина (Уровень ${currentState.rustLevel}). Бездействие сжигает опыт.`, 'rust');
  saveState();
}

// =====================================================
// BOSS RAGE & DAMAGE
// =====================================================

export function modifyBossRage(amount) {
  currentState.boss.rage = Math.max(10, Math.min(100, currentState.boss.rage + amount));
  saveState();
}

export function takeDamage(amount, reason) {
  currentState.char.hp = Math.max(0, currentState.char.hp - amount);
  addLogEntry('Гейм-Мастер', `Вы получаете ${amount} ед. урона! Причина: ${reason}`, 'fight');
  if (currentState.char.hp <= 0) {
    triggerDeath();
  } else {
    window.dispatchEvent(new CustomEvent('play-sound', { detail: 'damage' }));
    window.dispatchEvent(new CustomEvent('shake-screen'));
    saveState();
  }
}

function triggerDeath() {
  currentState.char.level = Math.max(1, currentState.char.level - 1);
  currentState.char.xp = 0;
  currentState.char.xpNeeded = 100 + (currentState.char.level - 1) * 20;
  currentState.char.hp = 50;
  if (currentState.buffs.length > 0) {
    currentState.buffs.pop();
  }
  currentState.rustLevel = 0;
  addLogEntry('Гейм-Мастер', 'ВАШ АВАТАР ПОГИБ! Уровень снижен. Воскрешён с 50 HP.', 'fight');
  window.dispatchEvent(new CustomEvent('play-sound', { detail: 'damage' }));
  window.dispatchEvent(new CustomEvent('show-status-popup', {
    detail: { title: 'АВАТАР ПОГИБ!', desc: 'Лень одолела вас. Уровень снижен. Тренируйтесь!', visual: '💀' }
  }));
  saveState();
}

// =====================================================
// EXPERIENCE & LEVELING
// =====================================================

export function gainXp(amount, attribute = null) {
  let actualAmount = amount;
  if (currentState.debuffs['heavy-legs']) {
    actualAmount = Math.floor(amount * 0.5);
  }

  currentState.rustLevel = 0;
  currentState.lastActivityTime = Date.now();
  currentState.char.xp += actualAmount;
  currentState.streaks.totalWorkouts++;

  if (attribute && attribute !== 'hp' && currentState.attrs[attribute] !== undefined) {
    currentState.attrs[`${attribute}_xp`] += actualAmount;

    if (attribute === 'str') currentState.streaks.str++;
    if (attribute === 'end') currentState.streaks.end++;
    if (attribute === 'agi') currentState.streaks.agi++;

    const attrThreshold = currentState.attrs[attribute] * 15;
    if (currentState.attrs[`${attribute}_xp`] >= attrThreshold) {
      currentState.attrs[`${attribute}_xp`] -= attrThreshold;
      currentState.attrs[attribute] += 1;
      addLogEntry('Система', `Характеристика ${attribute.toUpperCase()} выросла до ${currentState.attrs[attribute]}!`, 'system');
    }
  }

  // Check for newly unlocked items
  const newlyUnlocked = checkItemUnlocks(currentState);
  for (const itemId of newlyUnlocked) {
    currentState.inventory.push(itemId);
    const item = ITEM_CATALOG[itemId];
    const rarityEmoji = { common: '⚪', rare: '🔵', epic: '🟣', legendary: '🟡' }[item.rarity] || '⚪';
    addLogEntry('Сокровищница', `${rarityEmoji} Получено снаряжение: "${item.name}"! Грейд: ${item.rarity.toUpperCase()}`, 'gm');
    window.dispatchEvent(new CustomEvent('show-status-popup', {
      detail: {
        title: `${rarityEmoji} НОВОЕ СНАРЯЖЕНИЕ!`,
        desc: `"${item.name}" — ${item.desc} (+${item.bonus} к ${item.stat.toUpperCase()})`,
        visual: item.icon
      }
    }));
  }

  let leveledUp = false;
  while (currentState.char.xp >= currentState.char.xpNeeded) {
    currentState.char.xp -= currentState.char.xpNeeded;
    currentState.char.level += 1;
    currentState.char.xpNeeded = 100 + (currentState.char.level - 1) * 20;
    currentState.char.hp = currentState.char.maxHp;
    leveledUp = true;
  }

  if (leveledUp) {
    updateCharacterTitle();
    window.dispatchEvent(new CustomEvent('play-sound', { detail: 'levelup' }));
    window.dispatchEvent(new CustomEvent('show-status-popup', {
      detail: { title: 'НОВЫЙ УРОВЕНЬ!', desc: `Достигнут уровень ${currentState.char.level}! HP восстановлено.`, visual: '🌟' }
    }));
  } else {
    window.dispatchEvent(new CustomEvent('play-sound', { detail: 'xp' }));
  }

  saveState();
}

function updateCharacterTitle() {
  const lvl = currentState.char.level;
  if (lvl >= 10) {
    currentState.char.title = 'Рыцарь-Рунист';
    currentState.char.classTitle = 'Легендарный Защитник';
  } else if (lvl >= 6) {
    currentState.char.title = 'Ветеран Воли';
    currentState.char.classTitle = 'Элитный Гвардеец';
  } else if (lvl >= 3) {
    currentState.char.title = 'Воин Дисциплины';
    currentState.char.classTitle = 'Железный Оруженосец';
  } else {
    currentState.char.title = 'Странник';
    currentState.char.classTitle = 'Ученик Гейм-Мастера';
  }
}

// =====================================================
// EQUIP / UNEQUIP
// =====================================================

export function equipItem(itemId) {
  if (!currentState.inventory.includes(itemId)) return;
  const item = ITEM_CATALOG[itemId];
  if (!item) return;

  const slot = item.slot;
  const prevItemId = currentState.equipped[slot];

  // Unequip old item first
  if (prevItemId && ITEM_CATALOG[prevItemId]) {
    const prevItem = ITEM_CATALOG[prevItemId];
    currentState.inventory.push(prevItemId);
    applyItemBonus(prevItem, -1);
  }

  // Remove new item from inventory
  currentState.inventory = currentState.inventory.filter(id => id !== itemId);
  currentState.equipped[slot] = itemId;

  // Apply bonus
  applyItemBonus(item, +1);

  const rarityEmoji = { common: '⚪', rare: '🔵', epic: '🟣', legendary: '🟡' }[item.rarity] || '⚪';
  addLogEntry('Снаряжение', `${rarityEmoji} Экипировано: "${item.name}" (+${item.bonus} к ${item.stat.toUpperCase()})`, 'system');
  window.dispatchEvent(new CustomEvent('play-sound', { detail: 'levelup' }));
  saveState();
}

export function unequipItem(slot) {
  const itemId = currentState.equipped[slot];
  if (!itemId) return;
  const item = ITEM_CATALOG[itemId];
  if (!item) return;

  currentState.equipped[slot] = null;
  currentState.inventory.push(itemId);
  applyItemBonus(item, -1);

  addLogEntry('Снаряжение', `Снято: "${item.name}" (-${item.bonus} к ${item.stat.toUpperCase()})`, 'system');
  window.dispatchEvent(new CustomEvent('play-sound', { detail: 'damage' }));
  saveState();
}

function applyItemBonus(item, sign) {
  const amount = item.bonus * sign;
  if (item.stat === 'hp') {
    currentState.char.maxHp = Math.max(100, currentState.char.maxHp + amount);
    currentState.char.hp = Math.min(currentState.char.maxHp, currentState.char.hp + Math.max(0, amount));
  } else if (['str', 'end', 'agi'].includes(item.stat)) {
    currentState.attrs[item.stat] = Math.max(1, currentState.attrs[item.stat] + amount);
  }
}

// =====================================================
// CONFESSION & PURE WILL
// =====================================================

export function submitConfession(text) {
  if (!text.trim()) return;
  const hpLoss = 25;
  const wpGain = 10;
  takeDamage(hpLoss, `Добровольное признание: "${text}"`);
  currentState.char.willpower += wpGain;
  addLogEntry('Исповедальня', `Признание: "${text}". -${hpLoss} HP, +${wpGain} WP`, 'confession');
  window.dispatchEvent(new CustomEvent('play-sound', { detail: 'heal' }));
  saveState();
}

export function declarePureWill() {
  const now = Date.now();
  const lastDate = new Date(currentState.lastPureWillDeclaration);
  const nowDate = new Date(now);
  const isSameDay = currentState.lastPureWillDeclaration &&
    lastDate.getFullYear() === nowDate.getFullYear() &&
    lastDate.getMonth() === nowDate.getMonth() &&
    lastDate.getDate() === nowDate.getDate();

  if (isSameDay) {
    return { success: false, message: 'Вы уже заявили о Чистой Воли сегодня!' };
  }

  currentState.char.willpower += 15;
  currentState.lastPureWillDeclaration = now;
  currentState.lastActivityTime = now;
  currentState.rustLevel = 0;
  currentState.streaks.habit++;

  const newItems = checkItemUnlocks(currentState);
  for (const itemId of newItems) {
    currentState.inventory.push(itemId);
    const item = ITEM_CATALOG[itemId];
    addLogEntry('Сокровищница', `🟡 Получено: "${item.name}"!`, 'gm');
  }

  addLogEntry('Алтарь Воли', 'День чистой воли подтверждён!', 'confession', 'Награда: +15 WP | Энтропия сброшена');
  saveState();
  return { success: true, message: 'День Чистой Воли заявлен! +15 WP.' };
}

// =====================================================
// SHOP
// =====================================================

export function purchaseItem(itemId, cost, currency) {
  if (currency === 'will' && currentState.char.willpower < cost) {
    alert('Недостаточно Очков Воли!'); return false;
  }
  if (currency === 'gold' && currentState.char.gold < cost) {
    alert('Недостаточно Золота!'); return false;
  }

  if (currency === 'will') currentState.char.willpower -= cost;
  else currentState.char.gold -= cost;

  if (itemId === 'will-potion') {
    currentState.char.hp = Math.min(currentState.char.maxHp, currentState.char.hp + 50);
    addLogEntry('Магазин', 'Зелье Здоровья! +50 HP.', 'system');
    window.dispatchEvent(new CustomEvent('play-sound', { detail: 'heal' }));
  } else {
    currentState.buffs.push(itemId);
    addLogEntry('Магазин', `Куплено: ${itemId === 'frost-shield' ? 'Заморозка Энтропии' : 'Защитный Амулет'}.`, 'system');
    window.dispatchEvent(new CustomEvent('play-sound', { detail: 'coin' }));
  }

  saveState();
  return true;
}

// =====================================================
// BOSS BATTLE
// =====================================================

export function startBossBattle() {
  const charStats = currentState.attrs;
  const bossRage = currentState.boss.rage;

  // Compute equipped bonuses already reflected in attrs
  const playerMaxHp = currentState.char.hp + (charStats.str + charStats.end + charStats.agi) * 2;
  const bossMaxHp = 100 + (bossRage * 2);

  let p_hp = playerMaxHp;
  let b_hp = bossMaxHp;

  const battleLog = [];
  battleLog.push({ text: `Битва! Ваши силы: ${playerMaxHp} HP. Тень лени: ${bossMaxHp} HP.`, type: 'meta' });

  const shieldIdx = currentState.buffs.indexOf('shadow-shield');
  const hasShield = shieldIdx > -1;

  let turn = 1;
  while (p_hp > 0 && b_hp > 0 && turn < 30) {
    let p_dmg = Math.floor((charStats.str * 1.5 + charStats.agi * 0.5) * (0.8 + Math.random() * 0.4));
    const isCrit = Math.random() < 0.15;
    if (isCrit) {
      p_dmg = Math.floor(p_dmg * 2);
      battleLog.push({ text: `Раунд ${turn}: КРИТ! Вы наносите Боссу ${p_dmg} урона.`, type: 'player-crit' });
    } else {
      battleLog.push({ text: `Раунд ${turn}: Вы атакуете Босса на ${p_dmg} урона.`, type: 'player' });
    }
    b_hp -= p_dmg;
    if (b_hp <= 0) break;

    let b_dmg = Math.floor((bossRage * 0.8) * (0.8 + Math.random() * 0.4));
    if (hasShield) {
      b_dmg = Math.floor(b_dmg * 0.5);
      battleLog.push({ text: `Раунд ${turn}: Амулет поглощает урон! Тень наносит ${b_dmg} урона.`, type: 'boss-shield' });
    } else {
      battleLog.push({ text: `Раунд ${turn}: Тень Лени наносит ${b_dmg} урона.`, type: 'boss' });
    }
    p_hp -= b_dmg;
    turn++;
  }

  const p_won = b_hp <= 0;

  if (p_won) {
    const goldWon = 50 + Math.floor(bossRage * 0.5);
    currentState.char.gold += goldWon;
    currentState.boss.rage = 10;
    currentState.boss.wins = (currentState.boss.wins || 0) + 1;
    battleLog.push({ text: `ПОБЕДА! Награда: +${goldWon} GP. Ярость сброшена до 10%!`, type: 'victory' });
    addLogEntry('Теневой Босс', `Победа! Награда: +${goldWon} GP.`, 'fight');
    window.dispatchEvent(new CustomEvent('play-sound', { detail: 'levelup' }));

    // Check boss-win unlocks
    const newItems = checkItemUnlocks(currentState);
    for (const itemId of newItems) {
      currentState.inventory.push(itemId);
      const item = ITEM_CATALOG[itemId];
      addLogEntry('Сокровищница', `🏆 За победу над Тенью: "${item.name}"!`, 'gm');
    }
  } else {
    const goldLost = Math.min(currentState.char.gold, 30);
    currentState.char.gold -= goldLost;
    currentState.debuffs['heavy-legs'] = 48;
    battleLog.push({ text: `ПОРАЖЕНИЕ! -${goldLost} GP. "Тяжёлые ноги" на 48ч!`, type: 'defeat' });
    addLogEntry('Теневой Босс', `Поражение. -${goldLost} GP, дебафф наложен.`, 'fight');
    window.dispatchEvent(new CustomEvent('play-sound', { detail: 'damage' }));
  }

  if (hasShield) currentState.buffs.splice(shieldIdx, 1);
  saveState();

  return { won: p_won, p_hp_max: playerMaxHp, b_hp_max: bossMaxHp, log: battleLog };
}

// =====================================================
// WEEKLY METRICS
// =====================================================

export function submitMetrics(height, weight) {
  const now = Date.now();
  const oneWeek = 7 * 24 * 3600000;
  const isOverdue = currentState.lastWeighInTime === 0 || (now - currentState.lastWeighInTime > oneWeek);

  if (height) currentState.metrics.height = height;
  if (weight) currentState.metrics.weight = weight;

  if (isOverdue && height && weight) {
    currentState.lastWeighInTime = now;
    currentState.char.xp += 30;
    currentState.char.gold += 15;

    addLogEntry('Система', `Еженедельный контроль: ${height}см / ${weight}кг. +30 XP | +15 GP!`, 'system', 'Награда: +30 XP | +15 GP');

    let leveledUp = false;
    while (currentState.char.xp >= currentState.char.xpNeeded) {
      currentState.char.xp -= currentState.char.xpNeeded;
      currentState.char.level += 1;
      currentState.char.xpNeeded = 100 + (currentState.char.level - 1) * 20;
      currentState.char.hp = currentState.char.maxHp;
      leveledUp = true;
    }
    if (leveledUp) {
      updateCharacterTitle();
      window.dispatchEvent(new CustomEvent('play-sound', { detail: 'levelup' }));
      window.dispatchEvent(new CustomEvent('show-status-popup', {
        detail: { title: 'НОВЫЙ УРОВЕНЬ!', desc: `Уровень ${currentState.char.level}!`, visual: '🌟' }
      }));
    } else {
      window.dispatchEvent(new CustomEvent('play-sound', { detail: 'xp' }));
    }

    saveState();
    return { rewarded: true };
  }

  saveState();
  return { rewarded: false };
}

export function updateMetrics(height, weight) {
  return submitMetrics(height, weight);
}

export function incrementHabitStreak() {
  currentState.streaks.habit++;
  const newItems = checkItemUnlocks(currentState);
  for (const itemId of newItems) {
    currentState.inventory.push(itemId);
    const item = ITEM_CATALOG[itemId];
    addLogEntry('Сокровищница', `🟡 Получено: "${item.name}"!`, 'gm');
  }
  saveState();
}
