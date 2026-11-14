export interface TechItem {
  name: string;
  category: 'languages' | 'frameworks' | 'cloud' | 'tools';
  filterGroup: 'Languages & Core' | 'Web & Cloud' | 'Developer Tools & IDEs';
  color: string;
  glowColor: string;
  svgPath: string;
  viewBox?: string;
  level: string;
  tagline: string;
}

export const TECH_ITEMS: TechItem[] = [
  // --- Languages & Core ---
  {
    name: 'JavaScript',
    category: 'languages',
    filterGroup: 'Languages & Core',
    color: '#F7DF1E',
    glowColor: 'rgba(247, 223, 30, 0.35)',
    svgPath:
      'M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.221.24 1.004-.555 1.545-1.74 1.545-.99 0-1.635-.42-2.146-1.185l-1.8 1.155c.42.795.945 1.32 1.62 1.695.945.51 2.056.63 3.36.42 1.141-.165 2.116-.705 2.686-1.47.78-.99.825-2.43.435-3.615zm-8.804-7.5l-2.07-.015v7.65c0 1.516-.076 2.056-.465 2.506-.39.435-.96.6-1.785.6-.66 0-1.245-.105-1.606-.27l-.375 1.695c.57.255 1.35.405 2.22.405 1.186 0 2.131-.375 2.761-1.065.735-.81.825-1.89.825-3.72l-.005-7.786z',
    level: 'Expert',
    tagline: 'Modern ES6+, Async / Event-Loop, Engine Optimization',
  },
  {
    name: 'Python',
    category: 'languages',
    filterGroup: 'Languages & Core',
    color: '#3776AB',
    glowColor: 'rgba(55, 118, 171, 0.4)',
    svgPath:
      'M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.006 2.751h5.807v.825H3.86S0 5.766 0 11.875c0 6.108 3.398 5.898 3.398 5.898l2.029-.002v-2.846s-.11-3.398 3.344-3.398h5.753v-.852s.47-3.346-3.34-3.346h-5.26s-.13-1.828 1.83-1.828h7.492S20.08 5.37 20.08 0h-8.166zm-3.23 1.69a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1zm3.4 22.31c6.094 0 5.714-2.656 5.714-2.656l-.006-2.751h-5.807v-.825h8.153s3.86.466 3.86-5.643c0-6.108-3.398-5.898-3.398-5.898l-2.029.002v2.846s.11 3.398-3.344 3.398h-5.753v.852s-.47 3.346 3.34 3.346h5.26s.13 1.828-1.83 1.828H8.384S3.92 18.63 3.92 24h8.094zm3.23-1.69a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1z',
    level: 'Advanced',
    tagline: 'FastAPI, Django, LangChain, Vector Analysis',
  },
  {
    name: 'Java',
    category: 'languages',
    filterGroup: 'Languages & Core',
    color: '#ED8B00',
    glowColor: 'rgba(237, 139, 0, 0.4)',
    svgPath:
      'M9.012 17.518c-2.486.354-4.887.697-4.887 2.054 0 1.947 4.908 2.016 7.875 2.016 3.738 0 7.875-.157 7.875-2.072 0-1.423-2.62-1.782-5.46-2.13-.762-.093-1.57-.19-2.385-.306-.99.143-2.012.28-3.018.438zm6.543-3.662c1.78-.17 3.383-.34 3.383-.993 0-.853-2.385-.97-4.664-.97-1.745 0-3.642.068-4.855.153 2.07.618 4.248 1.157 6.136 1.81zm-7.794-.383c-1.393.18-2.678.368-2.678.892 0 .685 1.956.88 3.864.99-.446-.628-.847-1.258-1.186-1.882zm9.145-5.918c-.37-.893-1.196-1.706-2.065-2.383.67.234 1.34.545 1.872.936.852.628 1.392 1.488 1.392 2.456 0 2.02-2.17 3.593-4.57 4.914 1.76-.893 3.74-2.73 3.74-4.72 0-.416-.134-.81-.369-1.203zm-5.474-3.68c-.687-1.243-1.922-2.38-3.05-3.327.915.283 1.844.707 2.593 1.25 1.168.85 1.936 2.01 1.936 3.292 0 2.658-2.923 4.795-6.175 6.577 2.378-1.207 5.06-3.74 5.06-6.425 0-.472-.128-.934-.364-1.367z',
    level: 'Advanced',
    tagline: 'OOP Architecture, Multithreading, JVM Performance',
  },
  {
    name: 'C Programming',
    category: 'languages',
    filterGroup: 'Languages & Core',
    color: '#A8B9CC',
    glowColor: 'rgba(168, 185, 204, 0.35)',
    svgPath:
      'M11.968 0C5.358 0 0 5.358 0 11.968c0 6.61 5.358 11.968 11.968 11.968 4.417 0 8.272-2.392 10.355-5.945l-4.706-2.717a6.002 6.002 0 0 1-5.649 3.238c-3.313 0-6-2.687-6-6s2.687-6 6-6c2.43 0 4.526 1.455 5.485 3.535l4.757-2.747C20.089 2.573 16.294 0 11.968 0z',
    level: 'Core Mastery',
    tagline: 'Pointers, Manual Memory Allocation, Low-Level Systems',
  },
  {
    name: 'SQL',
    category: 'languages',
    filterGroup: 'Languages & Core',
    color: '#CC292B',
    glowColor: 'rgba(204, 41, 43, 0.4)',
    svgPath:
      'M12 2C6.48 2 2 4.02 2 6.5v11C2 19.98 6.48 22 12 22s10-2.02 10-4.5v-11C22 4.02 17.52 2 12 2zm0 2.5c4.69 0 8 1.62 8 2.5s-3.31 2.5-8 2.5-8-1.62-8-2.5 3.31-2.5 8-2.5zm8 6.5c0 .88-3.31 2.5-8 2.5s-8-1.62-8-2.5V8.88c2.14 1.25 5.09 1.87 8 1.87s5.86-.62 8-1.87V11zm0 4.5c0 .88-3.31 2.5-8 2.5s-8-1.62-8-2.5v-2.12c2.14 1.25 5.09 1.87 8 1.87s5.86-.62 8-1.87v2.12zm0 4.5c0 .88-3.31 2.5-8 2.5s-8-1.62-8-2.5v-2.12c2.14 1.25 5.09 1.87 8 1.87s5.86-.62 8-1.87V20z',
    level: 'Advanced',
    tagline: 'Complex Joins, Indexing, ACID Transactions, Schema Design',
  },
  {
    name: 'HTML5',
    category: 'languages',
    filterGroup: 'Languages & Core',
    color: '#E34F26',
    glowColor: 'rgba(227, 79, 38, 0.4)',
    svgPath:
      'M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.234-2.625h11.438l.25-2.812H5.531l.703 7.937h9.094l-.328 3.656-3.031.813-3.031-.813-.188-2.156H5.938l.375 4.5 5.688 1.578 5.672-1.578.781-8.75H8.531z',
    level: 'Expert',
    tagline: 'Semantic DOM, Canvas API, Web Accessibility (a11y)',
  },
  {
    name: 'CSS3',
    category: 'languages',
    filterGroup: 'Languages & Core',
    color: '#1572B6',
    glowColor: 'rgba(21, 114, 182, 0.4)',
    svgPath:
      'M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm15.656 4.313H6.844l.234 2.625h9.844l-.25 2.812H7.313l.25 2.813h8.797l-.766 8.563-3.617.984-3.609-.984-.234-2.735H5.328l.438 5.125 6.211 1.719 6.219-1.719 1.188-13.484.219-2.594-.447-.109z',
    level: 'Expert',
    tagline: '3D Transforms, Glassmorphism, Responsive Grid/Flex',
  },

  // --- Frameworks & Libraries ---
  {
    name: 'React 18',
    category: 'frameworks',
    filterGroup: 'Web & Cloud',
    color: '#61DAFB',
    glowColor: 'rgba(97, 218, 251, 0.45)',
    svgPath:
      'M12 9.09a2.91 2.91 0 1 0 0 5.82 2.91 2.91 0 0 0 0-5.82zm0-7.09c4.27 0 8.08 1.17 10.37 3.03 2.45 2 2.45 4.95 0 6.95-2.29 1.86-6.1 3.03-10.37 3.03s-8.08-1.17-10.37-3.03c-2.45-2-2.45-4.95 0-6.95C3.92 3.17 7.73 2 12 2zm0 1c-4.08 0-7.7 1.11-9.76 2.79-1.89 1.54-1.89 3.88 0 5.42C4.3 12.89 7.92 14 12 14s7.7-1.11 9.76-2.79c1.89-1.54 1.89-3.88 0-5.42C19.7 4.11 16.08 3 12 3zm-6.93 2.5c3.7-2.14 7.5-3.21 10.42-2.85 3.14.39 4.92 2.05 4.92 4.67 0 2.78-2.07 5.92-5.77 8.06-3.7 2.14-7.5 3.21-10.42 2.85-3.14-.39-4.92-2.05-4.92-4.67 0-2.78 2.07-5.92 5.77-8.06zm.5 1c-3.41 1.97-5.18 4.75-5.18 7.02 0 1.94 1.25 3.08 3.73 3.39 2.55.32 5.98-.67 9.39-2.64 3.41-1.97 5.18-4.75 5.18-7.02 0-1.94-1.25-3.08-3.73-3.39-2.55-.32-5.98.67-9.39 2.64z',
    level: 'Beginner..',
    tagline: 'Custom Hooks, Concurrent Features, State Architecture',
  },
  {
    name: 'Tailwind CSS',
    category: 'frameworks',
    filterGroup: 'Web & Cloud',
    color: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    svgPath:
      'M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z',
    level: 'Expert',
    tagline: 'Design Systems, JIT Engine, Custom Animation Classes',
  },
  {
    name: 'Django',
    category: 'frameworks',
    filterGroup: 'Web & Cloud',
    color: '#092E20',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    svgPath:
      'M11.146 0h3.333v17.479c-.646.104-1.25.146-1.792.146-2.458 0-3.833-1.125-3.833-3.146 0-1.958 1.333-3.208 3.396-3.208.312 0 .625.021.917.083l-.021-11.354zm8.396 6.833h3.313v15.896c-.667.125-1.542.188-2.313.188-3.083 0-5.333-1.042-6.5-2.958l1.833-2.021c.854 1.25 2.125 1.875 3.75 1.875.438 0 .854-.042 1.25-.125l-.021-8.875-.312-.083v-3.896zm-14.771.021h3.333v11.833c-.646.104-1.271.167-1.813.167-2.438 0-3.833-1.125-3.833-3.146 0-1.979 1.333-3.208 3.396-3.208.313 0 .625.021.917.083V6.854z',
    level: 'Intermediate',
    tagline: 'REST Framework, ORM Optimization, Authentication',
  },
  {
    name: 'Node.js',
    category: 'frameworks',
    filterGroup: 'Web & Cloud',
    color: '#339933',
    glowColor: 'rgba(51, 153, 51, 0.4)',
    svgPath:
      'M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm0 2.3l8.4 4.8v9.7L12 21.7 3.6 16.8V7.1L12 2.3zm-1 5.3v2.7l2.2-1.3 2.2 1.3V7.6L13.2 6.3 11 7.6z',
    level: 'Intermediate',
    tagline: 'Asynchronous I/O, Express APIs, Stream Processing',
  },
  {
    name: 'Capacitor',
    category: 'frameworks',
    filterGroup: 'Web & Cloud',
    color: '#119EFF',
    glowColor: 'rgba(17, 158, 255, 0.45)',
    svgPath:
      'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.375 4.5h.75a7.125 7.125 0 0 1 7.125 7.125v.75a7.125 7.125 0 0 1-7.125 7.125h-.75A7.125 7.125 0 0 1 4.5 12.375v-.75A7.125 7.125 0 0 1 11.625 4.5z',
    level: 'Beginner..',
    tagline: 'Android Native Bridge, Offline Storage, Cross-Platform',
  },

  // --- Cloud, DB & Platforms ---
  {
    name: 'Firebase Firestore',
    category: 'cloud',
    filterGroup: 'Web & Cloud',
    color: '#FFCA28',
    glowColor: 'rgba(255, 202, 40, 0.4)',
    svgPath:
      'M3.89 15.672L6.255.461A.54.54 0 0 1 7.27.284l3.543 6.643-6.923 8.745zm15.797 2.766l-1.89-11.83a.54.54 0 0 0-.918-.283l-12.56 12.113 7.855 4.417a1.64 1.64 0 0 0 1.585 0l5.928-4.417zm-8.874-7.464L8.14 6.136a.54.54 0 0 0-.986.138L4.316 18.06l6.497-7.086z',
    level: 'Intermediate',
    tagline: 'Real-time Listeners, Row-Level Security, NoSQL Models',
  },
  {
    name: 'Netlify',
    category: 'cloud',
    filterGroup: 'Web & Cloud',
    color: '#00C7B7',
    glowColor: 'rgba(0, 199, 183, 0.4)',
    svgPath:
      'M6.49 14.12h4.86l-2.02 7.73a.47.47 0 0 0 .86.37l7.32-9.62h-4.85l2.02-7.73a.47.47 0 0 0-.86-.37L6.49 14.12z',
    level: 'Advanced',
    tagline: 'Automated CI/CD, Edge Routing, Environmental Secrets',
  },
  {
    name: 'Git',
    category: 'cloud',
    filterGroup: 'Languages & Core',
    color: '#F05032',
    glowColor: 'rgba(240, 80, 50, 0.4)',
    svgPath:
      'M23.546 10.93L13.067.452a1.5 1.5 0 0 0-2.122 0L8.7 2.7l3.327 3.327a1.78 1.78 0 0 1 2.257 2.257l3.205 3.205a1.78 1.78 0 0 1 1.956 2.915 1.78 1.78 0 0 1-2.915-1.956l-3.08-3.08v4.922a1.78 1.78 0 0 1 .593 1.34 1.78 1.78 0 0 1-3.56 0c0-.528.23-1.002.593-1.34V9.208a1.78 1.78 0 0 1-.954-.954L6.96 11.433a1.78 1.78 0 0 1 .157.72 1.78 1.78 0 0 1-3.56 0 1.78 1.78 0 0 1 1.78-1.78c.257 0 .498.057.717.157L9.23 7.353a1.78 1.78 0 0 1-.157-.72c0-.528.23-1.002.593-1.34L6.34 1.966.454 7.852a1.5 1.5 0 0 0 0 2.122l10.48 10.48a1.5 1.5 0 0 0 2.122 0l10.49-10.48a1.5 1.5 0 0 0 0-2.122z',
    level: 'Medium',
    tagline: 'Branch Strategy, Rebasing, Conflict Resolution, Hooks',
  },
  {
    name: 'GitHub',
    category: 'cloud',
    filterGroup: 'Web & Cloud',
    color: '#FFFFFF',
    glowColor: 'rgba(255, 255, 255, 0.3)',
    svgPath:
      'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z',
    level: 'Expert',
    tagline: 'GitHub Actions CI/CD, Pull Requests, Security Scans',
  },

  // --- Developer Tools & IDEs ---
  {
    name: 'VS Code',
    category: 'tools',
    filterGroup: 'Developer Tools & IDEs',
    color: '#007ACC',
    glowColor: 'rgba(0, 122, 204, 0.5)',
    // Official Visual Studio Code ribbon path
    svgPath:
      'M17.583 23.833L24 20.75V3.25L17.583.167a1.667 1.667 0 0 0-1.75.25L7.75 7.833 3.167 4.333a1.25 1.25 0 0 0-1.584 0l-1.25.917A1.25 1.25 0 0 0 0 6.25v11.5c0 .417.167.75.333 1l1.25.917a1.25 1.25 0 0 0 1.584 0l4.583-3.5 8.083 7.416a1.667 1.667 0 0 0 1.75.25zM18 5.667l4 2.083v8.5l-4 2.083V5.667zM3 7.667l3.5 2.666L3 13V7.667zm6.75 3.333l6.5-5.833v13.666l-6.5-5.833a1.333 1.333 0 0 1 0-2z',
    level: 'Primary IDE',
    tagline: 'TypeScript Ecosystem, Remote Containers, Live Debugging',
  },
  {
    name: 'PyCharm',
    category: 'tools',
    filterGroup: 'Developer Tools & IDEs',
    color: '#21D789',
    glowColor: 'rgba(33, 215, 137, 0.45)',
    // Official JetBrains PyCharm emblem path
    svgPath:
      'M0 0v24h24V0H0zm3.6 3.6h16.8v16.8H3.6V3.6zm2.4 2.4v4.8h3.6c1.32 0 2.4-1.08 2.4-2.4s-1.08-2.4-2.4-2.4H6zm2.4 2.4h1.2c.44 0 .8.36.8.8s-.36.8-.8.8H8.4V8.4zm4.8 3.6h2.4v4.8H18v-4.8h2.4v-2.4h-7.2v2.4zm-7.2 4.8h7.2v2.4H6v-2.4z',
    level: 'Python IDE',
    tagline: 'Virtualenvs, Django Debugger, Profiling & Unit Testing',
  },
  {
    name: 'Antigravity',
    category: 'tools',
    filterGroup: 'Developer Tools & IDEs',
    color: '#818CF8',
    glowColor: 'rgba(129, 140, 248, 0.55)',
    // Custom Futuristic Zero-G / Gravity-Defying Vector Badge
    svgPath:
      'M12 1L2 6v6c0 6.63 4.27 12.83 10 14.33 5.73-1.5 10-7.7 10-14.33V6L12 1zm0 3.35l7 3.5v4.15c0 4.7-2.98 9.15-7 10.37-4.02-1.22-7-5.67-7-10.37V7.85l7-3.5zm0 3.15a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 2a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z',
    level: 'Zero-G AI',
    tagline: 'Futuristic AI Agent Harness, Autonomous Engineering',
  },
  {
    name: 'Eclipse IDE',
    category: 'tools',
    filterGroup: 'Developer Tools & IDEs',
    color: '#F7941E',
    glowColor: 'rgba(247, 148, 30, 0.45)',
    // Official Eclipse IDE path
    svgPath:
      'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 17.5c-4.14 0-7.5-3.36-7.5-7.5S7.86 4.5 12 4.5c1.47 0 2.84.42 4 1.15V7.8a6.002 6.002 0 0 0-4-1.3c-3.04 0-5.5 2.46-5.5 5.5s2.46 5.5 5.5 5.5c1.55 0 2.96-.64 4-1.68v2.24c-1.16.89-2.58 1.44-4 1.44zm5-4.5h5v2h-5v-2zm0-4h5v2h-5v-2zm0-4h5v2h-5V7z',
    level: 'Core Java IDE',
    tagline: 'Enterprise Java, Maven Build Pipelines, Static Analysis',
  },
  {
    name: 'IntelliJ IDEA',
    category: 'tools',
    filterGroup: 'Developer Tools & IDEs',
    color: '#FE315D',
    glowColor: 'rgba(254, 49, 93, 0.5)',
    // Official JetBrains IntelliJ IDEA emblem path
    svgPath:
      'M0 0v24h24V0H0zm3.6 3.6h16.8v16.8H3.6V3.6zm2.4 2.4h3.6v9.6H6V6zm6 0h3.6c2.65 0 4.8 2.15 4.8 4.8s-2.15 4.8-4.8 4.8H12V6zm2.4 2.4v4.8h1.2c1.32 0 2.4-1.08 2.4-2.4s-1.08-2.4-2.4-2.4h-1.2zm-8.4 9.6h7.2v2.4H6v-2.4z',
    level: 'Enterprise IDE',
    tagline: 'Spring Framework, JVM Profiler, Refactoring Engine',
  },
];
