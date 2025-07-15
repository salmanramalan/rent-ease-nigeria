import { User, Phone, Mail, Home, Calendar, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TenantCardProps {
  tenant: {
    id: string;
    name: string;
    email: string;
    phone: string;
    unit: string;
    rentAmount: number;
    rentDueDate: string;
    paymentStatus: "paid" | "due" | "overdue";
    leaseExpiry: string;
  };
}

const TenantCard = ({ tenant }: TenantCardProps) => {
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
                Unit {tenant.unit}
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
            <div className="text-xs text-muted-foreground">Monthly Rent</div>
            <div className="font-semibold text-foreground">₦{tenant.rentAmount.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Due Date</div>
            <div className="font-semibold text-foreground">{tenant.rentDueDate}</div>
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
        </div>
      </CardContent>
    </Card>
  );
};

export default TenantCard;