import { View } from "react-native";
import MapLibreGL from '@maplibre/maplibre-react-native';

MapLibreGL.setAccessToken(null);

const stylesUrl = `http://192.168.1.127:8000/style.json`

export default () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <MapLibreGL.MapView
            style={{ width: "100%", height: "100%" }}
            styleURL={stylesUrl}
        />
    </View>
);