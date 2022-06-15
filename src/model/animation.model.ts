
export interface Anim {
    index: number
    segment: Segment
    animation: string
    options: Record<string, string>
    message?: string
}

export interface Segment {
    start: number
    end: number
}