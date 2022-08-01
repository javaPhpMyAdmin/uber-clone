import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import tailwind from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import { selectDestination, selectOrigin, setTravelTimeInformation } from "../Slices/navSlice";
import { GOOGLE_MAPS_APIKEY, GOOGLE_MAPS_DIRECTIONS } from "@env";
import { decode } from "@googlemaps/polyline-codec";

const mapDirectionsURL =
  "https://maps.googleapis.com/maps/api/directions/json?";

export const MyMap = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const [coords, setCoords] = useState([]);
  const dispatch = useDispatch()

  const getDirections = async (ori, dest) => {
    try {
      let resp = await fetch(
        `${mapDirectionsURL}origin=${ori.location.lat},${ori.location.lng}&destination=${dest?.location.lat},${dest?.location.lng}&key=${GOOGLE_MAPS_DIRECTIONS}`
      );

      let respJson = await resp.json();
      let points = decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1],
        };
      });
      setCoords(coords);
    } catch (error) {
      console.log("ERROOOOOOOOR", error);
    }
  };

  useEffect(() => {
    if (!origin || !destination) return;
    getDirections(origin, destination);
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;

    const getTimeTravel = async () => {
      try {
        /* const travelTime = await fetch('https://maps.googleapis.com/maps/api/distancematrix/json?destinations=-34.7071849,-56.2157287&origins=-34.6488719,-56.0668126&key=AIzaSyCbHAKvVJjpmPy6jdgSdw92DcP6UfT5XJk')*/
        const travelTime = await fetch(
          `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination.location.lat},${destination.location.lng}&origins=${origin.location.lat},${origin.location.lng}&units=imperial&key=${GOOGLE_MAPS_DIRECTIONS}`
        );
        const timeTravel = await travelTime.json();
        dispatch(setTravelTimeInformation(timeTravel.rows[0].elements[0]))
      } catch (error) {
        console.log(error);
      }
    };

    getTimeTravel();
  }, [origin, destination, GOOGLE_MAPS_DIRECTIONS]);

  return (
    <>
      <MapView
        ref={mapRef}
        style={tailwind`flex-1`}
        mapType="mutedStandard"
        initialRegion={{
          latitude: origin.location.lat,
          longitude: origin.location.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {origin && destination && (
          <Polyline
            coordinates={coords}
            apikey={GOOGLE_MAPS_APIKEY} // insert your API Key here
            strokeWidth={4}
            strokeColor="#111111"
          />
        )}

        {origin?.location && (
          <Marker
            coordinate={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            }}
            title="Origin"
            description={origin.description}
            identifier="origin"
          />
        )}
        {destination?.location && (
          <Marker
            coordinate={{
              latitude: destination.location.lat,
              longitude: destination.location.lng,
            }}
            title="Destination"
            description={destination.description}
            identifier="destination"
          />
        )}
      </MapView>
    </>
  );
};
