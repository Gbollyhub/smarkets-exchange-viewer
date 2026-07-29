import footballImg from "@/assets/american-football-light.png";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <>
      {/* ── body ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-1">
        {/* ── left: form panel ─────────────────────────────────────────────── */}
        <LoginForm />
        {/* ── right: hero image panel ───────────────────────────────────────── */}
        <div className="hidden md:block md:w-4/5 relative overflow-hidden">
          <img
            src={footballImg}
            alt="American football players"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        </div>
      </div>
    </>
  );
}
