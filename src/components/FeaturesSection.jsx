import { Calendar, Users, Search, Star, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Easy Event Creation",
    description:
      "Create and manage events with our intuitive interface. Set dates, locations, and descriptions effortlessly.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Connect with like-minded people and build lasting relationships through shared experiences.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Search,
    title: "Smart Discovery",
    description:
      "Find events that match your interests with our advanced search and filtering system.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Star,
    title: "Quality Events",
    description:
      "Curated events with ratings and reviews to ensure you have the best experience.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description:
      "Your data and privacy are protected with our state-of-the-art security measures.",
    gradient: "from-red-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description:
      "Get instant notifications about event changes, new attendees, and important updates.",
    gradient: "from-indigo-500 to-purple-500",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Onusthan
            </span>
            ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to create, discover, and manage amazing events in one powerful platform.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="rounded-xl bg-white p-6 shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 group"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
