import { Plus, Search, Filter } from "lucide-react";
import Layout from "@/components/Layout";
import TenantCard from "@/components/TenantCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Tenants = () => {
  // Mock data for demonstration
  const tenants = [
    {
      id: "1",
      name: "Adebayo Johnson",
      email: "adebayo.johnson@email.com",
      phone: "+234 803 123 4567",
      unit: "B4",
      rentAmount: 180000,
      rentDueDate: "15th of every month",
      paymentStatus: "paid" as const,
      leaseExpiry: "2024-12-31"
    },
    {
      id: "2",
      name: "Chioma Okeke", 
      email: "chioma.okeke@email.com",
      phone: "+234 802 987 6543",
      unit: "A12",
      rentAmount: 220000,
      rentDueDate: "10th of every month",
      paymentStatus: "due" as const,
      leaseExpiry: "2025-03-15"
    },
    {
      id: "3",
      name: "Ibrahim Musa",
      email: "ibrahim.musa@email.com", 
      phone: "+234 701 555 0123",
      unit: "C7",
      rentAmount: 150000,
      rentDueDate: "1st of every month",
      paymentStatus: "overdue" as const,
      leaseExpiry: "2024-08-20"
    },
    {
      id: "4",
      name: "Funmi Adeleke",
      email: "funmi.adeleke@email.com",
      phone: "+234 805 444 7890", 
      unit: "D3",
      rentAmount: 200000,
      rentDueDate: "20th of every month",
      paymentStatus: "paid" as const,
      leaseExpiry: "2025-06-30"
    }
  ];

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
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search tenants..." 
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Tenants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {tenants.map((tenant) => (
            <TenantCard key={tenant.id} tenant={tenant} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Tenants;