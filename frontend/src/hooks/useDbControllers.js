

//Get all items
export const getAllItems = async ()=>{
  try{
    const response = await fetch("/items");
    const {items, dataImage} = await response.json();
    return {items, dataImage};
  }catch(err){
    console.log(err)
  }
}
//Get one item
export const getOneItem = async (id)=>{
  try{
    const response = await fetch(`/items/${id}`);
    const json = await response.json();
    return json;
  }catch(err){
    console.log(err)
  }
}
//Delete item
export const deleteItem = async (id)=>{
  
  try{
    const response = await fetch(`/items/${id}`,{
      method:"DELETE"
    });
    const json = await response.json();
    return json;
  }catch(err){
    console.log(err)
  }
}

//Edit item
export const EditItem = async (id,body)=>{
  try{
    const response = await fetch(`/items/${id}`,{
      method:"PATCH",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(body)
    });
    const json = await response.json();
    return json;
  }catch(err){
    console.log(err)
  }
}
//Add an item
export const AddItem = async (id,body)=>{
  try{
    const response = await fetch(`/items/${id}`,{
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(body)
    });
    const json = await response.json();
    return json;
  }catch(err){
    console.log(err)
  }
}