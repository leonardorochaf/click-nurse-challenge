
import { Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b ">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 transition-all hover:opacity-80">
          <Stethoscope className="h-6 w-6 text-nurse-600" />
          <span className="font-semibold text-xl tracking-tight text-foreground">ClickNurse</span>
        </Link>
        <div className="flex items-center space-x-1">
          <span className="text-xs bg-nurse-100 text-nurse-600 py-1 px-2 rounded-full">
            Plataforma de Plantões de Saúde
          </span>
        </div>
      </div>
    </header>
  );
}
