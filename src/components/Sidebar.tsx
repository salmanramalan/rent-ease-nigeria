import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  Receipt, 
  CreditCard, 
  FileText, 
  Settings,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import UserMenu from "@/components/UserMenu";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: LayoutDashboard
    },
    {
      title: "Properties",
      href: "/properties",
      icon: Building2
    },
    {
      title: "Tenants",
      href: "/tenants",
      icon: Users
    },
    {
      title: "Billing",
      href: "/billing",
      icon: Receipt
    },
    {
      title: "Payments",
      href: "/payments",
      icon: CreditCard
    },
    {
      title: "Reports",
      href: "/reports",
      icon: FileText
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings
    }
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="sm"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full bg-card border-r border-border transition-all duration-300 lg:relative lg:translate-x-0",
          isCollapsed ? "w-16" : "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div className="font-bold text-foreground">RentEase Nigeria</div>
            </div>
          )}
          <div className="flex items-center gap-2">
            {!isCollapsed && <UserMenu />}
            <Button
              variant="ghost"
              size="sm"
              className="hidden lg:flex"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                isActive(item.href)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              onClick={() => setIsMobileOpen(false)}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {(!isCollapsed || isMobileOpen) && <span className="font-medium">{item.title}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Section */}
        {!isCollapsed && (
          <div className="absolute bottom-4 left-4 right-4 p-4 bg-muted rounded-lg">
            <div className="text-sm font-medium text-foreground">Quick Tip</div>
            <div className="text-xs text-muted-foreground mt-1">
              Send rent reminders via SMS to improve collection rates
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;