export function convertToTourType(response: any): TourType {
  const tour = response;
  return {
    id: tour.id.toString(),
    title: tour.title.rendered,
    summary: tour.acf.sumary,
    price: tour.acf.price,
    category: tour.acf.category.name,
    content: tour.acf.content,
    featureImage: tour.acf.featureImage,
    attractions: tour.acf.attractions
      ? tour.acf.attractions.map((attraction: any) => attraction.post_title)
      : [],
    endTime: tour.acf.endTime,
    startTime: tour.acf.startTime,
    isFavorite: tour.acf.isFavorite || false,
  };
}
