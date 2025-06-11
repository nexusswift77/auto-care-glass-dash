
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Car, Clock, User, Eye } from 'lucide-react';
import AddServiceModal from '@/components/AddServiceModal';

const ServicesPage: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [services, setServices] = useState([
    {
      id: '1',
      serviceName: 'Oil Change',
      customerName: 'John Doe',
      vehicleInfo: 'Toyota Camry 2020',
      status: 'in-progress',
      estimatedCost: 'KSH 3,500',
      createdAt: '2024-01-15',
      assignedTo: 'Mike Johnson'
    },
    {
      id: '2',
      serviceName: 'Brake Inspection',
      customerName: 'Jane Smith',
      vehicleInfo: 'Honda Civic 2019',
      status: 'pending',
      estimatedCost: 'KSH 8,000',
      createdAt: '2024-01-15',
      assignedTo: 'Unassigned'
    },
    {
      id: '3',
      serviceName: 'Engine Diagnostic',
      customerName: 'Robert Wilson',
      vehicleInfo: 'Ford Focus 2021',
      status: 'completed',
      estimatedCost: 'KSH 12,000',
      createdAt: '2024-01-14',
      assignedTo: 'Sarah Davis'
    }
  ]);

  const handleAddService = (newService: any) => {
    setServices([...services, newService]);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="status-pending">Pending</Badge>;
      case 'in-progress':
        return <Badge className="status-in-service">In Progress</Badge>;
      case 'completed':
        return <Badge className="status-completed">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Service Management</h1>
            <p className="text-muted-foreground">Track and manage automotive services</p>
          </div>
          <Button 
            className="glass-button-primary"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Service
          </Button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="glass-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white flex items-center">
                      <Car className="mr-2 h-5 w-5 text-paulstar-blue" />
                      {service.serviceName}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {service.vehicleInfo}
                    </CardDescription>
                  </div>
                  {getStatusBadge(service.status)}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-muted-foreground">
                      <User className="mr-2 h-4 w-4" />
                      Customer:
                    </span>
                    <span className="text-white">{service.customerName}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      Created:
                    </span>
                    <span className="text-white">{service.createdAt}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Assigned to:</span>
                    <span className="text-white">{service.assignedTo}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Est. Cost:</span>
                    <span className="text-paulstar-gold font-medium">{service.estimatedCost}</span>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button size="sm" className="glass-button flex-1">
                    <Eye className="mr-1 h-4 w-4" />
                    Review
                  </Button>
                  <Button size="sm" variant="outline" className="glass-button">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <AddServiceModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddService={handleAddService}
        />
      </div>
    </DashboardLayout>
  );
};

export default ServicesPage;
