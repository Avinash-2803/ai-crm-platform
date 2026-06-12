import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response =
        await api.post(
          "login/",
          {
            username,
            password,
          }
        );

      localStorage.setItem(
        "access",
        response.data.access
      );

      const profileResponse =
        await api.get(
          "profile/",
          {
            headers: {
              Authorization:
                `Bearer ${response.data.access}`,
            },
          }
        );

      const role =
        profileResponse.data.role;

      localStorage.setItem(
        "role",
        role
      );

      if (role === "ADMIN") {

        navigate("/admin");

      } else if (
        role === "AGENT"
      ) {

        navigate("/agent");

      } else {

        navigate("/customer");

      }

    } catch (error) {

      console.log(error);

      if (error.response) {

        alert(
          error.response.data.detail ||
          "Invalid credentials"
        );

      } else {

        alert(
          "Unable to connect to backend"
        );

      }

    } finally {

      setLoading(false);

    }

  };

  return (

    <div
      className="
        min-h-screen
        flex
      "
    >

      <div
        className="
          hidden
          lg:flex
          lg:w-1/2
          bg-gradient-to-br
          from-blue-700
          to-indigo-900
          text-white
          flex-col
          justify-center
          px-16
        "
      >

        <h1
          className="
            text-5xl
            font-bold
            mb-6
          "
        >
          AI CRM Platform
        </h1>

        <p
          className="
            text-xl
            text-blue-100
            mb-8
          "
        >
          Enterprise-grade
          Customer Relationship
          Management powered by
          AI, Analytics,
          Automation and
          Real-time Support.
        </p>

        <div
          className="
            space-y-4
          "
        >

          <div>
            ✓ AI Ticket
            Classification
          </div>

          <div>
            ✓ Agent Workload
            Management
          </div>

          <div>
            ✓ Analytics Dashboard
          </div>

          <div>
            ✓ Role Based Access
            Control
          </div>

          <div>
            ✓ Redis + Celery +
            Docker
          </div>

        </div>

      </div>

      <div
        className="
          w-full
          lg:w-1/2
          flex
          items-center
          justify-center
          bg-gray-100
          p-8
        "
      >

        <div
          className="
            bg-white
            shadow-xl
            rounded-2xl
            p-10
            w-full
            max-w-md
          "
        >

          <div
            className="
              text-center
              mb-8
            "
          >

            <h2
              className="
                text-3xl
                font-bold
                text-gray-800
              "
            >
              Welcome Back
            </h2>

            <p
              className="
                text-gray-500
                mt-2
              "
            >
              Sign in to continue
            </p>

          </div>

          <form
            onSubmit={
              handleLogin
            }
            className="
              space-y-5
            "
          >

            <div>

              <label
                className="
                  block
                  text-sm
                  font-medium
                  mb-2
                "
              >
                Username
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(
                    e.target.value
                  )
                }
                placeholder="Enter username"
                className="
                  w-full
                  border
                  rounded-lg
                  p-3
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
                required
              />

            </div>

            <div>

              <label
                className="
                  block
                  text-sm
                  font-medium
                  mb-2
                "
              >
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                placeholder="Enter password"
                className="
                  w-full
                  border
                  rounded-lg
                  p-3
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
                required
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-blue-600
                hover:bg-blue-700
                text-white
                p-3
                rounded-lg
                font-semibold
                transition
              "
            >

              {
                loading
                  ? "Signing In..."
                  : "Login"
              }

            </button>

          </form>

          <div
            className="
              mt-8
              text-center
              text-sm
              text-gray-500
            "
          >

            AI CRM Platform © 2026

          </div>

        </div>

      </div>

    </div>

  );

}

export default Login;