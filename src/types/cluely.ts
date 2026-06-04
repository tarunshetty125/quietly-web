export interface FaqItem {
  question: string;
  answer: string;
}

export interface FooterColumn {
  title: string;
  links: Array<{
    label: string;
    href: string;
    badge?: string;
  }>;
}

export interface CompatibilityTool {
  name: string;
  icon: string;
}

export interface UndetectabilityPerson {
  name: string;
  email: string;
  role: string;
  image: string;
  isCurrentUser?: boolean;
}
