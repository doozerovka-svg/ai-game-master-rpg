// Firebase Realtime Database Synchronization via SSE (Server-Sent Events)
import { getState, saveState } from './state.js';

const DATABASE_URL = 'https://fsm-app-5557d-default-rtdb.europe-west1.firebasedatabase.app';
let eventSource = null;
let isPushing = false;

// Connect to Firebase channel
export function connectSync(syncCode) {
  if (!syncCode) return;

  // Disconnect previous if any
  disconnectSync();

  const state = getState();
  state.sync.code = syncCode;
  state.sync.enabled = true;
  saveState();

  const url = `${DATABASE_URL}/ai_rpg_saves/${syncCode}.json`;

  // 1. Fetch initial state from database
  fetch(url)
    .then(res => res.json())
    .then(remoteState => {
      if (remoteState) {
        mergeStates(remoteState);
      } else {
        // Database is empty, push our local state as initial
        pushStateToCloud();
      }
      
      // 2. Establish Server-Sent Events (SSE) for real-time updates
      setupSse(syncCode);
      updateSyncStatusText('Подключено (Облако)', 'text-green');
    })
    .catch(err => {
      console.error("Firebase connection error:", err);
      updateSyncStatusText('Ошибка сети', 'text-red');
    });
}

function setupSse(syncCode) {
  const sseUrl = `${DATABASE_URL}/ai_rpg_saves/${syncCode}.json`;
  eventSource = new EventSource(sseUrl);

  eventSource.onmessage = (event) => {
    try {
      const payload = JSON.parse(event.data);
      if (payload && payload.path === '/' && payload.data) {
        // Master reset / complete reload
        mergeStates(payload.data);
      } else if (payload && payload.path && payload.data) {
        // Delta update (Firebase format: path: "/char", data: {level: 2})
        const remoteState = { ...getState() };
        const keys = payload.path.split('/').filter(k => k);
        
        let target = remoteState;
        for (let i = 0; i < keys.length - 1; i++) {
          target = target[keys[i]];
        }
        if (keys.length > 0) {
          target[keys[keys.length - 1]] = payload.data;
          mergeStates(remoteState);
        }
      }
    } catch (e) {
      console.error("SSE parse error:", e);
    }
  };

  eventSource.onerror = (err) => {
    console.warn("SSE disconnected, attempting reconnect...", err);
    updateSyncStatusText('Переподключение...', 'text-yellow');
  };
}

export function disconnectSync() {
  if (eventSource) {
    eventSource.close();
    eventSource = null;
  }
  const state = getState();
  state.sync.enabled = false;
  updateSyncStatusText('Не подключено (Локально)', 'text-yellow');
}

// Push local state to cloud
export function pushStateToCloud() {
  const state = getState();
  if (!state.sync.enabled || !state.sync.code || isPushing) return;

  isPushing = true;
  const url = `${DATABASE_URL}/ai_rpg_saves/${state.sync.code}.json`;

  fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(state)
  })
  .then(() => {
    isPushing = false;
  })
  .catch(err => {
    console.error("Cloud push failed:", err);
    isPushing = false;
  });
}

// Merge remote state with local based on timestamp
function mergeStates(remoteState) {
  const localState = getState();
  
  // Compare timestamps
  const remoteTime = remoteState.lastChecked || 0;
  const localTime = localState.lastChecked || 0;

  if (remoteTime > localTime) {
    // Remote is newer, replace local
    // Keep local API key and sync settings just in case
    const currentApiKey = localState.apiKey;
    const currentSync = localState.sync;
    
    // Copy remote fields
    Object.assign(localState.char, remoteState.char);
    Object.assign(localState.attrs, remoteState.attrs);
    localState.buffs = remoteState.buffs || [];
    localState.debuffs = remoteState.debuffs || {};
    localState.rustLevel = remoteState.rustLevel || 0;
    Object.assign(localState.boss, remoteState.boss);
    localState.dailies = remoteState.dailies || [];
    localState.logs = remoteState.logs || [];
    localState.lastChecked = remoteState.lastChecked;
    localState.lastActivityTime = remoteState.lastActivityTime;
    
    localState.apiKey = currentApiKey;
    localState.sync = currentSync;

    // Trigger UI updates
    localStorage.setItem('ai_rpg_state', JSON.stringify(localState));
    window.dispatchEvent(new CustomEvent('state-updated-from-cloud'));
    
    // Play refresh sound
    window.dispatchEvent(new CustomEvent('play-sound', { detail: 'heal' }));
  }
}

function updateSyncStatusText(text, cssClass) {
  const el = document.getElementById('sync-status-text');
  if (el) {
    el.innerText = text;
    el.className = '';
    el.classList.add(cssClass);
  }
}

// Global hook listener for state updates
window.addEventListener('sync-push-state', () => {
  pushStateToCloud();
});
