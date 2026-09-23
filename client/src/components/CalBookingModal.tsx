import { useEffect, useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { getCalBookingUrl } from "@/lib/calBooking";

type BookingDetails = {
  name: string;
  email: string;
};

type CalBookingModalProps = BookingDetails & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CalBookingModal({ open, onOpenChange, name, email }: CalBookingModalProps) {
  const bookingUrl = useMemo(() => getCalBookingUrl({ name, email }), [email, name]);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => {
      document.querySelector<HTMLIFrameElement>("#orya-cal-booking")?.focus();
    }, 250);
    return () => window.clearTimeout(timer);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="cal-booking-modal" showCloseButton>
        <DialogTitle>Choose your discovery time.</DialogTitle>
        <DialogDescription>
          Your details are prefilled. Select a time that works and keep the conversation moving.
        </DialogDescription>
        <iframe
          id="orya-cal-booking"
          title="Book an ORYA Discovery Call"
          src={bookingUrl}
          className="cal-booking-modal__frame"
          allow="camera; microphone; fullscreen; payment"
        />
        <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="cal-booking-modal__fallback">
          Open calendar in a new tab <ArrowUpRight size={15} />
        </a>
      </DialogContent>
    </Dialog>
  );
}
