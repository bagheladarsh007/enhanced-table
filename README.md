# Employee Data Filter Component
Overview
This React component (Filter) is designed to display and filter employee data fetched from an external API. It provides functionality to filter, sort, and paginate through the employee data. Additionally, it allows users to select individual employees and export the displayed data.

# Technologies Used
## React: The component is built using React, a JavaScript library for building user interfaces.
## FontAwesome: Icons from FontAwesome are utilized for sorting functionality and user interface enhancements.
## localStorage: HTML5 Web Storage API is used to persist user preferences such as column visibility and selected rows.
## Fetch API: The Fetch API is used to asynchronously fetch data from the JSONPlaceholder API, which provides mock data for testing and prototyping.
# Features
## Filtering
Users can filter the displayed employee data by entering text in the filter input field.
Filtering is performed on multiple fields including ID, name, username, email, and address.
## Sorting
Employees can be sorted based on each column by clicking on the column header.
Sorting can be toggled between ascending and descending order.
## Column Visibility
Users can choose which columns to display by clicking the "Columns" button and selecting/deselecting columns from the dropdown.
Column visibility preferences are persisted using localStorage.
## Pagination
Employee data is paginated, allowing users to navigate through multiple pages.
Users can select the number of items per page from a dropdown menu.
## Selection
Users can select individual employees by clicking checkboxes in the table rows.
Selected rows are stored in the component's state and can be used for further processing.
## Export Data
The component includes an "Export Data" button which allows users to export the currently displayed data.
Exported data includes only the currently displayed items on the current page.
## Usage
To use the Filter component in your project, follow these steps:

Import the Filter component into your React application.
Place the Filter component in your desired location within your application.
Ensure FontAwesome icons and styles are properly imported and configured in your application.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
