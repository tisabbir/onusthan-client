import { Calendar, Plus, Users, Star } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Plus,
      title: "Create Your Event",
      description: "Set up your event with all the details - title, date, location, and description.",
      step: "01"
    },
    {
      icon: Calendar,
      title: "Publish & Share",
      description: "Make your event visible to the community and share it with your network.",
      step: "02"
    },
    {
      icon: Users,
      title: "Connect & Engage",
      description: "Watch as people join your event and build meaningful connections.",
      step: "03"
    },
    {
      icon: Star,
      title: "Create Memories",
      description: "Host an amazing event and get feedback from your attendees.",
      step: "04"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Creating and managing events has never been easier. Follow these simple steps to get started.
          </p>
        </div>

     
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center group">
                <div className="relative mb-6 w-fit mx-auto">
                 
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {step.step}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
