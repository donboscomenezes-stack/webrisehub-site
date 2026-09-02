'use client';

import { toPng } from 'html-to-image';
import Lenis from 'lenis';
import Matter from 'matter-js';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { feature } from 'topojson-client';
import worldAtlas from 'world-atlas/countries-110m.json';
import {
  CSSProperties,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

gsap.registerPlugin(ScrollTrigger);

const DAYS_PER_MONTH = 30.44;
const MOVIE_HOURS = 2.1;
const EARTH_FLIGHT_HOURS = 48;
const WORKDAY_HOURS = 8;
const BOOK_HOURS = 6;
const GYM_HOURS = 1.25;
const COURSE_HOURS = 45;
const LANGUAGE_HOURS = 600;
const CITY_WALK_HOURS = 2.5;

type Choice = 'none' | 'respect' | 'outside';
type Mood = 'gentle' | 'normal' | 'heavy';
type JarMode = 'shake' | 'rain' | 'magnet' | 'reset';
type DayBlock = 'scroll' | 'focus' | 'move' | 'sleep' | 'people' | 'free';
type WeekMode = 'feeds' | 'messages' | 'video' | 'useful';
type YearPlan = 'sleep' | 'people' | 'skill' | 'travel';
type TimelineMode = 'phone' | 'life';
type BrowserWindowWithAudio = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

const MOOD_PROFILES: Record<Mood, { hours: number; title: string; description: string }> = {
  gentle: {
    hours: 2,
    title: '2h/day',
    description: 'A light day. Mostly check-ins, replies, maps, and a few drifts.',
  },
  normal: {
    hours: 4,
    title: '4h/day',
    description: 'A common day. The phone is not dramatic, it is just always there.',
  },
  heavy: {
    hours: 7,
    title: '7h/day',
    description: 'A heavy day. Feeds, clips, messages, and second-screen time start to merge.',
  },
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function fmt(value: number, digits = 1) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value);
}

function whole(value: number) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value);
}

function getTotals(dailyHours: number) {
  const weeklyHours = dailyHours * 7;
  const monthlyHours = dailyHours * DAYS_PER_MONTH;
  const annualHours = dailyHours * 365;
  const annualDays = annualHours / 24;
  const fiveYearHours = annualHours * 5;
  const tenYearHours = annualHours * 10;
  const decadeYears = tenYearHours / (24 * 365);

  return {
    dailyHours,
    weeklyHours,
    monthlyHours,
    annualHours,
    annualDays,
    fiveYearHours,
    tenYearHours,
    decadeYears,
    books: annualHours / BOOK_HOURS,
    cityWalks: annualHours / CITY_WALK_HOURS,
    courses: annualHours / COURSE_HOURS,
    earthLoops: annualHours / EARTH_FLIGHT_HOURS,
    gymTrips: annualHours / GYM_HOURS,
    languages: tenYearHours / LANGUAGE_HOURS,
    movies: annualHours / MOVIE_HOURS,
    sleepNights: annualHours / 8,
    workdays: annualHours / WORKDAY_HOURS,
  };
}

function useBeep() {
  return () => {
    const AudioContextConstructor =
      window.AudioContext || (window as BrowserWindowWithAudio).webkitAudioContext;
    if (!AudioContextConstructor) return;
    const context = new AudioContextConstructor();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(420, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(190, context.currentTime + 0.08);
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, context.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.1);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.11);
    window.setTimeout(() => context.close(), 180);
  };
}

function playBirdChirp() {
  const AudioContextConstructor =
    window.AudioContext || (window as BrowserWindowWithAudio).webkitAudioContext;
  if (!AudioContextConstructor) return;
  const context = new AudioContextConstructor();
  [0, 0.08, 0.18].forEach((offset, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880 + index * 160, context.currentTime + offset);
    oscillator.frequency.exponentialRampToValueAtTime(1320 + index * 180, context.currentTime + offset + 0.07);
    gain.gain.setValueAtTime(0.0001, context.currentTime + offset);
    gain.gain.exponentialRampToValueAtTime(0.045, context.currentTime + offset + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + offset + 0.09);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(context.currentTime + offset);
    oscillator.stop(context.currentTime + offset + 0.1);
  });
  window.setTimeout(() => context.close(), 420);
}

function PhoneIllustration({
  dailyHours,
  onSecretTap,
}: {
  dailyHours: number;
  onSecretTap: () => void;
}) {
  const pressure = dailyHours / 12;
  const bubbleCount = Math.round(3 + pressure * 22);

  return (
    <button
      aria-label="Animated phone"
      className="phone-stage"
      onClick={onSecretTap}
      style={
        {
          '--panic': pressure,
          '--tilt': `${(pressure - 0.35) * 20}deg`,
        } as CSSProperties
      }
    >
      <span className="phone-aura" />
      <span className="phone-body">
        <span className="phone-speaker" />
        <span className="phone-screen">
          <span className="feed-line wide" />
          <span className="feed-tile" />
          <span className="feed-line" />
          <span className="feed-line short" />
        </span>
      </span>
      {Array.from({ length: bubbleCount }).map((_, index) => (
        <span
          className="notification"
          key={index}
          onClick={(event) => {
            event.stopPropagation();
            event.currentTarget.classList.add('popped');
          }}
          style={
            {
              '--x': `${((index * 47) % 190) - 95}px`,
              '--y': `${-24 - ((index * 31) % 250)}px`,
              '--delay': `${index * 0.045}s`,
              '--scale': 0.66 + ((index * 7) % 10) / 11,
            } as CSSProperties
          }
        >
          {['!', '12', 'like', '▶', 'new'][index % 5]}
        </span>
      ))}
    </button>
  );
}

function StatRibbon({ totals }: { totals: ReturnType<typeof getTotals> }) {
  const stats = [
    ['week', `${whole(totals.weeklyHours)}h`],
    ['month', `${whole(totals.monthlyHours)}h`],
    ['year', `${fmt(totals.annualDays)}d`],
    ['decade', `${fmt(totals.decadeYears, 2)}y`],
  ];

  return (
    <div className="stat-ribbon" aria-label="Screen time summary">
      {stats.map(([label, value]) => (
        <span key={label}>
          <b>{value}</b>
          {label}
        </span>
      ))}
    </div>
  );
}

