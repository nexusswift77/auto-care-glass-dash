
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddService: (service: any) => void;
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({ isOpen, onClose, onAddService }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    serviceName: '',
    customerName: '',
    vehicleInfo: '',
    description: '',
    estimatedCost: '',
    priority: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.serviceName || !formData.customerName || !formData.vehicleInfo) {
      toast({
        title: "Error",
        description: "Please fill in required fields",
        variant: "destructive",
      });
      return;
    }

    const newService = {
      id: Date.now().toString(),
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedCost: formData.estimatedCost ? `KSH ${formData.estimatedCost}` : 'TBD',
    };

    onAddService(newService);
    
    toast({
      title: "Success",
      description: "Service request added successfully",
    });

    setFormData({
      serviceName: '',
      customerName: '',
      vehicleInfo: '',
      description: '',
      estimatedCost: '',
      priority: '',
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Add New Service</DialogTitle>
          <DialogDescription>
            Create a new service request for a customer
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="serviceName" className="text-white">Service Name *</Label>
            <Input
              id="serviceName"
              value={formData.serviceName}
              onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
              className="glass-input"
              placeholder="e.g., Oil Change, Brake Repair"
            />
          </div>

          <div>
            <Label htmlFor="customerName" className="text-white">Customer Name *</Label>
            <Input
              id="customerName"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              className="glass-input"
              placeholder="Enter customer name"
            />
          </div>

          <div>
            <Label htmlFor="vehicleInfo" className="text-white">Vehicle Info *</Label>
            <Input
              id="vehicleInfo"
              value={formData.vehicleInfo}
              onChange={(e) => setFormData({ ...formData, vehicleInfo: e.target.value })}
              className="glass-input"
              placeholder="e.g., Toyota Camry 2020"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-white">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="glass-input"
              placeholder="Describe the service needed"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="estimatedCost" className="text-white">Estimated Cost (KSH)</Label>
            <Input
              id="estimatedCost"
              type="number"
              value={formData.estimatedCost}
              onChange={(e) => setFormData({ ...formData, estimatedCost: e.target.value })}
              className="glass-input"
              placeholder="Enter amount in KSH"
            />
          </div>

          <div>
            <Label htmlFor="priority" className="text-white">Priority</Label>
            <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
              <SelectTrigger className="glass-input">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent className="glass-card border-glass-200">
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} className="glass-button">
              Cancel
            </Button>
            <Button type="submit" className="glass-button-primary">
              Add Service
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddServiceModal;
