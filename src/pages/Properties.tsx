import { Plus, Search, Filter } from "lucide-react";
import Layout from "@/components/Layout";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Properties = () => {
  // Mock data for demonstration
  const properties = [
    {
      id: "1",
      name: "Ikoyi Heights",
      address: "Victoria Island, Lagos",
      type: "Apartment Complex",
      units: 24,
      occupiedUnits: 20,
      monthlyRevenue: 4800000,
      status: "active" as const
    },
    {
      id: "2", 
      name: "Lekki Gardens",
      address: "Lekki Phase 1, Lagos",
      type: "Residential Estate",
      units: 36,
      occupiedUnits: 32,
      monthlyRevenue: 5600000,
      status: "active" as const
    },
    {
      id: "3",
      name: "Abuja Business Center",
      address: "Central Business District, Abuja",
      type: "Commercial Complex",
      units: 18,
      occupiedUnits: 15,
      monthlyRevenue: 7200000,
      status: "maintenance" as const
    },
    {
      id: "4",
      name: "Surulere Plaza",
      address: "Surulere, Lagos",
      type: "Mixed Use",
      units: 12,
      occupiedUnits: 8,
      monthlyRevenue: 2400000,
      status: "active" as const
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Properties</h1>
            <p className="text-muted-foreground">Manage all your properties and units</p>
          </div>
          <Button 
            className="bg-gradient-to-r from-primary to-primary-light"
            onClick={() => window.location.href = '/properties/add'}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search properties..." 
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Properties;