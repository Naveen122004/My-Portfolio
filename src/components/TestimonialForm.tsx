import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const testimonialSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  role: z.string().trim().max(100, "Role must be less than 100 characters").optional(),
  company: z.string().trim().max(100, "Company must be less than 100 characters").optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters"),
  rating: z.number().min(1, "Please select a rating").max(5, "Rating must be between 1 and 5")
});

const TestimonialForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    company: "",
    message: "",
    rating: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form data
      const validatedData = testimonialSchema.parse(formData);
      
      setIsSubmitting(true);

      const { error } = await supabase
        .from('testimonials')
        .insert([{
          name: validatedData.name,
          email: validatedData.email,
          role: validatedData.role || null,
          company: validatedData.company || null,
          rating: validatedData.rating,
          message: validatedData.message,
        }]);

      if (error) throw error;

      toast({
        title: "Thank you for your testimonial!",
        description: "Your review has been submitted and will appear after approval.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        role: "",
        company: "",
        message: "",
        rating: 0
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to submit testimonial. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-center">Share Your Experience</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            maxLength={100}
          />
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            maxLength={255}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="e.g., Software Engineer"
              maxLength={100}
            />
          </div>

          <div>
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="e.g., Tech Corp"
              maxLength={100}
            />
          </div>
        </div>

        <div>
          <Label>Rating *</Label>
          <div className="flex gap-2 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({ ...formData, rating: star })}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  className={`h-8 w-8 ${
                    star <= formData.rating
                      ? "fill-accent text-accent"
                      : "text-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="message">Your Testimonial *</Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            className="min-h-[120px] resize-none"
            placeholder="Share your experience working with me..."
            maxLength={1000}
          />
          <p className="text-xs text-muted-foreground mt-1">
            {formData.message.length}/1000 characters
          </p>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          <Send className="mr-2 h-5 w-5" />
          {isSubmitting ? "Submitting..." : "Submit Testimonial"}
        </Button>
      </form>
    </Card>
  );
};

export default TestimonialForm;
