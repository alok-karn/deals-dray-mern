import { _debounce, formatDate } from "@/utils/utils";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const EmployeeTableView = ({ handleUpdate }) => {
    const [data, setData] = useState([]);

    const [query, setQuery] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const getEmployeeDetails = useCallback(async () => {
        try {
            const { data } = await axios.get("/api/employee");
            if (data.success) {
                setData(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        getEmployeeDetails();
    }, [getEmployeeDetails]);

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`/api/employee/?id=${id}`);
            if (data.success) {
                getEmployeeDetails();
            }
        } catch (error) {
            console.log("Error Deleting User", error);
        }
    };

    // debooundeed search function

    const debounceSearch = useCallback(
        _debounce(async (searchQuery) => {
            try {
                const response = await axios.get(
                    `/api/search?q=${searchQuery}`
                );
                if (response.data.success) {
                    setSearchResult(response.data.data);
                }
            } catch (error) {
                console.error("Error Searching", error);
            }
        }, 300),
        []
    );

    const handleSearch = (e) => {
        const searchQuery = e.target.value;
        setQuery(searchQuery);
        if (searchQuery.length === 0) {
            setSearchResult([]);
            return;
        }
        debounceSearch(searchQuery);
    };

    const handleClearSearchResult = () => {
        setQuery("");
        setSearchResult([]);
    };

    return (
        <div className="w-full h-auto py-8">
            <div className="w-full flex items-center justify-between">
                <h1 className="text-[3vw] font-bold text-gray-900">
                    Employee List
                </h1>
                <div>
                    <h2 className="text-[1.3vw] font-medium text-gray-900 mb-2">
                        Total Count: {data.length}
                    </h2>
                    <input
                        type="text"
                        placeholder="Enter search keyword"
                        value={query}
                        onChange={handleSearch}
                        className="border-2 px-4 py-2 w-[24vw] rounded-md focus:outline-blue-300"
                    />
                    <button
                        className="bg-yellow-200 px-3 py-1 rounded-md font-medium text-gray-900 ml-4 hover:bg-yellow-300"
                        onClick={handleClearSearchResult}>
                        Clear
                    </button>
                </div>
            </div>
            <div className="w-full mt-8">
                <table className="basic">
                    <thead>
                        <tr>
                            <td className="text-[1.2vw] font-bold text-gray-900 capitalize">
                                Unique Id
                            </td>
                            <td className="text-[1.2vw] font-bold text-gray-900 capitalize">
                                Image
                            </td>
                            <td className="text-[1.2vw] font-bold text-gray-900 capitalize">
                                Name
                            </td>
                            <td className="text-[1.2vw] font-bold text-gray-900 capitalize">
                                Email
                            </td>
                            <td className="text-[1.2vw] font-bold text-gray-900 capitalize">
                                Mobile No
                            </td>
                            <td className="text-[1.2vw] font-bold text-gray-900 capitalize">
                                Designation
                            </td>
                            <td className="text-[1.2vw] font-bold text-gray-900 capitalize">
                                Gender
                            </td>
                            <td className="text-[1.2vw] font-bold text-gray-900 capitalize">
                                Course
                            </td>
                            <td className="text-[1.2vw] font-bold text-gray-900 capitalize">
                                Created Date
                            </td>
                            <td className="text-[1.2vw] font-bold text-gray-900 capitalize">
                                Action
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResult.length > 0
                            ? searchResult.map((employee, index) => (
                                  <tr key={employee.id}>
                                      <td className="text-[1.1vw] font-medium text-gray-900">
                                          {index + 1}
                                      </td>
                                      <td className="text-[1.1vw] font-medium text-gray-900">
                                          <img
                                              src={employee.imageUrl}
                                              alt={employee.name}
                                              className="w-[50px] h-[50px] rounded-full"
                                          />
                                      </td>
                                      <td className="text-[1.1vw] font-medium text-gray-900 capitalize">
                                          {employee.name}
                                      </td>
                                      <td className="text-[1.1vw] font-medium text-gray-900">
                                          {employee.email}
                                      </td>
                                      <td className="text-[1.1vw] font-medium text-gray-900">
                                          {employee.mobile}
                                      </td>
                                      <td className="text-[1.1vw] font-medium text-gray-900">
                                          {employee.designation}
                                      </td>
                                      <td className="text-[1.1vw] font-medium text-gray-900 capitalize">
                                          {employee.gender}
                                      </td>
                                      <td className="text-[1.1vw] font-medium text-gray-900">
                                          {employee.course.map(
                                              (course, index) => (
                                                  <span
                                                      key={index}
                                                      className="bg-gray-200 px-2 py-1 rounded-md mr-2">
                                                      {course}
                                                  </span>
                                              )
                                          )}
                                      </td>
                                      <td className="text-[1.1vw] font-medium text-gray-900">
                                          {formatDate(employee.createdAt)}
                                      </td>
                                      <td className="text-[1.1vw] font-medium text-gray-900 flex flex-col gap-2 items-start">
                                          <button
                                              className="px-3 py-1 bg-blue-400 text-white rounded-md hover:bg-blue-500"
                                              onClick={() =>
                                                  handleUpdate(employee._id)
                                              }>
                                              Edit
                                          </button>
                                          <button
                                              className="px-3 py-1 bg-red-400 text-white rounded-md hover:bg-red-500"
                                              onClick={() =>
                                                  handleDelete(employee._id)
                                              }>
                                              Delete
                                          </button>
                                      </td>
                                  </tr>
                              ))
                            : data.map((employee, index) => (
                                  <tr key={employee.id}>
                                      <td className="text-[1.1vw] font-medium text-gray-900">
                                          {index + 1}
                                      </td>
                                      <td className="text-[1.1vw] font-medium text-gray-900">
                                          <img
                                              src={employee.imageUrl}
                                              alt={employee.name}
                                              className="w-[50px] h-[50px] rounded-full"
                                          />
                                      </td>
                                      <td className="text-[1.1vw] font-medium text-gray-900 capitalize">
                                          {employee.name}
                                      </td>
                                      <td className="text-[1.1vw] font-medium text-gray-900">
                                          {employee.email}
                                      </td>
                                      <td className="text-[1.1vw] font-medium text-gray-900">
                                          {employee.mobile}
                                      </td>
                                      <td className="text-[1.1vw] font-medium text-gray-900">
                                          {employee.designation}
                                      </td>
                                      <td className="text-[1.1vw] font-medium text-gray-900 capitalize">
                                          {employee.gender}
                                      </td>
                                      <td className="text-[1.1vw] font-medium text-gray-900">
                                          {employee.course.map(
                                              (course, index) => (
                                                  <span
                                                      key={index}
                                                      className="bg-gray-200 px-2 py-1 rounded-md mr-2">
                                                      {course}
                                                  </span>
                                              )
                                          )}
                                      </td>
                                      <td className="text-[1.1vw] font-medium text-gray-900">
                                          {formatDate(employee.createdAt)}
                                      </td>
                                      <td className="text-[1.1vw] font-medium text-gray-900 flex flex-col gap-2 items-start">
                                          <button
                                              className="px-3 py-1 bg-blue-400 text-white rounded-md hover:bg-blue-500"
                                              onClick={() =>
                                                  handleUpdate(employee._id)
                                              }>
                                              Edit
                                          </button>
                                          <button
                                              className="px-3 py-1 bg-red-400 text-white rounded-md hover:bg-red-500"
                                              onClick={() =>
                                                  handleDelete(employee._id)
                                              }>
                                              Delete
                                          </button>
                                      </td>
                                  </tr>
                              ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeTableView;
