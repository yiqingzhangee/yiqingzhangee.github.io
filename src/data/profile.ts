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
  evidence?: string;
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
  },
  {
    title: 'Spectral Analysis of Epidemic Thresholds of Temporal Networks',
    authors: 'Y.-Q. Zhang, X. Li, A. V. Vasilakos',
    venue: 'IEEE Transactions on Cybernetics, 50(5), 1965–1977',
    year: 2020,
    url: 'https://ieeexplore.ieee.org/document/8031280',
  },
  {
    title: 'Human Interactive Patterns in Temporal Networks',
    authors: 'Y.-Q. Zhang, X. Li, J. Xu, A. V. Vasilakos',
    venue: 'IEEE Transactions on Systems, Man, and Cybernetics: Systems, 45(2), 214–222',
    year: 2015,
    url: 'https://doi.org/10.1109/TSMC.2014.2360505',
  },
  {
    title: 'Towards a Temporal Network Analysis of Interactive WiFi Users',
    authors: 'Y. Zhang, L. Wang, Y.-Q. Zhang, X. Li',
    venue: 'EPL (Europhysics Letters), 98(6), 68002',
    year: 2012,
    url: 'https://arxiv.org/abs/1206.4781',
  },
  {
    title: 'Evolution of Scaling Emergence in Large-Scale Spatial Epidemic Spreading',
    authors: 'L. Wang, X. Li, Y.-Q. Zhang, Y. Zhang, K. Zhang',
    venue: 'PLOS ONE, 6(7), e21197',
    year: 2011,
    url: 'https://doi.org/10.1371/journal.pone.0021197',
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
        title: '多模态风险模型推理优化',
        summary: '推进 VLM 在显存、延迟、吞吐和视觉 token 成本上的端到端优化。',
      },
      {
        title: '对抗评测与分层防御',
        summary: '建设多模态审核模型的对抗评测、分层防御、误伤控制与回归评估能力。',
      },
      {
        title: '图风控与团伙发现',
        summary: '将实时团伙发现建模为目标社区搜索，并沉淀可复用的图挖掘与图深度学习能力。',
        evidence: '覆盖 20+ 风险场景，支持秒级风险社区发现',
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
        title: 'Multimodal risk-model inference',
        summary: 'Optimize VLM memory use, latency, throughput, and visual-token cost end to end.',
      },
      {
        title: 'Adversarial evaluation and layered defense',
        summary:
          'Build adversarial evaluation, layered defenses, false-positive controls, and regression evaluation for multimodal moderation models.',
      },
      {
        title: 'Graph-based fraud-ring discovery',
        summary:
          'Model real-time ring discovery as targeted community search and build reusable graph-mining and graph-learning capabilities.',
        evidence: '20+ risk scenarios with second-level risky-community discovery',
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
