import { useEffect, useState } from "react"
import { useBreakpoint } from "../util/mediaQuery";

export const useDisplaySize = () => {
  const {isXs, isSm, isLg, isXl} = useBreakpoint();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [isPC, setIsPC] = useState<boolean>(false);
  const [isSmallTablet, setIsSmallTablet] = useState<boolean>(false);
  const [isLargeTablet, setIsLargeTablet] = useState<boolean>(false);

  useEffect(() => {
    if (isXs || isSm) {
      // Mobile
      // 〜519px
      setIsMobile(true);
      setIsTablet(false);
      setIsPC(false);
    } else if (isXl) {
      // PC
      // 1200px〜
      setIsMobile(false);
      setIsTablet(false);
      setIsPC(true);
    } else {
      // Tablet
      // 520px〜1199px
      setIsMobile(false);
      setIsTablet(true);
      setIsPC(false);
    }

    if (isTablet) {
      if (isLg) {
        setIsSmallTablet(false);
        setIsLargeTablet(true);
      } else {

        setIsSmallTablet(true);
        setIsLargeTablet(false);
      }
    }
  }, [isXs, isSm, isLg, isXl])

  return { isMobile: isMobile, isTablet: isTablet, isPC: isPC, isSmallTablet: isSmallTablet, isLargeTablet: isLargeTablet };
}