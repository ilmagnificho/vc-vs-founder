/**
 * Game Engine - State management, turn progression, condition branching
 */
const GameEngine = (() => {
  // Game state
  let state = {
    role: null,        // 'founder' or 'vc'
    chapter: 0,
    eventIndex: 0,
    stats: {},
    flags: [],
    history: [],       // track choices for ending determination
  };

  // Default stats
  const FOUNDER_STATS = {
    runway: { value: 8, icon: '💰', label: '런웨이', unit: '개월', max: 12 },
    mental: { value: 100, icon: '🧠', label: '멘탈', unit: '%', max: 100 },
    persuasion: { value: 50, icon: '💬', label: '설득력', unit: '', max: 100 },
  };

  const VC_STATS = {
    powder: { value: 100, icon: '💰', label: '파우더', unit: '억', max: 100 },
    bossGaze: { value: 50, icon: '👔', label: '보스눈치', unit: '', max: 100 },
    eye: { value: 50, icon: '👁️', label: '심미안', unit: '', max: 100 },
  };

  function init(role) {
    state = {
      role,
      chapter: 1,
      eventIndex: 0,
      stats: {},
      flags: [],
      history: [],
    };

    const template = role === 'founder' ? FOUNDER_STATS : VC_STATS;
    for (const key in template) {
      state.stats[key] = { ...template[key] };
    }
  }

  function getState() {
    return { ...state };
  }

  function getStats() {
    return state.stats;
  }

  function getScenarios() {
    return state.role === 'founder' ? FounderScenarios : VCScenarios;
  }

  function getCurrentEvent() {
    const scenarios = getScenarios();
    const chapter = scenarios.find(ch => ch.chapter === state.chapter);
    if (!chapter) return null;

    // Find next eligible event
    while (state.eventIndex < chapter.events.length) {
      const event = chapter.events[state.eventIndex];
      if (checkCondition(event.condition)) {
        return event;
      }
      state.eventIndex++;
    }
    return null;
  }

  function checkCondition(condition) {
    if (!condition) return true;

    if (condition.flag) {
      return state.flags.includes(condition.flag);
    }
    if (condition.notFlag) {
      return !state.flags.includes(condition.notFlag);
    }
    if (condition.stat) {
      const s = state.stats[condition.stat];
      if (!s) return false;
      if (condition.gte !== undefined) return s.value >= condition.gte;
      if (condition.lte !== undefined) return s.value <= condition.lte;
      if (condition.gt !== undefined) return s.value > condition.gt;
      if (condition.lt !== undefined) return s.value < condition.lt;
    }
    if (condition.or) {
      return condition.or.some(c => checkCondition(c));
    }
    if (condition.and) {
      return condition.and.every(c => checkCondition(c));
    }
    return true;
  }

  function applyChoice(choiceIndex) {
    const event = getCurrentEvent();
    if (!event) return null;

    const choice = event.choices[choiceIndex];
    if (!choice) return null;

    // Record history
    state.history.push({
      chapter: state.chapter,
      eventId: event.id,
      choiceIndex,
      choiceText: choice.text,
    });

    // Apply stat effects
    const effects = {};
    if (choice.effects) {
      for (const key in choice.effects) {
        if (state.stats[key]) {
          const prev = state.stats[key].value;
          state.stats[key].value = Math.max(0, Math.min(
            state.stats[key].max,
            state.stats[key].value + choice.effects[key]
          ));
          effects[key] = {
            delta: choice.effects[key],
            prev,
            current: state.stats[key].value,
            label: state.stats[key].label,
            icon: state.stats[key].icon,
          };
        }
      }
    }

    // Apply flags
    if (choice.flags) {
      choice.flags.forEach(f => {
        if (!state.flags.includes(f)) {
          state.flags.push(f);
        }
      });
    }

    // Remove flags
    if (choice.removeFlags) {
      state.flags = state.flags.filter(f => !choice.removeFlags.includes(f));
    }

    // Check game over
    const gameOver = checkGameOver();

    return {
      result: choice.result,
      resultSpeaker: choice.resultSpeaker || null,
      effects,
      flags: choice.flags || [],
      gameOver,
      nextEvent: choice.nextEvent || null,
    };
  }

  function checkGameOver() {
    if (state.role === 'founder') {
      if (state.stats.runway.value <= 0) return 'runway_zero';
      if (state.stats.mental.value <= 0) return 'burnout';
    } else {
      if (state.stats.bossGaze.value <= 0) return 'fired';
    }
    return null;
  }

  function advanceEvent() {
    state.eventIndex++;
    const event = getCurrentEvent();
    if (event) return true;

    // Try next chapter
    state.chapter++;
    state.eventIndex = 0;
    const scenarios = getScenarios();
    const nextChapter = scenarios.find(ch => ch.chapter === state.chapter);
    return !!nextChapter;
  }

  function jumpToEvent(eventId) {
    const scenarios = getScenarios();
    for (const chapter of scenarios) {
      for (let i = 0; i < chapter.events.length; i++) {
        if (chapter.events[i].id === eventId) {
          state.chapter = chapter.chapter;
          state.eventIndex = i;
          return true;
        }
      }
    }
    return false;
  }

  function applyChapterDecay() {
    if (state.role === 'founder') {
      const decay = 1; // 1 month per chapter transition
      state.stats.runway.value = Math.max(0, state.stats.runway.value - decay);
    }
  }

  function hasFlag(flag) {
    return state.flags.includes(flag);
  }

  function addFlag(flag) {
    if (!state.flags.includes(flag)) {
      state.flags.push(flag);
    }
  }

  function evaluateEnding() {
    return EndingsSystem.evaluate(state);
  }

  return {
    init,
    getState,
    getStats,
    getCurrentEvent,
    applyChoice,
    advanceEvent,
    jumpToEvent,
    applyChapterDecay,
    hasFlag,
    addFlag,
    checkCondition,
    evaluateEnding,
    checkGameOver,
  };
})();
