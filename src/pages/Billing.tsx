import { Plus, Search, Filter, Calendar, User, Building2, DollarSign } from "lucide-react";
import Layout from "@/components/Layout";
import BillingCard from "@/components/BillingCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const Billing = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    tenantName: "",
    unit: "",
    billType: "",
    amount: "",
    dueDate: "",
    description: ""
  });

  const handleCreateBill = () => {
    // Here you would typically send the data to your backend
    console.log("Creating bill:", formData);
    setIsCreateDialogOpen(false);
    setFormData({
      tenantName: "",
      unit: "",
      billType: "",
      amount: "",
      dueDate: "",
      description: ""
    });
  };

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
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-primary-light">
                <Plus className="h-4 w-4 mr-2" />
                Create Bill
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Create New Bill
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tenantName" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Tenant Name
                    </Label>
                    <Input
                      id="tenantName"
                      value={formData.tenantName}
                      onChange={(e) => setFormData({...formData, tenantName: e.target.value})}
                      placeholder="Enter tenant name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit" className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      Unit
                    </Label>
                    <Input
                      id="unit"
                      value={formData.unit}
                      onChange={(e) => setFormData({...formData, unit: e.target.value})}
                      placeholder="e.g., A12, B4"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="billType">Bill Type</Label>
                    <Select value={formData.billType} onValueChange={(value) => setFormData({...formData, billType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bill type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rent">Rent</SelectItem>
                        <SelectItem value="utility">Utility</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Amount (₦)
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dueDate" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Due Date
                  </Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Enter bill description..."
                    rows={3}
                  />
                </div>
                
                <div className="flex justify-end gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreateBill}
                    className="bg-gradient-to-r from-primary to-primary-light"
                  >
                    Create Bill
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
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