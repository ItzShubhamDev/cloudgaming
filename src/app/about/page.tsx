import { Server, Users, Globe, Shield } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">About CloudGaming</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We're revolutionizing gaming by making high-end gaming accessible to
            everyone through cutting-edge cloud technology.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-gray-800 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-300">
            To democratize gaming by providing access to high-performance gaming
            hardware through cloud technology, making premium gaming experiences
            accessible to everyone, everywhere.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="bg-gray-800 p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">50+</div>
            <div className="text-gray-400">Global Locations</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">100K+</div>
            <div className="text-gray-400">Active Users</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">99.9%</div>
            <div className="text-gray-400">Uptime</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">24/7</div>
            <div className="text-gray-400">Support</div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-800 p-8 rounded-xl">
            <Server className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">
              Cutting-edge Infrastructure
            </h3>
            <p className="text-gray-300">
              Our data centers are equipped with the latest NVIDIA GPUs and
              high-performance hardware to deliver exceptional gaming
              experiences.
            </p>
          </div>
          <div className="bg-gray-800 p-8 rounded-xl">
            <Globe className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Global Network</h3>
            <p className="text-gray-300">
              Strategically located servers worldwide ensure low-latency gaming
              for players everywhere.
            </p>
          </div>
          <div className="bg-gray-800 p-8 rounded-xl">
            <Shield className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Security First</h3>
            <p className="text-gray-300">
              Enterprise-grade security measures protect your data and gaming
              sessions.
            </p>
          </div>
          <div className="bg-gray-800 p-8 rounded-xl">
            <Users className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Community Driven</h3>
            <p className="text-gray-300">
              Built by gamers, for gamers, with continuous improvements based on
              community feedback.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-8">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "CEO & Founder",
                image:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200",
              },
              {
                name: "Michael Rodriguez",
                role: "CTO",
                image:
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200",
              },
              {
                name: "David Kim",
                role: "Head of Engineering",
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
              },
            ].map((member) => (
              <div key={member.name} className="bg-gray-800 p-6 rounded-xl">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