function HabitDial({
  mood,
  setMood,
  setDailyHours,
}: {
  mood: Mood;
  setMood: (mood: Mood) => void;
  setDailyHours: (hours: number) => void;
}) {
  return (
    <div className="habit-dial" aria-label="Daily screen-time presets">
      {(['gentle', 'normal', 'heavy'] as Mood[]).map((item) => (
        <button
          aria-pressed={mood === item}
          className={mood === item ? 'selected' : ''}
          key={item}
          onClick={() => {
            setMood(item);
            setDailyHours(MOOD_PROFILES[item].hours);
          }}
        >
          <span>{item}</span>
          <b>{MOOD_PROFILES[item].title}</b>
          <small>{MOOD_PROFILES[item].description}</small>
        </button>
      ))}
    </div>
  );
}

function DayStrip({ dailyHours }: { dailyHours: number }) {
  const filled = Math.round(clamp(dailyHours, 0, 12) * 2);
  const blockLoop: DayBlock[] = ['scroll', 'focus', 'move', 'sleep', 'people'];
  const quickPlan: DayBlock[] = ['focus', 'move', 'people', 'sleep', 'focus', 'people'];
  const [blocks, setBlocks] = useState<DayBlock[]>(() =>
    Array.from({ length: 24 }, (_, index) => (index < filled ? 'scroll' : 'free')),
  );

  useEffect(() => {
    setBlocks((previous) =>
      Array.from({ length: 24 }, (_, index) => {
        if (index >= filled) return 'free';
        return previous[index] && previous[index] !== 'free' ? previous[index] : 'scroll';
      }),
    );
  }, [filled]);

  const counts = blocks.reduce(
    (total, block) => {
      if (block !== 'free') total[block] += 1;
      return total;
    },
    { scroll: 0, focus: 0, move: 0, sleep: 0, people: 0 } as Record<Exclude<DayBlock, 'free'>, number>,
  );
  const rescuedBlocks = filled - counts.scroll;
  const rescuedHours = rescuedBlocks / 2;
  const leftHours = counts.scroll / 2;
  const chosenLife = [
    counts.focus ? `${fmt(counts.focus / 2)}h focus` : '',
    counts.move ? `${fmt(counts.move / 2)}h movement` : '',
    counts.sleep ? `${fmt(counts.sleep / 2)}h sleep` : '',
    counts.people ? `${fmt(counts.people / 2)}h people` : '',
  ].filter(Boolean);

  function cycleBlock(index: number) {
    if (index >= filled) return;
    setBlocks((current) =>
      current.map((block, blockIndex) =>
        blockIndex === index ? blockLoop[(blockLoop.indexOf(block) + 1) % blockLoop.length] : block,
      ),
    );
  }

  function rescueNext() {
    let planIndex = 0;
    setBlocks((current) =>
      current.map((block, index) => {
        if (index >= filled || block !== 'scroll' || planIndex > 0) return block;
        planIndex += 1;
        return quickPlan[rescuedBlocks % quickPlan.length];
      }),
    );
  }

  function randomizeDay() {
    setBlocks((current) =>
      current.map((block, index) => {
        if (index >= filled) return 'free';
        return index % 3 === 0 ? quickPlan[(index + filled) % quickPlan.length] : block;
      }),
    );
  }

  return (
    <div className="day-builder">
      <div className="day-score">
        <span>
          still scrolling
          <b>{fmt(leftHours)}h</b>
        </span>
        <span>
          rescued
          <b>{fmt(rescuedHours)}h</b>
        </span>
        <span>
          day shape
          <b>{chosenLife.length ? chosenLife.join(' + ') : 'tap blocks'}</b>
        </span>
      </div>
      <div className="day-strip" aria-label={`${fmt(dailyHours)} hours inside a day`}>
        {blocks.map((block, index) => (
          <button
            aria-label={
              index < filled
                ? `Half-hour block ${index + 1}, currently ${block}. Tap to change it.`
                : `Half-hour block ${index + 1}, not used by scrolling`
            }
            className={`hour ${block} ${index < filled ? 'used' : ''}`}
            disabled={index >= filled}
            key={index}
            onClick={() => cycleBlock(index)}
            type="button"
          >
            <b>{block === 'free' ? 'open' : block}</b>
          </button>
        ))}
      </div>
      <div className="day-actions" aria-label="Change the ordinary day">
        <button onClick={rescueNext} type="button">Rescue 30m</button>
        <button onClick={randomizeDay} type="button">Make a day</button>
        <button
          onClick={() =>
            setBlocks(Array.from({ length: 24 }, (_, index) => (index < filled ? 'scroll' : 'free')))
          }
          type="button"
        >
          Reset
        </button>
      </div>
      <p className="day-nudge">
        Tap any red block: scroll becomes focus, movement, sleep, or people. One ordinary day starts
        arguing back.
      </p>
    </div>
  );
}

