"use client";
// import envConfig from "@/config/envConfig";
// import { TGetListing } from "@/types";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef } from "react";
import { TLocation } from "./Map";

const GoogleMaps = ({
  locationMarkers,
  mapClassName,
  mapZoom,
}: {
  locationMarkers: TLocation[];
  mapClassName: string;
  mapZoom: number;
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  console.log("Google Maps component locationMarker", locationMarkers);

  useEffect(() => {
    console.log("Google Maps component mounted");

    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
        version: "quarterly",
        libraries: ["places"],
      });

      const { Map } = await loader.importLibrary("maps");

      // Default UK center
      const defaultLocation = { lat: 54.8, lng: -4.6 };

      const center =
        locationMarkers.length === 1
          ? {
              lat: locationMarkers[0]?.lat ?? defaultLocation.lat,
              lng: locationMarkers[0]?.lng ?? defaultLocation.lng,
            }
          : defaultLocation;

      const options: google.maps.MapOptions = {
        center: center,
        zoom: mapZoom,
        mapId: "map",
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      };

      const map = new Map(mapRef.current as HTMLDivElement, options);

      // re-center in case it shifts
      google.maps.event.addListenerOnce(map, "idle", () => {
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
      });

      const { AdvancedMarkerElement } = (await loader.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;

      // Add all markers to the map
      locationMarkers.forEach((marker) => {
        if (marker.lat && marker.lng) {
          new AdvancedMarkerElement({
            position: { lat: marker.lat, lng: marker.lng },
            map,
            title: `Hotel ${marker.address} ${marker.lat}, ${marker.lng}`,
          });
        }
      });
    };

    initMap()
      .then(() => {
        console.log("Google Maps loaded successfully");
      })
      .catch((error) => {
        console.error("Error loading Google Maps:", error);
      });
  }, [locationMarkers, mapZoom]);

  return (
    <>
      <div ref={mapRef} className={mapClassName} />
    </>
  );
};

export default GoogleMaps;
