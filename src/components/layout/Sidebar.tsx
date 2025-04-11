
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  FileText,
  Home,
  LayoutDashboard,
  Receipt,
  ScanLine,
  Settings,
  Upload
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, isActive }: SidebarItemProps) => {
  const navigate = useNavigate();
  
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
      )}
      onClick={() => navigate(href)}
    >
      <Icon className="h-5 w-5" />
      {label}
    </Button>
  );
};

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <aside className="hidden md:flex w-64 flex-col bg-sidebar border-r">
      <div className="p-6">
        <h2 className="text-xl font-bold text-sidebar-foreground flex items-center gap-2">
          <ScanLine className="h-6 w-6" />
          <span>BillScan AI</span>
        </h2>
        <p className="text-sm text-sidebar-foreground/70 mt-1">
          Your billing automation solution
        </p>
      </div>
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          <SidebarItem 
            icon={Home} 
            label="Dashboard" 
            href="/dashboard" 
            isActive={isActive("/dashboard")}
          />
          <SidebarItem 
            icon={ScanLine} 
            label="Scan Bills" 
            href="/scan" 
            isActive={isActive("/scan")}
          />
          <SidebarItem 
            icon={Upload} 
            label="Upload Files" 
            href="/upload" 
            isActive={isActive("/upload")}
          />
          <SidebarItem 
            icon={Receipt} 
            label="Bills" 
            href="/bills" 
            isActive={isActive("/bills")}
          />
          <SidebarItem 
            icon={BarChart3} 
            label="Analytics" 
            href="/analytics" 
            isActive={isActive("/analytics")}
          />
          <SidebarItem 
            icon={FileText} 
            label="Reports" 
            href="/reports" 
            isActive={isActive("/reports")}
          />
          <SidebarItem 
            icon={Settings} 
            label="Settings" 
            href="/settings" 
            isActive={isActive("/settings")}
          />
        </div>
      </nav>
      <div className="p-4 border-t border-sidebar-border">
        <div className="text-sm text-sidebar-foreground/70">
          <p className="font-semibold text-sidebar-foreground">BillScan AI</p>
          <p>© {new Date().getFullYear()}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
