import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: "Privacy Policy | Agent Globe", description: "Agent Globe privacy policy. 100% client-side — no data collected.", robots: { index: true, follow: true } };

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-white">Privacy Policy</h1>
          <p className="mt-2 text-sm text-gray-500">Last updated: March 16, 2026</p>
          <div className="mt-8 space-y-6 text-gray-400 leading-relaxed">
            <h2 className="text-xl font-bold text-white">Your Data Stays on Your Device</h2>
            <p>Agent Globe is a <strong className="text-white">100% client-side application</strong>. All agent registrations are stored in your browser&apos;s localStorage. No data is sent to or stored on our servers.</p>
            <h2 className="text-xl font-bold text-white">IP-Based Location Detection</h2>
            <p>When you visit Agent Globe, we use a third-party IP geolocation service (ipapi.co or ip-api.com) to determine your approximate city-level location. This request goes directly from your browser to the geolocation service — we never see or store your IP address.</p>
            <h2 className="text-xl font-bold text-white">No Tracking</h2>
            <p>We do not use tracking cookies, analytics that identify individuals, or any form of user profiling.</p>
            <h2 className="text-xl font-bold text-white">Advertising</h2>
            <p>We display advertisements through Google AdSense. These services may use cookies to serve relevant ads. You can opt out at <a href="https://adssettings.google.com" className="text-cyan-400 hover:underline" rel="noopener noreferrer" target="_blank">Google Ad Settings</a>.</p>
            <h2 className="text-xl font-bold text-white">Contact</h2>
            <p>Questions? <a href="mailto:privacy@toolboxlite.com" className="text-cyan-400 hover:underline">privacy@toolboxlite.com</a></p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
