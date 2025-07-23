import { Building2, MapPin, Users, DollarSign, MoreVertical, Edit, Settings } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

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
  onPropertyUpdate?: (property: PropertyCardProps['property']) => void;
}

const PropertyCard = ({ property, onPropertyUpdate }: PropertyCardProps) => {
  const { toast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isUnitsDialogOpen, setIsUnitsDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: property.name,
    address: property.address,
    type: property.type,
    units: property.units,
    status: property.status,
    monthlyRevenue: property.monthlyRevenue
  });
  
  const occupancyRate = Math.round((property.occupiedUnits / property.units) * 100);
  
  const handleEditSubmit = () => {
    const updatedProperty = {
      ...property,
      ...editForm
    };
    
    onPropertyUpdate?.(updatedProperty);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Property Updated",
      description: `${editForm.name} has been updated successfully.`,
    });
  };

  const handleUnitsManagement = () => {
    setIsUnitsDialogOpen(true);
  };

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
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1">
                <Edit className="h-3 w-3 mr-1" />
                Edit Details
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
              <DialogHeader>
                <DialogTitle>Edit Property</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Property Name</Label>
                  <Input
                    id="name"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={editForm.address}
                    onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Property Type</Label>
                  <Input
                    id="type"
                    value={editForm.type}
                    onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="units">Total Units</Label>
                    <Input
                      id="units"
                      type="number"
                      value={editForm.units}
                      onChange={(e) => setEditForm({ ...editForm, units: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="revenue">Monthly Revenue (₦)</Label>
                    <Input
                      id="revenue"
                      type="number"
                      value={editForm.monthlyRevenue}
                      onChange={(e) => setEditForm({ ...editForm, monthlyRevenue: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={editForm.status} onValueChange={(value: any) => setEditForm({ ...editForm, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="vacant">Vacant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleEditSubmit} className="bg-gradient-to-r from-primary to-primary-light">
                    Save Changes
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isUnitsDialogOpen} onOpenChange={setIsUnitsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="flex-1 bg-gradient-to-r from-primary to-primary-light" onClick={handleUnitsManagement}>
                <Settings className="h-3 w-3 mr-1" />
                Manage Units
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Manage Units - {property.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-foreground">{property.units}</div>
                    <div className="text-sm text-muted-foreground">Total Units</div>
                  </div>
                  <div className="p-4 bg-success-light rounded-lg">
                    <div className="text-2xl font-bold text-success">{property.occupiedUnits}</div>
                    <div className="text-sm text-success">Occupied</div>
                  </div>
                  <div className="p-4 bg-warning-light rounded-lg">
                    <div className="text-2xl font-bold text-warning">{property.units - property.occupiedUnits}</div>
                    <div className="text-sm text-warning">Vacant</div>
                  </div>
                </div>
                <div className="text-center text-muted-foreground">
                  Unit management functionality coming soon...
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => setIsUnitsDialogOpen(false)} className="bg-gradient-to-r from-primary to-primary-light">
                    Close
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;