import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ExternalLink, Plus, Github, Globe } from "lucide-react";
import ProjectModal from "./ProjectModal";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import hospitalImage from "@/assets/hospital-management.jpg";
import agricultureImage from "@/assets/smart-agriculture.jpg";
import crofipyImage from "@/assets/crofipy.jpg";
import medicinalPlantImage from "@/assets/medicinal-plant.jpg";
import careVisionImage from "@/assets/care-vision.jpg";

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  rating: number;
  reviews: number;
  fullDescription: string;
  features: string[];
  demoUrl?: string;
  githubUrl?: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "Hospital Management System",
    description: "A comprehensive system to manage patient details, doctor information, billing, appointments, rooms, and medical reports.",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: hospitalImage,
    rating: 4.8,
    reviews: 24,
    fullDescription: "A complete hospital management solution that streamlines operations and improves patient care through digital transformation.",
    features: [
      "Patient registration and records management",
      "Doctor scheduling and appointment booking",
      "Automated billing and payment processing",
      "Room allocation and availability tracking",
      "Medical reports generation and storage",
      "Prescription management system"
    ],
    demoUrl: "https://hospital-management-demo.example.com",
    githubUrl: "https://github.com/naveenmagadum/hospital-management"
  },
  {
    id: 2,
    title: "Smart Agriculture Android App",
    description: "Provides weather-based farming suggestions, market price updates, government schemes, and water management solutions.",
    technologies: ["React JS", "Python", "MongoDB", "JavaScript"],
    image: agricultureImage,
    rating: 4.6,
    reviews: 18,
    fullDescription: "An intelligent farming assistant that helps farmers make data-driven decisions for better crop yields and resource management.",
    features: [
      "Real-time weather forecasts and alerts",
      "Crop-specific farming recommendations",
      "Live market price tracking",
      "Government schemes and subsidies information",
      "Water management and irrigation planning",
      "Multi-language support for accessibility"
    ],
    demoUrl: "https://play.google.com/store/apps/details?id=com.smartagriculture",
    githubUrl: "https://github.com/naveenmagadum/smart-agriculture"
  },
  {
    id: 3,
    title: "CroFiPy - Crop Disease Prediction",
    description: "ML-based system for crop disease detection, fertilizer prediction, and crop recommendation using advanced algorithms.",
    technologies: ["HTML", "CSS", "JavaScript", "Python", "ML"],
    image: crofipyImage,
    rating: 4.9,
    reviews: 32,
    fullDescription: "An AI-powered agricultural solution that helps farmers identify crop diseases early and optimize fertilizer usage for better yields.",
    features: [
      "Image-based disease detection using CNN",
      "Fertilizer recommendation based on soil analysis",
      "Crop recommendation system using ML",
      "Real-time prediction and analysis",
      "Detailed disease treatment guidelines",
      "Historical data tracking and analytics"
    ],
    demoUrl: "https://crofipy-demo.example.com",
    githubUrl: "https://github.com/naveenmagadum/crofipy"
  },
  {
    id: 4,
    title: "Medicinal Plant Identification",
    description: "AI-powered system for identifying medicinal plants using image recognition with Gemini AI integration for accurate plant classification.",
    technologies: ["React JS", "Python", "TypeScript", "Gemini", "HTML", "CSS", "JavaScript"],
    image: medicinalPlantImage,
    rating: 4.7,
    reviews: 28,
    fullDescription: "An intelligent medicinal plant identification system that leverages Google's Gemini AI to help users identify medicinal plants through image recognition, providing detailed information about their properties and uses.",
    features: [
      "AI-powered plant identification using Gemini",
      "Comprehensive medicinal plant database",
      "Image-based recognition and classification",
      "Detailed plant properties and usage information",
      "Multi-language support for accessibility",
      "Historical search and identification tracking"
    ],
    demoUrl: "https://medicinal-plant-demo.example.com",
    githubUrl: "https://github.com/naveenmagadum/medicinal-plant-identification"
  },
  {
    id: 5,
    title: "Care-Vision",
    description: "Healthcare vision analysis system with Streamlit interface for medical image processing and diagnostic assistance through API integration.",
    technologies: ["HTML", "CSS", "JavaScript", "Python", "API Integration", "Streamlit"],
    image: careVisionImage,
    rating: 4.5,
    reviews: 21,
    fullDescription: "A comprehensive healthcare vision system that combines medical imaging technology with AI-powered analysis to assist healthcare professionals in diagnostic processes.",
    features: [
      "Medical image processing and analysis",
      "Streamlit-based interactive interface",
      "RESTful API integration for data exchange",
      "Real-time diagnostic assistance",
      "Secure patient data handling",
      "Export and reporting capabilities"
    ],
    demoUrl: "https://care-vision-demo.example.com",
    githubUrl: "https://github.com/naveenmagadum/care-vision"
  }
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="projects" className="py-20 px-4 bg-muted/30" ref={ref as any}>
      <div className="container max-w-6xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Showcase of my recent work and innovations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {projectsData.map((project, index) => (
            <Card 
              key={project.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-slide-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 line-clamp-1">{project.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">{project.description}</p>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="font-semibold">{project.rating}</span>
                  </div>
                  <span className="text-muted-foreground text-sm">({project.reviews} reviews)</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2 mb-3">
                  {project.demoUrl && (
                    <Button 
                      onClick={() => window.open(project.demoUrl, '_blank')}
                      className="flex-1 group/btn"
                      variant="default"
                      size="sm"
                    >
                      <Globe className="mr-1 h-3 w-3" />
                      Demo
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button 
                      onClick={() => window.open(project.githubUrl, '_blank')}
                      className="flex-1 group/btn"
                      variant="outline"
                      size="sm"
                    >
                      <Github className="mr-1 h-3 w-3" />
                      GitHub
                    </Button>
                  )}
                </div>

                <Button 
                  onClick={() => setSelectedProject(project)}
                  className="w-full group/btn"
                  variant="ghost"
                >
                  Read More
                  <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          ))}

          {/* Coming Soon Card */}
          <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-slide-up border-dashed border-2 flex items-center justify-center min-h-[400px]">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                <Plus className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-2">More Projects</h3>
              <p className="text-muted-foreground">Coming Soon</p>
            </div>
          </Card>
        </div>

        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      </div>
    </section>
  );
};

export default Projects;
