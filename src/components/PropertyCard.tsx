import { Building2, MapPin, Users, DollarSign, MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  property: {
    id: string;
    name: string;
    address: string;
    type: string;
    units: number;
    occupiedUnits: number;
    monthlyRevenue: number;
    status: "active" | "maintenance" | "vacant";
  };
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const occupancyRate = Math.round((property.occupiedUnits / property.units) * 100);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success-light text-success border-success/20";
      case "maintenance":
        return "bg-warning-light text-warning border-warning/20";
      case "vacant":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <Card className="group hover:shadow-elevated transition-all duration-300 border-border hover:border-primary/20">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {property.name}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {property.address}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={getStatusColor(property.status)}>
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </Badge>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              Occupancy
            </div>
            <div className="text-lg font-semibold text-foreground">
              {property.occupiedUnits}/{property.units} ({occupancyRate}%)
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              Monthly Revenue
            </div>
            <div className="text-lg font-semibold text-foreground">
              ₦{property.monthlyRevenue.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 bg-muted rounded-full h-2">
            <div 
              className="h-2 bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-500"
              style={{ width: `${occupancyRate}%` }}
            />
          </div>
          <span className="text-sm font-medium text-foreground">{occupancyRate}%</span>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            View Details
          </Button>
          <Button size="sm" className="flex-1 bg-gradient-to-r from-primary to-primary-light">
            Manage Units
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;