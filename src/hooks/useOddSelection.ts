import { useState } from "react";

// Ids look like "<contractId>-buy" / "<contractId>-sell". Keying the
// selection by contractId means picking "sell" on a contract naturally
// replaces "buy" on that same contract, without touching anyone else's
// selection - so you can have one pick per contract, across as many
// contracts and markets as you like.
const parseContractId = (id: string) => id.replace(/-(buy|sell)$/, "");

export function useOddSelection() {
  const [selected, setSelected] = useState<Record<string, string>>({});

  const toggleOdd = (id: string) => {
    const contractId = parseContractId(id);

    setSelected((prev) => {
      const next = { ...prev };
      if (next[contractId] === id) {
        delete next[contractId];
      } else {
        next[contractId] = id;
      }
      return next;
    });
  };

  const isOddSelected = (id: string) => selected[parseContractId(id)] === id;

  return { isOddSelected, toggleOdd };
}
