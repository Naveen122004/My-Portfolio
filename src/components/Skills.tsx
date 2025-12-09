import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const skillsData = {
  technical: [
    { name: "React & Next.js", level: 90 },
    { name: "Node.js & Express", level: 85 },
    { name: "Python & Django", level: 80 },
    { name: "Database Management", level: 85 },
    { name: "Machine Learning", level: 75 },
    { name: "Android Development", level: 80 },
  ],
  languages: [
    { name: "JavaScript/TypeScript", level: 90 },
    { name: "Python", level: 85 },
    { name: "Java", level: 80 },
    { name: "SQL", level: 85 },
  ],
  tools: [
    { name: "Git & GitHub", level: 90 },
    { name: "Docker", level: 75 },
    { name: "AWS", level: 70 },
    { name: "VS Code", level: 95 },
  ],
  soft: [
    { name: "Problem Solving", level: 90 },
    { name: "Team Collaboration", level: 85 },
    { name: "Communication", level: 85 },
    { name: "Time Management", level: 80 },
  ]
};

const SkillCategory = ({ title, skills, delay = 0 }: { title: string; skills: typeof skillsData.technical; delay?: number }) => (
  <Card className="p-6 animate-slide-up hover:shadow-lg transition-all duration-300" style={{ animationDelay: `${delay}s` }}>
    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
      <span className="w-1 h-6 bg-gradient-primary rounded-full"></span>
      {title}
    </h3>
    <div className="space-y-5">
      {skills.map((skill) => (
        <div key={skill.name}>
          <div className="flex justify-between mb-2">
            <span className="font-medium">{skill.name}</span>
            <span className="text-primary font-semibold">{skill.level}%</span>
          </div>
          <Progress value={skill.level} className="h-2" />
        </div>
      ))}
    </div>
  </Card>
);

const Skills = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="skills" className="py-20 px-4" ref={ref as any}>
      <div className="container max-w-6xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Technical expertise and professional capabilities
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <SkillCategory title="Technical Skills" skills={skillsData.technical} delay={0} />
          <SkillCategory title="Programming Languages" skills={skillsData.languages} delay={0.1} />
          <SkillCategory title="Tools & Technologies" skills={skillsData.tools} delay={0.2} />
          <SkillCategory title="Soft Skills" skills={skillsData.soft} delay={0.3} />
        </div>
      </div>
    </section>
  );
};

export default Skills;
