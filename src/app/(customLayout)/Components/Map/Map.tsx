import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import GoogleMaps from "./GoogleMaps";

export type TLocation = {
  lat: number;
  lng: number;
  address: string;
};

const Map = () => {
  const londonLocations: TLocation[] = [
    { lat: 51.5079, lng: -0.0877, address: "London Bridge, London, UK" },
    { lat: 51.5145, lng: -0.0754, address: "Tower of London, London, UK" },
    { lat: 51.5007, lng: -0.1246, address: "Westminster, London, UK" },
    { lat: 51.5155, lng: -0.141, address: "Oxford Street, London, UK" },
    { lat: 51.5033, lng: -0.1195, address: "London Eye, London, UK" },
    { lat: 51.4975, lng: -0.1357, address: "Buckingham Palace, London, UK" },
    { lat: 51.521, lng: -0.1558, address: "Regent's Park, London, UK" },
    { lat: 51.5306, lng: -0.123, address: "Euston Station, London, UK" },
    { lat: 51.5281, lng: -0.1018, address: "King's Cross, London, UK" },
    { lat: 51.4908, lng: -0.1647, address: "Chelsea, London, UK" },
    { lat: 51.5416, lng: -0.142, address: "Camden Town, London, UK" },
    { lat: 51.4624, lng: -0.1142, address: "Brixton, London, UK" },
    { lat: 51.475, lng: -0.056, address: "Greenwich, London, UK" },
    { lat: 51.5363, lng: -0.103, address: "Islington, London, UK" },
    { lat: 51.4696, lng: -0.167, address: "Battersea, London, UK" },
    { lat: 55.9533, lng: -3.1883, address: "Royal Mile, Edinburgh, UK" },
    { lat: 52.4862, lng: -1.8904, address: "Victoria Square, Birmingham, UK" },
    { lat: 53.4084, lng: -2.9916, address: "Albert Dock, Liverpool, UK" },
    { lat: 51.4545, lng: -2.5879, address: "Cabot Circus, Bristol, UK" },
    { lat: 57.1497, lng: -2.0943, address: "Union Street, Aberdeen, UK" },
    { lat: 51.752, lng: -1.2577, address: "High Street, Oxford, UK" },
    { lat: 52.2053, lng: 0.1218, address: "King's Parade, Cambridge, UK" },
    { lat: 51.4816, lng: -3.1791, address: "Cardiff Castle, Cardiff, UK" },
    { lat: 54.9784, lng: -1.6174, address: "Grey Street, Newcastle, UK" },
    {
      lat: 54.5973,
      lng: -5.9301,
      address: "City Centre, Belfast, Northern Ireland",
    },
    {
      lat: 50.7192,
      lng: -1.8808,
      address: "Bournemouth Pier, Bournemouth, UK",
    },
    {
      lat: 51.9038,
      lng: -0.2026,
      address: "St Albans Cathedral, St Albans, UK",
    },
    { lat: 51.4541, lng: -0.9781, address: "Reading Station, Reading, UK" },
  ];

  return (
    <div>
      <Dialog>
        <DialogTrigger className="px-4 py-2 rounded-lg bg-gray-400">
          Show on map
        </DialogTrigger>
        <DialogContent className="min-w-screen min-h-screen">
          <DialogHeader>
            <DialogTitle>Map</DialogTitle>
            <DialogDescription>
              <GoogleMaps
                locationMarkers={londonLocations}
                mapClassName="w-[95vw] h-[90vh]"
                mapZoom={5}
              />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Map;
