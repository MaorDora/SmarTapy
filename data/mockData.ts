import { Anomaly } from '../types';

export const mockAnomalies: Anomaly[] = [
  {
    id: 'REQ-1.0',
    vehicleId: "צ' 81900",
    title: 'סתירה בסטטוס כלי',
    description: 'חוסר תאימות בין מערכות לוגיסטיות לתפעוליות.',
    severity: 'high',
    conflicts: [
      { label: 'ERP', value: 'בתיקון', source: 'מערכת ראשית', isMismatch: true },
      { label: 'לוגיסטיקה', value: 'ממתין לחלק', source: 'מחסן', isMismatch: true }
    ],
    actionLabel: 'עדכן סטטוס',
    isLemon: false,
    timeline: [
      { id: '1', date: '24/10/2023', time: '08:30', label: 'פתיחת תקלה', status: 'completed' },
      { id: '2', date: '24/10/2023', time: '10:15', label: 'הזמנת רכש', status: 'completed' },
      { id: '3', date: 'היום', time: '14:00', label: 'חריגת סטטוס', status: 'warning' },
    ],
    evidenceGraph: {
      type: 'comparison',
      title: 'פער זמנים: ניפוק מול דיווח',
      items: [
        { label: 'זמן מאז ניפוק חלק', value: 48, maxValue: 48, color: 'bg-orange-500', displayValue: '48 שעות' },
        { label: 'זמן בסטטוס "ממתין"', value: 48, maxValue: 48, color: 'bg-gray-400', displayValue: '48 שעות' }
      ],
      thresholdLabel: 'זמן תגובה תקין (שעתיים)',
      thresholdValue: 4
    }
  },
  {
    id: 'REQ-2.0',
    vehicleId: "צ' 66421",
    title: 'חשד למניפולציית SLA',
    description: 'ניסיון עקיפת מדדים - סגירה ופתיחה מחדש.',
    severity: 'medium',
    conflicts: [
      { label: 'סגירה', value: 'אתמול 18:00', source: 'מערכת', isMismatch: true },
      { label: 'פתיחה מחדש', value: 'היום 08:00', source: 'מערכת', isMismatch: true }
    ],
    actionLabel: 'דווח למפקד',
    isLemon: true,
    lemonContext: 'רכב חוזר: 4 כניסות בחודש האחרון',
    timeline: [
      { id: '1', date: '23/10/2023', time: '17:55', label: 'דיווח גמר', status: 'completed' },
      { id: '2', date: '23/10/2023', time: '18:00', label: 'סגירת הזמנה', status: 'completed' },
      { id: '3', date: '24/10/2023', time: '08:00', label: 'פתיחה מחדש', status: 'warning' },
    ],
    evidenceGraph: {
      type: 'bar',
      title: 'רצף טיפולים (חודשי)',
      items: [
        { label: 'טיפולים החודש', value: 4, maxValue: 5, color: 'bg-rose-500', displayValue: '4 כניסות' },
        { label: 'ממוצע לצי', value: 1.2, maxValue: 5, color: 'bg-slate-400', displayValue: '1.2 כניסות' }
      ]
    }
  },
  {
    id: 'REQ-8.0',
    vehicleId: "צ' 11094",
    title: 'סגירה ללא ניפוק',
    description: 'דיווח גמר עבודה ללא עלות חלפים.',
    severity: 'high',
    conflicts: [
      { label: 'סטטוס', value: 'TECO (גמר)', source: 'ERP', isMismatch: false },
      { label: 'עלות חלפים', value: '0.00 ₪', source: 'SAP', isMismatch: true }
    ],
    actionLabel: 'פתח מחדש',
    isLemon: false,
    timeline: [
      { id: '1', date: '22/10/2023', time: '09:00', label: 'כניסה לטיפול', status: 'completed' },
      { id: '2', date: '24/10/2023', time: '11:00', label: 'סגירה מנהלית', status: 'warning' },
    ],
    evidenceGraph: {
      type: 'bar',
      title: 'עלות חלפים ממוצעת לטיפול זה',
      items: [
        { label: 'עלות בפועל', value: 0, maxValue: 5000, color: 'bg-red-500', displayValue: '0 ₪' },
        { label: 'עלות תקן (טיפול 10K)', value: 3500, maxValue: 5000, color: 'bg-green-500', displayValue: '3,500 ₪' }
      ]
    }
  }
];