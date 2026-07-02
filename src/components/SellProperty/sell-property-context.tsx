import React, { createContext, useContext, useMemo, useState } from 'react';

// ─── Form shape ───────────────────────────────────────────────────────────────
// Fields grow as each step's UI is built. Step 1 owns the ones below.
export type ListFor = 'direct' | 'bidding';
export type PropertyCategory = 'home' | 'plots' | 'commercial';

export interface Amenity {
  id: string;
  label: string;
  value: string;
}

export interface SellPropertyForm {
  // Step 1 — Name of Listing
  name: string;
  listFor: ListFor;
  category: PropertyCategory;
  propertyType: string;

  // Step 2 — Location
  location: string;
  address: string;

  // Step 3 — Property Details
  propertyName: string;
  area: string;
  areaUnit: string;
  floor: string;
  price: string;
  currency: string;
  details: string;

  // Step 4 — Features & Amenities
  bedrooms: number;
  bathrooms: number;
  kitchens: number;
  carParking: number;
  amenities: Amenity[];
}

const INITIAL_FORM: SellPropertyForm = {
  name: '',
  listFor: 'bidding',
  category: 'home',
  propertyType: 'Residential',
  location: 'Etihad Town Phase 3',
  address: '',
  propertyName: '',
  area: '',
  areaUnit: 'Sq. ft.',
  floor: '',
  price: '',
  currency: 'PKR',
  details: '',
  bedrooms: 0,
  bathrooms: 0,
  kitchens: 0,
  carParking: 0,
  amenities: [
    { id: 'a1', label: 'Flooring', value: 'Tiles' },
    { id: 'a2', label: 'View', value: 'Front' },
    { id: 'a3', label: 'Electricity Backup', value: 'Generator' },
    { id: 'a4', label: 'Lift', value: 'Available' },
  ],
};

interface SellPropertyContextValue {
  form: SellPropertyForm;
  setField: <K extends keyof SellPropertyForm>(
    key: K,
    value: SellPropertyForm[K],
  ) => void;
  addAmenity: (amenity: Amenity) => void;
  removeAmenity: (id: string) => void;
  reset: () => void;
}

const SellPropertyContext = createContext<SellPropertyContextValue | null>(null);

export const SellPropertyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [form, setForm] = useState<SellPropertyForm>(INITIAL_FORM);

  const value = useMemo<SellPropertyContextValue>(
    () => ({
      form,
      setField: (key, val) => setForm(prev => ({ ...prev, [key]: val })),
      addAmenity: amenity =>
        setForm(prev => ({ ...prev, amenities: [...prev.amenities, amenity] })),
      removeAmenity: id =>
        setForm(prev => ({
          ...prev,
          amenities: prev.amenities.filter(a => a.id !== id),
        })),
      reset: () => setForm(INITIAL_FORM),
    }),
    [form],
  );

  return (
    <SellPropertyContext.Provider value={value}>
      {children}
    </SellPropertyContext.Provider>
  );
};

/** Read/update the shared Sell Property form. Must be used within the provider. */
export const useSellProperty = (): SellPropertyContextValue => {
  const ctx = useContext(SellPropertyContext);
  if (!ctx) {
    throw new Error('useSellProperty must be used within a SellPropertyProvider');
  }
  return ctx;
};
