import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import { Checkbox, Button } from '@material-ui/core';
import { getAllOrders, addNewOrder, acceptOrder, deliverOrder } from '../../../helpers/orders';
import io from 'socket.io-client';
import { socketAddress } from '../../../helpers/constants';
const socket = io.connect(socketAddress);
export default function Dashboard(props) {
  const handleOrderDetailChange = (rowData) => {
    console.log('change')
    acceptOrder(rowData._id).then((val) => {
      console.log(val);
    })
  }
  const handleDeliverChange = (rowData) => {
    deliverOrder(rowData._id).then((val) => {
    })
  }
  // componentDidMount
  useEffect(() => {
    socket.on('refresh', function (data) {
      getData();
      console.log('refresh');
    });
  }, []);
  const { userId, userRole } = JSON.parse(localStorage.getItem("loggedUser"));
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Quantity', field: 'quantity' },
      {
        title: 'Order', field: 'accepted', render: rowData => {
          return !rowData.accepted ? <Checkbox key={rowData._id} checked={rowData.accepted} disabled={userRole === "c"} onChange={() => handleOrderDetailChange(rowData)}></Checkbox> :
            rowData.acceptedUserId === userId ? <p>accepted by you</p> : <p>accepted by others</p>;
        }
      },
      {
        title: 'Delivered', field: 'delivered', render: rowData => {
          return rowData.delivered ? <Checkbox key={rowData._id} checked={true} disabled={true}></Checkbox> :
            rowData.acceptedUserId === userId ? <Checkbox key={rowData._id} checked={rowData.delivered} onChange={() => handleDeliverChange(rowData)}></Checkbox> : <Checkbox key={rowData._id} checked={rowData.delivered} disabled={true}></Checkbox>
        }
      }
    ],
    data: [
    ],
  });
  // un mount
  useEffect(() => {
    return () => {
      socket.disconnect();
    }
  }, []);
  const onRowAdd = (newData) => {
    return new Promise((resolve, reject) => {
      // resolve();
      // setState(prevState => {
      //   const data = [...prevState.data];
      //   data.push(newData);
      //   return { ...prevState, data };
      // });


      addNewOrder(newData.name, newData.quantity).then(res => {
        console.log(res);
      })
      resolve();
    })
  }
  async function getData() {
    const result = await getAllOrders();
    console.log(result, 'ss');
    setState({ ...state, data: result.map(val => ({ name: val.name, quantity: val.quantity, _id: val._id, accepted: val.accepted, acceptedUserId: val.acceptedUserId, delivered: val.delivered })) });
  }
  useEffect(() => {
    getData();
  }, state);

  const handleLogOut = () => {
    localStorage.removeItem("jwtKey");
    localStorage.removeItem("loggedUser");
    props.history.push('/login');
  }
  return (
    <div style={{ display: 'flex', 'flexDirection': 'column', 'justifyContent': 'center', alignItems: 'center' }}>
      <MaterialTable
        title="Restaurant Orders"
        columns={state.columns}
        data={state.data}
        editable={userRole === "c" && {
          onRowAdd: onRowAdd,
          // onRowUpdate: (newData, oldData) =>
          //   new Promise(resolve => {
          //     setTimeout(() => {
          //       resolve();
          //       if (oldData) {
          //         setState(prevState => {
          //           const data = [...prevState.data];
          //           data[data.indexOf(oldData)] = newData;
          //           return { ...prevState, data };
          //         });
          //       }
          //     }, 600);
          //   }),
        }}
      />
      <Button type="button" style={{ width: 150, marginTop: 20 }} onClick={handleLogOut}>
        logout
      </Button>
    </div>
  );
}