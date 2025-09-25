import { useState, useEffect } from "react";
import { Plus, Search, Filter, X } from "lucide-react";
import Layout from "@/components/Layout";
import TenantCard from "@/components/TenantCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const Tenants = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProperty, setSelectedProperty] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [tenants, setTenants] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTenants();
      fetchProperties();
    }
  }, [user]);

  const fetchTenants = async () => {
    try {
      const { data, error } = await supabase
        .from('tenants')
        .select(`
          *,
          properties (
            name,
            address
          )
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching tenants:', error);
        return;
      }

      setTenants(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('user_id', user?.id);

      if (error) {
        console.error('Error fetching properties:', error);
        return;
      }

      setProperties(data || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleTenantUpdate = (updatedTenant: any) => {
    setTenants(prev => 
      prev.map(tenant => 
        tenant.id === updatedTenant.id ? updatedTenant : tenant
      )
    );
  };

  // Get unique properties and locations for filter options
  const uniqueProperties = [...new Set(tenants.map(tenant => tenant.properties?.name).filter(Boolean))];
  const uniqueLocations = [...new Set(tenants.map(tenant => {
    if (!tenant.properties?.address) return null;
    // Extract city/area from address (e.g., "Victoria Island, Lagos" -> "Lagos")
    const parts = tenant.properties.address.split(", ");
    return parts[parts.length - 1];
  }).filter(Boolean))];

  // Filter tenants based on search and filters
  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (tenant.email && tenant.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (tenant.unit_number && tenant.unit_number.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesProperty = !selectedProperty || tenant.properties?.name === selectedProperty;
    
    const matchesLocation = !selectedLocation || 
                           (tenant.properties?.address && tenant.properties.address.toLowerCase().includes(selectedLocation.toLowerCase()));
    
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
        {loading ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground">Loading tenants...</div>
          </div>
        ) : filteredTenants.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              {tenants.length === 0 ? "No tenants found. Add your first tenant to get started." : "No tenants found matching your criteria"}
            </div>
            {tenants.length === 0 ? (
              <Button 
                className="bg-gradient-to-r from-primary to-primary-light"
                onClick={() => window.location.href = '/tenants/add'}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Tenant
              </Button>
            ) : (
              <Button variant="outline" onClick={clearFilters}>
                Clear all filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTenants.map((tenant) => (
              <TenantCard 
                key={tenant.id} 
                tenant={tenant} 
                onTenantUpdate={handleTenantUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Tenants;