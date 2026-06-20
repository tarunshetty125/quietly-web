export interface QuickAction {
  id: string;
  label: string;
  icon: string;
}

export interface ModeData {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  quickActions: QuickAction[];
  noteTemplate: string[];
}

export interface SmartActionState {
  id: string;
  modeName: string;
  modeColor: string;
  transcript: string;
  actions: QuickAction[];
  recommendedId: string;
}

export interface CompetitorRow {
  feature: string;
  quietly: string | boolean;
  cluely: string | boolean;
  finalRound: string | boolean;
  lockedIn: string | boolean;
}

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export interface PlatformCard {
  kicker: string;
  headline: string;
  description: string;
  items: string[];
}
