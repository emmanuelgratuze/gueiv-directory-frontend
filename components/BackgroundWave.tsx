import React, {
  useEffect,
  useState,
  useMemo
} from 'react'
import { motion, useAnimation } from 'framer-motion'
import styled from 'styled-components'
import { ThemeType } from 'themes/theme'

type MenuWaveProps = {
  YPosition?: number;
  pointsLength?: number;
  intervalDuration?: number;
  color?: string;
  intensity?: number;
}

type PathProps = {
  theme: ThemeType;
  customColor?: string;
}

const WaveSVG = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
`

const WavePath = styled(motion.path)<PathProps>`
  fill: ${(props: PathProps) => props.theme.global.colors[props.customColor || 'yellow']};
`
const width = 100

const BackgroundWave: React.FC<React.SVGProps<SVGSVGElement> & MenuWaveProps> = ({
  YPosition = 90,
  pointsLength = 4,
  intervalDuration = 2000,
  color = 'yellow',
  intensity = 1,
  style
}) => {
  const pointsInterval = width / pointsLength
  const controls = useAnimation()
  const [waveFactors, setWaveFactors] = useState<{ y: number; x: number }[]>()
  const shape = useMemo(() => {
    const pointsCommands = Array(pointsLength).fill(null).map((value, index) => {
      const command = index === 0 ? 'Q' : 'T'
      const XDestination = Math.round((index + 1) * pointsInterval * 100) / 100 + (waveFactors ? waveFactors[index].x : Math.random())
      const YDestination = YPosition + (waveFactors ? waveFactors[index].y : Math.random())
      return `${command} ${index === 0 ? `${XDestination - pointsInterval / 2},${YDestination} ` : ''}${XDestination}, ${YDestination}`
    })
    return `M0,${YPosition} ${pointsCommands.join(' ')} L 100,100 L 0,100`
  }, [waveFactors])

  // Auto waves
  useEffect(() => {
    const waveInterval = setInterval(() => {
      // Value between -0.5 and 0.5
      setWaveFactors(Array(pointsLength).fill(null).map(() => ({
        x: Math.random() - 0.5,
        y: (Math.random() - 0.5) * 2 * intensity
      })))
    }, intervalDuration)

    return () => {
      clearInterval(waveInterval)
    }
  }, [])

  controls.mount()

  return (
    <WaveSVG
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      style={style}
    >
      <WavePath
        initial={{ d: shape }}
        animate={{ d: shape }}
        transition={{
          duration: intervalDuration / 1000,
          ease: 'easeInOut'
        }}
        customColor={color}
      />
    </WaveSVG>
  )
}

export default BackgroundWave
