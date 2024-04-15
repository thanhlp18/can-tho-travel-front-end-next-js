type BlogPostType = {
  id: string;
  title: string;
  content: string;
  featureImage: string;
  tags: BlogTagType;
  author: string;
  publishDate: string;
  attractions: string[];
  tours: string[];
};

type BlogTagType = string[];
