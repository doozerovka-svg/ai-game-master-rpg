import {
  loadState, getState, saveState, resetState,
  gainXp, submitConfession, purchaseItem,
  startBossBattle, triggerInactivityDecay,
  addLogEntry, declarePureWill,
  takeDamage, modifyBossRage,
  updateMetrics, submitMetrics, incrementHabitStreak,
  equipItem, unequipItem,
  completeDaily, refreshDailiesIfNeeded,
  ITEM_CATALOG,
  ACHIEVEMENTS, checkAchievements, declareRestDay,
  generateDungeonsIfNeeded, enterDungeon, exploreRoom, advanceRoom,
  retreatFromDungeon, solveTrap, solveShrine, startMonsterBattle
} from './state.js';
import { aiEngine } from './aiEngine.js';
import { soundEngine } from './sound.js';
import { particleEngine } from './particles.js';
import { connectSync, disconnectSync } from './sync.js';

// DOM Elements cache
const els = {
  // Hero tab
  charLevel: document.getElementById('char-level'),
  charTitle: document.getElementById('char-title'),
  charClass: document.getElementById('char-class'),
  valHp: document.getElementById('val-hp'),
  barHp: document.getElementById('bar-hp'),
  valXp: document.getElementById('val-xp'),
  barXp: document.getElementById('bar-xp'),
  valStr: document.getElementById('val-str'),
  xpStr: document.getElementById('xp-str'),
  valEnd: document.getElementById('val-end'),
  xpEnd: document.getElementById('xp-end'),
  valAgi: document.getElementById('val-agi'),
  xpAgi: document.getElementById('xp-agi'),
  valGold: document.getElementById('val-gold'),
  valWill: document.getElementById('val-will'),
  activeBadges: document.getElementById('active-badges'),
  rustDecayOverlay: document.getElementById('rust-decay-overlay'),
  rustDays: document.getElementById('rust-days'),
  avatarRender: document.getElementById('avatar-render'),
  avatarImg: document.getElementById('avatar-img'),
  avatarChains: document.getElementById('avatar-chains'),
  avatarGearSword: document.getElementById('avatar-gear-sword'),
  avatarGearBoots: document.getElementById('avatar-gear-boots'),
  avatarGearShield: document.getElementById('avatar-gear-shield'),
  avatarGearAmulet: document.getElementById('avatar-gear-amulet'),
  avatarGlow: document.querySelector('.avatar-glow'),
  bagItemsContainer: document.getElementById('bag-items-container'),
  slotHelmet: document.getElementById('slot-helmet'),
  slotWeapon: document.getElementById('slot-weapon'),
  slotOffhand: document.getElementById('slot-offhand'),
  slotHands: document.getElementById('slot-hands'),
  slotNeck: document.getElementById('slot-neck'),
  slotFeet: document.getElementById('slot-feet'),
  slotRing: document.getElementById('slot-ring'),

  // Avatar overlays
  avatarGearHelmet: document.getElementById('avatar-gear-helmet'),
  avatarGearWeapon: document.getElementById('avatar-gear-weapon'),
  avatarGearOffhand: document.getElementById('avatar-gear-offhand'),
  avatarGearNeck: document.getElementById('avatar-gear-neck'),
  avatarGearHands: document.getElementById('avatar-gear-hands'),
  avatarGearFeet: document.getElementById('avatar-gear-feet'),

  // Console tab
  gmText: document.getElementById('gm-text'),
  actionInput: document.getElementById('action-input'),
  submitActivityBtn: document.getElementById('submit-activity-btn'),
  timelineList: document.getElementById('timeline-list'),
  mediaFile: document.getElementById('media-file'),
  mediaDropZone: document.getElementById('media-drop-zone'),
  mediaLabelText: document.getElementById('media-label-text'),
  mediaPreviewContainer: document.getElementById('media-preview-container'),
  mediaPreviewImg: document.getElementById('media-preview-img'),
  removeMediaBtn: document.getElementById('remove-media-btn'),

  // Quests tab
  dailiesContainer: document.getElementById('dailies-container'),
  dailiesCountText: document.getElementById('dailies-count-text'),
  dailiesProgressBar: document.getElementById('dailies-progress-bar'),
  dailiesResetTimer: document.getElementById('dailies-reset-timer'),
  weighInStatus: document.getElementById('weigh-in-status'),
  inputHeight: document.getElementById('input-height'),
  inputWeight: document.getElementById('input-weight'),
  submitMetricsBtn: document.getElementById('submit-metrics-btn'),
  declarePureWillBtn: document.getElementById('declare-pure-will-btn'),
  declareRestDayBtn: document.getElementById('declare-rest-day-btn'),
  subConfession: document.getElementById('sub-confession'),
  subShop: document.getElementById('sub-shop'),
  confessInput: document.getElementById('confess-input'),
  submitConfessionBtn: document.getElementById('submit-confession-btn'),
  shrineTabConfess: document.getElementById('tab-confess'),
  shrineTabShop: document.getElementById('tab-shop'),

  // Threats tab
  bossRagePercent: document.getElementById('boss-rage-percent'),
  bossRageBar: document.getElementById('boss-rage-bar'),
  bossImg: document.getElementById('boss-img'),
  triggerBossFightBtn: document.getElementById('trigger-boss-fight-btn'),
  dungeonsListPanel: document.getElementById('dungeons-list-panel'),
  dungeonsListContainer: document.getElementById('dungeons-list-container'),
  dungeonEnergyVal: document.getElementById('dungeon-energy-val'),
  dungeonEnergyBar: document.getElementById('dungeon-energy-bar'),
  activeDungeonPanel: document.getElementById('active-dungeon-panel'),
  activeDungeonName: document.getElementById('active-dungeon-name'),
  activeDungeonRoom: document.getElementById('active-dungeon-room'),
  encounterVisualContainer: document.getElementById('encounter-visual-container'),
  encounterImg: document.getElementById('encounter-img'),
  encounterIcon: document.getElementById('encounter-icon'),
  encounterTitle: document.getElementById('encounter-title'),
  encounterDesc: document.getElementById('encounter-desc'),
  dungeonActionsContainer: document.getElementById('dungeon-actions-container'),

  // Settings tab
  syncCodeInput: document.getElementById('sync-code-input'),
  connectSyncBtn: document.getElementById('connect-sync-btn'),
  generateSyncBtn: document.getElementById('generate-sync-btn'),
  geminiApiKeyInput: document.getElementById('gemini-api-key-input'),
  saveApiKeyBtn: document.getElementById('save-api-key-btn'),
  clearApiKeyBtn: document.getElementById('clear-api-key-btn'),
  resetCharacterBtn: document.getElementById('reset-character-btn'),

  // Header
  soundToggleBtn: document.getElementById('soundToggleBtn'),
  debugToggleBtn: document.getElementById('debugToggleBtn'),
  debugPanel: document.getElementById('debugPanel'),

  // Battle Modal
  battleModal: document.getElementById('battleModal'),
  battlePHp: document.getElementById('battle-p-hp'),
  battlePHpText: document.getElementById('battle-p-hp-text'),
  battleBHp: document.getElementById('battle-b-hp'),
  battleBHpText: document.getElementById('battle-b-hp-text'),
  battleLogContainer: document.getElementById('battle-log-container'),
  battleStartBtn: document.getElementById('battle-start-btn'),
  battleCloseBtn: document.getElementById('battle-close-btn'),
  battlePImg: document.getElementById('battle-p-img'),
  battleBImg: document.getElementById('battle-b-img'),

  // Status Modal
  statusModal: document.getElementById('statusModal'),
  statusModalBox: document.getElementById('status-modal-box'),
  statusModalTitle: document.getElementById('status-modal-title'),
  statusModalDesc: document.getElementById('status-modal-desc'),
  statusModalVisual: document.getElementById('status-modal-visual'),
  statusModalBtn: document.getElementById('status-modal-btn'),
};

