import { createContext, useCallback, useContext, useEffect, useState, type ReactNode, type SetStateAction } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SECTIONS } from './data/sections';

export type Mode = 'story' | 'explore';
export interface Weights { urgency: number; fit: number; access: number; budget: number; leverage: number }

export const BASE_WEIGHTS: Weights = { urgency: 30, fit: 25, access: 20, budget: 15, leverage: 10 };

interface Evidence { open: boolean; claimIds: string[] | null; title: string }

interface Store {
  mode: Mode; setMode: (m: Mode) => void;
  present: boolean; setPresent: (p: SetStateAction<boolean>) => void;
  sectionIndex: number; go: (i: number) => void;
  evidence: Evidence; openEvidence: (claimIds?: string[], title?: string) => void; closeEvidence: () => void;
  account: string | null; setAccount: (id: string | null) => void;
  weights: Weights; setWeights: (w: Weights) => void;
}

const Ctx = createContext<Store | null>(null);
const EDITABLE = ['INPUT', 'TEXTAREA', 'SELECT'];
const isEditable = (t: EventTarget | null): boolean => t instanceof HTMLElement && EDITABLE.includes(t.tagName);

export function StoreProvider({ children }: { children: ReactNode }) {
  const nav = useNavigate();
  const loc = useLocation();
  const [mode, setMode] = useState<Mode>('story');
  const [present, setPresentState] = useState(false);
  const [evidence, setEvidence] = useState<Evidence>({ open: false, claimIds: null, title: '' });
  const [account, setAccount] = useState<string | null>(null);
  const [weights, setWeights] = useState<Weights>(BASE_WEIGHTS);

  const sectionIndex = Math.max(0, SECTIONS.findIndex((s) => s.path === loc.pathname));
  const closeOverlays = useCallback(() => {
    setEvidence({ open: false, claimIds: null, title: '' });
    setAccount(null);
  }, []);
  const go = useCallback((i: number) => {
    const n = Math.min(SECTIONS.length - 1, Math.max(0, i));
    closeOverlays();
    nav(SECTIONS[n].path);
  }, [closeOverlays, nav]);

  const openEvidence = useCallback((claimIds?: string[], title?: string) => {
    if (present) return;
    setEvidence({ open: true, claimIds: claimIds ?? null, title: title ?? '' });
  }, [present]);
  const closeEvidence = useCallback(() => setEvidence((e) => ({ ...e, open: false })), []);
  const setPresent = useCallback((next: SetStateAction<boolean>) => setPresentState(next), []);

  useEffect(() => { closeOverlays(); }, [closeOverlays, loc.pathname]);
  useEffect(() => { if (present) closeOverlays(); }, [closeOverlays, present]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isEditable(e.target)) return;
      if (e.key === 'ArrowRight') go(sectionIndex + 1);
      else if (e.key === 'ArrowLeft') go(sectionIndex - 1);
      else if (e.key === 'Escape') { closeEvidence(); setAccount(null); }
      else if (e.key === 'p' || e.key === 'P') setPresent((p) => !p);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, sectionIndex, closeEvidence, setPresent]);

  const value: Store = {
    mode, setMode, present, setPresent, sectionIndex, go, evidence, openEvidence, closeEvidence,
    account, setAccount, weights, setWeights,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useStore = () => {
  const s = useContext(Ctx);
  if (!s) throw new Error('StoreProvider missing');
  return s;
};
