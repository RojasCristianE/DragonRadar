import React, { FC, useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import Sound from 'react-native-sound';
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
    const lineCount = 50;
    const spacing = 20;

    useEffect(() => {
        const sound = new Sound('podcast.ogg', Sound.MAIN_BUNDLE, (error: any) => {
            if (error) {
                console.error('Error al cargar el sonido', error);
            }
        });
        console.log(Sound.MAIN_BUNDLE)
        // console.log('duration in seconds: ' + sound.getDuration() + ' number of channels: ' + sound.getNumberOfChannels());
        
        sound.play(console.log);

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

        return () => {
            Geolocation.clearWatch(watchId);
            sound.release();
        };
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {
                location != null ?
                    <>
                        <MapView
                            style={{ width: "100%", height: "100%" }}
                            styleURL={stylesUrl}
                            attributionEnabled={false}
                            compassEnabled={false}
                        >
                            {/* Modifica el componente para que muestre todos los elementos geoetiquetados */}
                            
                            <Camera
                                zoomLevel={0}
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
                        </MapView>
                        <View style={styles.horizontalGridContainer}>
                            {
                                [
                                    ...Array(lineCount).keys()
                                ].map(
                                    index => (
                                        <View
                                            key={`horizontal-${index}`}
                                            style={[styles.gridLine, { marginTop: index !== 0 ? spacing : 0 }]}
                                        />
                                    )
                                )
                            }
                        </View>
                        <View style={styles.verticalGridContainer}>
                            {
                                [
                                    ...Array(lineCount).keys()
                                ].map(
                                    index => (
                                        <View
                                            key={`vertical-${index}`}
                                            style={[styles.verticalGridLine, { marginLeft: index !== 0 ? spacing : 0 }]}
                                        />
                                    )
                                )
                            }
                        </View>
                    </>
                    :
                    <Text>Cargando...</Text>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    radarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        position: 'relative'
    },
    greenBackground: {
        position: 'absolute',
        backgroundColor: 'transparent',
        height: '100%',
        width: '100%'
    },
    horizontalGridContainer: {
        position: 'absolute',
        width: '100%',
        backgroundColor: 'transparent'
    },
    gridLine: {
        height: 1,
        width: '100%',
        backgroundColor: '#D9D9D9',
    },
    verticalGridContainer: {
        flexDirection: 'row',
        position: 'absolute',
        height: '100%',
        backgroundColor: 'transparent'
    },
    verticalGridLine: {
        width: 1,
        height: '100%',
        backgroundColor: '#D9D9D9',
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 50,
        borderRightWidth: 50,
        borderBottomWidth: 100,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "red",
        position: 'absolute',
        transform: [{ scale: 0.25 }]
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
});
