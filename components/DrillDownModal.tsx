import React, { useState, useEffect } from 'react';
import { X, Save, Edit2, ArrowRight, Search, FileSpreadsheet, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { DrillDownColumn, DrillDownRow } from '../types';

interface DrillDownModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    data: DrillDownRow[];
    columns: DrillDownColumn[];
    editableField?: string;
}

interface EditingCell {
    id: string;
    field: string;
}

export const DrillDownModal: React.FC<DrillDownModalProps> = ({
    isOpen,
    onClose,
    title,
    data,
    columns
}) => {
    const [localData, setLocalData] = useState<DrillDownRow[]>(data);
    const [editingCell, setEditingCell] = useState<EditingCell | null>(null);
    const [editValue, setEditValue] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState('');

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7; // Matching the screenshot roughly

    useEffect(() => {
        setLocalData(data);
        setCurrentPage(1);
    }, [data]);

    if (!isOpen) return null;

    // Filter
    const filteredData = localData.filter(row =>
        Object.values(row).some(val =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Paginate
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const handleEditClick = (id: string, field: string, value: any) => {
        setEditingCell({ id, field });
        setEditValue(String(value));
    };

    const handleSave = () => {
        if (editingCell) {
            setLocalData(prev => prev.map(row =>
                row.id === editingCell.id ? { ...row, [editingCell.field]: editValue } : row
            ));
        }
        setEditingCell(null);
    };

    const getStatusStyle = (status: string) => {
        const s = status.toLowerCase();
        if (s.includes('פתוח') || s.includes('open') || s.includes('pending') || s.includes('ממתין'))
            return "bg-orange-50 text-orange-600 border border-orange-200";
        if (s.includes('בטיפול') || s.includes('בעבודה') || s.includes('work') || s.includes('in progress'))
            return "bg-blue-50 text-blue-600 border border-blue-200";
        if (s.includes('סגור') || s.includes('closed') || s.includes('completed') || s.includes('בוצע'))
            return "bg-gray-50 text-gray-500 border border-gray-200";
        if (s.includes('חריגה') || s.includes('delay') || s.includes('error') || s.includes('תקול'))
            return "bg-red-50 text-red-600 border border-red-200";
        return "bg-gray-50 text-gray-600 border border-gray-200";
    };

    // Pagination Logic
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 7; // show up to 7 numbers

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            // Always show first, last, and current window
            if (currentPage <= 4) {
                for (let i = 1; i <= 5; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 3) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push('...');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#F3F4F6]" dir="rtl">

            {/* Top Navigation Bar */}
            <div className="bg-white px-8 py-5 flex items-center justify-between sticky top-0 z-20 shadow-sm border-b border-gray-200">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </button>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold text-indigo-900 tracking-tight">תחקור נתונים:</h1>
                            <span className="text-2xl text-indigo-600 font-bold">{title}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>טווח זמן: Last 7 Days</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-all shadow-sm font-medium text-sm">
                        <FileSpreadsheet className="w-4 h-4 text-green-600" />
                        <span>ייצוא לאקסל</span>
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-8 overflow-hidden flex flex-col max-w-[1800px] w-full mx-auto">

                {/* Controls Bar & Table Visual Container */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col h-full overflow-hidden">

                    {/* Controls Row */}
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white md:flex-row flex-col gap-4">
                        {/* Search on the Right (RTL Start) */}
                        <div className="relative w-full md:w-96">
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="סנן רשומות..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all outline-none"
                            />
                        </div>

                        <div className="text-sm font-medium text-gray-500">
                            מציג <span className="text-gray-900 font-bold">{filteredData.length}</span> רשומות
                        </div>
                    </div>

                    {/* Table Area */}
                    <div className="flex-1 overflow-auto custom-scrollbar bg-white">
                        <table className="w-full text-sm text-right">
                            <thead className="bg-[#fff] sticky top-0 z-10 text-gray-500 font-medium border-b border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                                <tr>
                                    <th className="px-6 py-4 w-24 text-center font-normal text-gray-400">פעולות</th>
                                    {columns.map((col) => (
                                        <th key={col.key} className="px-6 py-4 whitespace-nowrap font-normal text-gray-500">
                                            {col.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {paginatedData.map((row) => (
                                    <tr key={row.id} className="hover:bg-gray-50/80 transition-colors group">
                                        {/* Actions Column */}
                                        <td className="px-6 py-6 text-center">
                                            <button
                                                className="p-1.5 text-gray-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
                                                title="ערוך רשומה"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                        </td>

                                        {columns.map((col) => {
                                            const isEditing = editingCell?.id === row.id && editingCell?.field === col.key;
                                            const canEditColumn = col.editable;

                                            return (
                                                <td key={`${row.id}-${col.key}`} className="px-6 py-5 align-middle text-gray-900 font-medium">
                                                    {isEditing ? (
                                                        <div className="flex items-center gap-2">
                                                            <input
                                                                autoFocus
                                                                type={col.type === 'number' ? 'number' : 'text'}
                                                                value={editValue}
                                                                onChange={(e) => setEditValue(e.target.value)}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'Enter') handleSave();
                                                                    if (e.key === 'Escape') setEditingCell(null);
                                                                }}
                                                                className="w-full min-w-[120px] px-3 py-1.5 border border-indigo-400 rounded-md focus:outline-none shadow-sm text-sm"
                                                            />
                                                            <div className="flex gap-1">
                                                                <button onClick={handleSave} className="p-1 text-green-600 hover:bg-green-50 rounded">
                                                                    <Save className="w-4 h-4" />
                                                                </button>
                                                                <button onClick={() => setEditingCell(null)} className="p-1 text-gray-400 hover:bg-gray-100 rounded">
                                                                    <X className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className={`flex items-center ${canEditColumn ? 'cursor-pointer' : ''}`}
                                                            onClick={() => {
                                                                if (canEditColumn) handleEditClick(row.id, col.key, row[col.key]);
                                                            }}
                                                        >
                                                            {col.type === 'status' ? (
                                                                <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-sm ${getStatusStyle(String(row[col.key]))}`}>
                                                                    {row[col.key]}
                                                                </span>
                                                            ) : (
                                                                <span className="truncate max-w-[300px] block text-gray-700 group-hover:text-gray-900 transition-colors" title={String(row[col.key])}>
                                                                    {row[col.key]}
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredData.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                                <Search className="w-12 h-12 mb-3 opacity-20" />
                                <p className="text-lg">לא נמצאו רשומות</p>
                                <p className="text-sm opacity-60">נסה לשנות את מילות החיפוש</p>
                            </div>
                        )}
                    </div>

                    {/* Numbered Pagination Footer */}
                    {totalPages > 1 && (
                        <div className="p-4 border-t border-gray-100 bg-white flex items-center justify-center gap-2" dir="ltr">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-gray-500 hover:text-indigo-600 disabled:opacity-30 disabled:hover:text-gray-500 transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Prev
                            </button>

                            <div className="flex items-center gap-1">
                                {getPageNumbers().map((page, idx) => (
                                    <React.Fragment key={idx}>
                                        {page === '...' ? (
                                            <span className="px-2 text-gray-400">...</span>
                                        ) : (
                                            <button
                                                onClick={() => setCurrentPage(Number(page))}
                                                className={`min-w-[32px] h-8 flex items-center justify-center rounded-md text-sm font-medium transition-all ${currentPage === page
                                                        ? 'bg-gray-100 text-indigo-700 font-bold'
                                                        : 'text-indigo-600 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-gray-500 hover:text-indigo-600 disabled:opacity-30 disabled:hover:text-gray-500 transition-colors"
                            >
                                Next
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
