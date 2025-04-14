// import React, { useState, useEffect } from "react";
// import Web3 from "web3";
// import LendingSystem from "./contracts/SimpleLendingContract.json";

// function LenderPage({ state, setMessage }) {
//   const [poolBalance, setPoolBalance] = useState(0);

//   useEffect(() => {
//     async function fetchPoolBalance() {
//       if (state.contract) {
//         try {
//           const balanceWei = await state.contract.methods
//             .getContractBalance()
//             .call();
//           const balanceEth = state.web3.utils.fromWei(balanceWei, "ether");
//           setPoolBalance(balanceEth);
//         } catch (error) {
//           console.error("Error fetching pool balance:", error);
//           setMessage("Error fetching pool balance");
//         }
//       }
//     }

//     fetchPoolBalance();
//   }, [state.contract, state.web3, setMessage]);

//   const handleAddFunds = async (amount) => {
//     if (state.contract && state.lenderAddress) {
//       try {
//         await state.contract.methods.addFunds().send({
//           from: state.lenderAddress,
//           value: state.web3.utils.toWei(amount, "ether"),
//         });
//         setMessage(`${amount} Ether added to the pool.`);
//         // Optionally, refetch the pool balance after adding funds
//         const balanceWei = await state.contract.methods
//           .getContractBalance()
//           .call();
//         const balanceEth = state.web3.utils.fromWei(balanceWei, "ether");
//         setPoolBalance(balanceEth);
//       } catch (error) {
//         console.error("Error adding funds:", error);
//         setMessage("Error adding funds.");
//       }
//     }
//   };

//   const handleFundLoan = async (borrowerAddress) => {
//     if (state.contract && state.lenderAddress) {
//       try {
//         await state.contract.methods
//           .fundLoan(borrowerAddress)
//           .send({ from: state.lenderAddress });
//         setMessage(`Loan funded for address: ${borrowerAddress}`);
//       } catch (error) {
//         console.error("Error funding loan:", error);
//         setMessage("Error funding loan.");
//       }
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const action = event.target.elements.lenderAction.value;
//     const amount = event.target.elements.addFundsAmount.value;
//     const fundBorrowerAddress = event.target.elements.fundBorrowerAddress.value;

//     if (action === "addFunds") {
//       handleAddFunds(amount);
//     } else if (action === "fundLoan") {
//       handleFundLoan(fundBorrowerAddress);
//     }
//   };

//   return (
//     <div>
//       <h1>Lender Dashboard</h1>
//       <div>
//         <h2>Pool Information</h2>
//         <p>Total Funds in Pool: {poolBalance} Ether</p>
//       </div>

//       <div>
//         <h2>Lender Actions</h2>
//         <form onSubmit={handleSubmit}>
//           <label>
//             Select Action:
//             <select name="lenderAction">
//               <option value="addFunds">Add Funds to Pool</option>
//               <option value="fundLoan">Fund Loan to Borrower</option>
//             </select>
//           </label>
//           <br />

//           {/* Input for adding funds */}
//           <div id="addFundsInput">
//             <label>
//               Amount to Add (Ether):
//               <input type="number" step="any" name="addFundsAmount" />
//             </label>
//             <br />
//           </div>

//           {/* Input for funding a specific borrower */}
//           <div id="fundLoanInput" style={{ display: "none" }}>
//             <label>
//               Borrower Address to Fund:
//               <input type="text" name="fundBorrowerAddress" />
//             </label>
//             <br />
//           </div>

//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default LenderPage;








import React, { useState, useEffect } from "react";
import Web3 from "web3";
import LendingSystem from "./contracts/SimpleLendingContract.json";

function LenderPage({ state, setMessage }) {
  const [poolBalance, setPoolBalance] = useState(0);
  const [selectedAction, setSelectedAction] = useState("addFunds");

  useEffect(() => {
    async function fetchPoolBalance() {
      if (state.contract) {
        try {
          const balanceWei = await state.contract.methods
            .getContractBalance()
            .call();
          const balanceEth = state.web3.utils.fromWei(balanceWei, "ether");
          setPoolBalance(balanceEth);
        } catch (error) {
          console.error("Error fetching pool balance:", error);
          setMessage("Error fetching pool balance");
        }
      }
    }

    fetchPoolBalance();
  }, [state.contract, state.web3, setMessage]);

  const handleAddFunds = async (amount) => {
    if (state.contract && state.lenderAddress) {
      try {
        await state.contract.methods.addFunds().send({
          from: state.lenderAddress,
          value: state.web3.utils.toWei(amount, "ether"),
        });
        setMessage(`${amount} Ether added to the pool.`);
        // Optionally, refetch the pool balance after adding funds
        const balanceWei = await state.contract.methods
          .getContractBalance()
          .call();
        const balanceEth = state.web3.utils.fromWei(balanceWei, "ether");
        setPoolBalance(balanceEth);
      } catch (error) {
        console.error("Error adding funds:", error);
        setMessage("Error adding funds.");
      }
    }
  };

  const handleFundLoan = async (borrowerAddress) => {
    if (state.contract && state.lenderAddress) {
      try {
        await state.contract.methods
          .fundLoan(borrowerAddress)
          .send({ from: state.lenderAddress });
        setMessage(`Loan funded for address: ${borrowerAddress}`);
      } catch (error) {
        console.error("Error funding loan:", error);
        setMessage("Error funding loan.");
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const action = selectedAction;
    const amount = event.target.elements.addFundsAmount?.value;
    const fundBorrowerAddress =
      event.target.elements.fundBorrowerAddress?.value;

    if (action === "addFunds" && amount) {
      handleAddFunds(amount);
    } else if (action === "fundLoan" && fundBorrowerAddress) {
      handleFundLoan(fundBorrowerAddress);
    }
  };

  const handleActionChange = (event) => {
    setSelectedAction(event.target.value);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-4 text-indigo-600">
        Lender Dashboard
      </h1>
      <div className="mb-4 p-4 bg-white rounded-md shadow-sm">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">
          Pool Information
        </h2>
        <p className="text-gray-600">
          Total Funds in Pool: <span className="font-bold">{poolBalance}</span>{" "}
          Ether
        </p>
      </div>

      <div className="bg-white rounded-md shadow-sm p-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">
          Lender Actions
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Action:
              <select
                name="lenderAction"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={selectedAction}
                onChange={handleActionChange}
              >
                <option value="addFunds">Add Funds to Pool</option>
                <option value="fundLoan">Fund Loan to Borrower</option>
              </select>
            </label>
          </div>

          {/* Input for adding funds */}
          {selectedAction === "addFunds" && (
            <div id="addFundsInput">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Amount to Add (Ether):
                <input
                  type="number"
                  step="any"
                  name="addFundsAmount"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
          )}

          {/* Input for funding a specific borrower */}
          {selectedAction === "fundLoan" && (
            <div id="fundLoanInput">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Borrower Address to Fund:
                <input
                  type="text"
                  name="fundBorrowerAddress"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
          )}

          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default LenderPage;