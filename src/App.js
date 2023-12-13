import './App.css';
import {useDispatch, useSelector} from "react-redux";
// import {type} from "@testing-library/user-event/dist/type";
import {addCustomerAction, customerReducer, removeCustomerAction} from "./store/customerReducer";
import {fetchCustomers} from "./asyncAction/customers";
// import {useId} from "react";

function App() {
  const id = Date.now()

  const dispatch = useDispatch()
  const cash  = useSelector(state => state.cash.cash)
  const customers  = useSelector(state => state.customers.customers)

  const addCash = (cash) => {
      dispatch({type: "ADD_CASH", payload: cash})
  }
  const getCash = (cash) => {
      dispatch({type: "GET_CASH", payload: cash})
  }

    const addCustomer = (name) => {
        const customer = {
            name,
            id: id
        }
        dispatch(addCustomerAction(customer))
    }

    const removeCustomer = (customer) => {
        dispatch(removeCustomerAction(customer.id))
    }

  return (
    <div className="App">
     <div className="container">
         <div className="result">{cash}</div>
       <button className="app__btn" onClick={() => addCash(Number(prompt()))}>Пополнить счет</button>
       <button className="app__btn" onClick={() => getCash(Number(prompt()))}>Снять с счета</button>
       <button className="app__btn" onClick={() => addCustomer((prompt()))}>Добавить клиента</button>
       <button className="app__btn" onClick={() => dispatch(fetchCustomers())}>Получить клиентов из базы</button>
     </div>
        {customers.length > 0 ?
        <div>
            {customers.map(customer =>
                <div onClick={()=> removeCustomer(customer)} style={{border: '1px solid #000000'}}>{customer.name}</div>
            )}
        </div>
            :
            <div>
            No customers !!!
            </div>
        }
    </div>
  );
}

export default App;
