
export interface Discovery {
    animations: AnimDiscovery[]
    options: Record<string, string>
}

export interface AnimDiscovery {
    animation: string
    options: Record<string, AnimOptions>
}

export interface AnimOptions {
    type: string
    default: string
    min?: string
    max?: string
}