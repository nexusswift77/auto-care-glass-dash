
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, Shield, Plus, Edit, UserX } from 'lucide-react';
import AddStaffModal from '@/components/AddStaffModal';

const StaffPage: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [staff, setStaff] = useState([
    {
      id: '1',
      name: 'Super Admin',
      email: 'superadmin@paulstar.com',
      phone: '+254 234 567 8901',
      role: 'super_admin',
      isActive: true,
      lastLogin: '2024-01-15 09:30 AM',
      permissions: ['All Access']
    },
    {
      id: '2',
      name: 'Workshop Manager',
      email: 'manager@paulstar.com',
      phone: '+254 234 567 8902',
      role: 'manager',
      isActive: true,
      lastLogin: '2024-01-15 08:15 AM',
      permissions: ['Service Management', 'Staff Oversight', 'Reports']
    },
    {
      id: '3',
      name: 'Lead Mechanic',
      email: 'mechanic@paulstar.com',
      phone: '+254 234 567 8903',
      role: 'mechanic',
      isActive: true,
      lastLogin: '2024-01-15 07:45 AM',
      permissions: ['Service Logging', 'Inventory Usage']
    }
  ]);

  const handleAddStaff = (newStaff: any) => {
    setStaff([...staff, newStaff]);
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'super_admin':
        return <Badge className="bg-red-500/20 text-red-300 border-red-500/30">Super Admin</Badge>;
      case 'manager':
        return <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Manager</Badge>;
      case 'mechanic':
        return <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Mechanic</Badge>;
      default:
        return <Badge variant="secondary">{role}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Staff Management</h1>
            <p className="text-muted-foreground">Manage team members and their access levels</p>
          </div>
          <Button 
            className="glass-button-primary"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Staff Member
          </Button>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {staff.map((member) => (
            <Card key={member.id} className="glass-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-paulstar-blue/20 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-paulstar-blue" />
                    </div>
                    <div>
                      <CardTitle className="text-white">{member.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        {getRoleBadge(member.role)}
                        <Badge variant={member.isActive ? "default" : "destructive"} className="text-xs">
                          {member.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="ghost" className="glass-button p-2">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="glass-button p-2 text-red-400 hover:text-red-300">
                      <UserX className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-paulstar-gold" />
                    <span className="text-muted-foreground">{member.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-paulstar-gold" />
                    <span className="text-muted-foreground">{member.phone}</span>
                  </div>
                </div>

                {/* Permissions */}
                <div>
                  <h4 className="text-sm font-medium text-white mb-2 flex items-center">
                    <Shield className="h-4 w-4 mr-1 text-paulstar-blue" />
                    Permissions
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {member.permissions.map((permission, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-glass-50 border-glass-200">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Last Login */}
                <div className="pt-2 border-t border-glass-200">
                  <p className="text-xs text-muted-foreground">
                    Last login: {member.lastLogin}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Role Management */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Role Permissions</CardTitle>
            <CardDescription>Configure access levels for different roles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-white">Super Admin</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Full system access</li>
                  <li>• User management</li>
                  <li>• System configuration</li>
                  <li>• All reports and analytics</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-white">Manager</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Service management</li>
                  <li>• Inventory management</li>
                  <li>• Customer management</li>
                  <li>• Reports and analytics</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-white">Mechanic</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Service logging</li>
                  <li>• Task management</li>
                  <li>• Inventory usage tracking</li>
                  <li>• Daily work reports</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <AddStaffModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddStaff={handleAddStaff}
        />
      </div>
    </DashboardLayout>
  );
};

export default StaffPage;
