import { Anomaly, SAPWorkOrder } from '../types';

export const mockAnomalies: Anomaly[] = [
  {
    id: '80012490',
    vehicleId: "נמ״ר 881100",
    title: 'סתירה לוגיסטית',
    type: 'logistic_mismatch',
    description: 'דיווח "ממתין לחלף" אל מול ניפוק בפועל',
    punchline: 'נמ"ר צ\' 881100 בסטטוס "ממתין לחלף", אך המנוע נופק ב-02/02.',
    severity: 'high',
    conflicts: [
      { label: 'סטטוס בפועל', value: 'ממתין לחלף', source: 'מערכת ניהול', isMismatch: true },
      { label: 'ניפוק חלפים', value: 'בוצע (לפני 48 שעות)', source: 'מחסן', isMismatch: true }
    ],
    actionLabel: "עדכן סטטוס",
    department: 'חימוש',
    technician: 'אבי ביטון',
    eventTime: '08:00 היום',
    statusText: 'פתיחה מחדש',
    isLemon: false,
    timeline: [
      { id: '1', date: '02/02/2024', time: '10:00', label: 'ניפוק מנוע', status: 'completed' },
      { id: '2', date: 'היום', time: '12:00', label: 'זיהוי פער סטטוס', status: 'warning' }
    ],
    evidenceGraph: {
      type: 'comparison',
      title: 'פער זמנים: ניפוק מול דיווח',
      items: [
        { label: 'זמן מאז ניפוק חלק', value: 48, maxValue: 50, color: 'bg-orange-500', displayValue: '48 שעות' },
        { label: 'זמן בסטטוס "ממתין"', value: 48, maxValue: 50, color: 'bg-gray-400', displayValue: '48 שעות' }
      ]
    }
  },
  {
    id: '80012495',
    vehicleId: "האמר צ' 123456",
    title: 'מניפולציית SLA',
    type: 'revolving',
    description: 'סגירה ופתיחה חוזרת',
    punchline: "זוהתה סגירה ופתיחה מחדש עבור האמר צ' 123456 תוך 12 שעות.",
    severity: 'medium',
    conflicts: [],
    actionLabel: 'מזג הזמנות',
    department: 'רכב',
    technician: 'יוסי לוי',
    eventTime: '18:00 אתמול',
    statusText: 'סגירה',
    isLemon: true,
    lemonContext: 'ניסיון עקיפת מדדי ביצוע ע"י פיצול הזמנות.',
    timeline: [
      { id: '1', date: 'אתמול', time: '16:00', label: 'סגירת הזמנה (TECO)', status: 'completed' },
      { id: '2', date: 'היום', time: '07:30', label: 'פתיחת הזמנה חדשה', status: 'warning' }
    ],
    evidenceGraph: {
      type: 'bar',
      title: 'רצף טיפולים',
      items: [
        { label: 'הזמנה א׳', value: 3, maxValue: 5, color: 'bg-green-500', displayValue: '3 ימים' },
        { label: 'הזמנה ב׳', value: 1, maxValue: 5, color: 'bg-orange-500', displayValue: '1 יום' }
      ]
    }
  },
  {
    id: 'ADMIN-999',
    vehicleId: "מחלקת רכב",
    title: 'בקרת איכות',
    type: 'data_integrity',
    description: 'חריגה בתיקוני רישום (קוד 999)',
    punchline: "חריגה בכמות תיקוני רישום (קוד 999) במחלקת רכב השבוע (עלייה של 400%).",
    severity: 'medium',
    conflicts: [],
    actionLabel: 'הצג חריגים',
    department: 'רכב',
    technician: 'רונית אברהם',
    eventTime: '10:00 היום',
    statusText: 'בטיפול',
    isLemon: false,
    timeline: [],
    evidenceGraph: {
      type: 'comparison',
      title: 'שינויים ידניים (קוד 999)',
      items: [
        { label: 'ממוצע 3 שבועות', value: 5, maxValue: 25, color: 'bg-gray-300', displayValue: '5' },
        { label: 'השבוע', value: 22, maxValue: 25, color: 'bg-red-500', displayValue: '22' }
      ]
    }
  },
  {
    id: '80012501',
    vehicleId: "האמר צ' 665544",
    title: 'הזמנה קפואה',
    type: 'zombie',
    description: 'סטטוס "בעבודה" ללא פעילות',
    punchline: 'האמר צ\' 665544 בסטטוס "עבודה", אך ללא שום פעילות כבר 72 שעות.',
    severity: 'high',
    conflicts: [],
    actionLabel: 'דרוש סטטוס',
    department: 'קשר',
    technician: 'עמית סגל',
    eventTime: '09:00 אתמול',
    statusText: 'פתוח',
    isLemon: false,
    timeline: [
      { id: '1', date: 'לפני 3 ימים', time: '08:00', label: 'עדכון סטטוס אחרון', status: 'completed' },
      { id: '2', date: 'היום', time: '', label: 'ללא תנועת מלאי/שעות', status: 'warning' }
    ],
    evidenceGraph: {
      type: 'comparison',
      title: 'זמן קיפאון',
      items: [
        { label: 'זמן בסטטוס', value: 72, maxValue: 80, color: 'bg-red-500', displayValue: '72 שעות' },
        { label: 'סף התראה', value: 24, maxValue: 80, color: 'bg-gray-300', displayValue: '24 שעות' }
      ]
    }
  },
  {
    id: '80012505',
    vehicleId: "זאב 772211",
    title: 'סגירה ללא ניפוק',
    type: 'other',
    description: 'ניסיון עקיפת מדדים - סגירה ופתיחה מחדש.',
    punchline: 'חשד למניפולציית SLA: סגירת תקלה ללא ניפוק חלפים.',
    severity: 'high',
    conflicts: [],
    actionLabel: 'ברר מול טכנאי',
    isLemon: false,
    timeline: [],
    department: 'רכב',
    technician: 'דניאל כהן',
    eventTime: '14:30 היום',
    statusText: 'סגירה חריגה'
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