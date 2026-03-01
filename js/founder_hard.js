/**
 * Founder Hard Route (Series B / Global) — 창업자 루트 HARD
 * "이제 글로벌이다" — 해외 VC, 크로스보더 딜, 영어 IR
 * 사업도 어렵고, 투자자도 두 배다. NORMAL 클리어 후 오픈.
 *
 * Part 2에서 시나리오 전체 데이터가 업데이트될 예정입니다.
 */
const FounderHardScenarios = [
  // ===== CHAPTER 1: 글로벌 IR — "세계가 무대다" =====
  {
    chapter: 1,
    title: '글로벌 IR — "세계가 무대다"',
    events: [
      {
        id: 'fh_ch1_intro',
        chapter: 1,
        speaker: null,
        narration: 'Series A 완료. 이제 Series B다.\n\n국내 VC는 한계가 있다. Series B 300억 규모의 딜은 해외 VC 없이는 불가능하다. 당신의 이야기를 영어로 해야 한다. 당신의 숫자를 달러로 설명해야 한다.\n\nNew York. Singapore. San Francisco.\n\n이미 지쳐있지만, 이제 시작이다.',
        text: null,
        choices: null,
        condition: null,
      },
      {
        id: 'fh_ch1_ev1',
        chapter: 1,
        speaker: { name: 'IR 컨설턴트', emoji: '🌍' },
        narration: '글로벌 IR 준비 미팅. 뉴욕 로드쇼 일정 3주 전.',
        text: '"대표님, 솔직히 말씀드릴게요. 영어 IR 덱이 한국식 스타일이에요. 해외 VC들은 이렇게 보지 않아요. Problem-Solution-Market-Traction-Team-Ask 순서로 바꿔야 해요. 그리고 덱 전체를 영어로 다시 쓰는 데 2주는 걸려요."',
        choices: [
          {
            text: '전문가에게 맡겨서 완전히 새로 제작 (비용 +500만원)',
            effects: { runway: -0.5, persuasion: 15, mental: -5 },
            result: '500만원짜리 글로벌 IR 덱이 완성됐다. Silicon Valley 스타일의 클린한 덱.\n\n"This is exactly what we want to see." 첫 반응이 달랐다.',
            flags: ['global_deck_pro'],
          },
          {
            text: '직접 영어로 다시 쓴다',
            effects: { runway: -0.5, mental: -15, persuasion: 8 },
            result: '2주 동안 밤을 새웠다. 영어 교정도 받았다. 100% 완벽하진 않지만 당신만의 언어가 담겼다.\n\n"Your passion comes through." 영어가 완벽하지 않아도 진정성은 전달된다.',
            flags: ['global_deck_diy'],
          },
          {
            text: '기존 덱을 그냥 번역만 한다',
            effects: { mental: 5, persuasion: -10 },
            result: '"This feels like a Korean deck that was translated."\n\n첫 미팅에서 바로 느꼈다. 글로벌 VC는 다른 언어로 생각한다.',
            flags: ['global_deck_translated'],
          },
        ],
        condition: null,
      },
      {
        id: 'fh_ch1_ev2',
        chapter: 1,
        speaker: { name: 'GHF Capital (싱가포르)', emoji: '🇸🇬' },
        narration: '첫 번째 해외 VC 화상 미팅. 싱가포르 시간 오후 2시. 한국 시간 오후 3시.',
        text: '"We\'ve seen your numbers. MoM growth of 15% is good, but we need to understand your global expansion strategy. Korea market is small. How do you plan to enter SEA or US?"',
        choices: [
          {
            text: '"We\'re planning to enter Japan and SEA within 18 months." (구체적인 플랜)',
            effects: { persuasion: 15, mental: -8 },
            result: '"Which country first? What\'s your GTM strategy there?"\n\n질문이 연속으로 날아왔다. 준비된 답변이 있었기에 막히지 않았다.\n\n"Impressive preparation."',
            flags: ['global_plan_ready'],
          },
          {
            text: '"We\'re focused on Korea first, global later." (솔직)',
            effects: { persuasion: -5, mental: 5 },
            result: '"That\'s fine, but we invest in global companies. Why should we invest now instead of when you\'re ready?"\n\n정직하지만, 해외 VC의 투자 thesis와 맞지 않을 수 있다.',
            flags: ['korea_focused_honest'],
          },
          {
            text: '"We have a user base in 5 countries already." (과장)',
            effects: { mental: -12 },
            result: null,
            flags: ['global_overstate'],
            probabilityCheck: { successRate: 0.25, successFlag: 'global_bluff_passed', failFlag: 'global_bluff_failed' },
          },
        ],
        condition: null,
      },
      {
        id: 'fh_ch1_ev3',
        chapter: 1,
        speaker: { name: '뉴욕 로드쇼', emoji: '🗽' },
        narration: '뉴욕 로드쇼 첫째 날. 3개 VC 미팅 예정. 제트래그가 한계에 왔다.',
        text: '첫 번째 미팅이 20분 후다. 갑자기 담당 파트너에게서 카톡이 왔다:\n"I\'m so sorry - I have an emergency. Can we reschedule to next week?"\n\n뉴욕까지 와서. 항공권 160만원. 호텔 3박 60만원.',
        choices: [
          {
            text: '"Of course. Would Thursday work?" (프로답게 수용)',
            effects: { mental: -15, persuasion: 5 },
            result: '"Actually, I can squeeze in 15 minutes at 4PM today."\n\n참을 인자 셋이면 투심위를 넘는다. 오후에 15분 미팅이 잡혔다.',
            flags: ['ny_meeting_rescheduled'],
          },
          {
            text: '다른 파트너에게 직접 연락한다',
            effects: { mental: -8, persuasion: 8 },
            result: '"Hey - I\'m in NYC today and heard [파트너 이름] had to cancel. Any chance you\'re free?"\n\n대담한 시도. 30% 확률로 미팅이 잡혔다.',
            flags: ['ny_direct_contact'],
            probabilityCheck: { successRate: 0.35, successFlag: 'ny_alt_meeting', failFlag: 'ny_no_meeting' },
          },
          {
            text: '오늘 남은 일정 집중, 다음 번에 다시 온다',
            effects: { mental: 5, runway: -0.5 },
            result: '현명하게 에너지를 아꼈다. 남은 두 미팅에 집중했다.\n\n뉴욕은 다시 온다. 런웨이가 좀 더 줄었지만.',
            flags: ['ny_regrouped'],
          },
        ],
        condition: null,
      },
    ],
  },

  // ===== CHAPTER 2: 해외 미팅 — "영어로 생존하기" =====
  {
    chapter: 2,
    title: '해외 미팅 — "영어로 생존하기"',
    events: [
      {
        id: 'fh_ch2_intro',
        chapter: 2,
        speaker: null,
        narration: '로드쇼 2주차. 10개 미팅 완료. 피드백은 다양하다.\n\n"Market size in Korea alone is too small for us."\n"Your retention numbers are really impressive."\n"Who else is in the round?"\n"We\'ll need to see 12 more months of data."\n\n모든 답변이 다르다. 어떤 답이 맞는지 모른다. 그냥 계속 밀어붙이는 수밖에.',
        text: null,
        choices: null,
        condition: null,
      },
      {
        id: 'fh_ch2_ev1',
        chapter: 2,
        speaker: { name: 'Sequoia India 파트너', emoji: '🦁' },
        narration: '가장 중요한 미팅. Sequoia India가 한국 스타트업에 관심을 보였다.',
        text: '"We like your unit economics. But let me be direct - we\'ve seen 50 Korean companies this year. Most fail to localize for SEA. What makes you different?"',
        choices: [
          {
            text: '구체적인 로컬라이제이션 전략과 데이터를 제시한다',
            effects: { persuasion: 20, mental: -10 },
            result: '"This is more detailed than most." 파트너가 고개를 끄덕였다.\n\n"Send me your full data room. I\'ll review this week."',
            flags: ['sequoia_interest'],
          },
          {
            text: '"우리 팀에 SEA 출신 멤버가 있습니다." (약점을 보완)',
            effects: { persuasion: 10, mental: -5 },
            result: '"Oh? Who? What\'s their background?"\n\n팀원 소개를 했다. 작은 팀이지만 다양성이 있다는 인상을 줬다.',
            flags: ['sea_team_member'],
          },
          {
            text: '"We\'re different because our product is 10x better." (모호한 자신감)',
            effects: { persuasion: -12, mental: -8 },
            result: '"10x better in what way?" "Can you quantify that?"\n\n구체적이지 않은 답변은 해외 VC에게 통하지 않는다. 미팅 분위기가 식었다.',
            flags: ['vague_pitch'],
          },
        ],
        condition: null,
      },
      {
        id: 'fh_ch2_ev2',
        chapter: 2,
        speaker: { name: '국내 공동투자자 (Series A VC)', emoji: '🧑‍💼' },
        narration: '예상치 못한 전화. 국내 기존 투자자가 연락해왔다.',
        text: '"대표님, 제가 해외 VC들이랑 얘기해봤는데요. 사실 해외 VC들이 좀 걱정되는 부분이 있대요. 대표님이 너무 aggressive하게 접근한다고... 음. 저는 어떻게 생각하시는지 여쭤보고 싶어서요."',
        choices: [
          {
            text: '"어떤 피드백이었나요? 구체적으로 알고 싶어요."',
            effects: { persuasion: 8, mental: -8 },
            result: '"사실 [VC A]에서 follow-up을 안 할 것 같다고 했어요. 이유는..."\n\n직접 피드백을 얻었다. 아팠지만 다음 미팅을 개선할 수 있었다.',
            flags: ['honest_feedback_received'],
          },
          {
            text: '"저는 제 방식대로 합니다." (무시)',
            effects: { mental: 5, persuasion: -8 },
            result: '"...알겠어요."\n\n기존 투자자와의 관계가 약간 껄끄러워졌다. 다음 라운드에서 이 투자자의 지원이 필요할 수 있는데.',
            flags: ['ignored_feedback'],
          },
          {
            text: '"피드백 감사해요. 방식을 조정해볼게요."',
            effects: { persuasion: 5, mental: -5 },
            result: '"와, 제가 말씀드리기 좀 망설였는데 잘 받아주시네요."\n\n관계가 오히려 돈독해졌다. 그리고 피드백 덕분에 접근 방식이 개선됐다.',
            flags: ['adapted_approach'],
          },
        ],
        condition: null,
      },
      {
        id: 'fh_ch2_ev3',
        chapter: 2,
        speaker: { name: '시스템', emoji: '⚡' },
        narration: '로드쇼 3주차. 예상치 못한 상황이 발생했다.',
        text: '한국 미디어에 기사가 떴다.\n\n"[당신 회사], Series B 300억 추진 중 — 해외 투자유치 난항"\n\n익명의 소식통 발. 누가 흘렸는지 모른다.',
        choices: [
          {
            text: '미디어에 공식 입장을 낸다: "협의 중이나 구체적 사안은 확인 불가"',
            effects: { persuasion: 8, mental: -10 },
            result: '"We saw the news." 해외 VC들이 이미 알고 있었다.\n\n"것도 나름 PR이네요."라는 반응도 있었다. 노이즈가 양날의 검이 됐다.',
            flags: ['media_managed'],
          },
          {
            text: '아무 대응 안 한다 (무시)',
            effects: { mental: -5, persuasion: -5 },
            result: '"Hey, is this true? We saw this article..." 해외 VC에서 직접 물어봤다.\n\n침묵은 인정으로 받아들여진다.',
            flags: ['media_ignored'],
          },
          {
            text: '기자를 찾아가서 정정 기사를 요청한다',
            effects: { runway: -0.5, mental: -8, persuasion: 5 },
            result: '"기사 내용 중 사실과 다른 부분이 있습니다."\n\n정정 기사는 나오지 않았지만, 기자와의 관계가 생겼다. 다음 번엔 좋은 기사가 나올 수도.',
            flags: ['journalist_contacted'],
          },
        ],
        condition: null,
      },
    ],
  },

  // ===== CHAPTER 3: 크로스보더 딜 — "법무가 달라" =====
  {
    chapter: 3,
    title: '크로스보더 딜 — "법무가 달라"',
    events: [
      {
        id: 'fh_ch3_intro',
        chapter: 3,
        speaker: null,
        narration: '마침내 두 곳의 해외 VC가 관심을 보였다.\n\nGHF Capital (싱가포르): 100억 투자 의향\nSequoia India: 관심, 추가 DD 요청\n\n문제는 구조다. Cayman Islands 지주회사? BVI 구조? 국내 VC의 지분 보호는?\n\n이것은 단순한 투자 계약이 아니다. 두 나라의 법무팀이 싸우는 전쟁이다.',
        text: null,
        choices: null,
        condition: null,
      },
      {
        id: 'fh_ch3_ev1',
        chapter: 3,
        speaker: { name: '국내 법무법인', emoji: '⚖️' },
        narration: '법무 미팅. 해외 투자 구조 설계 논의.',
        text: '"대표님, 해외 투자를 받으려면 Flip을 해야 합니다. 현재 한국 법인을 케이맨 제도 지주회사 아래로 넣는 구조로 재편해야 해요. 비용은 약 5,000만원, 기간은 3-4개월입니다.\n\n이 구조 전환 없이는 GHF Capital이 투자할 수 없다고 했어요."',
        choices: [
          {
            text: 'Flip을 진행한다 (5,000만원 + 3개월)',
            effects: { runway: -1, mental: -15, persuasion: 10 },
            result: '비용이 크고 시간이 걸렸다. 런웨이가 크게 줄었다.\n\n하지만 "We\'re Cayman-structured" 말 한마디에 해외 VC들의 눈빛이 달라졌다.',
            flags: ['flip_done'],
          },
          {
            text: 'GHF Capital에 한국 구조로 투자 가능한지 협상한다',
            effects: { persuasion: 5, mental: -10 },
            result: '"We\'ve done Korean investments before. But it needs additional legal review..."\n\n6주 더 걸렸다. 하지만 Flip 비용을 절약했다.',
            flags: ['no_flip_negotiated'],
          },
          {
            text: 'Flip 없이 투자받을 수 있는 다른 구조를 찾는다',
            effects: { runway: -0.5, persuasion: 8, mental: -8 },
            result: '반반 구조(Half-Flip)를 제안했다. 국내 지주사와 해외 지주사를 동시에 운영하는 방식.\n\n법무팀: "...가능하긴 한데 복잡해요." 가능하면 된 거다.',
            flags: ['creative_structure'],
          },
        ],
        condition: null,
      },
      {
        id: 'fh_ch3_ev2',
        chapter: 3,
        speaker: { name: 'GHF Capital 파트너', emoji: '🇸🇬' },
        narration: '텀시트 협상. 거버넌스 조항이 문제다.',
        text: '"Our standard term includes drag-along at 60% threshold and a liquidation preference of 1.5x non-participating. Plus, we\'d want board observer rights and full information rights."\n\n번역: 60% 찬성만 있으면 회사를 팔 수 있고, 청산 시 1.5배를 먼저 가져간다. 이사회 참관도 하겠다.',
        choices: [
          {
            text: 'Drag-along threshold를 75%로 올려달라고 협상',
            effects: { persuasion: 10, mental: -12 },
            result: '"We can do 70%." "75% 아니면 어렵겠어요."\n\n일주일간의 이메일 협상 끝에 72.5%로 합의.\n\n완벽한 숫자는 아니지만, 협상력이 생겼다.',
            flags: ['drag_along_negotiated'],
          },
          {
            text: 'Liquidation preference를 1x로 낮춰달라고 협상',
            effects: { persuasion: 8, mental: -10 },
            result: '"Standard in Asia is 1.5x." "하지만 1x participating이면 어떨까요?"\n\n1.25x non-participating으로 절충. 작은 승리다.',
            flags: ['liq_pref_negotiated'],
          },
          {
            text: '조항 전체 수용. 대신 valuation을 더 올려달라고.',
            effects: { persuasion: 5, mental: -5 },
            result: null,
            flags: ['accept_terms_push_valuation'],
            probabilityCheck: { successRate: 0.4, successFlag: 'valuation_raised_hard', failFlag: 'valuation_stuck' },
          },
        ],
        condition: null,
      },
      {
        id: 'fh_ch3_ev3',
        chapter: 3,
        speaker: { name: '국내 기존 투자자 (Series A VC)', emoji: '🧑‍💼' },
        narration: '예상치 못한 마찰. 기존 투자자가 반발했다.',
        text: '"대표님, Cayman Flip하면 저희 지분 구조가 바뀌잖아요. 저희 내부 규정상 케이맨 지주사 투자는 LP 승인이 필요해요. 그게 3개월은 걸릴 거예요.\n\n솔직히 저는 이 구조 변경이 마음에 안 들어요."',
        choices: [
          {
            text: '기존 투자자의 지분 구조를 최대한 보호하는 방향으로 조율한다',
            effects: { runway: -0.5, mental: -15, persuasion: 15 },
            result: '법무팀 + 기존 투자자 + 신규 투자자 3자 협상.\n\n2개월이 걸렸다. 런웨이가 줄었다. 하지만 모두가 수용할 수 있는 구조를 찾았다.',
            flags: ['all_parties_aligned'],
          },
          {
            text: '"LP 승인이 안 되면 Flip 없이 처리하는 방법도 있어요." (압박)',
            effects: { persuasion: -8, mental: -10 },
            result: '"...그게 무슨 말씀이세요?" 기존 투자자와 관계가 껄끄러워졌다.\n\n기존 주주를 압박하는 건 장기적으로 독이 된다.',
            flags: ['existing_investor_conflict'],
          },
          {
            text: 'GHF Capital에 상황을 솔직하게 설명하고 타임라인 조율을 요청한다',
            effects: { persuasion: 10, mental: -8 },
            result: '"We appreciate the transparency. We can wait 6 weeks."\n\n솔직함이 해외 VC의 신뢰를 얻었다. 6주 유예 기간을 확보했다.',
            flags: ['ghf_timeline_extended'],
          },
        ],
        condition: null,
      },
    ],
  },

  // ===== CHAPTER 4: 글로벌 클로징 — "마지막 관문" =====
  {
    chapter: 4,
    title: '글로벌 클로징 — "마지막 관문"',
    events: [
      {
        id: 'fh_ch4_intro',
        chapter: 4,
        speaker: null,
        narration: null,
        text: null,
        dynamicNarration: (stats) => {
          const runway = stats.runway.value;
          const mental = stats.mental.value;
          let extra = '';
          if (runway <= 1) extra = '\n\n⚠️ 위험 수준: 런웨이가 거의 없다. 이번이 마지막이다.';
          else if (mental <= 20) extra = '\n\n⚠️ 멘탈 붕괴 직전: 언제 쓰러져도 이상하지 않다.';
          return `글로벌 클로징까지 D-7. 런웨이 ${runway}개월.\n\nGHF Capital의 최종 투자심의위원회가 내일이다. Sequoia India는 아직 결정을 못 내렸다.\n\n모든 것이 이번 주에 결정된다.${extra}`;
        },
        choices: null,
        condition: null,
      },
      {
        id: 'fh_ch4_ev1',
        chapter: 4,
        speaker: { name: 'GHF Capital IC', emoji: '🌏' },
        narration: '화상으로 연결된 GHF Capital 투자심의위원회. 싱가포르 시간 오전 10시. 한국 시간 오전 11시.',
        text: '"Thank you for all the materials. Last question before we vote: Why should we invest NOW? Market timing. Why Series B now, not 12 months later?"',
        choices: [
          {
            text: '시장 타이밍 데이터와 경쟁사 동향으로 답변',
            effects: {},
            result: null,
            flags: ['pitch_timing_data'],
            statCheck: { stat: 'persuasion', threshold: 55, successFlag: 'passed_ic_hard', failFlag: 'failed_ic_hard' },
          },
          {
            text: '현재 모멘텀과 growth inflection point를 강조',
            effects: {},
            result: null,
            flags: ['pitch_momentum'],
            statCheck: { type: 'combined', stats: ['persuasion', 'mental'], threshold: 100, successFlag: 'passed_ic_hard', failFlag: 'failed_ic_hard' },
          },
          {
            text: '"Other investors are close to committing." (긴장감 조성)',
            effects: {},
            result: null,
            flags: ['pitch_fomo_hard'],
            statCheck: { stat: 'persuasion', threshold: 65, successFlag: 'passed_ic_hard', failFlag: 'failed_ic_hard' },
          },
        ],
        condition: null,
      },
      {
        id: 'fh_ch4_ev2_pass',
        chapter: 4,
        speaker: { name: 'GHF Capital 파트너', emoji: '🇸🇬' },
        narration: '투심위 결과. 3시간 후 이메일이 왔다.',
        text: '"We\'ve voted. It\'s a yes. Congratulations. Our legal team will send the final SPA next week."\n\nSPA = Share Purchase Agreement. 최종 계약서.\n\n드디어. 글로벌 Series B가 클로징됐다.',
        choices: [
          {
            text: 'Sequoia India 유치도 추진해서 라운드를 키운다',
            effects: { runway: -0.5, mental: -15, persuasion: 10 },
            result: '"We appreciate your patience. We\'re in."\n\nSequoia India도 100억을 추가했다. 총 200억 글로벌 라운드.\n\n당신은 지쳐있지만, 전략적 파트너 두 곳을 모두 얻었다.',
            flags: ['global_closed', 'both_vcs_in'],
          },
          {
            text: 'GHF Capital만으로 클로징하고 빠르게 종료한다',
            effects: { mental: 8 },
            result: 'GHF Capital 100억으로 글로벌 Series B 클로징.\n\n더 크게 갈 수도 있었지만, 지금은 집중이 우선이다.\n\n전략적 파트너 한 곳이지만, 확실하다.',
            flags: ['global_closed'],
          },
        ],
        condition: { flag: 'passed_ic_hard' },
      },
      {
        id: 'fh_ch4_ev2_fail',
        chapter: 4,
        speaker: { name: 'GHF Capital 파트너', emoji: '🇸🇬' },
        narration: '투심위 결과. 3시간 후 이메일이 왔다.',
        text: '"We\'ve had extensive discussions. Unfortunately, we\'re not able to move forward at this time. The market timing concern is still there, and our partnership hasn\'t resolved their risk thesis on Korea-only companies."\n\n번역: 안 합니다.',
        choices: [
          {
            text: 'Sequoia India에 즉시 연락해서 단독 리드 요청',
            effects: { runway: -0.5, mental: -15 },
            result: '"We\'re sorry to hear about GHF. Can you give us 2 more weeks to review?"\n\n2주가 남았다. 런웨이도 2주가 남았다.',
            flags: ['sequoia_only_attempt'],
            probabilityCheck: { successRate: 0.4, successFlag: 'global_closed', failFlag: 'deal_collapsed' },
          },
          {
            text: '전략적 파트너(대기업)를 통한 대안 투자를 추진한다',
            effects: { mental: -10 },
            result: '"저희가 전략적으로 투자 검토해보겠습니다."\n\nVC가 아닌 대기업 CVC. 조건이 다르지만, 문이 열렸다.',
            flags: ['strategic_deal'],
          },
          {
            text: '국내 시장에 집중하고 다음 시도를 준비한다',
            effects: { mental: 10 },
            result: '글로벌 Series B를 포기했다.\n\n현실적인 선택. 국내에서 더 성장한 후 다시 시도한다.\n\n패배가 아니라, 전략적 후퇴다.',
            flags: ['pivot_domestic'],
          },
        ],
        condition: { flag: 'failed_ic_hard' },
      },
    ],
  },
];
