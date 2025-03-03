
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Shift } from "@/types";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  CalendarClock, 
  MapPin, 
  DollarSign, 
  ClipboardList, 
  Award, 
  ArrowLeft, 
  Check, 
  X 
} from "lucide-react";
import { 
  getShiftById, 
  applyForShift, 
  cancelApplication 
} from "@/lib/storage";
import { delay, formatCurrency, formatDate } from "@/lib/utils";

const ShiftDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [shift, setShift] = useState<Shift | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  
  useEffect(() => {
    const loadShift = async () => {
      setLoading(true);
      
      try {
        await delay(400);
        
        if (id) {
          const shiftData = getShiftById(id);
          
          if (shiftData) {
            setShift(shiftData);
          } else {
            navigate('/');
            toast.error("Plantão não encontrado", {
              description: "O plantão que você está procurando não existe."
            });
          }
        }
      } catch (error) {
        console.error("Error loading shift:", error);
        toast.error("Erro ao carregar plantão", {
          description: "Ocorreu um erro ao carregar os detalhes do plantão."
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadShift();
  }, [id, navigate]);
  
  const handleApply = async () => {
    if (!shift || applying) return;
    
    setApplying(true);
    
    try {
      await delay(800);
      
      const success = applyForShift(shift.id);
      
      if (success) {
        setShift({ ...shift, applied: true });
        
        toast.success("Candidatura enviada com sucesso!", {
          description: "Você receberá atualizações sobre o status da sua candidatura."
        });
        
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'clicknurse:applied-shifts'
        }));
      } else {
        toast.error("Erro na candidatura", {
          description: "Você já se candidatou para este plantão."
        });
      }
    } catch (error) {
      console.error("Error applying for shift:", error);
      toast.error("Erro na candidatura", {
        description: "Ocorreu um erro ao processar sua candidatura. Tente novamente."
      });
    } finally {
      setApplying(false);
    }
  };
  
  const handleCancelApplication = async () => {
    if (!shift || applying) return;
    
    setApplying(true);
    
    try {
      await delay(800);
      
      const success = cancelApplication(shift.id);
      
      if (success) {
        setShift({ ...shift, applied: false });
        
        toast.success("Candidatura cancelada", {
          description: "Sua candidatura para este plantão foi cancelada com sucesso."
        });
        
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'clicknurse:applied-shifts'
        }));
      } else {
        toast.error("Erro ao cancelar candidatura", {
          description: "Ocorreu um erro ao cancelar sua candidatura. Tente novamente."
        });
      }
    } catch (error) {
      console.error("Error canceling application:", error);
      toast.error("Erro ao cancelar candidatura", {
        description: "Ocorreu um erro ao processar sua solicitação. Tente novamente."
      });
    } finally {
      setApplying(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-secondary/30">
        <Header />
        <div className="mt-16 flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
            <p className="text-muted-foreground">Carregando detalhes do plantão...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!shift) return null;
  
  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <Header />
      
      <main className="mt-16 flex-1 py-8 animate-slide-up">
        <div className="clicknurse-container">
          <div className="mb-6">
            <Link 
              to="/" 
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para plantões
            </Link>
          </div>
          
          <div className="glass-card rounded-xl p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <div className="mb-2">
                  {shift.applied && (
                    <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-2.5 py-0.5 rounded-full text-xs font-medium mb-2">
                      <Check className="h-3.5 w-3.5" />
                      Candidatura enviada
                    </div>
                  )}
                  <p className="text-sm font-medium text-muted-foreground">
                    {shift.companyName}
                  </p>
                </div>
                <h1 className="text-3xl font-bold tracking-tight mb-4">
                  {shift.position}
                </h1>
              </div>
              
              {shift.applied ? (
                <Button 
                  variant="outline" 
                  className="border-destructive/30 text-destructive hover:bg-destructive/10"
                  onClick={handleCancelApplication}
                  disabled={applying}
                >
                  {applying ? (
                    <>
                      <span className="h-4 w-4 border-2 border-destructive border-t-transparent rounded-full animate-spin mr-2"></span>
                      Processando...
                    </>
                  ) : (
                    <>
                      <X className="mr-2 h-4 w-4" />
                      Cancelar candidatura
                    </>
                  )}
                </Button>
              ) : (
                <Button 
                  onClick={handleApply}
                  disabled={applying}
                  className="bg-primary hover:bg-primary/90"
                >
                  {applying ? (
                    <>
                      <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                      Processando...
                    </>
                  ) : (
                    "Candidatar-se"
                  )}
                </Button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <section className="glass-card rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Descrição do Plantão</h2>
                <p className="text-muted-foreground">{shift.description}</p>
              </section>
              
              {/* Requirements */}
              <section className="glass-card rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ClipboardList className="text-primary h-5 w-5" />
                  <h2 className="text-xl font-semibold">Requisitos</h2>
                </div>
                <ul className="space-y-2">
                  {shift.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3 mt-0.5">
                        <Check className="h-3 w-3" />
                      </div>
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </section>
              
              {/* Benefits */}
              <section className="glass-card rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="text-primary h-5 w-5" />
                  <h2 className="text-xl font-semibold">Benefícios</h2>
                </div>
                <ul className="space-y-2">
                  {shift.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3 mt-0.5">
                        <Check className="h-3 w-3" />
                      </div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
            
            <div>
              {/* Shift Details */}
              <section className="glass-card rounded-xl p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Detalhes do Plantão</h2>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <CalendarClock className="h-4 w-4" />
                      <span className="text-sm font-medium">Data e Horário</span>
                    </div>
                    <p className="text-foreground">{formatDate(shift.date)}</p>
                    <p className="text-foreground">{`${shift.startTime} às ${shift.endTime}`}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm font-medium">Local</span>
                    </div>
                    <p className="text-foreground font-medium">{shift.location.name}</p>
                    <p className="text-foreground">{shift.location.address}</p>
                    <p className="text-foreground">{`${shift.location.city}, ${shift.location.state}`}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-sm font-medium">Remuneração</span>
                    </div>
                    <p className="text-xl font-semibold text-foreground">
                      {formatCurrency(shift.salary)}
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShiftDetails;
