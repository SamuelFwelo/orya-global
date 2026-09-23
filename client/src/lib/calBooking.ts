export const CALENDAR_URL = "https://cal.com/contact-orya.global/discoverycall";

export type CalBookingDetails = {
  name: string;
  email: string;
};

export function getCalBookingUrl({ name, email }: CalBookingDetails) {
  const url = new URL(CALENDAR_URL);
  url.searchParams.set("name", name);
  url.searchParams.set("email", email);
  url.searchParams.set("utm_source", "orya.global");
  url.searchParams.set("utm_medium", "discovery_form");
  return url.toString();
}
