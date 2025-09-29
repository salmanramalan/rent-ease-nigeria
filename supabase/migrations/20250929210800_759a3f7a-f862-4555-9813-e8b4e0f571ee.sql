-- Create a units table to track individual units in properties
CREATE TABLE public.units (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  unit_number TEXT NOT NULL,
  is_occupied BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(property_id, unit_number)
);

-- Enable RLS
ALTER TABLE public.units ENABLE ROW LEVEL SECURITY;

-- Create policies for units
CREATE POLICY "Users can view units for their properties" 
ON public.units 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.properties 
    WHERE properties.id = units.property_id 
    AND properties.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create units for their properties" 
ON public.units 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.properties 
    WHERE properties.id = units.property_id 
    AND properties.user_id = auth.uid()
  )
);

CREATE POLICY "Users can update units for their properties" 
ON public.units 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.properties 
    WHERE properties.id = units.property_id 
    AND properties.user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete units for their properties" 
ON public.units 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.properties 
    WHERE properties.id = units.property_id 
    AND properties.user_id = auth.uid()
  )
);

-- Update tenants table to reference units
ALTER TABLE public.tenants 
ADD COLUMN unit_id UUID REFERENCES public.units(id) ON DELETE SET NULL;

-- Create trigger to update updated_at for units
CREATE TRIGGER update_units_updated_at
BEFORE UPDATE ON public.units
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to automatically create units when property is created
CREATE OR REPLACE FUNCTION public.create_default_units()
RETURNS TRIGGER AS $$
BEGIN
  -- Create default units for the new property
  FOR i IN 1..NEW.units LOOP
    INSERT INTO public.units (property_id, unit_number)
    VALUES (NEW.id, 'Unit ' || i);
  END LOOP;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-create units when property is added
CREATE TRIGGER create_property_units
AFTER INSERT ON public.properties
FOR EACH ROW
EXECUTE FUNCTION public.create_default_units();

-- Create function to handle unit occupancy when tenant is added/removed
CREATE OR REPLACE FUNCTION public.handle_tenant_occupancy()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Mark unit as occupied when tenant is added
    UPDATE public.units 
    SET is_occupied = true 
    WHERE id = NEW.unit_id;
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    -- Handle unit changes
    IF OLD.unit_id IS DISTINCT FROM NEW.unit_id THEN
      -- Free up old unit
      IF OLD.unit_id IS NOT NULL THEN
        UPDATE public.units 
        SET is_occupied = false 
        WHERE id = OLD.unit_id;
      END IF;
      -- Occupy new unit
      IF NEW.unit_id IS NOT NULL THEN
        UPDATE public.units 
        SET is_occupied = true 
        WHERE id = NEW.unit_id;
      END IF;
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    -- Free up unit when tenant is removed
    IF OLD.unit_id IS NOT NULL THEN
      UPDATE public.units 
      SET is_occupied = false 
      WHERE id = OLD.unit_id;
    END IF;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for tenant occupancy
CREATE TRIGGER handle_tenant_unit_occupancy
AFTER INSERT OR UPDATE OR DELETE ON public.tenants
FOR EACH ROW
EXECUTE FUNCTION public.handle_tenant_occupancy();

-- Enable real-time updates for units table
ALTER TABLE public.units REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.units;