import React, {useState}from 'react'
import { useEffect } from 'react';
import todo from '../image/todo.png'
import "./Todo.css"
import { AiFillEdit,AiFillDelete, AiFillPlusSquare } from 'react-icons/ai';


const getLocalItems = () => {
    let lists = localStorage.getItem('list');
    console.log("lists");

    if(lists){
       return JSON.parse(localStorage.getItem('list'));
    }
    else{
        return [];
    }
}

const Web = () => {

    const [inputdata , setInputData] = useState();
    const [Items ,setItems] = useState(getLocalItems());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const[isEditItem, setIsEditItem] = useState(null);

    const addItem = () => {
        if(!inputdata){
         alert('plzz fill data');
        }
        else if(inputdata && !toggleSubmit){
           setItems(
            Items.map((element) => {
                if(element.id === isEditItem  ){
                    return{...element, name:inputdata}
                }
                return element;
            })
            )
            setInputData('');
                
        }
        else {
            const allInputData = 
            {id: new Date().getTime().toString(), name:inputdata}
        setItems([...Items, allInputData]);
        setInputData('')
        }
    }

    const deleteItem = (index) =>{
     
        const updatedItems = Items.filter((element)=>{
            return index !== element.id;
        });
        setItems(updatedItems);
    }

    const editItem = (id) => {
        let newEditItem = Items.find((element) => {
            return element.id === id

        });
        console.log(newEditItem);
        setToggleSubmit(false);

        setInputData(newEditItem.name);
    
        setIsEditItem(id);
    }

    const removeAll = () => {
        setItems([]);
    }

    

    useEffect(()=>{
       localStorage.setItem('list',JSON.stringify(Items))
    },[Items]);

  return (
    <>
    <div>
      <div className="main_div">
        <div className="center_div">
            <figure>
                <img src={todo} alt="todologo"/>
              <figcaption>Add Your list Here</figcaption>
            </figure>
            <br></br>
            <br></br>
        
            <div className='addItems'>
                <input type="text" placeholder=' Add Items ...'
                value={inputdata} onChange={(e) => setInputData(e.target.value)}/>
                {

                    toggleSubmit?  <button  onClick={addItem}><AiFillPlusSquare/></button> :
                    <button  onClick={addItem}><AiFillEdit/></button>
                }

                </div>
                <br></br><br></br>
            <div className='showItems'>
                {
                    Items.map((element ) => {
                        return(
                            <div className='eachItem' key={element.id}>
                            <h2>{element.name}</h2>
                            <div className='todo-btn'>
                            <button  onClick={() => editItem(element.id)}><AiFillEdit/></button>
                           <buttton  onClick={() => deleteItem(element.id)}><AiFillDelete/></buttton>
                         </div>
                         </div>
                      
                        )
                    })
                }
                
            </div>
        
            
            <br></br>
            <br></br>
            <br></br>
        <button className='btn effect04' onClick={removeAll}><span>Remove All</span></button>
       </div>
       
      </div>

    </div>
    </>
  )
}

export default Web

