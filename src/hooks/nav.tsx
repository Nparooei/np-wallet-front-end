import { useNavigation } from "@react-navigation/native";
import { LoginNavigationProp, MainNavigationProp } from "@src/types/navigation";

const useNav = () => {
  console.log("useNav called!");
  return useNavigation<LoginNavigationProp & MainNavigationProp>();
};

export default useNav;
