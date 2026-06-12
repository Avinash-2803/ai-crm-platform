import { useEffect, useState } from "react";

import api from "../services/api";
import Layout from "../components/Layout";

function Customers() {

  const [customers, setCustomers] =
    useState([]);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [company, setCompany] =
    useState("");

  const [industry, setIndustry] =
    useState("");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedCustomer,
    setSelectedCustomer] =
    useState(null);

  const token =
    localStorage.getItem("access");

  const fetchCustomers = async () => {

    try {

      const response =
        await api.get(
          "customers/",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setCustomers(
        response.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  const createCustomer =
    async (e) => {

      e.preventDefault();

      try {

        await api.post(
          "customers/",
          {
            name,
            email,
            phone,
            company,
            industry,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        setName("");
        setEmail("");
        setPhone("");
        setCompany("");
        setIndustry("");

        fetchCustomers();

        alert(
          "Customer Created Successfully"
        );

      } catch (error) {

        console.log(error);

        console.log(
          error.response?.data
        );

        alert(
          JSON.stringify(
            error.response?.data
          )
        );

      }

    };

  const deleteCustomer = async (
    customerId
  ) => {

    const confirmDelete =
      window.confirm(
        "Delete customer?"
      );

    if (!confirmDelete) {
      return;
    }

    try {

      await api.delete(
        `customers/${customerId}/`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      fetchCustomers();

    } catch (error) {

      console.log(error);

      alert(
        "Delete Failed"
      );

    }

  };

  const filteredCustomers =
    customers.filter(
      (customer) =>

        customer.name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||

        customer.email
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||

        customer.company
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||

        customer.industry
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
    );

  useEffect(() => {

    fetchCustomers();

  }, []);

  return (

    <Layout title="Customers">

      <div
        className="
          bg-white
          rounded-xl
          shadow-md
          p-6
          mb-8
        "
      >

        <h2
          className="
            text-xl
            font-bold
            mb-4
          "
        >
          Create Customer
        </h2>

        <form
          onSubmit={
            createCustomer
          }
          className="
            grid
            gap-4
          "
        >

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="
              border
              p-2
              rounded-lg
            "
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="
              border
              p-2
              rounded-lg
            "
            required
          />

          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
            className="
              border
              p-2
              rounded-lg
            "
            required
          />

          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) =>
              setCompany(
                e.target.value
              )
            }
            className="
              border
              p-2
              rounded-lg
            "
            required
          />

          <input
            type="text"
            placeholder="Industry"
            value={industry}
            onChange={(e) =>
              setIndustry(
                e.target.value
              )
            }
            className="
              border
              p-2
              rounded-lg
            "
            required
          />

          <button
            type="submit"
            className="
              bg-blue-600
              text-white
              py-2
              rounded-lg
            "
          >
            Create Customer
          </button>

        </form>

      </div>

      <div
        className="
          bg-white
          rounded-xl
          shadow-md
          p-4
          mb-6
        "
      >

        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          className="
            w-full
            border
            rounded-lg
            p-2
          "
        />

      </div>

      {
        selectedCustomer && (

          <div
            className="
              bg-white
              rounded-xl
              shadow-md
              p-6
              mb-6
            "
          >

            <h2
              className="
                text-xl
                font-bold
                mb-4
              "
            >
              Customer Details
            </h2>

            <p>
              <strong>Name:</strong>{" "}
              {selectedCustomer.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {selectedCustomer.email}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {selectedCustomer.phone}
            </p>

            <p>
              <strong>Company:</strong>{" "}
              {selectedCustomer.company}
            </p>

            <p>
              <strong>Industry:</strong>{" "}
              {selectedCustomer.industry}
            </p>

          </div>

        )
      }

      <div
        className="
          bg-white
          rounded-xl
          shadow-md
          overflow-hidden
        "
      >

        <table
          className="w-full"
        >

          <thead>

            <tr
              className="
                bg-gray-100
              "
            >

              <th className="p-4">
                ID
              </th>

              <th className="p-4">
                Name
              </th>

              <th className="p-4">
                Email
              </th>

              <th className="p-4">
                Phone
              </th>

              <th className="p-4">
                Company
              </th>

              <th className="p-4">
                Industry
              </th>

              <th className="p-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredCustomers.map(
              (customer) => (

                <tr
                  key={
                    customer.id
                  }
                  className="
                    border-t
                  "
                >

                  <td className="p-4">
                    {customer.id}
                  </td>

                  <td className="p-4">
                    {customer.name}
                  </td>

                  <td className="p-4">
                    {customer.email}
                  </td>

                  <td className="p-4">
                    {customer.phone}
                  </td>

                  <td className="p-4">
                    {customer.company}
                  </td>

                  <td className="p-4">
                    {customer.industry}
                  </td>

                  <td className="p-4">

                    <button
                      onClick={() =>
                        setSelectedCustomer(
                          customer
                        )
                      }
                      className="
                        bg-blue-500
                        text-white
                        px-3
                        py-1
                        rounded-lg
                        mr-2
                      "
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        deleteCustomer(
                          customer.id
                        )
                      }
                      className="
                        bg-red-500
                        text-white
                        px-3
                        py-1
                        rounded-lg
                      "
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </Layout>

  );
}

export default Customers;