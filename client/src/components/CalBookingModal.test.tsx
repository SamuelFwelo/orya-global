import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/ui/dialog", () => ({
  Dialog: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  DialogClose: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  DialogContent: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <section className={className}>{children}</section>
  ),
  DialogDescription: ({ children }: { children: React.ReactNode }) => <p>{children}</p>,
  DialogTitle: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
}));

import { CalBookingModal } from "./CalBookingModal";

describe("CalBookingModal", () => {
  it("shows a visible Return to ORYA control while the calendar is open", () => {
    const markup = renderToStaticMarkup(
      <CalBookingModal
        open
        onOpenChange={() => undefined}
        name="Amani Kabila"
        email="amani@example.com"
      />,
    );

    expect(markup).toContain("Return to ORYA");
    expect(markup).toContain("cal-booking-modal__exit");
    expect(markup).toContain("cal-booking-modal__frame");
  });
});
