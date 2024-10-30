import Link from "next/link";
import { Cpu, Gamepad, Gauge, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative max-w-7xl mx-auto pt-32 px-4 sm:px-6 lg:px-8 flex flex-col h-full justify-center">
          <h1 className="text-6xl font-bold mb-6">
            Next-Gen Cloud Gaming
            <span className="text-blue-500"> Infrastructure</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            Experience gaming like never before with our high-performance cloud
            infrastructure. Low latency, powerful hardware, instant deployment.
          </p>
          <div className="flex space-x-4">
            <Link
              href="/pricing"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold"
            >
              Get Started
            </Link>
            <Link
              href="/about"
              className="border border-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-gray-400">
              Experience the future of cloud gaming infrastructure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Cpu />}
              title="Powerful Hardware"
              description="Latest generation CPUs and GPUs for maximum performance"
            />
            <FeatureCard
              icon={<Gauge />}
              title="Ultra-Low Latency"
              description="Optimized network infrastructure for responsive gaming"
            />
            <FeatureCard
              icon={<Shield />}
              title="DDoS Protection"
              description="Enterprise-grade security to keep you gaming"
            />
            <FeatureCard
              icon={<Gamepad />}
              title="Gaming Optimized"
              description="Preconfigured for the best gaming experience"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold">99.9%</div>
              <div className="text-gray-200">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold">50+</div>
              <div className="text-gray-200">Global Locations</div>
            </div>
            <div>
              <div className="text-4xl font-bold">24/7</div>
              <div className="text-gray-200">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl hover:bg-gray-750 transition-colors">
      <div className="text-blue-500 mb-4 w-12 h-12">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
