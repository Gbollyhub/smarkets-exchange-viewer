import Button from "@/components/Button";
import Input from "@/components/Input";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import useAuth from "@/hooks/useAuth";

export default function LoginForm() {
  const SMARKET_CLIENT_URL = import.meta.env.VITE_SMARKET_CLIENT_URL;
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    rememberDevice,
    saveRememberDevice,
    canContinue,
    loginMutation,
    handleLoginSubmit,
  } = useAuth();

  return (
    <div className="relative flex w-full flex-col mt-20 mt-0 md:justify-center md:items-center px-6 py-8 md:w-3/5 md:px-14 lg:px-20 bg-transparent">
      <form onSubmit={handleLoginSubmit} className="flex flex-col w-full">
        {/* headline row */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#00211F]">Welcome back</h1>
        </div>
        {/* form card */}
        <div className="rounded-xl border border-[#EDEDED] bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold text-[#00211F]">
            Login with your credentials
          </h2>

          <div className="flex flex-col gap-4">
            <Input placeholder="Email" value={email} onChange={setEmail} />

            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={setPassword}
            >
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-gray-400 hover:text-[#00211F] transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </Input>
            <a
              href={`${SMARKET_CLIENT_URL}/members/forgot-password/`}
              className="text-sm font-medium text-[#00B073] hover:underline"
            >
              Forgot your password?
            </a>

            {/* remember device */}
            <label className="flex cursor-pointer items-start gap-3">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => saveRememberDevice(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="h-4 w-4 rounded border border-[#EDEDED] bg-white peer-checked:border-[#00B073] peer-checked:bg-[#00B073] transition" />
                {rememberDevice && (
                  <svg
                    viewBox="0 0 12 12"
                    className="absolute inset-0 h-4 w-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2 6l3 3 5-5"
                    />
                  </svg>
                )}
              </div>
              <span className="text-sm text-gray-500 leading-relaxed">
                Remember me on this device
              </span>
            </label>

            {/* CTA */}
            <Button
              type="submit"
              variant="primary"
              disabled={!canContinue || loginMutation.isPending}
              className="mt-1 w-full py-3 text-sm"
            >
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </Button>
            <div className="flex justify-center">
              <a
                href={`${SMARKET_CLIENT_URL}/members/signup/`}
                className="text-sm font-medium text-[#00B073] hover:underline"
              >
                Create Account
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
