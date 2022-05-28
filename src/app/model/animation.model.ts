import { Segment } from "./segment.animation"

export interface Anim {
    index: number
    segment: Segment
    animation: string
    options: Record<string, string>
}