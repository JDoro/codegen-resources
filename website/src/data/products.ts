export interface Product {
  id: string;
  name: string;
  description: string;
  website: string;
  hasIDEExtension: boolean;
  supportedIDEs: string[];
  pricing: 'Free' | 'Paid' | 'Freemium';
  language: string[];
  features: string[];
  company: string;
}

export const products: Product[] = [
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    description: 'AI pair programmer that helps you write code faster',
    website: 'https://github.com/features/copilot',
    hasIDEExtension: true,
    supportedIDEs: ['VS Code', 'Visual Studio', 'JetBrains IDEs', 'Neovim'],
    pricing: 'Paid',
    language: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'Go', 'Ruby', 'PHP'],
    features: ['Code completion', 'Chat', 'CLI', 'Code explanation'],
    company: 'GitHub'
  },
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'AI-first code editor built for productivity',
    website: 'https://cursor.sh',
    hasIDEExtension: false,
    supportedIDEs: ['Cursor (Standalone)'],
    pricing: 'Freemium',
    language: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'Go', 'Ruby'],
    features: ['Code completion', 'Chat', 'Codebase understanding', 'Multi-file editing'],
    company: 'Cursor'
  },
  {
    id: 'tabnine',
    name: 'Tabnine',
    description: 'AI code assistant that provides intelligent code completions',
    website: 'https://www.tabnine.com',
    hasIDEExtension: true,
    supportedIDEs: ['VS Code', 'IntelliJ IDEA', 'PyCharm', 'WebStorm', 'Sublime Text', 'Vim', 'Eclipse'],
    pricing: 'Freemium',
    language: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'Go', 'PHP', 'Ruby', 'Rust'],
    features: ['Code completion', 'Code generation', 'Testing', 'Documentation'],
    company: 'Tabnine'
  },
  {
    id: 'codeium',
    name: 'Codeium',
    description: 'Free AI-powered code acceleration toolkit',
    website: 'https://codeium.com',
    hasIDEExtension: true,
    supportedIDEs: ['VS Code', 'JetBrains IDEs', 'Vim', 'Neovim', 'Emacs', 'Eclipse', 'Jupyter'],
    pricing: 'Freemium',
    language: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'Go', 'PHP', 'Ruby', 'Rust'],
    features: ['Code completion', 'Chat', 'Search', 'Command'],
    company: 'Codeium'
  },
  {
    id: 'amazon-codewhisperer',
    name: 'Amazon CodeWhisperer',
    description: 'AI coding companion for building applications',
    website: 'https://aws.amazon.com/codewhisperer/',
    hasIDEExtension: true,
    supportedIDEs: ['VS Code', 'JetBrains IDEs', 'AWS Cloud9', 'AWS Lambda'],
    pricing: 'Freemium',
    language: ['Python', 'Java', 'JavaScript', 'TypeScript', 'C#', 'Go', 'Ruby', 'PHP', 'Kotlin', 'Rust'],
    features: ['Code completion', 'Security scanning', 'Reference tracking', 'CLI'],
    company: 'Amazon'
  },
  {
    id: 'supermaven',
    name: 'Supermaven',
    description: 'Fast AI code completion with 1 million token context',
    website: 'https://supermaven.com',
    hasIDEExtension: true,
    supportedIDEs: ['VS Code', 'JetBrains IDEs', 'Neovim'],
    pricing: 'Freemium',
    language: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'Go', 'Rust'],
    features: ['Code completion', 'Large context window'],
    company: 'Supermaven'
  },
  {
    id: 'openai-codex',
    name: 'OpenAI Codex',
    description: 'AI system that translates natural language to code',
    website: 'https://openai.com/blog/openai-codex',
    hasIDEExtension: false,
    supportedIDEs: [],
    pricing: 'Paid',
    language: ['Python', 'JavaScript', 'TypeScript', 'Ruby', 'Go', 'PHP', 'Bash'],
    features: ['Code generation', 'API access'],
    company: 'OpenAI'
  },
  {
    id: 'continue',
    name: 'Continue',
    description: 'Open-source AI code assistant',
    website: 'https://continue.dev',
    hasIDEExtension: true,
    supportedIDEs: ['VS Code', 'JetBrains IDEs'],
    pricing: 'Free',
    language: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'Go'],
    features: ['Code completion', 'Chat', 'Refactoring', 'Custom models'],
    company: 'Continue'
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    description: 'AI-powered IDE with agentic flows',
    website: 'https://codeium.com/windsurf',
    hasIDEExtension: false,
    supportedIDEs: ['Windsurf (Standalone)'],
    pricing: 'Freemium',
    language: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'Go', 'Rust'],
    features: ['Code completion', 'Chat', 'Agentic flows', 'Multi-file editing'],
    company: 'Codeium'
  },
  {
    id: 'replit-ai',
    name: 'Replit AI',
    description: 'AI-powered coding assistant in Replit',
    website: 'https://replit.com/ai',
    hasIDEExtension: false,
    supportedIDEs: ['Replit (Web)'],
    pricing: 'Freemium',
    language: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'Go', 'HTML/CSS'],
    features: ['Code completion', 'Chat', 'Code explanation', 'Debugging'],
    company: 'Replit'
  }
];
