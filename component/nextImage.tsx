import styles from './nextImage.module.css';
import Image from 'next/image';
import { CSSProperties, useEffect, useState } from 'react';
import { Player } from "@lottiefiles/react-lottie-player";

export interface SizeProps {
  width: number,
  height: number,
}

interface NextImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  layout?: 'fill';
  objectFit?: 'contain' | 'cover';
  objectPosition?: 'top'
  width?: number;
  height?: number;
  priority?: boolean;
  needBlur?: boolean;
  needPermanentBlur?: boolean;
  cssProperties?: CSSProperties;
  onComplete?: (size: SizeProps) => void;
}

const NextImage: React.FC<NextImageProps> = (props) => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [imageIsReady, setImageIsReady] = useState<boolean>(false);

  useEffect(() => {
    setImageSrc(props.src);
  }, [props.src])

  useEffect(() => {
    window.setTimeout(() => {
      // ローディングがずっと表示されないように3秒後には消す
      if (!imageIsReady) {
        setImageIsReady(true);
      }
    }, 3000);
  }, [])

  // const loadingComplete = ({naturalWidth, naturalHeight }) => {
  //   setImageIsReady(true);

  //   if (props.onComplete) {
  //     const size: SizeProps = {
  //       width: naturalWidth,
  //       height: naturalHeight
  //     }
  //     props.onComplete(size);
  //   }
  // }

  const createImageComponent = (needZoom: boolean, layout: string, objectFit: 'contain' | 'cover') => {
    switch(layout) {
      case 'fill':
        return (
          <Image
            src={imageSrc}
            alt={props.alt}
            fill
            objectPosition={props.objectPosition}
            className={props.className + " " + (props.needPermanentBlur ? styles.permanentBlur : "")}
            unoptimized={false}
            quality={needZoom ? 100 : 75}
            priority={props.priority}
            placeholder={props.needBlur ? "blur" : "empty"}
            blurDataURL={props.needBlur ? "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAJAAkDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+pCgAoAKACgD/2Q==" : ""}
            onError={() => {
              const baseImageSrc = props.fallbackSrc ? props.fallbackSrc : imageSrc.replace('_resized', '');
              setImageSrc(baseImageSrc);
            }}
            // onLoadingComplete={loadingComplete}
            style={props.cssProperties ?
              // CSSPropertiesが注入されていたらそのまま使う
              props.cssProperties
              :
              {
                objectFit: objectFit
              }
            }
          />
        )
      default:
        return (
          <Image
            src={imageSrc}
            alt={props.alt}
            width={props.width}
            height={props.height}
            objectPosition={props.objectPosition}
            className={props.className + " " + (props.needPermanentBlur ? styles.permanentBlur : "")}
            unoptimized={false}
            quality={needZoom ? 100 : 75}
            priority={props.priority}
            placeholder={props.needBlur ? "blur" : "empty"}
            blurDataURL={props.needBlur ? "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAJAAkDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+pCgAoAKACgD/2Q==" : ""}
            onError={() => {
              const baseImageSrc = props.fallbackSrc ? props.fallbackSrc : imageSrc.replace('_resized', '');
              setImageSrc(baseImageSrc);
            }}
            // onLoadingComplete={loadingComplete}
            style={props.cssProperties ?
              // CSSPropertiesが注入されていたらそのまま使う
              props.cssProperties
              :
              {
                maxWidth: '100%',
                height: 'auto',
                objectPosition: 'top',
              }
            }
          />
        )
        break
    }
  }

  return imageSrc && (
    <div className={styles.wrapper}>
      <span
        className={styles.loadingContents}
        style={{ visibility: imageIsReady ? 'hidden' : 'visible' }}
      >
        <Player
          autoplay={true}
          loop={true}
          speed={1}
          src='/assets/lottie_animation/image_loading.json'
          className='player'
          background='transparent'
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            height: '100px',
            width: '100px',
          }}
        />
      </span>
    </div>
   );
}

export default NextImage;
