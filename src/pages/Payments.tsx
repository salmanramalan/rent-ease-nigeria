import { Search, Filter, Download, TrendingUp } from "lucide-react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const Payments = () => {
  // Mock data for demonstration
  const payments = [
    {
      id: "1",
      tenantName: "Adebayo Johnson",
      unit: "B4",
      amount: 180000,
      date: "2024-01-15",
      method: "Bank Transfer",
      reference: "TXN-2024-001",
      status: "confirmed" as const,
      type: "rent"
    },
    {
      id: "2",
      tenantName: "Funmi Adeleke",
      unit: "D3",
      amount: 200000,
      date: "2024-01-14",
      method: "Mobile Money",
      reference: "TXN-2024-002", 
      status: "confirmed" as const,
      type: "rent"
    },
    {
      id: "3",
      tenantName: "Chioma Okeke",
      unit: "A12",
      amount: 25000,
      date: "2024-01-12",
      method: "Cash",
      reference: "CASH-2024-003",
      status: "pending" as const,
      type: "utility"
    },
    {
      id: "4",
      tenantName: "Ibrahim Musa",
      unit: "C7",
      amount: 150000,
      date: "2024-01-10",
      method: "Bank Transfer",
      reference: "TXN-2024-004",
      status: "failed" as const,
      type: "rent"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-success-light text-success border-success/20";
      case "pending":
        return "bg-warning-light text-warning border-warning/20";
      case "failed":
        return "bg-destructive-light text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "Bank Transfer":
        return "bg-business-blue/10 text-business-blue";
      case "Mobile Money":
        return "bg-primary/10 text-primary";
      case "Cash":
        return "bg-warning/10 text-warning";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const totalPayments = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const confirmedPayments = payments.filter(p => p.status === "confirmed");
  const confirmedAmount = confirmedPayments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Payments</h1>
            <p className="text-muted-foreground">Track and manage all tenant payments</p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Payments
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">₦{totalPayments.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Confirmed Payments
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">₦{confirmedAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{confirmedPayments.length} transactions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Amount
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                ₦{(totalPayments - confirmedAmount).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search payments..." 
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Payments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="font-medium text-foreground">{payment.tenantName}</div>
                      <div className="text-sm text-muted-foreground">Unit {payment.unit}</div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline" className={getStatusColor(payment.status)}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </Badge>
                      <Badge variant="outline" className={getMethodColor(payment.method)}>
                        {payment.method}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-foreground">₦{payment.amount.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">{new Date(payment.date).toLocaleDateString()}</div>
                    <div className="text-xs text-muted-foreground">{payment.reference}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Payments;