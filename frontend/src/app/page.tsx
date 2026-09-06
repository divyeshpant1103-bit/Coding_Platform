export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-4xl font-bold tracking-widest text-utopia-accent">
        BREAK THE CODE
      </h1>
      <p className="text-lg text-white/80">Think. Debug. Crack. Win.</p>
      {/* TODO: registration CTA, rules preview, countdown to event start */}
      <a
        href="/register"
        className="rounded-md border border-utopia-accent px-6 py-3 uppercase tracking-wide text-utopia-accent hover:bg-utopia-accent hover:text-utopia-bg transition"
      >
        Join the Mission
      </a>
    </main>
  );
}
