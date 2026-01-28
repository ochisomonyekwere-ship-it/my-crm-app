
export enum AppStep {
  STEP_1 = 1,
  STEP_2 = 2,
  STEP_3 = 3,
  STEP_4 = 4,
  STEP_5 = 5
}

export interface Notification {
  id: string;
  sender: string;
  avatar: string;
  channel: string;
  title: string;
  snippet: string;
  time: string;
  tag?: string;
  type: 'urgent' | 'important' | 'updates' | 'default';
}
