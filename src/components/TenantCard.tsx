import { User, Phone, Mail, Home, Calendar, AlertCircle, Download, MoreVertical, Building, MessageSquare, ChevronDown, Edit, Bell, MapPin, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

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
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const handleEmailContact = () => {
    const subject = `Regarding ${tenant.property} - ${tenant.unit}`;
    const body = `Dear ${tenant.name},\n\nI hope this message finds you well.\n\nBest regards,\nProperty Management Team`;
    window.open(`mailto:${tenant.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const handleWhatsAppContact = () => {
    const message = `Hello ${tenant.name}, this is regarding your tenancy at ${tenant.property} - ${tenant.unit}.`;
    const phoneNumber = tenant.phone.replace(/[^\d]/g, '');
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`);
  };

  const handleEditTenant = () => {
    toast({
      title: "Edit Tenant",
      description: `Redirecting to edit ${tenant.name}...`,
    });
    // In a real app, this would navigate to edit page
    // window.location.href = `/tenants/edit/${tenant.id}`;
  };

  const handleSendReminder = () => {
    toast({
      title: "Reminder Sent",
      description: `Payment reminder sent to ${tenant.name} via email and SMS.`,
    });
  };

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1">
                Contact
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-40">
              <DropdownMenuItem onClick={handleEmailContact}>
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleWhatsAppContact}>
                <MessageSquare className="h-4 w-4 mr-2" />
                WhatsApp
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="flex-1 bg-gradient-to-r from-primary to-primary-light">
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px] max-h-[80vh] overflow-y-auto">"
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {tenant.name} - Tenant Details
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                {/* Header Section */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 bg-gradient-to-br from-primary to-primary-light">
                    <AvatarFallback className="text-white font-semibold bg-transparent text-lg">
                      {getInitials(tenant.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground">{tenant.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className={getStatusColor(tenant.paymentStatus)}>
                        {tenant.paymentStatus.charAt(0).toUpperCase() + tenant.paymentStatus.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Contact Information */}
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Contact Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Email</div>
                        <div className="font-medium text-foreground">{tenant.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Phone</div>
                        <div className="font-medium text-foreground">{tenant.phone}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Property Information */}
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Property Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Building className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Property</div>
                        <div className="font-medium text-foreground">{tenant.property}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Home className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Unit</div>
                        <div className="font-medium text-foreground">{tenant.unit}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg md:col-span-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Address</div>
                        <div className="font-medium text-foreground">{tenant.propertyAddress}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Financial Information */}
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Financial Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Annual Rent</div>
                        <div className="font-medium text-foreground">₦{tenant.annualRent.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Monthly Rent</div>
                        <div className="font-medium text-foreground">₦{Math.round(tenant.annualRent / 12).toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Lease Information */}
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Lease Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Start Date</div>
                        <div className="font-medium text-foreground">{new Date(tenant.rentStartDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="text-xs text-muted-foreground">Expiry Date</div>
                          <div className="font-medium text-foreground">{tenant.leaseExpiry}</div>
                        </div>
                        {new Date(tenant.leaseExpiry) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
                          <AlertCircle className="h-4 w-4 text-warning" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={handleEmailContact}>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                  <Button variant="outline" onClick={handleWhatsAppContact}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button onClick={() => setIsDetailsDialogOpen(false)} className="bg-gradient-to-r from-primary to-primary-light">
                    Close
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem onClick={handleEditTenant}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Tenant
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSendReminder}>
                <Bell className="h-4 w-4 mr-2" />
                Send Reminder
              </DropdownMenuItem>
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