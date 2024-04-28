import EmployeeForm from "@/components/EmployeeForm";
import EmployeeTableView from "@/components/EmployeeTableView";
import Layout from "@/components/Layout";
import dummyEmployees from "@/utils/data";
import { withAdminAuth } from "@/utils/withAdminAuth";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const EmployeeList = () => {
    const [menu, setMenu] = useState("create");
    const [data, setData] = useState([]);
    const [oneEmployee, setOneEmployee] = useState({});

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

    const handleUpdate = useCallback(async (id) => {
        try {
            const { data } = await axios.get(`/api/employee/?id=${id}`);
            if (data.success) {
                setOneEmployee(data.data);
                setMenu("create");
                // setOneEmployee({});
            }
        } catch (error) {
            console.log("Error Fetching Employee", error);
        }
    }, []);

    return (
        <Layout>
            <div className="w-full py-2 flex items-center justify-between">
                <h1 className="text-lg font-medium text-gray-800">Employee</h1>
                <div className=" flex items-center justify-end">
                    {["Create", "View"].map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setMenu(item.toLowerCase())}
                            className={`${
                                menu === item.toLowerCase()
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200"
                            } px-4 py-2 rounded-md font-medium mr-2`}>
                            {item}
                        </button>
                    ))}
                </div>
            </div>
            {
                {
                    create: oneEmployee && <EmployeeForm {...oneEmployee} />,
                    view: (
                        <EmployeeTableView
                            handleUpdate={handleUpdate}
                            // handleDelete={handleDelete}
                        />
                    ),
                }[menu]
            }
        </Layout>
    );
};

export default withAdminAuth(EmployeeList);