let selectedMediaBase64 = null;
let currentFightMonster = null;

// Initialize app
window.addEventListener('DOMContentLoaded', () => {
  particleEngine.init();
  loadState();

  const state = getState();

  // Unregister SW on localhost for instant updates
  registerServiceWorker();

  updateSoundIcon();
  bindEvents();
  renderUI();

  if (state.sync.enabled && state.sync.code) {
    connectSync(state.sync.code);
  }
});

// ==========================
// RENDER FUNCTIONS
// ==========================

function renderUI() {
  const state = getState();

  // 1. Character stats
  els.charLevel.innerText = state.char.level;
  els.charTitle.innerText = state.char.title;
  els.charClass.innerText = state.char.classTitle;

  els.valHp.innerText = `${state.char.hp} / ${state.char.maxHp}`;
  els.barHp.style.width = `${(state.char.hp / state.char.maxHp) * 100}%`;

  els.valXp.innerText = `${state.char.xp} / ${state.char.xpNeeded}`;
  els.barXp.style.width = `${(state.char.xp / state.char.xpNeeded) * 100}%`;

  // 2. Attributes
  els.valStr.innerText = state.attrs.str;
  els.xpStr.innerText = `${state.attrs.str_xp} / ${state.attrs.str * 15} XP`;

  els.valEnd.innerText = state.attrs.end;
  els.xpEnd.innerText = `${state.attrs.end_xp} / ${state.attrs.end * 15} XP`;

  els.valAgi.innerText = state.attrs.agi;
  els.xpAgi.innerText = `${state.attrs.agi_xp} / ${state.attrs.agi * 15} XP`;

  // 3. Currencies
  els.valGold.innerText = state.char.gold;
  if (els.valWill) els.valWill.innerText = state.char.willpower;

  // 4. Badges and overlays
  renderBadgesAndOverlays(state);

  // 5. Avatar and gear
  renderAvatarEquipment(state);

  // 6. Inventory
  renderInventoryUI(state);

  // 7. Boss
  renderBoss(state);

  // 8. Timeline
  renderTimeline(state);

  // 9. Quests
  renderQuests(state);

  // 10. Settings
  const envApiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  if (els.geminiApiKeyInput) {
    if (state.apiKey) {
      els.geminiApiKeyInput.value = state.apiKey;
    } else if (envApiKey) {
      els.geminiApiKeyInput.value = '•••••••••••••••••••• (Автоматически из .env)';
    } else {
      els.geminiApiKeyInput.value = '';
    }
  }
  if (state.apiKey || envApiKey) {
    if (els.clearApiKeyBtn) els.clearApiKeyBtn.classList.remove('hidden');
    if (els.saveApiKeyBtn) {
      els.saveApiKeyBtn.innerText = state.apiKey ? "Сохранено ✓" : "Активен (.env) ✓";
    }
  } else {
    if (els.clearApiKeyBtn) els.clearApiKeyBtn.classList.add('hidden');
    if (els.saveApiKeyBtn) els.saveApiKeyBtn.innerText = "Сохранить";
  }

  // 11. Pure Will button
  renderPureWillButton(state);

  // 12. Render item catalog
  renderCatalog(state, currentCatalogFilter);

  // 13. Render achievements
  renderAchievements(state);

  // 14. Render rest day button
  renderRestDayButton(state);

  // 15. Render Dungeons
  renderDungeons(state);
}

let currentCatalogFilter = 'all';

function renderCatalog(state, filter = 'all') {
  const container = document.getElementById('catalog-container');
  if (!container) return;
  container.innerHTML = '';

  const allOwnedIds = [
    ...(state.inventory || []),
    ...Object.values(state.equipped || {}).filter(Boolean)
  ];

  const unlockLabels = {
    str_streak:     (n) => `${n} сил. тренировок`,
    end_streak:     (n) => `${n} кардио-тренировок`,
    agi_streak:     (n) => `${n} гибкость-тренировок`,
    habit_streak:   (n) => `${n} дней чистой воли`,
    total_workouts: (n) => `${n} любых тренировок`,
    boss_wins:      (n) => `${n} победы над Тенью`
  };

  const filteredItems = Object.values(ITEM_CATALOG).filter(item =>
    filter === 'all' || item.slot === filter
  );

  filteredItems.forEach(item => {
    const isOwned = allOwnedIds.includes(item.id);
    const isEquipped = Object.values(state.equipped || {}).includes(item.id);

    const card = document.createElement('div');
    card.className = `catalog-item rarity-border-${item.rarity}${isOwned ? '' : ' catalog-locked'}`;

    const unlockLabel = unlockLabels[item.unlockType]
      ? unlockLabels[item.unlockType](item.unlockCount)
      : '?';

    const statusBadge = isEquipped
      ? `<span class="catalog-status equipped">⚔️ ЭКИП.</span>`
      : isOwned
      ? `<span class="catalog-status owned">✅ Есть</span>`
      : `<span class="catalog-status locked">🔒 ${unlockLabel}</span>`;

    card.innerHTML = `
      <div class="catalog-item-icon">${item.icon}</div>
      <div class="catalog-item-body">
        <div class="catalog-item-name">${item.name}</div>
        <div class="catalog-item-stat">+${item.bonus} ${item.stat.toUpperCase()} · ${statusBadge}</div>
        <div class="catalog-item-desc">${item.desc}</div>
      </div>
      <div class="rarity-badge catalog-rarity rarity-${item.rarity}">${rarityLabel(item.rarity)}</div>
    `;
    container.appendChild(card);
  });
}

