import { useNavigate } from "react-router-dom";

// Custom hook for navigation handling
const useAppNavigation = () => {
  const navigate = useNavigate();

  // Navigate to internal or external path
  const navigateToPath = (path: string) => {
    if (/^https?:\/\//.test(path)) {
      window.location.href = path; // external link
    } else {
      navigate(path); // internal route
    }
  };

  return { navigateToPath };
};

export default useAppNavigation;