function PhoneStack({ weeklyHours }: { weeklyHours: number }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const [selectedDay, setSelectedDay] = useState(0);
  const [mode, setMode] = useState<WeekMode>('feeds');
  const [week, setWeek] = useState<number[]>(() =>
    days.map((_, index) => clamp(weeklyHours / 7 + (index % 2 ? 0.35 : -0.2), 0, 12)),
  );
  const modes: Record<WeekMode, { label: string; note: string; color: string }> = {
    feeds: {
      label: 'feeds',
      note: 'Mostly scrolling. This is the sneaky default.',
      color: 'var(--red)',
    },
    messages: {
      label: 'messages',
      note: 'Some of it is real people, some of it is tiny errands.',
      color: 'var(--blue)',
    },
    video: {
      label: 'video',
      note: 'One clip becomes a small staircase very fast.',
      color: 'var(--yellow)',
    },
    useful: {
      label: 'useful',
      note: 'Maps, learning, work, banking. Still time, but less hollow.',
      color: 'var(--green)',
    },
  };

  useEffect(() => {
    setWeek(days.map((_, index) => clamp(weeklyHours / 7 + (index % 2 ? 0.35 : -0.2), 0, 12)));
  }, [weeklyHours]);

  const currentTotal = week.reduce((sum, hours) => sum + hours, 0);
  const saved = Math.max(0, weeklyHours - currentTotal);
  const count = clamp(Math.round(currentTotal), 1, 92);
  const chosenHours = week[selectedDay] ?? 0;

  function updateDay(delta: number) {
    setWeek((current) =>
      current.map((hours, index) => (index === selectedDay ? clamp(hours + delta, 0, 12) : hours)),
    );
  }

  function makeWeekendLighter() {
    setWeek((current) =>
      current.map((hours, index) => (index > 4 ? clamp(hours - 1.5, 0, 12) : clamp(hours - 0.25, 0, 12))),
    );
  }

  return (
    <div className="week-visual">
      <div className="week-meter">
        <span style={{ '--fill': clamp(currentTotal / 84, 0, 1) } as CSSProperties} />
        <b>{fmt(currentTotal)} planned hours</b>
        <small>{saved > 0 ? `${fmt(saved)}h rescued` : 'tap to reshape'}</small>
      </div>
      <div aria-label={`${whole(currentTotal)} phone blocks`} className="stack-stage">
        {Array.from({ length: count }).map((_, index) => (
          <button
            aria-label={`Remove one hour from ${days[selectedDay]}`}
            className="stack-phone"
            key={index}
            onClick={() => updateDay(-1)}
            style={
              {
                '--i': index,
                '--lean': `${((index % 7) - 3) * 1.7}deg`,
                '--mode-color': modes[mode].color,
              } as CSSProperties
            }
            type="button"
          />
        ))}
      </div>
      <div className="week-panel">
        <div className="week-days">
          {days.map((day, index) => (
            <button
              aria-pressed={selectedDay === index}
              className={selectedDay === index ? 'selected' : ''}
              key={day}
              onClick={() => setSelectedDay(index)}
              type="button"
            >
              <b>{day}</b>
              <span style={{ transform: `scaleX(${clamp(week[index] / 8, 0.04, 1)})` }} />
              <strong>{fmt(week[index])}h</strong>
            </button>
          ))}
        </div>
        <div className="week-editor">
          <span>{days[selectedDay]} feels like</span>
          <strong>{fmt(chosenHours)} hours</strong>
          <div className="week-stepper">
            <button onClick={() => updateDay(-0.5)} type="button">Cut 30m</button>
            <button onClick={() => updateDay(0.5)} type="button">Add 30m</button>
          </div>
          <div className="week-modes">
            {(Object.keys(modes) as WeekMode[]).map((item) => (
              <button
                aria-pressed={mode === item}
                className={mode === item ? 'selected' : ''}
                key={item}
                onClick={() => setMode(item)}
                type="button"
              >
                {modes[item].label}
              </button>
            ))}
          </div>
          <p>{modes[mode].note}</p>
          <button className="week-reset" onClick={makeWeekendLighter} type="button">
            Make weekend lighter
          </button>
        </div>
      </div>
    </div>
  );
}

