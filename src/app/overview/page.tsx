import { Accordion } from "@/components/overview/Accordion";
import { getAllDailyInstructions } from "@/utils";

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
