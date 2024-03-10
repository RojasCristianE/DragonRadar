import { AppRegistry } from 'react-native';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import App from './App';
import { name as appName } from './app.json';

const Main = () => (
    <PaperProvider theme={MD3LightTheme}>
        <App />
    </PaperProvider>
);

AppRegistry.registerComponent(appName, () => Main);