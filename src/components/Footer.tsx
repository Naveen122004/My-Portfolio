import { Github, Linkedin, Instagram, Facebook, Twitter, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Education", href: "#education" },
      { label: "Skills", href: "#skills" },
      { label: "Projects", href: "#projects" },
      { label: "Contact", href: "#contact" },
    ],
    social: [
      { icon: Github, href: "https://github.com/Naveen122004", label: "GitHub" },
      { icon: Linkedin, href: "https://www.linkedin.com/in/naveen-magadum-aaa41725b/", label: "LinkedIn" },
      { icon: Instagram, href: "https://www.instagram.com/naveen_mg18/", label: "Instagram" },
      { icon: Facebook, href: "https://www.facebook.com/naveensm.naveen.52", label: "Facebook" },
      { icon: Twitter, href: "#", label: "Twitter" },
      { icon: Mail, href: "#contact", label: "Email" },
    ]
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gradient">Naveen Magadum</h3>
            <p className="text-muted-foreground">
              Building innovative solutions and creating impactful digital experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Connect</h4>
            <div className="flex flex-wrap gap-3">
              {footerLinks.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-gradient-primary hover:scale-110 transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-foreground group-hover:text-primary-foreground transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center">
          <p className="text-muted-foreground flex items-center justify-center gap-2 flex-wrap">
            © {currentYear} Naveen Magadum. Made with
            <Heart className="h-4 w-4 fill-accent text-accent animate-pulse" />
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
