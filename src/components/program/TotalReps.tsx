import { nunito } from "@/fonts";

interface TotalRepsProps {
  sets: number[];
}

const TotalReps = ({ sets }: TotalRepsProps) => {
  const initialValue = 0;
  const totalRepsCount = sets.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, initialValue);

  return <h3 style={nunito.style}>{totalRepsCount} TOTAL PULL-UPS</h3>;
};

export default TotalReps;
