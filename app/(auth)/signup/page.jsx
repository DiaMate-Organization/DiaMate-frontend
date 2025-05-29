import { SignUpForm } from "./components/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="w-full max-w-md">
        <SignUpForm />
      </div>
    </div>
  );
}