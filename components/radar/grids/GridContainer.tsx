import VerticalLines from "./VerticalLines";
import HorizontalLines from "./HorizontalLines";

export default (props: { lineCount: number, spacing: number }) => (
    <>
        <HorizontalLines {...props} />
        <VerticalLines {...props} />
    </>
)