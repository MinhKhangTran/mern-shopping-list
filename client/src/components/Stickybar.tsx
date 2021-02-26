import React from "react";
import {
  Box,
  Heading,
  Text,
  Avatar,
  Wrap,
  WrapItem,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { logoutUser } from "../slices/userSlice";

const Stickybar = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  // console.log(userInfo);
  const dispatch = useDispatch();
  return (
    <Flex
      h={{ base: "15vh", md: "30vh" }}
      m={{ base: "0", md: "4" }}
      borderRadius={{ base: "0", md: "lg" }}
      border={{ base: "0px", md: "6px" }}
      borderColor={{ base: "yellow.600", md: "yellow.600" }}
      direction={{ base: "row", md: "column" }}
      justify={{ base: "space-between", md: "center" }}
      align={{ base: "center", md: "start" }}
      p={6}
      bgColor="yellow.200"
      position="sticky"
      top="5%"
    >
      <Heading fontSize="xl" mb={{ base: "0", md: "6" }} color="yellow.600">
        <Link to="/">Shopping List</Link>
      </Heading>
      <Wrap align="center">
        {userInfo._id && (
          <WrapItem>
            <Avatar colorScheme="yellow" name={userInfo.username} />
          </WrapItem>
        )}

        <WrapItem>
          {userInfo._id ? (
            <>
              <Text display={{ base: "none", md: "block" }}>
                Hi {userInfo && userInfo.username}
              </Text>
              <Box display={{ base: "block", md: "none" }}>
                <Menu>
                  <MenuButton
                    variant="ghost"
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    colorScheme="transparent"
                  >
                    Hi {userInfo && userInfo.username}
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      <Link to="/add">Item einfügen</Link>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        dispatch(logoutUser());
                      }}
                    >
                      <Link to="/login">Logout</Link>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </>
          ) : (
            <Text display={{ base: "block", md: "none" }}>
              <Link to="/login">Login</Link>
            </Text>
          )}
        </WrapItem>
      </Wrap>
      {userInfo._id ? (
        <>
          <Text display={{ base: "none", md: "block" }} my={2}>
            <Link to="/add">Item einfügen</Link>
          </Text>
          <Text
            onClick={() => {
              dispatch(logoutUser());
            }}
            display={{ base: "none", md: "block" }}
            my={2}
          >
            <Link to="/login">Logout</Link>
          </Text>
        </>
      ) : (
        <Text display={{ base: "none", md: "block" }} my={2}>
          <Link to="/login">Login</Link>
        </Text>
      )}
    </Flex>
  );
};
export default Stickybar;
