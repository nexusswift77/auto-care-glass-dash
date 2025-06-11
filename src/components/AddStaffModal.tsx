
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStaff: (staff: any) => void;
}

const AddStaffModal: React.FC<AddStaffModalProps> = ({ isOpen, onClose, onAddStaff }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.role) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const newStaff = {
      id: Date.now().toString(),
      ...formData,
      isActive: true,
      lastLogin: 'Never',
      permissions: formData.role === 'super_admin' 
        ? ['All Access']
        : formData.role === 'manager'
        ? ['Service Management', 'Staff Oversight', 'Reports']
        : ['Service Logging', 'Inventory Usage']
    };

    onAddStaff(newStaff);
    
    toast({
      title: "Success",
      description: "Staff member added successfully",
    });

    setFormData({ name: '', email: '', phone: '', role: '' });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card">
        <DialogHeader>
          <DialogTitle className="text-white">Add New Staff Member</DialogTitle>
          <DialogDescription>
            Add a new team member to the Paulstar Auto Care system
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-white">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="glass-input"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="glass-input"
              placeholder="Enter email address"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-white">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="glass-input"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <Label htmlFor="role" className="text-white">Role</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
              <SelectTrigger className="glass-input">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent className="glass-card border-glass-200">
                <SelectItem value="super_admin">Super Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="mechanic">Mechanic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} className="glass-button">
              Cancel
            </Button>
            <Button type="submit" className="glass-button-primary">
              Add Staff Member
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStaffModal;
