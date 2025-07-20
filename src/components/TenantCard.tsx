import { User, Phone, Mail, Home, Calendar, AlertCircle, Download, MoreVertical, Building } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface TenantCardProps {
  tenant: {
    id: string;
    name: string;
    email: string;
    phone: string;
    property: string;
    propertyAddress: string;
    unit: string;
    annualRent: number;
    rentStartDate: string;
    paymentStatus: "paid" | "due" | "overdue";
    leaseExpiry: string;
  };
}

const TenantCard = ({ tenant }: TenantCardProps) => {
  const { toast } = useToast();

  const handleDownloadDetails = () => {
    // Create tenant details as downloadable content
    const tenantDetails = `
TENANT DETAILS
=============
Name: ${tenant.name}
Email: ${tenant.email}
Phone: ${tenant.phone}
Property: ${tenant.property}
Property Address: ${tenant.propertyAddress}
Unit: ${tenant.unit}
Annual Rent: ₦${tenant.annualRent.toLocaleString()}
Rent Start Date: ${tenant.rentStartDate}
Payment Status: ${tenant.paymentStatus}
Lease Expiry: ${tenant.leaseExpiry}
Generated: ${new Date().toLocaleDateString()}
    `.trim();

    // Create and download file
    const blob = new Blob([tenantDetails], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tenant.name.replace(/\s+/g, '_')}_details.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Details Downloaded",
      description: `${tenant.name}'s details have been downloaded successfully.`,
    });
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-success-light text-success border-success/20";
      case "due":
        return "bg-warning-light text-warning border-warning/20";
      case "overdue":
        return "bg-destructive-light text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="group hover:shadow-elevated transition-all duration-300 border-border hover:border-primary/20">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 bg-gradient-to-br from-primary to-primary-light">
              <AvatarFallback className="text-white font-semibold bg-transparent">
                {getInitials(tenant.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {tenant.name}
              </h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Home className="h-3 w-3" />
                {tenant.unit}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Building className="h-3 w-3" />
                {tenant.property}
              </div>
            </div>
          </div>
          <Badge variant="outline" className={getStatusColor(tenant.paymentStatus)}>
            {tenant.paymentStatus.charAt(0).toUpperCase() + tenant.paymentStatus.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">{tenant.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">{tenant.email}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 p-3 bg-muted rounded-lg">
          <div>
            <div className="text-xs text-muted-foreground">Annual Rent</div>
            <div className="font-semibold text-foreground">₦{tenant.annualRent.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Start Date</div>
            <div className="font-semibold text-foreground">{new Date(tenant.rentStartDate).toLocaleDateString()}</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Lease expires:</span>
          <span className="text-foreground font-medium">{tenant.leaseExpiry}</span>
          {new Date(tenant.leaseExpiry) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
            <AlertCircle className="h-4 w-4 text-warning" />
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            Contact
          </Button>
          <Button size="sm" className="flex-1 bg-gradient-to-r from-primary to-primary-light">
            View Details
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Edit Tenant</DropdownMenuItem>
              <DropdownMenuItem>Send Reminder</DropdownMenuItem>
              <DropdownMenuItem>View History</DropdownMenuItem>
              <DropdownMenuItem onClick={handleDownloadDetails}>
                <Download className="h-4 w-4 mr-2" />
                Download Details
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Remove Tenant</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default TenantCard;