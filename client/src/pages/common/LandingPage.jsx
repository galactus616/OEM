import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  ChevronRight,
  Monitor,
  Shield,
  Award,
  Users,
  MessageCircle,
  Mail,
  Github,
  Linkedin,
  Sun,
  Moon,
  Zap,
  CheckCircle,
} from "lucide-react";

// Feature card component
const FeatureCard = ({ icon, title, description }) => (
  <div className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer">
    <div className="flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400 rounded-full shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-base">
        {description}
      </p>
    </div>
  </div>
);

// Testimonial card component
const TestimonialCard = ({ name, role, text }) => (
  <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:scale-[1.02]">
    <p className="text-gray-600 dark:text-gray-400 text-lg italic mb-4">
      "{text}"
    </p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
        <Users className="w-5 h-5 text-gray-500" />
      </div>
      <div>
        <p className="font-semibold text-gray-900 dark:text-white">{name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
      </div>
    </div>
  </div>
);

// Main App Component
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme === "dark") return true;
      if (storedTheme === "light") return false;
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // A simple navigation handler for links
  const handleNavigate = (path) => {
    console.log(`Navigating to ${path}`);
    // In a real app with react-router-dom, you would use:
    // navigate(path);
  };

  return (
    <div
      className={`font-sans antialiased ${
        isDarkMode ? "dark" : ""
      } transition-colors duration-500`}
    >
      <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        {/* Navbar */}
        <header className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => handleNavigate("/")}
            >
              <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/30">
                <Briefcase className="w-6 h-6" />
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                Exam Portal
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-base text-gray-600 dark:text-gray-400">
              <a
                href="#features"
                className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
              >
                How it works
              </a>
              <a
                href="#contact"
                className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
              >
                Contact
              </a>
            </nav>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors shadow-lg shadow-purple-500/30 cursor-pointer"
              >
                Register
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950"></div>
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl opacity-30"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                Secure Online Examinations, <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600">
                  Simplified
                </span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Our platform provides AI-powered proctoring, live monitoring,
                and instant results. Create exams, manage questions, and
                evaluate performance—all in one secure place.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 cursor-pointer"
                >
                  Get Started
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 cursor-pointer"
                >
                  Learn More
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" /> Real-time
                  Proctoring
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" /> Instant
                  Results
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" /> Secure &
                  Scalable
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-3xl shadow-2xl overflow-hidden border-4 border-white dark:border-gray-800">
                <div className="h-96 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-3xl">
                  Exam Dashboard Mockup
                </div>
                <div className="absolute top-4 left-4 flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Features Section */}
          <section
            id="features"
            className="py-20 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="text-center mb-16">
              <span className="text-sm font-semibold uppercase text-purple-600 dark:text-purple-400">
                Key Features
              </span>
              <h2 className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white">
                Everything you need to succeed
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Our platform is built to provide a seamless and secure
                experience for both test-takers and administrators.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Monitor className="w-6 h-6" />}
                title="AI-Powered Proctoring"
                description="Our intelligent system monitors test-takers in real-time, detecting suspicious behavior and ensuring exam integrity."
              />
              <FeatureCard
                icon={<Shield className="w-6 h-6" />}
                title="Secure & Reliable Exams"
                description="With end-to-end encryption and robust infrastructure, your data is always safe and exams run without interruption."
              />
              <FeatureCard
                icon={<Award className="w-6 h-6" />}
                title="Instant Results & Certificates"
                description="Automated grading and instant results mean candidates can get their scores and certificates immediately after completion."
              />
              <FeatureCard
                icon={<Briefcase className="w-6 h-6" />}
                title="Customizable Exam Settings"
                description="Tailor each exam with custom timers, question banks, and security settings to meet your specific requirements."
              />
              <FeatureCard
                icon={<Zap className="w-6 h-6" />}
                title="Intuitive User Experience"
                description="A clean and simple interface makes it easy for test-takers to focus on their exam and for admins to manage everything."
              />
              <FeatureCard
                icon={<Users className="w-6 h-6" />}
                title="Detailed Performance Analytics"
                description="Gain insights into individual and group performance with comprehensive reports and data visualizations."
              />
            </div>
          </section>

          {/* How It Works Section */}
          <section
            id="how-it-works"
            className="py-20 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="text-center mb-16">
              <span className="text-sm font-semibold uppercase text-purple-600 dark:text-purple-400">
                Simple Steps
              </span>
              <h2 className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white">
                How Our Platform Works
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Getting started is quick and easy for both administrators and
                students.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center p-8 bg-purple-50 dark:bg-purple-900/30 rounded-2xl shadow-sm border border-purple-100 dark:border-purple-800">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-4xl font-bold bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-200 rounded-full">
                  1
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Create Account
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Register in seconds and set up your profile to get started.
                </p>
              </div>
              <div className="text-center p-8 bg-purple-50 dark:bg-purple-900/30 rounded-2xl shadow-sm border border-purple-100 dark:border-purple-800">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-4xl font-bold bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-200 rounded-full">
                  2
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Take Your Exam
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Access your assigned exams and complete them with our secure
                  proctoring.
                </p>
              </div>
              <div className="text-center p-8 bg-purple-50 dark:bg-purple-900/30 rounded-2xl shadow-sm border border-purple-100 dark:border-purple-800">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-4xl font-bold bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-200 rounded-full">
                  3
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Get Instant Results
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  View your scores immediately after submission and download
                  your certificate.
                </p>
              </div>
            </div>
          </section>

          {/* Testimonial Section */}
          <section className="py-20 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center mb-16">
              <span className="text-sm font-semibold uppercase text-purple-600 dark:text-purple-400">
                What People Say
              </span>
              <h2 className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white">
                Trusted by students and educators
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Read what our users have to say about their experience with our
                platform.
              </p>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              <TestimonialCard
                name="Jane Doe"
                role="University Student"
                text="The proctoring system felt very natural and secure. It was a smooth experience from start to finish, and getting my results instantly was fantastic."
              />
              <TestimonialCard
                name="John Smith"
                role="High School Teacher"
                text="As an administrator, the platform is incredibly easy to use. Creating exams and managing students has never been simpler. The analytics are a huge help."
              />
              <TestimonialCard
                name="Sarah Lee"
                role="Professional Certification Candidate"
                text="I was nervous about taking my certification exam online, but Exam Portal's security features put my mind at ease. Highly recommend!"
              />
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-purple-600 dark:bg-purple-800 text-white p-12 sm:p-16 rounded-3xl text-center shadow-xl">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                Ready to get started?
              </h2>
              <p className="text-lg text-purple-100 max-w-2xl mx-auto">
                Join thousands of students and institutions using our platform
                for a smarter and more secure way to take exams.
              </p>
              <div className="mt-8">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-8 py-4 text-xl font-bold rounded-xl bg-white text-purple-600 hover:bg-gray-100 transition-colors shadow-lg cursor-pointer"
                >
                  Create Your Free Account
                  <ChevronRight className="w-6 h-6 ml-2" />
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-700 py-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Exam Portal. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
