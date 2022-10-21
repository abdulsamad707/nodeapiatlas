   const User = props =>{
      return(
        <>
        <div>
       <span> User Name: {props.data.username} </span>
        </div>
        </>
      )
    console.log(props.data.username);
   }
   export default User;                                