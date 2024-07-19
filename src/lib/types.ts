export type JobItem = {
  id: string;
  badgeLetters: string;
  title: string;
  company: string;
  date: string;
  relevanceScore: number;
  daysAgo: number;
};

export type JobItemContentProps = JobItem & {
    description: string;
    qualifications: string[];
    reviews: string[];
    duration: string;
    salary: string;
    coverImgURL: string;
    companyUrl: string;
    location: string;
};
