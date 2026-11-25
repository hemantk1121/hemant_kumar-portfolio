export interface NavItem {
  label: string;
  href: string;
  id: string;
}

export interface HighlightItem {
  id: string;
  title: string;
  description: string;
  icon: 'brain' | 'code' | 'sparkles';
  accent: 'blue' | 'violet' | 'cyan';
}

export type SkillIconKey =
  | 'python'
  | 'cpp'
  | 'javascript'
  | 'numpy'
  | 'pandas'
  | 'matplotlib'
  | 'scikitlearn'
  | 'html'
  | 'css'
  | 'react'
  | 'git'
  | 'github'
  | 'vscode'
  | 'colab';

export interface SkillItem {
  name: string;
  icon: SkillIconKey;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: 'terminal' | 'cpu' | 'globe' | 'wrench';
  accent: 'blue' | 'violet' | 'cyan' | 'indigo';
  skills: SkillItem[];
}

export interface FeaturedProjectData {
  name: string;
  description: string;
  liveUrl: string;
  displayUrl: string;
  tags: string[];
}

export interface InternshipItem {
  id: string;
  organization: string;
  role: string;
  status: 'Completed';
  icon: 'cpu' | 'chart';
}

/**
 * To add certificates later, simply push objects matching this interface
 * into the `certificates` array below. The Certificates section will
 * automatically switch from the placeholder state to a responsive card grid.
 */
export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  image?: string;
  credentialUrl?: string;
  date?: string;
}

export interface EducationItem {
  label: string;
  degree: string;
  institution: string;
  location: string;
}

export const PERSONAL_INFO = {
  name: 'Hemant Kumar',
  initials: 'HK',
  greeting: "Hi, I'm Hemant Kumar",
  heroHeadlineStart: 'Turning Ideas Into',
  heroHeadlineAccent: 'Intelligent Solutions.',
  tagline: 'Turning ideas into intelligent solutions.',
  professionalTitle: 'Aspiring AI/ML Engineer | Computer Science Student | Developer',
  heroSubtitle: 'Aspiring AI/ML Engineer | CSE Student | Developer',
  heroDescription:
    'Exploring Artificial Intelligence, Machine Learning, and software development to build practical technology that makes a difference.',
  shortIntro:
    'I am a Computer Science Engineering student passionate about Artificial Intelligence, Machine Learning, and software development. I enjoy exploring new technologies, developing practical projects, and continuously improving my technical skills to solve real-world problems.',
  email: 'hemantkumar01june@gamil.com',
  githubUrl: 'https://github.com/hemantk1121',
  githubHandle: 'github.com/hemantk1121',
  linkedinUrl: 'https://www.linkedin.com/in/hemant-kumar-841989395/',
  linkedinHandle: 'linkedin.com/in/hemant-kumar-841989395',
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Certificates', href: '#certificates', id: 'certificates' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export const ABOUT_CONTENT = {
  heading: 'About Me',
  paragraphs: [
    "I'm Hemant Kumar, a Computer Science Engineering student at ABES Engineering College. My interests lie in Artificial Intelligence, Machine Learning, programming, and building technology-driven solutions.",
    "I believe in learning by building. Through internships, personal projects, and continuous practice, I'm working towards developing the skills required to become an AI/ML Engineer. I'm always curious about how technology can solve practical problems and create meaningful impact.",
  ],
  highlights: [
    {
      id: 'ai-ml',
      title: 'AI & Machine Learning',
      description:
        'Exploring intelligent systems, data analysis, and machine learning foundations to solve practical problems.',
      icon: 'brain',
      accent: 'blue',
    },
    {
      id: 'building',
      title: 'Building Projects',
      description:
        'Learning by turning ideas into working applications and strengthening software engineering fundamentals.',
      icon: 'code',
      accent: 'violet',
    },
    {
      id: 'learning',
      title: 'Continuous Learning',
      description:
        'Consistently improving core computer science skills, exploring new tools, and growing step by step.',
      icon: 'sparkles',
      accent: 'cyan',
    },
  ] as HighlightItem[],
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    icon: 'terminal',
    accent: 'blue',
    skills: [
      { name: 'Python', icon: 'python' },
      { name: 'C++', icon: 'cpp' },
      { name: 'JavaScript', icon: 'javascript' },
    ],
  },
  {
    id: 'ai-ml',
    title: 'AI / ML & Data Analysis',
    icon: 'cpu',
    accent: 'violet',
    skills: [
      { name: 'NumPy', icon: 'numpy' },
      { name: 'Pandas', icon: 'pandas' },
      { name: 'Matplotlib', icon: 'matplotlib' },
      { name: 'Scikit-learn', icon: 'scikitlearn' },
    ],
  },
  {
    id: 'web',
    title: 'Web Development',
    icon: 'globe',
    accent: 'cyan',
    skills: [
      { name: 'HTML', icon: 'html' },
      { name: 'CSS', icon: 'css' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'React', icon: 'react' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    icon: 'wrench',
    accent: 'indigo',
    skills: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'VS Code', icon: 'vscode' },
      { name: 'Google Colab', icon: 'colab' },
    ],
  },
];

export const FEATURED_PROJECT: FeaturedProjectData = {
  name: 'HireReady – AI Interviewing Agent',
  description:
    'An AI-powered interview preparation platform designed to help candidates practice interviews, improve their responses, and prepare for real-world interview scenarios.',
  liveUrl: 'https://hire-ready-interviews.lovable.app/',
  displayUrl: 'hire-ready-interviews.lovable.app',
  tags: ['AI', 'Interview Preparation', 'Web Application'],
};

export const INTERNSHIPS: InternshipItem[] = [
  {
    id: 'codomax',
    organization: 'Codomax',
    role: 'AI/ML Intern',
    status: 'Completed',
    icon: 'cpu',
  },
  {
    id: 'codealpha',
    organization: 'CodeAlpha',
    role: 'Data Analyst Intern',
    status: 'Completed',
    icon: 'chart',
  },
];

/**
 * Add your certificates here anytime! Example entry:
 * {
 *   id: 'cert-1',
 *   title: 'Certificate Title',
 *   issuer: 'Issuing Organization',
 *   image: '/certificates/your-certificate.png',
 *   credentialUrl: 'https://example.com/verify/123',
 *   date: '2026',
 * }
 */
export const CERTIFICATES: CertificateItem[] = [];

export const EDUCATION: EducationItem = {
  label: 'Current Education',
  degree: 'B.Tech – Computer Science Engineering (Core)',
  institution: 'ABES Engineering College',
  location: 'Ghaziabad, Uttar Pradesh, India',
};

export const CONTACT_CONTENT = {
  heading: "Let's Connect",
  subheading:
    "I'm always open to connecting, learning, collaborating, and exploring new opportunities.",
};
