import {
  motion,
  useMotionTemplate,
  useTransform,
  useSpring,
  useScroll,
} from 'motion/react'
import type { MotionValue } from 'motion/react'

const SPRING = { bounce: 0 }
export default function App() {
  console.log(import.meta.env.BASE_URL)
  const { scrollYProgress } = useScroll()
  const frameScaleY = useSpring(
    useTransform(scrollYProgress, [0, 0.1], [0, 1]),
    SPRING,
  )
  const frameScaleX = useSpring(
    useTransform(scrollYProgress, [0.2, 0.25], [0.02, 1]),
    SPRING,
  )

  const p1 = useSpring(
    useTransform(scrollYProgress, [0.2, 0.5], [0, 1]),
    SPRING,
  )
  const p2 = useSpring(
    useTransform(scrollYProgress, [0.3, 0.6], [0, 1]),
    SPRING,
  )
  const p3 = useSpring(
    useTransform(scrollYProgress, [0.4, 0.7], [0, 1]),
    SPRING,
  )

  const sceneScale = useSpring(
    useTransform(scrollYProgress, [0.5, 0.8], [0, 1]),
    SPRING,
  )
  const leftCurtainX = useSpring(
    useTransform(scrollYProgress, [0.9, 1], ['0%', '-100%']),
    SPRING,
  )
  const rightCurtainX = useSpring(
    useTransform(scrollYProgress, [0.9, 1], ['0%', '100%']),
    SPRING,
  )

  const progressOfImages = [p1, p2, p3]

  return (
    // Change the height to increase/decrease the animation speed
    <div className="grid h-[400svh]">
      <div className="sticky top-0 grid h-screen grid-rows-1">
        <motion.div
          className="bg-red-900 [grid-area:1/1]"
          style={{ scaleX: frameScaleX, scaleY: frameScaleY }}
        />

        {images.map((src, idx) => (
          <ClipedImage key={idx} src={src} progress={progressOfImages[idx]} />
        ))}

        <motion.div
          className="isolate flex overflow-clip bg-white text-6xl font-bold text-black [grid-area:1/1]"
          style={{
            scale: sceneScale,
          }}
        >
          <motion.div
            className="relative z-[1] h-full w-1/2 overflow-clip bg-red-900 text-center"
            style={{ x: leftCurtainX }}
          >
            <div className="absolute top-1/2 left-full w-lg -translate-x-1/2 -translate-y-1/2">
              <h2>{TITLE}</h2>
            </div>
          </motion.div>
          <motion.div
            className="relative z-[1] h-full w-1/2 overflow-clip bg-red-900 text-center"
            style={{ x: rightCurtainX }}
          >
            <div className="absolute top-1/2 left-0 w-lg -translate-x-1/2 -translate-y-1/2">
              <h2>{TITLE}</h2>
            </div>
          </motion.div>
          <motion.div className="absolute inset-0 z-0 mx-auto flex max-w-md items-center text-center text-5xl">
            THE END OF SCROLL!
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

function ClipedImage({
  src,
  progress,
}: {
  src: string
  progress: MotionValue
}) {
  const scale = useTransform(progress, [0, 1], [0.6, 1.2])
  const x1 = useTransform(progress, [0, 1], [50, 0.001])
  const x2 = useTransform(progress, [0, 1], [50, 100])
  const y1 = useTransform(progress, [0, 1], [50, 0.001])
  const y2 = useTransform(progress, [0, 1], [50, 100])

  return (
    <div className="overflow-clip [grid-area:1/1]">
      <motion.img
        src={import.meta.env.BASE_URL + src}
        alt=""
        className="size-full object-cover"
        style={{
          scale,
          clipPath: useMotionTemplate`polygon(
                ${x1}% ${y1}%,
                ${x2}% ${y1}%,
                ${x2}% ${y2}%,
                ${x1}% ${y2}%)`,
        }}
      />
    </div>
  )
}

const TITLE =
  'We sell real estate that evokes emotions. We give a new sense of self'
const images = ['1.webp', '2.webp', '3.webp']
