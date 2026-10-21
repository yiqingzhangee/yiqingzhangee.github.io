export type Locale = 'zh' | 'en';

export interface LocaleCopy {
  nav: {
    experience: string;
    research: string;
    writing: string;
    resume: string;
    contact: string;
    alternateLocale: string;
  };
  sections: {
    impact: string;
    career: string;
    research: string;
    writing: string;
    education: string;
    publications: string;
    toolkit: string;
  };
  actions: {
    viewWork: string;
    email: string;
    readArticle: string;
    viewPaper: string;
  };
  contact: {
    heading: string;
    body: string;
  };
}

export interface ProfileLinks {
  email: string;
  scholar: string;
  github: string;
}

export interface SelectedImpact {
  title: string;
  summary: string;
}

export interface Experience {
  organization: string;
  role: string;
  period: string;
  summary: string;
  highlights: readonly string[];
  kind: 'industry' | 'research';
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
}

export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: number;
  url: string;
  summary: Record<Locale, string>;
}

export interface Toolkit {
  area: string;
  items: readonly string[];
}

export interface FeaturedWriting {
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
}

export interface ProfileContent {
  locale: Locale;
  copy: LocaleCopy;
  name: string;
  displayName: string;
  role: string;
  intro: string;
  summary: string;
  links: ProfileLinks;
  evidence: readonly string[];
  selectedImpact: readonly SelectedImpact[];
  experience: readonly Experience[];
  researchSummary: string;
  education: readonly Education[];
  publications: readonly Publication[];
  toolkit: readonly Toolkit[];
  featuredWriting: FeaturedWriting;
}

const links: ProfileLinks = {
  email: 'mailto:yiqingzhangee@gmail.com',
  scholar: 'https://scholar.google.com/citations?user=GPcGmDQAAAAJ&hl=en',
  github: 'https://github.com/yiqingzhangee',
};

