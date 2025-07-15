import { Receipt, Calendar, DollarSign, Send, Download, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BillingCardProps {
  bill: {
    id: string;
    tenantName: string;
    unit: string;
    billType: "rent" | "utility" | "maintenance";
    amount: number;
    dueDate: string;
    issueDate: string;
    status: "paid" | "sent" | "overdue" | "draft";
    description: string;
  };
}

const BillingCard = ({ bill }: BillingCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-success-light text-success border-success/20";
      case "sent":
        return "bg-blue-50 text-business-blue border-blue-200";
      case "overdue":
        return "bg-destructive-light text-destructive border-destructive/20";
      case "draft":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getBillTypeColor = (type: string) => {
    switch (type) {
      case "rent":
        return "bg-primary/10 text-primary";
      case "utility":
        return "bg-warning/10 text-warning";
      case "maintenance":
        return "bg-business-blue/10 text-business-blue";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getBillIcon = () => {
    switch (bill.billType) {
      case "rent":
        return <Receipt className="h-5 w-5" />;
      case "utility":
        return <DollarSign className="h-5 w-5" />;
      case "maintenance":
        return <Receipt className="h-5 w-5" />;
      default:
        return <Receipt className="h-5 w-5" />;
    }
  };

  const isOverdue = new Date(bill.dueDate) < new Date() && bill.status !== "paid";

  return (
    <Card className={`group hover:shadow-elevated transition-all duration-300 border-border hover:border-primary/20 ${isOverdue ? 'ring-1 ring-destructive/20' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getBillTypeColor(bill.billType)}`}>
              {getBillIcon()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {bill.tenantName}
                </h3>
                <Badge variant="outline" className="text-xs">
                  Unit {bill.unit}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{bill.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={getStatusColor(bill.status)}>
              {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
            </Badge>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Amount</div>
            <div className="text-lg font-bold text-foreground">
              ₦{bill.amount.toLocaleString()}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Due Date</div>
            <div className={`text-sm font-medium ${isOverdue ? 'text-destructive' : 'text-foreground'}`}>
              {new Date(bill.dueDate).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Issued: {new Date(bill.issueDate).toLocaleDateString()}</span>
        </div>

        {isOverdue && (
          <div className="p-2 bg-destructive-light rounded-lg border border-destructive/20">
            <p className="text-sm text-destructive font-medium">
              Payment overdue by {Math.ceil((Date.now() - new Date(bill.dueDate).getTime()) / (1000 * 60 * 60 * 24))} days
            </p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          {bill.status === "draft" ? (
            <>
              <Button variant="outline" size="sm" className="flex-1">
                <Send className="h-4 w-4 mr-2" />
                Send Bill
              </Button>
              <Button size="sm" className="flex-1 bg-gradient-to-r from-primary to-primary-light">
                Edit
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button size="sm" className="flex-1 bg-gradient-to-r from-primary to-primary-light">
                <Send className="h-4 w-4 mr-2" />
                Resend
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BillingCard;