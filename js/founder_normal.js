/**
 * Founder Normal Route (Series A) — 창업자 루트 NORMAL
 * "이제 숫자로 말해야 한다" — PMF를 증명하고 스케일업을 논해야 하는 단계
 * 초반 선택이 후반에 돌아온다. EASY 클리어 후 오픈.
 *
 * Part 2에서 시나리오 전체 데이터가 업데이트될 예정입니다.
 */
const FounderNormalScenarios = [
  // ===== CHAPTER 1: 시리즈 A 준비 — "이제 PMF가 전부다" =====
  {
    chapter: 1,
    title: 'Series A 준비 — "이제 PMF가 전부다"',
    events: [
      {
        id: 'fn_ch1_intro',
        chapter: 1,
        speaker: null,
        narration: 'Seed 라운드 클리어. 18개월이 지났다.\n\n당신의 계좌에는 이제 시드 투자금의 잔액이 얼마 남지 않았다. Seed는 생존을 증명했다. 이제 Series A는 성장을 증명해야 한다.\n\n그리고 Series A 투자자는 당신의 꿈이 아니라, 숫자를 본다.',
        text: null,
        choices: null,
        condition: null,
      },
      {
        id: 'fn_ch1_ev1',
        chapter: 1,
        speaker: { name: 'CFO 이모씨', emoji: '📊' },
        narration: 'Series A IR을 준비하는 첫 번째 회의.',
        text: '대표님, VC들이 요구하는 지표가 달라요. 매출 성장률이 MoM 20% 이상은 되어야 "성장 중"으로 봐준다고 하더라고요. 근데 우리 지금 MoM 12%거든요.\n\n어떻게 할까요?',
        choices: [
          {
            text: '12%를 솔직하게 보여준다',
            effects: { persuasion: 8, mental: 5 },
            result: '데이터를 있는 그대로 보여줬다. 솔직함이 신뢰를 만든다.\n\n"성장률은 낮지만 지속성이 있네요." 일부 VC는 오히려 안정적이라고 본다.\n\n장기적으로 신뢰가 가장 강력한 무기다.',
            flags: ['honest_metrics'],
          },
          {
            text: '"분기 데이터로 보면 다르게 보여요" (회계적 포장)',
            effects: { persuasion: 5, mental: -8 },
            result: '분기 단위로 보면 30% 성장처럼 보인다. 틀린 말은 아니지만...\n\n"월별 데이터도 보여주실 수 있나요?" 심사역은 생각보다 예리하다.',
            flags: ['creative_metrics'],
          },
          {
            text: '성장률을 올리는 데 한 달을 더 투자한다',
            effects: { runway: -0.5, persuasion: 12, mental: -8 },
            result: '한 달을 전력 투구해서 MoM 21%를 달성했다. 런웨이가 줄었지만 숫자는 나왔다.\n\n"하드코어하네요." 이것도 하나의 이야기가 된다.',
            flags: ['growth_sprint', 'metrics_improved'],
          },
        ],
        condition: null,
      },
      {
        id: 'fn_ch1_ev2',
        chapter: 1,
        speaker: { name: '리드 투자자 김모씨', emoji: '🧑‍💼' },
        narration: '첫 번째 Series A 미팅. 네트워크를 통해 소개받은 B캐피탈 파트너.',
        text: '잘 봤어요. 근데 팀이 좀 약하지 않나요? CTO가 경력이 좀 짧고, VP of Sales는... 없네요? Series A면 GTM 팀이 있어야 하는데.',
        choices: [
          {
            text: '"지금 채용 중입니다. 조건부로 투자하시면 바로-"',
            effects: { persuasion: -5, mental: -8 },
            result: '"조건부요? 그건 저희도 리스크죠."\n\n팀 리스크를 인정하면서도 해결책을 약속하는 건 오히려 약점이 될 수 있다.',
            resultSpeaker: { name: '김모씨', emoji: '🧑‍💼' },
            flags: ['team_weak_admitted'],
          },
          {
            text: '"제가 직접 Sales를 리드하고 있습니다. 창업자 Sales가 강점이에요."',
            effects: { persuasion: 10, mental: -5 },
            result: '창업자가 직접 세일즈를 한다는 건 초기 스타트업의 장점이기도 하다.\n\n"그래도 Scale은 어떻게...?" 추가 질문이 왔지만 일단 인상은 남겼다.',
            flags: ['founder_sales'],
          },
          {
            text: '"사실 좋은 후보자랑 얘기 중인데, 오퍼는 투자 이후에 내려고 합니다."',
            effects: { persuasion: 8, mental: -3 },
            result: '"누구세요?" 구체적인 이름을 물어봤다. 준비되지 않은 질문이었다.\n\n"아직 확정 전이라..." 어색한 침묵.\n\n블러핑은 항상 검증 질문이 따라온다.',
            flags: ['bluffed_hire'],
          },
        ],
        condition: null,
      },
      {
        id: 'fn_ch1_ev3',
        chapter: 1,
        speaker: { name: 'CTO', emoji: '👨‍💻' },
        narration: 'Series A IR 준비 중, 기술적 이슈가 생겼다.',
        text: '대표님, 서비스 아키텍처가 문제예요. 지금 구조로는 MAU 10만 명 이상이 되면 서버가 터져요. 리팩토링에 최소 2개월은 필요하고, 그동안 새 기능 개발은 올스톱해야 해요.',
        choices: [
          {
            text: '지금 당장 리팩토링 (IR은 잠시 보류)',
            effects: { runway: -0.5, mental: -10, persuasion: 5 },
            result: '2개월 동안 새 기능 없음, 성장도 잠시 정체.\n\n하지만 "Series A 전에 기술 부채를 청산했다"는 이야기는 VC에게 성숙한 팀의 증거가 된다.',
            flags: ['tech_refactored'],
          },
          {
            text: 'IR 끝나고 리팩토링 (일단 투자 먼저)',
            effects: { mental: -5, persuasion: -5 },
            result: '"확장성 어떻게 되나요?" VC 질문에 얼버무렸다.\n\n기술 부채는 숨길 수 없다. DD에서 드러난다.',
            flags: ['tech_debt_hidden'],
          },
          {
            text: '"MAU 10만이면 그때 고민합시다. 지금은 성장이 우선."',
            effects: { mental: 5, persuasion: 3 },
            result: '낙관적인 접근. 확장성 문제는 "좋은 문제"라고 볼 수도 있다.\n\n"MAU 10만 도달 계획은요?" 추가 질문이 기다린다.',
            flags: ['growth_first'],
          },
        ],
        condition: null,
      },
    ],
  },

  // ===== CHAPTER 2: DD 지옥 — "당신의 숫자를 해부한다" =====
  {
    chapter: 2,
    title: 'DD 지옥 — "당신의 숫자를 해부한다"',
    events: [
      {
        id: 'fn_ch2_intro',
        chapter: 2,
        speaker: null,
        narration: 'B캐피탈이 Term Sheet 발행 전 Due Diligence를 시작했다.\n\nDD는 로맨스가 끝나고 현실이 시작되는 구간이다. 1차 미팅에서 보여줬던 매력은 잊어라. 이제 당신의 회사를 해부한다.',
        text: '투자 검토 체크리스트: 재무 모델, 기술 구조, 법무 리뷰, 고객 레퍼런스 체크, 창업자 배경 조사...',
        choices: null,
        condition: null,
      },
      {
        id: 'fn_ch2_ev1',
        chapter: 2,
        speaker: { name: 'DD 담당 심사역', emoji: '🔍' },
        narration: '재무 모델 검토 세션.',
        text: '재무 모델 보내주셨는데요. Unit Economics가... LTV가 CAC의 3배가 안 되네요. 현재 LTV:CAC가 1.8:1이에요. Series A 기준 최소 3:1은 되어야 하는데.',
        choices: [
          {
            text: '"현재는 그렇지만 코호트 6개월 이후를 보시면-"',
            effects: { persuasion: 12, mental: -5 },
            result: '"코호트 데이터 있으세요?" "네, 있습니다."\n\n6개월 코호트에서 LTV:CAC가 2.8:1로 올라갔다. 아직 3배는 아니지만 방향성을 보여줬다.',
            flags: ['cohort_defense'],
          },
          {
            text: '"맞아요, 지금은 낮습니다. 하지만 CAC를 낮추는 전략이 있어요."',
            effects: { persuasion: 8, mental: -3 },
            result: '"어떻게요?" 세부 전략을 물어봤다.\n\n솔직하게 인정하고 해결 방향을 제시하는 것도 전략이다.',
            flags: ['honest_economics'],
          },
          {
            text: '계산 방식을 바꿔서 설명 (LTV 재정의)',
            effects: { persuasion: -10, mental: -10 },
            result: '"잠깐, 이 공식이 표준과 다른데요."\n\n심사역이 엑셀을 열었다. 30분 동안 숫자를 파고들었다.\n\n데이터를 조작하려는 시도는 전문가 앞에서 역효과다.',
            flags: ['data_manipulation'],
          },
        ],
        condition: null,
      },
      {
        id: 'fn_ch2_ev2',
        chapter: 2,
        speaker: { name: '법무팀', emoji: '⚖️' },
        narration: '법무 DD 중 문제가 발견됐다.',
        text: '대표님, 초기 개발자 지분 계약서에 vesting 조항이 없네요. 초기 개발자가 6개월 만에 나갔는데 지분을 다 가지고 있는 상태예요.\n\n이게 캡 테이블 리스크로 지목됐어요.',
        choices: [
          {
            text: '그 개발자와 직접 협상해서 지분 일부 반환 추진',
            effects: { runway: -0.5, mental: -10, persuasion: 8 },
            result: '6개월을 설득했다. 결국 50% 반환 합의.\n\n"적극적으로 해결하셨네요." 이 과정 자체가 경영 능력의 증명이 됐다.',
            flags: ['cap_table_resolved'],
          },
          {
            text: '"나중에 문제될 때 처리하겠습니다"',
            effects: { persuasion: -12, mental: -5 },
            result: '"이게 리스크로 남으면 저희가 투자하기 어렵습니다."\n\n법무 리스크를 방치하는 창업자를 VC는 신뢰하지 않는다.',
            resultSpeaker: { name: '법무팀', emoji: '⚖️' },
            flags: ['legal_risk_ignored'],
          },
          {
            text: '"사실 이미 알고 있었어요. 여기 해결 방안을 준비했습니다."',
            effects: { persuasion: 15, mental: 5 },
            result: '"아, 미리 준비하셨군요."\n\n문제를 인지하고 해결책을 가지고 있는 창업자. 가장 이상적인 모습이다.',
            flags: ['cap_table_prepared'],
          },
        ],
        condition: null,
      },
      {
        id: 'fn_ch2_ev3',
        chapter: 2,
        speaker: { name: 'VC 레퍼런스 체크', emoji: '📞' },
        narration: '고객 레퍼런스 체크. VC가 당신 모르게 고객에게 전화했다.',
        text: '고객 A사 담당자가 말했다: "솔직히 초기에는 좋았는데, 최근에 CS 대응이 좀 느려졌어요. 그래도 다른 대안이 없어서 쓰는 거긴 해요."\n\nVC가 이 내용을 가지고 왔다.',
        choices: [
          {
            text: '"맞아요, CS 팀이 부족했어요. 지금은 2명 더 채용했습니다."',
            effects: { persuasion: 10, mental: -3 },
            result: '"그 채용은 언제 했나요?" "DD 시작하고 나서요."\n\n"음..." 타이밍이 좀 의심스럽긴 하다. 그래도 솔직한 대응이 신뢰를 준다.',
            flags: ['cs_improved'],
          },
          {
            text: '"그 고객사는 특수한 케이스예요. 다른 고객 10개는-"',
            effects: { persuasion: 3, mental: -8 },
            result: '"그 10개 고객 레퍼런스도 주실 수 있나요?" "물론이죠."\n\n레퍼런스를 더 요청받게 됐다. 준비가 되어있어야 한다.',
            flags: ['more_references'],
          },
          {
            text: '"저도 그 피드백 알고 있어요. 제가 직접 해당 고객사에 사과하러 갔었습니다."',
            effects: { persuasion: 18, mental: 5 },
            result: '"오, 직접 가셨어요?"\n\n고객 중심의 태도. VC가 눈을 빛냈다.\n\n"그래서 지금 관계는 어때요?" "지금은 저희 가장 큰 레퍼런스예요."',
            flags: ['customer_recovery'],
          },
        ],
        condition: null,
      },
    ],
  },

  // ===== CHAPTER 3: 투자 협상 — "텀시트의 전쟁" =====
  {
    chapter: 3,
    title: '투자 협상 — "텀시트의 전쟁"',
    events: [
      {
        id: 'fn_ch3_intro',
        chapter: 3,
        speaker: null,
        narration: 'DD를 통과했다. B캐피탈이 Term Sheet를 보내왔다.\n\n문서를 열었다. 눈이 빠르게 숫자를 훑는다.\n\n투자 금액: 50억 / Pre-Money 밸류에이션: 150억\n\n...\n\n예상했던 200억의 75% 수준이다.',
        text: null,
        choices: null,
        condition: null,
      },
      {
        id: 'fn_ch3_ev1',
        chapter: 3,
        speaker: { name: 'B캐피탈 파트너', emoji: '🧑‍💼' },
        narration: '밸류에이션 협상 미팅.',
        text: '저희가 150억으로 제시한 건, 현재 ARR 대비 멀티플을 10x 적용한 거예요. 업계 평균이 8-12x 사이니까 합리적인 거죠.\n\n200억을 원하시면 ARR이 20억은 되어야 해요. 지금은 15억이고.',
        choices: [
          {
            text: '"다음 12개월 ARR 계획이 25억인데, 그걸 반영해주시면 안 될까요?"',
            effects: { persuasion: 8, mental: -5 },
            result: '"그 플랜을 달성할 근거를 보여주세요."\n\n다음 미팅을 위한 숙제가 생겼다. 하지만 협상의 문은 열렸다.',
            flags: ['future_arr_argument'],
          },
          {
            text: '"다른 VC에서 180억으로 검토 중입니다" (블러핑)',
            effects: { mental: -10 },
            result: null,
            flags: ['valuation_bluff'],
            probabilityCheck: { successRate: 0.3, successFlag: 'bluff_worked', failFlag: 'bluff_failed' },
          },
          {
            text: '150억 수용. 대신 조건을 바꾸자.',
            effects: { persuasion: 12, mental: -3 },
            result: '"조건이요?" "이사회 구성이랑 drag-along 조항을 수정하고 싶어요."\n\n밸류를 포기하는 대신 경영권을 지키는 전략. 현명할 수도 있다.',
            flags: ['valuation_accepted_terms_negotiated'],
          },
        ],
        condition: null,
      },
      {
        id: 'fn_ch3_ev2',
        chapter: 3,
        speaker: { name: '변호사', emoji: '⚖️' },
        narration: 'Term Sheet에 세부 조항 검토 중.',
        text: '대표님, 이사회 구성이 투자자 2명, 창업자 1명, 독립이사 1명이에요. 사실상 투자자가 이사회를 장악하는 구조입니다.\n\n그리고 Protective Provisions 15개 항목도 있는데, 사실상 주요 의사결정을 투자자 동의 없이는 못 하게 되어있어요.',
        choices: [
          {
            text: '창업자 2명, 투자자 2명, 독립이사 1명으로 카운터 제안',
            effects: { persuasion: 5, mental: -8 },
            result: '"독립이사는 저희가 지명하는 것 맞죠?" "공동으로 선정하면 어떨까요?"\n\n협상이 길어졌다. 결국 절충안: 창업자 2, 투자자 2, 공동선정 독립이사 1.\n\n완벽하지 않지만, 더 나은 구조를 얻어냈다.',
            flags: ['board_negotiated'],
          },
          {
            text: '조항 중 가장 치명적인 5개만 타깃해서 협상',
            effects: { persuasion: 15, mental: -5 },
            result: '"음, 이 5개는 저희 표준 조항인데..." "다른 포트폴리오사들도 다 서명했어요."\n\n"그래도 이것만큼은 수정해주세요."\n\n선택과 집중. 5개 중 3개를 수정받았다.',
            flags: ['targeted_negotiation'],
          },
          {
            text: '일단 사인하고 다음 라운드에서 수정한다',
            effects: { persuasion: -5, mental: 5 },
            result: '"다음 라운드에서 이 조항들을 수정할 수 있을까요?" "계약서에 그런 내용은 없는데요."\n\n한번 서명한 계약서는 쉽게 바뀌지 않는다.',
            flags: ['signed_bad_normal'],
          },
        ],
        condition: null,
      },
      {
        id: 'fn_ch3_ev3',
        chapter: 3,
        speaker: { name: '공동창업자', emoji: '🤝' },
        narration: '내부 의견 충돌. 공동창업자가 이의를 제기했다.',
        text: '형, 나는 이 조건으로 못 사인하겠어. 150억 밸류에 이 이사회 구조면... 우리가 우리 회사에서 을이 되는 거잖아. 차라리 bootstrap으로 가는 게 낫지 않아?',
        choices: [
          {
            text: '"이 투자 없으면 런웨이가 3개월이야. 현실을 봐."',
            effects: { persuasion: -5, mental: -12 },
            result: '"그래서 이 조건도 수용해야 해?" 공동창업자가 물러났지만 내부 갈등이 생겼다.\n\n분위기가 싸해졌다. 팀 결속력이 흔들렸다.',
            flags: ['internal_conflict'],
          },
          {
            text: '"맞아. 조건을 더 협상하자. 최후 카드를 꺼내자."',
            effects: { mental: -5, persuasion: 8 },
            result: '"마지막으로 한 번 더 해보자."\n\nB캐피탈에 다시 연락했다. "저희 팀이 합의가 안 되어서..." 솔직하게 말했다.\n\n오히려 VC가 협상 테이블로 다시 나왔다.',
            flags: ['last_negotiation'],
          },
          {
            text: '"코파운더 말이 맞아. Bootstrap으로 갈까?"',
            effects: { mental: 10, runway: -1 },
            result: '투자를 거절했다. 150억 밸류라도 조건이 나쁘면 독이다.\n\n이제 매출로 버텨야 한다. 런웨이가 줄었지만 자유를 얻었다.',
            flags: ['bootstrap_decision'],
          },
        ],
        condition: null,
      },
    ],
  },

  // ===== CHAPTER 4: 최종 클로징 — "50억이 눈앞에" =====
  {
    chapter: 4,
    title: '최종 클로징 — "50억이 눈앞에"',
    events: [
      {
        id: 'fn_ch4_intro',
        chapter: 4,
        speaker: null,
        narration: null,
        text: null,
        dynamicNarration: (stats) => {
          const runway = stats.runway.value;
          const mental = stats.mental.value;
          let extra = '';
          if (runway <= 1) extra = '\n\n⚠️ 위험: 런웨이가 거의 끝났다. 이번 클로징이 실패하면 끝이다.';
          else if (mental <= 30) extra = '\n\n경고: 멘탈이 한계에 가까워졌다. 조금만 더.';
          return `마지막 관문. 런웨이 ${runway}개월 남았다.\n\nB캐피탈 투자심의위원회 최종 결정일이다. 오전 10시, 회의실에 들어섰다.${extra}`;
        },
        choices: null,
        condition: null,
      },
      {
        id: 'fn_ch4_ev1',
        chapter: 4,
        speaker: { name: 'B캐피탈 GP', emoji: '👴' },
        narration: '투심위. GP(General Partner)가 처음으로 등장했다. 모든 파트너가 있는 회의실.',
        text: '저는 한 가지만 물어볼게요. 당신이 이 사업을 하는 이유가 뭐예요? 돈 때문은 아닐 것 같고.',
        choices: [
          {
            text: '개인적인 페인포인트로 시작한 진짜 이야기를 한다',
            effects: {},
            result: null,
            flags: ['pitch_personal'],
            statCheck: { stat: 'mental', threshold: 50, successFlag: 'passed_ic_normal', failFlag: 'failed_ic_normal' },
          },
          {
            text: '시장 기회와 TAM으로 답한다',
            effects: {},
            result: null,
            flags: ['pitch_market'],
            statCheck: { stat: 'persuasion', threshold: 60, successFlag: 'passed_ic_normal', failFlag: 'failed_ic_normal' },
          },
          {
            text: '팀과 실행력을 강조한다',
            effects: {},
            result: null,
            flags: ['pitch_team'],
            statCheck: { type: 'combined', stats: ['persuasion', 'mental'], threshold: 100, successFlag: 'passed_ic_normal', failFlag: 'failed_ic_normal' },
          },
        ],
        condition: null,
      },
      {
        id: 'fn_ch4_ev2_pass',
        chapter: 4,
        speaker: { name: 'B캐피탈 파트너', emoji: '🧑‍💼' },
        narration: '투심위 결과. 오후 3시, 전화가 왔다.',
        text: '"대표님, 좋은 소식 드리려고요. 저희 투심위에서 긍정적으로 결론 났어요. 최종 Term Sheet 보내드릴게요."\n\n...축하해야 하는 건가, 아니면 조항을 다시 읽어야 하는 건가.',
        choices: [
          {
            text: '변호사와 함께 꼼꼼히 검토한다',
            effects: { runway: -0.5, persuasion: 5 },
            result: '변호사 비용이 좀 들었다. 하지만 Protective Provisions 3개를 더 삭제했다.\n\n"시간이 좀 걸렸는데 괜찮겠어요?" "네, 제대로 하는 게 맞으니까요."',
            flags: ['series_a_closed', 'lawyer_review_normal'],
          },
          {
            text: '바로 사인한다 (런웨이가 없으니까)',
            effects: {},
            result: '빠르게 클로징했다. 50억이 계좌에 들어왔다.\n\n변호사를 부르지 않았다. 조항 중 일부가 나중에 문제가 될 수도 있지만...',
            flags: ['signed_bad_normal', 'series_a_closed'],
          },
        ],
        condition: { flag: 'passed_ic_normal' },
      },
      {
        id: 'fn_ch4_ev2_fail',
        chapter: 4,
        speaker: { name: 'B캐피탈 파트너', emoji: '🧑‍💼' },
        narration: '투심위 결과. 오후 3시, 전화가 왔다.',
        text: '"대표님... 저희가 내부적으로 많이 논의했는데요. 지금 시점에서는 투자 결정을 내리기가 어렵다는 결론을 내렸어요. 시장이 좀 더 성숙되면 그때 다시 보고 싶어요."\n\n"시장이 성숙되면"의 번역: 다른 VC가 먼저 투자하면.',
        choices: [
          {
            text: '이유를 물어보고 다음을 준비한다',
            effects: { mental: -8, persuasion: 8 },
            result: '"구체적으로 어떤 부분이 부족했나요?" "솔직히 말씀드리면..."\n\n30분 동안 피드백을 들었다. 아팠지만 유용했다. 다음 VC 미팅이 더 나아질 것이다.',
            flags: ['collected_feedback'],
          },
          {
            text: '다른 VC에 즉시 접근한다',
            effects: { runway: -0.5, mental: -10 },
            result: '다음 주부터 C캐피탈, D캐피탈에 연락을 돌렸다.\n\n이 과정이 다시 시작된다. 하지만 이번엔 더 준비됐다.',
            flags: ['series_a_retry'],
          },
          {
            text: '부트스트랩으로 전환한다',
            effects: { mental: 8 },
            result: '"외부 자금 없이도 할 수 있을지 모른다."\n\n손익분기점을 당기는 데 집중했다. 어려운 길이지만 주도권을 지킬 수 있는 길이다.',
            flags: ['bootstrap_decision'],
          },
        ],
        condition: { flag: 'failed_ic_normal' },
      },
    ],
  },
];
