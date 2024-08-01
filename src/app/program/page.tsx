import Link from "next/link";

const ProgramPage = () => {

  return (
    <main>
      {DAYS.map((day) => {
      return (
      <Link key={day.label} href={day.path}>
        {day.label}
      </Link>
      )
      })}
    </main>
  )
}

const DAYS = [
  {
    path: '/program/day-one',
    label: 'DAY ONE'
  },
  {
    path: '/program/day-two',
    label: 'DAY TWO'
  },
  {
    path: '/program/day-three',
    label: 'DAY THREE'
  },
  {
    path: '/program/day-four',
    label: 'DAY FOUR'
  },
  {
    path: '/program/day-five',
    label: 'DAY FIVE'
  },
]
export default ProgramPage;
