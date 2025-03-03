
import { Shift } from '@/types';

const createShift = (
  id: string,
  companyName: string,
  position: string,
  date: string,
  startTime: string,
  endTime: string,
  location: { name: string; address: string; city: string; state: string },
  salary: number,
  description: string,
  requirements: string[],
  benefits: string[]
): Shift => ({
  id,
  companyName,
  position,
  date,
  startTime,
  endTime,
  location,
  salary,
  description,
  requirements,
  benefits,
  applied: false,
  createdAt: new Date().toISOString(),
});

export const generateSampleShifts = (count: number = 20): Shift[] => {
  const positions = [
    'Enfermeiro(a)',
    'Técnico(a) de Enfermagem',
    'Auxiliar de Enfermagem',
    'Enfermeiro(a) Especialista',
    'Fisioterapeuta',
  ];

  const companies = [
    'Hospital Sírio-Libanês',
    'Hospital Albert Einstein',
    'Hospital São Luiz',
    'Hospital Oswaldo Cruz',
    'Hospital Santa Catarina',
    'Hospital Samaritano',
    'Hospital Alemão',
    'Hospital Beneficência Portuguesa',
    'Hospital 9 de Julho',
  ];

  const locations = [
    {
      name: 'Unidade Jardins',
      address: 'Rua Oscar Freire, 1234',
      city: 'São Paulo',
      state: 'SP',
    },
    {
      name: 'Unidade Morumbi',
      address: 'Av. Albert Einstein, 627',
      city: 'São Paulo',
      state: 'SP',
    },
    {
      name: 'Unidade Itaim',
      address: 'Rua João Cachoeira, 745',
      city: 'São Paulo',
      state: 'SP',
    },
    {
      name: 'Unidade Pinheiros',
      address: 'Rua Pedroso Alvarenga, 1100',
      city: 'São Paulo',
      state: 'SP',
    },
    {
      name: 'Unidade Campinas',
      address: 'Av. Dr. Carlos Grimaldi, 1800',
      city: 'Campinas',
      state: 'SP',
    },
    {
      name: 'Unidade Copacabana',
      address: 'Av. Nossa Senhora de Copacabana, 500',
      city: 'Rio de Janeiro',
      state: 'RJ',
    },
    {
      name: 'Unidade Barra',
      address: 'Av. das Américas, 4200',
      city: 'Rio de Janeiro',
      state: 'RJ',
    },
  ];

  const descriptions = [
    'Profissional de enfermagem para atendimento a pacientes em unidade de tratamento intensivo, com foco em cuidados específicos e monitoramento contínuo.',
    'Atendimento a pacientes em pós-operatório, realizando procedimentos sob supervisão da equipe médica e garantindo o bem-estar durante o período de recuperação.',
    'Profissional para atuação em emergência hospitalar, com capacidade de resposta rápida a situações críticas e atendimento humanizado aos pacientes.',
    'Especialista para cuidados específicos em pacientes neonatais, garantindo os procedimentos adequados em ambiente de UTI pediátrica.',
    'Profissional para atendimento a pacientes oncológicos, com experiência em procedimentos específicos e capacidade de oferecer suporte emocional.',
  ];

  const requirements = [
    ['COREN ativo', 'Experiência mínima de 1 ano', 'Disponibilidade para plantões'],
    ['COREN ativo', 'Especialização em UTI', 'Experiência mínima de 2 anos'],
    ['COREN ativo', 'Curso de BLS atualizado', 'Disponibilidade para escalas 12x36'],
    ['COREN ativo', 'Pós-graduação na área', 'Experiência em hospitais de grande porte'],
    ['COREN ativo', 'Conhecimento em protocolos de segurança do paciente', 'Inglês intermediário'],
  ];

  const benefits = [
    ['Vale-transporte', 'Vale-refeição', 'Plano de saúde'],
    ['Vale-transporte', 'Vale-refeição', 'Plano de saúde', 'Plano odontológico'],
    ['Vale-transporte', 'Vale-refeição', 'Seguro de vida'],
    ['Vale-transporte', 'Vale-alimentação', 'Plano de saúde', 'Auxílio-creche'],
    ['Vale-transporte', 'Vale-refeição', 'Plano de saúde', 'Participação nos lucros'],
  ];

  const getRandomFutureDate = () => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + Math.floor(Math.random() * 30) + 1);
    
    const day = String(futureDate.getDate()).padStart(2, '0');
    const month = String(futureDate.getMonth() + 1).padStart(2, '0');
    const year = futureDate.getFullYear();
    
    return `${day}/${month}/${year}`;
  };

  const shifts: Shift[] = [];
  
  for (let i = 0; i < count; i++) {
    const positionIndex = Math.floor(Math.random() * positions.length);
    const companyIndex = Math.floor(Math.random() * companies.length);
    const locationIndex = Math.floor(Math.random() * locations.length);
    const descriptionIndex = Math.floor(Math.random() * descriptions.length);
    const requirementsIndex = Math.floor(Math.random() * requirements.length);
    const benefitsIndex = Math.floor(Math.random() * benefits.length);
    
    const startHour = Math.floor(Math.random() * 12) + 7;
    const endHour = startHour + 6 + Math.floor(Math.random() * 6);
    
    shifts.push(
      createShift(
        `shift-${i + 1}`,
        companies[companyIndex],
        positions[positionIndex],
        getRandomFutureDate(),
        `${String(startHour).padStart(2, '0')}:00`,
        `${String(endHour > 23 ? endHour - 24 : endHour).padStart(2, '0')}:00`,
        locations[locationIndex],
        (Math.floor(Math.random() * 20) + 30) * 10,
        descriptions[descriptionIndex],
        requirements[requirementsIndex],
        benefits[benefitsIndex]
      )
    );
  }
  
  return shifts;
};
