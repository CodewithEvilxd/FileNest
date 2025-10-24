import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative">
                <div className="h-7 w-7 md:h-8 md:w-8 bg-linear-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">F</span>
                </div>
              </div>
              <span className="text-xl md:text-2xl tracking-wide font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FileNest
              </span>
            </Link>
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-20">
        <div className="prose prose-lg max-w-none font-serif">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 font-serif">Terms of Service</h1>
          <p className="text-gray-600 mb-8 text-lg font-serif">Last updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing and using FileNest, you accept and agree to be bound by the terms and provision of this agreement.
              If you do not agree to abide by the above, please do not use this service.
            </p>
            <p className="text-gray-700 leading-relaxed">
              These Terms of Service ("Terms") govern your use of FileNest's cloud storage service and any related services provided by us.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              FileNest provides cloud-based file storage and sharing services. Our service includes:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Secure file storage and backup</li>
              <li>File sharing and collaboration tools</li>
              <li>Cross-device synchronization</li>
              <li>Web and mobile access</li>
              <li>Premium features for paid subscribers</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>

            <h3 className="text-xl font-medium mb-3">3.1 Account Creation</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              To use our service, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>

            <h3 className="text-xl font-medium mb-3">3.2 Account Responsibilities</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>You must provide accurate and complete information</li>
              <li>You are responsible for all activity on your account</li>
              <li>You must notify us immediately of any unauthorized use</li>
              <li>You may not share your account credentials with others</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use Policy</h2>

            <h3 className="text-xl font-medium mb-3">4.1 Permitted Use</h3>
            <p className="text-gray-700 leading-relaxed mb-4">You may use FileNest to store and share legitimate files including:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Personal documents and photos</li>
              <li>Business files and presentations</li>
              <li>Educational materials</li>
              <li>Creative projects and portfolios</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">4.2 Prohibited Activities</h3>
            <p className="text-gray-700 leading-relaxed mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Upload illegal, harmful, or offensive content</li>
              <li>Violate intellectual property rights</li>
              <li>Distribute malware or viruses</li>
              <li>Attempt to hack or compromise our systems</li>
              <li>Use the service for spam or harassment</li>
              <li>Exceed storage limits or abuse the service</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">5. Content Ownership and Rights</h2>

            <h3 className="text-xl font-medium mb-3">5.1 Your Content</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You retain ownership of all content you upload to FileNest. By uploading content, you grant us a limited license to store, process, and display your content as necessary to provide our service.
            </p>

            <h3 className="text-xl font-medium mb-3">5.2 Our Content</h3>
            <p className="text-gray-700 leading-relaxed">
              FileNest's website, software, and branding are protected by intellectual property laws. You may not copy, modify, or distribute our content without permission.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">6. Privacy and Data Protection</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We implement industry-standard security measures to protect your data, including encryption in transit and at rest.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">7. Service Availability and Changes</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              While we strive for high availability, we do not guarantee uninterrupted service. We may perform maintenance, updates, or changes to our service with reasonable notice when possible.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify or discontinue features, but we will not materially reduce service quality without providing alternatives or refunds for paid users.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">8. Billing and Payment</h2>

            <h3 className="text-xl font-medium mb-3">8.1 Free Tier</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our free tier provides 150 MB of storage. Usage limits apply to prevent abuse.
            </p>

            <h3 className="text-xl font-medium mb-3">8.2 Premium Subscriptions</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Subscriptions are billed in advance</li>
              <li>Payments are processed securely through our payment providers</li>
              <li>You can cancel subscriptions at any time</li>
              <li>Refunds are provided for unused portions of cancelled subscriptions</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">9. Termination</h2>

            <h3 className="text-xl font-medium mb-3">9.1 Termination by You</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may terminate your account at any time. We recommend downloading your data before termination.
            </p>

            <h3 className="text-xl font-medium mb-3">9.2 Termination by Us</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may terminate or suspend your account for violations of these Terms. You will be notified of the reason for termination.
            </p>

            <h3 className="text-xl font-medium mb-3">9.3 Data Deletion</h3>
            <p className="text-gray-700 leading-relaxed">
              Upon termination, your data will be deleted according to our data retention policies. You can request data export before termination.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">10. Disclaimers and Limitations</h2>

            <h3 className="text-xl font-medium mb-3">10.1 Service "As Is"</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              FileNest is provided "as is" without warranties of any kind. We do not guarantee error-free operation or uninterrupted service.
            </p>

            <h3 className="text-xl font-medium mb-3">10.2 Limitation of Liability</h3>
            <p className="text-gray-700 leading-relaxed">
              Our liability is limited to the amount you paid for the service in the 12 months preceding the claim. We are not liable for indirect damages or data loss.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">11. Indemnification</h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to indemnify and hold FileNest harmless from any claims, damages, or expenses arising from your use of the service or violation of these Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">12. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms are governed by the laws of [Your Jurisdiction]. Any disputes will be resolved in the courts of [Your Jurisdiction].
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">13. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update these Terms from time to time. We will notify users of material changes via email or service notifications.
              Continued use of the service constitutes acceptance of updated Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">14. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions about these Terms, please contact us at support@filenest.com:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700"><strong>Email:</strong> legal@filenest.com</p>
              <p className="text-gray-700"><strong>Address:</strong> FileNest Legal Team</p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-gray-100 py-10 mt-20">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-sm font-medium tracking-wide">FileNest</span>
            <div className="flex items-center gap-6 text-xs text-gray-600 font-normal">
              <Link href="/privacy" className="hover:text-black transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-black transition-colors">Terms</Link>
              <span>© {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}