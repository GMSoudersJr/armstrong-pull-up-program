# [Armstrong Pull-up Program App](https://armstrong-pull-up-program.vercel.app) 🦾
Live link: https://armstrong-pull-up-program.vercel.app

The information in the FAQ section came from [this PDF](https://www.savannahstate.edu/cost/nrotc/documents/Inform2010-thearmstrongworkout_Enclosure15_5-2-10.pdf)

## Background 📖
About 10 years ago, I decided to put the pull-up bar in my house to better use than a dry wrack for my towels.

I came across this program called "The Armstrong Pull-up Program". I gave it a try. It was quite simple to follow.

5 consecutive days of push-ups and pull-ups. After a few months, my max went from 3 to 27 and I was able to do 5 muscle ups!

## Problems 😠

### Tracking / Recording Progress 🧾
- Easily forget previous week's max and training set numbers.
- During workouts, I would lose track of set counts, get frustrated with myself, then lose focus!
- I recorded my progess in tiny spiral notepads 🗒️, notebooks 📓, and on the dry-erase like doors of my closest.
  - Lost the notebooks and had to erase sections of the door to write more data.
- At the park 🏞️, nothing to write on, had to memorize everything if I wanted to keep track of it.
  - Resorted to breaking twigs and keeping them in my pocket.

### Recovery Timers ⏲️
- Three types: 90s, 60s, and 10s / rep
  - My running watch was too much of a hassle to set a new timer after each set or keep track of how many times the 10s timer went off.
  - My other digital watch's timer could only do 1-minute increments.

## Solutions 😂
### Tracking / Recording Progress 🧾
- Record completed workouts in IndexedDB. I want to keep the user's data with them. I do not need to know how many pull-ups someone can do!
- The app keeps track of which day the user last completed and guides them through the program.
- Each day is as simple as inputing your number of pull-ups and then clicking that you have completed the set.
- Users are shown their progress for the day and a tally of how many pull-ups they accomplished in the workout.
- Users are shown details about their previous days and weeks of workouts upon openning the app.

### Recovery Timers ⏲️
- Users do not need to set any timers.
- The recovery timers are automatic. Sit back and relax! You deserved it.

## Goals 🚀
Local First - I want this to work offline and keep user's data on their devices, not on anywhere else.

## This App
This was my project for LMT2 Cohort #2
Built with React and Nextjs using TypeScript.
I am trying to keep the dependencies to a minimum.
