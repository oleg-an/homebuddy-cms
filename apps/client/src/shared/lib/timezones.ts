export enum AllowedTimezones {
  AMERICA_NEW_YORK = 'America/New_York',
  AMERICA_CHICAGO = 'America/Chicago',
  AMERICA_DENVER = 'America/Denver',
  AMERICA_LOS_ANGELES = 'America/Los_Angeles',
  AMERICA_PHOENIX = 'America/Phoenix',
}

export const AllowedTimezonesValues = [
  AllowedTimezones.AMERICA_NEW_YORK,
  AllowedTimezones.AMERICA_CHICAGO,
  AllowedTimezones.AMERICA_DENVER,
  AllowedTimezones.AMERICA_LOS_ANGELES,
  AllowedTimezones.AMERICA_PHOENIX,
] as const;

export type Timezone = (typeof AllowedTimezonesValues)[number];

export const timezoneOptions = [
  {
    id: AllowedTimezones.AMERICA_NEW_YORK,
    text: '(UTC -4) ET, Eastern Time (New York)',
  },
  {
    id: AllowedTimezones.AMERICA_CHICAGO,
    text: '(UTC -5) CT, Central Time (Chicago)',
  },
  {
    id: AllowedTimezones.AMERICA_DENVER,
    text: '(UTC -6) MT, Mountain Time (Salt Lake City)',
  },
  {
    id: AllowedTimezones.AMERICA_LOS_ANGELES,
    text: '(UTC -7) PT, Pacific Time (Los Angeles)',
  },
  {
    id: AllowedTimezones.AMERICA_PHOENIX,
    text: '(UTC -7) MT, Mountain Time (Phoenix)',
  },
];

export const getTimezone = (): AllowedTimezones => {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone as Timezone;

  if (AllowedTimezonesValues.includes(userTimezone)) {
    return userTimezone;
  }

  return AllowedTimezones.AMERICA_NEW_YORK;
};
