
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import MechanicServiceTracker from '@/components/MechanicServiceTracker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Wrench, 
  Users, 
  Calendar, 
  AlertTriangle,
  Clock,
  CheckCircle,
  Plus,
  TrendingUp,
  Settings,
  Archive
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'super_admin': return 'Super Admin';
      case 'manager': return 'Manager';
      case 'mechanic': return 'Mechanic';
      default: return role;
    }
  };

  // Role-specific KPIs
  const getKPIsForRole = () => {
    if (user?.role === 'super_admin') {
      return [
        {
          title: "Total Staff",
          value: "8",
          change: "+1 this month",
          icon: Users,
          color: "text-paulstar-blue",
          bg: "bg-paulstar-blue/20"
        },
        {
          title: "Today's Revenue",
          value: "$2,450",
          change: "+12% from yesterday",
          icon: TrendingUp,
          color: "text-paulstar-gold",
          bg: "bg-paulstar-gold/20"
        },
        {
          title: "Active Services",
          value: "7",
          change: "In progress",
          icon: Wrench,
          color: "text-paulstar-orange",
          bg: "bg-paulstar-orange/20"
        },
        {
          title: "System Alerts",
          value: "3",
          change: "Needs attention",
          icon: AlertTriangle,
          color: "text-red-400",
          bg: "bg-red-500/20"
        }
      ];
    } else if (user?.role === 'manager') {
      return [
        {
          title: "Today's Appointments",
          value: "12",
          change: "+2 from yesterday",
          icon: Calendar,
          color: "text-paulstar-blue",
          bg: "bg-paulstar-blue/20"
        },
        {
          title: "Active Services",
          value: "7",
          change: "In progress",
          icon: Wrench,
          color: "text-paulstar-orange",
          bg: "bg-paulstar-orange/20"
        },
        {
          title: "Completed Today",
          value: "5",
          change: "+1 from yesterday",
          icon: CheckCircle,
          color: "text-green-400",
          bg: "bg-green-500/20"
        },
        {
          title: "Low Stock Alerts",
          value: "3",
          change: "Needs restocking",
          icon: Archive,
          color: "text-red-400",
          bg: "bg-red-500/20"
        }
      ];
    } else {
      // Mechanic
      return [
        {
          title: "My Services Today",
          value: "4",
          change: "2 completed",
          icon: Wrench,
          color: "text-paulstar-blue",
          bg: "bg-paulstar-blue/20"
        },
        {
          title: "Time Worked",
          value: "6.5h",
          change: "Today",
          icon: Clock,
          color: "text-paulstar-gold",
          bg: "bg-paulstar-gold/20"
        },
        {
          title: "Parts Used",
          value: "8",
          change: "From inventory",
          icon: Archive,
          color: "text-paulstar-orange",
          bg: "bg-paulstar-orange/20"
        },
        {
          title: "Completed",
          value: "2",
          change: "Services done",
          icon: CheckCircle,
          color: "text-green-400",
          bg: "bg-green-500/20"
        }
      ];
    }
  };

  const kpis = getKPIsForRole();

  // If mechanic, show the specialized service tracker
  if (user?.role === 'mechanic') {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          {/* Welcome header */}
          <div className="glass-card p-6">
            <h1 className="text-2xl font-bold text-white mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-paulstar-gold">
              Track your daily services and parts usage here.
            </p>
          </div>

          <MechanicServiceTracker />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome header */}
        <div className="glass-card p-6">
          <h1 className="text-2xl font-bold text-white mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-paulstar-gold">
            {user?.role === 'super_admin' 
              ? "You have full system access and oversight."
              : "Manage workshop operations and inventory here."
            }
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <Card key={index} className="glass-card-interactive">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                      <p className="text-2xl font-bold text-white mt-1">{kpi.value}</p>
                      <p className="text-xs text-paulstar-gold mt-1">{kpi.change}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${kpi.bg} backdrop-blur-md border border-white/10`}>
                      <Icon className={`h-6 w-6 ${kpi.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Role-specific content */}
        {user?.role === 'super_admin' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-paulstar-blue" />
                  <span>System Overview</span>
                </CardTitle>
                <CardDescription>Monitor all system operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-glass-50 rounded-lg">
                    <span className="text-white">Active Staff Members</span>
                    <span className="text-paulstar-gold font-semibold">8/10</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-glass-50 rounded-lg">
                    <span className="text-white">System Uptime</span>
                    <span className="text-green-400 font-semibold">99.9%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-glass-50 rounded-lg">
                    <span className="text-white">Monthly Revenue</span>
                    <span className="text-paulstar-gold font-semibold">$45,230</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Quick Admin Actions</CardTitle>
                <CardDescription>System management shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start glass-button-primary">
                    <Users className="mr-3 h-5 w-5" />
                    Manage Staff Access
                  </Button>
                  <Button className="w-full justify-start glass-button-primary">
                    <Settings className="mr-3 h-5 w-5" />
                    System Configuration
                  </Button>
                  <Button className="w-full justify-start glass-button-primary">
                    <TrendingUp className="mr-3 h-5 w-5" />
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {user?.role === 'manager' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-paulstar-blue" />
                  <span>Today's Schedule</span>
                </CardTitle>
                <CardDescription>Upcoming appointments and services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-glass-50 rounded-lg">
                    <div className="w-2 h-2 bg-paulstar-gold rounded-full"></div>
                    <span className="text-white">9:00 AM - Honda Civic Service</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-glass-50 rounded-lg">
                    <div className="w-2 h-2 bg-paulstar-blue rounded-full"></div>
                    <span className="text-white">11:30 AM - BMW Oil Change</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-glass-50 rounded-lg">
                    <div className="w-2 h-2 bg-paulstar-orange rounded-full"></div>
                    <span className="text-white">2:00 PM - Toyota Brake Check</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Inventory Alerts</CardTitle>
                <CardDescription>Items requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <span className="text-white">Engine Oil</span>
                    <span className="text-red-400 font-semibold">Low Stock</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <span className="text-white">Brake Pads</span>
                    <span className="text-yellow-400 font-semibold">Reorder Soon</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
