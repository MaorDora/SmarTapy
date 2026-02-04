// SAP Option Lists / Enums in Hebrew

export const SAP_CONSTANTS = {
    // 1. Order Types (AUART)
    ORDER_TYPES: [
        { value: 'PM01', label: 'PM01 - תחזוקת שבר (Corrective)' },
        { value: 'PM02', label: 'PM02 - תחזוקה מונעת (Preventive)' },
        { value: 'PM03', label: 'PM03 - השבחה / שיפור (Improvement)' },
        { value: 'PM04', label: 'PM04 - שיפוץ כללי (Refurbishment)' },
        { value: 'PM05', label: 'PM05 - בדיקת כיול (Calibration)' },
        { value: 'PM06', label: 'PM06 - פרויקט (Project)' },
        { value: 'PM10', label: 'PM10 - הכנה לחורף (Seasonal)' }
    ],

    // 2. System Statuses (STTXT)
    STATUSES: [
        { value: 'CRTD', label: 'CRTD - נפתח/נוצר (Created)' },
        { value: 'REL', label: 'REL - משוחרר לביצוע (Released)' },
        { value: 'CNF', label: 'CNF - אושר ביצוע (Confirmed)' },
        { value: 'PCNF', label: 'PCNF - אושר חלקית (Partially Confirmed)' },
        { value: 'TECO', label: 'TECO - גמר טכני (Technically Completed)' },
        { value: 'CLSD', label: 'CLSD - סגור סופית (Closed)' },
        { value: 'MANC', label: 'MANC - חוסר חומר (Material Shortage)' }
    ],

    // 3. Work Centers (VAPLZ)
    WORK_CENTERS: [
        { value: 'MECH_HVY', label: 'מכונאות רכב כבד' },
        { value: 'MECH_LGT', label: 'מכונאות רכב קל' },
        { value: 'ELEC_SYS', label: 'חשמל ודיאגנוסטיקה' },
        { value: 'HYDR_PNU', label: 'הידראוליקה ופנאומטיקה' },
        { value: 'BODY_WLD', label: 'פחחות ומסגרות' },
        { value: 'TIRE_SHOP', label: 'פנצ\'ריה' },
        { value: 'OUT_SRC', label: 'קבלן חוץ' }
    ],

    // 4. Assembly/Parts (BAUTL)
    ASSEMBLY_CODES: [
        { value: 'ENG_ASM', label: 'מכלול מנוע' },
        { value: 'GRB_ASM', label: 'ממסרת / גיר' },
        { value: 'BRK_SYS', label: 'מערכת בלימה' },
        { value: 'CLG_SYS', label: 'מערכת קירור' },
        { value: 'ELC_GEN', label: 'אלטרנטור / טעינה' },
        { value: 'SUS_FRT', label: 'מתלים קדמיים' },
        { value: 'STR_WHL', label: 'מערכת היגוי' }
    ],

    // 5. Damage Codes (FECOD)
    DAMAGE_CODES: [
        { value: 'BRK', label: 'שבר מכני' },
        { value: 'LEA', label: 'נזילה / דליפה' },
        { value: 'OHT', label: 'התחממות יתר' },
        { value: 'NOI', label: 'רעש חריג' },
        { value: 'VIB', label: 'רעידות' },
        { value: 'ELC', label: 'קצר חשמלי' },
        { value: 'WAR', label: 'בלאי טבעי' },
        { value: 'COR', label: 'קורוזיה / חלודה' }
    ],

    // 6. Cause Codes (URCOD)
    CAUSE_CODES: [
        { value: 'NORM', label: 'בלאי סביר (Normal Wear)' },
        { value: 'ACCD', label: 'תאונה / נזק פיזי' },
        { value: 'OPER', label: 'תפעול לקוי (נהג)' },
        { value: 'MAIN', label: 'אחזקה לקויה' },
        { value: 'QUAL', label: 'איכות חלק ירודה' },
        { value: 'ENV', label: 'נזקי טבע / סביבה' },
        { value: 'UNK', label: 'לא ידוע' }
    ],

    // 7. Task Codes (MNCOD)
    TASK_CODES: [
        { value: 'REP', label: 'תיקון (Repair)' },
        { value: 'RPL', label: 'החלפה (Replace)' },
        { value: 'ADJ', label: 'כיוון (Adjust)' },
        { value: 'INS', label: 'בדיקה (Inspect)' },
        { value: 'CLN', label: 'ניקוי (Clean)' },
        { value: 'OVH', label: 'שיפוץ (Overhaul)' },
        { value: 'LUB', label: 'גירוז / שימון' }
    ]
};