// Render daily contracts and weekly quest
function renderQuests(state) {
  // --- Dailies ---
  if (!els.dailiesContainer) return;
  els.dailiesContainer.innerHTML = '';

  const dailies = state.dailies || [];
  const completed = dailies.filter(d => d.completed).length;

  if (els.dailiesCountText) {
    els.dailiesCountText.innerText = `${completed} / ${dailies.length} выполнено`;
  }
  if (els.dailiesProgressBar) {
    els.dailiesProgressBar.style.width = `${dailies.length > 0 ? (completed / dailies.length) * 100 : 0}%`;
  }

  dailies.forEach((daily, index) => {
    const card = document.createElement('div');
    card.className = `daily-card${daily.completed ? ' completed' : ''}`;

    const attrColors = { str: '#e05252', end: '#52a0e0', agi: '#52e09c', hp: '#e0b252' };
    const color = attrColors[daily.attr] || '#9d4edd';

    card.innerHTML = `
      <div class="daily-icon" style="color: ${color};">${daily.icon}</div>
      <div class="daily-info">
        <div class="daily-text">${daily.text}</div>
        <div class="daily-reward">+${daily.xp} XP · +${daily.gp} GP</div>
      </div>
      ${daily.completed
        ? `<div class="daily-done">✅</div>`
        : `<button class="btn-daily-done" data-index="${index}">Выполнено</button>`
      }
    `;

    if (!daily.completed) {
      card.querySelector('.btn-daily-done').addEventListener('click', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        const rect = e.target.getBoundingClientRect();
        const result = completeDaily(idx);
        if (result) {
          particleEngine.spawnXpSparks(rect.left + rect.width / 2, rect.top, 15);
          renderUI();
        }
      });
    }

    els.dailiesContainer.appendChild(card);
  });

  // --- Reset timer ---
  if (els.dailiesResetTimer) {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const diffMs = midnight - now;
    const h = Math.floor(diffMs / 3600000);
    const m = Math.floor((diffMs % 3600000) / 60000);
    els.dailiesResetTimer.innerText = `Обновятся через ${h}ч ${m}м`;
  }

  // --- Weekly quest status ---
  if (els.weighInStatus) {
    const now = Date.now();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;

    if (!state.lastWeighInTime || state.lastWeighInTime === 0) {
      els.weighInStatus.innerHTML = `<span class="status-overdue">🗓️ Первый ввод! Введите рост и вес, чтобы получить +30 XP</span>`;
    } else {
      const elapsed = now - state.lastWeighInTime;
      if (elapsed > oneWeek) {
        els.weighInStatus.innerHTML = `<span class="status-overdue">⚠️ Отчет просрочен! Введите показания (+30 XP, иначе Босс усилится)</span>`;
      } else {
        const daysLeft = ((oneWeek - elapsed) / (24 * 60 * 60 * 1000)).toFixed(1);
        els.weighInStatus.innerHTML = `<span class="status-ok">✅ Контроль пройден. Следующий через ${daysLeft} дн.</span>`;
      }
    }
  }

  // --- Populate metrics inputs (don't override if focused) ---
  if (els.inputHeight && document.activeElement !== els.inputHeight) {
    els.inputHeight.value = state.metrics.height !== null ? state.metrics.height : '';
  }
  if (els.inputWeight && document.activeElement !== els.inputWeight) {
    els.inputWeight.value = state.metrics.weight !== null ? state.metrics.weight : '';
  }
}

function renderPureWillButton(state) {
  if (!els.declarePureWillBtn) return;
  const lastDeclDate = new Date(state.lastPureWillDeclaration);
  const nowDate = new Date();
  const isSameDay = state.lastPureWillDeclaration &&
    lastDeclDate.getFullYear() === nowDate.getFullYear() &&
    lastDeclDate.getMonth() === nowDate.getMonth() &&
    lastDeclDate.getDate() === nowDate.getDate();

  if (isSameDay) {
    els.declarePureWillBtn.disabled = true;
    els.declarePureWillBtn.innerText = "✅ Дисциплина подтверждена сегодня";
  } else {
    els.declarePureWillBtn.disabled = false;
    els.declarePureWillBtn.innerText = "⚡ Заявить о Дне Чистой Воли (+15 WP)";
  }
}

function renderRestDayButton(state) {
  if (!els.declareRestDayBtn) return;
  const now = Date.now();
  const sevenDays = 7 * 24 * 3600000;
  const lastRest = state.lastRestDay || 0;
  const isAvailable = !lastRest || (now - lastRest >= sevenDays);

  if (isAvailable) {
    els.declareRestDayBtn.disabled = false;
    els.declareRestDayBtn.innerText = "🛌 Объявить День Отдыха (раз в 7 дней)";
  } else {
    const daysLeft = ((sevenDays - (now - lastRest)) / (24 * 3600000)).toFixed(1);
    els.declareRestDayBtn.disabled = true;
    els.declareRestDayBtn.innerText = `🛌 День Отдыха через ${daysLeft} дн.`;
  }
}

function renderAchievements(state) {
  const container = document.getElementById('achievements-container');
  if (!container) return;
  container.innerHTML = '';

  const unlocked = state.achievements || [];

  ACHIEVEMENTS.forEach(ach => {
    const isUnlocked = unlocked.includes(ach.id);
    const card = document.createElement('div');
    card.className = `achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`;
    card.innerHTML = `
      <div class="achievement-icon">${ach.icon}</div>
      <div class="achievement-info">
        <div class="achievement-name">${ach.name}</div>
        <div class="achievement-desc">${ach.desc}</div>
        <div class="achievement-reward">${isUnlocked ? '✅ ' + ach.rewardText : '🔒 ' + ach.rewardText}</div>
      </div>
      <div class="achievement-status">${isUnlocked ? '🏆' : '⬜'}</div>
    `;
    container.appendChild(card);
  });
}

// =====================================================
// DUNGEONS RENDER LOGIC
// =====================================================

function renderDungeons(state) {
  if (!els.dungeonsListPanel || !els.activeDungeonPanel) return;

  // Render Energy
  const energy = state.dungeons.energy;
  const maxEnergy = state.dungeons.maxEnergy;
  els.dungeonEnergyVal.innerText = `${energy} / ${maxEnergy}`;
  els.dungeonEnergyBar.style.width = `${(energy / maxEnergy) * 100}%`;

  if (state.dungeons.activeDungeonId === null) {
    // Show Dungeons List, Hide Active Dungeon Panel
    els.activeDungeonPanel.classList.add('hidden');
    els.dungeonsListPanel.classList.remove('hidden');

    els.dungeonsListContainer.innerHTML = '';
    
    state.dungeons.list.forEach(dung => {
      const card = document.createElement('div');
      card.className = `dungeon-card${dung.completed ? ' completed' : ''}`;
      
      const badgeClass = dung.attribute; // str, agi, end
      const badgeText = dung.attribute === 'str' ? 'Сила' : dung.attribute === 'agi' ? 'Ловкость' : 'Вынос.';
      
      card.innerHTML = `
        <div class="dungeon-info">
          <div class="dungeon-name">${dung.name}</div>
          <div class="dungeon-meta">
            <span class="dungeon-attr-badge ${badgeClass}">${badgeText}</span>
            Сложность: <span class="dungeon-difficulty">${dung.difficulty}</span>
          </div>
        </div>
        <div>
          ${dung.completed 
            ? '<span class="room-badge" style="background: rgba(82, 224, 156, 0.1); border-color: rgba(82, 224, 156, 0.3); color: #52e09c;">Зачищено ✓</span>'
            : `<button class="btn-enter-dungeon" data-id="${dung.id}" ${energy < 10 ? 'disabled' : ''}>Войти (10⚡)</button>`
          }
        </div>
      `;

      if (!dung.completed) {
        card.querySelector('.btn-enter-dungeon').addEventListener('click', () => {
          const res = enterDungeon(dung.id);
          if (res.success) {
            soundEngine.playBossSpawn();
            renderUI();
          } else {
            alert(res.message);
          }
        });
      }

      els.dungeonsListContainer.appendChild(card);
    });
  } else {
    // Show Active Dungeon Panel, Hide List Panel
    els.dungeonsListPanel.classList.add('hidden');
    els.activeDungeonPanel.classList.remove('hidden');

    renderActiveRoom(state);
  }
}

