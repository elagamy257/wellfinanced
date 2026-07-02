import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function RegisterPage() {
  return (
    <Card className="border border-border/80">
      <CardHeader className="text-center">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-background text-xl mx-auto mb-3">
          W
        </div>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Setup your financial platform workspace</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Empty inputs showing placeholders and styled layouts only */}
        <Input 
          id="name" 
          type="text" 
          label="Full Name" 
          placeholder="John Doe" 
          required 
        />
        <Input 
          id="email" 
          type="email" 
          label="Email Address" 
          placeholder="name@domain.com" 
          required 
        />
        <Input 
          id="password" 
          type="password" 
          label="Password" 
          placeholder="••••••••••••" 
          required 
        />
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <Link href="/dashboard" className="w-full">
          <Button variant="primary" fullWidth>
            Create Account
          </Button>
        </Link>
        
        <div className="text-xs text-muted text-center mt-2">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline font-semibold">
            Sign In
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
