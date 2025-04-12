import Navbar from "@/component/navbar/navbar";
import { Sidebar } from "@/component/sidebar/sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="p-4 sm:ml-64">
        <div className="p-4 mt-14">{children}</div>
      </div>
    </>
  );
};

export default Layout;
