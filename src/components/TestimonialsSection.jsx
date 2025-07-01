import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Emily Johnson",
    role: "Event Organizer",
    image: "https://images.unsplash.com/photo-1494790108755-2616b332c813?w=100&h=100&fit=crop&crop=face",
    content:
      "EventHub made organizing our company retreat so much easier. The interface is intuitive and our team loved how simple it was to manage everything.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Community Leader",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    content:
      "I've organized over 20 events using EventHub. The attendee management and communication features are outstanding. Highly recommended!",
    rating: 5,
  },
  {
    id: 3,
    name: "Sarah Williams",
    role: "Workshop Host",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    content:
      "The platform is perfect for our monthly workshops. Easy to set up, great for promotion, and the analytics help us improve our events.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Users Say
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied event organizers who trust EventHub for their events.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group"
            >
              <div className="flex items-center mb-4">
                <Quote className="w-8 h-8 text-purple-500" />
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">"{testimonial.content}"</p>

              <div className="flex items-center justify-between">
                {/* User Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
