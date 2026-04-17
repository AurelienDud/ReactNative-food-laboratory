
export interface Project {
  id: number;
  title: string;
  description?: string;
  created_at: string;
}

export interface ProjectStep {
  id: number;
  title: string;
  description?: string;
  occurred_at: string;
}