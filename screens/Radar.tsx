import React, { FC, useEffect, useState } from "react";
import { Alert, View } from "react-native";
import MapLibreGL, { MapView, Camera, UserTrackingMode, UserLocation, PointAnnotation } from '@maplibre/maplibre-react-native';
import Geolocation from '@react-native-community/geolocation';
import { Text } from "react-native-paper";

MapLibreGL.setAccessToken(null);

const stylesUrl = 'https://raw.githubusercontent.com/RojasCristianE/DragonRadar/main/style.json'

type Location = {
    accuracy: number;
    altitude: number;
    heading: number;
    latitude: number;
    longitude: number;
    speed: number;
}

const locations = [
    [-86.276300, 12.123592],
    [-86.268994, 12.134623],
    [-86.274447, 12.155949],
    [-86.286633, 12.145089],
    [-86.295352, 12.128051],
    [-86.282400, 12.165687],
    [-86.225057, 12.134205]
]

export default () => {
    const [location, setLocation] = useState<Location | null>(null);

    useEffect(() => {
        Geolocation.getCurrentPosition(
            ({ coords }: { coords: Location }) => setLocation(coords),
            (err: any) => Alert.alert('getCurrentPosition Error', JSON.stringify(err)),
            { enableHighAccuracy: true }
        );

        const watchId = Geolocation.watchPosition(
            ({ coords }: { coords: Location }) => setLocation(coords),
            (err: any) => Alert.alert('GetCurrentPosition Error', JSON.stringify(err)),
            { interval: 5000, enableHighAccuracy: true, useSignificantChanges: true }
        );

        return () => Geolocation.clearWatch(watchId);
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {
                location != null ?
                    <MapView
                        style={{ width: "100%", height: "100%" }}
                        styleURL={stylesUrl}
                        attributionEnabled={false}
                        compassEnabled={false}
                    >
                        <Camera
                            zoomLevel={11}
                            centerCoordinate={[location.longitude, location.latitude]}
                            followUserLocation={true}
                            followUserMode={UserTrackingMode.FollowWithHeading}
                        />
                        <UserLocation
                            renderMode='native'
                            androidRenderMode="compass"
                            visible={true}
                            animated={true}
                        />
                        {
                            locations.map((location, index) => (
                                <PointAnnotation
                                    key={`dragon-ball-${index}`}
                                    id={`dragon-ball-${index}`}
                                    coordinate={location}
                                >
                                    <View>
                                        <Text>🟡</Text>
                                    </View>
                                </PointAnnotation>
                            ))
                        }
                    </MapView> :
                    <Text>Cargando...</Text>
            }
        </View>
    )
};