function renderActiveRoom(state) {
  const encounter = exploreRoom();
  if (encounter.error) {
    els.dungeonsListPanel.classList.remove('hidden');
    els.activeDungeonPanel.classList.add('hidden');
    return;
  }

  // Update room header
  const dung = state.dungeons.list.find(d => d.id === state.dungeons.activeDungeonId);
  els.activeDungeonName.innerText = dung ? dung.name : 'Подземелье';
  els.activeDungeonRoom.innerText = `Комната ${encounter.room} / 5`;

  // Render Room Encounter
  els.encounterImg.classList.add('hidden');
  els.encounterIcon.classList.remove('hidden');
  els.dungeonActionsContainer.innerHTML = '';

  if (encounter.type === 'monster' || encounter.type === 'boss') {
    const monster = encounter.monster;
    els.encounterTitle.innerText = monster.name;
    els.encounterDesc.innerText = encounter.type === 'boss' 
      ? `☠️ ВНИМАНИЕ: Перед вами Хранитель Подземелья! HP: ${monster.hp}, Урон: ${monster.dmg}. Сразитесь с ним за сокровища!`
      : `В залах подземелья бродит враг! HP: ${monster.hp}, Урон: ${monster.dmg}.`;

    if (monster.img) {
      els.encounterImg.src = monster.img;
      els.encounterImg.classList.remove('hidden');
      els.encounterIcon.classList.add('hidden');
    } else {
      els.encounterIcon.innerText = encounter.type === 'boss' ? '👹' : '👾';
    }

    const fightBtn = document.createElement('button');
    fightBtn.className = 'btn-dungeon-action primary';
    fightBtn.innerHTML = `⚔️ Вступить в Бой (${monster.hp} HP)`;
    fightBtn.addEventListener('click', () => {
      currentFightMonster = monster;
      soundEngine.playBossSpawn();
      openBattleModal();
    });

    const runBtn = document.createElement('button');
    runBtn.className = 'btn-dungeon-action outline';
    runBtn.innerText = '🏃 Отступить в лагерь (прогресс сбросится)';
    runBtn.addEventListener('click', () => {
      retreatFromDungeon();
      renderUI();
    });

    els.dungeonActionsContainer.appendChild(fightBtn);
    els.dungeonActionsContainer.appendChild(runBtn);

  } else if (encounter.type === 'trap') {
    const trap = encounter.trap;
    els.encounterTitle.innerText = `Ловушка: ${trap.name}`;
    els.encounterDesc.innerText = `Вы попали в ловушку! Требуется проверка атрибута ${trap.type.toUpperCase()}. Сложность проверки: ${trap.difficulty}. У вас есть ${state.attrs[trap.type]} очков.`;
    
    els.encounterIcon.innerText = '🕸️';

    const solveBtn = document.createElement('button');
    solveBtn.className = 'btn-dungeon-action secondary';
    solveBtn.innerHTML = `⚙️ Попытаться Обезвредить (${trap.type.toUpperCase()} + d20)`;
    solveBtn.addEventListener('click', () => {
      const res = solveTrap(trap.type, trap.difficulty);
      alert(res.message);
      renderUI();
    });

    const runBtn = document.createElement('button');
    runBtn.className = 'btn-dungeon-action outline';
    runBtn.innerText = '🏃 Отступить в лагерь (прогресс сбросится)';
    runBtn.addEventListener('click', () => {
      retreatFromDungeon();
      renderUI();
    });

    els.dungeonActionsContainer.appendChild(solveBtn);
    els.dungeonActionsContainer.appendChild(runBtn);

  } else if (encounter.type === 'shrine') {
    const shrine = encounter.shrine;
    els.encounterTitle.innerText = shrine.name;
    els.encounterDesc.innerText = 'Перед вами старинный алтарь, окутанный святым свечением. Помолитесь, чтобы получить благословение богов.';
    
    els.encounterIcon.innerText = '✨';

    const prayBtn = document.createElement('button');
    prayBtn.className = 'btn-dungeon-action success';
    prayBtn.innerText = '🙏 Преклонить колени перед Алтарем';
    prayBtn.addEventListener('click', () => {
      const res = solveShrine();
      alert(res.message);
      renderUI();
    });

    els.dungeonActionsContainer.appendChild(prayBtn);

  } else {
    // Empty room
    els.encounterTitle.innerText = 'Пустой Коридор';
    els.encounterDesc.innerText = 'Тишина... В этой части подземелья никого нет. Путь свободен.';
    
    els.encounterIcon.innerText = '🕯️';

    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn-dungeon-action success';
    nextBtn.innerText = '➡️ Идти в следующую комнату';
    nextBtn.addEventListener('click', () => {
      advanceRoom();
      renderUI();
    });

    els.dungeonActionsContainer.appendChild(nextBtn);
  }
}

function renderBadgesAndOverlays(state) {
  els.activeBadges.innerHTML = '';

  if (state.rustLevel > 0) {
    const badges = ["Ржавчина I", "Тусклость II", "Увядание III"];
    els.activeBadges.innerHTML += `<span class="badge rust">⚠️ ${badges[state.rustLevel - 1]}</span>`;
    els.rustDecayOverlay.classList.remove('hidden');
    els.rustDays.innerText = `${state.rustLevel} дн. бездействия`;
    els.avatarRender.classList.add('rusted');
    if (state.rustLevel === 3) {
      els.avatarRender.classList.add('weary');
    } else {
      els.avatarRender.classList.remove('weary');
    }
  } else {
    els.rustDecayOverlay.classList.add('hidden');
    els.avatarRender.classList.remove('rusted', 'weary');
  }

  if (state.debuffs['heavy-legs']) {
    const hoursLeft = Math.ceil(state.debuffs['heavy-legs']);
    els.activeBadges.innerHTML += `<span class="badge legs">⛓️ Тяжелые ноги (${hoursLeft}ч)</span>`;
  }

  state.buffs.forEach(buff => {
    if (buff === 'frost-shield') {
      els.activeBadges.innerHTML += `<span class="badge shield">❄️ Морозный щит</span>`;
    }
    if (buff === 'shadow-shield') {
      els.activeBadges.innerHTML += `<span class="badge shield">🛡️ Амулет Теней</span>`;
    }
  });
}

