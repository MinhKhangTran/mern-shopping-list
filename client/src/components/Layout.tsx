import React from "react";
import { Box, Grid, GridItem, useToast } from "@chakra-ui/react";
import Stickybar from "./Stickybar";
import { clearToast } from "../slices/userSlice";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";

const Layout: React.FC = ({ children }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { msg, type } = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    if (type === "success") {
      toast({
        title: "Yay",
        description: msg,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      dispatch(clearToast());
    }
    if (type === "error") {
      toast({
        title: "Meh",
        description: msg,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      dispatch(clearToast());
    }
    // eslint-disable-next-line
  }, [type, msg, dispatch]);

  return (
    <Grid
      gap={4}
      templateColumns={{ base: "repeat(1,1fr)", md: "repeat(5,1fr)" }}
    >
      <GridItem colSpan={1}>
        <Stickybar />
      </GridItem>
      <GridItem colSpan={{ base: 1, md: 4 }}>
        <Box w="90%" mx="auto" mt={8}>
          {children}
        </Box>
      </GridItem>
    </Grid>
  );
};
export default Layout;
