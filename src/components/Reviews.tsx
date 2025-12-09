import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import TestimonialForm from "./TestimonialForm";

interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  rating: number;
  message: string;
}

const Reviews = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('id, name, role, company, rating, message')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="reviews" className="py-20 px-4" ref={ref as any}>
      <div className="container max-w-6xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Client <span className="text-gradient">Testimonials</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-6">
            What people say about working with me
          </p>
          <Button
            onClick={() => setShowForm(!showForm)}
            variant="outline"
            size="lg"
          >
            {showForm ? "View Testimonials" : "Write a Testimonial"}
          </Button>
        </div>

        {showForm ? (
          <div className="animate-fade-in">
            <TestimonialForm />
          </div>
        ) : (
          <>
            {isLoading ? (
              <div className="text-center text-muted-foreground">Loading testimonials...</div>
            ) : testimonials.length === 0 ? (
              <div className="text-center text-muted-foreground">
                <p>No testimonials yet. Be the first to share your experience!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <Card
                    key={testimonial.id}
                    className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-slide-up relative"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Quote className="h-8 w-8 text-primary/20 absolute top-4 right-4" />
                    
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                      ))}
                    </div>

                    <p className="text-muted-foreground mb-6 italic line-clamp-4">
                      "{testimonial.message}"
                    </p>

                    <div className="border-t pt-4">
                      <h4 className="font-bold">{testimonial.name}</h4>
                      {(testimonial.role || testimonial.company) && (
                        <p className="text-sm text-muted-foreground">
                          {[testimonial.role, testimonial.company].filter(Boolean).join(' at ')}
                        </p>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Reviews;
