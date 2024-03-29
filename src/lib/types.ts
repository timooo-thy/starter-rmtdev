export type JobItem = {
  badgeLetters: string;
  company: string;
  daysAgo: number;
  id: number;
  relevanceScore: number;
  title: string;
};

export type JobDetails = {
  description: string;
  qualifications: string[];
  reviews: string[];
  duration: string;
  location: string;
  coverImgURL: string;
  companyURL: string;
  salary: string;
} & JobItem;

export type SortBy = "recent" | "relevant";
