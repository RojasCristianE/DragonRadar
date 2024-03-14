import { View, TouchableOpacity } from "react-native";
import { Divider, Icon } from "react-native-paper";
import Sound from "react-native-sound";

type Props = {
    zoomIn: () => void;
    zoomOut: () => void;
};

Sound.setCategory('Playback');

const audio = new Sound(
    'https://raw.githubusercontent.com/RojasCristianE/DragonRadar/main/start.mp3',
    '',
    error => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
        console.log('Duración en segundos: ' + audio.getDuration() + ', número de canales: ' + audio.getNumberOfChannels());
    }
)

export default ({ zoomIn, zoomOut }: Props) => {
    const playSound = () => {
        if (audio.isPlaying()) {
            audio.stop();
        }

        audio.play();
    };

    return (
        <View style={{ position: 'absolute', bottom: 50, left: 50, flex: 1, flexDirection: "row" }}>
            <TouchableOpacity
                style={{
                    padding: 10,
                    backgroundColor: '#353535EE',
                    borderTopLeftRadius: 50,
                    borderBottomLeftRadius: 50,
                }}
                onPress={
                    () => {
                        zoomOut()
                        playSound()
                    }
                }
            >
                <Icon source="arrow-collapse" color={'#D9D9D9'} size={30} />
            </TouchableOpacity>
            <Divider bold={true} />
            <Divider bold={true} />
            <TouchableOpacity
                style={{
                    padding: 10,
                    backgroundColor: '#353535EE',
                    borderTopRightRadius: 50,
                    borderBottomRightRadius: 50,
                }}
                onPress={
                    () => {
                        zoomIn()
                        playSound()
                    }
                }
            >
                <Icon source="arrow-expand" color={'#D9D9D9'} size={30} />
            </TouchableOpacity>
        </View>
    )
};
