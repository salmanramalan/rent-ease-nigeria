import { Plus, Search, Filter } from "lucide-react";
import Layout from "@/components/Layout";
import BillingCard from "@/components/BillingCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Billing = () => {
  // Mock data for demonstration
  const bills = [
    {
      id: "1",
      tenantName: "Adebayo Johnson",
      unit: "B4",
      billType: "rent" as const,
      amount: 180000,
      dueDate: "2024-01-15",
      issueDate: "2024-01-01",
      status: "paid" as const,
      description: "Monthly rent for January 2024"
    },
    {
      id: "2",
      tenantName: "Chioma Okeke",
      unit: "A12", 
      billType: "rent" as const,
      amount: 220000,
      dueDate: "2024-01-10",
      issueDate: "2024-01-01",
      status: "sent" as const,
      description: "Monthly rent for January 2024"
    },
    {
      id: "3",
      tenantName: "Ibrahim Musa",
      unit: "C7",
      billType: "utility" as const,
      amount: 25000,
      dueDate: "2024-01-05",
      issueDate: "2024-01-01", 
      status: "overdue" as const,
      description: "Electricity and water charges"
    },
    {
      id: "4",
      tenantName: "Funmi Adeleke",
      unit: "D3",
      billType: "maintenance" as const,
      amount: 15000,
      dueDate: "2024-01-20",
      issueDate: "2024-01-01",
      status: "draft" as const,
      description: "Air conditioning maintenance"
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Billing</h1>
            <p className="text-muted-foreground">Create and manage bills for tenants</p>
          </div>
          <Button className="bg-gradient-to-r from-primary to-primary-light">
            <Plus className="h-4 w-4 mr-2" />
            Create Bill
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search bills..." 
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Bills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {bills.map((bill) => (
            <BillingCard key={bill.id} bill={bill} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Billing;