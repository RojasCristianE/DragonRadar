import { StyleSheet, View } from "react-native";

export default ({ lineCount, spacing }: { lineCount: number, spacing: number }) => (
    <View style={horizontalGridContainer}>
        {
            [...Array(lineCount).keys()].map(
                index => (
                    <View
                        key={`horizontal-${index}`}
                        style={[horizontalGridLine, { marginTop: index !== 0 ? spacing : 0 }]}
                    />
                )
            )
        }
    </View>
)

const { horizontalGridContainer, horizontalGridLine } = StyleSheet.create({
    horizontalGridContainer: {
        position: 'absolute',
        width: '100%',
        backgroundColor: 'transparent'
    },
    horizontalGridLine: {
        height: 1,
        width: '100%',
        backgroundColor: '#D9D9D9',
    },
});
