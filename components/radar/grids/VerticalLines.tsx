import { StyleSheet, View } from "react-native";

export default ({ lineCount, spacing }: { lineCount: number, spacing: number }) => (
    <View style={verticalGridContainer}>
        {
            [...Array(lineCount).keys()].map(
                index => (
                    <View
                        key={`vertical-${index}`}
                        style={[verticalGridLine, { marginLeft: index !== 0 ? spacing : 0 }]}
                    />
                )
            )
        }
    </View>
)

const { verticalGridContainer, verticalGridLine } = StyleSheet.create({
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
    }
});
