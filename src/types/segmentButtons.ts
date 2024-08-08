export type SegmentState = "MAP_VIEW" | "GRID_VIEW";
export interface ISegmentButtons {
    onPress?: (val:SegmentState) => void;
}