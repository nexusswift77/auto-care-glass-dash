
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Package, AlertCircle, CheckCircle, XCircle, Eye } from 'lucide-react';
import AddInventoryModal from '@/components/AddInventoryModal';

const InventoryPage: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [inventory, setInventory] = useState([
    {
      id: '1',
      name: 'Engine Oil 5W-30',
      category: 'Fluids & Oils',
      price: 'KSH 2,500',
      quantity: 25,
      status: 'in-stock',
      supplier: 'AutoParts Kenya',
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      name: 'Brake Pads (Front)',
      category: 'Brake System',
      price: 'KSH 4,500',
      quantity: 8,
      status: 'low-stock',
      supplier: 'Brakes Direct',
      lastUpdated: '2024-01-14'
    },
    {
      id: '3',
      name: 'Air Filter',
      category: 'Engine Parts',
      price: 'KSH 1,200',
      quantity: 0,
      status: 'out-of-stock',
      supplier: 'Filter Pro',
      lastUpdated: '2024-01-13'
    },
    {
      id: '4',
      name: 'Spark Plugs Set',
      category: 'Engine Parts',
      price: 'KSH 3,200',
      quantity: 15,
      status: 'in-stock',
      supplier: 'Ignition Parts',
      lastUpdated: '2024-01-15'
    }
  ]);

  const handleAddItem = (newItem: any) => {
    setInventory([...inventory, newItem]);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-stock':
        return (
          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
            <CheckCircle className="mr-1 h-3 w-3" />
            In Stock
          </Badge>
        );
      case 'low-stock':
        return (
          <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
            <AlertCircle className="mr-1 h-3 w-3" />
            Low Stock
          </Badge>
        );
      case 'out-of-stock':
        return (
          <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
            <XCircle className="mr-1 h-3 w-3" />
            Out of Stock
          </Badge>
        );
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
            <h1 className="text-2xl font-bold text-white">Inventory Management</h1>
            <p className="text-muted-foreground">Track and manage auto parts and supplies</p>
          </div>
          <Button 
            className="glass-button-primary"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </div>

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inventory.map((item) => (
            <Card key={item.id} className="glass-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-paulstar-blue/20 rounded-full flex items-center justify-center">
                      <Package className="h-5 w-5 text-paulstar-blue" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-white text-sm">{item.name}</CardTitle>
                      <CardDescription className="text-xs">{item.category}</CardDescription>
                    </div>
                  </div>
                  {getStatusBadge(item.status)}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="text-paulstar-gold font-medium">{item.price}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Quantity:</span>
                    <span className="text-white">{item.quantity} units</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Supplier:</span>
                    <span className="text-white text-xs">{item.supplier}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Updated:</span>
                    <span className="text-white text-xs">{item.lastUpdated}</span>
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

        <AddInventoryModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddItem={handleAddItem}
        />
      </div>
    </DashboardLayout>
  );
};

export default InventoryPage;
