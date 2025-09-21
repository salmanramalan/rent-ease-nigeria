import { Building2, Users, DollarSign, TrendingUp, Plus, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import SubscriptionStatus from "@/components/SubscriptionStatus";

const Dashboard = () => {
  const { user } = useAuth();
  const { propertyCount, canAddProperty, isFreePlan } = useSubscription();
  
  // Stats will be real data from the user's properties
  const stats = [
    {
      title: "Total Properties",
      value: propertyCount.toString(),
      change: isFreePlan ? `${2 - propertyCount} remaining on free plan` : "Unlimited on premium",
      icon: Building2,
      gradient: "bg-gradient-to-br from-primary to-primary-light"
    },
    {
      title: "Active Tenants",
      value: "45",
      change: "+5 this month",
      icon: Users,
      gradient: "bg-gradient-to-br from-business-blue to-blue-600"
    },
    {
      title: "Monthly Revenue",
      value: "₦2,450,000",
      change: "+12% from last month",
      icon: DollarSign,
      gradient: "bg-gradient-to-br from-success to-success-light"
    },
    {
      title: "Collection Rate",
      value: "89%",
      change: "+3% from last month",
      icon: TrendingUp,
      gradient: "bg-gradient-to-br from-warning to-orange-500"
    }
  ];

  const recentActivities = [
    { tenant: "Adebayo Johnson", action: "Paid rent for Unit B4", amount: "₦180,000", time: "2 hours ago", status: "paid" },
    { tenant: "Chioma Okeke", action: "Rent due reminder sent", amount: "₦220,000", time: "5 hours ago", status: "due" },
    { tenant: "Ibrahim Musa", action: "Late payment", amount: "₦150,000", time: "1 day ago", status: "overdue" },
    { tenant: "Funmi Adeleke", action: "Maintenance request", amount: "", time: "2 days ago", status: "maintenance" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "text-status-paid bg-success-light";
      case "due":
        return "text-status-due bg-warning-light";
      case "overdue":
        return "text-status-overdue bg-destructive-light";
      case "maintenance":
        return "text-business-blue bg-blue-50";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Property Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0]}! Here's what's happening with your properties.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.location.href = '/reports'}
          >
            <FileText className="h-4 w-4 mr-2" />
            View Reports
          </Button>
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-primary to-primary-light"
            onClick={() => window.location.href = '/properties/add'}
            disabled={!canAddProperty()}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        </div>
      </div>

      {/* Stats and Subscription Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Stats Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.gradient}`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Subscription Status */}
        <div className="lg:col-span-1">
          <SubscriptionStatus />
        </div>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Recent Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="font-medium text-foreground">{activity.tenant}</div>
                    {activity.status && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                        {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                </div>
                <div className="text-right">
                  {activity.amount && (
                    <div className="font-semibold text-foreground">{activity.amount}</div>
                  )}
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;