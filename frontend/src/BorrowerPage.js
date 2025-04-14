// import React, { useState } from "react";

// function BorrowerPage({ state, setMessage, borrowerAddress }) {
//   const [username, setUsername] = useState("");
//   const [loanAmount, setLoanAmount] = useState("");
//   const [selectedAction, setSelectedAction] = useState("requestLoan");
//   const [repayAmount, setRepayAmount] = useState("");

//   const handleRequestLoan = async () => {
//     if (state.contract && borrowerAddress) {
//       try {
//         const gasEstimate = await state.contract.methods
//           .requestLoan(state.web3.utils.toWei(loanAmount, "ether"))
//           .estimateGas({ from: borrowerAddress });

//         await state.contract.methods
//           .requestLoan(state.web3.utils.toWei(loanAmount, "ether"))
//           .send({ from: borrowerAddress, gas: gasEstimate });

//         setMessage(
//           `Loan of ${loanAmount} Ether requested for user: ${username}`
//         );
//         setLoanAmount("");
//       } catch (error) {
//         console.error("Error requesting loan:", error);
//         setMessage("Error requesting loan.");
//       }
//     } else {
//       setMessage("Borrower address not available.");
//     }
//   };

//   const handleRepayLoan = async (amount) => {
//     if (state.contract && borrowerAddress) {
//       try {
//         await state.contract.methods.repayLoan().send({
//           from: borrowerAddress,
//           value: state.web3.utils.toWei(amount, "ether"),
//         });
//         setMessage(`Loan of ${amount} Ether repaid by user: ${username}`);
//         setRepayAmount("");
//       } catch (error) {
//         console.error("Error repaying loan:", error);
//         setMessage("Error repaying loan.");
//       }
//     } else {
//       setMessage("Borrower address not available.");
//     }
//   };

//   const handleViewLoanStatus = async () => {
//     if (state.contract && borrowerAddress) {
//       try {
//         const loanDetails = await state.contract.methods
//           .getLoanDetails(borrowerAddress)
//           .call();
//         console.log("Loan Details:", loanDetails);
//         setMessage(`Loan details viewed in the console for user: ${username}`);
//       } catch (error) {
//         console.error("Error viewing loan status:", error);
//         setMessage("Error viewing loan status.");
//       }
//     } else {
//       setMessage("Borrower address not available.");
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const action = selectedAction;
//     const amount = event.target.elements.repayAmount?.value;

//     if (action === "requestLoan") {
//       handleRequestLoan();
//     } else if (action === "repayLoan" && amount) {
//       handleRepayLoan(amount);
//     } else if (action === "viewLoan") {
//       handleViewLoanStatus();
//     }
//   };

//   const handleActionChange = (event) => {
//     setSelectedAction(event.target.value);
//   };

//   return (
//     <div className="bg-gray-100 p-6 rounded-md shadow-md">
//       <h1 className="text-2xl font-semibold mb-4 text-blue-600">
//         Borrower Dashboard
//       </h1>
//       <div className="mb-4 p-4 bg-white rounded-md shadow-sm">
//         <label className="block text-gray-700 text-sm font-bold mb-2">
//           Username:
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </label>
//       </div>

//       <div className="bg-white rounded-md shadow-sm p-4">
//         <h2 className="text-lg font-semibold mb-2 text-gray-700">
//           Borrower Actions
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Select Action:
//               <select
//                 name="borrowerAction"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 value={selectedAction}
//                 onChange={handleActionChange}
//               >
//                 <option value="requestLoan">Request Loan</option>
//                 <option value="repayLoan">Repay Loan</option>
//                 <option value="viewLoan">View Loan Status</option>
//               </select>
//             </label>
//           </div>

//           {selectedAction === "requestLoan" && (
//             <div id="requestLoanInput">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Amount to Request (Ether):
//                 <input
//                   type="number"
//                   step="any"
//                   value={loanAmount}
//                   onChange={(e) => setLoanAmount(e.target.value)}
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 />
//               </label>
//             </div>
//           )}

//           {selectedAction === "repayLoan" && (
//             <div id="repayLoanInput">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Amount to Repay (Ether):
//                 <input
//                   type="number"
//                   step="any"
//                   name="repayAmount"
//                   value={repayAmount}
//                   onChange={(e) => setRepayAmount(e.target.value)}
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 />
//               </label>
//             </div>
//           )}

//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default BorrowerPage;







