import { Button } from "@/components/ui/button";
import { Download, Mail, Github, Linkedin, Instagram, Facebook, Twitter } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-hero animate-fade-in">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Profile Image */}
          <div className="relative group animate-scale-in">
            <div className="absolute inset-0 bg-gradient-primary rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg hover:shadow-glow transition-all duration-500 hover:scale-105">
              <img
                src={profilePhoto}
                alt="Naveen Magadum - Full Stack Developer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left space-y-6 animate-slide-up">
            <div className="space-y-2">
              <p className="text-primary font-semibold text-lg">Hello, I'm</p>
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className="text-gradient">Naveen Magadum</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                Full Stack Developer & Software Engineer
              </p>
            </div>

            <p className="text-lg text-muted-foreground max-w-2xl">
              Passionate software developer focused on building smart, user-friendly digital solutions. 
              I love turning real-world problems into efficient applications with clean code and modern technologies.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                asChild
              >
                <a href="/Naveen_Magadum_Resume.pdf" download="Naveen_Magadum_Resume.pdf">
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </a>
              </Button>
              <Button size="lg" variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <Mail className="mr-2 h-5 w-5" />
                Contact Me
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center md:justify-start pt-6">
              {[
                { icon: Github, href: "https://github.com/Naveen122004", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/naveen-magadum-aaa41725b/", label: "LinkedIn" },
                { icon: Instagram, href: "https://www.instagram.com/naveen_mg18/", label: "Instagram" },
                { icon: Facebook, href: "https://www.facebook.com/naveensm.naveen.52", label: "Facebook" },
                { icon: Twitter, href: "#", label: "Twitter" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-gradient-primary hover:border-primary hover:scale-110 hover:shadow-md transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-foreground group-hover:text-primary-foreground transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
