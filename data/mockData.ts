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

import { TrendWidgetData } from '../types';

export const mockTrendsData: TrendWidgetData[] = [
  // 1. Planning vs Execution
  {
    id: 'planning_vs_execution',
    title: 'סטטוס תכנון מול ביצוע',
    visualType: 'bar',
    description: 'השוואה בין כמות הכלים שתוכננו להסתיים לבין אלו שהסתיימו בפועל.',
    chartData: [
      { name: 'ינואר', planned: 40, actual: 35 },
      { name: 'פברואר', planned: 30, actual: 28 },
      { name: 'מרץ', planned: 20, actual: 25 },
      { name: 'אפריל', planned: 27, actual: 20 },
      { name: 'מאי', planned: 18, actual: 18 },
    ],
    drillDownColumns: [
      { key: 'vehicleId', label: "צ'", type: 'text', editable: true },
      { key: 'description', label: 'תיאור תקלה', type: 'text', editable: true },
      { key: 'technician', label: 'טכנאי אחראי', type: 'text', editable: true },
      { key: 'originalDate', label: 'תאריך סיום מקורי', type: 'date', editable: true },
      { key: 'expectedEndDate', label: 'צפי סיום עדכני', type: 'date', editable: true },
      { key: 'status', label: 'סטטוס', type: 'status', editable: true },
      { key: 'delayReason', label: 'סיבת עיכוב', type: 'text', editable: true },
    ],
    drillDownData: [
      { id: '1', vehicleId: '881100', description: 'טיפול 10K', technician: 'אבי כהן', originalDate: '2023-05-15', expectedEndDate: '2023-05-20', status: 'In Delay', delayReason: 'ממתין לחלפים' },
      { id: '2', vehicleId: '123456', description: 'החלפת מנוע', technician: 'ירון לוי', originalDate: '2023-05-10', expectedEndDate: '2023-05-18', status: 'In Delay', delayReason: 'כוח אדם' },
      { id: '3', vehicleId: '665544', description: 'תיקון חשמל', technician: 'רוני ספקטור', originalDate: '2023-05-12', expectedEndDate: '2023-05-12', status: 'Work in Progress', delayReason: '-' },
      { id: '4', vehicleId: '777888', description: 'יישור קו', technician: 'דניאל כהן', originalDate: '2023-05-18', expectedEndDate: '2023-05-19', status: 'Pending', delayReason: '-' },
      { id: '5', vehicleId: '999111', description: 'טיפול תקופתי', technician: 'אבי כהן', originalDate: '2023-05-20', expectedEndDate: '2023-05-20', status: 'Completed', delayReason: '-' },
      { id: '6', vehicleId: '222333', description: 'מערכת בילום', technician: 'שמעון פרץ', originalDate: '2023-05-22', expectedEndDate: '2023-05-25', status: 'In Delay', delayReason: 'עומס עבודה' },
      { id: '7', vehicleId: '444555', description: 'החלפת צמיגים', technician: 'ירון לוי', originalDate: '2023-05-23', expectedEndDate: '2023-05-23', status: 'Work in Progress', delayReason: '-' },
    ],
    editableField: 'expectedEndDate'
  },

  // 2. Maintenance Snapshot
  {
    id: 'maintenance_snapshot',
    title: 'תמונת מצב אחזקה',
    visualType: 'donut',
    description: 'פילוח הזמנות עבודה לפי סטטוס נוכחי.',
    chartData: [
      { name: 'פתוח', value: 15, fill: '#3B82F6' },
      { name: 'בעבודה', value: 45, fill: '#F59E0B' },
      { name: 'ממתין', value: 20, fill: '#EF4444' },
      { name: 'סגור', value: 120, fill: '#10B981' }
    ],
    drillDownColumns: [
      { key: 'orderId', label: 'מספר הזמנה', type: 'text', editable: true },
      { key: 'vehicleId', label: "צ'", type: 'text', editable: true },
      { key: 'priority', label: 'עדיפות', type: 'text', editable: true },
      { key: 'status', label: 'סטטוס', type: 'status', editable: true },
      { key: 'waitingReason', label: 'סיבת המתנה', type: 'text', editable: true },
      { key: 'location', label: 'מיקום', type: 'text', editable: true },
    ],
    drillDownData: [
      { id: '101', orderId: 'ORD-001', vehicleId: '998877', priority: 'גבוה', status: 'ממתין', waitingReason: 'ממתין לחלפים', location: 'מוסך מרכזי' },
      { id: '102', orderId: 'ORD-002', vehicleId: '554433', priority: 'רגיל', status: 'ממתין', waitingReason: 'ממתין לגרר', location: 'בשטח' },
      { id: '103', orderId: 'ORD-003', vehicleId: '112233', priority: 'נמוך', status: 'ממתין', waitingReason: 'החלטת מפקד', location: 'מוסך צפון' },
      { id: '104', orderId: 'ORD-004', vehicleId: '445566', priority: 'גבוה', status: 'בעבודה', waitingReason: '-', location: 'מוסך מרכזי' },
      { id: '105', orderId: 'ORD-005', vehicleId: '778899', priority: 'קריטי', status: 'בעבודה', waitingReason: '-', location: 'מוסך דרום' },
      { id: '106', orderId: 'ORD-006', vehicleId: '332211', priority: 'רגיל', status: 'פתוח', waitingReason: 'טרם שובץ', location: 'מוסך מרכזי' },
      { id: '107', orderId: 'ORD-007', vehicleId: '665544', priority: 'דחוף', status: 'ממתין', waitingReason: 'אישור תקציבי', location: 'משרד טכני' },
    ],
    editableField: 'waitingReason'
  },

  // 3. Annual Planning Compliance
  {
    id: 'annual_planning',
    title: 'עמידה בתכנון שנתי',
    visualType: 'line',
    description: 'מגמת ביצוע מצטברת מול קו יעד שנתי.',
    chartData: [
      { name: 'W1', target: 5, actual: 4 },
      { name: 'W2', target: 10, actual: 9 },
      { name: 'W3', target: 15, actual: 16 },
      { name: 'W4', target: 20, actual: 22 },
      { name: 'W5', target: 25, actual: 24 },
    ],
    drillDownColumns: [
      { key: 'month', label: 'חודש', type: 'text' },
      { key: 'target', label: 'יעד חודשי', type: 'number', editable: true },
      { key: 'actual', label: 'ביצוע בפועל', type: 'number', editable: true },
      { key: 'gap', label: 'פער', type: 'number' },
      { key: 'comment', label: 'הערות', type: 'text', editable: true },
    ],
    drillDownData: [
      { id: 'm1', month: 'ינואר', target: 20, actual: 18, gap: -2, comment: 'חוסר בכ"א' },
      { id: 'm2', month: 'פברואר', target: 20, actual: 22, gap: +2, comment: 'תגבור חיצוני' },
      { id: 'm3', month: 'מרץ', target: 25, actual: 20, gap: -5, comment: 'חגים' },
      { id: 'm4', month: 'אפריל', target: 25, actual: 28, gap: +3, comment: 'מבצע מיוחד' },
      { id: 'm5', month: 'מאי', target: 30, actual: 30, gap: 0, comment: '' },
      { id: 'm6', month: 'יוני', target: 30, actual: 25, gap: -5, comment: 'פער אספקה' },
    ],
    editableField: 'target'
  },

  // 4. Execution Quantities
  {
    id: 'execution_quantities',
    title: 'כמויות ביצוע לתקופה',
    visualType: 'metric_card',
    description: 'סך כל הכלים התקינים ששוחררו בחודש האחרון.',
    chartData: [
      { name: 'כלים ששוחררו', value: 87 }
    ],
    drillDownColumns: [
      { key: 'vehicleId', label: "צ'", type: 'text', editable: true },
      { key: 'model', label: 'דגם', type: 'text', editable: true },
      { key: 'releaseDate', label: 'תאריך שחרור', type: 'date', editable: true },
      { key: 'tecoDate', label: 'תאריך סגירה (TECO)', type: 'date', editable: true },
      { key: 'duration', label: 'משך שהייה (ימים)', type: 'number', editable: true },
    ],
    drillDownData: [
      { id: '201', vehicleId: '777888', model: 'האמר', releaseDate: '2023-05-01', tecoDate: '2023-05-02', duration: 3 },
      { id: '202', vehicleId: '666555', model: 'נמ"ר', releaseDate: '2023-05-03', tecoDate: '2023-05-03', duration: 1 },
      { id: '203', vehicleId: '121212', model: 'זאב', releaseDate: '2023-05-04', tecoDate: '2023-05-05', duration: 2 },
      { id: '204', vehicleId: '343434', model: 'טנק מרכבה', releaseDate: '2023-05-06', tecoDate: '2023-05-07', duration: 5 },
      { id: '205', vehicleId: '565656', model: 'האמר', releaseDate: '2023-05-08', tecoDate: '2023-05-08', duration: 0 },
      { id: '206', vehicleId: '787878', model: 'משאית ריו', releaseDate: '2023-05-10', tecoDate: '2023-05-11', duration: 3 },
      { id: '207', vehicleId: '909090', model: 'נמ"ר', releaseDate: '2023-05-12', tecoDate: '2023-05-14', duration: 4 },
    ],
    editableField: 'tecoDate'
  },

  // 5. WIP & Bottlenecks
  {
    id: 'wip_bottlenecks',
    title: 'כמויות בתהליך (WIP)',
    visualType: 'bar',
    description: 'מספר כלים שנמצאים כרגע בעבודה לפי מחלקה.',
    chartData: [
      { name: 'רכב', count: 12 },
      { name: 'נגמ"ש', count: 8 },
      { name: 'קשר', count: 5 },
      { name: 'חשמל', count: 15 },
    ],
    drillDownColumns: [
      { key: 'vehicleId', label: "צ'", type: 'text', editable: true },
      { key: 'workCenter', label: 'מחלקה', type: 'text', editable: true },
      { key: 'status', label: 'סטטוס', type: 'text', editable: true },
      { key: 'daysInSystem', label: 'ימים במערכת', type: 'number', editable: true },
      { key: 'lastTechnician', label: 'טכנאי אחרון', type: 'text', editable: true },
    ],
    drillDownData: [
      { id: '301', vehicleId: '111222', workCenter: 'חשמל', status: 'ממתין לחלק', daysInSystem: 14, lastTechnician: 'משה דיין' },
      { id: '302', vehicleId: '333444', workCenter: 'רכב', status: 'בעבודה', daysInSystem: 2, lastTechnician: 'דוד בן גוריון' },
      { id: '303', vehicleId: '555666', workCenter: 'נגמ"ש', status: 'ממתין לבוחן', daysInSystem: 5, lastTechnician: 'גולדה מאיר' },
      { id: '304', vehicleId: '777888', workCenter: 'קשר', status: 'בדיקה', daysInSystem: 1, lastTechnician: 'יצחק רבין' },
      { id: '305', vehicleId: '999000', workCenter: 'חשמל', status: 'תקול', daysInSystem: 20, lastTechnician: 'מנחם בגין' },
      { id: '306', vehicleId: '123123', workCenter: 'רכב', status: 'טיפול שוטף', daysInSystem: 3, lastTechnician: 'שמעון פרס' },
      { id: '307', vehicleId: '456456', workCenter: 'נגמ"ש', status: 'החלפת זחל', daysInSystem: 8, lastTechnician: 'אריאל שרון' },
    ],
    editableField: 'workCenter'
  },

  // 6. Manpower Utilization
  {
    id: 'manpower_utilization',
    title: 'אחוז נצילות כ"א',
    visualType: 'radial',
    description: 'השוואה בין שעות עבודה מדווחות לשעות פוטנציאליות.',
    chartData: [
      { name: 'נצילות', value: 78, fill: '#8884d8' }
    ],
    drillDownColumns: [
      { key: 'technicianName', label: 'שם טכנאי', type: 'text', editable: true },
      { key: 'role', label: 'תפקיד', type: 'text', editable: true },
      { key: 'potentialHours', label: 'שעות תקן', type: 'number', editable: true },
      { key: 'reportedHours', label: 'שעות בפועל', type: 'number', editable: true },
      { key: 'efficiency', label: 'יעילות %', type: 'text', editable: true },
    ],
    drillDownData: [
      { id: 'tech1', technicianName: 'דוד כהן', role: 'חשמלאי', potentialHours: 180, reportedHours: 160, efficiency: '88%' },
      { id: 'tech2', technicianName: 'שרה לוי', role: 'מכונאי', potentialHours: 180, reportedHours: 175, efficiency: '97%' },
      { id: 'tech3', technicianName: 'משה ישראלי', role: 'מסגר', potentialHours: 180, reportedHours: 120, efficiency: '66%' },
      { id: 'tech4', technicianName: 'רחל אמנו', role: 'מנהח"ש', potentialHours: 180, reportedHours: 180, efficiency: '100%' },
      { id: 'tech5', technicianName: 'יעקב אבינו', role: 'חשמלאי', potentialHours: 180, reportedHours: 190, efficiency: '105%' },
      { id: 'tech6', technicianName: 'יוסף הצדיק', role: 'לוגיסטיקה', potentialHours: 180, reportedHours: 150, efficiency: '83%' },
    ],
    editableField: 'reportedHours'
  },

  // 7. Norm Compliance
  {
    id: 'norm_compliance',
    title: 'עמידה בנורמה',
    visualType: 'pie',
    description: 'התפלגות טיפולים שבוצעו בתוך הנורמה לעומת חריגות.',
    chartData: [
      { name: 'בנורמה', value: 85, fill: '#10B981' },
      { name: 'חריגה', value: 15, fill: '#EF4444' },
    ],
    drillDownColumns: [
      { key: 'taskId', label: 'משימה', type: 'text', editable: true },
      { key: 'description', label: 'תיאור', type: 'text', editable: true },
      { key: 'normTime', label: 'זמן נורמה (שעות)', type: 'number', editable: true },
      { key: 'actualTime', label: 'זמן בפועל', type: 'number', editable: true },
      { key: 'exceptionReason', label: 'סיבת חריגה', type: 'text', editable: true },
    ],
    drillDownData: [
      { id: 'exc1', taskId: 'TASK-999', description: 'החלפת מסנן', normTime: 4, actualTime: 6.5, exceptionReason: 'חלודה בברגים' },
      { id: 'exc2', taskId: 'TASK-888', description: 'טיפול 10000', normTime: 2, actualTime: 5, exceptionReason: 'חסר כלי ייעודי' },
      { id: 'exc3', taskId: 'TASK-777', description: 'פירוק גלגל', normTime: 0.5, actualTime: 0.5, exceptionReason: '-' },
      { id: 'exc4', taskId: 'TASK-666', description: 'החלפת נורה', normTime: 0.2, actualTime: 0.4, exceptionReason: 'נורה תפוסה' },
      { id: 'exc5', taskId: 'TASK-555', description: 'בדיקת בלמים', normTime: 1.0, actualTime: 0.8, exceptionReason: '-' },
      { id: 'exc6', taskId: 'TASK-444', description: 'שימון שרשרת', normTime: 0.5, actualTime: 1.5, exceptionReason: 'שרשרת קרועה' },
    ],
    editableField: 'exceptionReason'
  },

  // 8. Urgent Orders
  {
    id: 'urgent_orders',
    title: 'הזמנות לקראת חריגה',
    visualType: 'list',
    description: 'רשימת כלים עם פחות מ-24 שעות ל-SLA.',
    chartData: [
      { name: 'פחות מ-24 שעות', count: 3, alertLevel: 'high' },
      { name: '24-48 שעות', count: 7, alertLevel: 'medium' },
    ],
    drillDownColumns: [
      { key: 'vehicleId', label: "צ'", type: 'text', editable: true },
      { key: 'orderType', label: 'סוג הזמנה', type: 'text', editable: true },
      { key: 'timeLeft', label: 'זמן נותר', type: 'text', editable: true },
      { key: 'priority', label: 'עדיפות', type: 'text', editable: true },
      { key: 'slaDueDate', label: 'מועד SLA', type: 'date', editable: true },
    ],
    drillDownData: [
      { id: 'u1', vehicleId: '555111', orderType: 'תקלה משביתה', timeLeft: '4 שעות', priority: 'רגיל', slaDueDate: '2023-05-25 12:00' },
      { id: 'u2', vehicleId: '222444', orderType: 'טיפול שוטף', timeLeft: '12 שעות', priority: 'גבוה', slaDueDate: '2023-05-25 20:00' },
      { id: 'u3', vehicleId: '999000', orderType: 'בטיחות', timeLeft: '23 שעות', priority: 'רגיל', slaDueDate: '2023-05-26 07:00' },
      { id: 'u4', vehicleId: '111222', orderType: 'גרירה', timeLeft: '2 שעות', priority: 'קריטי', slaDueDate: '2023-05-25 10:00' },
      { id: 'u5', vehicleId: '333444', orderType: 'תקלת מזגן', timeLeft: '40 שעות', priority: 'נמוך', slaDueDate: '2023-05-27 12:00' },
    ],
    editableField: 'priority'
  },

  // 9. Data Quality Audit (Code 999)
  {
    id: 'data_quality',
    title: 'איכות רישום (קוד 999)',
    visualType: 'bar',
    description: 'כמות שגיאות אדמיניסטרטיביות לפי מחלקה/משתמש.',
    chartData: [
      { name: 'יוסי לוי', value: 12 },
      { name: 'דני כהן', value: 5 },
      { name: 'רונית אברהם', value: 2 },
    ],
    drillDownColumns: [
      { key: 'errorId', label: 'מזהה שגיאה', type: 'text', editable: true },
      { key: 'date', label: 'תאריך', type: 'date', editable: true },
      { key: 'user', label: 'משתמש', type: 'text', editable: true },
      { key: 'vehicleId', label: "צ'", type: 'text', editable: true },
      { key: 'fieldWithError', label: 'שדה שגוי', type: 'text', editable: true },
      { key: 'details', label: 'פרטים', type: 'text', editable: true },
    ],
    drillDownData: [
      { id: 'e1', errorId: 'ERR-555', date: '2023-05-20', user: 'יוסי לוי', vehicleId: '123456', fieldWithError: 'שעות מנוע', details: 'שדה חובה ריק' },
      { id: 'e2', errorId: 'ERR-556', date: '2023-05-21', user: 'יוסי לוי', vehicleId: '654321', fieldWithError: 'תאריך', details: 'תאריך לא תקין' },
      { id: 'e3', errorId: 'ERR-557', date: '2023-05-22', user: 'דני כהן', vehicleId: '112233', fieldWithError: 'ק"מ', details: 'ערך לא סביר' },
      { id: 'e4', errorId: 'ERR-558', date: '2023-05-22', user: 'רונית אברהם', vehicleId: '334455', fieldWithError: 'מק"ט', details: 'מק"ט לא קיים' },
      { id: 'e5', errorId: 'ERR-559', date: '2023-05-23', user: 'יוסי לוי', vehicleId: '998877', fieldWithError: 'תיאור', details: 'תיאור קצר מדי' },
    ],
    editableField: undefined,
    availableViews: [
      {
        label: 'לפי משתמש',
        key: 'by_user',
        data: [
          { name: 'יוסי לוי', value: 12 },
          { name: 'דני כהן', value: 5 },
          { name: 'רונית אברהם', value: 2 },
        ]
      },
      {
        label: 'לפי כלי',
        key: 'by_vehicle',
        data: [
          { name: 'נמ"ר 881', value: 8 },
          { name: 'טנק 772', value: 6 },
          { name: 'האמר 112', value: 5 },
        ]
      }
    ]
  },

  // 10. Abnormal Parts Consumption
  {
    id: 'abnormal_parts',
    title: 'צריכות חלפים חריגות',
    visualType: 'alert',
    description: 'הזמנות עם כמות חלפים חשודה (כפולה/מוגזמת).',
    chartData: [
      { name: 'חשד לכפילות', value: 4 },
      { name: 'כמות חריגה', value: 2 }
    ],
    drillDownColumns: [
      { key: 'orderId', label: 'הזמנה', type: 'text', editable: true },
      { key: 'partName', label: 'שם חלק', type: 'text', editable: true },
      { key: 'quantity', label: 'כמות שהוזמנה', type: 'number', editable: true },
      { key: 'unitPrice', label: 'מחיר יחידה', type: 'number', editable: true },
      { key: 'totalCost', label: 'סה"כ עלות', type: 'number', editable: true },
      { key: 'componentLine', label: 'פעולה', type: 'text', editable: true },
    ],
    drillDownData: [
      { id: 'ap1', orderId: 'ORD-900', partName: 'מנוע', quantity: 2, unitPrice: 50000, totalCost: 100000, componentLine: 'בטל שורה' },
      { id: 'ap2', orderId: 'ORD-901', partName: 'קיט אטמים', quantity: 10, unitPrice: 200, totalCost: 2000, componentLine: 'בטל שורה' },
      { id: 'ap3', orderId: 'ORD-902', partName: 'מסנן אוויר', quantity: 50, unitPrice: 50, totalCost: 2500, componentLine: 'בטל שורה' },
      { id: 'ap4', orderId: 'ORD-903', partName: 'מצבר', quantity: 4, unitPrice: 800, totalCost: 3200, componentLine: 'בטל שורה' },
      { id: 'ap5', orderId: 'ORD-904', partName: 'שמן גיר', quantity: 200, unitPrice: 30, totalCost: 6000, componentLine: 'בטל שורה' },
    ],
    editableField: 'componentLine'
  }
];