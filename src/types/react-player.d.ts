declare module 'react-player' {
  import * as React from 'react'

  export interface ReactPlayerProps {
    url?: string | string[]
    playing?: boolean
    loop?: boolean
    controls?: boolean
    muted?: boolean
    width?: string | number
    height?: string | number
    [key: string]: any // optional catch-all
  }

  const ReactPlayer: React.FC<ReactPlayerProps>
  export default ReactPlayer
}
