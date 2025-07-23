// import React, { useState } from 'react';
// import { Upload, Check, CreditCard, Building, Phone } from 'lucide-react';
// import FloatingWhatsAppButton from '../../FloatingWhatsAppButton';

// const UserPaymentPortal = () => {
//   const [selectedPlan, setSelectedPlan] = useState('');
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState('');
//   const [copiedText, setCopiedText] = useState('');
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     transactionId: ''
//   });

//   const subscriptionPlans = [
//     { id: 'weekly', name: 'Weekly Plan', price: 'PKR 500', duration: '1 Week' },
//     { id: 'monthly', name: 'Monthly Plan', price: 'PKR 2,999', duration: '1 Month' },
//     { id: 'yearly', name: 'Yearly Plan', price: 'PKR 29,999', duration: '12 Months' }
//   ];

//   const bankAccounts = [
//     {
//       id: 'hbl',
//       bankName: 'HBL (Habib Bank Limited)',
//       accountTitle: 'Your Company Name',
//       accountNumber: '12345678901234',
//       iban: 'PK36HABB0012345678901234',
//       branchCode: '1234'
//     },
//     {
//       id: 'ubl',
//       bankName: 'UBL (United Bank Limited)',
//       accountTitle: 'Your Company Name',
//       accountNumber: '98765432109876',
//       iban: 'PK91UNIL0987654321098765',
//       branchCode: '9876'
//     },
//     {
//       id: 'mcb',
//       bankName: 'MCB (Muslim Commercial Bank)',
//       accountTitle: 'Your Company Name',
//       accountNumber: '11223344556677',
//       iban: 'PK70MUCB1122334455667788',
//       branchCode: '5566'
//     }
//   ];

//   const jazzcashEasypaisa = {
//     jazzcash: {
//       name: 'JazzCash',
//       number: '03XX-XXXXXXX',
//       accountTitle: 'Your Company Name'
//     },
//     easypaisa: {
//       name: 'Easypaisa',
//       number: '03XX-XXXXXXX',
//       accountTitle: 'Your Company Name'
//     }
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setUploadedFile(file);
//     }
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     setCopiedText(text);
//     setTimeout(() => setCopiedText(''), 2000); // Show "Copied" for 2 seconds
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert('Payment submission successful! You will receive confirmation within 24 hours.');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-6xl mx-auto space-y-8">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold  text-[#69363f] mb-2">Choose Your Subscription Plan</h1>
//           <p className="text-gray-600">Select a plan and make payment to get started</p>
//         </div>

//         {/* Subscription Plans */}
//         <div className="grid md:grid-cols-3 gap-6">
//           {subscriptionPlans.map((plan) => (
//             <div
//               key={plan.id}
//               className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
//                 selectedPlan === plan.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
//               }`}
//               onClick={() => setSelectedPlan(plan.id)}
//             >
//               <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
//               <p className="text-3xl font-bold text-blue-600 mb-2">{plan.price}</p>
//               <p className="text-gray-600">{plan.duration}</p>
//               {selectedPlan === plan.id && <Check className="w-6 h-6 text-blue-500 mt-2" />}
//             </div>
//           ))}
//         </div>

//         {selectedPlan && (
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-2xl font-semibold mb-6 flex items-center">
//               <CreditCard className="w-6 h-6 mr-2" />
//               Payment Methods
//             </h2>

