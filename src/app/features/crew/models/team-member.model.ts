export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: string;
  imageSrc: string;
  imageAlt: string;
  paragraphs: readonly string[];
}
