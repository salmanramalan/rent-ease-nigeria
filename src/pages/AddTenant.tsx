import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, Home, Building } from "lucide-react";
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
  
  // Mock properties data with annual rent per unit
  const properties = [
    {
      id: "1",
      name: "Ikoyi Heights",
      address: "Victoria Island, Lagos",
      type: "Apartment Complex",
      units: 24,
      occupiedUnits: 20,
      annualRentPerUnit: 2400000
    },
    {
      id: "2", 
      name: "Lekki Gardens",
      address: "Lekki Phase 1, Lagos",
      type: "Residential Estate",
      units: 36,
      occupiedUnits: 32,
      annualRentPerUnit: 1800000
    },
    {
      id: "3",
      name: "Abuja Business Center",
      address: "Central Business District, Abuja",
      type: "Commercial Complex",
      units: 18,
      occupiedUnits: 15,
      annualRentPerUnit: 4800000
    },
    {
      id: "4",
      name: "Surulere Plaza",
      address: "Surulere, Lagos",
      type: "Mixed Use",
      units: 12,
      occupiedUnits: 8,
      annualRentPerUnit: 2000000
    }
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    property: "",
    unit: "",
    annualRent: "",
    rentStartDate: "",
    leaseExpiry: ""
  });

  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [availableUnits, setAvailableUnits] = useState<string[]>([]);

  // Generate available units when property is selected
  useEffect(() => {
    if (selectedProperty) {
      const availableUnitsCount = selectedProperty.units - selectedProperty.occupiedUnits;
      const units = [];
      for (let i = 1; i <= availableUnitsCount; i++) {
        units.push(`Unit ${i + selectedProperty.occupiedUnits}`);
      }
      setAvailableUnits(units);
      
      // Auto-fill annual rent
      setFormData(prev => ({ 
        ...prev, 
        annualRent: selectedProperty.annualRentPerUnit.toString(),
        unit: "" // Reset unit selection
      }));
    }
  }, [selectedProperty]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate tenant creation
    toast({
      title: "Tenant Added Successfully",
      description: `${formData.name} has been added to ${formData.unit} at ${selectedProperty?.name}.`,
    });
    navigate("/tenants");
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePropertyChange = (value: string) => {
    const property = properties.find(p => p.id === value);
    setSelectedProperty(property);
    handleChange("property", value);
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
              {/* Property Selection */}
              <div className="space-y-2">
                <Label htmlFor="property" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Select Property
                </Label>
                <Select onValueChange={handlePropertyChange} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a property" />
                  </SelectTrigger>
                  <SelectContent>
                    {properties.map((property) => (
                      <SelectItem key={property.id} value={property.id}>
                        {property.name} - {property.address} ({property.units - property.occupiedUnits} units available)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

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
                  <Select 
                    onValueChange={(value) => handleChange("unit", value)} 
                    disabled={!selectedProperty}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={selectedProperty ? "Select available unit" : "Select property first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {availableUnits.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  <Label htmlFor="annualRent">Annual Rent (₦)</Label>
                  <Input
                    id="annualRent"
                    type="number"
                    placeholder="2400000"
                    value={formData.annualRent}
                    onChange={(e) => handleChange("annualRent", e.target.value)}
                    disabled={!!selectedProperty}
                    required
                  />
                  {selectedProperty && (
                    <p className="text-sm text-muted-foreground">
                      Auto-filled based on selected property
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rentStartDate">Rent Start Date</Label>
                  <Input
                    id="rentStartDate"
                    type="date"
                    value={formData.rentStartDate}
                    onChange={(e) => handleChange("rentStartDate", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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