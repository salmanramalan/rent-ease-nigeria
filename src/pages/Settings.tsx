import { Save, Bell, Mail, Smartphone, User, Building2, CreditCard, Clock, Calendar } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account and application preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="john.doe@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="+234 803 123 4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company/Organization</Label>
                <Input id="company" defaultValue="Doe Properties Ltd" />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive rent reminders and updates via email
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    SMS Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Send rent reminders to tenants via SMS
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Payment Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatic reminders for overdue payments
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Property Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Property Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Default Currency</Label>
                <Input id="currency" defaultValue="Nigerian Naira (₦)" readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rentCycle">Default Rent Cycle</Label>
                <Input id="rentCycle" defaultValue="Monthly" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gracePeriod">Grace Period (Days)</Label>
                <Input id="gracePeriod" type="number" defaultValue="7" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lateFee">Late Payment Fee (₦)</Label>
                <Input id="lateFee" type="number" defaultValue="5000" />
              </div>
            </CardContent>
          </Card>

          {/* Payment Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Bank Transfer</Label>
                  <p className="text-sm text-muted-foreground">
                    Accept payments via bank transfer
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mobile Money</Label>
                  <p className="text-sm text-muted-foreground">
                    Accept payments via mobile money platforms
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="bankAccount">Default Bank Account</Label>
                <Input id="bankAccount" defaultValue="First Bank - 1234567890" />
              </div>
            </CardContent>
          </Card>

          {/* Reminder Schedule Settings */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Reminder Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2 font-medium">
                      <Calendar className="h-4 w-4" />
                      6 Months Before Expiry
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Send lease renewal reminders 6 months early
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2 font-medium">
                      <Calendar className="h-4 w-4" />
                      9 Months Before Expiry
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Advanced notice for lease planning
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2 font-medium">
                      <Calendar className="h-4 w-4" />
                      11 Months Before Expiry
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Early lease renewal discussions
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <Label className="text-base font-medium">Reminder Preferences</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reminderTime">Default Reminder Time</Label>
                    <Input id="reminderTime" type="time" defaultValue="09:00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reminderTemplate">Email Template</Label>
                    <Input id="reminderTemplate" defaultValue="Lease Expiry Notice" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSaveSettings} className="bg-gradient-to-r from-primary to-primary-light">
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;