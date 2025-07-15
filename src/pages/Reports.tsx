import { Download, FileText, TrendingUp, Users, Building2, Calendar } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Reports = () => {
  const { toast } = useToast();

  const handleDownloadReport = (reportType: string) => {
    // Simulate report download
    toast({
      title: "Report Downloaded",
      description: `${reportType} report has been downloaded successfully.`,
    });
  };

  const reports = [
    {
      title: "Rent Collection Report",
      description: "Monthly rent collection summary and payment status",
      icon: TrendingUp,
      period: "Last 30 Days",
      amount: "₦12,800,000"
    },
    {
      title: "Tenant Summary Report",
      description: "Complete tenant information and lease details",
      icon: Users,
      period: "Current",
      amount: "55 Active Tenants"
    },
    {
      title: "Property Performance",
      description: "Occupancy rates and revenue by property",
      icon: Building2,
      period: "This Quarter",
      amount: "89% Occupancy"
    },
    {
      title: "Arrears Report",
      description: "Outstanding payments and overdue accounts",
      icon: FileText,
      period: "Current",
      amount: "₦480,000 Outstanding"
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports</h1>
            <p className="text-muted-foreground">Generate and download property reports</p>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="current-month">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-month">Current Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="current-quarter">Current Quarter</SelectItem>
                <SelectItem value="last-quarter">Last Quarter</SelectItem>
                <SelectItem value="current-year">Current Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">₦12.8M</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Tenants</p>
                  <p className="text-2xl font-bold">55</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Properties</p>
                  <p className="text-2xl font-bold">4</p>
                </div>
                <Building2 className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Occupancy Rate</p>
                  <p className="text-2xl font-bold">89%</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <report.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{report.title}</h3>
                    <p className="text-sm text-muted-foreground font-normal">
                      {report.description}
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{report.period}</p>
                    <p className="text-lg font-semibold">{report.amount}</p>
                  </div>
                  <Button 
                    onClick={() => handleDownloadReport(report.title)}
                    className="bg-gradient-to-r from-primary to-primary-light"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Custom Report Builder */}
        <Card>
          <CardHeader>
            <CardTitle>Custom Report Builder</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Select defaultValue="rent-collection">
                <SelectTrigger>
                  <SelectValue placeholder="Report Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rent-collection">Rent Collection</SelectItem>
                  <SelectItem value="tenant-list">Tenant List</SelectItem>
                  <SelectItem value="property-performance">Property Performance</SelectItem>
                  <SelectItem value="financial-summary">Financial Summary</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={() => handleDownloadReport("Custom Report")}
                className="bg-gradient-to-r from-primary to-primary-light"
              >
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Reports;