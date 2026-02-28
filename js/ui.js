/**
 * UI Rendering - Screen management, typing effects, animations
 */
const GameUI = (() => {
  let typingTimeout = null;
  let typingQueue = [];
  let isTyping = false;
  let skipTyping = false;

  // DOM refs
  const screens = {
    title: () => document.getElementById('screen-title'),
    select: () => document.getElementById('screen-select'),
    game: () => document.getElementById('screen-game'),
    result: () => document.getElementById('screen-result'),
    ending: () => document.getElementById('screen-ending'),
  };

  function init() {
    // Title screen
    document.getElementById('btn-start').addEventListener('click', () => {
      showScreen('select');
    });

    // Role selection
    document.getElementById('role-founder').addEventListener('click', () => {
      startGame('founder');
    });
    document.getElementById('role-vc').addEventListener('click', () => {
      startGame('vc');
    });

    // Click to skip typing
    document.getElementById('screen-game').addEventListener('click', (e) => {
      if (isTyping && !e.target.closest('.choice-btn')) {
        skipTyping = true;
      }
    });
  }

  function showScreen(name) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = screens[name]();
    if (screen) {
      screen.classList.add('active');
    }
  }

  function startGame(role) {
    GameEngine.init(role);
    showScreen('game');
    updateHUD();
    playCurrentEvent();
  }

  function updateHUD() {
    const state = GameEngine.getState();
    const stats = GameEngine.getStats();
    const scenarios = state.role === 'founder' ? FounderScenarios : VCScenarios;
    const chapter = scenarios.find(ch => ch.chapter === state.chapter);

    document.getElementById('hud-chapter').textContent = chapter
      ? `CH${state.chapter}: ${chapter.title}`
      : `챕터 ${state.chapter}`;

    const statsEl = document.getElementById('hud-stats');
    statsEl.innerHTML = '';
    for (const key in stats) {
      const s = stats[key];
      const statDiv = document.createElement('div');
      statDiv.className = 'hud-stat';
      statDiv.id = `stat-${key}`;

      const pct = (s.value / s.max) * 100;
      let barClass = 'bar-fill';
      if (pct <= 25) barClass += ' bar-danger';
      else if (pct <= 50) barClass += ' bar-warning';

      statDiv.innerHTML = `
        <span class="stat-icon">${s.icon}</span>
        <span class="stat-label">${s.label}</span>
        <div class="stat-bar"><div class="${barClass}" style="width:${pct}%"></div></div>
        <span class="stat-value">${s.unit === '개월' ? s.value + s.unit : s.unit === '억' ? s.value + s.unit : s.value + (s.unit || '')}</span>
      `;
      statsEl.appendChild(statDiv);
    }
  }

  async function playCurrentEvent() {
    const event = GameEngine.getCurrentEvent();
    if (!event) {
      // No more events, check ending
      finishGame();
      return;
    }

    // Clear previous content
    const narrationBox = document.getElementById('narration-box');
    const dialogueBox = document.getElementById('dialogue-box');
    const infoBox = document.getElementById('info-box');
    const choicesEl = document.getElementById('game-choices');

    narrationBox.innerHTML = '';
    narrationBox.style.display = 'none';
    dialogueBox.style.display = 'none';
    infoBox.innerHTML = '';
    infoBox.style.display = 'none';
    choicesEl.innerHTML = '';
    choicesEl.style.display = 'none';

    // Show narration
    const narrationText = event.dynamicNarration
      ? event.dynamicNarration(GameEngine.getStats())
      : event.narration;

    if (narrationText) {
      narrationBox.style.display = 'block';
      await typeText(narrationBox, narrationText, 'narration');
      await delay(300);
    }

    // Show info box
    if (event.infoBox) {
      infoBox.style.display = 'block';
      infoBox.innerHTML = '';
      const pre = document.createElement('pre');
      pre.textContent = event.infoBox;
      infoBox.appendChild(pre);
      infoBox.classList.add('fade-in');
      await delay(500);
    }

    // Show dialogue
    if (event.speaker && event.text) {
      dialogueBox.style.display = 'block';
      document.getElementById('speaker').textContent = `${event.speaker.emoji} ${event.speaker.name}`;
      const textEl = document.getElementById('dialogue-text');
      textEl.innerHTML = '';
      await typeText(textEl, event.text, 'dialogue');
      await delay(300);
    } else if (event.text && !event.speaker) {
      // Narrator text without speaker
      narrationBox.style.display = 'block';
      if (narrationText) {
        const spacer = document.createElement('div');
        spacer.style.height = '12px';
        narrationBox.appendChild(spacer);
      }
      await typeText(narrationBox, event.text, 'narrator-comment');
      await delay(300);
    }

    // Show choices or auto-advance
    if (event.choices && event.choices.length > 0) {
      showChoices(event);
    } else {
      // Auto-advance narration
      showContinueButton();
    }
  }

  function showChoices(event) {
    const choicesEl = document.getElementById('game-choices');
    choicesEl.innerHTML = '';
    choicesEl.style.display = 'flex';

    event.choices.forEach((choice, idx) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn fade-in';
      btn.style.animationDelay = `${idx * 0.1}s`;

      const label = String.fromCharCode(65 + idx); // A, B, C, D
      btn.innerHTML = `<span class="choice-label">${label}</span><span class="choice-text">${choice.text}</span>`;

      btn.addEventListener('click', () => handleChoice(idx));
      choicesEl.appendChild(btn);
    });
  }

  function showContinueButton() {
    const choicesEl = document.getElementById('game-choices');
    choicesEl.innerHTML = '';
    choicesEl.style.display = 'flex';

    const btn = document.createElement('button');
    btn.className = 'choice-btn continue-btn fade-in';
    btn.innerHTML = '<span class="choice-text">계속...</span>';
    btn.addEventListener('click', () => {
      if (GameEngine.advanceEvent()) {
        updateHUD();
        playCurrentEvent();
      } else {
        finishGame();
      }
    });
    choicesEl.appendChild(btn);
  }

  async function handleChoice(choiceIndex) {
    const event = GameEngine.getCurrentEvent();
    const choice = event.choices[choiceIndex];

    // Handle stat checks
    if (choice.statCheck) {
      const stats = GameEngine.getStats();
      const passed = EndingsSystem.getStatCheckResult(choice.statCheck, stats);
      if (passed) {
        GameEngine.addFlag(choice.statCheck.successFlag);
      } else {
        GameEngine.addFlag(choice.statCheck.failFlag);
      }
    }

    // Handle probability checks
    if (choice.probabilityCheck) {
      const roll = Math.random();
      if (roll < choice.probabilityCheck.successRate) {
        GameEngine.addFlag(choice.probabilityCheck.successFlag);
      } else {
        GameEngine.addFlag(choice.probabilityCheck.failFlag);
      }
    }

    const outcome = GameEngine.applyChoice(choiceIndex);
    if (!outcome) return;

    // Hide choices
    const choicesEl = document.getElementById('game-choices');
    choicesEl.style.display = 'none';

    // Show stat effects
    if (outcome.effects && Object.keys(outcome.effects).length > 0) {
      showStatEffects(outcome.effects);
    }

    updateHUD();

    // Show result text
    if (outcome.result || choice.result) {
      const resultText = outcome.result || choice.result;
      await showResultScreen(resultText, outcome.resultSpeaker || choice.resultSpeaker);
    } else if (choice.statCheck) {
      // Generate result text based on stat check
      const stats = GameEngine.getStats();
      const passed = EndingsSystem.getStatCheckResult(choice.statCheck, stats);
      const resultText = generateStatCheckResult(event, choice, passed);
      await showResultScreen(resultText, null);
    } else if (choice.probabilityCheck) {
      const succeeded = GameEngine.hasFlag(choice.probabilityCheck.successFlag);
      const resultText = getProbabilityResultText(event.id, choice, succeeded);
      await showResultScreen(resultText, null);
    }

    // Check game over
    if (outcome.gameOver) {
      await delay(500);
      finishGame();
      return;
    }

    // Advance to next event
    if (outcome.nextEvent) {
      GameEngine.jumpToEvent(outcome.nextEvent);
    } else {
      GameEngine.advanceEvent();
    }

    // Apply chapter decay on chapter change
    const state = GameEngine.getState();
    const prevChapter = event.chapter;
    if (state.chapter !== prevChapter) {
      GameEngine.applyChapterDecay();
      updateHUD();
    }

    // Check game over after decay
    const gameOver = GameEngine.checkGameOver();
    if (gameOver) {
      await delay(500);
      finishGame();
      return;
    }

    await delay(200);
    playCurrentEvent();
  }

  function getProbabilityResultText(eventId, choice, succeeded) {
    // Context-specific result text for probability checks
    if (choice.flags && choice.flags.includes('active_followup')) {
      return succeeded
        ? '미팅이 잡혔다! 작은 희망의 불씨.'
        : '...읽씹. 24시간이 지나도 답이 없다. 익숙해져야 한다.';
    }
    if (choice.flags && choice.flags.includes('negotiate_valuation')) {
      return succeeded
        ? '협상 성공! Pre 50억으로 밸류가 올랐다. 대담함이 보상받는 순간.'
        : '딜이 파토났다. VC가 테이블을 떠났다. 욕심이 화를 불렀다.';
    }
    if (choice.flags && choice.flags.includes('termsheet_aggressive')) {
      return succeeded
        ? '대표가 불만이지만 수용했다. 강한 보호조항이 붙은 텀시트에 사인했다.'
        : '대표가 거부했다. "이 조건으로는 못 합니다."\n\n딜이 깨졌다.';
    }
    // Fallback
    return succeeded ? '성공!' : '실패...';
  }

  function generateStatCheckResult(event, choice, passed) {
    const state = GameEngine.getState();

    if (state.role === 'founder') {
      if (passed) {
        return '파트너들의 표정이 바뀌었다. 고개를 끄덕이기 시작한다.\n\n"좋습니다. 내부적으로 진행해보죠."\n\n투심위 통과! 드디어 빛이 보인다.';
      } else {
        if (choice.flags && choice.flags.includes('pitch_fomo')) {
          return 'VC가 블러핑을 간파했다.\n\n"다른 VC요? 어디죠? 확인 좀 해볼게요."\n\n...침묵이 흐른다. 투심위 탈락.';
        }
        return '"좋은데- 좀 더 봐야 할 것 같아요"\n\n그 \'좋은데-\'가 거절의 시작이라는 걸, 이제는 안다.';
      }
    } else {
      if (passed) {
        return '파트너들이 서로 눈을 마주친다. 마침내 GP가 입을 열었다.\n\n"좋아, 진행하자."\n\n투심위 통과!';
      } else {
        if (choice.flags && choice.flags.includes('ic_fomo')) {
          return '"FOMO로 투자하는 거 아니야."\n\nGP의 한마디에 회의실이 조용해졌다. 보류.';
        }
        return '"확신의 근거가?"\n\n...대답하지 못했다. 보류. 사실상 탈락이다.';
      }
    }
  }

  async function showResultScreen(text, speaker) {
    showScreen('result');
    const resultBox = document.getElementById('result-box');
    resultBox.innerHTML = '';

    if (speaker) {
      const speakerEl = document.createElement('div');
      speakerEl.className = 'result-speaker';
      speakerEl.textContent = `${speaker.emoji} ${speaker.name}`;
      resultBox.appendChild(speakerEl);
    }

    const textEl = document.createElement('div');
    textEl.className = 'result-text';
    resultBox.appendChild(textEl);

    await typeText(textEl, text, 'result');

    // Continue button
    return new Promise((resolve) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn continue-btn fade-in';
      btn.innerHTML = '<span class="choice-text">계속...</span>';
      btn.addEventListener('click', () => {
        showScreen('game');
        resolve();
      });
      resultBox.appendChild(btn);
    });
  }

  function showStatEffects(effects) {
    const container = document.getElementById('stat-popup-container');

    for (const key in effects) {
      const e = effects[key];
      if (e.delta === 0) continue;

      const popup = document.createElement('div');
      popup.className = 'stat-popup ' + (e.delta > 0 ? 'stat-up' : 'stat-down');
      popup.textContent = `${e.icon} ${e.label} ${e.delta > 0 ? '+' : ''}${e.delta}`;
      container.appendChild(popup);

      // Flash the stat in HUD
      const statEl = document.getElementById(`stat-${key}`);
      if (statEl) {
        statEl.classList.add(e.delta > 0 ? 'flash-green' : 'flash-red');
        setTimeout(() => statEl.classList.remove('flash-green', 'flash-red'), 600);
      }

      setTimeout(() => popup.remove(), 2000);
    }
  }

  function finishGame() {
    const ending = GameEngine.evaluateEnding();
    showEndingScreen(ending);
  }

  function showEndingScreen(ending) {
    showScreen('ending');
    const card = document.getElementById('ending-card');
    const actions = document.getElementById('ending-actions');

    const stats = ending.stats;
    let statsHtml = '';
    for (const key in stats) {
      const s = stats[key];
      const displayValue = s.unit === '개월' ? `${s.value}${s.unit}` : s.unit === '억' ? `${s.value}${s.unit}` : `${s.value}${s.unit || ''}`;
      statsHtml += `<div class="ending-stat">${s.icon} ${s.label}: ${displayValue}</div>`;
    }

    const roleLabel = ending.role === 'founder' ? '창업자' : 'VC';
    const oppositeLabel = ending.role === 'founder' ? 'VC' : '창업자';

    card.innerHTML = `
      <div class="ending-header">
        <div class="ending-game-title">스타트업 서바이벌 RPG</div>
        <div class="ending-ep">EP.1 - Pre-A 라운드</div>
      </div>
      <div class="ending-divider"></div>
      <div class="ending-role">${roleLabel} 루트</div>
      <div class="ending-emoji">${ending.emoji}</div>
      <div class="ending-title">${ending.title}</div>
      <div class="ending-subtitle">"${ending.subtitle}"</div>
      <div class="ending-stats">${statsHtml}</div>
      <div class="ending-divider"></div>
      <div class="ending-quote">"${ending.quote}"</div>
    `;

    actions.innerHTML = '';

    // Share button
    const shareBtn = document.createElement('button');
    shareBtn.className = 'action-btn share-btn';
    shareBtn.textContent = '결과 카드 저장하기';
    shareBtn.addEventListener('click', () => ShareSystem.generateCard(ending));
    actions.appendChild(shareBtn);

    // SNS share buttons
    const snsDiv = document.createElement('div');
    snsDiv.className = 'sns-buttons';
    snsDiv.innerHTML = `
      <button class="sns-btn sns-x" onclick="ShareSystem.shareToX()">X</button>
      <button class="sns-btn sns-kakao" onclick="ShareSystem.shareToKakao()">카카오</button>
      <button class="sns-btn sns-linkedin" onclick="ShareSystem.shareToLinkedIn()">LinkedIn</button>
      <button class="sns-btn sns-copy" onclick="ShareSystem.copyLink()">링크 복사</button>
    `;
    actions.appendChild(snsDiv);

    // Play other route
    const otherBtn = document.createElement('button');
    otherBtn.className = 'action-btn other-route-btn';
    otherBtn.textContent = `${oppositeLabel}는 당신을 어떻게 봤을까? → ${oppositeLabel} 루트 도전하기`;
    otherBtn.addEventListener('click', () => {
      startGame(ending.role === 'founder' ? 'vc' : 'founder');
    });
    actions.appendChild(otherBtn);

    // Replay
    const replayBtn = document.createElement('button');
    replayBtn.className = 'action-btn replay-btn';
    replayBtn.textContent = '다시 도전하기';
    replayBtn.addEventListener('click', () => {
      showScreen('select');
    });
    actions.appendChild(replayBtn);

    // EP.2 teaser
    const teaserDiv = document.createElement('div');
    teaserDiv.className = 'ep2-teaser';
    teaserDiv.innerHTML = 'EP.2 - 시리즈A 편 Coming Soon...<br><span class="teaser-sub">기대된다면 공유해주세요!</span>';
    actions.appendChild(teaserDiv);
  }

  // === Typing Effect ===
  function typeText(element, text, className) {
    return new Promise((resolve) => {
      skipTyping = false;
      isTyping = true;

      const span = document.createElement('span');
      if (className) span.className = className;
      element.appendChild(span);

      let i = 0;
      const speed = className === 'narration' ? 30 : 25;

      function type() {
        if (skipTyping) {
          span.textContent = text;
          isTyping = false;
          resolve();
          return;
        }

        if (i < text.length) {
          span.textContent = text.substring(0, i + 1);
          i++;
          typingTimeout = setTimeout(type, speed);
        } else {
          isTyping = false;
          resolve();
        }
      }

      type();
    });
  }

  function delay(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return {
    showScreen,
    startGame,
    updateHUD,
    showEndingScreen,
  };
})();
