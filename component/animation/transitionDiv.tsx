import styles from './transitionDiv.module.css';
import { motion } from 'framer-motion';

interface TransitionDivProps {
  children: React.ReactNode;
  direction?: 'none' | 'top' | 'bottom'; // Default : top
  duration?: number;
  delay?: number;
}

const TransitionDiv: React.FC<TransitionDivProps> = (props) => {
  const DEFALUT_DURATION: number = 0.5
  const DEFAULT_DELAY: number = 0;

  return (
    <motion.div
      initial={{
        y: props.direction ? (props.direction === 'none' ? 0 : (props.direction === 'top' ? -10 : 10)): -10,
        opacity: 0
      }}
      animate={{
        y: 0,
        opacity: 1
      }}
      transition={{
        duration: props.duration ? props.duration : DEFALUT_DURATION,
        delay: props.delay ? props.delay : DEFAULT_DELAY
      }}
    >
      {props.children}
    </motion.div>
  )
}

export default TransitionDiv;