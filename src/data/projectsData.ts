export interface PipelineNode {
  step: string;
  title: string;
  tech: string;
  description: string;
}

export interface Metric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  overview: string;
  metrics: Metric[];
  pipeline: PipelineNode[];
  architectureNotes: string[];
  challenges: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: 'attendflow',
    title: 'AttendFlow',
    subtitle: 'Mobile & Web Attendance Tracking Platform',
    category: 'Mobile / Full-Stack',
    featured: true,
    tags: ['React 18', 'Capacitor', 'Firebase Auth', 'Firestore', 'Tailwind CSS', 'QR Engine'],
    overview:
      'Cross-platform attendance tracking ecosystem engineered for collegiate departments and students. Decouples client-side QR generation and scanning from localized SQLite state while orchestrating seamless synchronization with Google Cloud Firestore.',
    metrics: [
      { label: 'Sync Latency', value: '< 120ms' },
      { label: 'Storage Footprint', value: '8.4 MB' },
      { label: 'Recalculation Speed', value: 'O(1) amortized' },
    ],
    pipeline: [
      {
        step: '01',
        title: 'Native Device Hardware Bridge',
        tech: 'Capacitor Core + Barcode Scanner Plugin',
        description:
          'Accesses native camera sensor with hardware acceleration, decoding timetable payload matrices at 60 FPS.',
      },
      {
        step: '02',
        title: 'Cryptographic QR Verification',
        tech: 'HMAC Timetable Signatures',
        description:
          'Validates encoded session metadata, timestamp windows, and classroom geo-proximity to prevent proxy attendance.',
      },
      {
        step: '03',
        title: 'Row-Level Security & Auth',
        tech: 'Firebase Auth & Cloud Rules',
        description:
          'Restricts write transactions to authenticated session IDs with strict role-based access control (Student vs Professor).',
      },
      {
        step: '04',
        title: 'Real-time State & Cache Reconciliation',
        tech: 'Cloud Firestore + Local IndexedDB',
        description:
          'Instant reactive updates to aggregate attendance percentages, predictive absence limits, and retroactive adjustment trees.',
      },
    ],
    architectureNotes: [
      'Engineered offline-first architecture allowing students to mark attendance even in basement lecture halls with zero cellular connectivity.',
      'Designed a binary matrix timetable encoder compressing 40 lecture slots into a compact 128-byte base64 QR payload.',
      'Implemented atomic Firestore batch transactions to prevent duplicate attendance increments during concurrent bursts.',
    ],
    challenges: [
      'Race conditions during class dismissals: Solved using Firestore transactional atomic increments with idempotent ledger IDs.',
      'Capacitor Android back-button trapping: Handled using custom hardware event listener hooks within React lifecycle.',
    ],
    githubUrl: 'https://github.com/Basavaraj-SK/AttendFlow',
    liveUrl: 'https://attendence-trac.netlify.app/',
  },
  {
    id: 'cloud-kitchen',
    title: 'Cloud Kitchen & Storefront Suite',
    subtitle: 'Decoupled Operational Ordering & Live Prep Engine',
    category: 'Full-Stack Distributed System',
    featured: false,
    tags: ['React 18', 'Cloud Firestore', 'Tailwind CSS', 'State Machines', 'WebSockets'],
    overview:
      'High-throughput culinary management suite separating public digital ordering storefronts from real-time line cook display systems (KDS). Features deterministic status lifecycles, batch item routing, and automatic inventory depletion triggers.',
    metrics: [
      { label: 'Throughput', value: '450+ orders/hr' },
      { label: 'Realtime Latency', value: '45ms' },
      { label: 'Order Error Rate', value: '< 0.01%' },
    ],
    pipeline: [
      {
        step: '01',
        title: 'Storefront Cart & Customization',
        tech: 'React Client + Optimistic UI State',
        description:
          'Instant item customization, allergen filtering, and dynamic order pricing calculations with zero server round-trips.',
      },
      {
        step: '02',
        title: 'Order Queuing & Atomic Dispatch',
        tech: 'Firestore Document Collections',
        description:
          'Orders assigned unique sequential ticket IDs and written to live Firestore collections with status: QUEUED.',
      },
      {
        step: '03',
        title: 'KDS Station Routing & Batching',
        tech: 'Firestore Real-time Snapshot Observers',
        description:
          'Kitchen dashboard automatically shards tickets into station queues (Grill, Prep, Fryer, Assembly).',
      },
      {
        step: '04',
        title: 'Status Progression & Dispatch Audio',
        tech: 'Web Audio API + Push Notifications',
        description:
          'Line cooks mark stages (PREPPING -> PLATED -> DISPATCHED) triggering auditory alerts and live customer status sync.',
      },
    ],
    architectureNotes: [
      'Decoupled storefront and KDS architecture ensures kitchen operators never suffer latency degradation during high-traffic order spikes.',
      'Reactive snapshot listeners eliminate costly HTTP polling, conserving network bandwidth and reducing cloud compute costs.',
      'Finite state machine enforcement ensures an order cannot skip operational stages without kitchen supervisor sign-off.',
    ],
    challenges: [
      'Auditory alert fatigue: Implemented custom synthesized Web Audio chimes with variable harmonic scales based on queue urgency.',
      'Network blips during rush hours: Designed optimistic local cache reconciliation with auto-retry exponential backoff.',
    ],
    githubUrl: 'https://github.com/Basavaraj-SK',
    liveUrl: 'https://sudhaskitchen2.netlify.app/',
  },
  {
    id: 'rag-assistant',
    title: 'RAG Knowledge Assistant',
    subtitle: 'Context-Grounded Academic Retrieval & Vector Search',
    category: 'AI / Retrieval Systems',
    featured: false,
    tags: ['Python', 'LangChain', 'ChromaDB', 'Vector Embeddings', 'FastAPI', 'React'],
    overview:
      'Autonomous retrieval-augmented generation engine engineered to ingest syllabi, engineering lecture slides, and academic textbooks. Transforms unstructured documents into dense semantic vector spaces for hallucination-free querying.',
    metrics: [
      { label: 'Query Latency', value: '380ms' },
      { label: 'Context Recall', value: '94.2%' },
      { label: 'Hallucination Rate', value: '< 1.8%' },
    ],
    pipeline: [
      {
        step: '01',
        title: 'Document Ingestion & Chunking',
        tech: 'LangChain RecursiveTextSplitter',
        description:
          'Parses PDFs, Markdown, and TXT files into semantic chunks of 500 tokens with 50-token contextual overlaps.',
      },
      {
        step: '02',
        title: 'Dense Vector Embedding Generation',
        tech: 'HuggingFace all-MiniLM-L6-v2',
        description:
          'Generates 384-dimensional dense semantic vectors capturing academic concepts, definitions, and equations.',
      },
      {
        step: '03',
        title: 'Nearest Neighbor Vector Indexing',
        tech: 'ChromaDB HNSW Index',
        description:
          'Hierarchical Navigable Small World graphs execute approximate nearest neighbor queries in sub-20ms.',
      },
      {
        step: '04',
        title: 'Contextual Reranking & Synthesis',
        tech: 'Prompt Engineering + LLM Synthesis',
        description:
          'Injects top-k retrieved source snippets into strict grounded prompts, rendering cited source excerpts.',
      },
    ],
    architectureNotes: [
      'Strict grounding prompts prevent generative hallucinations by instructing the model to return "Insufficient context" if sources do not verify the claim.',
      'Chunking strategy preserves programmatic code snippets and markdown tables intact during vectorization.',
      'Localized vector store operation allows complete offline operation without sending sensitive student data over external APIs.',
    ],
    challenges: [
      'Context boundary degradation: Solved by adopting sliding window chunking with semantic heading preservation.',
      'Large PDF processing bottlenecks: Implemented asynchronous background worker threads to parse documents non-blockingly.',
    ],
    githubUrl: 'https://github.com/Basavaraj-SK/rag-academic-assistant',
    liveUrl: 'https://rag-assistant-demo.web.app',
  },
];

export const projectsData = PROJECTS;
