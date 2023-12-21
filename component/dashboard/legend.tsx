import { FC } from 'react';
import { Value } from '../../pages/dashboard';
import styles from './legend.module.css';

interface CustomLegendProps {
  values: Value[];
}

const CustomLegend: FC<CustomLegendProps> = (props) => {
  return (
    <div className={styles.legends}>
      {
        props.values.map((value, index) => {
          return (
            <div className={styles.legend} key={index}>
              <div className={styles.color} style={{backgroundColor: value.color}}></div>
              <div className={styles.legendTitle}>{value.title}</div>
            </div>
          )
        })
      }
    </div>
  )
}

export default CustomLegend;