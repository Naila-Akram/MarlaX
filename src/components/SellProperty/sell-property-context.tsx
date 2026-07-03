import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

// ─── Form shape ───────────────────────────────────────────────────────────────
// Fields grow as each step's UI is built. Step 1 owns the ones below.
export type ListFor = 'direct' | 'bidding';
export type PropertyCategory = 'home' | 'plots' | 'commercial';

export interface Amenity {
  id: string;
  label: string;
  value: string;
}

export interface MediaAsset {
  id: string;
  uri: string;
  /** Optional preview image (used for videos that have no renderable frame). */
  thumb?: string;
}

export interface DocAsset {
  id: string;
  name: string;
  uri?: string;
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

  // Step 5 — Media Gallery
  images: MediaAsset[];
  videos: MediaAsset[];
  documents: DocAsset[];

  // Step 6 — Contact Information
  email: string;
  phoneCode: string;
  phone: string;
  whatsappCode: string;
  whatsapp: string;
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
  images: [
    { id: 'i1', uri: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600' },
    { id: 'i2', uri: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600' },
    { id: 'i3', uri: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600' },
  ],
  videos: [
    { id: 'vid-dQw4w9WgXcQ', uri: 'https://youtu.be/dQw4w9WgXcQ', thumb: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg' },
    { id: 'vid-9bZkp7q19f0', uri: 'https://youtu.be/9bZkp7q19f0', thumb: 'https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg' },
  ],
  documents: [
    { id: 'd1', name: 'Booking Agreement' },
    { id: 'd2', name: 'WHT 236C — FY 24-25' },
  ],
  email: '',
  phoneCode: '+92',
  phone: '',
  whatsappCode: '+92',
  whatsapp: '',
};

interface SellPropertyContextValue {
  form: SellPropertyForm;
  setField: <K extends keyof SellPropertyForm>(
    key: K,
    value: SellPropertyForm[K],
  ) => void;
  /** Functional update — safe inside async callbacks (pickers, etc.). */
  updateField: <K extends keyof SellPropertyForm>(
    key: K,
    updater: (current: SellPropertyForm[K]) => SellPropertyForm[K],
  ) => void;
  addAmenity: (amenity: Amenity) => void;
  addAmenities: (amenities: Amenity[]) => void;
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

  // Fast Refresh safety: if this state was created before a field was added to
  // the form (e.g. media), backfill the missing keys from INITIAL_FORM so newly
  // seeded values appear without a full reload. No-op on a fresh launch.
  useEffect(() => {
    setForm(prev => {
      const missing = (Object.keys(INITIAL_FORM) as (keyof SellPropertyForm)[])
        .some(k => !(k in prev));
      return missing ? { ...INITIAL_FORM, ...prev } : prev;
    });
  }, []);

  const value = useMemo<SellPropertyContextValue>(
    () => ({
      form,
      setField: (key, val) => setForm(prev => ({ ...prev, [key]: val })),
      updateField: (key, updater) =>
        setForm(prev => ({ ...prev, [key]: updater(prev[key]) })),
      addAmenity: amenity =>
        setForm(prev => ({ ...prev, amenities: [...prev.amenities, amenity] })),
      addAmenities: list =>
        setForm(prev => {
          const seen = new Set(prev.amenities.map(a => a.label.toLowerCase()));
          const additions = list.filter(a => !seen.has(a.label.toLowerCase()));
          return { ...prev, amenities: [...prev.amenities, ...additions] };
        }),
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
