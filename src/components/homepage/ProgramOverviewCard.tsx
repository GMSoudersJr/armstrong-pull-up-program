import {ptSans} from '@/fonts';
import styles from './ProgramOverviewCard.module.css';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import Icon from '@/components/Icon';
import { nunito } from '@/fonts';

interface ProgramOverviewCardProps {
  iconName: keyof typeof dynamicIconImports;
  heading: string;
  body: string[];
};

const ProgramOverviewCard = ({
  iconName,
  heading,
  body,
}: ProgramOverviewCardProps) => {

  return (
    <div className={styles.card}>
      <div className={styles.icon}>
        <Icon
          name={iconName}
          size={64}
        />
      </div>
      <h3 style={nunito.style}>{heading}</h3>
      <ul>
        {body.map((point, i) => {
          return (
            <li key={i} style={ptSans.style}>
              {point}
            </li>
          )
        })}
      </ul>
    </div>
  )
};

export default ProgramOverviewCard;