//             {/* Bank Transfer Section */}
//             <div className="mb-8">
//               <h3 className="text-lg font-medium mb-4 flex items-center">
//                 <Building className="w-5 h-5 mr-2" />
//                 Bank Transfer Details
//               </h3>
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {bankAccounts.map((bank) => (
//                   <div key={bank.id} className="border rounded-lg p-4 bg-gray-50">
//                     <h4 className="font-semibold text-blue-600 mb-3">{bank.bankName}</h4>
//                     <div className="space-y-2 text-sm">
//                       <div>
//                         <span className="font-medium">Account Title:</span>
//                         <p className="text-gray-700">{bank.accountTitle}</p>
//                       </div>
//                       <div>
//                         <span className="font-medium">Account Number:</span>
//                         <div className="flex items-center justify-between">
//                           <p className="text-gray-700 font-mono">{bank.accountNumber}</p>
//                           <button
//                             onClick={() => copyToClipboard(bank.accountNumber)}
//                             className="text-blue-500 hover:text-blue-700 text-sm"
//                           >
//                             {copiedText === bank.accountNumber ? 'Copied' : 'Copy'}
//                           </button>
//                         </div>
//                       </div>
//                       <div>
//                         <span className="font-medium">IBAN:</span>
//                         <div className="flex items-center justify-between">
//                           <p className="text-gray-700 font-mono text-xs">{bank.iban}</p>
//                           <button
//                             onClick={() => copyToClipboard(bank.iban)}
//                             className="text-blue-500 hover:text-blue-700 text-sm"
//                           >
//                             {copiedText === bank.iban ? 'Copied' : 'Copy'}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Mobile Wallet Section */}
//             <div className="mb-8">
//               <h3 className="text-lg font-medium mb-4 flex items-center">
//                 <Phone className="w-5 h-5 mr-2" />
//                 Mobile Wallet Details
//               </h3>
//               <div className="grid md:grid-cols-2 gap-4">
//                 {['jazzcash', 'easypaisa'].map((key) => (
//                   <div key={key} className={`border rounded-lg p-4 ${key === 'jazzcash' ? 'bg-orange-50' : 'bg-green-50'}`}>
//                     <h4 className={`font-semibold ${key === 'jazzcash' ? 'text-orange-600' : 'text-green-600'} mb-3`}>
//                       {jazzcashEasypaisa[key].name}
//                     </h4>
//                     <div className="space-y-2 text-sm">
//                       <div>
//                         <span className="font-medium">Account Title:</span>
//                         <p className="text-gray-700">{jazzcashEasypaisa[key].accountTitle}</p>
//                       </div>
//                       <div>
//                         <span className="font-medium">Mobile Number:</span>
//                         <div className="flex items-center justify-between">
//                           <p className="text-gray-700 font-mono">{jazzcashEasypaisa[key].number}</p>
//                           <button
//                             onClick={() => copyToClipboard(jazzcashEasypaisa[key].number)}
//                             className={`text-sm ${key === 'jazzcash' ? 'text-orange-500 hover:text-orange-700' : 'text-green-500 hover:text-green-700'}`}
//                           >
//                             {copiedText === jazzcashEasypaisa[key].number ? 'Copied' : 'Copy'}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Payment Submission Form */}
//             <div className="bg-gray-50 rounded-lg p-6">
//               <h3 className="text-lg font-semibold mb-4">Submit Payment Details</h3>
//               <form onSubmit={handleSubmit}>
//                 <div className="grid md:grid-cols-2 gap-4 mb-4">
//                   <input
//                     type="text"
//                     required
//                     placeholder="Full Name"
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     className="w-full p-3 border rounded-md"
//                   />
//                   <input
//                     type="email"
//                     required
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     className="w-full p-3 border rounded-md"
//                   />
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-4 mb-4">
//                   <input
//                     type="tel"
//                     required
//                     placeholder="Phone Number"
//                     value={formData.phone}
//                     onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                     className="w-full p-3 border rounded-md"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Transaction ID (if available)"
//                     value={formData.transactionId}
//                     onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
//                     className="w-full p-3 border rounded-md"
//                   />
//                 </div>

//                 <select
//                   required
//                   value={paymentMethod}
//                   onChange={(e) => setPaymentMethod(e.target.value)}
//                   className="w-full p-3 border rounded-md mb-4"
//                 >
//                   <option value="">Select Payment Method</option>
//                   <option value="hbl">HBL Bank Transfer</option>
//                   <option value="ubl">UBL Bank Transfer</option>
//                   <option value="mcb">MCB Bank Transfer</option>
//                   <option value="jazzcash">JazzCash</option>
//                   <option value="easypaisa">Easypaisa</option>
//                 </select>

//                 <div className="mb-6">
//                   <label htmlFor="receipt-upload" className="block mb-2 font-medium">Upload Payment Receipt *</label>
//                   <div className="border-2 border-dashed p-6 text-center rounded-md hover:border-gray-400">
//                     <input
//                       type="file"
//                       accept="image/*,.pdf"
//                       id="receipt-upload"
//                       required
//                       onChange={handleFileUpload}
//                       className="hidden"
//                     />
//                     <label htmlFor="receipt-upload" className="cursor-pointer">
//                       <Upload className="w-10 h-10 mx-auto mb-2 text-gray-400" />
//                       <p>{uploadedFile ? uploadedFile.name : 'Click to upload receipt'}</p>
//                       <p className="text-sm text-gray-500">JPG, PNG, PDF (max 5MB)</p>
//                     </label>
//                   </div>
//                 </div>

//                 <button type="submit" className="w-full py-3 rounded-md bg-[#854951] hover:bg-[#a7515c] text-white">
//                   Submit Payment for Verification
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Add this at the very end */}
//       <FloatingWhatsAppButton />
//     </div>
//   );
// };

// export default UserPaymentPortal;

// import React, { useState } from "react";
// import { Upload, Check, CreditCard, Building, Phone, Info } from "lucide-react";
// import FloatingWhatsAppButton from "../../FloatingWhatsAppButton";

// const UserPaymentPortal = () => {
//   const [selectedPlan, setSelectedPlan] = useState("");
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [copiedText, setCopiedText] = useState("");
//   const [showInstructions, setShowInstructions] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     transactionId: "",
//   });

//   const subscriptionPlans = [
//     { id: "weekly", name: "Weekly Plan", price: "PKR 500", duration: "1 Week" },
//     {
//       id: "monthly",
//       name: "Monthly Plan",
//       price: "PKR 2,999",
//       duration: "1 Month",
//     },
//     {
//       id: "yearly",
//       name: "Yearly Plan",
//       price: "PKR 29,999",
//       duration: "12 Months",
//     },
//   ];

//   const bankAccounts = [
//     {
//       id: "hbl",
//       bankName: "HBL (Habib Bank Limited)",
//       accountTitle: "Your Company Name",
//       accountNumber: "12345678901234",
//       iban: "PK36HABB0012345678901234",
//       branchCode: "1234",
//     },
//     {
//       id: "ubl",
//       bankName: "UBL (United Bank Limited)",
//       accountTitle: "Your Company Name",
//       accountNumber: "98765432109876",
//       iban: "PK91UNIL0987654321098765",
//       branchCode: "9876",
//     },
//     {
//       id: "mcb",
//       bankName: "MCB (Muslim Commercial Bank)",
//       accountTitle: "Your Company Name",
//       accountNumber: "11223344556677",
//       iban: "PK70MUCB1122334455667788",
//       branchCode: "5566",
//     },
//   ];

//   const jazzcashEasypaisa = {
//     jazzcash: {
//       name: "JazzCash",
//       number: "03XX-XXXXXXX",
//       accountTitle: "Your Company Name",
//     },
//     easypaisa: {
//       name: "Easypaisa",
//       number: "03XX-XXXXXXX",
//       accountTitle: "Your Company Name",
//     },
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setUploadedFile(file);
//     }
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     setCopiedText(text);
//     setTimeout(() => setCopiedText(""), 2000);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(
//       "Payment submission successful! You will receive confirmation within 24 hours."
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6 relative">
//       <div className="max-w-6xl mx-auto space-y-8">
//         {/* Top Bar with Back Link and Instructions Button */}
//         <div className="flex justify-between items-center">
//           {/* Back to Dashboard Link */}
//           <a
//             href="/userdashboard" // change this if needed
//             className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#69363f] font-medium"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15 19l-7-7 7-7"
//               />
//             </svg>
//             Back to Dashboard
//           </a>

//           {/* Instructions Button */}
//           <button
//             onClick={() => setShowInstructions(true)}
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#854951] hover:bg-[#944953] text-white text-sm font-medium"
//           >
//             <Info className="w-4 h-4" />
//             How Payment Works
//           </button>
//         </div>

//         {/* Title */}
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-[#69363f] mb-2">
//             Choose Your Subscription Plan
//           </h1>
//           <p className="text-gray-600">
//             Select a plan and make payment to get started
//           </p>
//         </div>

//         {/* Subscription Plans */}
//         <div className="grid md:grid-cols-3 gap-6">
//           {subscriptionPlans.map((plan) => (
//             <div
//               key={plan.id}
//               className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
//                 selectedPlan === plan.id
//                   ? "border-blue-500 bg-blue-50"
//                   : "border-gray-200 hover:border-gray-300"
//               }`}
//               onClick={() => setSelectedPlan(plan.id)}
//             >
//               <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
//               <p className="text-3xl font-bold text-blue-600 mb-2">
//                 {plan.price}
//               </p>
//               <p className="text-gray-600">{plan.duration}</p>
//               {selectedPlan === plan.id && (
//                 <Check className="w-6 h-6 text-blue-500 mt-2" />
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Payment Info Section */}
//         {selectedPlan && (
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-2xl font-semibold mb-6 flex items-center">
//               <CreditCard className="w-6 h-6 mr-2" />
//               Payment Methods
//             </h2>

//             {/* Bank Transfer Section */}
//             <div className="mb-8">
//               <h3 className="text-lg font-medium mb-4 flex items-center">
//                 <Building className="w-5 h-5 mr-2" />
//                 Bank Transfer Details
//               </h3>
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {bankAccounts.map((bank) => (
//                   <div
//                     key={bank.id}
//                     className="border rounded-lg p-4 bg-gray-50"
//                   >
//                     <h4 className="font-semibold text-blue-600 mb-3">
//                       {bank.bankName}
//                     </h4>
//                     <div className="space-y-2 text-sm">
//                       <div>
//                         <span className="font-medium">Account Title:</span>
//                         <p className="text-gray-700">{bank.accountTitle}</p>
//                       </div>
//                       <div>
//                         <span className="font-medium">Account Number:</span>
//                         <div className="flex items-center justify-between">
//                           <p className="text-gray-700 font-mono">
//                             {bank.accountNumber}
//                           </p>
//                           <button
//                             onClick={() => copyToClipboard(bank.accountNumber)}
//                             className="text-blue-500 hover:text-blue-700 text-sm"
//                           >
//                             {copiedText === bank.accountNumber
//                               ? "Copied"
//                               : "Copy"}
//                           </button>
//                         </div>
//                       </div>
//                       <div>
//                         <span className="font-medium">IBAN:</span>
//                         <div className="flex items-center justify-between">
//                           <p className="text-gray-700 font-mono text-xs">
//                             {bank.iban}
//                           </p>
//                           <button
//                             onClick={() => copyToClipboard(bank.iban)}
//                             className="text-blue-500 hover:text-blue-700 text-sm"
//                           >
//                             {copiedText === bank.iban ? "Copied" : "Copy"}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Mobile Wallet Section */}
//             <div className="mb-8">
//               <h3 className="text-lg font-medium mb-4 flex items-center">
//                 <Phone className="w-5 h-5 mr-2" />
//                 Mobile Wallet Details
//               </h3>
//               <div className="grid md:grid-cols-2 gap-4">
//                 {["jazzcash", "easypaisa"].map((key) => (
//                   <div
//                     key={key}
//                     className={`border rounded-lg p-4 ${
//                       key === "jazzcash" ? "bg-orange-50" : "bg-green-50"
//                     }`}
//                   >
//                     <h4
//                       className={`font-semibold ${
//                         key === "jazzcash"
//                           ? "text-orange-600"
//                           : "text-green-600"
//                       } mb-3`}
//                     >
//                       {jazzcashEasypaisa[key].name}
//                     </h4>
//                     <div className="space-y-2 text-sm">
//                       <div>
//                         <span className="font-medium">Account Title:</span>
//                         <p className="text-gray-700">
//                           {jazzcashEasypaisa[key].accountTitle}
//                         </p>
//                       </div>
//                       <div>
//                         <span className="font-medium">Mobile Number:</span>
//                         <div className="flex items-center justify-between">
//                           <p className="text-gray-700 font-mono">
//                             {jazzcashEasypaisa[key].number}
//                           </p>
//                           <button
//                             onClick={() =>
//                               copyToClipboard(jazzcashEasypaisa[key].number)
//                             }
//                             className={`text-sm ${
//                               key === "jazzcash"
//                                 ? "text-orange-500 hover:text-orange-700"
//                                 : "text-green-500 hover:text-green-700"
//                             }`}
//                           >
//                             {copiedText === jazzcashEasypaisa[key].number
//                               ? "Copied"
//                               : "Copy"}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Payment Submission Form */}
//             <div className="bg-gray-50 rounded-lg p-6">
//               <h3 className="text-lg font-semibold mb-4">
//                 Submit Payment Details
//               </h3>
//               <form onSubmit={handleSubmit}>
//                 <div className="grid md:grid-cols-2 gap-4 mb-4">
//                   <input
//                     type="text"
//                     required
//                     placeholder="Full Name"
//                     value={formData.name}
//                     onChange={(e) =>
//                       setFormData({ ...formData, name: e.target.value })
//                     }
//                     className="w-full p-3 border rounded-md"
//                   />
//                   <input
//                     type="email"
//                     required
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={(e) =>
//                       setFormData({ ...formData, email: e.target.value })
//                     }
//                     className="w-full p-3 border rounded-md"
//                   />
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-4 mb-4">
//                   <input
//                     type="tel"
//                     required
//                     placeholder="Phone Number"
//                     value={formData.phone}
//                     onChange={(e) =>
//                       setFormData({ ...formData, phone: e.target.value })
//                     }
//                     className="w-full p-3 border rounded-md"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Transaction ID (if available)"
//                     value={formData.transactionId}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         transactionId: e.target.value,
//                       })
//                     }
//                     className="w-full p-3 border rounded-md"
//                   />
//                 </div>

//                 <select
//                   required
//                   value={paymentMethod}
//                   onChange={(e) => setPaymentMethod(e.target.value)}
//                   className="w-full p-3 border rounded-md mb-4"
//                 >
//                   <option value="">Select Payment Method</option>
//                   <option value="hbl">HBL Bank Transfer</option>
//                   <option value="ubl">UBL Bank Transfer</option>
//                   <option value="mcb">MCB Bank Transfer</option>
//                   <option value="jazzcash">JazzCash</option>
//                   <option value="easypaisa">Easypaisa</option>
//                 </select>

//                 <div className="mb-6">
//                   <label
//                     htmlFor="receipt-upload"
//                     className="block mb-2 font-medium"
//                   >
//                     Upload Payment Receipt *
//                   </label>
//                   <div className="border-2 border-dashed p-6 text-center rounded-md hover:border-gray-400">
//                     <input
//                       type="file"
//                       accept="image/*,.pdf"
//                       id="receipt-upload"
//                       required
//                       onChange={handleFileUpload}
//                       className="hidden"
//                     />
//                     <label htmlFor="receipt-upload" className="cursor-pointer">
//                       <Upload className="w-10 h-10 mx-auto mb-2 text-gray-400" />
//                       <p>
//                         {uploadedFile
//                           ? uploadedFile.name
//                           : "Click to upload receipt"}
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         JPG, PNG, PDF (max 5MB)
//                       </p>
//                     </label>
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full py-3 rounded-md bg-[#854951] hover:bg-[#944953] text-white"
//                 >
//                   Submit Payment for Verification
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Responsive Instruction Popup */}
//       {showInstructions && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md md:max-w-lg relative overflow-y-auto max-h-[90vh]">
//             <button
//               onClick={() => setShowInstructions(false)}
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
//               aria-label="Close Instructions"
//             >
//               ×
//             </button>
//             <h2 className="text-lg md:text-xl font-semibold mb-4 text-center text-[#69363f]">
//               How to Complete Your Payment
//             </h2>
//             <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
//               <li>Select a subscription plan.</li>
//               <li>Choose a payment method (Bank or Mobile Wallet).</li>
//               <li>Transfer the required amount using the given details.</li>
//               <li>Save your payment receipt (screenshot or PDF).</li>
//               <li>Enter your personal information and transaction details.</li>
//               <li>Upload the payment receipt.</li>
//               <li>Click “Submit” to send for verification.</li>
//             </ol>
//             <p className="mt-4 text-sm text-gray-500 text-center">
//               You will receive confirmation within 24 hours.
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Floating WhatsApp */}
//       <FloatingWhatsAppButton />
//     </div>
//   );
// };

// export default UserPaymentPortal;

// import React, { useState } from "react";
// import {
//   Upload,
//   Check,
//   CreditCard,
//   Building,
//   Phone,
//   Info,
// } from "lucide-react";
// import FloatingWhatsAppButton from "../../FloatingWhatsAppButton";

// const UserPaymentPortal = () => {
//   const [selectedPlan, setSelectedPlan] = useState("");
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [copiedText, setCopiedText] = useState("");
//   const [showInstructions, setShowInstructions] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     transactionId: "",
//   });

//   const subscriptionPlans = [
//     { id: "weekly", name: "Weekly Plan", price: "PKR 350", duration: "1 Week" },
//     { id: "monthly", name: "Monthly Plan", price: "PKR 999", duration: "1 Month" },
//     { id: "yearly", name: "Yearly Plan", price: "PKR 8,999", duration: "12 Months" },
//   ];

//   const bankAccounts = [
//     {
//       id: "hbl",
//       bankName: "HBL (Habib Bank Limited)",
//       accountTitle: "Your Company Name",
//       accountNumber: "12345678901234",
//       iban: "PK36HABB0012345678901234",
//       branchCode: "1234",
//     },
//     {
//       id: "ubl",
//       bankName: "UBL (United Bank Limited)",
//       accountTitle: "Your Company Name",
//       accountNumber: "98765432109876",
//       iban: "PK91UNIL0987654321098765",
//       branchCode: "9876",
//     },
//     {
//       id: "mcb",
//       bankName: "MCB (Muslim Commercial Bank)",
//       accountTitle: "Your Company Name",
//       accountNumber: "11223344556677",
//       iban: "PK70MUCB1122334455667788",
//       branchCode: "5566",
//     },
//   ];

//   const jazzcashEasypaisa = {
//     jazzcash: { name: "JazzCash", number: "03XX-XXXXXXX", accountTitle: "Your Company Name" },
//     easypaisa: { name: "Easypaisa", number: "03XX-XXXXXXX", accountTitle: "Your Company Name" },
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setUploadedFile(file);
//     }
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     setCopiedText(text);
//     setTimeout(() => setCopiedText(""), 2000);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Payment submission successful! You will receive confirmation within 24 hours.");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 text-white relative font-orbitron">
//       <div className="max-w-6xl mx-auto space-y-8">
//         <div className="flex justify-between items-center">
//           <a href="/userdashboard" className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-[#00ffcc] font-medium">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//             Back to Dashboard
//           </a>
//           <button onClick={() => setShowInstructions(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#854951] hover:bg-[#944953] text-white text-sm font-bold">
//             <Info className="w-4 h-4" />
//             How Payment Works
//           </button>
//         </div>

//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-[#00ffcc] mb-2">Choose Your Subscription Plan</h1>
//           <p className="text-gray-300">Select a plan and make payment to get started</p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6">
//           {subscriptionPlans.map((plan) => (
//             <div key={plan.id} onClick={() => setSelectedPlan(plan.id)} className={`border-2 rounded-lg p-6 cursor-pointer transition-all shadow-lg hover:shadow-[#00ffcc] ${selectedPlan === plan.id ? "border-[#00ffcc] bg-[#112d32]" : "border-gray-600 bg-[#1e1e2f] hover:border-[#00ffcc]"}`}>
//               <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
//               <p className="text-3xl font-bold text-[#00ffcc] mb-2">{plan.price}</p>
//               <p className="text-gray-300">{plan.duration}</p>
//               {selectedPlan === plan.id && <Check className="w-6 h-6 text-[#00ffcc] mt-2" />}
//             </div>
//           ))}
//         </div>

//         {selectedPlan && (
//           <div className="bg-[#1e1e2f] rounded-lg shadow-md p-6 border border-[#00ffcc]">
//             <h2 className="text-2xl font-semibold mb-6 flex items-center">
//               <CreditCard className="w-6 h-6 mr-2" /> Payment Methods
//             </h2>

//             <div className="mb-8">
//               <h3 className="text-lg font-medium mb-4 flex items-center">
//                 <Building className="w-5 h-5 mr-2" /> Bank Transfer Details
//               </h3>
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {bankAccounts.map((bank) => (
//                   <div key={bank.id} className="border rounded-lg p-4 bg-[#2a2a3b]">
//                     <h4 className="font-semibold text-[#00ffcc] mb-3">{bank.bankName}</h4>
//                     <div className="space-y-2 text-sm">
//                       <div>
//                         <span className="font-medium">Account Title:</span>
//                         <p className="text-gray-300">{bank.accountTitle}</p>
//                       </div>
//                       <div>
//                         <span className="font-medium">Account Number:</span>
//                         <div className="flex items-center justify-between">
//                           <p className="text-gray-300 font-mono">{bank.accountNumber}</p>
//                           <button onClick={() => copyToClipboard(bank.accountNumber)} className="text-[#00ffcc] hover:text-white text-sm">
//                             {copiedText === bank.accountNumber ? "Copied" : "Copy"}
//                           </button>
//                         </div>
//                       </div>
//                       <div>
//                         <span className="font-medium">IBAN:</span>
//                         <div className="flex items-center justify-between">
//                           <p className="text-gray-300 font-mono text-xs">{bank.iban}</p>
//                           <button onClick={() => copyToClipboard(bank.iban)} className="text-[#00ffcc] hover:text-white text-sm">
//                             {copiedText === bank.iban ? "Copied" : "Copy"}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="mb-8">
//               <h3 className="text-lg font-medium mb-4 flex items-center">
//                 <Phone className="w-5 h-5 mr-2" /> Mobile Wallet Details
//               </h3>
//               <div className="grid md:grid-cols-2 gap-4">
//                 {Object.keys(jazzcashEasypaisa).map((key) => (
//                   <div key={key} className={`border rounded-lg p-4 ${key === "jazzcash" ? "bg-[#331a00]" : "bg-[#003319]"}`}>
//                     <h4 className={`font-semibold ${key === "jazzcash" ? "text-orange-400" : "text-green-400"} mb-3`}>
//                       {jazzcashEasypaisa[key].name}
//                     </h4>
//                     <div className="space-y-2 text-sm">
//                       <div>
//                         <span className="font-medium">Account Title:</span>
//                         <p className="text-gray-300">{jazzcashEasypaisa[key].accountTitle}</p>
//                       </div>
//                       <div>
//                         <span className="font-medium">Mobile Number:</span>
//                         <div className="flex items-center justify-between">
//                           <p className="text-gray-300 font-mono">{jazzcashEasypaisa[key].number}</p>
//                           <button onClick={() => copyToClipboard(jazzcashEasypaisa[key].number)} className={`text-sm ${key === "jazzcash" ? "text-orange-400 hover:text-white" : "text-green-400 hover:text-white"}`}>
//                             {copiedText === jazzcashEasypaisa[key].number ? "Copied" : "Copy"}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="bg-[#2a2a3b] rounded-lg p-6">
//               <h3 className="text-lg font-semibold mb-4">Submit Payment Details</h3>
//               <form onSubmit={handleSubmit}>
//                 <div className="grid md:grid-cols-2 gap-4 mb-4">
//                   <input type="text" required placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-3 border rounded-md bg-[#1e1e2f] border-gray-600 focus:border-[#00ffcc] text-white" />
//                   <input type="email" required placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full p-3 border rounded-md bg-[#1e1e2f] border-gray-600 focus:border-[#00ffcc] text-white" />
//                 </div>
//                 <div className="grid md:grid-cols-2 gap-4 mb-4">
//                   <input type="tel" required placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full p-3 border rounded-md bg-[#1e1e2f] border-gray-600 focus:border-[#00ffcc] text-white" />
//                   <input type="text" placeholder="Transaction ID (if available)" value={formData.transactionId} onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })} className="w-full p-3 border rounded-md bg-[#1e1e2f] border-gray-600 focus:border-[#00ffcc] text-white" />
//                 </div>
//                 <select required value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full p-3 border rounded-md mb-4 bg-[#1e1e2f] border-gray-600 focus:border-[#00ffcc] text-white">
//                   <option value="">Select Payment Method</option>
//                   <option value="hbl">HBL Bank Transfer</option>
//                   <option value="ubl">UBL Bank Transfer</option>
//                   <option value="mcb">MCB Bank Transfer</option>
//                   <option value="jazzcash">JazzCash</option>
//                   <option value="easypaisa">Easypaisa</option>
//                 </select>
//                 <div className="mb-6">
//                   <label htmlFor="receipt-upload" className="block mb-2 font-medium">Upload Payment Receipt *</label>
//                   <div className="border-2 border-dashed p-6 text-center rounded-md hover:border-gray-400">
//                     <input type="file" accept="image/*,.pdf" id="receipt-upload" required onChange={handleFileUpload} className="hidden" />
//                     <label htmlFor="receipt-upload" className="cursor-pointer">
//                       <Upload className="w-10 h-10 mx-auto mb-2 text-[#854951]" />
//                       <p>{uploadedFile ? uploadedFile.name : "Click to upload receipt"}</p>
//                       <p className="text-sm text-gray-400">JPG, PNG, PDF (max 5MB)</p>
//                     </label>
//                   </div>
//                 </div>
//                 <button type="submit" className="w-full py-3 rounded-md  text-white font-bold bg-[#854951] hover:bg-[#944953]">Submit Payment for Verification</button>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>

//       {showInstructions && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
//           <div className="bg-[#1e1e2f] p-6 rounded-lg shadow-2xl border border-[#00ffcc] text-white w-full max-w-md md:max-w-lg relative overflow-y-auto max-h-[90vh]">
//             <button onClick={() => setShowInstructions(false)} className="absolute top-2 right-2 text-gray-300 hover:text-white text-xl">×</button>
//             <h2 className="text-lg md:text-xl font-semibold mb-4 text-center text-[#00ffcc]">How to Complete Your Payment</h2>
//             <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
//               <li>Select a subscription plan.</li>
//               <li>Choose a payment method (Bank or Mobile Wallet).</li>
//               <li>Transfer the required amount using the given details.</li>
//               <li>Save your payment receipt (screenshot or PDF).</li>
//               <li>Enter your personal information and transaction details.</li>
//               <li>Upload the payment receipt.</li>
//               <li>Click “Submit” to send for verification.</li>
//             </ol>
//             <p className="mt-4 text-sm text-gray-500 text-center">You will receive confirmation within 24 hours.</p>
//           </div>
//         </div>
//       )}

//       <FloatingWhatsAppButton />
//     </div>
//   );
// };

// export default UserPaymentPortal;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Upload,
//   Check,
//   CreditCard,
//   Building,
//   Phone,
//   Info,
//   Loader2,
// } from "lucide-react";
// import {
//   submitPayment,
//   setSelectedPlan,
//   setUploadedFile,
//   setPaymentMethod,
//   setCopiedText,
//   setShowInstructions,
//   setFormData,
//   resetPaymentState,
//   clearPaymentState
// } from "../../../redux/features/paymentSlice";
// import FloatingWhatsAppButton from "../../FloatingWhatsAppButton";

// const UserPaymentPortal = () => {
//   const dispatch = useDispatch();
//   const {
//     loading,
//     error,
//     successMessage,
//     selectedPlan,
//     uploadedFile,
//     paymentMethod,
//     copiedText,
//     showInstructions,
//     formData
//   } = useSelector((state) => state.payment);

//   // Clear any previous state on component mount
//   useEffect(() => {
//     dispatch(resetPaymentState());
//     return () => {
//       dispatch(clearPaymentState());
//     };
//   }, [dispatch]);

//   const subscriptionPlans = [
//     { id: "weekly", name: "Weekly Plan", price: "PKR 350", duration: "1 Week" },
//     { id: "monthly", name: "Monthly Plan", price: "PKR 999", duration: "1 Month" },
//     { id: "yearly", name: "Yearly Plan", price: "PKR 8,999", duration: "12 Months" },
//   ];

//   const bankAccounts = [
//     {
//       id: "hbl",
//       bankName: "HBL (Habib Bank Limited)",
//       accountTitle: "Your Company Name",
//       accountNumber: "12345678901234",
//       iban: "PK36HABB0012345678901234",
//       branchCode: "1234",
//     },
//     {
//       id: "ubl",
//       bankName: "UBL (United Bank Limited)",
//       accountTitle: "Your Company Name",
//       accountNumber: "98765432109876",
//       iban: "PK91UNIL0987654321098765",
//       branchCode: "9876",
//     },
//     {
//       id: "mcb",
//       bankName: "MCB (Muslim Commercial Bank)",
//       accountTitle: "Your Company Name",
//       accountNumber: "11223344556677",
//       iban: "PK70MUCB1122334455667788",
//       branchCode: "5566",
//     },
//   ];

//   const jazzcashEasypaisa = {
//     jazzcash: { name: "JazzCash", number: "03XX-XXXXXXX", accountTitle: "Your Company Name" },
//     easypaisa: { name: "Easypaisa", number: "03XX-XXXXXXX", accountTitle: "Your Company Name" },
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       dispatch(setUploadedFile(file));
//     }
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     dispatch(setCopiedText(text));
//     setTimeout(() => dispatch(setCopiedText("")), 2000);
//   };

//   const handleFormChange = (field, value) => {
//     dispatch(setFormData({ ...formData, [field]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (!selectedPlan || !paymentMethod || !uploadedFile) {
//       alert("Please complete all required fields");
//       return;
//     }

//     // Create FormData for file upload
//     const submitData = new FormData();
//     submitData.append('name', formData.name);
//     submitData.append('email', formData.email);
//     submitData.append('phone', formData.phone);
//     submitData.append('transactionId', formData.transactionId);
//     submitData.append('selectedPlan', selectedPlan);
//     submitData.append('paymentMethod', paymentMethod);
//     submitData.append('receipt', uploadedFile);

//     try {
//       await dispatch(submitPayment(submitData)).unwrap();
//       // Success handled by Redux state
//     } catch (err) {
//       // Error handled by Redux state
//       console.error('Payment submission failed:', err);
//     }
//   };

//   // Show success message
//   useEffect(() => {
//     if (successMessage) {
//       alert(`${successMessage} You will receive confirmation within 24 hours.`);
//       dispatch(resetPaymentState());
//     }
//   }, [successMessage, dispatch]);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 text-white relative font-orbitron">
//       <div className="max-w-6xl mx-auto space-y-8">
//         <div className="flex justify-between items-center">
//           <a href="/userdashboard" className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-[#00ffcc] font-medium">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//             Back to Dashboard
//           </a>
//           <button
//             onClick={() => dispatch(setShowInstructions(true))}
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#854951] hover:bg-[#944953] text-white text-sm font-bold"
//           >
//             <Info className="w-4 h-4" />
//             How Payment Works
//           </button>
//         </div>

//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-[#00ffcc] mb-2">Choose Your Subscription Plan</h1>
//           <p className="text-gray-300">Select a plan and make payment to get started</p>
//         </div>

//         {/* Error Display */}
//         {error && (
//           <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-200">
//             <p className="font-medium">Error: {error}</p>
//           </div>
//         )}

//         <div className="grid md:grid-cols-3 gap-6">
//           {subscriptionPlans.map((plan) => (
//             <div
//               key={plan.id}
//               onClick={() => dispatch(setSelectedPlan(plan.id))}
//               className={`border-2 rounded-lg p-6 cursor-pointer transition-all shadow-lg hover:shadow-[#00ffcc] ${
//                 selectedPlan === plan.id ? "border-[#00ffcc] bg-[#112d32]" : "border-gray-600 bg-[#1e1e2f] hover:border-[#00ffcc]"
//               }`}
//             >
//               <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
//               <p className="text-3xl font-bold text-[#00ffcc] mb-2">{plan.price}</p>
//               <p className="text-gray-300">{plan.duration}</p>
//               {selectedPlan === plan.id && <Check className="w-6 h-6 text-[#00ffcc] mt-2" />}
//             </div>
//           ))}
//         </div>

//         {selectedPlan && (
//           <div className="bg-[#1e1e2f] rounded-lg shadow-md p-6 border border-[#00ffcc]">
//             <h2 className="text-2xl font-semibold mb-6 flex items-center">
//               <CreditCard className="w-6 h-6 mr-2" /> Payment Methods
//             </h2>

//             {/* Bank Transfer Section */}
//             <div className="mb-8">
//               <h3 className="text-lg font-medium mb-4 flex items-center">
//                 <Building className="w-5 h-5 mr-2" /> Bank Transfer Details
//               </h3>
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {bankAccounts.map((bank) => (
//                   <div key={bank.id} className="border rounded-lg p-4 bg-[#2a2a3b]">
//                     <h4 className="font-semibold text-[#00ffcc] mb-3">{bank.bankName}</h4>
//                     <div className="space-y-2 text-sm">
//                       <div>
//                         <span className="font-medium">Account Title:</span>
//                         <p className="text-gray-300">{bank.accountTitle}</p>
//                       </div>
//                       <div>
//                         <span className="font-medium">Account Number:</span>
//                         <div className="flex items-center justify-between">
//                           <p className="text-gray-300 font-mono">{bank.accountNumber}</p>
//                           <button
//                             onClick={() => copyToClipboard(bank.accountNumber)}
//                             className="text-[#00ffcc] hover:text-white text-sm"
//                           >
//                             {copiedText === bank.accountNumber ? "Copied" : "Copy"}
//                           </button>
//                         </div>
//                       </div>
//                       <div>
//                         <span className="font-medium">IBAN:</span>
//                         <div className="flex items-center justify-between">
//                           <p className="text-gray-300 font-mono text-xs">{bank.iban}</p>
//                           <button
//                             onClick={() => copyToClipboard(bank.iban)}
//                             className="text-[#00ffcc] hover:text-white text-sm"
//                           >
//                             {copiedText === bank.iban ? "Copied" : "Copy"}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Mobile Wallet Section */}
//             <div className="mb-8">
//               <h3 className="text-lg font-medium mb-4 flex items-center">
//                 <Phone className="w-5 h-5 mr-2" /> Mobile Wallet Details
//               </h3>
//               <div className="grid md:grid-cols-2 gap-4">
//                 {Object.keys(jazzcashEasypaisa).map((key) => (
//                   <div key={key} className={`border rounded-lg p-4 ${key === "jazzcash" ? "bg-[#331a00]" : "bg-[#003319]"}`}>
//                     <h4 className={`font-semibold ${key === "jazzcash" ? "text-orange-400" : "text-green-400"} mb-3`}>
//                       {jazzcashEasypaisa[key].name}
//                     </h4>
//                     <div className="space-y-2 text-sm">
//                       <div>
//                         <span className="font-medium">Account Title:</span>
//                         <p className="text-gray-300">{jazzcashEasypaisa[key].accountTitle}</p>
//                       </div>
//                       <div>
//                         <span className="font-medium">Mobile Number:</span>
//                         <div className="flex items-center justify-between">
//                           <p className="text-gray-300 font-mono">{jazzcashEasypaisa[key].number}</p>
//                           <button
//                             onClick={() => copyToClipboard(jazzcashEasypaisa[key].number)}
//                             className={`text-sm ${key === "jazzcash" ? "text-orange-400 hover:text-white" : "text-green-400 hover:text-white"}`}
//                           >
//                             {copiedText === jazzcashEasypaisa[key].number ? "Copied" : "Copy"}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Payment Form */}
//             <div className="bg-[#2a2a3b] rounded-lg p-6">
//               <h3 className="text-lg font-semibold mb-4">Submit Payment Details</h3>
//               <form onSubmit={handleSubmit}>
//                 <div className="grid md:grid-cols-2 gap-4 mb-4">
//                   <input
//                     type="text"
//                     required
//                     placeholder="Full Name"
//                     value={formData.name || ""}
//                     onChange={(e) => handleFormChange('name', e.target.value)}
//                     className="w-full p-3 border rounded-md bg-[#1e1e2f] border-gray-600 focus:border-[#00ffcc] text-white"
//                   />
//                   <input
//                     type="email"
//                     required
//                     placeholder="Email"
//                     value={formData.email || ""}
//                     onChange={(e) => handleFormChange('email', e.target.value)}
//                     className="w-full p-3 border rounded-md bg-[#1e1e2f] border-gray-600 focus:border-[#00ffcc] text-white"
//                   />
//                 </div>
//                 <div className="grid md:grid-cols-2 gap-4 mb-4">
//                   <input
//                     type="tel"
//                     required
//                     placeholder="Phone Number"
//                     value={formData.phone || ""}
//                     onChange={(e) => handleFormChange('phone', e.target.value)}
//                     className="w-full p-3 border rounded-md bg-[#1e1e2f] border-gray-600 focus:border-[#00ffcc] text-white"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Transaction ID (if available)"
//                     value={formData.transactionId || ""}
//                     onChange={(e) => handleFormChange('transactionId', e.target.value)}
//                     className="w-full p-3 border rounded-md bg-[#1e1e2f] border-gray-600 focus:border-[#00ffcc] text-white"
//                   />
//                 </div>
//                 <select
//                   required
//                   value={paymentMethod}
//                   onChange={(e) => dispatch(setPaymentMethod(e.target.value))}
//                   className="w-full p-3 border rounded-md mb-4 bg-[#1e1e2f] border-gray-600 focus:border-[#00ffcc] text-white"
//                 >
//                   <option value="">Select Payment Method</option>
//                   <option value="hbl">HBL Bank Transfer</option>
//                   <option value="ubl">UBL Bank Transfer</option>
//                   <option value="mcb">MCB Bank Transfer</option>
//                   <option value="jazzcash">JazzCash</option>
//                   <option value="easypaisa">Easypaisa</option>
//                 </select>

//                 {/* File Upload */}
//                 <div className="mb-6">
//                   <label htmlFor="receipt-upload" className="block mb-2 font-medium">Upload Payment Receipt *</label>
//                   <div className="border-2 border-dashed p-6 text-center rounded-md hover:border-gray-400">
//                     <input
//                       type="file"
//                       accept="image/*,.pdf"
//                       id="receipt-upload"
//                       required
//                       onChange={handleFileUpload}
//                       className="hidden"
//                     />
//                     <label htmlFor="receipt-upload" className="cursor-pointer">
//                       <Upload className="w-10 h-10 mx-auto mb-2 text-[#854951]" />
//                       <p>{uploadedFile ? uploadedFile.name : "Click to upload receipt"}</p>
//                       <p className="text-sm text-gray-400">JPG, PNG, PDF (max 5MB)</p>
//                     </label>
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full py-3 rounded-md text-white font-bold bg-[#854951] hover:bg-[#944953] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                 >
//                   {loading && <Loader2 className="w-4 h-4 animate-spin" />}
//                   {loading ? "Submitting..." : "Submit Payment for Verification"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Instructions Modal */}
//       {showInstructions && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
//           <div className="bg-[#1e1e2f] p-6 rounded-lg shadow-2xl border border-[#00ffcc] text-white w-full max-w-md md:max-w-lg relative overflow-y-auto max-h-[90vh]">
//             <button
//               onClick={() => dispatch(setShowInstructions(false))}
//               className="absolute top-2 right-2 text-gray-300 hover:text-white text-xl"
//             >
//               ×
//             </button>
//             <h2 className="text-lg md:text-xl font-semibold mb-4 text-center text-[#00ffcc]">How to Complete Your Payment</h2>
//             <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
//               <li>Select a subscription plan.</li>
//               <li>Choose a payment method (Bank or Mobile Wallet).</li>
//               <li>Transfer the required amount using the given details.</li>
//               <li>Save your payment receipt (screenshot or PDF).</li>
//               <li>Enter your personal information and transaction details.</li>
//               <li>Upload the payment receipt.</li>
//               <li>Click "Submit" to send for verification.</li>
//             </ol>
//             <p className="mt-4 text-sm text-gray-500 text-center">You will receive confirmation within 24 hours.</p>
//           </div>
//         </div>
//       )}

//       <FloatingWhatsAppButton />
//     </div>
//   );
// };

// export default UserPaymentPortal;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Upload,
//   Check,
//   CreditCard,
//   Building,
//   Phone,
//   Info,
//   Loader2,
// } from "lucide-react";
// import {
//   submitPayment,
//   setSelectedPlan,
//   setFileMetadata,
//   setPaymentMethod,
//   setCopiedText,
//   setShowInstructions,
//   setFormData,
//   resetPaymentState,
//   clearPaymentState
// } from "../../../redux/features/paymentSlice";
// import FloatingWhatsAppButton from "../../FloatingWhatsAppButton";

// const UserPaymentPortal = () => {
//   const dispatch = useDispatch();
//   const {
//     loading,
//     error,
//     successMessage,
//     selectedPlan,
//     fileMetadata,
//     paymentMethod,
//     copiedText,
//     showInstructions,
//     formData
//   } = useSelector((state) => state.payment);

//   // Keep file in component state to avoid Redux serialization issues
//   const [selectedFile, setSelectedFile] = useState(null);

//   // Clear any previous state on component mount
//   useEffect(() => {
//     dispatch(resetPaymentState());
//     setSelectedFile(null);
//     return () => {
//       dispatch(clearPaymentState());
//     };
//   }, [dispatch]);

//   const subscriptionPlans = [
//     { id: "weekly", name: "Weekly Plan", price: "PKR 350", duration: "1 Week" },
//     { id: "monthly", name: "Monthly Plan", price: "PKR 999", duration: "1 Month" },
//     { id: "yearly", name: "Yearly Plan", price: "PKR 8,999", duration: "12 Months" },
//   ];

//   const bankAccounts = [
//     {
//       id: "hbl",
//       bankName: "HBL (Habib Bank Limited)",
//       accountTitle: "Your Company Name",
//       accountNumber: "12345678901234",
//       iban: "PK36HABB0012345678901234",
//       branchCode: "1234",
//     },
//     {
//       id: "ubl",
//       bankName: "UBL (United Bank Limited)",
//       accountTitle: "Your Company Name",
//       accountNumber: "98765432109876",
//       iban: "PK91UNIL0987654321098765",
//       branchCode: "9876",
//     },
//     {
//       id: "mcb",
//       bankName: "MCB (Muslim Commercial Bank)",
//       accountTitle: "Your Company Name",
//       accountNumber: "11223344556677",
//       iban: "PK70MUCB1122334455667788",
//       branchCode: "5566",
//     },
//   ];

//   const jazzcashEasypaisa = {
//     jazzcash: { name: "JazzCash", number: "03XX-XXXXXXX", accountTitle: "Your Company Name" },
//     easypaisa: { name: "Easypaisa", number: "03XX-XXXXXXX", accountTitle: "Your Company Name" },
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       // Store only metadata in Redux
//       dispatch(setFileMetadata({
//         name: file.name,
//         size: file.size,
//         type: file.type
//       }));
//     }
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     dispatch(setCopiedText(text));
//     setTimeout(() => dispatch(setCopiedText("")), 2000);
//   };

//   const handleFormChange = (field, value) => {
//     dispatch(setFormData({ ...formData, [field]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (!selectedPlan || !paymentMethod || !selectedFile) {
//       alert("Please complete all required fields");
//       return;
//     }

//     // Create FormData for file upload with correct field name
//     const submitData = new FormData();
//     submitData.append('name', formData.name || '');
//     submitData.append('email', formData.email || '');
//     submitData.append('phone', formData.phone || '');
//     submitData.append('transactionId', formData.transactionId || '');
//     submitData.append('selectedPlan', JSON.stringify(selectedPlan));
//     submitData.append('paymentMethod', paymentMethod);
//     // Use 'paymentReceipt' as the field name - this matches what your server expects
//     submitData.append('paymentReceipt', selectedFile);

//     try {
//       await dispatch(submitPayment(submitData)).unwrap();
//       // Success handled by Redux state
//     } catch (err) {
//       // Error handled by Redux state
//       console.error('Payment submission failed:', err);
//     }
//   };

//   // Show success message
//   useEffect(() => {
//     if (successMessage) {
//       alert(`${successMessage} You will receive confirmation within 24 hours.`);
//       dispatch(resetPaymentState());
//       setSelectedFile(null);
//     }
//   }, [successMessage, dispatch]);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 text-white relative font-orbitron">
//       <div className="max-w-6xl mx-auto space-y-8">
//         <div className="flex justify-between items-center">
//           <a href="/userdashboard" className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-[#00ffcc] font-medium">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//             Back to Dashboard
//           </a>
//           <button
//             onClick={() => dispatch(setShowInstructions(true))}
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#854951] hover:bg-[#944953] text-white text-sm font-bold"
//           >
//             <Info className="w-4 h-4" />
//             How Payment Works
//           </button>
//         </div>

//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-[#00ffcc] mb-2">Choose Your Subscription Plan</h1>
//           <p className="text-gray-300">Select a plan and make payment to get started</p>
//         </div>

//         {/* Error Display */}
//         {error && (
//           <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-200">
//             <p className="font-medium">Error: {error}</p>
//           </div>
//         )}

//         <div className="grid md:grid-cols-3 gap-6">
//           {subscriptionPlans.map((plan) => (
//             <div
//               key={plan.id}
//               onClick={() => dispatch(setSelectedPlan(plan.id))}
//               className={`border-2 rounded-lg p-6 cursor-pointer transition-all shadow-lg hover:shadow-[#00ffcc] ${
//                 selectedPlan === plan.id ? "border-[#00ffcc] bg-[#112d32]" : "border-gray-600 bg-[#1e1e2f] hover:border-[#00ffcc]"
//               }`}
//             >
//               <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
//               <p className="text-3xl font-bold text-[#00ffcc] mb-2">{plan.price}</p>
//               <p className="text-gray-300">{plan.duration}</p>
//               {selectedPlan === plan.id && <Check className="w-6 h-6 text-[#00ffcc] mt-2" />}
//             </div>
//           ))}
//         </div>

//         {selectedPlan && (
//           <div className="bg-[#1e1e2f] rounded-lg shadow-md p-6 border border-[#00ffcc]">
//             <h2 className="text-2xl font-semibold mb-6 flex items-center">
//               <CreditCard className="w-6 h-6 mr-2" /> Payment Methods
//             </h2>

//             {/* Bank Transfer Section */}
//             <div className="mb-8">
//               <h3 className="text-lg font-medium mb-4 flex items-center">
//                 <Building className="w-5 h-5 mr-2" /> Bank Transfer Details
//               </h3>
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {bankAccounts.map((bank) => (
//                   <div key={bank.id} className="border rounded-lg p-4 bg-[#2a2a3b]">
//                     <h4 className="font-semibold text-[#00ffcc] mb-3">{bank.bankName}</h4>
//                     <div className="space-y-2 text-sm">
//                       <div>
//                         <span className="font-medium">Account Title:</span>
//                         <p className="text-gray-300">{bank.accountTitle}</p>
//                       </div>
//                       <div>
//                         <span className="font-medium">Account Number:</span>
//                         <div className="flex items-center justify-between">
//                           <p className="text-gray-300 font-mono">{bank.accountNumber}</p>
//                           <button
//                             onClick={() => copyToClipboard(bank.accountNumber)}
//                             className="text-[#00ffcc] hover:text-white text-sm"
//                           >
//                             {copiedText === bank.accountNumber ? "Copied" : "Copy"}
//                           </button>
//                         </div>
//                       </div>
//                       <div>
//                         <span className="font-medium">IBAN:</span>
//                         <div className="flex items-center justify-between">
//                           <p className="text-gray-300 font-mono text-xs">{bank.iban}</p>
//                           <button
//                             onClick={() => copyToClipboard(bank.iban)}
//                             className="text-[#00ffcc] hover:text-white text-sm"
//                           >
//                             {copiedText === bank.iban ? "Copied" : "Copy"}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Mobile Wallet Section */}
//             <div className="mb-8">
//               <h3 className="text-lg font-medium mb-4 flex items-center">
//                 <Phone className="w-5 h-5 mr-2" /> Mobile Wallet Details
//               </h3>
//               <div className="grid md:grid-cols-2 gap-4">
//                 {Object.keys(jazzcashEasypaisa).map((key) => (
//                   <div key={key} className={`border rounded-lg p-4 ${key === "jazzcash" ? "bg-[#331a00]" : "bg-[#003319]"}`}>
//                     <h4 className={`font-semibold ${key === "jazzcash" ? "text-orange-400" : "text-green-400"} mb-3`}>
//                       {jazzcashEasypaisa[key].name}
//                     </h4>
//                     <div className="space-y-2 text-sm">
//                       <div>
//                         <span className="font-medium">Account Title:</span>
//                         <p className="text-gray-300">{jazzcashEasypaisa[key].accountTitle}</p>
//                       </div>
//                       <div>
//                         <span className="font-medium">Mobile Number:</span>
//                         <div className="flex items-center justify-between">
//                           <p className="text-gray-300 font-mono">{jazzcashEasypaisa[key].number}</p>
//                           <button
//                             onClick={() => copyToClipboard(jazzcashEasypaisa[key].number)}
//                             className={`text-sm ${key === "jazzcash" ? "text-orange-400 hover:text-white" : "text-green-400 hover:text-white"}`}
//                           >
//                             {copiedText === jazzcashEasypaisa[key].number ? "Copied" : "Copy"}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Payment Form */}
//             <div className="bg-[#2a2a3b] rounded-lg p-6">
//               <h3 className="text-lg font-semibold mb-4">Submit Payment Details</h3>
//               <form onSubmit={handleSubmit}>
//                 <div className="grid md:grid-cols-2 gap-4 mb-4">
//                   <input
//                     type="text"
//                     required
//                     placeholder="Full Name"
//                     value={formData.name || ""}
//                     onChange={(e) => handleFormChange('name', e.target.value)}
//                     className="w-full p-3 border rounded-md bg-[#1e1e2f] border-gray-600 focus:border-[#00ffcc] text-white"
//                   />
//                   <input
//                     type="email"
//                     required
//                     placeholder="Email"
//                     value={formData.email || ""}
//                     onChange={(e) => handleFormChange('email', e.target.value)}
//                     className="w-full p-3 border rounded-md bg-[#1e1e2f] border-gray-600 focus:border-[#00ffcc] text-white"
//                   />
//                 </div>
//                 <div className="grid md:grid-cols-2 gap-4 mb-4">
//                   <input
//                     type="tel"
//                     required
//                     placeholder="Phone Number"
//                     value={formData.phone || ""}
//                     onChange={(e) => handleFormChange('phone', e.target.value)}
//                     className="w-full p-3 border rounded-md bg-[#1e1e2f] border-gray-600 focus:border-[#00ffcc] text-white"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Transaction ID (if available)"
//                     value={formData.transactionId || ""}
//                     onChange={(e) => handleFormChange('transactionId', e.target.value)}
//                     className="w-full p-3 border rounded-md bg-[#1e1e2f] border-gray-600 focus:border-[#00ffcc] text-white"
//                   />
//                 </div>
//                 <select
//                   required
//                   value={paymentMethod}
//                   onChange={(e) => dispatch(setPaymentMethod(e.target.value))}
//                   className="w-full p-3 border rounded-md mb-4 bg-[#1e1e2f] border-gray-600 focus:border-[#00ffcc] text-white"
//                 >
//                   <option value="">Select Payment Method</option>
//                   <option value="hbl">HBL Bank Transfer</option>
//                   <option value="ubl">UBL Bank Transfer</option>
//                   <option value="mcb">MCB Bank Transfer</option>
//                   <option value="jazzcash">JazzCash</option>
//                   <option value="easypaisa">Easypaisa</option>
//                 </select>

//                 {/* File Upload */}
//                 <div className="mb-6">
//                   <label htmlFor="receipt-upload" className="block mb-2 font-medium">Upload Payment Receipt *</label>
//                   <div className="border-2 border-dashed p-6 text-center rounded-md hover:border-gray-400">
//                     <input
//                       type="file"
//                       accept="image/*,.pdf"
//                       id="receipt-upload"
//                       name="paymentReceipt"
//                       required
//                       onChange={handleFileUpload}
//                       className="hidden"
//                     />
//                     <label htmlFor="receipt-upload" className="cursor-pointer">
//                       <Upload className="w-10 h-10 mx-auto mb-2 text-[#854951]" />
//                       <p>{fileMetadata.name || "Click to upload receipt"}</p>
//                       <p className="text-sm text-gray-400">JPG, PNG, PDF (max 5MB)</p>
//                     </label>
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full py-3 rounded-md text-white font-bold bg-[#854951] hover:bg-[#944953] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                 >
//                   {loading && <Loader2 className="w-4 h-4 animate-spin" />}
//                   {loading ? "Submitting..." : "Submit Payment for Verification"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Instructions Modal */}
//       {showInstructions && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
//           <div className="bg-[#1e1e2f] p-6 rounded-lg shadow-2xl border border-[#00ffcc] text-white w-full max-w-md md:max-w-lg relative overflow-y-auto max-h-[90vh]">
//             <button
//               onClick={() => dispatch(setShowInstructions(false))}
//               className="absolute top-2 right-2 text-gray-300 hover:text-white text-xl"
//             >
//               ×
//             </button>
//             <h2 className="text-lg md:text-xl font-semibold mb-4 text-center text-[#00ffcc]">How to Complete Your Payment</h2>
//             <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
//               <li>Select a subscription plan.</li>
//               <li>Choose a payment method (Bank or Mobile Wallet).</li>
//               <li>Transfer the required amount using the given details.</li>
//               <li>Save your payment receipt (screenshot or PDF).</li>
//               <li>Enter your personal information and transaction details.</li>
//               <li>Upload the payment receipt.</li>
//               <li>Click "Submit" to send for verification.</li>
//             </ol>
//             <p className="mt-4 text-sm text-gray-500 text-center">You will receive confirmation within 24 hours.</p>
//           </div>
//         </div>
//       )}

//       <FloatingWhatsAppButton />
//     </div>
//   );
// };

// export default UserPaymentPortal;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Upload,
//   Check,
//   CreditCard,
//   Building,
//   Phone,
//   Info,
//   Loader2,
// } from "lucide-react";
// import {
//   submitPayment,
//   setSelectedPlan,
//   setFileMetadata,
//   setPaymentMethod,
//   setCopiedText,
//   setShowInstructions,
//   setFormData,
//   resetPaymentState,
//   clearPaymentState,
// } from "../../../redux/features/paymentSlice";
// import FloatingWhatsAppButton from "../../FloatingWhatsAppButton";

// const UserPaymentPortal = () => {
//   const dispatch = useDispatch();
//   const {
//     loading,
//     error,
//     successMessage,
//     selectedPlan,
//     fileMetadata,
//     paymentMethod,
//     copiedText,
//     showInstructions,
//     formData,
//   } = useSelector((state) => state.payment);

//   // Keep file in component state to avoid Redux serialization issues
//   const [selectedFile, setSelectedFile] = useState(null);

//   const userData = JSON.parse(localStorage.getItem("user"));
//   const userId = userData?.UserId;

//   // Clear any previous state on component mount
//   useEffect(() => {
//     dispatch(resetPaymentState());
//     setSelectedFile(null);
//     return () => {
//       dispatch(clearPaymentState());
//     };
//   }, [dispatch]);

//   const subscriptionPlans = [
//     { id: "weekly", name: "Weekly Plan", price: "PKR 350", duration: "1 Week" },
//     {
//       id: "monthly",
//       name: "Monthly Plan",
//       price: "PKR 999",
//       duration: "1 Month",
//     },
//     {
//       id: "yearly",
//       name: "Yearly Plan",
//       price: "PKR 8,999",
//       duration: "12 Months",
//     },
//   ];

//   const bankAccounts = [
//     {
//       id: "hbl",
//       bankName: "HBL (Habib Bank Limited)",
//       accountTitle: "Your Company Name",
//       accountNumber: "12345678901234",
//       iban: "PK36HABB0012345678901234",
//       branchCode: "1234",
//     },
//     {
//       id: "ubl",
//       bankName: "UBL (United Bank Limited)",
//       accountTitle: "Your Company Name",
//       accountNumber: "98765432109876",
//       iban: "PK91UNIL0987654321098765",
//       branchCode: "9876",
//     },
//     {
//       id: "mcb",
//       bankName: "MCB (Muslim Commercial Bank)",
//       accountTitle: "Your Company Name",
//       accountNumber: "11223344556677",
//       iban: "PK70MUCB1122334455667788",
//       branchCode: "5566",
//     },
//   ];

//   const jazzcashEasypaisa = {
//     jazzcash: {
//       name: "JazzCash",
//       number: "03XX-XXXXXXX",
//       accountTitle: "Your Company Name",
//     },
//     easypaisa: {
//       name: "Easypaisa",
//       number: "03XX-XXXXXXX",
//       accountTitle: "Your Company Name",
//     },
//   };

//   // Validation functions
//   const validatePhoneNumber = (phone) => {
//     const pakistaniPhoneRegex = /^(\+92|0092|92|0)[0-9]{10}$/;
//     return pakistaniPhoneRegex.test(phone?.replace(/[\s-]/g, ""));
//   };

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Validate file size (5MB max)
//       if (file.size > 5242880) {
//         alert("File size cannot exceed 5MB");
//         return;
//       }

//       // Validate file type
//       const allowedTypes = [
//         "image/jpeg",
//         "image/png",
//         "image/jpg",
//         "application/pdf",
//       ];
//       if (!allowedTypes.includes(file.type)) {
//         alert("File type must be JPG, PNG, or PDF");
//         return;
//       }

//       setSelectedFile(file);
//       // Store only metadata in Redux
//       dispatch(
//         setFileMetadata({
//           name: file.name,
//           size: file.size,
//           type: file.type,
//         })
//       );
//     }
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     dispatch(setCopiedText(text));
//     setTimeout(() => dispatch(setCopiedText("")), 2000);
//   };

//   const handleFormChange = (field, value) => {
//     dispatch(setFormData({ ...formData, [field]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Comprehensive validation
//     if (!selectedPlan || !paymentMethod || !selectedFile) {
//       alert("Please complete all required fields");
//       return;
//     }

//     if (!formData.name?.trim()) {
//       alert("Please enter your full name");
//       return;
//     }

//     if (!formData.email?.trim() || !validateEmail(formData.email)) {
//       alert("Please enter a valid email address");
//       return;
//     }

//     if (!formData.phone?.trim() || !validatePhoneNumber(formData.phone)) {
//       alert(
//         "Please enter a valid Pakistani phone number (e.g., +923001234567 or 03001234567)"
//       );
//       return;
//     }

//     if (!formData.transactionId?.trim()) {
//       alert(
//         "Transaction ID is required. If you don't have one, please enter 'PENDING' or contact support."
//       );
//       return;
//     }

//     // Find the selected plan details
//     const selectedPlanData = subscriptionPlans.find(
//       (plan) => plan.id === selectedPlan
//     );
//     if (!selectedPlanData) {
//       alert("Invalid plan selected");
//       return;
//     }

//     // Create FormData for file upload
//     const submitData = new FormData();

//     // Structure data according to Mongoose schema
//     const userDetails = {
//       userId: userId, // Using email as userId
//       fullName: formData.name.trim(),
//       email: formData.email.toLowerCase().trim(),
//       phoneNumber: formData.phone.replace(/[\s-]/g, ""), // Remove spaces and dashes
//     };

//     // Map frontend plan structure to backend schema structure
//     const planData = {
//       planId: selectedPlanData.id,
//       planName: selectedPlanData.name,
//       planPrice: selectedPlanData.price,
//       planDuration: selectedPlanData.duration,
//     };

//     // Map payment method to required format
//     const paymentMethodMap = {
//       hbl: "HBL Bank Transfer",
//       ubl: "UBL Bank Transfer",
//       mcb: "MCB Bank Transfer",
//       jazzcash: "JazzCash",
//       easypaisa: "Easypaisa",
//     };

//     // Get account details based on payment method
//     const getAccountDetails = () => {
//       switch (paymentMethod) {
//         case "hbl":
//           return {
//             bankName: "HBL (Habib Bank Limited)",
//             accountNumber: bankAccounts[0].accountNumber,
//             iban: bankAccounts[0].iban,
//           };
//         case "ubl":
//           return {
//             bankName: "UBL (United Bank Limited)",
//             accountNumber: bankAccounts[1].accountNumber,
//             iban: bankAccounts[1].iban,
//           };
//         case "mcb":
//           return {
//             bankName: "MCB (Muslim Commercial Bank)",
//             accountNumber: bankAccounts[2].accountNumber,
//             iban: bankAccounts[2].iban,
//           };
//         case "jazzcash":
//           return {
//             mobileNumber: jazzcashEasypaisa.jazzcash.number,
//           };
//         case "easypaisa":
//           return {
//             mobileNumber: jazzcashEasypaisa.easypaisa.number,
//           };
//         default:
//           return {};
//       }
//     };

//     const paymentDetails = {
//       paymentMethod: paymentMethod,
//       paymentMethodName: paymentMethodMap[paymentMethod] || paymentMethod,
//       transactionId: formData.transactionId.trim(),
//       accountDetails: getAccountDetails(),
//     };

//     // Append JSON fields as strings (backend parseJSONFields middleware will parse them)
//     submitData.append("userDetails", JSON.stringify(userDetails));
//     submitData.append("selectedPlan", JSON.stringify(planData));
//     submitData.append("paymentDetails", JSON.stringify(paymentDetails));

//     // Append file with the exact field name backend expects
//     submitData.append("paymentReceipt", selectedFile);

//     // Debug logging
//     console.log("=== PAYMENT SUBMISSION DEBUG ===");
//     console.log("userDetails:", JSON.stringify(userDetails, null, 2));
//     console.log("selectedPlan:", JSON.stringify(planData, null, 2));
//     console.log("paymentDetails:", JSON.stringify(paymentDetails, null, 2));
//     console.log("file name:", selectedFile.name);
//     console.log("file size:", selectedFile.size);
//     console.log("file type:", selectedFile.type);

//     try {
//       await dispatch(submitPayment(submitData)).unwrap();
//       // Success handled by Redux state
//     } catch (err) {
//       // Error handled by Redux state
//       console.error("Payment submission failed:", err);
//     }
//   };

//   // Show success message
//   useEffect(() => {
//     if (successMessage) {
//       alert(`${successMessage} You will receive confirmation within 24 hours.`);
//       dispatch(resetPaymentState());
//       setSelectedFile(null);
//     }
//   }, [successMessage, dispatch]);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 text-white relative font-orbitron">
//       <div className="max-w-6xl mx-auto space-y-8">
//         <div className="flex justify-between items-center">
//           <a
//             href="/userdashboard"
//             className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-[#00ffcc] font-medium"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15 19l-7-7 7-7"
//               />
//             </svg>
//             Back to Dashboard
//           </a>
//           <button
//             onClick={() => dispatch(setShowInstructions(true))}
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#854951] hover:bg-[#944953] text-white text-sm font-bold"
//           >
//             <Info className="w-4 h-4" />
//             How Payment Works
//           </button>
//         </div>

//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-[#00ffcc] mb-2">
//             Choose Your Subscription Plan
//           </h1>
//           <p className="text-gray-300">
//             Select a plan and make payment to get started
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6">
//           {subscriptionPlans.map((plan) => (
//             <div
//               key={plan.id}
//               onClick={() => dispatch(setSelectedPlan(plan.id))}
//               className={`border-2 rounded-lg p-6 cursor-pointer transition-all shadow-lg hover:shadow-[#00ffcc] ${
//                 selectedPlan === plan.id
//                   ? "border-[#00ffcc] bg-[#112d32]"
//                   : "border-gray-600 bg-[#1e1e2f] hover:border-[#00ffcc]"
//               }`}
//             >
//               <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
//               <p className="text-3xl font-bold text-[#00ffcc] mb-2">
//                 {plan.price}
//               </p>
//               <p className="text-gray-300">{plan.duration}</p>
//               {selectedPlan === plan.id && (
//                 <Check className="w-6 h-6 text-[#00ffcc] mt-2" />
//               )}
//             </div>
//           ))}
//         </div>

//         {selectedPlan && (
//           <div className="bg-[#1e1e2f] rounded-lg shadow-md p-6 border border-[#00ffcc]">
//             <h2 className="text-2xl font-semibold mb-6 flex items-center">
//               <CreditCard className="w-6 h-6 mr-2" /> Payment Methods
//             </h2>

//             {/* Bank Transfer Section */}
//             <div className="mb-8">
//               <h3 className="text-lg font-medium mb-4 flex items-center">
//                 <Building className="w-5 h-5 mr-2" /> Bank Transfer Details
//               </h3>
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {bankAccounts.map((bank) => (
//                   <div
//                     key={bank.id}
//                     className="border rounded-lg p-4 bg-[#2a2a3b]"
//                   >
//                     <h4 className="font-semibold text-[#00ffcc] mb-3">
//                       {bank.bankName}
//                     </h4>
//                     <div className="space-y-2 text-sm">
//                       <div>
//                         <span className="font-medium">Account Title:</span>
//                         <p className="text-gray-300">{bank.accountTitle}</p>
//                       </div>
//                       <div>
//                         <span className="font-medium">Account Number:</span>
//                         <div className="flex items-center justify-between">
//                           <p className="text-gray-300 font-mono">
//                             {bank.accountNumber}
//                           </p>
//                           <button
//                             onClick={() => copyToClipboard(bank.accountNumber)}
//                             className="text-[#00ffcc] hover:text-white text-sm"
//                           >
//                             {copiedText === bank.accountNumber
//                               ? "Copied"
//                               : "Copy"}
//                           </button>
//                         </div>
//                       </div>
//                       <div>
//                         <span className="font-medium">IBAN:</span>
//                         <div className="flex items-center justify-between">
//                           <p className="text-gray-300 font-mono text-xs">
//                             {bank.iban}
//                           </p>
//                           <button
//                             onClick={() => copyToClipboard(bank.iban)}
//                             className="text-[#00ffcc] hover:text-white text-sm"
//                           >
//                             {copiedText === bank.iban ? "Copied" : "Copy"}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Mobile Wallet Section */}
//             <div className="mb-8">
//               <h3 className="text-lg font-medium mb-4 flex items-center">
//                 <Phone className="w-5 h-5 mr-2" /> Mobile Wallet Details
//               </h3>
//               <div className="grid md:grid-cols-2 gap-4">
//                 {Object.keys(jazzcashEasypaisa).map((key) => (
//                   <div
//                     key={key}
//                     className={`border rounded-lg p-4 ${
//                       key === "jazzcash" ? "bg-[#331a00]" : "bg-[#003319]"
//                     }`}
//                   >
//                     <h4
//                       className={`font-semibold ${
//                         key === "jazzcash"
//                           ? "text-orange-400"
//                           : "text-green-400"
//                       } mb-3`}
//                     >
//                       {jazzcashEasypaisa[key].name}
//                     </h4>
//                     <div className="space-y-2 text-sm">
//                       <div>
//                         <span className="font-medium">Account Title:</span>
//                         <p className="text-gray-300">
//                           {jazzcashEasypaisa[key].accountTitle}
//                         </p>
//                       </div>
//                       <div>
//                         <span className="font-medium">Mobile Number:</span>
//                         <div className="flex items-center justify-between">
//                           <p className="text-gray-300 font-mono">
//                             {jazzcashEasypaisa[key].number}
//                           </p>
//                           <button
//                             onClick={() =>
//                               copyToClipboard(jazzcashEasypaisa[key].number)
//                             }
//                             className={`text-sm ${
//                               key === "jazzcash"
//                                 ? "text-orange-400 hover:text-white"
//                                 : "text-green-400 hover:text-white"
//                             }`}
//                           >
//                             {copiedText === jazzcashEasypaisa[key].number
//                               ? "Copied"
//                               : "Copy"}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Payment Form */}
//             <div className="bg-[#2a2a3b] rounded-lg p-6">
//               <h3 className="text-lg font-semibold mb-4">
//                 Submit Payment Details
//               </h3>
//               <form onSubmit={handleSubmit}>
//                 <div className="grid md:grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <input
//                       type="text"
//                       required
//                       placeholder="Full Name *"
//                       value={formData.name || ""}
//                       onChange={(e) => handleFormChange("name", e.target.value)}
//                       className="w-full p-3 border rounded-md bg-[#1e1e2f] border-gray-600 focus:border-[#00ffcc] text-white placeholder-gray-400"
//                     />
//                   </div>
//                   <div>
//                     <input
//                       type="email"
//                       required
//                       placeholder="Email Address *"
//                       value={formData.email || ""}
//                       onChange={(e) =>
//                         handleFormChange("email", e.target.value)
//                       }
//                       className="w-full p-3 border rounded-md bg-[#1e1e2f] border-gray-600 focus:border-[#00ffcc] text-white placeholder-gray-400"
//                     />
//                   </div>
//                 </div>
//                 <div className="grid md:grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <input
//                       type="tel"
//                       required
//                       placeholder="Phone Number (e.g., +923001234567) *"
//                       value={formData.phone || ""}
//                       onChange={(e) =>
//                         handleFormChange("phone", e.target.value)
//                       }
//                       className="w-full p-3 border rounded-md bg-[#1e1e2f] border-gray-600 focus:border-[#00ffcc] text-white placeholder-gray-400"
//                     />
//                   </div>
//                   <div>
//                     <input
//                       type="text"
//                       required
//                       placeholder="Transaction ID *"
//                       value={formData.transactionId || ""}
//                       onChange={(e) =>
//                         handleFormChange("transactionId", e.target.value)
//                       }
//                       className="w-full p-3 border rounded-md bg-[#1e1e2f] border-gray-600 focus:border-[#00ffcc] text-white placeholder-gray-400"
//                     />
//                     <p className="text-xs text-gray-400 mt-1">
//                       Enter transaction ID from your payment receipt
//                     </p>
//                   </div>
//                 </div>
//                 <select
//                   required
//                   value={paymentMethod}
//                   onChange={(e) => dispatch(setPaymentMethod(e.target.value))}
//                   className="w-full p-3 border rounded-md mb-4 bg-[#1e1e2f] border-gray-600 focus:border-[#00ffcc] text-white"
//                 >
//                   <option value="">Select Payment Method *</option>
//                   <option value="hbl">HBL Bank Transfer</option>
//                   <option value="ubl">UBL Bank Transfer</option>
//                   <option value="mcb">MCB Bank Transfer</option>
//                   <option value="jazzcash">JazzCash</option>
//                   <option value="easypaisa">Easypaisa</option>
//                 </select>

//                 {/* File Upload */}
//                 <div className="mb-6">
//                   <label
//                     htmlFor="receipt-upload"
//                     className="block mb-2 font-medium"
//                   >
//                     Upload Payment Receipt *
//                   </label>
//                   <div className="border-2 border-dashed border-gray-600 p-6 text-center rounded-md hover:border-gray-400 transition-colors">
//                     <input
//                       type="file"
//                       accept="image/jpeg,image/png,image/jpg,application/pdf"
//                       id="receipt-upload"
//                       name="paymentReceipt"
//                       required
//                       onChange={handleFileUpload}
//                       className="hidden"
//                     />
//                     <label htmlFor="receipt-upload" className="cursor-pointer">
//                       <Upload className="w-10 h-10 mx-auto mb-2 text-[#854951]" />
//                       <p className="font-medium">
//                         {fileMetadata.name || "Click to upload receipt"}
//                       </p>
//                       <p className="text-sm text-gray-400">
//                         JPG, PNG, PDF (max 5MB)
//                       </p>
//                       {fileMetadata.name && (
//                         <p className="text-sm text-[#00ffcc] mt-2">
//                           ✅ {fileMetadata.name} (
//                           {Math.round(fileMetadata.size / 1024)} KB)
//                         </p>
//                       )}
//                     </label>
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full py-3 rounded-md text-white font-bold bg-[#854951] hover:bg-[#944953] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
//                 >
//                   {loading && <Loader2 className="w-4 h-4 animate-spin" />}
//                   {loading
//                     ? "Submitting..."
//                     : "Submit Payment for Verification"}
//                 </button>

//                 <p className="text-sm text-gray-400 text-center mt-4">
//                   * All fields marked with asterisk are required
//                 </p>
//                 {/* Error Display */}
//                 {error && (
//                   <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-200 mt-2">
//                     <p className="font-medium">{error}</p>
//                   </div>
//                 )}
//               </form>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Instructions Modal */}
//       {showInstructions && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
//           <div className="bg-[#1e1e2f] p-6 rounded-lg shadow-2xl border border-[#00ffcc] text-white w-full max-w-md md:max-w-lg relative overflow-y-auto max-h-[90vh]">
//             <button
//               onClick={() => dispatch(setShowInstructions(false))}
//               className="absolute top-2 right-2 text-gray-300 hover:text-white text-xl"
//             >
//               ×
//             </button>
//             <h2 className="text-lg md:text-xl font-semibold mb-4 text-center text-[#00ffcc]">
//               How to Complete Your Payment
//             </h2>
//             <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
//               <li>Select a subscription plan.</li>
//               <li>Choose a payment method (Bank or Mobile Wallet).</li>
//               <li>Transfer the required amount using the given details.</li>
//               <li>Save your payment receipt (screenshot or PDF).</li>
//               <li>Enter your personal information and transaction details.</li>
//               <li>Upload the payment receipt.</li>
//               <li>Click "Submit" to send for verification.</li>
//             </ol>
//             <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500 rounded-lg">
//               <p className="text-sm text-yellow-200">
//                 <strong>Important:</strong> Make sure your phone number follows
//                 Pakistani format (e.g., +923001234567 or 03001234567) and
//                 transaction ID is accurate.
//               </p>
//             </div>
//             <p className="mt-4 text-sm text-gray-500 text-center">
//               You will receive confirmation within 24 hours.
//             </p>
//           </div>
//         </div>
//       )}

//       <FloatingWhatsAppButton />
//     </div>
//   );
// };

// export default UserPaymentPortal;




import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Upload,
  Check,
  CreditCard,
  Building,
  Phone,
  Info,
  Loader2,
  Eye,
  Calendar,
} from "lucide-react";
import {
  submitPayment,
  setSelectedPlan,
  setFileMetadata,
  setPaymentMethod,
  setCopiedText,
  setShowInstructions,
  setFormData,
  resetPaymentState,
  clearPaymentState,
} from "../../../redux/features/paymentSlice";
import FloatingWhatsAppButton from "../../FloatingWhatsAppButton";
import SubscriptionPopup from './SubscriptionPopup';

const UserPaymentPortal = () => {
  const dispatch = useDispatch();
  const {
    loading,
    error,
    successMessage,
    selectedPlan,
    fileMetadata,
    paymentMethod,
    copiedText,
    showInstructions,
    formData,
  } = useSelector((state) => state.payment);

  // Keep file in component state to avoid Redux serialization issues
  const [selectedFile, setSelectedFile] = useState(null);
  // Add state for subscription popup
  const [isSubscriptionPopupOpen, setIsSubscriptionPopupOpen] = useState(false);

  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData?.UserId;

  // Clear any previous state on component mount
  useEffect(() => {
    dispatch(resetPaymentState());
    setSelectedFile(null);
    return () => {
      dispatch(clearPaymentState());
    };
  }, [dispatch]);

  const subscriptionPlans = [
    { id: "weekly", name: "Weekly Plan", price: "PKR 350", duration: "1 Week" },
    {
      id: "monthly",
      name: "Monthly Plan",
      price: "PKR 999",
      duration: "1 Month",
    },
    {
      id: "yearly",
      name: "Yearly Plan",
      price: "PKR 8,999",
      duration: "12 Months",
    },
  ];

  const bankAccounts = [
    {
      id: "hbl",
      bankName: "HBL (Habib Bank Limited)",
      accountTitle: "Your Company Name",
      accountNumber: "12345678901234",
      iban: "PK36HABB0012345678901234",
      branchCode: "1234",
    },
    {
      id: "ubl",
      bankName: "UBL (United Bank Limited)",
      accountTitle: "Your Company Name",
      accountNumber: "98765432109876",
      iban: "PK91UNIL0987654321098765",
      branchCode: "9876",
    },
    {
      id: "mcb",
      bankName: "MCB (Muslim Commercial Bank)",
      accountTitle: "Your Company Name",
      accountNumber: "11223344556677",
      iban: "PK70MUCB1122334455667788",
      branchCode: "5566",
    },
  ];

  const jazzcashEasypaisa = {
    jazzcash: {
      name: "JazzCash",
      number: "03XX-XXXXXXX",
      accountTitle: "Your Company Name",
    },
    easypaisa: {
      name: "Easypaisa",
      number: "03XX-XXXXXXX",
      accountTitle: "Your Company Name",
    },
  };

  // Validation functions
  const validatePhoneNumber = (phone) => {
    const pakistaniPhoneRegex = /^(\+92|0092|92|0)[0-9]{10}$/;
    return pakistaniPhoneRegex.test(phone?.replace(/[\s-]/g, ""));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5242880) {
        alert("File size cannot exceed 5MB");
        return;
      }

      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/pdf",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("File type must be JPG, PNG, or PDF");
        return;
      }

      setSelectedFile(file);
      // Store only metadata in Redux
      dispatch(
        setFileMetadata({
          name: file.name,
          size: file.size,
          type: file.type,
        })
      );
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    dispatch(setCopiedText(text));
    setTimeout(() => dispatch(setCopiedText("")), 2000);
  };

  const handleFormChange = (field, value) => {
    dispatch(setFormData({ ...formData, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Comprehensive validation
    if (!selectedPlan || !paymentMethod || !selectedFile) {
      alert("Please complete all required fields");
      return;
    }

    if (!formData.name?.trim()) {
      alert("Please enter your full name");
      return;
    }

    if (!formData.email?.trim() || !validateEmail(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!formData.phone?.trim() || !validatePhoneNumber(formData.phone)) {
      alert(
        "Please enter a valid Pakistani phone number (e.g., +923001234567 or 03001234567)"
      );
      return;
    }

    if (!formData.transactionId?.trim()) {
      alert(
        "Transaction ID is required. If you don't have one, please enter 'PENDING' or contact support."
      );
      return;
    }

    // Find the selected plan details
    const selectedPlanData = subscriptionPlans.find(
      (plan) => plan.id === selectedPlan
    );
    if (!selectedPlanData) {
      alert("Invalid plan selected");
      return;
    }

    // Create FormData for file upload
    const submitData = new FormData();

    // Structure data according to Mongoose schema
    const userDetails = {
      userId: userId, // Using email as userId
      fullName: formData.name.trim(),
      email: formData.email.toLowerCase().trim(),
      phoneNumber: formData.phone.replace(/[\s-]/g, ""), // Remove spaces and dashes
    };

    // Map frontend plan structure to backend schema structure
    const planData = {
      planId: selectedPlanData.id,
      planName: selectedPlanData.name,
      planPrice: selectedPlanData.price,
      planDuration: selectedPlanData.duration,
    };

    // Map payment method to required format
    const paymentMethodMap = {
      hbl: "HBL Bank Transfer",
      ubl: "UBL Bank Transfer",
      mcb: "MCB Bank Transfer",
      jazzcash: "JazzCash",
      easypaisa: "Easypaisa",
    };

    // Get account details based on payment method
    const getAccountDetails = () => {
      switch (paymentMethod) {
        case "hbl":
          return {
            bankName: "HBL (Habib Bank Limited)",
            accountNumber: bankAccounts[0].accountNumber,
            iban: bankAccounts[0].iban,
          };
        case "ubl":
          return {
            bankName: "UBL (United Bank Limited)",
            accountNumber: bankAccounts[1].accountNumber,
            iban: bankAccounts[1].iban,
          };
        case "mcb":
          return {
            bankName: "MCB (Muslim Commercial Bank)",
            accountNumber: bankAccounts[2].accountNumber,
            iban: bankAccounts[2].iban,
          };
        case "jazzcash":
          return {
            mobileNumber: jazzcashEasypaisa.jazzcash.number,
          };
        case "easypaisa":
          return {
            mobileNumber: jazzcashEasypaisa.easypaisa.number,
          };
        default:
          return {};
      }
    };

    const paymentDetails = {
      paymentMethod: paymentMethod,
      paymentMethodName: paymentMethodMap[paymentMethod] || paymentMethod,
      transactionId: formData.transactionId.trim(),
      accountDetails: getAccountDetails(),
    };

    // Append JSON fields as strings (backend parseJSONFields middleware will parse them)
    submitData.append("userDetails", JSON.stringify(userDetails));
    submitData.append("selectedPlan", JSON.stringify(planData));
    submitData.append("paymentDetails", JSON.stringify(paymentDetails));

    // Append file with the exact field name backend expects
    submitData.append("paymentReceipt", selectedFile);

    // Debug logging
    console.log("=== PAYMENT SUBMISSION DEBUG ===");
    console.log("userDetails:", JSON.stringify(userDetails, null, 2));
    console.log("selectedPlan:", JSON.stringify(planData, null, 2));
    console.log("paymentDetails:", JSON.stringify(paymentDetails, null, 2));
    console.log("file name:", selectedFile.name);
    console.log("file size:", selectedFile.size);
    console.log("file type:", selectedFile.type);

    try {
      await dispatch(submitPayment(submitData)).unwrap();
      // Success handled by Redux state
    } catch (err) {
      // Error handled by Redux state
      console.error("Payment submission failed:", err);
    }
  };

  // Show success message
  useEffect(() => {
    if (successMessage) {
      alert(`${successMessage} You will receive confirmation within 24 hours.`);
      dispatch(resetPaymentState());
      setSelectedFile(null);
    }
  }, [successMessage, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 text-white relative font-orbitron">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Enhanced Header with Subscription Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <a
            href="/userdashboard"
            className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-[#00ffcc] font-medium transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Dashboard
          </a>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* View Subscriptions Button */}
            <button
              onClick={() => setIsSubscriptionPopupOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-[#00ffcc] to-[#00ccaa] hover:from-[#00ccaa] hover:to-[#00ffcc] text-black text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-[#00ffcc]/25 transform hover:scale-105"
            >
              <Eye className="w-4 h-4" />
              My Subscriptions
            </button>
            
            {/* Instructions Button */}
            <button
              onClick={() => dispatch(setShowInstructions(true))}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#854951] hover:bg-[#944953] text-white text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-[#854951]/25"
            >
              <Info className="w-4 h-4" />
              How Payment Works
            </button>
          </div>
        </div>

        {/* Title Section with Subscription Status Hint */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-[#00ffcc] mb-2">
            Choose Your Subscription Plan
          </h1>
          <p className="text-gray-300">
            Select a plan and make payment to get started
          </p>
          
          {/* Quick Access Card */}
          <div className="bg-gradient-to-r from-[#1e1e2f] to-[#2a2a3b] rounded-lg p-4 border border-[#00ffcc]/30 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-[#00ffcc]" />
              <span className="text-gray-300">Already have a subscription?</span>
              <button
                onClick={() => setIsSubscriptionPopupOpen(true)}
                className="text-[#00ffcc] hover:text-white font-medium underline underline-offset-2 transition-colors"
              >
                View Status
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => dispatch(setSelectedPlan(plan.id))}
              className={`border-2 rounded-lg p-6 cursor-pointer transition-all shadow-lg hover:shadow-[#00ffcc] ${
                selectedPlan === plan.id
                  ? "border-[#00ffcc] bg-[#112d32]"
                  : "border-gray-600 bg-[#1e1e2f] hover:border-[#00ffcc]"
              }`}
            >
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold text-[#00ffcc] mb-2">
                {plan.price}
              </p>
              <p className="text-gray-300">{plan.duration}</p>
              {selectedPlan === plan.id && (
                <Check className="w-6 h-6 text-[#00ffcc] mt-2" />
              )}
            </div>
          ))}
        </div>

        {selectedPlan && (
          <div className="bg-[#1e1e2f] rounded-lg shadow-md p-6 border border-[#00ffcc]">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <CreditCard className="w-6 h-6 mr-2" /> Payment Methods
            </h2>

            {/* Bank Transfer Section */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Building className="w-5 h-5 mr-2" /> Bank Transfer Details
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bankAccounts.map((bank) => (
                  <div
                    key={bank.id}
                    className="border rounded-lg p-4 bg-[#2a2a3b]"
                  >
                    <h4 className="font-semibold text-[#00ffcc] mb-3">
                      {bank.bankName}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Account Title:</span>
                        <p className="text-gray-300">{bank.accountTitle}</p>
                      </div>
                      <div>
                        <span className="font-medium">Account Number:</span>
                        <div className="flex items-center justify-between">
                          <p className="text-gray-300 font-mono">
                            {bank.accountNumber}
                          </p>
                          <button
                            onClick={() => copyToClipboard(bank.accountNumber)}
                            className="text-[#00ffcc] hover:text-white text-sm"
                          >
                            {copiedText === bank.accountNumber
                              ? "Copied"
                              : "Copy"}
                          </button>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">IBAN:</span>
                        <div className="flex items-center justify-between">
                          <p className="text-gray-300 font-mono text-xs">
                            {bank.iban}
                          </p>
                          <button
                            onClick={() => copyToClipboard(bank.iban)}
                            className="text-[#00ffcc] hover:text-white text-sm"
                          >
                            {copiedText === bank.iban ? "Copied" : "Copy"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Wallet Section */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2" /> Mobile Wallet Details
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.keys(jazzcashEasypaisa).map((key) => (
                  <div
                    key={key}
                    className={`border rounded-lg p-4 ${
                      key === "jazzcash" ? "bg-[#331a00]" : "bg-[#003319]"
                    }`}
                  >
                    <h4
                      className={`font-semibold ${
                        key === "jazzcash"
                          ? "text-orange-400"
                          : "text-green-400"
                      } mb-3`}
                    >
                      {jazzcashEasypaisa[key].name}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Account Title:</span>
                        <p className="text-gray-300">
                          {jazzcashEasypaisa[key].accountTitle}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">Mobile Number:</span>
                        <div className="flex items-center justify-between">
                          <p className="text-gray-300 font-mono">
                            {jazzcashEasypaisa[key].number}
                          </p>
                          <button
                            onClick={() =>
                              copyToClipboard(jazzcashEasypaisa[key].number)
                            }
                            className={`text-sm ${
                              key === "jazzcash"
                                ? "text-orange-400 hover:text-white"
                                : "text-green-400 hover:text-white"
                            }`}
                          >
                            {copiedText === jazzcashEasypaisa[key].number
                              ? "Copied"
                              : "Copy"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-[#2a2a3b] rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">
                Submit Payment Details
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Full Name *"
                      value={formData.name || ""}
                      onChange={(e) => handleFormChange("name", e.target.value)}
                      className="w-full p-3 border rounded-md bg-[#1e1e2f] border-gray-600 focus:border-[#00ffcc] text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={formData.email || ""}
                      onChange={(e) =>
                        handleFormChange("email", e.target.value)
                      }
                      className="w-full p-3 border rounded-md bg-[#1e1e2f] border-gray-600 focus:border-[#00ffcc] text-white placeholder-gray-400"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number (e.g., +923001234567) *"
                      value={formData.phone || ""}
                      onChange={(e) =>
                        handleFormChange("phone", e.target.value)
                      }
                      className="w-full p-3 border rounded-md bg-[#1e1e2f] border-gray-600 focus:border-[#00ffcc] text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Transaction ID *"
                      value={formData.transactionId || ""}
                      onChange={(e) =>
                        handleFormChange("transactionId", e.target.value)
                      }
                      className="w-full p-3 border rounded-md bg-[#1e1e2f] border-gray-600 focus:border-[#00ffcc] text-white placeholder-gray-400"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Enter transaction ID from your payment receipt
                    </p>
                  </div>
                </div>
                <select
                  required
                  value={paymentMethod}
                  onChange={(e) => dispatch(setPaymentMethod(e.target.value))}
                  className="w-full p-3 border rounded-md mb-4 bg-[#1e1e2f] border-gray-600 focus:border-[#00ffcc] text-white"
                >
                  <option value="">Select Payment Method *</option>
                  <option value="hbl">HBL Bank Transfer</option>
                  <option value="ubl">UBL Bank Transfer</option>
                  <option value="mcb">MCB Bank Transfer</option>
                  <option value="jazzcash">JazzCash</option>
                  <option value="easypaisa">Easypaisa</option>
                </select>

                {/* File Upload */}
                <div className="mb-6">
                  <label
                    htmlFor="receipt-upload"
                    className="block mb-2 font-medium"
                  >
                    Upload Payment Receipt *
                  </label>
                  <div className="border-2 border-dashed border-gray-600 p-6 text-center rounded-md hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/jpg,application/pdf"
                      id="receipt-upload"
                      name="paymentReceipt"
                      required
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label htmlFor="receipt-upload" className="cursor-pointer">
                      <Upload className="w-10 h-10 mx-auto mb-2 text-[#854951]" />
                      <p className="font-medium">
                        {fileMetadata.name || "Click to upload receipt"}
                      </p>
                      <p className="text-sm text-gray-400">
                        JPG, PNG, PDF (max 5MB)
                      </p>
                      {fileMetadata.name && (
                        <p className="text-sm text-[#00ffcc] mt-2">
                          ✅ {fileMetadata.name} (
                          {Math.round(fileMetadata.size / 1024)} KB)
                        </p>
                      )}
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-md text-white font-bold bg-[#854951] hover:bg-[#944953] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading
                    ? "Submitting..."
                    : "Submit Payment for Verification"}
                </button>

                <p className="text-sm text-gray-400 text-center mt-4">
                  * All fields marked with asterisk are required
                </p>
                {/* Error Display */}
                {error && (
                  <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-200 mt-2">
                    <p className="font-medium">{error}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-[#1e1e2f] p-6 rounded-lg shadow-2xl border border-[#00ffcc] text-white w-full max-w-md md:max-w-lg relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => dispatch(setShowInstructions(false))}
              className="absolute top-2 right-2 text-gray-300 hover:text-white text-xl"
            >
              ×
            </button>
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-center text-[#00ffcc]">
              How to Complete Your Payment
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
              <li>Select a subscription plan.</li>
              <li>Choose a payment method (Bank or Mobile Wallet).</li>
              <li>Transfer the required amount using the given details.</li>
              <li>Save your payment receipt (screenshot or PDF).</li>
              <li>Enter your personal information and transaction details.</li>
              <li>Upload the payment receipt.</li>
              <li>Click "Submit" to send for verification.</li>
            </ol>
            <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500 rounded-lg">
              <p className="text-sm text-yellow-200">
                <strong>Important:</strong> Make sure your phone number follows
                Pakistani format (e.g., +923001234567 or 03001234567) and
                transaction ID is accurate.
              </p>
            </div>
            <p className="mt-4 text-sm text-gray-500 text-center">
              You will receive confirmation within 24 hours.
            </p>
          </div>
        </div>
      )}

      {/* Subscription Popup */}
      <SubscriptionPopup
        isOpen={isSubscriptionPopupOpen}
        onClose={() => setIsSubscriptionPopupOpen(false)}
        userId={userId}
      />

      <FloatingWhatsAppButton />
    </div>
  );
};

export default UserPaymentPortal;