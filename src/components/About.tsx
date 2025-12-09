import { Card } from "@/components/ui/card";
import { User, Heart, Target } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const About = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-20 px-4" ref={ref as any}>
      <div className="container max-w-6xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get to know more about my background, interests, and professional goals
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: User,
              title: "Background",
              description: "Passionate software developer focused on building smart, user-friendly digital solutions. I love turning real-world problems into efficient applications with clean code and modern technologies."
            },
            {
              icon: Heart,
              title: "Interests",
              description: "I'm interested in modern technologies, AI-based solutions, smart agriculture, healthcare systems, and real-time data-driven applications. I enjoy exploring new frameworks and working on innovative projects."
            },
            {
              icon: Target,
              title: "Career Goal",
              description: "My goal is to become a skilled full-stack/mobile app developer who can create scalable, user-focused applications. I aim to continuously improve my technical skills, work on innovative projects, and contribute to impactful software solutions."
            }
          ].map((item, index) => (
            <Card 
              key={item.title}
              className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up border-border/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 shadow-md">
                <item.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