function renderAvatarEquipment(state) {
  const lvl = state.char.level;
  let imgPath = 'avatar_tier1.png';
  if (lvl >= 10) imgPath = 'avatar_tier4.png';
  else if (lvl >= 6) imgPath = 'avatar_tier3.png';
  else if (lvl >= 3) imgPath = 'avatar_tier2.png';

  if (els.avatarImg && !els.avatarImg.src.endsWith(imgPath)) {
    els.avatarImg.src = imgPath;
  }

  // Map slot -> overlay element
  const overlayMap = {
    weapon:  els.avatarGearWeapon,
    offhand: els.avatarGearOffhand,
    helmet:  els.avatarGearHelmet,
    feet:    els.avatarGearFeet,
    neck:    els.avatarGearNeck,
    hands:   els.avatarGearHands,
  };

  for (const [slot, overlayEl] of Object.entries(overlayMap)) {
    if (!overlayEl) continue;
    const equippedId = state.equipped[slot];
    if (equippedId && ITEM_CATALOG[equippedId] && ITEM_CATALOG[equippedId].image) {
      overlayEl.src = ITEM_CATALOG[equippedId].image;
      overlayEl.classList.remove('hidden');

      // Apply rarity CSS class for glow effect
      overlayEl.className = `avatar-gear-overlay slot-${slot} rarity-${ITEM_CATALOG[equippedId].rarity}`;
    } else {
      overlayEl.classList.add('hidden');
      overlayEl.className = `avatar-gear-overlay slot-${slot} hidden`;
    }
  }

  if (els.avatarChains) {
    if (state.debuffs['heavy-legs']) els.avatarChains.classList.remove('hidden');
    else els.avatarChains.classList.add('hidden');
  }
}

function toggleGearOverlay(element, isEquipped) {
  if (!element) return;
  if (isEquipped) element.classList.remove('hidden');
  else element.classList.add('hidden');
}

function renderInventoryUI(state) {
  // Render all 7 equipped slots
  const slotMap = [
    { el: els.slotHelmet,  slot: 'helmet' },
    { el: els.slotWeapon,  slot: 'weapon' },
    { el: els.slotOffhand, slot: 'offhand' },
    { el: els.slotHands,   slot: 'hands' },
    { el: els.slotNeck,    slot: 'neck' },
    { el: els.slotFeet,    slot: 'feet' },
    { el: els.slotRing,    slot: 'ring' },
  ];

  const slotIcons = { helmet: '🪖', weapon: '⚔️', offhand: '🛡️', hands: '🥊', neck: '🔮', feet: '🥾', ring: '💍' };
  const slotLabels = { helmet: 'Шлем', weapon: 'Оружие', offhand: 'Щит', hands: 'Перчатки', neck: 'Амулет', feet: 'Сапоги', ring: 'Кольцо' };

  for (const { el, slot } of slotMap) {
    if (!el) continue;
    el.innerHTML = '';
    el.className = 'inv-slot';

    const itemId = state.equipped[slot];
    if (itemId && ITEM_CATALOG[itemId]) {
      const item = ITEM_CATALOG[itemId];
      el.classList.add('equipped', `rarity-border-${item.rarity}`);
      el.innerHTML = `
        <div class="slot-equipped-inner">
          <span class="slot-item-icon">${item.icon}</span>
          <span class="slot-item-name">${item.name}</span>
          <span class="slot-item-bonus">+${item.bonus} ${item.stat.toUpperCase()}</span>
        </div>
        <div class="rarity-badge rarity-${item.rarity}">${rarityLabel(item.rarity)}</div>
      `;
      el.title = `Нажми чтобы снять: ${item.name}`;
      el.addEventListener('click', () => { unequipItem(slot); renderUI(); }, { once: true });
    } else {
      el.innerHTML = `<span class="slot-placeholder">${slotIcons[slot]}<br><span class="slot-name">${slotLabels[slot]}</span></span>`;
    }
  }

  // Bag items with rarity
  els.bagItemsContainer.innerHTML = '';
  if (state.inventory.length === 0) {
    els.bagItemsContainer.innerHTML = `<div class="bag-empty">💜 Сумка пуста. Выполняйте задания, чтобы получить снаряжение!</div>`;
    return;
  }

  state.inventory.forEach(itemId => {
    const item = ITEM_CATALOG[itemId];
    if (!item) return;

    const card = document.createElement('div');
    card.className = `bag-item-card rarity-border-${item.rarity}`;
    card.title = `Экипировать: ${item.name}`;
    card.innerHTML = `
      <div class="bag-item-rarity rarity-${item.rarity}">${rarityLabel(item.rarity)}</div>
      <div class="bag-item-icon">${item.image
        ? `<img src="${item.image}" alt="${item.name}">`
        : `<span class="bag-item-emoji">${item.icon}</span>`
      }</div>
      <div class="bag-item-info">
        <div class="bag-item-name">${item.name}</div>
        <div class="bag-item-stat">+${item.bonus} ${item.stat.toUpperCase()}</div>
      </div>
    `;
    card.addEventListener('click', () => { equipItem(itemId); renderUI(); });
    els.bagItemsContainer.appendChild(card);
  });
}

function rarityLabel(rarity) {
  return { common: 'Common', rare: 'Rare', epic: 'Epic', legendary: 'Legendary' }[rarity] || rarity;
}

function renderBoss(state) {
  const rage = state.boss.rage;
  els.bossRagePercent.innerText = `${rage}%`;
  els.bossRageBar.style.width = `${rage}%`;

  let bossImgPath = 'boss_stage1.png';
  if (rage >= 80) bossImgPath = 'boss_stage3.png';
  else if (rage >= 40) bossImgPath = 'boss_stage2.png';

  if (els.bossImg && !els.bossImg.src.endsWith(bossImgPath)) {
    els.bossImg.src = bossImgPath;
  }

  const scale = 0.7 + (rage / 100) * 0.5;
  if (els.bossImg) els.bossImg.style.transform = `scale(${scale})`;

  const smokeEl = document.getElementById('boss-smoke-effect');
  if (smokeEl) {
    const smokeSpeed = 6 - (rage / 100) * 4;
    smokeEl.style.animationDuration = `${smokeSpeed}s`;
  }

  if (rage >= 80) {
    els.bossRagePercent.className = 'text-red font-bold';
    els.bossRageBar.style.background = 'linear-gradient(90deg, #ff0055, #ff0000)';
    els.bossRageBar.style.boxShadow = '0 0 12px #ff0000';
  } else {
    els.bossRagePercent.className = '';
    els.bossRageBar.style.background = 'linear-gradient(90deg, #3a0011, #ff0055)';
    els.bossRageBar.style.boxShadow = '0 0 8px var(--red)';
  }
}

