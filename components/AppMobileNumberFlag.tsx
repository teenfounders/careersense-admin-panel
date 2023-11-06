import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const AppMobileNumberFlag = () => {
  const [phone, setPhone] = useState("");

  return (
    <div className="z-50">
      <PhoneInput
        defaultCountry="ua"
        style={{ zIndex: 999 }}
        value={phone}
        className="text-blue-400"
        onChange={(phone) => setPhone(phone)}
      />
    </div>
  );
};
export default AppMobileNumberFlag;
// import React from "react";
// import PhoneInput, { getCountries ,getCountryCallingCode} from "react-phone-number-input";
// import "react-phone-number-input/style.css";

// const PhoneNumberInput: React.FC = () => {
//   const [phoneNumber, setPhoneNumber] = React.useState("");
//   const [country, setCountry] = React.useState<CountryCode>("US");

//   const countries = getCountries();

//   return (
//     <div className="flex items-center border p-2 rounded">
//       <div className="mr-2">
//         <select
//           className="mr-2"
//           value={country}
//           onChange={(e) => setCountry(e.target.value as CountryCode)}
//         >
//           {countries.map((country) => (
//             <option key={country} value={country}>
//               {country}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className="mr-2">
//         <PhoneInput
//           placeholder="Enter phone number"
//           value={phoneNumber}
//           onChange={setPhoneNumber}
//           country={country}
//           displayInitialValueAsLocalNumber={false}
//         />
//       </div>
//     </div>
//   );
// };

// export default PhoneNumberInput;
