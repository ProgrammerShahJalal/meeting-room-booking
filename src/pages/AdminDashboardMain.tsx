import BookingManagement from "../components/BookingManagement";
import RoomManagement from "./RoomManagement";
import SlotsManagement from "./SlotsManagement";

const AdminDashboardMain = () => {
  return (
    <div>
      <RoomManagement />
      <SlotsManagement />
      <BookingManagement />
    </div>
  );
};

export default AdminDashboardMain;
