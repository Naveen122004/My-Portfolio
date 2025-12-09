import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building Scalable Hospital Management Systems",
    excerpt: "Learn how to design and implement a comprehensive hospital management system using React, Node.js, and MongoDB. This article covers architecture decisions, security considerations, and best practices.",
    date: "2024-03-15",
    readTime: "8 min read",
    category: "Full Stack Development",
    tags: ["React", "Node.js", "MongoDB"]
  },
  {
    id: 2,
    title: "Machine Learning for Agriculture: Crop Disease Detection",
    excerpt: "Explore how to build an ML-based crop disease detection system using TensorFlow and Python. From data collection to model deployment, this guide covers the entire pipeline.",
    date: "2024-02-28",
    readTime: "12 min read",
    category: "Machine Learning",
    tags: ["Python", "TensorFlow", "AI"]
  },
  {
    id: 3,
    title: "Creating Weather-Based Smart Farming Apps",
    excerpt: "Discover the process of building Android applications that provide real-time weather data and farming recommendations to help farmers make data-driven decisions.",
    date: "2024-02-10",
    readTime: "10 min read",
    category: "Mobile Development",
    tags: ["Android", "Java", "Firebase"]
  }
];

const Blog = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="blog" className="py-20 px-4" ref={ref as any}>
      <div className="container max-w-6xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="text-gradient">Articles</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Sharing knowledge and insights from my development journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <Card 
              key={post.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-slide-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6">
                <Badge variant="secondary" className="mb-3">
                  {post.category}
                </Badge>
                
                <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button 
                  variant="ghost" 
                  className="w-full group/btn"
                >
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
