import { describe, expect, it } from "vitest";
import { getCalBookingUrl } from "./calBooking";

describe("getCalBookingUrl", () => {
  it("creates an ORYA discovery link with encoded prefilled visitor details", () => {
    const url = new URL(getCalBookingUrl({
      name: "Amani Kabila",
      email: "amani+orya@example.com",
    }));

    expect(url.origin).toBe("https://cal.com");
    expect(url.pathname).toBe("/contact-orya.global/discoverycall");
    expect(url.searchParams.get("name")).toBe("Amani Kabila");
    expect(url.searchParams.get("email")).toBe("amani+orya@example.com");
    expect(url.searchParams.get("utm_source")).toBe("orya.global");
    expect(url.searchParams.get("utm_medium")).toBe("discovery_form");
  });
});
