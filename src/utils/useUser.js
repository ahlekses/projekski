export const getCurrentUser = () => {
  // Mock or real logic here
  return {
    fullName: "Mark Johnson",
    mobile: "(44) 123 1234 123",
    email: "mark@simmmple.com",
    location: "United States",
  };
};

const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser(); // call the function
    setUser(currentUser);
  }, []);

  return user;
};

export default useUser;
