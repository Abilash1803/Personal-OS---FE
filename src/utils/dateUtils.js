/**
 * Date formatting and time utilities for PersonalOS
 */

export const getTodayISODate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getFormattedTodayDate = () => {
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  return new Date().toLocaleDateString('en-US', options);
};

export const getFormattedDate = () => {
  return getFormattedTodayDate();
};

export const getDayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

export const getDaysRemainingInYear = () => {
  const now = new Date();
  const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const totalDays = isLeapYear(now.getFullYear()) ? 366 : 365;
  const currentDay = getDayOfYear();
  return Math.max(0, totalDays - currentDay);
};

export const getDayOfYearProgress = () => {
  const now = new Date();
  const dayOfYear = getDayOfYear();
  const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const totalDays = isLeapYear(now.getFullYear()) ? 366 : 365;

  return `Day ${dayOfYear} of ${totalDays}`;
};

export const getContextualGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) {
    const subs = [
      'Ready to make today count?',
      'Start your morning with focus.',
      'Fresh day, fresh momentum.',
    ];
    return {
      title: 'Good Morning 👋',
      subtitle: subs[Math.floor(Math.random() * subs.length)],
    };
  }

  if (hour < 17) {
    const subs = [
      "Let's finish today's goals.",
      'Keep up the great flow.',
      'Making solid progress.',
    ];
    return {
      title: 'Good Afternoon ☀️',
      subtitle: subs[Math.floor(Math.random() * subs.length)],
    };
  }

  const subs = [
    "Review today's progress.",
    'Unwind and reflect on your work.',
    'Wrap up your achievements.',
  ];
  return {
    title: 'Good Evening 🌙',
    subtitle: subs[Math.floor(Math.random() * subs.length)],
  };
};
