"use client";

import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Reveal } from "@/components/Reveal";

const reservationSchema = z.object({
  name: z.string().min(2, "Bitte geben Sie Ihren Namen ein."),
  email: z.string().email("Bitte eine gültige Email-Adresse eingeben."),
  phone: z.string().min(5, "Bitte eine gültige Telefonnummer eingeben."),
  date: z.string().min(1, "Bitte ein Datum wählen."),
  time: z.string().min(1, "Bitte eine Uhrzeit wählen."),
  guests: z
    .number()
    .int()
    .min(1, "Mindestens 1 Person.")
    .max(20, "Maximal 20 Personen."),
});

type ReservationForm = z.infer<typeof reservationSchema>;

const OPEN_HOURS: ReadonlyArray<{ days: string; hours: string }> = [
  { days: "Di – Fr", hours: "10:00 – 21:00 Uhr" },
  { days: "Sa – So", hours: "11:00 – 22:00 Uhr" },
  { days: "Mo", hours: "Geschlossen" },
];

const INPUT_CLASS =
  "w-full border border-border bg-bg px-4 py-3 text-base text-ink transition-colors focus:border-ink focus:outline-none";

const LABEL_CLASS =
  "mb-2 block text-xs font-medium uppercase tracking-wider text-ink-muted";

const ERROR_CLASS = "mt-1 text-xs text-accent";

export function Reservation() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReservationForm>({
    resolver: zodResolver(reservationSchema),
    defaultValues: { guests: 2 },
  });

  useEffect(() => {
    if (!submitted) return;
    const t = setTimeout(() => setSubmitted(false), 6000);
    return () => clearTimeout(t);
  }, [submitted]);

  const onSubmit = async (data: ReservationForm) => {
    await new Promise((r) => setTimeout(r, 600));
    // eslint-disable-next-line no-console
    console.log("Reservation request:", data);
    setSubmitted(true);
    reset({ guests: 2 });
  };

  return (
    <section
      id="reservation"
      className="scroll-mt-20 bg-bg-dark px-6 py-16 sm:px-8 md:py-24 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          <Reveal className="flex flex-col gap-8 text-ink-on-dark">
            <p className="text-xs uppercase tracking-[0.3em] text-ink-muted-on-dark">
              Reservierung
            </p>
            <h2 className="text-h1">
              Reservieren Sie jetzt Ihren Tisch und genießen Sie ein
              unvergessliches Erlebnis.
            </h2>
            <div>
              <h3 className="mb-4 text-sm uppercase tracking-[0.2em] text-ink-muted-on-dark">
                Öffnungszeiten
              </h3>
              <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-2 text-sm">
                {OPEN_HOURS.map(({ days, hours }) => (
                  <Fragment key={days}>
                    <dt className="text-ink-on-dark">{days}</dt>
                    <dd className="text-ink-muted-on-dark">{hours}</dd>
                  </Fragment>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={150} className="bg-bg p-6 sm:p-8 lg:p-10">
            {submitted && (
              <div
                role="status"
                aria-live="polite"
                className="mb-6 border border-border bg-bg-cream p-4 text-sm text-ink"
              >
                Vielen Dank — Ihre Reservierungs-Anfrage wurde gesendet. Wir
                melden uns innerhalb eines Tages.
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-5"
            >
              <div>
                <label htmlFor="name" className={LABEL_CLASS}>
                  Ihr Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="z. B. Anna Schmidt"
                  aria-invalid={!!errors.name}
                  {...register("name")}
                  className={INPUT_CLASS}
                />
                {errors.name && (
                  <p className={ERROR_CLASS}>{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className={LABEL_CLASS}>
                  Email-Adresse
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="z. B. anna@beispiel.de"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                  className={INPUT_CLASS}
                />
                {errors.email && (
                  <p className={ERROR_CLASS}>{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className={LABEL_CLASS}>
                  Telefon
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="z. B. +49 30 12345678"
                  aria-invalid={!!errors.phone}
                  {...register("phone")}
                  className={INPUT_CLASS}
                />
                {errors.phone && (
                  <p className={ERROR_CLASS}>{errors.phone.message}</p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="date" className={LABEL_CLASS}>
                    Datum
                  </label>
                  <input
                    id="date"
                    type="date"
                    aria-invalid={!!errors.date}
                    {...register("date")}
                    className={INPUT_CLASS}
                  />
                  {errors.date && (
                    <p className={ERROR_CLASS}>{errors.date.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="time" className={LABEL_CLASS}>
                    Uhrzeit
                  </label>
                  <input
                    id="time"
                    type="time"
                    aria-invalid={!!errors.time}
                    {...register("time")}
                    className={INPUT_CLASS}
                  />
                  {errors.time && (
                    <p className={ERROR_CLASS}>{errors.time.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="guests" className={LABEL_CLASS}>
                    Personen
                  </label>
                  <select
                    id="guests"
                    aria-invalid={!!errors.guests}
                    {...register("guests", { valueAsNumber: true })}
                    className={INPUT_CLASS}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "Person" : "Personen"}
                      </option>
                    ))}
                  </select>
                  {errors.guests && (
                    <p className={ERROR_CLASS}>{errors.guests.message}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-ink px-6 py-4 text-xs font-medium uppercase tracking-wider text-bg-cream transition-colors duration-200 hover:bg-ink-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Wird gesendet…" : "Jetzt reservieren"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
