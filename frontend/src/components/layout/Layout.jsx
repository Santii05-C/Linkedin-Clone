import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main className="max-w-7xl max-auto px-4 py-6">{children}</main>
    </div>
  );
};
//3:30
export default Layout;
