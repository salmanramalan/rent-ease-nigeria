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
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const AddTenant = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState<any[]>([]);
  const [availableUnits, setAvailableUnits] = useState<any[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  
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

  // Fetch properties with vacancies
  useEffect(() => {
    if (!user) return;
    
    const fetchPropertiesWithVacancies = async () => {
      const { data: propertiesData, error } = await supabase
        .from('properties')
        .select(`
          *,
          units:units(id, unit_number, is_occupied)
        `)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching properties:', error);
        return;
      }

      // Filter properties that have available units
      const propertiesWithVacancies = propertiesData?.filter(property => 
        property.units?.some((unit: any) => !unit.is_occupied)
      ) || [];

      setProperties(propertiesWithVacancies);
    };

    fetchPropertiesWithVacancies();

    // Set up real-time updates for properties and units
    const propertiesChannel = supabase
      .channel('properties-channel')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'properties',
        filter: `user_id=eq.${user.id}`
      }, () => {
        fetchPropertiesWithVacancies();
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'units'
      }, () => {
        fetchPropertiesWithVacancies();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(propertiesChannel);
    };
  }, [user]);

  // Generate available units when property is selected
  useEffect(() => {
    if (selectedProperty) {
      const availableUnitsForProperty = selectedProperty.units?.filter((unit: any) => !unit.is_occupied) || [];
      setAvailableUnits(availableUnitsForProperty);
      
      // Auto-fill annual rent based on monthly rent
      const annualRent = selectedProperty.monthly_rent ? selectedProperty.monthly_rent * 12 : "";
      setFormData(prev => ({ 
        ...prev, 
        annualRent: annualRent.toString(),
        unit: "" // Reset unit selection
      }));
    }
  }, [selectedProperty]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedProperty) return;

    setLoading(true);
    try {
      const selectedUnit = availableUnits.find(unit => unit.id === formData.unit);
      if (!selectedUnit) {
        throw new Error('Please select a valid unit');
      }

      const { error } = await supabase
        .from('tenants')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          property_id: selectedProperty.id,
          unit_id: selectedUnit.id,
          unit_number: selectedUnit.unit_number,
          lease_start: formData.rentStartDate,
          lease_end: formData.leaseExpiry,
          monthly_rent: parseFloat(formData.annualRent) / 12,
          security_deposit: 0,
          user_id: user.id
        });

      if (error) throw error;

      toast({
        title: "Tenant Added Successfully",
        description: `${formData.name} has been added to ${selectedUnit.unit_number} at ${selectedProperty.name}.`,
      });
      navigate("/tenants");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add tenant. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
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
                  <SelectContent className="bg-background border-border z-50">
                    {properties.map((property) => {
                      const vacantUnits = property.units?.filter((unit: any) => !unit.is_occupied).length || 0;
                      return (
                        <SelectItem key={property.id} value={property.id}>
                          {property.name} - {property.address} ({vacantUnits} units available)
                        </SelectItem>
                      );
                    })}
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
                     <SelectContent className="bg-background border-border z-50">
                       {availableUnits.map((unit) => (
                         <SelectItem key={unit.id} value={unit.id}>
                           {unit.unit_number}
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
                <Button type="submit" disabled={loading} className="bg-gradient-to-r from-primary to-primary-light">
                  {loading ? "Adding..." : "Add Tenant"}
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