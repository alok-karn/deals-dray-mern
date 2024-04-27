import { formatDate } from "@/utils/utils";
import { useState } from "react";

const EmployeeTableView = ({ data, handleDelete }) => {
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
                        className="border-2 px-4 py-2 w-[24vw] rounded-md focus:outline-blue-300"
                    />
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
                        {data.map((employee, index) => (
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
                                    {employee.course.map((course, index) => (
                                        <span
                                            key={index}
                                            className="bg-gray-200 px-2 py-1 rounded-md mr-2">
                                            {course}
                                        </span>
                                    ))}
                                </td>
                                <td className="text-[1.1vw] font-medium text-gray-900">
                                    {formatDate(employee.createdAt)}
                                </td>
                                <td className="text-[1.1vw] font-medium text-gray-900 flex flex-col gap-2 items-start">
                                    <button className="px-3 py-1 bg-blue-400 text-white rounded-md hover:bg-blue-500">
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
