import React from "react";
import Image from "next/image";

interface Product {
  serialNumber: number;
  companyLogo: string;
  companyName: string;
  tagline: string;
  valuation: string;
  publicOrPrivate: string;
}

interface ProductTableProps {
  products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-black max-w-6xl">
        <thead className="text-xs text-black uppercase">
          <tr>{/* ... (same as before) */}</tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="h-14">
              {/* <td className="w-5 mx-2">
                <Image
                  src={product.companyLogo}
                  alt="Company Logo"
                  className="w-8 h-8"
                  width={34}
                  height={34}
                />
              </td> */}
              <td
                className="text-[#4e71da] font-medium mx-1 max-w-[200px]  pl-3 text-base"
                style={{
                  width: `${product.companyName.length * 0}px`,
                  marginRight: "5px",
                }}
              >
                {product.companyName}
              </td>
              <td
                className="px-2 py-2 text-[#212529] text-[0.] max-w-[200px] overflow-hidden"
                style={{
                  width: `${product.tagline.length * 5}px`,
                  margin: "0",
                }}
              >
                {product.tagline.length > 60
                  ? product.tagline.slice(0, 50) + "..."
                  : product.tagline}
              </td>
              <td className="w-9">
                <Image
                  src={product.companyLogo}
                  alt="Company Logo"
                  className="w-8 h-8"
                  width={34}
                  height={34}
                />
              </td>
              <td className="w-9">
                <Image
                  src={product.companyLogo}
                  alt="Company Logo"
                  className="w-8 h-8"
                  width={34}
                  height={34}
                />
              </td>
              <td className="w-9">
                <Image
                  src={product.companyLogo}
                  alt="Company Logo"
                  className="w-8 h-8"
                  width={34}
                  height={34}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
