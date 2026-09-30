import Link from "next/link";
import { Button } from "../../../components/ui/Button";

export default function Signup() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-slate-900">
            Join Leisure Hoppers
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Register your agency to get access to premium B2B rates.
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="agency-name" className="block text-sm font-medium text-slate-700">
                Agency Name
              </label>
              <input
                id="agency-name"
                name="agencyName"
                type="text"
                required
                className="mt-1 appearance-none rounded-lg relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Global Travel Partners"
              />
            </div>
            
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700">
                Contact Name
              </label>
              <input
                id="contact-name"
                name="contactName"
                type="text"
                required
                className="mt-1 appearance-none rounded-lg relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-slate-700">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 appearance-none rounded-lg relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 appearance-none rounded-lg relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <Button type="submit" variant="primary" className="w-full justify-center">
              Sign up as Agent
            </Button>
          </div>
          
          <div className="text-center mt-4">
             <p className="text-sm text-slate-600">
               Already have an account?{' '}
               <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                 Log in
               </Link>
             </p>
          </div>
        </form>
      </div>
    </div>
  );
}
