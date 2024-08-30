import Icon from '@/components/Icon';
import styles from './FeatureCard.module.css';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import {nunito, ptSans} from '@/fonts';

interface FeatureCardProps {
  iconName: keyof typeof dynamicIconImports;
  heading: string;
  text: string;
};

const FeatureCard = ({ iconName, heading, text }: FeatureCardProps) => {

  return (
    <div className={styles.card}>
      <div className={styles.icon}>
        <Icon
          name={iconName}
        />
      </div>
      <h3 style={nunito.style}>{heading}</h3>
      <p style={ptSans.style}>{text}</p>
    </div>
  )
};

export default FeatureCard;
