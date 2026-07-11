import { CaseStudy } from '../types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "clinical-trial",
    num: "01",
    title: "Clinical Trial AI Platform",
    industry: "Healthcare • Pharmaceutical",
    challenge: "Clinical trials were delayed due to manual patient screening, protocol compliance issues, and slow safety monitoring.",
    solution: "Built a collaborative multi-agent AI platform that automated patient eligibility, protocol compliance, and real-time safety monitoring.",
    impact: [
      { stat: "40%", label: "Faster Recruitment", desc: "Accelerated patient screening and eligibility checks" },
      { stat: "58%", label: "Less Deviations", desc: "Fewer protocol non-compliance events" },
      { stat: "$200M+", label: "Losses Avoided", desc: "Estimated regulatory and delay expenses saved" }
    ],
    duration: "6 Months",
    architecture: [
      "Patient matching pipeline: Semantic analysis of EHR records against eligibility criteria",
      "Multi-agent compliance checker: Active screening of trial protocols in real-time",
      "Real-time safety telemetry agent: Monitoring adverse event reports for instant flags"
    ],
    tech: ["Gemini Pro", "Claude 3.5 Sonnet", "LangGraph", "Python", "Vector DB"]
  },
  {
    id: "enterprise-knowledge",
    num: "02",
    title: "Enterprise Knowledge AI",
    industry: "Legal • Compliance • Enterprise",
    challenge: "Employees struggled to search thousands of policies, contracts, and compliance documents.",
    solution: "Developed an enterprise Retrieval-Augmented Generation (RAG) platform with governed AI responses and complete audit trails.",
    impact: [
      { stat: "60%", label: "Research Savings", desc: "Reduction in document search and analysis time" },
      { stat: "100%", label: "Auditable Logs", desc: "Enterprise-grade complete audit trails for every query" },
      { stat: "Active", label: "Knowledge Assistant", desc: "Trusted internal conversational intelligence agent" }
    ],
    duration: "4 Months",
    architecture: [
      "Hierarchical Vector Chunking: Multi-tiered parsing of complex document hierarchies",
      "Hybrid Retrieval: Combined dense semantic search with sparse keyword indexing",
      "Strict Compliance Guardrails: Active validation to prevent hallucinations and leaks"
    ],
    tech: ["OpenAI GPT-4", "Pinecone", "LlamaIndex", "React", "Node.js", "AWS"]
  },
  {
    id: "supply-chain",
    num: "03",
    title: "Supply Chain AI Orchestrator",
    industry: "Logistics",
    challenge: "Disconnected planning systems caused inventory issues, delayed procurement, and inefficient routing.",
    solution: "Designed a multi-agent AI platform coordinating inventory, procurement, and routing decisions.",
    impact: [
      { stat: "20%", label: "Lower Logistics Costs", desc: "Optimized route planning and fuel consumption" },
      { stat: "15%", label: "Lower Inventory Costs", desc: "Dynamic restock triggers and demand predictions" },
      { stat: "Instant", label: "Disruption Response", desc: "Automatic rescheduling in response to weather/delay alerts" }
    ],
    duration: "4 Months",
    architecture: [
      "Multi-Agent Coordinator: Independent agents for warehouse, fleet, and procurement",
      "Time-Series Forecaster: Predictive models mapping seasonality and global trends",
      "Genetic Route Optimizer: Dynamically recalculated navigation grids based on live feeds"
    ],
    tech: ["Python", "FastStream", "Redis", "PostgreSQL", "Gemini Flash"]
  },
  {
    id: "workflow-automation",
    num: "04",
    title: "AI Workflow Automation",
    industry: "Business Operations",
    challenge: "Manual workflows across CRM, onboarding, reporting, and SaaS tools slowed business operations.",
    solution: "Built an intelligent automation platform using n8n and Large Language Models with self-healing workflows.",
    impact: [
      { stat: "50%", label: "Less Manual Work", desc: "Complete automation of back-office administrative tasks" },
      { stat: "Auto", label: "Intelligent Recovery", desc: "Self-healing workflows that fix dynamic API schema changes" },
      { stat: "Scale", label: "Business Engine", desc: "Seamless scaling of operations without adding headcount" }
    ],
    duration: "2.5 Months",
    architecture: [
      "Webhook-Triggered Orchestration: Zero-latency system integrations across services",
      "LLM Exception Classifier: Intelligent sorting of processing failures to retry",
      "Self-Healing State Machine: Automated fallback and payload correction routines"
    ],
    tech: ["n8n", "LangChain", "Make.com", "HubSpot", "Stripe", "OpenAI"]
  },
  {
    id: "product-intelligence",
    num: "05",
    title: "AI Product Classification",
    industry: "E-Commerce",
    challenge: "Thousands of products were manually categorized with inconsistent metadata.",
    solution: "Developed an NLP pipeline using BERT and custom entity extraction for automated product classification.",
    impact: [
      { stat: "30%", label: "Higher Accuracy", desc: "Precision improvements in search and product categorization" },
      { stat: "10,000+", label: "SKUs Daily", desc: "Automated processing of inventory additions" },
      { stat: "200h+", label: "Saved Monthly", desc: "Reclaimed hours spent on manual classification" }
    ],
    duration: "3 Months",
    architecture: [
      "Text Preparation Pipeline: Advanced tokenization, normalization, and language detection",
      "Fine-Tuned BERT Classifier: Core deep learning model optimized for retail taxonomies",
      "Custom NER Engine: Extraction of brand, sizing, color, and key attributes from text"
    ],
    tech: ["PyTorch", "HuggingFace", "FastAPI", "Docker", "PostgreSQL"]
  },
  {
    id: "security-assistant",
    num: "06",
    title: "AI Security Assistant",
    industry: "Cyber Security",
    challenge: "Security teams struggled with alert fatigue and slow incident analysis.",
    solution: "Created an AI-powered incident triage assistant that correlated SIEM alerts using LLMs and retrieval.",
    impact: [
      { stat: "Faster", label: "Incident Response", desc: "Rapid isolation and forensic query correlation" },
      { stat: "Reduced", label: "False Positives", desc: "Intelligent filtering of benign network noise" },
      { stat: "Enhanced", label: "Productivity", desc: "Gives security analysts instantaneous context summaries" }
    ],
    duration: "3 Months",
    architecture: [
      "Alert Correlation Router: Groups telemetry signals into unified timelines",
      "Retrieval-Augmented SIEM Query Engine: Automatic indexing of threat databases",
      "Dynamic Forensic Summarizer: Instant markdown threat analysis briefings"
    ],
    tech: ["Llama-3", "LangChain", "Qdrant", "Elasticsearch", "FastAPI"]
  }
];

export const SERVICES: string[] = [
  "AI Receptionist",
  "Voice AI",
  "Lead Qualification",
  "CRM Automation",
  "Customer Support",
  "WhatsApp AI",
  "Marketing Automation",
  "Workflow Automation",
  "Custom AI System",
  "Other"
];

export const PAGE_ORDER: string[] = ['home', 'solutions', 'industries', 'how-it-works', 'case-studies'];
