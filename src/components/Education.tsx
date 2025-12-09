import { Card } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

const educationData = [
  {
    degree: "Bachelor of Technology in Computer Science",
    institution: "Maratha Mandal Engineering College Belagavi",
    year: "2022 - 2026",
    description: "Focused on software engineering, data structures, machine learning, and full-stack development"
  },
  {
    degree: "Pre-University College (PUC)",
    institution: "J A PU College Athani",
    year: "2020 - 2022",
    description: "Specialized in Science stream with focus on Mathematics and Computer Science"
  },
  {
    degree: "Secondary School Education",
    institution: "PVS School Ainapur",
    year: "2018 - 2020",
    description: "Completed high school education with distinction"
  }
];

const Education = () => {
  return (
    <section id="education" className="py-20 px-4 bg-muted/30">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-gradient">Education</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Academic journey and qualifications
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {educationData.map((edu, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up border-l-4 border-l-primary"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center shadow-md">
                    <GraduationCap className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-bold">{edu.degree}</h3>
                    <span className="text-primary font-semibold">{edu.year}</span>
                  </div>
                  <p className="text-lg text-muted-foreground font-medium mb-2">{edu.institution}</p>
                  <p className="text-muted-foreground">{edu.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
