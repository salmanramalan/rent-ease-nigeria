import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  Users, 
  CreditCard, 
  BarChart3, 
  Shield, 
  Clock,
  CheckCircle,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import propertyHero from "@/assets/property-hero.jpg";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Building2,
      title: "Property Management",
      description: "Effortlessly manage multiple properties with detailed tracking and organization tools."
    },
    {
      icon: Users,
      title: "Tenant Management", 
      description: "Keep comprehensive tenant records, lease agreements, and communication history in one place."
    },
    {
      icon: CreditCard,
      title: "Payment Tracking",
      description: "Monitor rent payments, track outstanding balances, and automate payment reminders."
    },
    {
      icon: BarChart3,
      title: "Financial Reports",
      description: "Generate detailed financial reports and analytics to optimize your rental business."
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Bank-level security ensures your sensitive property and tenant data stays protected."
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "Automate routine tasks and streamline your property management workflow."
    }
  ];

  const benefits = [
    "Reduce administrative overhead by 70%",
    "Never miss a rent payment again",
    "Professional tenant communication",
    "Real-time financial insights",
    "Mobile-friendly access anywhere",
    "Secure document storage"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">PropertyPro</h1>
          </div>
          <div className="flex space-x-3">
            <Button variant="ghost" onClick={() => navigate('/auth')}>
              Login
            </Button>
            <Button onClick={() => navigate('/auth?mode=signup')}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary" className="w-fit">
                Trusted by 1,000+ Property Managers
              </Badge>
              <h2 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Simplify Your Property Management
              </h2>
              <p className="text-xl text-muted-foreground max-w-lg">
                The complete solution for landlords and property managers. Manage properties, track payments, and keep tenants happy - all in one powerful platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8" onClick={() => navigate('/auth?mode=signup')}>
                  Start Free Trial
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8">
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={propertyHero} 
                alt="Modern property management dashboard" 
                className="rounded-lg shadow-2xl w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Succeed
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed specifically for property managers and landlords
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h4 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h3 className="text-3xl lg:text-4xl font-bold text-foreground">
                Join Thousands of Successful Property Managers
              </h3>
              <p className="text-lg text-muted-foreground">
                Our platform has helped property managers increase efficiency, reduce costs, and improve tenant satisfaction across the country.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" onClick={() => navigate('/auth?mode=signup')}>
                Start Managing Better Today
              </Button>
            </div>
            <div className="space-y-6">
              <Card className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">₦2.5M+</div>
                  <div className="text-muted-foreground">Monthly Rent Processed</div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">98%</div>
                  <div className="text-muted-foreground">Customer Satisfaction</div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
                  <div className="text-muted-foreground">Properties Managed</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Transform Your Property Management?
          </h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of successful landlords and property managers who trust PropertyPro
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8" onClick={() => navigate('/auth?mode=signup')}>
              Start Free Trial
            </Button>
            <Button size="lg" className="text-lg px-8 bg-white text-black border-white hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Building2 className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold text-foreground">PropertyPro</span>
              </div>
              <p className="text-muted-foreground">
                The complete property management solution for modern landlords and property managers.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Contact Us</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>support@propertypro.com</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+234 800 123 4567</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Lagos, Nigeria</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
              <div className="space-y-2 text-muted-foreground">
                <div>Features</div>
                <div>Pricing</div>
                <div>Support</div>
                <div>Privacy Policy</div>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 PropertyPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;