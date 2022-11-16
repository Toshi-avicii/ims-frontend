import Wrapper from "./Wrapper";
import { useEffect } from "react";

function Products() {
  useEffect(() => {
    document.title = 'Dashboard | Edlyf - Inquiry Management System';
  }, [])
  return (
   <Wrapper />
  )
}

export default Products;