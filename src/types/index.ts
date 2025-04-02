/**
 * Represents a project in the portfolio
 */
export interface Project {
  /** Unique identifier for the project */
  id: number;
  /** Project title */
  title: string;
  /** Short description for project cards */
  description: string;
  /** Detailed description for the modal view */
  longDescription: string;
  /** Path to the project image */
  image: string;
  /** List of technologies used in the project */
  technologies: string[];
  /** Optional link to live demo */
  demoLink?: string;
  /** Optional link to GitHub repository */
  githubLink?: string;
}

/**
 * Represents a career entry in the timeline
 */
export interface CareerEntry {
  /** Job title or role */
  title: string;
  /** Company or organization name */
  organization: string;
  /** Location of the position */
  location: string;
  /** Start date in YYYY-MM format */
  startDate: string;
  /** End date in YYYY-MM format or "Present" */
  endDate: string;
  /** Emoji icon representing the role */
  icon: string;
  /** Detailed description of responsibilities and achievements */
  description: string;
  /** Type of experience (e.g., Professional, Internship, etc.) */
  type: CareerEntryType;
}

/**
 * Valid types of career entries
 */
export type CareerEntryType = 
  | 'Professional'
  | 'Internship'
  | 'Leadership'
  | 'Ambassadorship'
  | 'Volunteer';

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  /** Response data */
  data?: T;
  /** Error message if request failed */
  error?: string;
}

/**
 * Projects API response type
 */
export type ProjectsResponse = ApiResponse<{
  projects: Project[];
}>;

/**
 * Career API response type
 */
export type CareerResponse = ApiResponse<CareerEntry[]>;

/**
 * Background pattern variants available
 */
export type PatternVariant = 'dots' | 'grid' | 'waves';