import { convertDateFormat } from "./convertDateFormat";

export function convertToBlogPostType(data: any): BlogPostType {
  const { id, title, date, acf, author } = data;

  const blogPost = {
    id: id.toString(),
    title: title.rendered,
    content: acf.content,
    featureImage: acf.featureImage || "",
    tags: acf.tags ? acf.tags.map((tag: any) => `${tag.slug}`) : ["notag"],
    author: author.toString(),
    publishDate: convertDateFormat(date.toString()), // You might want to add a publish date field in your data if available
    attractions: acf.attraction
      ? acf.attraction.map((attraction: any) => attraction.post_title)
      : [],
    tours: acf.tours ? acf.tours.map((tour: any) => tour.post_title) : [],
  };

  return blogPost;
}
