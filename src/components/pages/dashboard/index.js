import React from 'react';
import MaterialTable from 'material-table';
import { Checkbox } from '@material-ui/core';

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Quantity', field: 'quantity' },
      {title: 'Order Detail',field: 'accepted', render: rowData=> <Checkbox></Checkbox>},
      {title: 'Delivered', field: 'delivered', render: rowData=> <Checkbox ></Checkbox>}
    ],
    data: [
      { name: 'Mehmet', quantity: 20, birthYear: 1987, birthCity: 63,  },
      {
        name: 'Zerya Betül',
        quantity: 12,
        birthYear: 2017,
        birthCity: 34,
      },
    ],
  });

  return (
    <MaterialTable
      title="Editable Example"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
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
  );
}