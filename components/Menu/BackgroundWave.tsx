import React, {
  useEffect,
  createRef,
  useState,
  useMemo
} from 'react'
import { motion, useAnimation } from 'framer-motion'
import styled from 'styled-components'

type MenuWaveProps = {
  open?: boolean;
}

const WaveSVG = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
`

const WavePath = styled(motion.path)`
  fill: ${props => props.theme.global.colors.blue};
`

const YPosition = 80
const height = 100
const width = 100
const pointsLength = 10
const pointsInterval = width / pointsLength

const BackgroundWave: React.FC<MenuWaveProps> = () => {
  const controls = useAnimation()
  const svgRef = createRef<SVGSVGElement>()
  // const [cursorPosition, setCursorPosition] = useState<SVGPoint>()
  const [waveFactors, setWaveFactors] = useState<{ y: number; x: number }[]>()
  const shape = useMemo(() => {
    const pointsCommands = Array(pointsLength).fill(null).map((value, index) => {
      const command = index === 0 ? 'Q' : 'T'
      const XDestination = Math.round((index + 1) * pointsInterval * 100) / 100 + (waveFactors ? waveFactors[index].x : 0)
      const YDestination = YPosition + (waveFactors ? waveFactors[index].y : 0)
      return `${command} ${index === 0 ? `${XDestination - pointsInterval / 2},${YDestination} ` : ''}${XDestination}, ${YDestination}`
    })
    return `M0,${YPosition} ${pointsCommands.join(' ')} L 100,100 L 0,100`
  }, [waveFactors])

  // Auto waves
  useEffect(() => {
    setInterval(() => {
      // Value between -0.5 and 0.5
      setWaveFactors(Array(pointsLength).fill(null).map(() => ({
        x: Math.random() - 0.5,
        y: (Math.random() - 0.5) * 2
      })))
    }, 2000)
  }, [])

  // Mouse listener
  // useEffect(() => {
  //   if (svgRef.current) {
  //     const cursorPoint = svgRef.current.createSVGPoint()
  //     const svg = svgRef.current
  //     svg.addEventListener('mousemove', (e) => {
  //       cursorPoint.x = e.clientX
  //       cursorPoint.y = e.clientY

  //       if (svg !== null) {
  //         const screenCTM = svg.getScreenCTM()
  //         if (screenCTM) {
  //           setCursorPosition(cursorPoint.matrixTransform(screenCTM.inverse()))
  //         }
  //       }
  //     }, false)
  //   }
  // }, [svgRef.current])

  controls.mount()

  return (
    <WaveSVG
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      ref={svgRef}
    >
      <WavePath
        initial={{ d: shape }}
        animate={{ d: shape }}
        transition={{
          duration: 2,
          ease: 'easeInOut'
        }}
      />
    </WaveSVG>
  )
}

export default BackgroundWave
