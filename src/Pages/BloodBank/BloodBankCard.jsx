import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge, Droplet, Layers, MapPin } from "lucide-react";
import { FaHospitalAlt, FaPhoneAlt } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import Payment from "../Payment/Payment";

const BloodBankCard = ({ blood }) => {
  const { clinicName, bloodGroup, quantity, isAvailable, price, _id } = blood;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuyClick = () => {
    setIsModalOpen(true); // Open the modal when "Buy" is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal when needed
  };

  return (
    <div>
      <Card className="shadow-lg border border-gray-200 rounded-lg overflow-hidden">
        <CardHeader className="p-4 bg-blue-600 text-white">
          <h2 className="text-lg font-semibold">Blood Group: {bloodGroup}</h2>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          {/* Clinic Address */}
          <div className="flex items-center gap-2 space-x-2">
            <FaHospitalAlt className="text-blue-500" />
            <span className="text-gray-700 text-sm">
              {clinicName?.clinicName}
            </span>
          </div>
          {/* Clinic Contact */}
          <div className="flex items-center space-x-2">
            <FaPhoneAlt className="text-blue-500" />
            <span className="text-gray-700 text-sm">
              {clinicName?.contact?.phoneNumber}
            </span>
          </div>
          {/* Clinic Location */}
          <div className="flex items-center space-x-2">
            <MapPin className="text-blue-500" />
            <span className="text-gray-700 text-sm">
              {clinicName?.location?.postalCode} {clinicName?.location?.street}{" "}
              {clinicName?.location?.city} {clinicName?.location?.country}
            </span>
          </div>
          {/* Blood Group */}
          <div className="flex items-center space-x-2">
            <Droplet className="text-red-500" />
            <Badge variant="outline" className="text-red-600 border-red-600" />
            <p className="text-red-500 font-bold">{bloodGroup}</p>
          </div>
          {/* Quantity */}
          <div className="flex items-center space-x-2">
            <Layers className="text-green-500" />
            <span className="text-gray-700 text-sm">
              Available Quantity: {quantity} units
            </span>
          </div>
          {/* Price */}
          <div className="flex items-center space-x-2">
            <Layers className="text-green-500" />
            <span className="text-gray-700 text-sm flex">
              Price Per Unit{" "}
              <span className="flex ml-1 items-center">
                <FaBangladeshiTakaSign size={12} /> {price}
              </span>
            </span>
          </div>
        </CardContent>
        <CardFooter className="p-4 bg-gray-100 text-right">
          {quantity > 0 ? (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
              onClick={handleBuyClick}
            >
              Buy
            </button>
          ) : (
            <div className="text-purple-500 px-4 py-2">Out Of Stock</div>
          )}
        </CardFooter>
      </Card>

      {/* DaisyUI Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={handleCloseModal}
            >
              ✕
            </button>

            <Payment price={price} quantity={quantity} _id={_id}   />
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodBankCard;
