
import { Link } from "react-router-dom";
import { Shift } from "@/types";
import { formatCurrency, formatShiftTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, DollarSign, ChevronRight } from "lucide-react";

interface ShiftCardProps {
  shift: Shift;
}

export function ShiftCard({ shift }: ShiftCardProps) {
  return (
    <Link 
      to={`/shift/${shift.id}`}
      className="block"
    >
      <div className="glass-card rounded-xl p-5 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] animate-fade-in">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">
              {shift.companyName}
            </p>
            <h3 className="font-semibold text-xl">{shift.position}</h3>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm">{formatShiftTime(shift.date, shift.startTime, shift.endTime)}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm">{`${shift.location.name} • ${shift.location.city}, ${shift.location.state}`}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm font-medium">{formatCurrency(shift.salary)}</p>
          </div>
          
          {shift.applied && (
            <div className="mt-3">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs justify-center">
                Candidatura enviada
              </Badge>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