function renderTimeline(state) {
  els.timelineList.innerHTML = '';

  if (state.logs.length === 0) {
    els.timelineList.innerHTML = `<p class="mini-desc">Ваша книга пуста. Начните тренировки.</p>`;
    return;
  }

  state.logs.forEach(log => {
    const item = document.createElement('div');
    let itemClass = 'timeline-item';
    if (log.type === 'rust') itemClass += ' rust-item';
    if (log.type === 'fight') itemClass += ' fight-item';
    if (log.type === 'confession') itemClass += ' confession-item';
    item.className = itemClass;

    const timeStr = new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    item.innerHTML = `
      <div class="timeline-meta">
        <strong>[${log.speaker}]</strong>
        <span>${timeStr}</span>
      </div>
      <div class="timeline-header">${log.text}</div>
      ${log.rewardText ? `<div class="timeline-verdict">${log.rewardText}</div>` : ''}
    `;
    els.timelineList.appendChild(item);
  });
}

function updateSoundIcon() {
  const isEn = soundEngine.isEnabled();
  els.soundToggleBtn.innerHTML = `<span class="btn-icon">${isEn ? '🔊' : '🔇'}</span>`;
}

// ==========================
// EVENT BINDINGS
// ==========================

function bindEvents() {
  // Mobile Tab switching
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      const targetPanel = item.getAttribute('data-target');
      document.querySelectorAll('.layout-panel').forEach(panel => {
        panel.classList.remove('active-tab');
      });
      const target = document.getElementById(targetPanel);
      if (target) target.classList.add('active-tab');
    });
  });

  // Catalog filter buttons
  document.getElementById('catalog-filters')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.catalog-filter');
    if (!btn) return;
    document.querySelectorAll('.catalog-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCatalogFilter = btn.getAttribute('data-filter') || 'all';
    renderCatalog(getState(), currentCatalogFilter);
  });

  // Sound Toggle
  els.soundToggleBtn.addEventListener('click', () => {
    soundEngine.toggle();
    updateSoundIcon();
  });

  // Debug Panel Toggle
  els.debugToggleBtn.addEventListener('click', () => {
    els.debugPanel.classList.toggle('hidden');
  });

  // Shrine/Shop sub-tabs
  els.shrineTabConfess.addEventListener('click', () => {
    els.shrineTabConfess.classList.add('active');
    els.shrineTabShop.classList.remove('active');
    els.subConfession.classList.add('active');
    els.subShop.classList.remove('active');
  });

  els.shrineTabShop.addEventListener('click', () => {
    els.shrineTabShop.classList.add('active');
    els.shrineTabConfess.classList.remove('active');
    els.subShop.classList.add('active');
    els.subConfession.classList.remove('active');
  });

  // Submit Activity Form
  document.getElementById('gm-submit-form').addEventListener('submit', handleActivitySubmit);

  // File Upload handling
  els.mediaFile.addEventListener('change', handleMediaSelect);
  els.removeMediaBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    clearMediaSelection();
  });

  // Confession submit
  els.submitConfessionBtn.addEventListener('click', () => {
    const text = els.confessInput.value.trim();
    if (!text) return;
    submitConfession(text);
    els.confessInput.value = '';
    renderUI();
  });

  // Pure Will declaration
  if (els.declarePureWillBtn) {
    els.declarePureWillBtn.addEventListener('click', () => {
      const res = declarePureWill();
      if (res.success) {
        soundEngine.playHeal();
        const btnRect = els.declarePureWillBtn.getBoundingClientRect();
        particleEngine.spawnHealGlow(btnRect.left + btnRect.width / 2, btnRect.top, 25);
        renderUI();
      } else {
        alert(res.message);
      }
    });
  }

  // Rest Day declaration
  if (els.declareRestDayBtn) {
    els.declareRestDayBtn.addEventListener('click', () => {
      const res = declareRestDay();
      if (res.success) {
        soundEngine.playHeal();
        const btnRect = els.declareRestDayBtn.getBoundingClientRect();
        particleEngine.spawnHealGlow(btnRect.left + btnRect.width / 2, btnRect.top, 20);
        renderUI();
      } else {
        alert(res.message);
      }
    });
  }

  // Submit weekly metrics
  if (els.submitMetricsBtn) {
    els.submitMetricsBtn.addEventListener('click', () => {
      const h = parseInt(els.inputHeight.value) || null;
      const w = parseInt(els.inputWeight.value) || null;
      if (!h || !w) {
        alert('Пожалуйста, введите оба показателя: рост и вес!');
        return;
      }
      const result = submitMetrics(h, w);
      if (result.rewarded) {
        soundEngine.playXp();
        const btnRect = els.submitMetricsBtn.getBoundingClientRect();
        particleEngine.spawnXpSparks(btnRect.left + btnRect.width / 2, btnRect.top, 20);
        particleEngine.spawnGoldExplosion(btnRect.left + btnRect.width / 2, btnRect.top, 10);
      }
      renderUI();
    });
  }

  // Purchase items
  document.querySelectorAll('.btn-purchase').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.shop-item');
      const itemId = parent.getAttribute('data-item');
      const cost = parseInt(btn.getAttribute('data-cost'));
      const currency = btn.getAttribute('data-currency');

      const rect = btn.getBoundingClientRect();
      const success = purchaseItem(itemId, cost, currency);
      if (success) {
        particleEngine.spawnGoldExplosion(rect.left + rect.width / 2, rect.top, 10);
        renderUI();
      }
    });
  });

  // Boss Battle
  els.triggerBossFightBtn.addEventListener('click', () => {
    soundEngine.playBossSpawn();
    openBattleModal();
  });

  els.battleStartBtn.addEventListener('click', runBossBattleSimulation);
  els.battleCloseBtn.addEventListener('click', () => {
    els.battleModal.classList.remove('active');
    renderUI();
  });

  // Status popup
  els.statusModalBtn.addEventListener('click', () => {
    els.statusModal.classList.remove('active');
  });

  // Connect Sync Code
  els.connectSyncBtn.addEventListener('click', () => {
    const code = els.syncCodeInput.value.trim().toUpperCase();
    if (!code) { alert("Введите код синхронизации!"); return; }
    connectSync(code);
    alert(`Пытаемся подключиться к коду ${code}...`);
  });

  // Generate sync code
  els.generateSyncBtn.addEventListener('click', () => {
    const randomCode = 'HERO-' + Math.random().toString(36).substr(2, 4).toUpperCase() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase();
    els.syncCodeInput.value = randomCode;
    connectSync(randomCode);
    alert(`Новый код связи: ${randomCode}. Введите его на другом устройстве.`);
  });

  // Save API Key
  els.saveApiKeyBtn.addEventListener('click', () => {
    const key = els.geminiApiKeyInput.value.trim();
    if (!key) { alert("Пожалуйста, вставьте ключ!"); return; }
    if (key.includes("Автоматически из .env")) {
      alert("Этот ключ загружен автоматически из конфигурационного файла (.env) и уже активен!");
      return;
    }
    const state = getState();
    state.apiKey = key;
    saveState();
    renderUI();
  });

  // Clear API Key
  els.clearApiKeyBtn.addEventListener('click', () => {
    const state = getState();
    state.apiKey = '';
    saveState();
    els.geminiApiKeyInput.value = '';
    renderUI();
  });

  // Reset Progress
  els.resetCharacterBtn.addEventListener('click', () => {
    if (confirm("Вы действительно хотите полностью стереть аватара? Весь прогресс будет безвозвратно утерян!")) {
      resetState();
      renderUI();
    }
  });

  // DEBUG events
  document.getElementById('debug-plus-24h').addEventListener('click', () => {
    const state = getState();
    state.lastChecked -= 24 * 60 * 60 * 1000;
    triggerInactivityDecay();
    renderUI();
  });

  document.getElementById('debug-grow-boss').addEventListener('click', () => {
    modifyBossRage(20);
    renderUI();
  });

  document.getElementById('debug-gain-xp').addEventListener('click', () => {
    const btnRect = document.getElementById('debug-gain-xp').getBoundingClientRect();
    particleEngine.spawnXpSparks(btnRect.left + btnRect.width / 2, btnRect.top, 25);
    gainXp(40, 'str');
    renderUI();
  });

  document.getElementById('debug-heal').addEventListener('click', () => {
    const state = getState();
    state.char.hp = state.char.maxHp;
    saveState();
    soundEngine.playHeal();
    particleEngine.spawnHealGlow(window.innerWidth / 2, window.innerHeight / 2, 25);
    renderUI();
  });

  document.getElementById('debug-clean-rust').addEventListener('click', () => {
    const state = getState();
    state.rustLevel = 0;
    saveState();
    soundEngine.playHeal();
    renderUI();
  });

  document.getElementById('debug-reset-dailies').addEventListener('click', () => {
    const state = getState();
    state.dailiesGeneratedDate = ''; // Force regeneration
    refreshDailiesIfNeeded();
    saveState();
    renderUI();
  });

  document.getElementById('debug-gain-dungeon-energy').addEventListener('click', () => {
    const state = getState();
    if (state.dungeons) {
      state.dungeons.energy = Math.min(state.dungeons.maxEnergy, state.dungeons.energy + 50);
      saveState();
      soundEngine.playHeal();
      renderUI();
    }
  });

  document.getElementById('debug-reset-dungeons').addEventListener('click', () => {
    const state = getState();
    if (state.dungeons) {
      state.dungeons.lastGeneratedDate = '';
      generateDungeonsIfNeeded();
      renderUI();
    }
  });

  // Global event listeners
  window.addEventListener('play-sound', (e) => {
    const type = e.detail;
    if (type === 'xp') soundEngine.playXp();
    if (type === 'damage') soundEngine.playDamage();
    if (type === 'levelup') soundEngine.playLevelUp();
    if (type === 'coin') soundEngine.playCoin();
    if (type === 'heal') soundEngine.playHeal();
  });

  window.addEventListener('spawn-particles', (e) => {
    const { type, count } = e.detail;
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 3;
    if (type === 'gold') particleEngine.spawnGoldExplosion(x, y, count);
    if (type === 'xp') particleEngine.spawnXpSparks(x, y, count);
    if (type === 'blood') particleEngine.spawnBloodSplash(x, y, count);
    if (type === 'heal') particleEngine.spawnHealGlow(x, y, count);
  });

  window.addEventListener('shake-screen', () => {
    document.body.classList.add('shake-screen');
    setTimeout(() => document.body.classList.remove('shake-screen'), 450);
    const vignette = document.getElementById('vignette');
    vignette.classList.add('damage');
    setTimeout(() => vignette.classList.remove('damage'), 600);
  });

  window.addEventListener('show-status-popup', (e) => {
    const { title, desc, visual } = e.detail;
    els.statusModalTitle.innerText = title;
    els.statusModalDesc.innerText = desc;
    els.statusModalVisual.innerText = visual;
    els.statusModal.classList.add('active');
  });

  window.addEventListener('state-updated-from-cloud', () => {
    renderUI();
  });
}

