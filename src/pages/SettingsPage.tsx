
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Database, Shield, Bell, Palette, Globe } from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">System Settings</h1>
          <p className="text-muted-foreground">Configure system-wide settings and preferences</p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-paulstar-blue/20 rounded-full flex items-center justify-center">
                  <Database className="h-5 w-5 text-paulstar-blue" />
                </div>
                <div>
                  <CardTitle>Database</CardTitle>
                  <CardDescription>Manage database connections and backups</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="glass-button w-full">Configure Database</Button>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-paulstar-blue/20 rounded-full flex items-center justify-center">
                  <Shield className="h-5 w-5 text-paulstar-blue" />
                </div>
                <div>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>Manage security settings and permissions</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="glass-button w-full">Security Settings</Button>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-paulstar-blue/20 rounded-full flex items-center justify-center">
                  <Bell className="h-5 w-5 text-paulstar-blue" />
                </div>
                <div>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Configure system notifications</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="glass-button w-full">Notification Settings</Button>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-paulstar-blue/20 rounded-full flex items-center justify-center">
                  <Palette className="h-5 w-5 text-paulstar-blue" />
                </div>
                <div>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize the application theme</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="glass-button w-full">Theme Settings</Button>
            </CardContent>
          </Card>
        </div>

        {/* Currency Settings */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="mr-2 h-5 w-5" />
              Regional Settings
            </CardTitle>
            <CardDescription>Configure currency and regional preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white">Currency</label>
              <p className="text-sm text-muted-foreground">Currently set to Kenyan Shilling (KSH)</p>
            </div>
            <div>
              <label className="text-sm font-medium text-white">Timezone</label>
              <p className="text-sm text-muted-foreground">East Africa Time (EAT)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
