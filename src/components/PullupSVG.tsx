import styles from './PullupSVG.module.css';

const PullupSVG = () => {

  return (
    <svg width={'320'} height={'350'} xmlns="https://www.w3.org/2000/svg" className={styles.svg}>
      <polyline
        points='60,336.8 60,13.2 260,13.2 260,336.8'
        style={{
          fill: 'none',
          stroke: 'yellow',
          strokeWidth: '12'
        }}
      />
      <circle
        cx={90}
        cy={13.2}
        r={10}
        fill='black'
        stroke='black'
        strokeWidth={'2'}
      />
      <circle
        cx={230}
        cy={13.2}
        r={10}
        fill='black'
        stroke='black'
        strokeWidth={'2'}
      />
    </svg>
  )
};

export default PullupSVG
