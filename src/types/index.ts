export interface CaseStudyImpact {
  stat: string;
  label: string;
  desc: string;
}

export interface CaseStudy {
  id: string;
  num: string;
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  impact: CaseStudyImpact[];
  duration: string;
  architecture: string[];
  tech: string[];
}

export type ActivePageType = 'home' | 'solutions' | 'industries' | 'how-it-works' | 'case-studies';
