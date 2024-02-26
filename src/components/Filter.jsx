import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import './Filter.css';
import ExportData from './ExportData';

const Filter = () => {
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        const storedItem = localStorage.getItem('currentItems');
        if (storedItem) {
            setEmployees(JSON.parse(storedItem));
        }
    }, []);

    const [filterValue, setFilterValue] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [columnVisibility, setColumnVisibility] = useState({
        id: true,
        name: true,
        username: true,
        email: true,
        address: true
    });
    const [showColumnDropdown, setShowColumnDropdown] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        const savedColumnVisibility = localStorage.getItem('columnVisibility');
        if (savedColumnVisibility) {
            setColumnVisibility(JSON.parse(savedColumnVisibility));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('columnVisibility', JSON.stringify(columnVisibility));
    }, [columnVisibility]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users");
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    const handleFilterChange = (e) => {
        setCurrentPage(1);
        setFilterValue(e.target.value);
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        localStorage.setItem('currentItems', JSON.stringify(filteredEmployees));
        setSortConfig({ key, direction });
    };

    const toggleColumnVisibility = (columnName) => {
        setColumnVisibility(prevState => ({
            ...prevState,
            [columnName]: !prevState[columnName]
        }));
        localStorage.setItem('columnVisibility', JSON.stringify(columnVisibility));
    };

    const toggleColumnDropdown = () => {
        setShowColumnDropdown(prevState => !prevState);
    };

    const handleCheckboxChange = (employeeId) => {
        setSelectedRows(prevSelectedRows => {
            if (prevSelectedRows.includes(employeeId)) {
                return prevSelectedRows.filter(id => id !== employeeId);
            } else {
                return [...prevSelectedRows, employeeId];
            }
        });
    };

    const sortedEmployees = [...employees].sort((a, b) => {
        if (sortConfig.direction === 'ascending') {
            return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
        } else {
            return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
        }
    });

    const filteredEmployees = sortedEmployees.filter(employee => {
        return (
            employee.id.toString().includes(filterValue) ||
            employee.name.toLowerCase().includes(filterValue.toLowerCase()) ||
            employee.username.toLowerCase().includes(filterValue.toLowerCase()) ||
            employee.email.toLowerCase().includes(filterValue.toLowerCase()) ||
            employee.address.street.toLowerCase().includes(filterValue.toLowerCase())
        );
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

    const handlePaginationClick = (page) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value, 10));
    };

    return (
        <div className='filter-container'>
            <div className='table-container'>
                
                <input className='input' placeholder='Filter By' type="text" value={filterValue} onChange={handleFilterChange} />
            </div>

            <button className='col' onClick={toggleColumnDropdown}>Columns</button>
            {showColumnDropdown && (
                <div className='column-label-option-container'>
                    <label>
                        <input
                            type="checkbox"
                            checked={columnVisibility.id}
                            onChange={() => toggleColumnVisibility('id')}
                        />
                        ID
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={columnVisibility.name}
                            onChange={() => toggleColumnVisibility('name')}
                        />
                        Name
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={columnVisibility.username}
                            onChange={() => toggleColumnVisibility('username')}
                        />
                        User Name
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={columnVisibility.email}
                            onChange={() => toggleColumnVisibility('email')}
                        />
                        Email
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={columnVisibility.address}
                            onChange={() => toggleColumnVisibility('address')}
                        />
                        Street
                    </label>
                </div>
            )}

            <div className='page-item-number-changer-container'>
                <label>Items per page:</label>
                <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                </select>
            </div>

            <div className="table-outer-container">
            <table>
                <thead>
                    <tr>
                        {columnVisibility.id && (
                            <th onClick={() => handleSort('id')}>
                                ID
                                {sortConfig.key === 'id' &&
                                    (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)
                                }
                                {!sortConfig.key && <FontAwesomeIcon icon={faSort} />}
                            </th>
                        )}
                        {columnVisibility.name && (
                            <th onClick={() => handleSort('name')}>
                                Name
                                {sortConfig.key === 'name' &&
                                    (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)
                                }
                                {!sortConfig.key && <FontAwesomeIcon icon={faSort} />}
                            </th>
                        )}
                        {columnVisibility.username && (
                            <th onClick={() => handleSort('username')}>
                                User Name
                                {sortConfig.key === 'username' &&
                                    (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)
                                }
                                {!sortConfig.key && <FontAwesomeIcon icon={faSort} />}
                            </th>
                        )}
                        {columnVisibility.email && (
                            <th onClick={() => handleSort('email')}>
                                Email
                                {sortConfig.key === 'email' &&
                                    (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)
                                }
                                {!sortConfig.key && <FontAwesomeIcon icon={faSort} />}
                            </th>
                        )}
                        {columnVisibility.address && (
                            <th onClick={() => handleSort('address')}>
                                Street
                                {sortConfig.key === 'address' &&
                                    (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)
                                }
                                {!sortConfig.key && <FontAwesomeIcon icon={faSort} />}
                            </th>
                        )}
                        <th>Select</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map(employee => (
                        <tr key={employee.id}>
                            {columnVisibility.id && <td>{employee.id}</td>}
                            {columnVisibility.name && <td>{employee.name}</td>}
                            {columnVisibility.username && <td>{employee.username}</td>}
                            {columnVisibility.email && <td>{employee.email}</td>}
                            {columnVisibility.address && <td>{employee.address.street}</td>}
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedRows.includes(employee.id)}
                                    onChange={() => handleCheckboxChange(employee.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>

            <div className='page-number-changer-cotainer'>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <button className='btn' key={page} onClick={() => handlePaginationClick(page)}>{page}</button>
                ))}
            </div>
            <ExportData data={currentItems} />
        </div>
    );
};

export default Filter;