// ==========================
// MEDIA HANDLING
// ==========================

function handleMediaSelect(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (evt) {
    selectedMediaBase64 = evt.target.result.split(',')[1];
    els.mediaLabelText.classList.add('hidden');
    els.mediaPreviewContainer.classList.remove('hidden');
    els.mediaPreviewImg.src = evt.target.result;
  };
  reader.readAsDataURL(file);
}

function clearMediaSelection() {
  els.mediaFile.value = '';
  selectedMediaBase64 = null;
  els.mediaLabelText.classList.remove('hidden');
  els.mediaPreviewContainer.classList.add('hidden');
  els.mediaPreviewImg.src = '';
}

// ==========================
// ACTIVITY SUBMIT
// ==========================

async function handleActivitySubmit() {
  const text = els.actionInput.value.trim();
  if (!text) return;

  els.submitActivityBtn.disabled = true;
  els.actionInput.disabled = true;
  const previousBtnText = els.submitActivityBtn.innerText;
  els.submitActivityBtn.innerText = "Анализ ГМ...";

  const state = getState();
  // Pass clean key only (no placeholder strings)
  const envKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  const effectiveApiKey = (state.apiKey && !state.apiKey.includes('Автоматически')) ? state.apiKey : envKey;
  const result = await aiEngine.analyzeActivity(text, effectiveApiKey, state, selectedMediaBase64);

  const btnRect = els.submitActivityBtn.getBoundingClientRect();
  let goldEarned = 0;

  if (result.isNegative) {
    takeDamage(result.damage || 20, `Срыв дисциплины: "${text}"`);
    modifyBossRage(result.bossRageIncrease || 15);
    window.dispatchEvent(new CustomEvent('shake-screen'));
    particleEngine.spawnBloodSplash(btnRect.left + btnRect.width / 2, btnRect.top, 20);
  } else {
    if (result.attribute === 'hp') {
      state.char.hp = Math.min(state.char.maxHp, state.char.hp + 15);
      gainXp(result.xp, 'end');
      incrementHabitStreak();
      particleEngine.spawnHealGlow(btnRect.left + btnRect.width / 2, btnRect.top, 20);
    } else {
      gainXp(result.xp, result.attribute);
      particleEngine.spawnXpSparks(btnRect.left + btnRect.width / 2, btnRect.top, 25);
    }

    goldEarned = Math.floor(result.xp * 0.2);
    state.char.gold += goldEarned;
    if (goldEarned > 0) {
      particleEngine.spawnGoldExplosion(btnRect.left + btnRect.width / 2, btnRect.top, 10);
    }
  }

  els.gmText.innerText = result.narrative;

  const gmSpeaker = result.isGemini ? "🤖 Гейм-Мастер" : "🔮 Гейм-Мастер (Симулятор)";

  if (result.isNegative) {
    addLogEntry(gmSpeaker, text, 'fight', `Грейд: ${result.rarity} | Нанесено: -${result.damage} HP | Тень +${result.bossRageIncrease}%`);
  } else {
    addLogEntry(gmSpeaker, text, 'gm', `Грейд: ${result.rarity} | +${result.xp} XP | +${goldEarned} GP`);
  }

  els.actionInput.value = '';
  clearMediaSelection();

  els.submitActivityBtn.disabled = false;
  els.actionInput.disabled = false;
  els.submitActivityBtn.innerText = previousBtnText;

  renderUI();
}

