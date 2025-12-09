import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Check, X, Trash2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Session } from "@supabase/supabase-js";

interface Testimonial {
  id: string;
  name: string;
  email: string;
  role: string | null;
  company: string | null;
  rating: number;
  message: string;
  status: string;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session?.user) {
          checkAdminRole(session.user.id);
        } else {
          setIsAdmin(false);
          setLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        checkAdminRole(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle();

      if (error) throw error;
      
      setIsAdmin(!!data);
      if (data) {
        fetchTestimonials();
      }
    } catch (error) {
      console.error('Error checking admin role:', error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast({
        title: "Error",
        description: "Failed to fetch testimonials",
        variant: "destructive",
      });
    }
  };

  const updateTestimonialStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Testimonial ${status}`,
      });

      fetchTestimonials();
    } catch (error) {
      console.error('Error updating testimonial:', error);
      toast({
        title: "Error",
        description: "Failed to update testimonial",
        variant: "destructive",
      });
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Testimonial deleted",
      });

      fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">Admin Access Required</h1>
          <p className="text-muted-foreground mb-6">Please sign in to access the admin panel</p>
          <Button onClick={() => navigate('/auth')} size="lg" className="w-full">
            Sign In
          </Button>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">You don't have admin privileges</p>
          <div className="space-y-3">
            <Button onClick={() => navigate('/')} variant="outline" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <Button onClick={handleSignOut} variant="ghost" className="w-full">
              Sign Out
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const stats = {
    pending: testimonials.filter(t => t.status === 'pending').length,
    approved: testimonials.filter(t => t.status === 'approved').length,
    rejected: testimonials.filter(t => t.status === 'rejected').length,
  };

  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-8">
      <div className="container max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Testimonial Management</h1>
            <p className="text-muted-foreground">Review and manage testimonials</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate('/')} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Home
            </Button>
            <Button onClick={handleSignOut} variant="ghost">
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6">
            <h3 className="text-sm text-muted-foreground mb-2">Pending</h3>
            <p className="text-3xl font-bold text-accent">{stats.pending}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm text-muted-foreground mb-2">Approved</h3>
            <p className="text-3xl font-bold text-primary">{stats.approved}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm text-muted-foreground mb-2">Rejected</h3>
            <p className="text-3xl font-bold text-destructive">{stats.rejected}</p>
          </Card>
        </div>

        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.email}</p>
                  {(testimonial.role || testimonial.company) && (
                    <p className="text-sm text-muted-foreground">
                      {[testimonial.role, testimonial.company].filter(Boolean).join(' at ')}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      testimonial.status === 'approved' ? 'default' :
                      testimonial.status === 'rejected' ? 'destructive' : 'secondary'
                    }
                  >
                    {testimonial.status}
                  </Badge>
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-4 italic">"{testimonial.message}"</p>

              <div className="flex justify-between items-center pt-4 border-t">
                <p className="text-xs text-muted-foreground">
                  Submitted: {new Date(testimonial.created_at).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  {testimonial.status !== 'approved' && (
                    <Button
                      onClick={() => updateTestimonialStatus(testimonial.id, 'approved')}
                      size="sm"
                      variant="default"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                  )}
                  {testimonial.status !== 'rejected' && (
                    <Button
                      onClick={() => updateTestimonialStatus(testimonial.id, 'rejected')}
                      size="sm"
                      variant="outline"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  )}
                  <Button
                    onClick={() => deleteTestimonial(testimonial.id)}
                    size="sm"
                    variant="destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {testimonials.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No testimonials yet</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
