
import { Shift, ShiftListResponse } from '@/types';
import { generateSampleShifts } from './data';

const SHIFTS_KEY = 'clicknurse:shifts';
const APPLIED_SHIFTS_KEY = 'clicknurse:applied-shifts';

const initializeShifts = (): void => {
  const existingShifts = localStorage.getItem(SHIFTS_KEY);
  
  if (!existingShifts) {
    const sampleShifts = generateSampleShifts(50);
    localStorage.setItem(SHIFTS_KEY, JSON.stringify(sampleShifts));
  }
};

export const getAllShifts = (): Shift[] => {
  initializeShifts();
  const shiftsData = localStorage.getItem(SHIFTS_KEY);
  return shiftsData ? JSON.parse(shiftsData) : [];
};

export const getShifts = (page: number, limit: number = 10): ShiftListResponse => {
  const allShifts = getAllShifts();
  const appliedShiftIds = getAppliedShiftIds();

  const shiftsWithAppliedStatus = allShifts.map(shift => ({
    ...shift,
    applied: appliedShiftIds.includes(shift.id)
  }));
  
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedShifts = shiftsWithAppliedStatus.slice(start, end);
  
  return {
    shifts: paginatedShifts,
    page,
    hasMore: end < allShifts.length
  };
};

export const getShiftById = (id: string): Shift | null => {
  const allShifts = getAllShifts();
  const appliedShiftIds = getAppliedShiftIds();
  
  const shift = allShifts.find(shift => shift.id === id);
  
  if (shift) {
    return {
      ...shift,
      applied: appliedShiftIds.includes(shift.id)
    };
  }
  
  return null;
};

export const getAppliedShiftIds = (): string[] => {
  const appliedData = localStorage.getItem(APPLIED_SHIFTS_KEY);
  return appliedData ? JSON.parse(appliedData) : [];
};

export const applyForShift = (shiftId: string): boolean => {
  try {
    const appliedShiftIds = getAppliedShiftIds();
    
    if (appliedShiftIds.includes(shiftId)) {
      return false;
    }
    
    appliedShiftIds.push(shiftId);
    localStorage.setItem(APPLIED_SHIFTS_KEY, JSON.stringify(appliedShiftIds));
    
    return true;
  } catch (error) {
    console.error('Error applying for shift:', error);
    return false;
  }
};

export const cancelApplication = (shiftId: string): boolean => {
  try {
    const appliedShiftIds = getAppliedShiftIds();
    const newAppliedShiftIds = appliedShiftIds.filter(id => id !== shiftId);
    
    localStorage.setItem(APPLIED_SHIFTS_KEY, JSON.stringify(newAppliedShiftIds));
    
    return true;
  } catch (error) {
    console.error('Error canceling application:', error);
    return false;
  }
};