// ==========================
// BOSS BATTLE
// ==========================

let battleInterval = null;

function openBattleModal() {
  const state = getState();
  const charStats = state.attrs;
  
  const playerMaxHp = state.char.hp + (charStats.str + charStats.end + charStats.agi) * 2;
  
  if (currentFightMonster) {
    const mMaxHp = currentFightMonster.hp;
    els.battlePHpText.innerText = `${playerMaxHp} / ${playerMaxHp} HP`;
    els.battlePHp.style.width = '100%';
    els.battleBHpText.innerText = `${mMaxHp} / ${mMaxHp} HP`;
    els.battleBHp.style.width = '100%';
    
    document.querySelector('#battleModal .modal-title').innerText = `ПОДЗЕМЕЛЬЕ: Вы VS ${currentFightMonster.name}`;
    document.querySelector('#battle-boss .fighter-name').innerText = currentFightMonster.name;

    if (els.battlePImg && els.avatarImg) els.battlePImg.src = els.avatarImg.src;
    if (els.battleBImg) {
      if (currentFightMonster.img) {
        els.battleBImg.src = currentFightMonster.img;
      } else {
        els.battleBImg.src = 'boss_stage1.png';
      }
    }
    
    els.battleLogContainer.innerHTML = `<div class="log-line">Вы обнажаете меч перед существом: ${currentFightMonster.name}. Приготовиться к бою!</div>`;
  } else {
    const bossRage = state.boss.rage;
    const bossMaxHp = 100 + (bossRage * 2);

    els.battlePHpText.innerText = `${playerMaxHp} / ${playerMaxHp} HP`;
    els.battlePHp.style.width = '100%';
    els.battleBHpText.innerText = `${bossMaxHp} / ${bossMaxHp} HP`;
    els.battleBHp.style.width = '100%';

    document.querySelector('#battleModal .modal-title').innerText = `БИТВА ВОЛИ: Странник VS Тень Лени`;
    document.querySelector('#battle-boss .fighter-name').innerText = 'Тень Лени';

    if (els.battlePImg && els.avatarImg) els.battlePImg.src = els.avatarImg.src;
    if (els.battleBImg && els.bossImg) els.battleBImg.src = els.bossImg.src;

    els.battleLogContainer.innerHTML = `<div class="log-line">Вы стоите лицом к лицу с Тенью вашей лени. Её ярость равна ${bossRage}%. Нажмите кнопку ниже!</div>`;
  }

  els.battleStartBtn.classList.remove('hidden');
  els.battleCloseBtn.classList.add('hidden');
  els.battleModal.classList.add('active');
}

function runBossBattleSimulation() {
  els.battleStartBtn.classList.add('hidden');

  const isDungeonMonster = currentFightMonster !== null;
  const simulation = isDungeonMonster 
    ? startMonsterBattle(currentFightMonster)
    : startBossBattle();
    
  let logIdx = 0;
  els.battleLogContainer.innerHTML = '';

  const maxBossHp = isDungeonMonster 
    ? currentFightMonster.hp 
    : (100 + getState().boss.rage * 2);
  const maxPlayerHp = getState().char.hp + (getState().attrs.str + getState().attrs.end + getState().attrs.agi) * 2;

  battleInterval = setInterval(() => {
    if (logIdx < simulation.log.length) {
      const line = simulation.log[logIdx];
      const div = document.createElement('div');
      let cssClass = 'log-line';
      if (line.type.includes('player')) cssClass += ' p-attack';
      if (line.type.includes('boss')) cssClass += ' b-attack';
      if (line.type === 'meta' || line.type === 'victory' || line.type === 'defeat') cssClass += ' meta';
      div.className = cssClass;
      div.innerText = line.text;

      els.battleLogContainer.appendChild(div);
      els.battleLogContainer.scrollTop = els.battleLogContainer.scrollHeight;

      if (line.type.includes('player')) {
        soundEngine.playXp();
        particleEngine.spawnXpSparks(window.innerWidth * 0.7, window.innerHeight * 0.4, 8);
      }
      if (line.type.includes('boss') || line.type.includes('shadow')) {
        soundEngine.playDamage();
        window.dispatchEvent(new CustomEvent('shake-screen'));
        particleEngine.spawnBloodSplash(window.innerWidth * 0.3, window.innerHeight * 0.4, 10);
      }

      if (line.text.includes('Теневому Боссу') || line.text.includes('врагу')) {
        const match = line.text.match(/наносит.* (\d+) урона/);
        if (match) {
          simulation.b_hp_max = Math.max(0, simulation.b_hp_max - parseInt(match[1]));
          els.battleBHpText.innerText = `${simulation.b_hp_max} HP`;
          els.battleBHp.style.width = `${(simulation.b_hp_max / maxBossHp) * 100}%`;
        }
      }
      if (line.text.includes('Тень наносит') || line.text.includes('Амулет поглощает') || line.text.includes('наносит')) {
        const match = line.text.match(/наносит.* (\d+) урона/);
        if (match) {
          simulation.p_hp_max = Math.max(0, simulation.p_hp_max - parseInt(match[1]));
          els.battlePHpText.innerText = `${simulation.p_hp_max} HP`;
          els.battlePHp.style.width = `${(simulation.p_hp_max / maxPlayerHp) * 100}%`;
        }
      }

      logIdx++;
    } else {
      clearInterval(battleInterval);
      battleInterval = null;
      els.battleCloseBtn.classList.remove('hidden');
      currentFightMonster = null;
    }
  }, 900);
}

// ==========================
// SERVICE WORKER
// ==========================

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    const isLocalhost = Boolean(
      window.location.hostname === 'localhost' ||
      window.location.hostname === '[::1]' ||
      window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
    );

    const isCapacitor = !!window.Capacitor;

    if (isLocalhost || isCapacitor) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        if (registrations.length > 0) {
          console.log('SW found on localhost/Capacitor. Clearing caches and unregistering...');
          const promises = registrations.map(r => r.unregister());
          if ('caches' in window) {
            caches.keys().then((names) => {
              names.forEach(name => caches.delete(name));
            });
          }
          Promise.all(promises).then(() => {
            console.log('Unregistered all service workers.');
            if (isLocalhost) {
              window.location.reload();
            }
          });
        }
      });
      return;
    }

    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js', { scope: './' })
        .then(reg => {
          console.log('ServiceWorker registered with scope:', reg.scope);
        })
        .catch(err => {
          console.warn('ServiceWorker registration failed:', err);
        });
    });
  }
}
