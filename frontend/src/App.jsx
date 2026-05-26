import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [emissions, setEmissions] = useState([]);

  const [file, setFile] = useState(null);


  useEffect(() => {

    fetchEmissions();

  }, []);


  const fetchEmissions = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/api/emissions/"
      );

      setEmissions(response.data);

    } catch (error) {

      console.log(error);

    }
  };


  const uploadCSV = async () => {

    if (!file) {

      alert("Please select a CSV file");

      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {

      await axios.post(
        "http://127.0.0.1:8000/api/upload-sap-csv/",
        formData
      );

      alert("CSV Uploaded Successfully");

      fetchEmissions();

    } catch (error) {

      console.log(error);

    }
  };


  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        Breathe ESG Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6 mb-10">

  <div className="bg-zinc-900 p-6 rounded-2xl">

    <h2 className="text-xl mb-2">
      Total Records
    </h2>

    <p className="text-4xl font-bold">
      {emissions.length}
    </p>

  </div>


  <div className="bg-red-900 p-6 rounded-2xl">

    <h2 className="text-xl mb-2">
      Suspicious
    </h2>

    <p className="text-4xl font-bold">

      {

        emissions.filter(
          item => item.is_suspicious
        ).length

      }

    </p>

  </div>


  <div className="bg-yellow-700 p-6 rounded-2xl">

    <h2 className="text-xl mb-2">
      Pending
    </h2>

    <p className="text-4xl font-bold">

      {

        emissions.filter(
          item => item.status === "PENDING"
        ).length

      }

    </p>

  </div>


  <div className="bg-green-700 p-6 rounded-2xl">

    <h2 className="text-xl mb-2">
      Approved
    </h2>

    <p className="text-4xl font-bold">

      {

        emissions.filter(
          item => item.status === "APPROVED"
        ).length

      }

    </p>

  </div>

</div>

      <div className="mb-10 bg-zinc-900 p-8 rounded-2xl border border-zinc-700">

        <h2 className="text-2xl font-bold mb-6">
          Upload SAP CSV File
        </h2>

        <label
          className="
            bg-zinc-800
            hover:bg-zinc-700
            px-6
            py-4
            rounded-xl
            cursor-pointer
            inline-block
            border
            border-zinc-600
          "
        >

          Choose CSV File

          <input

            type="file"

            accept=".csv"

            onChange={(e) => setFile(e.target.files[0])}

            className="hidden"
          />

        </label>


        {

          file && (

            <p className="mt-4 text-green-400">

              Selected File:
              {" "}
              {file.name}

            </p>

          )

        }


        <button

          onClick={uploadCSV}

          className="
            mt-6
            bg-green-600
            hover:bg-green-500
            px-6
            py-3
            rounded-xl
            font-semibold
          "
        >

          Upload SAP CSV

        </button>

      </div>


      <div className="grid gap-6">

        {

          emissions.map((item) => (

            <div

              key={item.id}

              className="
                bg-zinc-900
                p-6
                rounded-2xl
                border
                border-zinc-700
              "
            >

              <h2 className="text-2xl font-semibold mb-3">

                {item.category}

              </h2>


              <p>

                Raw Value:
                {" "}
                {item.raw_value}
                {" "}
                {item.raw_unit}

              </p>


              <p>

                Normalized:
                {" "}
                {item.normalized_value}
                {" "}
                {item.normalized_unit}

              </p>


              <p>

                Status:
                {" "}
                {item.status}

              </p>

              <div className="flex gap-4 mt-4">

  <button

    onClick={async () => {

      await axios.post(

        `http://127.0.0.1:8000/api/update-status/${item.id}/`,

        {
          status: "APPROVED"
        }

      );

      fetchEmissions();

    }}

    className="
      bg-green-600
      hover:bg-green-500
      px-4
      py-2
      rounded-lg
    "
  >

    Approve

  </button>


  <button

    onClick={async () => {

      await axios.post(

        `http://127.0.0.1:8000/api/update-status/${item.id}/`,

        {
          status: "REJECTED"
        }

      );

      fetchEmissions();

    }}

    className="
      bg-red-600
      hover:bg-red-500
      px-4
      py-2
      rounded-lg
    "
  >

    Reject

  </button>

</div>


              <p>

                Suspicious:
                {" "}
                {item.is_suspicious ? "YES" : "NO"}

              </p>

              {

  item.is_suspicious && (

    <p className="text-red-400 mt-2">

      Reason:
      {" "}
      {item.suspicious_reason}

    </p>

  )

}

            </div>

          ))

        }

      </div>

    </div>

  );
}

export default App;