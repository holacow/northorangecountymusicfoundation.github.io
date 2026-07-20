import React, { createContext, useContext, useState } from "react";

interface DonationContextType {
  isOpen: boolean;
  openDonation: () => void;
  closeDonation: () => void;
}

const DonationContext = createContext<DonationContextType>({
  isOpen: false,
  openDonation: () => {},
  closeDonation: () => {},
});

export function DonationProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DonationContext.Provider
      value={{
        isOpen,
        openDonation: () => setIsOpen(true),
        closeDonation: () => setIsOpen(false),
      }}
    >
      {children}
    </DonationContext.Provider>
  );
}

export function useDonation() {
  return useContext(DonationContext);
}
