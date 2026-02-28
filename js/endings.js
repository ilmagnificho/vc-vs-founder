/**
 * Endings System - Evaluate and determine endings
 */
const EndingsSystem = (() => {
  const FOUNDER_ENDINGS = [
    {
      id: 'burnout',
      emoji: '💀',
      title: '번아웃',
      subtitle: '정신건강 경고',
      description: '창업자의 72%가 정신건강 문제를 겪습니다. 당신도 그중 하나가 되었습니다.',
      condition: (state) => state.stats.mental.value <= 0,
      priority: 100,
    },
    {
      id: 'runway_zero',
      emoji: '💸',
      title: '런웨이 종료',
      subtitle: '통장 잔고: 0원',
      description: '"이번 달 월급이-" "..." 대화가 여기서 끊겼습니다.',
      condition: (state) => state.stats.runway.value <= 0,
      priority: 99,
    },
    {
      id: 'poison_chalice',
      emoji: '🥴',
      title: '독이 든 성배',
      subtitle: '축하합니다...?',
      description: '투자금은 들어왔다. 독소 조항도 같이 들어왔다. 다음 라운드가 두렵다.',
      condition: (state) => state.flags.includes('signed_immediately'),
      priority: 80,
    },
    {
      id: 'smart_survivor',
      emoji: '🎉',
      title: '스마트 서바이버',
      subtitle: '상위 5%의 창업자',
      description: '축하합니다! 당신은 상위 5%의 창업자입니다. ...이제 시리즈A가 기다린다.',
      condition: (state) => state.flags.includes('lawyer_review') || state.flags.includes('valuation_up'),
      priority: 70,
    },
    {
      id: 'pivot_master',
      emoji: '🔥',
      title: '피봇의 달인',
      subtitle: '넘어져도 다시 일어서는',
      description: '한번 쓰러졌지만 다시 일어섰다. 진짜 창업자는 여기서부터 시작이다.',
      condition: (state) => state.flags.includes('pivot') || state.flags.includes('keep_fighting'),
      priority: 60,
    },
    {
      id: 'next_life',
      emoji: '🌙',
      title: '다음 생에서',
      subtitle: '폐업 신고 완료',
      description: '사업자 등록 말소. 법인 해산. 하지만 끝내는 것도 용기다. 다음엔 더 잘할 수 있다.',
      condition: (state) => state.flags.includes('give_up'),
      priority: 50,
    },
    {
      id: 'deal_broken',
      emoji: '😤',
      title: '욕심이 화를 불렀다',
      subtitle: '딜 파토',
      description: '밸류 협상에서 딜이 깨졌다. 10억이 아니라 0원이 됐다.',
      condition: (state) => state.flags.includes('deal_broken'),
      priority: 75,
    },
    {
      id: 'founder_default',
      emoji: '🛤️',
      title: '여정은 계속된다',
      subtitle: '아직 끝나지 않았다',
      description: '스타트업의 여정에 정해진 엔딩은 없다. 당신의 이야기는 아직 진행 중이다.',
      condition: () => true,
      priority: 0,
    },
  ];

  const VC_ENDINGS = [
    {
      id: 'fired',
      emoji: '🪑',
      title: '해고',
      subtitle: 'LinkedIn: Open to work 🟢',
      description: 'LinkedIn 상태가 바뀌었다. "Open to work" 이직 준비 중입니다.',
      condition: (state) => state.stats.bossGaze.value <= 0,
      priority: 100,
    },
    {
      id: 'portfolio_dead',
      emoji: '💀',
      title: '포트폴리오 전사',
      subtitle: '10억 증발',
      description: '10억이 3개월 만에 증발. LP에게 뭐라고 말할지 아직 모르겠다.',
      condition: (state) => state.flags.includes('hide_failure'),
      priority: 90,
    },
    {
      id: 'missed_unicorn',
      emoji: '😭',
      title: '놓친 유니콘',
      subtitle: '그때 투자했으면...',
      description: '당신이 패스한 회사가 1000억 밸류를 달성했습니다. 오늘도 술이 당긴다.',
      condition: (state) => state.flags.includes('passed_quiet_genius') || (state.flags.includes('vc_failed_ic') && state.flags.includes('learned_lesson')),
      priority: 70,
    },
    {
      id: 'star_analyst',
      emoji: '⭐',
      title: '스타 심사역',
      subtitle: '파트너 승진 제안',
      description: '해외 VC에서 팔로온 러브콜! GP가 파트너 승진을 제안합니다.',
      condition: (state) => state.flags.includes('star_ending'),
      priority: 80,
    },
    {
      id: 'aggressive_investor',
      emoji: '🦈',
      title: '공격적 투자자',
      subtitle: '하이리스크 하이리턴',
      description: '대담한 베팅이었다. 그리고 이번엔 맞았다. 다음에도 맞을 수 있을까?',
      condition: (state) => state.flags.includes('aggressive_ending'),
      priority: 75,
    },
    {
      id: 'growing_analyst',
      emoji: '🌱',
      title: '성장하는 심사역',
      subtitle: '실패에서 배우는 중',
      description: '실패를 솔직하게 보고한 당신. 신뢰는 유지했다. 이것이 이 업계에서 가장 중요한 자산이다.',
      condition: (state) => state.flags.includes('honest_report'),
      priority: 65,
    },
    {
      id: 'balanced_vc',
      emoji: '🤝',
      title: '동료의 VC',
      subtitle: '괜찮은 사람',
      description: '업계에서 "괜찮은 VC"로 통한다. 화려하진 않지만 꾸준하다.',
      condition: (state) => state.flags.includes('reflected') || state.flags.includes('termsheet_friendly'),
      priority: 55,
    },
    {
      id: 'vc_default',
      emoji: '🛤️',
      title: '여정은 계속된다',
      subtitle: '다음 딜을 찾아서',
      description: 'VC의 일상은 계속된다. 내일도 IR덱 47개가 기다리고 있다.',
      condition: () => true,
      priority: 0,
    },
  ];

  const QUOTES = [
    'VC가 "좋은 사업이시네요"라고 하면 투자 안 한다는 뜻이다',
    '커피챗 3번이면 거절이다',
    'TAM은 꿈이고, SAM은 희망이고, SOM은 내 통장 잔고다',
    '읽씹은 거절보다 잔인하다',
    '프린세스 메이커는 프린세스를 키우지만, 여기선 번아웃을 키운다',
    'VC의 "내부 검토"는 "이따 점심 뭐 먹지" 다음 우선순위다',
    '300% 성장? 3명에서 12명 되는 것도 300%다',
    '스타트업 대표의 수면 시간은 런웨이에 비례한다',
    'LP에게 "빈티지가 안 좋아서"라고 말하는 건, 학생이 "시험이 어려워서"라고 말하는 것과 같다',
    'Pre-A에서 살아남으면 시리즈A가 기다린다. 축하할 일이 아니다.',
    '스타트업 대표의 "곧"은 VC의 "검토해볼게요"와 같은 시간 단위다',
    '투자 거절 메일에 "향후 좋은 기회"라고 쓰는 건 이별할 때 "좋은 사람 만나"와 같다',
  ];

  function evaluate(state) {
    const endings = state.role === 'founder' ? FOUNDER_ENDINGS : VC_ENDINGS;

    // Sort by priority (highest first) and find first matching
    const sorted = [...endings].sort((a, b) => b.priority - a.priority);
    for (const ending of sorted) {
      if (ending.condition(state)) {
        return {
          ...ending,
          quote: QUOTES[Math.floor(Math.random() * QUOTES.length)],
          stats: { ...state.stats },
          role: state.role,
          flags: [...state.flags],
        };
      }
    }

    // Fallback (should not reach here due to default endings)
    return sorted[sorted.length - 1];
  }

  function getStatCheckResult(statCheck, stats) {
    if (statCheck.type === 'combined') {
      const total = statCheck.stats.reduce((sum, s) => sum + (stats[s] ? stats[s].value : 0), 0);
      return total >= statCheck.threshold;
    }
    return stats[statCheck.stat] && stats[statCheck.stat].value >= statCheck.threshold;
  }

  return {
    evaluate,
    getStatCheckResult,
    QUOTES,
  };
})();
