
import { Header } from "@/components/header";
import { ShiftList } from "@/components/shift-list";
import { Stethoscope } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <Header />
      
      <main className="mt-16 flex-1 py-8 animate-slide-up">
      <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 pt-6">
            <div className="inline-flex items-center justify-center p-2 bg-nurse-50 rounded-xl mb-4">
              <Stethoscope className="h-6 w-6 text-nurse-600" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-3">Plantões Disponíveis</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Procure e candidate-se para plantões que combinam com suas habilidades e horários.
            </p>
          </div>
          
          <ShiftList />
        </div>
      </main>
    </div>
  );
};

export default Index;