const publications: readonly Publication[] = [
  {
    title: 'eRiskCom: An E-commerce Risky Community Detection Platform',
    authors: 'F. Liu, Z. Li, B. Wang, J. Yang, J. Huang, Y.-Q. Zhang, et al.',
    venue: 'The VLDB Journal, 31, 1085–1101',
    year: 2022,
    url: 'https://doi.org/10.1007/s00778-021-00723-z',
    summary: {
      zh: '围绕种子风险实体构建电商风险社区发现流程，通过图扩展、分区、剪枝和 Top-K 风险评分，从大规模关系网络中定位高风险社区并支持生产分析。',
      en: 'Builds an e-commerce risky-community discovery pipeline around seed entities, using graph expansion, partitioning, and pruning with Top-K risk scoring to locate high-risk communities at scale.',
    },
  },
  {
    title: 'Spectral Analysis of Epidemic Thresholds of Temporal Networks',
    authors: 'Y.-Q. Zhang, X. Li, A. V. Vasilakos',
    venue: 'IEEE Transactions on Cybernetics, 50(5), 1965–1977',
    year: 2020,
    url: 'https://doi.org/10.1109/TCYB.2017.2743003',
    summary: {
      zh: '从时序网络的谱结构出发刻画传播阈值，说明接触顺序与网络切换会改变静态聚合网络无法表达的传播条件。',
      en: 'Characterizes epidemic thresholds through the spectral structure of temporal networks, showing how contact order and network switching alter spreading conditions hidden by static aggregation.',
    },
  },
  {
    title: 'Human Interactive Patterns in Temporal Networks',
    authors: 'Y.-Q. Zhang, X. Li, J. Xu, A. V. Vasilakos',
    venue: 'IEEE Transactions on Systems, Man, and Cybernetics: Systems, 45(2), 214–222',
    year: 2015,
    url: 'https://doi.org/10.1109/TSMC.2014.2360505',
    summary: {
      zh: '在六个真实时序网络中分析高阶时序模体，归纳 Leader、Queue 与 Feedback 三类交互模式，揭示静态拓扑无法观察的群体行为结构。',
      en: 'Analyzes higher-order temporal motifs across six empirical networks and identifies Leader, Queue, and Feedback patterns that static topology alone cannot reveal.',
    },
  },
  {
    title: 'Temporal Dynamics and Impact of Event Interactions in Cyber-Social Populations',
    authors: 'Y.-Q. Zhang, X. Li',
    venue: 'Chaos, 23(1), 013131',
    year: 2013,
    url: 'https://doi.org/10.1063/1.4793540',
    summary: {
      zh: '从大规模校园 WiFi 记录中定义群体事件交互，研究多人共现活动的时间规律及其对赛博社会群体结构与动态的影响。',
      en: 'Defines group event interactions from large-scale campus WiFi records and studies how the timing of multi-person co-location shapes cyber-social population structure and dynamics.',
    },
  },
  {
    title: 'Characterizing Bursts of Aggregate Pairs with Individual Poissonian Activity and Preferential Mobility',
    authors: 'Y.-Q. Zhang, X. Li, D. Liang, J. Cui',
    venue: 'IEEE Communications Letters, 19(7), 1225–1228',
    year: 2015,
    url: 'https://doi.org/10.1109/LCOMM.2015.2437382',
    summary: {
      zh: '解释个体近似泊松的活动与偏好移动如何在聚合交互对上形成突发行为，连接微观移动机制与宏观时间模式。',
      en: 'Explains how near-Poisson individual activity and preferential mobility can produce bursty aggregate interaction pairs, connecting microscopic movement to macroscopic temporal patterns.',
    },
  },
  {
    title: 'Identifying Familiar Strangers in Human Encounter Networks',
    authors: 'D. Liang, X. Li, Y.-Q. Zhang',
    venue: 'EPL (Europhysics Letters), 116(1), 18006',
    year: 2016,
    url: 'https://doi.org/10.1209/0295-5075/116/18006',
    summary: {
      zh: '提出熟悉陌生人分类方法，从真实相遇网络中区分不同关系类型，揭示重复相遇但缺少显式社交连接的人群结构。',
      en: 'Introduces a familiar-stranger classifier that separates relationship types in empirical encounter networks and reveals repeated co-presence without explicit social ties.',
    },
  },
];

