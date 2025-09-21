import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  property_limit: number;
  features: string[];
}

interface UserSubscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: string;
  started_at: string;
  ends_at: string | null;
  plan: SubscriptionPlan;
}

export const useSubscription = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [propertyCount, setPropertyCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchSubscriptionData = async () => {
      try {
        // Fetch user subscription with plan details
        const { data: subscriptionData, error: subError } = await supabase
          .from('user_subscriptions')
          .select(`
            *,
            plan:subscription_plans(*)
          `)
          .eq('user_id', user.id)
          .eq('status', 'active')
          .single();

        if (subError && subError.code !== 'PGRST116') {
          console.error('Error fetching subscription:', subError);
        } else if (subscriptionData) {
          setSubscription(subscriptionData as UserSubscription);
        }

        // Fetch property count
        const { count, error: countError } = await supabase
          .from('properties')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        if (countError) {
          console.error('Error fetching property count:', countError);
        } else {
          setPropertyCount(count || 0);
        }
      } catch (error) {
        console.error('Error in fetchSubscriptionData:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionData();
  }, [user]);

  const canAddProperty = () => {
    if (!subscription) return false;
    const limit = subscription.plan.property_limit;
    return limit === -1 || propertyCount < limit;
  };

  const getRemainingProperties = () => {
    if (!subscription) return 0;
    const limit = subscription.plan.property_limit;
    if (limit === -1) return Infinity;
    return Math.max(0, limit - propertyCount);
  };

  return {
    subscription,
    propertyCount,
    loading,
    canAddProperty,
    getRemainingProperties,
    isFreePlan: subscription?.plan?.name === 'Free',
    isPremium: subscription?.plan?.name === 'Premium'
  };
};