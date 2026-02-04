import { Anomaly, SAPWorkOrder } from '../types';

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

export const mockSAPOrders: SAPWorkOrder[] = [
  {
    AUFNR: '80001234',
    QMEL: '20005678',
    AUART: 'PM01', // Corrective Maint
    KTEXT: 'החלפת מנוע - התחממות יתר',
    STTXT: 'TECO CNF',
    WARPL: '',
    INGRP: 'M01',
    VAPLZ: 'MECH_DEPT',
    TPLNR: 'IL-81900',
    EQUNR: '10081900',
    BAUTL: 'ENGINE_V6',
    GSTRP: '2023-10-20',
    GLTRP: '2023-10-22',
    GETRI: '2023-10-24', // Late
    FTRMI: '2023-10-20',
    AUSVN: '2023-10-19T14:30:00',
    AUSBS: '2023-10-24T10:00:00',
    MSAUS: 115.5,
    BRKDWN: true,
    FECOD: 'HEAT',
    URCOD: 'LEAK',
    PROBC: 'COOLANT',
    MNCOD: 'REPLACE',
    ERNAM: 'S_COHEN',
    operations: [
      { operationNum: '0010', workCenter: 'MECH', description: 'פירוק מנוע ישן', plannedWork: 4, actualWork: 5.5, status: 'CNF' },
      { operationNum: '0020', workCenter: 'MECH', description: 'הרכבת מנוע חדש', plannedWork: 6, actualWork: 6, status: 'CNF' },
      { operationNum: '0030', workCenter: 'TEST', description: 'בדיקת הרצה', plannedWork: 2, actualWork: 2, status: 'CNF' }
    ],
    components: [
      { materialNum: 'MAT-ENG-V6', description: 'מנוע V6 דיזל', quantityRequired: 1, quantityWithdrawn: 1, storageLocation: 'MAIN_WH' },
      { materialNum: 'MAT-OIL-5W40', description: 'שמן מנוע סינתטי', quantityRequired: 5, quantityWithdrawn: 6, storageLocation: 'LOC_A' },
      { materialNum: 'MAT-GASKET-KIT', description: 'סט אטמים', quantityRequired: 1, quantityWithdrawn: 1, storageLocation: 'LOC_B' }
    ],
    partners: [
      { role: 'Driver', name: 'אבי לוי', id: 'DRV_001' },
      { role: 'Manager', name: 'יוסי כהן', id: 'MGR_055' }
    ],
    costs: {
      plannedConfig: 15000,
      actual: 16200,
      currency: 'ILS'
    }
  },
  {
    AUFNR: '80001235',
    QMEL: '20005679',
    AUART: 'PM02', // Preventive
    KTEXT: 'טיפול 10,000 ק"מ',
    STTXT: 'REL',
    WARPL: 'PLAN_10K',
    INGRP: 'M01',
    VAPLZ: 'MECH_DEPT',
    TPLNR: 'IL-66421',
    EQUNR: '10066421',
    BAUTL: '',
    GSTRP: '2023-10-25',
    GLTRP: '2023-10-25',
    GETRI: '',
    FTRMI: '2023-10-25',
    AUSVN: '',
    AUSBS: '',
    MSAUS: 0,
    BRKDWN: false,
    FECOD: '',
    URCOD: '',
    PROBC: '',
    MNCOD: 'INSPECT',
    ERNAM: 'D_LEVI',
    operations: [
      { operationNum: '0010', workCenter: 'MECH', description: 'בדיקה כללית', plannedWork: 1.5, actualWork: 1.5, status: 'CNF' },
      { operationNum: '0020', workCenter: 'MECH', description: 'החלפת פילטרים', plannedWork: 0.5, actualWork: 0.5, status: 'CNF' }
    ],
    components: [
      { materialNum: 'MAT-FIL-AIR', description: 'פילטר אוויר', quantityRequired: 1, quantityWithdrawn: 1, storageLocation: 'MAIN_WH' },
      { materialNum: 'MAT-FIL-OIL', description: 'פילטר שמן', quantityRequired: 1, quantityWithdrawn: 1, storageLocation: 'MAIN_WH' }
    ],
    partners: [
      { role: 'Driver', name: 'דני רופ', id: 'DRV_022' }
    ],
    costs: {
      plannedConfig: 1200,
      actual: 1200,
      currency: 'ILS'
    }
  },
  {
    AUFNR: '80001236',
    QMEL: '20005680',
    AUART: 'PM01',
    KTEXT: 'תיקון פנס אחורי שבור',
    STTXT: 'CRTD',
    WARPL: '',
    INGRP: 'E01',
    VAPLZ: 'ELEC_DEPT',
    TPLNR: 'IL-11094',
    EQUNR: '10011094',
    BAUTL: 'LIGHT_R_R',
    GSTRP: '2023-10-26',
    GLTRP: '2023-10-26',
    GETRI: '',
    FTRMI: '',
    AUSVN: '2023-10-26T08:00:00',
    AUSBS: '',
    MSAUS: 0,
    BRKDWN: false,
    FECOD: 'BROKEN',
    URCOD: 'ACCIDENT',
    PROBC: 'LIGHT',
    MNCOD: 'REPAIR',
    ERNAM: 'Y_ISRAELI',
    operations: [
      { operationNum: '0010', workCenter: 'ELEC', description: 'החלפת בית נורה', plannedWork: 0.5, actualWork: 0.5, status: 'CNF' }
    ],
    components: [
      { materialNum: 'MAT-BULB-H7', description: 'נורה H7', quantityRequired: 1, quantityWithdrawn: 1, storageLocation: 'ELEC_STOR' }
    ],
    partners: [],
    costs: {
      plannedConfig: 150,
      actual: 150,
      currency: 'ILS'
    }
  }
];