/**
 * Founder Route Scenarios - 4 Chapters
 */
const FounderScenarios = [
  // ===== CHAPTER 1: IR 준비 — "시작부터 난관" =====
  {
    chapter: 1,
    title: 'IR 준비 — "시작부터 난관"',
    events: [
      {
        id: 'f_ch1_intro',
        chapter: 1,
        speaker: null,
        narration: '당신은 퇴사 후 3개월째. 통장 잔고가 당신의 자존심보다 빠르게 줄고 있다.',
        text: null,
        choices: null, // narration-only, auto-advance
        condition: null,
      },
      {
        id: 'f_ch1_ev1',
        chapter: 1,
        speaker: { name: 'CTO 박모씨', emoji: '👨‍💻' },
        narration: null,
        text: '대표님, TAM을 100조로 쓸까요? 솔직히 뻥인데- 다들 이렇게 쓰더라고요.',
        choices: [
          {
            text: '"10조면 10조라고 써"',
            effects: { persuasion: 5 },
            result: '정직한 선택. 나중에 VC가 "정직한 팀이네요"라고 말할 수도 있다. 물론 투자로 이어질지는 별개의 문제다.',
            flags: ['tam_honest'],
          },
          {
            text: '"100조. 꿈은 크게."',
            effects: { persuasion: 15 },
            result: 'TAM 100조. 당신의 IR덱은 이제 판타지 소설과 구분이 어렵습니다.',
            flags: ['tam_100'],
          },
          {
            text: '"SAM/SOM까지 논리적으로"',
            effects: { mental: -10, runway: -1, persuasion: 20 },
            result: '2주를 태워 시장 분석을 했다. 런웨이가 줄었지만, 이 정도 논리면 어떤 VC든 고개를 끄덕일 것이다. 아마도.',
            flags: ['tam_logical'],
          },
        ],
        condition: null,
      },
      {
        id: 'f_ch1_ev2',
        chapter: 1,
        speaker: { name: '디자이너', emoji: '🎨' },
        narration: null,
        text: 'PPT요? 노션이요? 아니면 요즘은 피그마로-',
        choices: [
          {
            text: 'PPT (클래식)',
            effects: {},
            result: '무난함. 무난함이라는 건 기억에 안 남는다는 뜻이기도 하지만.',
            flags: ['deck_ppt'],
          },
          {
            text: '피그마 (예쁘게)',
            effects: { runway: -1, mental: -10, persuasion: 10 },
            result: '2주를 태웠다. 그래도 예쁘긴 하다. 예쁜 덱이 투자를 보장하진 않지만, 못생긴 덱보다는 낫다.',
            flags: ['deck_figma'],
          },
          {
            text: '노션 (빠르게)',
            effects: { mental: 5 },
            result: '어떤 VC가 말했다. "노션 IR이요? 음-" 그 \'음-\'에 만감이 교차한다.',
            flags: ['deck_notion'],
          },
        ],
        condition: null,
      },
    ],
  },

  // ===== CHAPTER 2: 콜드메일 지옥 — "읽씹의 바다" =====
  {
    chapter: 2,
    title: '콜드메일 지옥 — "읽씹의 바다"',
    events: [
      {
        id: 'f_ch2_intro',
        chapter: 2,
        speaker: null,
        narration: 'VC 30곳에 메일을 보냈다. 3일이 지났다.',
        infoBox: '📊 결과:\n읽씹: 22건\n자동회신 "검토 후 연락드리겠습니다": 6건\n"현재 신규 투자 중단": 1건\n미팅 수락: 1건 (주니어 심사역)',
        text: '1/30. 프로야구 타율로 치면 0.033. 투수도 이것보단 잘 친다.',
        choices: null,
        condition: null,
      },
      {
        id: 'f_ch2_ev1',
        chapter: 2,
        speaker: { name: '시스템', emoji: '📬' },
        narration: '어떻게 대응할 것인가?',
        text: null,
        choices: [
          {
            text: '주니어라도 만나자',
            effects: { persuasion: 5 },
            result: '겸손은 미덕이다. 특히 통장 잔고가 바닥일 때.',
            flags: ['met_junior'],
          },
          {
            text: '팔로업 메일 3연발',
            effects: { mental: -15 },
            result: '3번째 팔로업. "혹시 메일 확인-" 이건 집착이 아니라 열정이라고 자신에게 말한다.\n\n...2곳에서 추가 회신이 왔다.',
            flags: ['followup_3'],
          },
          {
            text: '링크드인 DM 직접 어택',
            effects: { mental: -5, persuasion: 10 },
            result: '파트너 김모씨가 DM을 열었다. "오, 대담하시네요 ㅋ" - 이 \'ㅋ\'가 긍정인지 조롱인지는 미팅에서 알게 된다.',
            flags: ['linkedin_dm'],
          },
        ],
        condition: null,
      },
      {
        id: 'f_ch2_ev2',
        chapter: 2,
        speaker: { name: '대학 선배', emoji: '🍺' },
        narration: null,
        text: '야, 내가 XX벤처스 파트너 아는데. 소개시켜줄까? 밥 한번 사라.',
        choices: [
          {
            text: '"감사합니다 선배!"',
            effects: { runway: -0.5, persuasion: 15 },
            result: '한국 스타트업 생태계의 화폐 단위: 원(₩), 달러($), 밥값(🍚)\n\n30만원짜리 한우가 투자 미팅으로 바뀌었다. 가성비 최고.',
            flags: ['senior_intro'],
          },
          {
            text: '"괜찮아요, 실력으로 할게요"',
            effects: { mental: 10 },
            result: '자존심은 지켰다. 하지만 자존심으로 월급을 줄 수는 없다.',
            flags: ['no_intro'],
          },
        ],
        condition: null,
      },
    ],
  },

  // ===== CHAPTER 3: VC 미팅 — "질문의 바다" =====
  {
    chapter: 3,
    title: 'VC 미팅 — "질문의 바다"',
    events: [
      {
        id: 'f_ch3_intro',
        chapter: 3,
        speaker: null,
        narration: '드디어 VC 미팅. 강남 어딘가의 유리벽 회의실. 맞은편에 앉은 사람이 당신의 운명을 쥐고 있다.',
        text: null,
        choices: null,
        condition: null,
      },
      {
        id: 'f_ch3_ev1',
        chapter: 3,
        speaker: { name: 'A캐피탈 김파트너', emoji: '🧑‍💼' },
        narration: '표정: 무',
        text: '잘 들었고요. 근데, 네이버가 이거 만들면 어떻게 하실 건가요?',
        choices: [
          {
            text: '"저희만의 기술적 해자가-"',
            effects: { persuasion: 5 },
            result: 'VC 반응: "특허요? 음..." (메모: \'해자 주장, 검증 필요\')\n\n무난한 답변이다. 무난함은 여기서도 기억에 남지 않는다.',
            resultSpeaker: { name: '김파트너', emoji: '🧑‍💼' },
            flags: [],
          },
          {
            text: '"빅테크는 느립니다. 선점이요."',
            effects: { persuasion: 10, mental: 5 },
            result: '"자신감은 좋은데... 근거가?"\n\n그래도 김파트너가 살짝 고개를 끄덕였다. 좋은 신호일 수도 있다.',
            resultSpeaker: { name: '김파트너', emoji: '🧑‍💼' },
            flags: ['confident_answer'],
          },
          {
            text: '"솔직히 들어오면 힘듭니다. 하지만-"',
            effects: { persuasion: -15 },
            result: '김파트너가 노트북을 닫기 시작한다.\n\n솔직함에도 때와 장소가 있다. 지금은 아니었다.',
            resultSpeaker: { name: '김파트너', emoji: '🧑‍💼' },
            flags: ['too_honest'],
          },
        ],
        condition: null,
      },
      // TAM 100조 선택 시 강화 이벤트
      {
        id: 'f_ch3_ev2_tam100',
        chapter: 3,
        speaker: { name: '박심사역', emoji: '📊' },
        narration: null,
        text: 'MoM 15%요? paying user 기준이에요? 그리고 아까 TAM 100조라 하셨는데, 산출 근거를 좀-',
        choices: [
          {
            text: '대시보드 오픈 (준비 완료)',
            effects: { persuasion: 20 },
            result: '데이터를 꺼내는 순간, 심사역의 눈빛이 달라졌다. 숫자는 거짓말을 안 한다. (물론 대시보드 만드느라 2주를 태운 것도 사실이다)',
            flags: ['dashboard_ready'],
          },
          {
            text: '"그건 좀- 다음에 보내드릴게요"',
            effects: { persuasion: -20, mental: -10 },
            result: '미팅이 15분 만에 끝났다. 엘리베이터에서 눈물을 참았다.',
            flags: ['no_data'],
          },
          {
            text: '"저희는 PMF 전이라 성장에 집중-"',
            effects: {},
            result: '"네- 알겠습니다."\n\n그 \'알겠습니다\'는 \'됐습니다\'였다.',
            resultSpeaker: { name: '박심사역', emoji: '📊' },
            flags: ['pmf_excuse'],
          },
        ],
        condition: { flag: 'tam_100' },
      },
      // TAM 정직/논리적 선택 시 일반 이벤트
      {
        id: 'f_ch3_ev2_normal',
        chapter: 3,
        speaker: { name: '박심사역', emoji: '📊' },
        narration: null,
        text: 'MoM 15%요? paying user 기준이에요? 좀 더 디테일하게 설명해주시겠어요?',
        choices: [
          {
            text: '대시보드 오픈 (준비 완료)',
            effects: { persuasion: 15 },
            result: '데이터를 꺼내는 순간, 심사역이 고개를 끄덕였다. 준비된 팀이라는 인상을 줬다.',
            flags: ['dashboard_ready'],
          },
          {
            text: '"코호트 분석까지 준비했습니다"',
            effects: { persuasion: 10 },
            result: '심사역이 메모를 시작했다. 좋은 신호다.',
            flags: ['cohort_ready'],
          },
          {
            text: '"아직 초기라 데이터가 부족하지만-"',
            effects: { persuasion: -5, mental: -5 },
            result: '"네- 좀 더 데이터가 쌓이면 다시 뵈죠."\n\n정중한 거절의 서막이다.',
            resultSpeaker: { name: '박심사역', emoji: '📊' },
            flags: ['lack_data'],
          },
        ],
        condition: { notFlag: 'tam_100' },
      },
      {
        id: 'f_ch3_ev3',
        chapter: 3,
        speaker: { name: '김파트너 (카톡)', emoji: '💬' },
        narration: '미팅 종료 후 24시간. VC에게서 카톡이 왔다.',
        text: '오늘 미팅 좋았습니다! 다음에 커피챗 한번 해요 ☺',
        choices: [
          {
            text: '"네! 다음 주 어떠세요?" (적극)',
            effects: { persuasion: 5 },
            result: null,
            flags: ['active_followup'],
            probabilityCheck: { successRate: 0.5, successFlag: 'followup_success', failFlag: 'followup_fail' },
          },
          {
            text: '"구체적인 다음 스텝이 있을까요?" (직구)',
            effects: { mental: -5 },
            result: '"아, 내부 검토 후 말씀드릴게요"\n\n번역: 90% 거절. 하지만 10%의 희망이 있다면 물어볼 가치는 있었다.',
            resultSpeaker: { name: '김파트너', emoji: '🧑‍💼' },
            flags: ['direct_ask'],
          },
          {
            text: '커피챗 = 거절로 해석. 다른 VC 집중.',
            effects: { mental: 5 },
            result: '업계 3년 차 이상만 아는 암묵적 코드. "커피챗 = 정중한 거절"을 학습했다. 성장이다.',
            flags: ['learned_coffeechat'],
          },
        ],
        condition: null,
      },
    ],
  },

  // ===== CHAPTER 4: 최종 결전 — "될까 말까" =====
  {
    chapter: 4,
    title: '최종 결전 — "될까 말까"',
    events: [
      {
        id: 'f_ch4_intro',
        chapter: 4,
        speaker: null,
        narration: null,
        text: null,
        dynamicNarration: (stats) => {
          return `마지막 기회. 남은 런웨이 ${stats.runway.value}개월. 멘탈 ${stats.mental.value}%. A캐피탈이 2차 미팅을 제안했다. 이번이 진짜다.`;
        },
        choices: null,
        condition: null,
      },
      {
        id: 'f_ch4_ev1',
        chapter: 4,
        speaker: { name: '김파트너', emoji: '🧑‍💼' },
        narration: 'A캐피탈 회의실. 파트너 5명이 앉아있다. 한 명은 폰을 보고 있다.',
        text: '자, 마지막으로 한마디만 해주세요. 왜 저희가 투자해야 하나요?',
        choices: [
          {
            text: '숫자로 승부 (데이터 중심)',
            effects: {},
            result: null, // determined by stat check
            flags: ['pitch_data'],
            statCheck: { stat: 'persuasion', threshold: 60, successFlag: 'passed_ic', failFlag: 'failed_ic' },
          },
          {
            text: '비전으로 승부 (열정 중심)',
            effects: {},
            result: null,
            flags: ['pitch_vision'],
            statCheck: { stat: 'mental', threshold: 70, successFlag: 'passed_ic', failFlag: 'failed_ic' },
          },
          {
            text: 'FOMO (다른 VC 언급)',
            effects: {},
            result: null,
            flags: ['pitch_fomo'],
            statCheck: { stat: 'persuasion', threshold: 50, successFlag: 'passed_ic', failFlag: 'failed_ic' },
          },
          {
            text: '솔직하게 (진심)',
            effects: {},
            result: null,
            flags: ['pitch_honest'],
            statCheck: { type: 'combined', stats: ['persuasion', 'mental'], threshold: 120, successFlag: 'passed_ic', failFlag: 'failed_ic' },
          },
        ],
        condition: null,
      },
      // 투심위 통과 시
      {
        id: 'f_ch4_ev2_pass',
        chapter: 4,
        speaker: { name: '시스템', emoji: '📋' },
        narration: '📋 텀시트 도착!',
        text: '투자금: 10억 / Pre 40억 / 우선주 / 희석방지(full ratchet)',
        choices: [
          {
            text: '바로 사인',
            effects: {},
            result: '펜을 들었다. 계약서에 사인하는 순간, 안도의 한숨이 나왔다.\n\n...하지만 변호사 친구가 나중에 이 계약서를 보고 고개를 저을 것이다.',
            flags: ['signed_immediately'],
          },
          {
            text: '변호사 검토 요청',
            effects: { runway: -0.5 },
            result: '변호사: "full ratchet이요? 이건 좀... weighted average로 수정 요청하세요."\n\n2주의 협상 끝에 조건이 수정됐다. 이 2주가 당신을 구했다.',
            flags: ['lawyer_review'],
          },
          {
            text: '밸류 올려달라고 협상',
            effects: {},
            result: null,
            flags: ['negotiate_valuation'],
            probabilityCheck: { successRate: 0.5, successFlag: 'valuation_up', failFlag: 'deal_broken' },
          },
        ],
        condition: { flag: 'passed_ic' },
      },
      // 투심위 탈락 시
      {
        id: 'f_ch4_ev2_fail',
        chapter: 4,
        speaker: { name: 'A캐피탈', emoji: '📧' },
        narration: 'A캐피탈로부터 정중한 메일이 왔다.',
        text: '"깊이 검토했으나, 현 시점에서는 저희 투자 기준과 다소 차이가 있어... 향후 좋은 기회가 있기를 바랍니다."\n\n번역: 안 합니다.',
        choices: [
          {
            text: '다른 VC 찾기 (계속 도전)',
            effects: { runway: -1, mental: -20 },
            result: '다시 콜드메일을 쓴다. 이번엔 좀 더 잘 쓸 수 있다. 쓰러져도 배우는 게 있다.',
            flags: ['keep_fighting'],
          },
          {
            text: '피봇 (방향 전환)',
            effects: { mental: -10 },
            result: '"처음부터 다시"를 "피봇"이라고 부르는 건 스타트업 세계의 가장 우아한 언어적 발명이다.\n\n하지만 때로는 진짜 답이 거기에 있다.',
            flags: ['pivot'],
          },
          {
            text: '포기 (폐업)',
            effects: {},
            result: '사업자 등록 말소. 법인 해산 절차.\n\n무겁지만, 끝내는 것도 용기다.',
            flags: ['give_up'],
          },
        ],
        condition: { flag: 'failed_ic' },
      },
    ],
  },
];
