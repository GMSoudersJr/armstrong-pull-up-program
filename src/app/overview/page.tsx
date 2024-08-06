import { Metadata } from "next";
import { Accordion } from "@/components/overview/Accordion";
import { getAllDailyInstructions } from "@/utils";

export const metadata: Metadata = {
  title: "Overview | Armstrong Pull-up Program",
  description: "An overview of the Armstrong Pullup Program"
};

const GetStartedPage = async () => {

  const dailyInstructions = await getAllDailyInstructions();

  return (
    <ul>
      {dailyInstructions.map((dailyInstruction) => {
        return (
          <li
            key={dailyInstruction.id}
          >
          <Accordion
            key={dailyInstruction.id}
            buttonText={dailyInstruction.title}
            panelText={dailyInstruction.instructions}
            link={dailyInstruction.link}
          />
          </li>
        )
      })}
    </ul>
  )
};

export default GetStartedPage;
