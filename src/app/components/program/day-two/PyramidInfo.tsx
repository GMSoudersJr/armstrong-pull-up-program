'use client';

import { useState } from "react";
import RepsCompleteButton from '@/components/program/day-two/RepsCompleteButton';
import Pyramid from "@/components/program/day-two/Pyramid";
import {isSingular} from "@/utils";
import MissModalPortal from "./MissModalPortal";

const PyramidInfo = () => {
  let initialRepsArray: number[] = [];

  const [reps, setReps] = useState(1);
  const [repsArray, setRepsArray] = useState(initialRepsArray);

  return (
    <>
      <Pyramid repsArray={repsArray} />
      <p>Do {reps} {isSingular(reps) ? 'rep' : 'reps'}</p>
      <RepsCompleteButton
        repsState={reps}
        repsArrayState={repsArray}
        setStateForReps={setReps}
        setStateForRepsArray={setRepsArray}
      />
      <MissModalPortal
        repsState={reps}
        repsArrayState={repsArray}
        setStateForReps={setReps}
        setStateForRepsArray={setRepsArray}
      />
    </>
  )
};

export default PyramidInfo;
