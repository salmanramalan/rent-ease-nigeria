import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, Home } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const AddTenant = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    unit: "",
    rentAmount: "",
    rentDueDate: "",
    leaseExpiry: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate tenant creation
    toast({
      title: "Tenant Added Successfully",
      description: `${formData.name} has been added to unit ${formData.unit}.`,
    });
    navigate("/tenants");
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate("/tenants")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tenants
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Add New Tenant</h1>
            <p className="text-muted-foreground">Register a new tenant to your property</p>
          </div>
        </div>

        {/* Form */}
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Tenant Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g. Adebayo Johnson"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Unit
                  </Label>
                  <Input
                    id="unit"
                    placeholder="e.g. B4"
                    value={formData.unit}
                    onChange={(e) => handleChange("unit", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tenant@email.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    placeholder="+234 803 123 4567"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rentAmount">Monthly Rent (₦)</Label>
                  <Input
                    id="rentAmount"
                    type="number"
                    placeholder="180000"
                    value={formData.rentAmount}
                    onChange={(e) => handleChange("rentAmount", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rentDueDate">Rent Due Date</Label>
                  <Select onValueChange={(value) => handleChange("rentDueDate", value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select due date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1st of every month">1st of every month</SelectItem>
                      <SelectItem value="5th of every month">5th of every month</SelectItem>
                      <SelectItem value="10th of every month">10th of every month</SelectItem>
                      <SelectItem value="15th of every month">15th of every month</SelectItem>
                      <SelectItem value="20th of every month">20th of every month</SelectItem>
                      <SelectItem value="25th of every month">25th of every month</SelectItem>
                      <SelectItem value="Last day of month">Last day of month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="leaseExpiry">Lease Expiry Date</Label>
                <Input
                  id="leaseExpiry"
                  type="date"
                  value={formData.leaseExpiry}
                  onChange={(e) => handleChange("leaseExpiry", e.target.value)}
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="bg-gradient-to-r from-primary to-primary-light">
                  Add Tenant
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate("/tenants")}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AddTenant;