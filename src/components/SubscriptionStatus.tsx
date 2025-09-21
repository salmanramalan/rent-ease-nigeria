import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSubscription } from '@/hooks/useSubscription';
import { Crown, Building2, Zap } from 'lucide-react';

const SubscriptionStatus = () => {
  const { subscription, propertyCount, loading, getRemainingProperties, isFreePlan, isPremium } = useSubscription();

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-muted rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!subscription) {
    return null;
  }

  const remaining = getRemainingProperties();
  const isNearLimit = isFreePlan && remaining <= 1;

  return (
    <Card className={`relative overflow-hidden ${isPremium ? 'border-primary' : ''}`}>
      {isPremium && (
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary to-primary-light opacity-10" />
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            {isPremium ? (
              <>
                <Crown className="h-5 w-5 text-primary" />
                Premium Plan
              </>
            ) : (
              <>
                <Building2 className="h-5 w-5 text-muted-foreground" />
                Free Plan
              </>
            )}
          </CardTitle>
          <Badge variant={isPremium ? "default" : "secondary"}>
            {subscription.plan.name}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Properties Used</span>
            <span className="font-medium">
              {propertyCount} / {subscription.plan.property_limit === -1 ? '∞' : subscription.plan.property_limit}
            </span>
          </div>
          
          {!isPremium && (
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${
                  isNearLimit ? 'bg-warning' : 'bg-primary'
                }`}
                style={{ 
                  width: `${Math.min((propertyCount / subscription.plan.property_limit) * 100, 100)}%` 
                }}
              />
            </div>
          )}
        </div>

        {isFreePlan && (
          <div className="space-y-3">
            {isNearLimit && (
              <div className="p-3 bg-warning-light rounded-lg">
                <p className="text-sm text-warning-foreground">
                  {remaining === 0 
                    ? "You've reached your property limit!" 
                    : `Only ${remaining} property slot remaining!`
                  }
                </p>
              </div>
            )}
            
            <Button 
              className="w-full bg-gradient-to-r from-primary to-primary-light"
              size="sm"
            >
              <Zap className="h-4 w-4 mr-2" />
              Upgrade to Premium
            </Button>
            
            <div className="text-xs text-muted-foreground space-y-1">
              <p className="font-medium">Premium Benefits:</p>
              <ul className="list-disc list-inside space-y-0.5 ml-2">
                <li>Unlimited properties</li>
                <li>Advanced analytics</li>
                <li>Priority support</li>
                <li>Custom reports</li>
              </ul>
            </div>
          </div>
        )}

        {isPremium && (
          <div className="p-3 bg-success-light rounded-lg">
            <p className="text-sm text-success font-medium">
              You're on Premium! Enjoy unlimited properties and advanced features.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SubscriptionStatus;