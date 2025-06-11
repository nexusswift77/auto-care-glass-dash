
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Wrench, Clock, CheckCircle, Plus, Package } from 'lucide-react';

const MechanicServiceTracker: React.FC = () => {
  const [todayServices, setTodayServices] = useState([
    {
      id: 'SV001',
      customerName: 'John Smith',
      vehicleModel: '2020 Honda Civic',
      serviceType: 'Oil Change',
      status: 'completed',
      timeSpent: '45 mins',
      partsUsed: ['Engine Oil', 'Oil Filter'],
      notes: 'Checked fluid levels, all normal'
    },
    {
      id: 'SV002',
      customerName: 'Sarah Johnson',
      vehicleModel: '2019 Toyota Camry',
      serviceType: 'Brake Inspection',
      status: 'in-progress',
      timeSpent: '30 mins',
      partsUsed: [],
      notes: 'Front brake pads need replacement'
    }
  ]);

  const [newService, setNewService] = useState({
    notes: '',
    partsUsed: ''
  });

  const todayStats = {
    servicesCompleted: todayServices.filter(s => s.status === 'completed').length,
    servicesInProgress: todayServices.filter(s => s.status === 'in-progress').length,
    totalTimeSpent: '2h 15m',
    partsUsedCount: todayServices.reduce((acc, service) => acc + service.partsUsed.length, 0)
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="status-completed">Completed</Badge>;
      case 'in-progress':
        return <Badge className="status-in-service">In Progress</Badge>;
      default:
        return <Badge className="status-pending">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Daily Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed Today</p>
                <p className="text-2xl font-bold text-white">{todayStats.servicesCompleted}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-white">{todayStats.servicesInProgress}</p>
              </div>
              <Wrench className="h-8 w-8 text-paulstar-blue" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Time</p>
                <p className="text-2xl font-bold text-white">{todayStats.totalTimeSpent}</p>
              </div>
              <Clock className="h-8 w-8 text-paulstar-gold" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Parts Used</p>
                <p className="text-2xl font-bold text-white">{todayStats.partsUsedCount}</p>
              </div>
              <Package className="h-8 w-8 text-paulstar-orange" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Services */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wrench className="h-5 w-5 text-paulstar-blue" />
            <span>Today's Services</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todayServices.map((service) => (
              <div key={service.id} className="glass-card p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-white">{service.customerName}</h4>
                    <p className="text-sm text-muted-foreground">{service.vehicleModel}</p>
                    <p className="text-sm text-paulstar-gold">{service.serviceType}</p>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(service.status)}
                    <p className="text-xs text-muted-foreground mt-1">Time: {service.timeSpent}</p>
                  </div>
                </div>

                {service.partsUsed.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-white mb-1">Parts Used:</p>
                    <div className="flex flex-wrap gap-1">
                      {service.partsUsed.map((part, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-paulstar-blue/20 border-paulstar-blue/30">
                          {part}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-3">
                  <p className="text-sm font-medium text-white mb-1">Notes:</p>
                  <p className="text-sm text-muted-foreground">{service.notes}</p>
                </div>

                {service.status === 'in-progress' && (
                  <div className="space-y-3 border-t border-glass-200 pt-3">
                    <div>
                      <label className="text-sm font-medium text-white">Add Parts Used:</label>
                      <Input
                        placeholder="Part name"
                        value={newService.partsUsed}
                        onChange={(e) => setNewService({...newService, partsUsed: e.target.value})}
                        className="glass-input mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white">Update Notes:</label>
                      <Textarea
                        placeholder="Service notes..."
                        value={newService.notes}
                        onChange={(e) => setNewService({...newService, notes: e.target.value})}
                        className="glass-input mt-1"
                        rows={2}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="glass-button-primary">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Part
                      </Button>
                      <Button size="sm" className="glass-button-primary">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Complete Service
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MechanicServiceTracker;