import React, { useState, useEffect } from "react";

function BorrowerPage({ state, setMessage, borrowerAddress }) {
  const [username, setUsername] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [selectedAction, setSelectedAction] = useState("requestLoan");
  const [repayAmount, setRepayAmount] = useState("");
  const [borrowerBalance, setBorrowerBalance] = useState("");

  useEffect(() => {
    async function fetchBorrowerBalance() {
      if (state.web3 && borrowerAddress) {
        try {
          const balanceWei = await state.web3.eth.getBalance(borrowerAddress);
          const balanceEth = state.web3.utils.fromWei(balanceWei, "ether");
          setBorrowerBalance(balanceEth);
        } catch (error) {
          console.error("Error fetching borrower balance:", error);
        }
      }
    }

    fetchBorrowerBalance();
  }, [state.web3, borrowerAddress]);

  const handleRequestLoan = async () => {
    if (state.contract && borrowerAddress) {
      try {
        const gasEstimate = await state.contract.methods
          .requestLoan(state.web3.utils.toWei(loanAmount, "ether"))
          .estimateGas({ from: borrowerAddress });

        await state.contract.methods
          .requestLoan(state.web3.utils.toWei(loanAmount, "ether"))
          .send({ from: borrowerAddress, gas: gasEstimate });

        setMessage(
          `Loan of ${loanAmount} Ether requested for user: ${username}`
        );
        setLoanAmount("");
      } catch (error) {
        console.error("Error requesting loan:", error);
        setMessage("Error requesting loan.");
      }
    } else {
      setMessage("Borrower address not available.");
    }
  };

  const handleRepayLoan = async (amount) => {
    if (state.contract && borrowerAddress) {
      try {
        await state.contract.methods.repayLoan().send({
          from: borrowerAddress,
          value: state.web3.utils.toWei(amount, "ether"),
        });
        setMessage(`Loan of ${amount} Ether repaid by user: ${username}`);
        setRepayAmount("");
      } catch (error) {
        console.error("Error repaying loan:", error);
        setMessage("Error repaying loan.");
      }
    } else {
      setMessage("Borrower address not available.");
    }
  };

  const handleViewLoanStatus = async () => {
    if (state.contract && borrowerAddress) {
      try {
        const loanDetails = await state.contract.methods
          .getLoanDetails(borrowerAddress)
          .call();
        console.log("Loan Details:", loanDetails);
        setMessage(`Loan details viewed in the console for user: ${username}`);
      } catch (error) {
        console.error("Error viewing loan status:", error);
        setMessage("Error viewing loan status.");
      }
    } else {
      setMessage("Borrower address not available.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const action = selectedAction;
    const amount = event.target.elements.repayAmount?.value;

    if (action === "requestLoan") {
      handleRequestLoan();
    } else if (action === "repayLoan" && amount) {
      handleRepayLoan(amount);
    } else if (action === "viewLoan") {
      handleViewLoanStatus();
    }
  };

  const handleActionChange = (event) => {
    setSelectedAction(event.target.value);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-4 text-blue-600">
        Borrower Dashboard
      </h1>
      <div className="mb-4 p-4 bg-white rounded-md shadow-sm">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">
          Borrower Information
        </h2>
        <p className="text-gray-600">
          Address: <span className="font-bold">{borrowerAddress}</span>
        </p>
        <p className="text-gray-600">
          Balance: <span className="font-bold">{borrowerBalance} Ether</span>
        </p>
      </div>

      <div className="mb-4 p-4 bg-white rounded-md shadow-sm">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
      </div>

      <div className="bg-white rounded-md shadow-sm p-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">
          Borrower Actions
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Action:
              <select
                name="borrowerAction"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={selectedAction}
                onChange={handleActionChange}
              >
                <option value="requestLoan">Request Loan</option>
                <option value="repayLoan">Repay Loan</option>
                <option value="viewLoan">View Loan Status</option>
              </select>
            </label>
          </div>

          {selectedAction === "requestLoan" && (
            <div id="requestLoanInput">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Amount to Request (Ether):
                <input
                  type="number"
                  step="any"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
          )}

          {selectedAction === "repayLoan" && (
            <div id="repayLoanInput">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Amount to Repay (Ether):
                <input
                  type="number"
                  step="any"
                  name="repayAmount"
                  value={repayAmount}
                  onChange={(e) => setRepayAmount(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default BorrowerPage;