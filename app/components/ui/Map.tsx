"use client";
import { AuthenticationType, data } from "azure-maps-control";
import { useEffect, useMemo, useState } from "react";
import {
  AzureMap,
  AzureMapDataSourceProvider,
  AzureMapFeature,
  AzureMapLayerProvider,
  AzureMapPopup,
  AzureMapsProvider,
  IAzureMapOptions,
} from "react-azure-maps";
import { key } from "./key";

const renderPoint = (data: AttractionType) => {
  return (
    <AzureMapFeature
      id={data.id}
      type="Point"
      coordinate={[data.location.lng, data.location.lat]}
      properties={{
        id: data.name,
        popUpProp: data,
      }}
    />
  );
};

const MapComponent = ({ attraction }: { attraction: AttractionType }) => {
  const [popupOptions, setPopupOptions] = useState({});
  const [isClient, setIsClient] = useState<boolean>(false);

  const [popupProperties, setPopupProperties] = useState<any>({});
  useEffect(() => {
    setIsClient(true);
  }, []);

  const option: IAzureMapOptions = useMemo(() => {
    return {
      authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: key,
      },
      center: [attraction.location.lng, attraction.location.lat], // Default center 10.031413, 105.768708
      zoom: 16.5, // Default zoom level
    };
  }, []);

  const memoizedMarkerRender = useMemo(() => renderPoint(attraction), []);
  if (!isClient) {
    return null; // Render nothing on the server
  }
  return (
    <AzureMapsProvider>
      <div style={{ height: "600px" }}>
        <AzureMap options={option}>
          <AzureMapDataSourceProvider
            id={"MultiplePoint AzureMapDataSourceProvider"}
          >
            <AzureMapLayerProvider
              id={"MultiplePoint AzureMapLayerProvider"}
              options={{
                iconOptions: {
                  image: "pin-red",
                },
              }}
              events={{
                mousemove: (e: any) => {
                  if (e.shapes && e.shapes.length > 0) {
                    const prop = e.shapes[0];
                    console.log(prop);

                    // Set popup options
                    setPopupOptions({
                      ...popupOptions,
                      position: new data.Position(
                        prop.data.geometry.coordinates[0],
                        prop.data.geometry.coordinates[1]
                      ),
                      pixelOffset: [0, -18],
                    });

                    if (prop.data.properties)
                      // Set popup properties from Feature Properties that are declared on create Feature
                      setPopupProperties({
                        ...prop.data.properties.popUpProp,
                      });
                  }
                },
              }}
              type="SymbolLayer"
            />
            {memoizedMarkerRender}
          </AzureMapDataSourceProvider>
          <AzureMapPopup
            isVisible={true}
            options={popupOptions}
            popupContent={
              <div style={{ padding: "8px 16px" }}>
                <h3>{popupProperties.licensePlate}</h3>
                <p>{popupProperties.model}</p>
              </div> // Inject your JSX
            }
          />
        </AzureMap>
      </div>
    </AzureMapsProvider>
  );
};

export default MapComponent;