export const profileByLocale: Record<Locale, ProfileContent> = {
  zh: {
    locale: 'zh',
    copy: {
      nav: {
        experience: '经历',
        research: '研究',
        writing: '写作',
        resume: '简历',
        contact: '联系',
        alternateLocale: 'English',
      },
      sections: {
        impact: '代表工作',
        career: '职业与研究经历',
        research: '研究',
        writing: '写作',
        education: '教育经历',
        publications: '代表论文',
        toolkit: '核心方向与技术栈',
      },
      actions: {
        viewWork: '查看代表工作',
        email: '邮件联系',
        readArticle: '阅读全文',
        viewPaper: '查看论文',
      },
      contact: {
        heading: '保持联系',
        body: '欢迎围绕工作机会、学术合作与技术交流联系我。',
      },
    },
    name: '张屹綮',
    displayName: '张屹綮 / Yiqing Zhang',
    role: '资深工业算法工程师，专注 MLLM 风险智能',
    intro: '以 Graph ML、多模态风险识别、模型鲁棒性和生产推理优化构建可持续运行的风控系统。',
    summary:
      '我是一名风险智能技术负责人，长期关注如何把图挖掘、机器学习和大模型能力转化为可持续运行的真实风控系统。',
    links,
    evidence: ['ByteDance / TikTok', 'Ant Group', 'Fudan University', 'Hong Kong Baptist University'],
    selectedImpact: [
      {
        title: '多模态审核模型对抗评测与分层防御',
        summary:
          '建立覆盖攻击样本、误伤控制与回归验证的多模态对抗评测，将视觉证据、模型判断和审核策略拆分为可观察的防御层次，持续评估模型迭代后的风险变化。',
      },
      {
        title: 'VLM 端到端推理优化',
        summary:
          '让多模态风险模型在严格的线上资源约束下稳定运行，围绕量化、缓存调度、解码加速与视觉 token 压缩优化显存、延迟和吞吐，形成可复用的生产推理链路。',
      },
      {
        title: 'LLM 数据清洗与轻量模型持续重训',
        summary:
          '以大模型承担高价值的数据清洗与质量判断，再由轻量模型承接高吞吐在线决策；通过反馈回流和自动重训，让审核策略能够持续更新而不依赖一次性离线交付。',
      },
      {
        title: '多模态内容风险治理与反馈闭环',
        summary:
          '打通多路召回、视频抽帧、OCR、视觉模型、图像检索和人工审核，将处置结果回流到模型与风险库，形成能快速响应新型内容风险的可复用治理链路。',
      },
      {
        title: '国际化电商营销风险感知平台',
        summary:
          '面向不同国家与市场阶段，融合设备、账号、地址、关系图和行为信号，建设统一的风险感知、实时决策与持续学习体系，同时保留区域化策略的调整空间。',
      },
      {
        title: '支付风险图谱与欺诈团伙挖掘',
        summary:
          '把支付风险从孤立样本判断扩展到关系图上的协同团伙识别，结合社区搜索、图挖掘和图深度学习，在多个风险场景中沉淀可复用的团伙发现能力。',
      },
    ],
    experience: [
      {
        organization: 'ByteDance / TikTok',
        role: 'Risk Intelligence',
        period: '2021.11 – 至今',
        summary: '覆盖 TikTok Shop 电商营销风险与 TikTok 短视频行为、内容风险治理。',
        highlights: [
          '建设覆盖多个国家和市场的营销风险感知体系，融合设备、账号、地址、关系图和行为等信号。',
          '推动召回、模型、人审、黑库和线上策略形成可回流的短视频风险治理闭环。',
          '主导“LLM 数据清洗 + 轻量模型持续重训”链路，以小模型承接高吞吐、低成本的在线判断。',
          '建设多模态审核模型的对抗评测与分层防御能力，并推进 VLM 端到端推理优化。',
        ],
        kind: 'industry',
      },
      {
        organization: 'Ant Group',
        role: 'Risk Graph Mining',
        period: '2018.01 – 2021.11',
        summary: '负责支付与商家风险场景中的图挖掘和图深度学习。',
        highlights: [
          '面向 20+ 风险场景识别隐蔽、协同的欺诈团伙。',
          '在虚假注册、企业认证等场景实现秒级风险社区发现。',
          '推动半监督社区搜索与图深度学习方案落地。',
        ],
        kind: 'industry',
      },
      {
        organization: '香港浸会大学',
        role: '计算机科学系博士后研究员',
        period: '2016 – 2017',
        summary: '研究复杂网络、时序网络及其传播动力学。',
        highlights: [],
        kind: 'research',
      },
      {
        organization: '复旦大学',
        role: '电子工程博士研究',
        period: '2010 – 2016',
        summary: '从关系结构、动态演化和群体行为出发研究复杂网络与时序网络。',
        highlights: [],
        kind: 'research',
      },
    ],
    researchSummary:
      '研究起点是复杂网络、时序网络及其传播动力学。这段训练塑造了我处理工业风险问题的方式：从关系结构、动态演化和群体行为出发，而不只把风险识别视为独立样本分类。',
    education: [
      {
        institution: '复旦大学',
        degree: '电子工程博士',
        period: '2010 – 2016',
      },
      {
        institution: '复旦大学',
        degree: '电子信息科学与技术学士',
        period: '2003 – 2007',
      },
    ],
    publications,
    toolkit: [
      {
        area: '图机器学习',
        items: ['Graph Mining', 'Community Search', 'GNN', 'Heterogeneous Graphs', 'Temporal Networks'],
      },
      {
        area: 'LLM / VLM',
        items: ['PyTorch', 'Qwen/LLaMA', 'SFT', 'Distillation', 'Multimodal Evaluation'],
      },
      {
        area: '模型推理',
        items: ['FP8', 'KV Cache', 'Speculative Decoding', 'Token Compression'],
      },
      {
        area: '风险系统',
        items: ['Anti-Fraud', 'Trust & Safety', 'Continual Learning', 'Human-in-the-Loop'],
      },
      {
        area: '数据与基础设施',
        items: ['Spark', 'Hive', 'Distributed Training', 'Online/Offline Feature Pipelines'],
      },
    ],
    featuredWriting: {
      title: 'AI 智能体全生命周期智能攻防体系',
      description: '从模型安全到行动控制面：以全生命周期门禁、模型外控制平面与持续 TEVV 治理企业级 AI 智能体。',
      href: '/zh/reviews/enterprise-agent-security-lifecycle/',
      image: '/images/reviews/agent-security/agent-security-lifecycle-gates-zh.png',
      imageAlt: 'AI 智能体全生命周期安全门禁示意图',
    },
  },
  en: {
    locale: 'en',
    copy: {
      nav: {
        experience: 'Experience',
        research: 'Research',
        writing: 'Writing',
        resume: 'Resume',
        contact: 'Contact',
        alternateLocale: '中文',
      },
      sections: {
        impact: 'Selected impact',
        career: 'Career and research',
        research: 'Research',
        writing: 'Writing',
        education: 'Education',
        publications: 'Selected publications',
        toolkit: 'Core areas and toolkit',
      },
      actions: {
        viewWork: 'View selected work',
        email: 'Email me',
        readArticle: 'Read the article',
        viewPaper: 'View paper',
      },
      contact: {
        heading: 'Start a conversation',
        body: 'I welcome conversations about work opportunities, academic collaboration, and technical exchange.',
      },
    },
    name: 'Yiqing Zhang',
    displayName: 'Yiqing Zhang / 张屹綮',
    role: 'Senior industry algorithm engineer focused on MLLM risk intelligence',
    intro:
      'I build durable risk systems with Graph ML, multimodal risk detection, model robustness, and production inference optimization.',
    summary:
      'I lead risk-intelligence work that turns graph mining, machine learning, and large-model capabilities into production systems that can improve continuously.',
    links,
    evidence: ['ByteDance / TikTok', 'Ant Group', 'Fudan University', 'Hong Kong Baptist University'],
    selectedImpact: [
      {
        title: 'Adversarial evaluation and layered defense',
        summary:
          'Build multimodal adversarial evaluation across attack samples, false-positive controls, and regression checks. Separate visual evidence, model judgment, and review policy into observable defense layers so every model iteration can be assessed consistently.',
      },
      {
        title: 'End-to-end VLM inference optimization',
        summary:
          'Make multimodal risk models reliable under strict production constraints by optimizing quantization, cache scheduling, decoding, and visual-token compression across memory use, latency, and throughput.',
      },
      {
        title: 'LLM data cleaning and continual lightweight-model retraining',
        summary:
          'Use large models for high-value data cleaning and quality decisions, then serve high-throughput online traffic with lightweight models. Feedback and automated retraining keep review strategies current beyond a one-off offline delivery.',
      },
      {
        title: 'Multimodal content-risk governance and feedback',
        summary:
          'Connect multi-channel retrieval, dense video frames, OCR, vision models, image search, and human review. Feed enforcement outcomes back into models and risk repositories to create a reusable response loop for emerging content risks.',
      },
      {
        title: 'International e-commerce marketing-risk platform',
        summary:
          'Unify device, account, address, graph, and behavioral signals across countries and market stages. Combine shared risk perception, real-time decisions, and continual learning with room for region-specific controls.',
      },
      {
        title: 'Payment-risk graphs and fraud-ring mining',
        summary:
          'Extend payment-risk decisions from isolated samples to coordinated entities in relational graphs. Combine community search, graph mining, and graph deep learning into reusable fraud-ring discovery across multiple risk scenarios.',
      },
    ],
    experience: [
      {
        organization: 'ByteDance / TikTok',
        role: 'Risk Intelligence',
        period: '2021.11 – Present',
        summary:
          'Risk intelligence for TikTok Shop marketing and TikTok short-video behavior and content safety.',
        highlights: [
          'Build marketing-risk perception across multiple countries and markets from device, account, address, graph, and behavioral signals.',
          'Connect retrieval, models, human review, blocklists, and online policy into a feedback loop for short-video risk governance.',
          'Lead an “LLM data cleaning + continual lightweight-model retraining” pipeline for high-throughput, low-cost online decisions.',
          'Build adversarial evaluation and layered defenses for multimodal moderation while optimizing VLM inference end to end.',
        ],
        kind: 'industry',
      },
      {
        organization: 'Ant Group',
        role: 'Risk Graph Mining',
        period: '2018.01 – 2021.11',
        summary: 'Graph mining and graph deep learning for payment and merchant risk.',
        highlights: [
          'Identified covert, coordinated fraud rings across 20+ risk scenarios.',
          'Delivered second-level risky-community discovery for fraudulent registration and business verification scenarios.',
          'Put semi-supervised community search and graph deep learning into production.',
        ],
        kind: 'industry',
      },
      {
        organization: 'Hong Kong Baptist University',
        role: 'Postdoctoral Research Fellow, Department of Computer Science',
        period: '2016 – 2017',
        summary: 'Research on complex networks, temporal networks, and spreading dynamics.',
        highlights: [],
        kind: 'research',
      },
      {
        organization: 'Fudan University',
        role: 'PhD Research in Electronic Engineering',
        period: '2010 – 2016',
        summary:
          'Studied complex and temporal networks through relational structure, dynamic evolution, and collective behavior.',
        highlights: [],
        kind: 'research',
      },
    ],
    researchSummary:
      'My research began with complex networks, temporal networks, and spreading dynamics. That training shapes how I approach industrial risk intelligence: through relational structure, dynamic evolution, and collective behavior rather than isolated-sample classification alone.',
    education: [
      {
        institution: 'Fudan University',
        degree: 'PhD in Electronic Engineering',
        period: '2010 – 2016',
      },
      {
        institution: 'Fudan University',
        degree: 'BSc in Electronic Information Science and Technology',
        period: '2003 – 2007',
      },
    ],
    publications,
    toolkit: [
      {
        area: 'Graph ML',
        items: ['Graph Mining', 'Community Search', 'GNN', 'Heterogeneous Graphs', 'Temporal Networks'],
      },
      {
        area: 'LLM / VLM',
        items: ['PyTorch', 'Qwen/LLaMA', 'SFT', 'Distillation', 'Multimodal Evaluation'],
      },
      {
        area: 'Model Serving',
        items: ['FP8', 'KV Cache', 'Speculative Decoding', 'Token Compression'],
      },
      {
        area: 'Risk Systems',
        items: ['Anti-Fraud', 'Trust & Safety', 'Continual Learning', 'Human-in-the-Loop'],
      },
      {
        area: 'Data & Infra',
        items: ['Spark', 'Hive', 'Distributed Training', 'Online/Offline Feature Pipelines'],
      },
    ],
    featuredWriting: {
      title: 'Lifecycle Security for AI Agents: An Intelligent Offense-and-Defense Framework',
      description:
        'From model security to an action control plane: lifecycle gates, model-external controls, and continuous TEVV for enterprise AI agents.',
      href: '/en/reviews/enterprise-agent-security-lifecycle/',
      image: '/images/reviews/agent-security/agent-security-lifecycle-gates-en.png',
      imageAlt: 'Lifecycle security gates for enterprise AI agents',
    },
  },
};
