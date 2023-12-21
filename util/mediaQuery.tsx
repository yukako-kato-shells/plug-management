import React, { useContext, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const MediaQueryContext = React.createContext({
  isXs: true,
  isSm: false,
  isMd: false,
  isLg: false,
  isXl: false,
})


interface MediaQueryProviderProps {
  children: React.ReactNode
}
export const MediaQueryProvider: React.FC<MediaQueryProviderProps> = (props) => {
  const isXs = useMediaQuery({ maxWidth: 399 });
  const isSm = useMediaQuery({ minWidth: 400, maxWidth: 519 });
  const isMd = useMediaQuery({ minWidth: 520, maxWidth: 959 });
  const isLg = useMediaQuery({ minWidth: 960, maxWidth: 1199 });
  const isXl = useMediaQuery({ minWidth: 1200 });;

  return (
    <MediaQueryContext.Provider value={{ isXs, isSm, isMd, isLg, isXl }}>
      {props.children}
    </MediaQueryContext.Provider>
  )
}

export const useBreakpoint = () => useContext(MediaQueryContext);

export const MediaQuery = (children: React.ReactNode, breakpoints: string[]) => {
  const { isXs, isSm, isMd, isLg, isXl } = useBreakpoint();
  const [currentWindowSize, setCurrentWindowSize] = useState('xs');

  const getCurrentBreakPoint = (): string => {
    if (isXs) {
      return 'xs';
    } else if (isSm) {
      return 'sm';
    } else if (isMd) {
      return 'md';
    } else if (isLg) {
      return 'lg';
    } else if (isXl) {
      return 'xl';
    }
    return ''
  }

  useEffect(() => {
    setCurrentWindowSize(getCurrentBreakPoint());
  }, [isXs, isSm, isMd, isLg, isXl])


  return (
    <React.Fragment>
      {breakpoints.includes(currentWindowSize) && children}
    </React.Fragment>
  )
}