function CalendarBurn({ annualDays }: { annualDays: number }) {
  const filled = clamp(Math.round(annualDays), 0, 365);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const monthStarts = monthDays.reduce<number[]>((starts, days, index) => {
    starts.push(index === 0 ? 0 : starts[index - 1] + monthDays[index - 1]);
    return starts;
  }, []);
  const planCopy: Record<YearPlan, string> = {
    sleep: 'quiet nights',
    people: 'unrushed people time',
    skill: 'practice days',
    travel: 'loose travel days',
  };
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [plan, setPlan] = useState<YearPlan>('sleep');
  const [reclaimed, setReclaimed] = useState<number[]>(() => Array(12).fill(0));
  const reclaimedTotal = reclaimed.reduce((sum, days) => sum + days, 0);
  const activeDays = Math.max(0, filled - reclaimedTotal);
  const selectedCap = Math.max(
    0,
    Math.min(monthDays[selectedMonth], filled - monthStarts[selectedMonth]),
  );
  const selectedReclaimed = reclaimed[selectedMonth] ?? 0;

  function updateMonth(days: number) {
    setReclaimed((current) =>
      current.map((value, index) =>
        index === selectedMonth ? clamp(value + days, 0, selectedCap) : value,
      ),
    );
  }

  function reclaimDay(dayIndex: number) {
    const month = monthStarts.findLastIndex((start) => dayIndex >= start);
    if (month < 0 || dayIndex >= filled) return;
    setSelectedMonth(month);
    const cap = Math.max(0, Math.min(monthDays[month], filled - monthStarts[month]));
    setReclaimed((current) =>
      current.map((value, index) => (index === month ? clamp(value + 1, 0, cap) : value)),
    );
  }

  function makeYearPlan() {
    setReclaimed(monthDays.map((days, index) => (monthStarts[index] < filled ? Math.min(2, days) : 0)));
  }

  return (
    <div className="calendar-wrap" style={{ '--year-progress': clamp(activeDays / 365, 0, 1) } as CSSProperties}>
      <div className="month-strip">
        {monthNames.map((month, index) => {
          const monthFill = clamp((activeDays - monthStarts[index]) / monthDays[index], 0, 1);
          return (
            <button
              aria-pressed={selectedMonth === index}
              className={selectedMonth === index ? 'selected' : ''}
              key={month}
              onClick={() => setSelectedMonth(index)}
              type="button"
            >
              <b style={{ transform: `scaleX(${monthFill})` }} />
              <span>{month}</span>
            </button>
          );
        })}
      </div>
      <div
        aria-label={`${fmt(activeDays)} days still marked on a calendar`}
        className="calendar-grid"
      >
        {Array.from({ length: 365 }).map((_, index) => {
          const month = monthStarts.findLastIndex((start) => index >= start);
          const offset = month >= 0 ? index - monthStarts[month] : 0;
          const removed = month >= 0 && offset < reclaimed[month];
          const marked = index < filled && !removed;
          return (
            <button
              aria-label={
                index < filled
                  ? `Day ${index + 1}, ${marked ? 'scrolling time' : 'reclaimed time'}`
                  : `Day ${index + 1}, open time`
              }
              className={marked ? 'calendar-day filled' : removed ? 'calendar-day reclaimed' : 'calendar-day'}
              disabled={index >= filled}
              key={index}
              onClick={() => reclaimDay(index)}
              style={{ transitionDelay: `${Math.min(index, filled) * 2}ms` }}
              type="button"
            />
          );
        })}
      </div>
      <aside className="year-editor">
        <span>{monthNames[selectedMonth]} rescue desk</span>
        <strong>
          <b>{fmt(activeDays)}</b>
          <small>days left</small>
        </strong>
        <p>
          You reclaimed {fmt(reclaimedTotal)} days for {planCopy[plan]}. Tap red calendar squares or
          use the buttons below.
        </p>
        <div className="year-stepper">
          <button onClick={() => updateMonth(1)} type="button">Rescue 1 day</button>
          <button onClick={() => updateMonth(5)} type="button">Rescue 5 days</button>
          <button onClick={() => updateMonth(-selectedReclaimed)} type="button">Restore month</button>
        </div>
        <div className="year-plans">
          {(Object.keys(planCopy) as YearPlan[]).map((item) => (
            <button
              aria-pressed={plan === item}
              className={plan === item ? 'selected' : ''}
              key={item}
              onClick={() => setPlan(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
        <button className="year-plan-button" onClick={makeYearPlan} type="button">
          Give every month 2 days back
        </button>
      </aside>
    </div>
  );
}

function ComparisonDeck({ totals }: { totals: ReturnType<typeof getTotals> }) {
  const [selected, setSelected] = useState('Books');
  const cards = [
    {
      label: 'Books',
      value: whole(totals.books),
      note: 'six-hour reading sprints',
      plan: 'Build a shelf called "things I meant to become."',
      steps: ['choose 12 books', 'read 25 pages', 'mark one idea'],
    },
    {
      label: 'Gym trips',
      value: whole(totals.gymTrips),
      note: 'enough sweat to need a spreadsheet',
      plan: 'Three sessions a week for years, with rest days included.',
      steps: ['pick a tiny routine', 'track streaks', 'rest properly'],
    },
    {
      label: 'Courses',
      value: fmt(totals.courses),
      note: 'full university-style courses',
      plan: 'A strange little self-made degree, built one module at a time.',
      steps: ['choose a subject', 'finish lessons', 'make a project'],
    },
    {
      label: 'Sleep',
      value: whole(totals.sleepNights),
      note: 'complete nights of sleep',
      plan: 'The most boring swap, therefore probably the most powerful.',
      steps: ['phone outside room', 'same bedtime', 'morning sunlight'],
    },
    {
      label: 'Languages',
      value: fmt(totals.languages, 2),
      note: 'serious decade-long study attempts',
      plan: 'Not fluency magic, but real practice with real momentum.',
      steps: ['daily listening', 'speak badly', 'keep going'],
    },
    {
      label: 'City walks',
      value: whole(totals.cityWalks),
      note: 'long wandering walks',
      plan: 'Enough pavement to know a city by smell, shortcuts, and cafes.',
      steps: ['pick a direction', 'no headphones', 'photograph one thing'],
    },
  ];
  const active = cards.find((card) => card.label === selected) ?? cards[0];

  return (
    <div className="comparison-lab">
      <div className="swap-hero">
        <span>{active.label}</span>
        <strong>{active.value}</strong>
        <p>{active.note}</p>
      </div>
      <div className="comparison-deck" aria-label="Choose a different life swap">
        {cards.map((card, index) => (
          <button
            aria-pressed={selected === card.label}
            className={selected === card.label ? 'comparison-card selected' : 'comparison-card'}
            key={card.label}
            style={{ '--i': index } as CSSProperties}
            onClick={() => setSelected(card.label)}
          >
            <span>{card.label}</span>
            <b>{card.value}</b>
          </button>
        ))}
      </div>
      <aside className="swap-detail">
        <span>{active.label} plan</span>
        <p>{active.plan}</p>
        <div className="mini-checks">
          {active.steps.map((step) => (
            <b key={step}>{step}</b>
          ))}
        </div>
      </aside>
    </div>
  );
}

function TicketField({ movies, flavor }: { movies: number; flavor: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    let frame = 0;
    let raf = 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const count = window.innerWidth < 700 ? 120 : 260;
    const particles = Array.from({ length: count }).map((_, index) => ({
      x: Math.random(),
      y: Math.random(),
      speed: 0.001 + Math.random() * 0.004,
      size: 9 + Math.random() * 21,
      hue: index % 4,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      context.clearRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        if (!reduced) particle.y += particle.speed + movies / 3200000;
        if (particle.y > 1.18) particle.y = -0.18;
        const x = particle.x * width + Math.sin(frame / 42 + index) * 34;
        const y = particle.y * height;

        context.save();
        context.translate(x, y);
        context.rotate(Math.sin(frame / 28 + index) * 0.32);
        const palette =
          flavor === 'comfort'
            ? ['#ffd84d', '#6ce5a1', '#f7f6f2', '#ffd84d']
            : flavor === 'chaos'
              ? ['#ff4d4d', '#5b7cff', '#ff4d4d', '#ffd84d']
              : ['#ff4d4d', '#ffd84d', '#5b7cff', '#6ce5a1'];
        context.fillStyle = palette[particle.hue];
        if (flavor === 'festival') {
          context.beginPath();
          context.arc(0, 0, particle.size * 0.8, 0, Math.PI * 2);
          context.fill();
        } else {
          context.fillRect(-particle.size, -particle.size / 2, particle.size * 2, particle.size);
        }
        context.fillStyle = '#111';
        context.fillRect(-particle.size * 0.11, -particle.size / 2, particle.size * 0.22, particle.size);
        context.restore();
      });

      frame += 1;
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [movies, flavor]);

  return <canvas aria-hidden="true" className="ticket-canvas" ref={canvasRef} />;
}

function CinemaStudio({ movies }: { movies: number }) {
  const genres = [
    {
      id: 'festival',
      label: 'Film festival',
      pace: '3 movies every weekend',
      picks: ['strange documentary', 'tiny indie drama', 'subtitled masterpiece'],
    },
    {
      id: 'comfort',
      label: 'Comfort year',
      pace: 'one cozy movie most nights',
      picks: ['rainy comedy', 'nostalgia rewatch', 'late-night animation'],
    },
    {
      id: 'chaos',
      label: 'Chaos marathon',
      pace: 'all trailers, all snacks, no dignity',
      picks: ['space disaster', 'heist double bill', 'monster finale'],
    },
  ];
  const [active, setActive] = useState(genres[0]);

  return (
    <>
      <TicketField flavor={active.id} movies={movies} />
      <div className="cinema-console reveal">
        <p className="kicker">You could have watched</p>
        <h2>{whole(movies)}</h2>
        <p className="scene-line">movies this year</p>
        <div className="genre-row">
          {genres.map((genre) => (
            <button
              className={active.id === genre.id ? 'selected' : ''}
              key={genre.id}
              onClick={() => setActive(genre)}
            >
              {genre.label}
            </button>
          ))}
        </div>
        <div className="watchlist">
          <b>{active.pace}</b>
          {active.picks.map((pick, index) => (
            <span key={pick}>
              {index + 1}. {pick}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

function PhysicsJar({ totalHours }: { totalHours: number }) {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const [shakeCount, setShakeCount] = useState(0);
  const [mode, setMode] = useState<JarMode>('shake');
  const tokenCount = Math.min(42, Math.max(12, Math.round(totalHours / 420)));

  useEffect(() => {
    const scene = sceneRef.current;
    if (mode !== 'shake') return;
    if (!scene) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rect = scene.getBoundingClientRect();
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: reduced ? 0 : 0.9 },
    });
    const render = Matter.Render.create({
      element: scene,
      engine,
      options: {
        background: 'transparent',
        height: rect.height,
        wireframes: false,
        width: rect.width,
      },
    });
    const wallOptions = { isStatic: true, render: { visible: false } };
    const walls = [
      Matter.Bodies.rectangle(rect.width / 2, rect.height - 18, rect.width + 60, 48, wallOptions),
      Matter.Bodies.rectangle(18, rect.height / 2, 48, rect.height + 80, wallOptions),
      Matter.Bodies.rectangle(rect.width - 18, rect.height / 2, 48, rect.height + 80, wallOptions),
      Matter.Bodies.rectangle(rect.width / 2, 16, rect.width + 60, 32, wallOptions),
    ];
    const tokens = Array.from({ length: tokenCount }).map((_, index) =>
      Matter.Bodies.circle(
        58 + ((index * 73) % Math.max(80, rect.width - 116)),
        54 + (index % 8) * 19,
        12 + (index % 5) * 3,
        {
          restitution: 0.72,
          friction: 0.03,
          render: {
            fillStyle: ['#ff4d4d', '#ffd84d', '#5b7cff', '#6ce5a1'][index % 4],
            strokeStyle: '#111111',
            lineWidth: 3,
          },
        },
      ),
    );

    Matter.Composite.add(engine.world, [...walls, ...tokens]);
    Matter.Render.run(render);
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    const bump = () => {
      tokens.forEach((token: any, index: number) => {
        const safeX = clamp(token.position.x, 58, rect.width - 58);
        const safeY = clamp(token.position.y, 56, rect.height - 74);
        Matter.Body.setPosition(token, { x: safeX, y: safeY });
        Matter.Body.setVelocity(token, { x: 0, y: 0 });
        Matter.Body.applyForce(token, token.position, {
          x: index % 2 ? 0.006 : -0.006,
          y: -0.012 - (index % 5) * 0.001,
        });
      });
    };
    scene.addEventListener('click', bump);

    return () => {
      scene.removeEventListener('click', bump);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, [mode, shakeCount, tokenCount, totalHours]);

  const chooseMode = (nextMode: JarMode) => {
    setMode(nextMode);
    setShakeCount((value) => value + 1);
  };

  return (
    <div className="physics-wrap">
      <div className="time-machine">
        {mode === 'shake' && <div className="physics-jar" ref={sceneRef} />}
        {mode === 'rain' && (
          <div className="rain-stage" aria-label="Hours raining down">
            {Array.from({ length: tokenCount + 18 }).map((_, index) => (
              <span
                className="time-drop"
                key={index}
                style={
                  {
                    '--i': index,
                    '--x': `${8 + ((index * 17) % 84)}%`,
                    '--delay': `${(index % 11) * 0.14}s`,
                  } as CSSProperties
                }
              >
                {index % 3 === 0 ? '1h' : index % 3 === 1 ? 'scroll' : 'lost'}
              </span>
            ))}
            <strong>{whole(totalHours)} hours</strong>
          </div>
        )}
        {mode === 'magnet' && (
          <div className="magnet-stage" aria-label="Phone magnet pulling time">
            <span className="magnet-phone">
              <b />
            </span>
            {Array.from({ length: 18 }).map((_, index) => (
              <span
                className="magnet-chip"
                key={index}
                style={{ '--i': index } as CSSProperties}
              >
                {index % 2 ? 'plan' : 'ping'}
              </span>
            ))}
          </div>
        )}
        {mode === 'reset' && (
          <div className="reset-stage" aria-label="Reset plan">
            <span>make it smaller</span>
            <strong>{whole(totalHours / 5)} hours a year</strong>
            <p>Save one hour a day and the five-year pile drops hard.</p>
            <div>
              <b>charge outside bedroom</b>
              <b>delete one trap app</b>
              <b>walk before scrolling</b>
            </div>
          </div>
        )}
      </div>
      <div className="jar-controls">
        {(['shake', 'rain', 'magnet', 'reset'] as JarMode[]).map((item) => (
          <button
            className={mode === item ? 'selected' : ''}
            key={item}
            onClick={() => chooseMode(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p>
        {mode === 'shake'
          ? 'Tap the jar to stir the pile.'
          : mode === 'rain'
            ? 'The hours fall like weather.'
            : mode === 'magnet'
              ? 'The phone pulls plans into pings.'
              : 'A tiny plan beats a giant number.'}
      </p>
    </div>
  );
}

function TravelPlannerMap({ loops }: { loops: number }) {
  const plannedCountries = [
    {
      atlasName: 'United States of America',
      name: 'United States',
      coords: [-98, 38],
      states: ['California', 'New York', 'Colorado', 'Hawaii'],
      plan: ['road trip the coast', 'learn street photography', 'watch one sunrise without a phone'],
    },
    {
      atlasName: 'Brazil',
      name: 'Brazil',
      coords: [-52, -10],
      states: ['Rio', 'Bahia', 'Amazonas', 'Sao Paulo'],
      plan: ['dance class', 'rainforest walk', 'beach football afternoon'],
    },
    {
      atlasName: 'France',
      name: 'France',
      coords: [2, 46],
      states: ['Paris', 'Provence', 'Normandy', 'Lyon'],
      plan: ['museum day', 'bakery crawl', 'train window notebook'],
    },
    {
      atlasName: 'India',
      name: 'India',
      coords: [78, 22],
      states: ['Goa', 'Kerala', 'Rajasthan', 'Himachal'],
      plan: ['monsoon train ride', 'food walk', 'mountain weekend'],
    },
    {
      atlasName: 'Japan',
      name: 'Japan',
      coords: [138, 37],
      states: ['Tokyo', 'Kyoto', 'Hokkaido', 'Okinawa'],
      plan: ['night walk', 'ramen counter', 'temple morning'],
    },
    {
      atlasName: 'Australia',
      name: 'Australia',
      coords: [134, -25],
      states: ['NSW', 'Victoria', 'Queensland', 'Tasmania'],
      plan: ['reef day', 'long train ride', 'camera-only walk'],
    },
  ];
  const mapWidth = 780;
  const mapHeight = 430;
  const projection = useMemo(
    () => geoNaturalEarth1().fitSize([mapWidth, mapHeight], { type: 'Sphere' } as any),
    [],
  );
  const path = useMemo(() => geoPath(projection), [projection]);
  const countryFeatures = useMemo(
    () =>
      (feature(
        worldAtlas as any,
        (worldAtlas as any).objects.countries,
      ) as any).features as Array<any>,
    [],
  );
  const [selectedName, setSelectedName] = useState('India');
  const selectedFeature =
    countryFeatures.find((country) => country.properties.name === selectedName) ??
    countryFeatures.find((country) => country.properties.name === 'India') ??
    countryFeatures[0];
  const selectedMeta =
    plannedCountries.find((country) => country.atlasName === selectedName) ??
    plannedCountries.find((country) => country.name === selectedName) ?? {
      atlasName: selectedName,
      name: selectedName || 'Pick a country',
      coords: [0, 10],
      states: ['Capital area', 'Old town', 'Coast', 'Nature day'],
      plan: ['walk without notifications', 'try one local meal', 'take ten photos and keep the phone away'],
    };
  const selectedPoint =
    projection(selectedMeta.coords as [number, number]) ??
    (selectedFeature ? path.centroid(selectedFeature) : [mapWidth / 2, mapHeight / 2]);
  const [selectedState, setSelectedState] = useState(selectedMeta.states[0]);
  const freeDays = Math.max(2, Math.round(loops * 1.4));
  const zoomSize = selectedName ? 265 : 780;
  const zoomX = clamp(selectedPoint[0] - zoomSize / 2, 0, mapWidth - zoomSize);
  const zoomY = clamp(selectedPoint[1] - zoomSize / 2, 0, mapHeight - zoomSize * 0.55);

  const pickCountry = (name: string) => {
    const meta =
      plannedCountries.find((country) => country.atlasName === name) ??
      plannedCountries.find((country) => country.name === name);
    setSelectedName(name);
    setSelectedState(meta?.states[0] ?? 'Capital area');
  };

  return (
    <div className="travel-planner">
      <div className="map-card">
        <svg
          aria-label="Clickable world map"
          role="img"
          viewBox={`${zoomX} ${zoomY} ${zoomSize} ${zoomSize * 0.55}`}
        >
          <rect className="ocean" height={mapHeight} width={mapWidth} x="0" y="0" />
          <path className="sphere-line" d={path({ type: 'Sphere' } as any) ?? undefined} />
          {countryFeatures.map((country) => {
            const name = country.properties.name;
            const countryPath = path(country);
            if (!countryPath) return null;
            return (
            <g
              aria-label={`Choose ${name}`}
              className={selectedName === name ? 'country selected' : 'country'}
              key={country.id ?? name}
              onClick={() => pickCountry(name)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') pickCountry(name);
              }}
              role="button"
              tabIndex={0}
            >
              <path d={countryPath} />
            </g>
          )})}
          <path className="route-line" d={`M390 214 Q${selectedPoint[0]} 42 ${selectedPoint[0]} ${selectedPoint[1]}`} />
          <circle className="map-pin" cx={selectedPoint[0]} cy={selectedPoint[1]} r="7" />
        </svg>
        <button
          className="world-reset"
          onClick={() => {
            setSelectedName('');
            setSelectedState('Capital area');
          }}
        >
          World view
        </button>
      </div>
      <div className="planner-panel">
        <span>Spend the time somewhere</span>
        <strong>{selectedMeta.name}</strong>
        <p>
          Your yearly phone time could become about {freeDays} loose travel days.
          Pick a place inside it.
        </p>
        <div className="state-buttons">
          {selectedMeta.states.map((state) => (
            <button
              className={selectedState === state ? 'selected' : ''}
              key={state}
              onClick={() => setSelectedState(state)}
            >
              {state}
            </button>
          ))}
        </div>
        <div className="trip-card">
          <b>{selectedState}</b>
          {selectedMeta.plan.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function DecadeTimeline({ decadeYears }: { decadeYears: number }) {
  const totalPercent = clamp(decadeYears / 10, 0, 1);
  const [activeYear, setActiveYear] = useState(0);
  const [mode, setMode] = useState<TimelineMode>('phone');
  const selectedFill = clamp(totalPercent * 10 - activeYear, 0, 1);
  const activeText =
    mode === 'phone'
      ? `${fmt(selectedFill, 2)} year of phone shadow lands here.`
      : `${fmt(selectedFill * 365, 0)} days you could spend somewhere else.`;

  return (
    <div className="timeline-lab">
      <div className="timeline-controls" aria-label="Timeline view">
        <button
          aria-pressed={mode === 'phone'}
          className={mode === 'phone' ? 'selected' : ''}
          onClick={() => setMode('phone')}
          type="button"
        >
          Phone shadow
        </button>
        <button
          aria-pressed={mode === 'life'}
          className={mode === 'life' ? 'selected' : ''}
          onClick={() => setMode('life')}
          type="button"
        >
          Life version
        </button>
      </div>
      <div className="timeline" aria-label={`${fmt(decadeYears, 2)} years in a decade`}>
        {Array.from({ length: 10 }).map((_, index) => {
          const fill = clamp(totalPercent * 10 - index, 0, 1);
          return (
            <button
              className={`${activeYear === index ? 'year-block active' : 'year-block'} ${mode}`}
              key={index}
              onClick={() => setActiveYear(index)}
            >
              <span className="timeline-fill" style={{ '--fill': fill } as CSSProperties} />
              <b>{2027 + index}</b>
              <small>{mode === 'life' ? 'claim' : 'scroll'}</small>
            </button>
          );
        })}
      </div>
      <div className="year-inspector">
        <span>Year {activeYear + 1}</span>
        <strong>{mode === 'phone' ? fmt(selectedFill, 2) : fmt(selectedFill * 365, 0)}</strong>
        <p>{activeText} Tap years and flip the view.</p>
      </div>
    </div>
  );
}

function DiscomfortLab({ decadeYears }: { decadeYears: number }) {
  const prompts = [
    {
      title: 'Small leaks',
      value: `${fmt(decadeYears * 365, 0)} days`,
      note: 'The scary part is not one session. It is the daily leak.',
    },
    {
      title: 'Lost mornings',
      value: `${fmt(decadeYears * 52, 0)} weeks`,
      note: 'A decade quietly turns spare minutes into missing weeks.',
    },
    {
      title: 'Still fixable',
      value: '1 choice',
      note: 'Change one habit and the math starts bending back.',
    },
  ];
  const [active, setActive] = useState(0);

  return (
    <div className="discomfort-lab">
      {prompts.map((prompt, index) => (
        <button
          aria-pressed={active === index}
          className={active === index ? 'selected' : ''}
          key={prompt.title}
          onClick={() => setActive(index)}
          type="button"
        >
          <span>{prompt.title}</span>
          <b>{prompt.value}</b>
          <small>{prompt.note}</small>
        </button>
      ))}
    </div>
  );
}

function DecadeChallenge({
  dailyHours,
  decadeYears,
}: {
  dailyHours: number;
  decadeYears: number;
}) {
  const [cut, setCut] = useState(30);
  const [target, setTarget] = useState<YearPlan>('skill');
  const savedYears = decadeYears * (cut / 100);
  const newDaily = dailyHours * (1 - cut / 100);
  const targetCopy: Record<YearPlan, string> = {
    sleep: `${fmt(savedYears * 365, 0)} calmer nights`,
    people: `${fmt(savedYears * 52, 0)} free weekends`,
    skill: `${fmt(savedYears * 12, 0)} serious months of practice`,
    travel: `${fmt(savedYears * 9, 0)} slow trips or escapes`,
  };

  return (
    <div className="decade-challenge">
      <label>
        <span>Try reclaiming {cut}%</span>
        <input
          aria-label="Percent of phone time to reclaim"
          max="80"
          min="10"
          onChange={(event) => setCut(Number(event.target.value))}
          step="5"
          type="range"
          value={cut}
        />
      </label>
      <div>
        <b>{fmt(savedYears, 2)} years back</b>
        <p>New daily number: about {fmt(newDaily)} hours.</p>
        <div className="reclaim-targets">
          {(Object.keys(targetCopy) as YearPlan[]).map((item) => (
            <button
              aria-pressed={target === item}
              className={target === item ? 'selected' : ''}
              key={item}
              onClick={() => setTarget(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
        <strong>{targetCopy[target]}</strong>
      </div>
    </div>
  );
}

function ShareCard({
  cardRef,
  dailyHours,
  decadeYears,
  movies,
}: {
  cardRef: RefObject<HTMLDivElement | null>;
  dailyHours: number;
  decadeYears: number;
  movies: number;
}) {
  return (
    <div className="share-card" ref={cardRef}>
      <span className="share-label">How much have you scrolled?</span>
      <p>I spend about {fmt(dailyHours)} hours on my phone every day.</p>
      <strong>{fmt(decadeYears, 2)} years of the next decade.</strong>
      <small>Also: roughly {whole(movies)} movies a year.</small>
    </div>
  );
}

export default function ScrollLife() {
  const [dailyHours, setDailyHours] = useState(4);
  const [started, setStarted] = useState(false);
  const [choice, setChoice] = useState<Choice>('none');
  const [secretTaps, setSecretTaps] = useState(0);
  const [mood, setMood] = useState<Mood>('normal');
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);
  const playBeep = useBeep();
  const totals = useMemo(() => getTotals(dailyHours), [dailyHours]);
  const activeProfile = MOOD_PROFILES[mood];
  const moodLine = `${activeProfile.title} ${activeProfile.description}`;

  function updateDailyHours(hours: number) {
    setDailyHours(hours);
    const closestMood = (Object.keys(MOOD_PROFILES) as Mood[]).reduce((closest, item) =>
      Math.abs(MOOD_PROFILES[item].hours - hours) < Math.abs(MOOD_PROFILES[closest].hours - hours)
        ? item
        : closest,
    );
    setMood(closestMood);
  }

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 0.9 });
    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.scene').forEach((scene) => {
        const reveals = scene.querySelectorAll('.reveal');
        if (!reveals.length) return;
        gsap.fromTo(
          reveals,
          { opacity: 0.18, y: 80, rotate: -1 },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            ease: 'power2.out',
            stagger: 0.06,
            scrollTrigger: {
              trigger: scene,
              start: 'top 78%',
              end: 'center 38%',
              scrub: true,
            },
          },
        );
      });

      const progressThumb = document.querySelector('.progress-thumb');
      if (progressThumb) {
        gsap.to(progressThumb, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { end: 'bottom bottom', scrub: true, start: 0 },
        });
      }

      const timelineFills = document.querySelectorAll('.timeline-fill');
      if (timelineFills.length) {
        gsap.to(timelineFills, {
          scaleY: 1,
          ease: 'none',
          stagger: 0.035,
          scrollTrigger: {
            trigger: '.timeline-scene',
            start: 'top 70%',
            end: 'bottom 65%',
            scrub: true,
          },
        });
      }

      const decadeScene = document.querySelector('.decade-scene');
      if (decadeScene) {
        gsap.to(decadeScene, {
          backgroundColor: '#111111',
          ease: 'none',
          scrollTrigger: {
            trigger: decadeScene,
            start: 'top 80%',
            end: 'bottom 25%',
            scrub: true,
          },
        });
      }
    }, rootRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    if (choice !== 'outside') return;
    playBirdChirp();
  }, [choice]);

  const begin = () => {
    setStarted(true);
    playBeep();
    requestAnimationFrame(() => {
      document.getElementById('this-week')?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  const share = async () => {
    const text = `I spend about ${fmt(dailyHours)} hours on my phone every day. At this rate, that is ${fmt(totals.decadeYears, 2)} years of the next decade.`;

    if (navigator.share) {
      await navigator.share({ title: 'How much have you scrolled?', text });
      return;
    }

    await navigator.clipboard?.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1700);
  };

  const saveCard = async () => {
    if (!cardRef.current) return;
    const url = await toPng(cardRef.current, {
      backgroundColor: '#f7f6f2',
      pixelRatio: 2,
    });
    const link = document.createElement('a');
    link.href = url;
    link.download = 'how-much-have-you-scrolled.png';
    link.click();
  };

  return (
    <main
      className={choice === 'outside' ? 'experience outside-mode' : 'experience'}
      ref={rootRef}
    >
      <div aria-hidden="true" className="progress-rail">
        <span className="progress-thumb" />
      </div>

      <section aria-label="Screen time input" className="opening">
        <div className="opening-copy">
          <p className="eyebrow">an internet experiment about your thumb</p>
          <h1>How much of your life have you scrolled away?</h1>
          <p>Pick your daily phone time. The page will do the uncomfortable math.</p>
        </div>

        <div className="control-row">
          <label className="slider-wrap">
            <span>{fmt(dailyHours)} hours every day</span>
            <input
              aria-label="Daily phone hours"
              max="12"
              min="0"
              onChange={(event) => {
                updateDailyHours(Number(event.target.value));
                playBeep();
              }}
              step="0.1"
              type="range"
              value={dailyHours}
            />
            <small>
              <b>0 hours</b>
              <b>12+ hours</b>
            </small>
          </label>

          <PhoneIllustration
            dailyHours={dailyHours}
            onSecretTap={() => {
              setSecretTaps((value) => value + 1);
              playBeep();
            }}
          />
        </div>

        <StatRibbon totals={totals} />
        <button className="primary-button" onClick={begin}>
          Show me
        </button>
        <span className={secretTaps > 4 ? 'secret visible' : 'secret'}>
          tiny earthquake unlocked
        </span>
      </section>

      <section className={started ? 'scene active day-scene' : 'scene day-scene'}>
        <div className="reveal">
          <p className="kicker">First, one ordinary day</p>
          <h2>{fmt(dailyHours)} hours</h2>
          <p className="scene-line">{moodLine}</p>
        </div>
        <DayStrip dailyHours={dailyHours} />
        <HabitDial mood={mood} setDailyHours={setDailyHours} setMood={setMood} />
      </section>

      <section className="scene week-scene" id="this-week">
        <div className="reveal">
          <p className="kicker">This week</p>
          <h2>{whole(totals.weeklyHours)} hours</h2>
          <p className="scene-line">Each tiny phone is roughly one hour. They pile up fast.</p>
        </div>
        <PhoneStack weeklyHours={totals.weeklyHours} />
      </section>

      <section className="scene year-scene">
        <div className="reveal">
          <p className="kicker">This year</p>
          <h2>{fmt(totals.annualDays)} days</h2>
          <p className="scene-line">
            About {fmt(totals.annualDays / DAYS_PER_MONTH)} months, or {whole(totals.workdays)} working days.
          </p>
        </div>
        <CalendarBurn annualDays={totals.annualDays} />
      </section>

      <section className="scene compare-scene">
        <div className="reveal">
          <p className="kicker">The swaps get weird</p>
          <h2 className="compact-heading">Pick a different life</h2>
          <p className="scene-line">Tap a swap. The math becomes a tiny plan.</p>
        </div>
        <ComparisonDeck totals={totals} />
      </section>

      <section className="scene physics-scene">
        <div className="reveal">
          <p className="kicker">Five-year pile</p>
          <h2>{whole(totals.fiveYearHours)} hours</h2>
          <p className="scene-line">Every falling token is a chunk of time. It refuses to stay neat.</p>
        </div>
        <PhysicsJar totalHours={totals.fiveYearHours} />
      </section>

      <section className="scene cinema-scene">
        <CinemaStudio movies={totals.movies} />
      </section>

      <section className="scene travel-scene">
        <div className="reveal">
          <p className="kicker">You could have flown somewhere instead</p>
          <h2>{fmt(totals.earthLoops)}</h2>
          <p className="scene-line">
            world-loop equivalents. Choose a country, then plan one tiny piece of a different life.
          </p>
        </div>
        <TravelPlannerMap loops={totals.earthLoops} />
      </section>

      <section className="scene pause-scene">
        <div className="reveal">
          <h2>Now let&apos;s make this uncomfortable.</h2>
        </div>
        <DiscomfortLab decadeYears={totals.decadeYears} />
      </section>

      <section className="scene decade-scene">
        <div className="reveal">
          <p className="kicker">If nothing changes...</p>
          <h2 className="decade-number">
            {fmt(totals.decadeYears, 2)} <span>years</span>
          </h2>
          <p className="scene-line">of the next decade spent looking at your phone.</p>
        </div>
        <DecadeChallenge
          dailyHours={totals.dailyHours}
          decadeYears={totals.decadeYears}
        />
      </section>

      <section className="scene timeline-scene">
        <div className="timeline-intro reveal">
          <p className="kicker">Ten years</p>
          <h2>Watch the phone part take over.</h2>
        </div>
        <DecadeTimeline decadeYears={totals.decadeYears} />
      </section>

      <section className="scene final-question">
        <div className="final-card reveal">
          <h2>Worth it?</h2>
          <p>
            Your current number is {fmt(totals.decadeYears, 2)} years per decade. Pick the ending
            you want the page to remember.
          </p>
          <div className="choice-row">
            <button onClick={() => setChoice('respect')}>Absolutely.</button>
            <button onClick={() => setChoice('outside')}>
              I should probably go outside.
            </button>
          </div>
          <div className="final-meter" aria-label="Decision meter">
            <span style={{ transform: `scaleX(${choice === 'outside' ? 0.82 : choice === 'respect' ? 0.22 : 0.5})` }} />
            <b>{choice === 'outside' ? 'life wins' : choice === 'respect' ? 'feed wins' : 'undecided'}</b>
          </div>
        </div>

        {choice === 'respect' && (
          <div aria-live="polite" className="respect-burst">
            {Array.from({ length: 70 }).map((_, index) => (
              <span key={index} style={{ '--i': index } as CSSProperties}>
                {['!', '♥', '▶', '99+', '#'][index % 5]}
              </span>
            ))}
            <strong>Respect.</strong>
          </div>
        )}

        {choice === 'outside' && (
          <div aria-live="polite" className="outside-scene">
            <button
              aria-label="Sun"
              className="sun"
              onClick={(event) => event.currentTarget.classList.add('bounce')}
            />
            <span className="cloud one" />
            <span className="cloud two" />
            <span className="grass" />
            <strong>Good idea.</strong>
          </div>
        )}
      </section>

      <section className="scene share-scene">
        <ShareCard
          cardRef={cardRef}
          dailyHours={dailyHours}
          decadeYears={totals.decadeYears}
          movies={totals.movies}
        />
        <div className="share-actions">
          <button onClick={share}>{copied ? 'Copied' : 'Share result'}</button>
          <button onClick={saveCard}>Save image</button>
          <button
            onClick={() => {
              setStarted(false);
              setChoice('none');
              window.scrollTo({ behavior: 'smooth', top: 0 });
            }}
          >
            Try another number
          </button>
        </div>
      </section>
    </main>
  );
}
