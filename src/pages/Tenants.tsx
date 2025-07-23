import { useState } from "react";
import { Plus, Search, Filter, X } from "lucide-react";
import Layout from "@/components/Layout";
import TenantCard from "@/components/TenantCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const Tenants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProperty, setSelectedProperty] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  const [tenants, setTenants] = useState([
    {
      id: "1",
      name: "Adebayo Johnson",
      email: "adebayo.johnson@email.com",
      phone: "+234 803 123 4567",
      property: "Ikoyi Heights",
      propertyAddress: "Victoria Island, Lagos",
      unit: "Unit 21",
      annualRent: 2400000,
      rentStartDate: "2024-01-15",
      paymentStatus: "paid" as const,
      leaseExpiry: "2024-12-31"
    },
    {
      id: "2",
      name: "Chioma Okeke", 
      email: "chioma.okeke@email.com",
      phone: "+234 802 987 6543",
      property: "Lekki Gardens",
      propertyAddress: "Lekki Phase 1, Lagos",
      unit: "Unit 33",
      annualRent: 1800000,
      rentStartDate: "2024-02-10",
      paymentStatus: "due" as const,
      leaseExpiry: "2025-03-15"
    },
    {
      id: "3",
      name: "Ibrahim Musa",
      email: "ibrahim.musa@email.com", 
      phone: "+234 701 555 0123",
      property: "Abuja Business Center",
      propertyAddress: "Central Business District, Abuja",
      unit: "Unit 16",
      annualRent: 4800000,
      rentStartDate: "2023-08-01",
      paymentStatus: "overdue" as const,
      leaseExpiry: "2024-08-20"
    },
    {
      id: "4",
      name: "Funmi Adeleke",
      email: "funmi.adeleke@email.com",
      phone: "+234 805 444 7890", 
      property: "Surulere Plaza",
      propertyAddress: "Surulere, Lagos",
      unit: "Unit 9",
      annualRent: 2000000,
      rentStartDate: "2024-03-20",
      paymentStatus: "paid" as const,
      leaseExpiry: "2025-06-30"
    }
  ]);

  const handleTenantUpdate = (updatedTenant: any) => {
    setTenants(prev => 
      prev.map(tenant => 
        tenant.id === updatedTenant.id ? updatedTenant : tenant
      )
    );
  };

  // Get unique properties and locations for filter options
  const uniqueProperties = [...new Set(tenants.map(tenant => tenant.property))];
  const uniqueLocations = [...new Set(tenants.map(tenant => {
    // Extract city/area from address (e.g., "Victoria Island, Lagos" -> "Lagos")
    const parts = tenant.propertyAddress.split(", ");
    return parts[parts.length - 1];
  }))];

  // Filter tenants based on search and filters
  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.unit.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProperty = !selectedProperty || tenant.property === selectedProperty;
    
    const matchesLocation = !selectedLocation || 
                           tenant.propertyAddress.toLowerCase().includes(selectedLocation.toLowerCase());
    
    return matchesSearch && matchesProperty && matchesLocation;
  });

  const clearFilters = () => {
    setSelectedProperty("");
    setSelectedLocation("");
    setSearchTerm("");
  };

  const hasActiveFilters = selectedProperty || selectedLocation || searchTerm;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tenants</h1>
            <p className="text-muted-foreground">Manage tenant information and lease details</p>
          </div>
          <Button 
            className="bg-gradient-to-r from-primary to-primary-light"
            onClick={() => window.location.href = '/tenants/add'}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Tenant
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search tenants..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? "bg-muted" : ""}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Filter Controls */}
          {showFilters && (
            <div className="p-4 border rounded-lg bg-muted/50 space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Property</label>
                  <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                    <SelectTrigger>
                      <SelectValue placeholder="All properties" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All properties</SelectItem>
                      {uniqueProperties.map((property) => (
                        <SelectItem key={property} value={property}>
                          {property}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="All locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All locations</SelectItem>
                      {uniqueLocations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button variant="outline" onClick={clearFilters} className="w-full">
                    <X className="h-4 w-4 mr-2" />
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <Badge variant="secondary" className="gap-1">
                  Search: {searchTerm}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => setSearchTerm("")}
                  />
                </Badge>
              )}
              {selectedProperty && (
                <Badge variant="secondary" className="gap-1">
                  Property: {selectedProperty}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => setSelectedProperty("")}
                  />
                </Badge>
              )}
              {selectedLocation && (
                <Badge variant="secondary" className="gap-1">
                  Location: {selectedLocation}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => setSelectedLocation("")}
                  />
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Results Info */}
        <div className="text-sm text-muted-foreground">
          Showing {filteredTenants.length} of {tenants.length} tenants
        </div>

        {/* Tenants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTenants.map((tenant) => (
            <TenantCard 
              key={tenant.id} 
              tenant={tenant} 
              onTenantUpdate={handleTenantUpdate}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredTenants.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">No tenants found matching your criteria</div>
            <Button variant="outline" onClick={clearFilters}>
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Tenants;