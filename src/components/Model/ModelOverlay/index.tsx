import React, { useContext, useEffect } from 'react'
import ModelsContext from '../ModelsContext';
import useWrapperScroll from '../useWrapperScroll'
import { Container } from './styles'

const ModelOverlay: React.FC = ({ children }) => {
  const { scrollY, scrollYProgress } = useWrapperScroll()
  const { wrapperRef } = useContext(ModelsContext)

  useEffect(() => {
    const element = wrapperRef.current
    if (element) {
      const updateScrollValue = () => {
        if (element) {
          const { scrollTop, scrollHeight, offsetHeight } = element
          const fullScroll = scrollHeight - offsetHeight
          scrollY.set(scrollTop)
          scrollYProgress.set(scrollTop / fullScroll)
        }
      }
      element.addEventListener('scroll', updateScrollValue)

      return () => element.removeEventListener('scroll', updateScrollValue)
    }
  }, [scrollY, scrollYProgress, wrapperRef])
  return (
    <Container>
      {children}
    </Container>
  );
};

export default ModelOverlay;
