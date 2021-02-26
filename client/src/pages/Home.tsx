import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  IconButton,
  ButtonGroup,
  Heading,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import {
  getItems,
  deleteItem,
  clearState,
  deleteItemAdmin,
} from "../slices/itemSlice";
import Moment from "react-moment";
import { FiEdit } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const {
    loading,
    änderungen,
    itemInfo: { data, totalCount },
  } = useSelector((state: RootState) => state.item);
  const { userInfo } = useSelector((state: RootState) => state.user);
  React.useEffect(() => {
    dispatch(getItems());
    dispatch(clearState());
  }, [dispatch, änderungen, totalCount]);

  if (loading) {
    return (
      <Box>
        <Spinner color="yellow.400" />
      </Box>
    );
  }
  return (
    <Box>
      <Heading color="yellow.600">Anzahl der Items: {totalCount}</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Datum</Th>
          </Tr>
        </Thead>
        <Tbody>
          {!loading &&
            data?.map((item) => {
              return (
                <Tr key={item._id}>
                  <Td>{item.name}</Td>
                  <Td>
                    <Moment to={item.createdAt}></Moment>
                  </Td>

                  <Td>
                    {userInfo._id === item.user ? (
                      <ButtonGroup>
                        <Link to={`/edit/${item._id}`}>
                          <IconButton
                            aria-label="edit"
                            icon={<FiEdit />}
                            variant="ghost"
                            colorScheme="green"
                          ></IconButton>
                        </Link>
                        <IconButton
                          onClick={() => {
                            if (window.confirm("Bist du sicher?")) {
                              dispatch(deleteItem({ userId: item._id }));
                            }
                          }}
                          aria-label="delete"
                          icon={<FaTrash />}
                          variant="ghost"
                          colorScheme="red"
                        ></IconButton>
                      </ButtonGroup>
                    ) : null}
                    {userInfo.role === "admin" ? (
                      <ButtonGroup>
                        <Link to={`/edit/admin/${item._id}`}>
                          <IconButton
                            aria-label="edit"
                            icon={<FiEdit />}
                            variant="outline"
                            colorScheme="blue"
                          ></IconButton>
                        </Link>
                        <IconButton
                          onClick={() => {
                            if (window.confirm("Bist du sicher?")) {
                              dispatch(deleteItemAdmin({ id: item._id }));
                            }
                          }}
                          aria-label="delete"
                          icon={<FaTrash />}
                          variant="outline"
                          colorScheme="pink"
                        ></IconButton>
                      </ButtonGroup>
                    ) : null}
                  </Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </Box>
  );
};
export default Home;
