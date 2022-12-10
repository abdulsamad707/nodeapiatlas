function Home(){
 return (
    <>
      <h1>home components</h1>
      <div className="cart-wrapper">
            
          <div  className="img-wrapper item">
             <img src="img/iphone.jpeg" alt="mobile_img"></img>
          </div>
           <div className="text-wrapper item">
               <span>
                i phone
               </span>
               <span>
                Price :$1000
               </span>
           </div>
           <div className="bt-wrapper item">
            <button>Add To Cart </button>
           </div>
</div>
    </>
 );
}
export default Home;
