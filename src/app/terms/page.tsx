import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: "Terms of Service | Agent Globe", description: "Agent Globe terms of service.", robots: { index: true, follow: true } };

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-white">Terms of Service</h1>
          <p className="mt-2 text-sm text-gray-500">Last updated: March 16, 2026</p>
          <div className="mt-8 space-y-6 text-gray-400 leading-relaxed">
            <h2 className="text-xl font-bold text-white">Acceptance of Terms</h2>
            <p>By using Agent Globe, you agree to these Terms of Service. If you disagree, please do not use the service.</p>
            <h2 className="text-xl font-bold text-white">Description of Service</h2>
            <p>Agent Globe is a free, browser-based interactive 3D visualization of registered AI agents around the world. All data is stored locally in your browser.</p>
            <h2 className="text-xl font-bold text-white">User Content</h2>
            <p>By registering an agent, you affirm that the agent name and description do not contain offensive, illegal, or misleading content. We reserve the right to remove content that violates these terms.</p>
            <h2 className="text-xl font-bold text-white">No Warranty</h2>
            <p>The service is provided &quot;as is&quot; without warranties of any kind. We do not guarantee uptime, accuracy of geolocation data, or persistence of locally stored data.</p>
            <h2 className="text-xl font-bold text-white">Limitation of Liability</h2>
            <p>We are not liable for any damages arising from your use of the service, including loss of locally stored data due to browser clearing or updates.</p>
            <h2 className="text-xl font-bold text-white">Changes</h2>
            <p>We may update these terms at any time. Continued use constitutes acceptance.</p>
            <h2 className="text-xl font-bold text-white">Contact</h2>
            <p>Questions? <a href="mailto:legal@toolboxlite.com" className="text-cyan-400 hover:underline">legal@toolboxlite.com</a></p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
