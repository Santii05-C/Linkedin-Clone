import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
  });
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main className="max-w-7xl max-auto px-4 py-6">{children}</main>
    </div>
  );
};

export default Layout;
//3:17
