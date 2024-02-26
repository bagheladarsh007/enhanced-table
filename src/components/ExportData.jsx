import React from 'react';
import { saveAs } from 'file-saver';
import { CSVLink } from 'react-csv';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const ExportData = ({ data }) => {
    const [exportFormat, setExportFormat] = React.useState('csv');

    const handleExportFormatChange = (e) => {
        setExportFormat(e.target.value);
    };

    const exportData = () => {
        if (exportFormat === 'pdf') {
            exportDataAsPDF();
        } else if (exportFormat === 'csv') {
            exportDataAsCSV();
        } else if (exportFormat === 'excel') {
            exportDataAsExcel();
        }
    };

    const exportDataAsCSV = () => {
        const csvData = data.map(item => ({
            id: item.id,
            name: item.name,
            username: item.username,
            email: item.email,
            // Add more fields as needed
        }));
        const csvHeaders = Object.keys(csvData[0]);
        const csvContent = [
            csvHeaders.join(','),
            ...csvData.map(item => csvHeaders.map(field => item[field]).join(','))
        ].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, 'data.csv');
    };

    const exportDataAsPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['ID', 'Name', 'Username', 'Email']],
            body: data.map(item => [item.id, item.name, item.username, item.email]),
        });
        doc.save('data.pdf');
    };

    const exportDataAsExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'data.xlsx');
    };

    return (
        <div style={{display:'flex',justifyContent:'space-around'}}> 
        <div>
        <label>Export Format: </label>
            <select value={exportFormat} onChange={handleExportFormatChange}>
                <option value="csv">CSV</option>
                <option value="excel">Excel</option>
                <option value="pdf">PDF</option>
            </select>
        </div>
           
            <button className='btn1' onClick={exportData} style={{paddingRight:10}}>Export</button>
            {exportFormat === 'csv' && (
                <CSVLink data={data} filename={"data.csv"}>Download CSV</CSVLink>
            )}
        </div>
    );
};

export default ExportData;
