import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Shield, Eye, EyeOff } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { user, login, verify2FA, needs2FA, tempUser, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [twoFACode, setTwoFACode] = useState('');

  // Debug logging
  console.log('LoginPage render - user:', user, 'needs2FA:', needs2FA, 'isLoading:', isLoading);

  // Redirect if already logged in
  if (user) {
    console.log('User already logged in, redirecting to dashboard');
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Login attempt with:', email, password.length > 0 ? '[password provided]' : '[no password]');
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const success = await login(email, password);
      console.log('Login result:', success, 'needs2FA:', needs2FA);
      
      if (!success && !needs2FA) {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Try: admin@paulstar.com / password123",
          variant: "destructive",
        });
      } else if (needs2FA) {
        toast({
          title: "2FA Required",
          description: "Please enter the verification code (any 6 digits for demo)",
        });
      } else if (success && !needs2FA) {
        toast({
          title: "Welcome!",
          description: "Successfully logged in",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred during login",
        variant: "destructive",
      });
    }
  };

  const handle2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('2FA attempt with code:', twoFACode);
    
    if (twoFACode.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter a 6-digit verification code",
        variant: "destructive",
      });
      return;
    }

    try {
      const success = await verify2FA(twoFACode);
      console.log('2FA result:', success);
      
      if (!success) {
        toast({
          title: "Verification Failed",
          description: "Invalid verification code. Try any 6 digits for demo.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome!",
          description: "Successfully logged in",
        });
      }
    } catch (error) {
      console.error('2FA error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred during verification",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-paulstar-blue/10 rounded-full blur-3xl glass-float"></div>
        <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-paulstar-gold/10 rounded-full blur-3xl glass-float" style={{ animationDelay: '-3s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-paulstar-orange/5 rounded-full blur-3xl glass-float" style={{ animationDelay: '-1.5s' }}></div>
      </div>

      <Card className="w-full max-w-md glass-card border-glass-200 animate-fade-in relative z-10">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
              <img 
                src="/lovable-uploads/5a5256dc-6cf0-4b89-9a49-8302100ef5df.png" 
                alt="Paulstar Auto Care" 
                className="h-16 w-auto object-contain brightness-110 contrast-125"
                style={{ filter: 'drop-shadow(0 2px 12px rgba(255,255,255,0.4))' }}
              />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-white">Paulstar Auto Care</CardTitle>
          <CardDescription className="text-paulstar-gold">
            {needs2FA ? 'Enter verification code' : 'Sign in to your admin dashboard'}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {!needs2FA ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass-input"
                  placeholder="admin@paulstar.com"
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="glass-input pr-10"
                    placeholder="Enter your password"
                    disabled={isLoading}
                    autoComplete="current-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full glass-button-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handle2FA} className="space-y-4">
              <div className="text-center mb-4">
                <div className="p-3 rounded-full bg-green-500/20 backdrop-blur-md inline-flex">
                  <Shield className="h-6 w-6 text-green-400" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Hi {tempUser?.name}! Please enter your 6-digit verification code.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  type="text"
                  value={twoFACode}
                  onChange={(e) => setTwoFACode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="glass-input text-center text-lg tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                  disabled={isLoading}
                  autoComplete="one-time-code"
                />
              </div>
              
              <Button
                type="submit"
                className="w-full glass-button-primary"
                disabled={isLoading || twoFACode.length !== 6}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Verifying...</span>
                  </div>
                ) : (
                  'Verify & Sign In'
                )}
              </Button>
            </form>
          )}
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p className="font-semibold text-paulstar-gold">Demo Credentials:</p>
            <div className="space-y-1 mt-2">
              <p><span className="font-medium text-paulstar-blue">Super Admin:</span> superadmin@paulstar.com / password123</p>
              <p><span className="font-medium text-paulstar-blue">Manager:</span> manager@paulstar.com / password123</p>
              <p><span className="font-medium text-paulstar-blue">Mechanic:</span> mechanic@paulstar.com / password123</p>
            </div>
            <p className="mt-3 text-xs opacity-75 text-paulstar-gold">2FA Code: Any 6 digits for Super Admin/Manager</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
