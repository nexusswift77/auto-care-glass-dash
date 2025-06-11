
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Car, 
  Users, 
  Calendar, 
  AlertTriangle,
  Clock,
  CheckCircle,
  Plus,
  TrendingUp
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data - in production this would come from Supabase
  const kpis = [
    {
      title: "Today's Appointments",
      value: "12",
      change: "+2 from yesterday",
      icon: Calendar,
      color: "text-blue-400",
      bg: "bg-blue-500/20"
    },
    {
      title: "Active Services",
      value: "7",
      change: "In progress",
      icon: Car,
      color: "text-yellow-400",
      bg: "bg-yellow-500/20"
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
      change: "Needs attention",
      icon: AlertTriangle,
      color: "text-red-400",
      bg: "bg-red-500/20"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "service_completed",
      message: "Service #1234 completed by John Doe",
      time: "2 minutes ago",
      icon: CheckCircle,
      color: "text-green-400"
    },
    {
      id: 2,
      type: "new_booking",
      message: "New appointment booked by Sarah Wilson",
      time: "5 minutes ago",
      icon: Calendar,
      color: "text-blue-400"
    },
    {
      id: 3,
      type: "low_stock",
      message: "Oil filter stock running low",
      time: "15 minutes ago",
      icon: AlertTriangle,
      color: "text-yellow-400"
    },
    {
      id: 4,
      type: "service_started",
      message: "Service #1235 started by Mike Johnson",
      time: "30 minutes ago",
      icon: Clock,
      color: "text-blue-400"
    }
  ];

  const quickActions = [
    { label: "New Service", icon: Plus, action: () => console.log("New service") },
    { label: "Add Appointment", icon: Calendar, action: () => console.log("Add appointment") },
    { label: "Check Inventory", icon: AlertTriangle, action: () => console.log("Check inventory") },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome header */}
        <div className="glass-card p-6">
          <h1 className="text-2xl font-bold text-white mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening at Paulstar Auto Care today.
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
                      <p className="text-xs text-muted-foreground mt-1">{kpi.change}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${kpi.bg} backdrop-blur-md`}>
                      <Icon className={`h-6 w-6 ${kpi.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Recent Activities</span>
              </CardTitle>
              <CardDescription>Latest updates from your workshop</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 glass-scrollbar max-h-80 overflow-y-auto">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg bg-glass-50 backdrop-blur-sm">
                      <div className={`p-2 rounded-full bg-glass-100 backdrop-blur-md`}>
                        <Icon className={`h-4 w-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={index}
                      variant="ghost"
                      className="justify-start h-auto p-4 glass-button-primary"
                      onClick={action.action}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      <div className="text-left">
                        <p className="font-medium">{action.label}</p>
                      </div>
                    </Button>
                  );
                })}
              </div>

              {/* Service Overview Chart Placeholder */}
              <div className="mt-6 p-4 bg-glass-50 rounded-lg backdrop-blur-sm">
                <h4 className="text-sm font-medium text-white mb-3">This Week's Services</h4>
                <div className="h-32 bg-glass-100 rounded-lg flex items-center justify-center">
                  <p className="text-xs text-muted-foreground">Chart visualization would go here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
