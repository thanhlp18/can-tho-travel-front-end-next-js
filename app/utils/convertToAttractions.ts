export function convertToAttractions(originalData: any): AttractionType {
  const locationCoords = originalData.acf["latitude_&_longitude"]
    .split(",")
    .map(parseFloat);
  return {
    id: originalData.id,
    name: originalData.title.rendered,
    address: originalData.acf.address,
    image: originalData.acf.image,
    location: {
      lat: locationCoords[0],
      lng: locationCoords[1],
    },
  };
}
