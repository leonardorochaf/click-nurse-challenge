import { useEffect, useState, useRef, useCallback } from "react";
import { Shift, ShiftListResponse } from "@/types";
import { ShiftCard } from "./shift-card";
import { getShifts } from "@/lib/storage";
import { Loader2 } from "lucide-react";
import { delay } from "@/lib/utils";

export function ShiftList() {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadingRef = useRef(loading);
  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);
  
  const observerTarget = useRef<HTMLDivElement>(null);
  
  const loadShifts = useCallback(async () => {
    if (loadingRef.current) return;
    
    setLoading(true);
    try {
      await delay(800);
      
      const response: ShiftListResponse = getShifts(page);
      
      setShifts(prevShifts => (page === 1 ? response.shifts : [...prevShifts, ...response.shifts]));
      setHasMore(response.hasMore);
    } catch (error) {
      console.error("Error loading shifts:", error);
    } finally {
      setLoading(false);
    }
  }, [page]);
  
  useEffect(() => {
    loadShifts();
  }, [page, loadShifts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loadingRef.current) {
          setPage(prevPage => prevPage + 1);
        }
      },
      { threshold: 1 }
    );
    
    const target = observerTarget.current;
    if (target) {
      observer.observe(target);
    }
    
    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [hasMore]);
  
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "clicknurse:applied-shifts") {
        setPage(1);
        loadShifts();
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [loadShifts]);
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shifts.map(shift => (
          <ShiftCard key={shift.id} shift={shift} />
        ))}
      </div>
      
      <div 
        ref={observerTarget} 
        className="w-full h-20 flex items-center justify-center mt-4"
      >
        {loading && hasMore && (
          <div className="flex items-center justify-center text-muted-foreground">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            <p>Carregando mais plantões...</p>
          </div>
        )}
      </div>
    </div>
  );
}
