import defaultImage from'./chair.png'
import './card.css'

const Card = ({ item })=>{

    const formattedNumber = (Number(item.price)).toLocaleString("en-US");
    /*
    if I am passing the image
    let base64String = ''
    if(item.images.length>0){
        base64String = btoa(String.fromCharCode(...new Uint8Array(imageData.data.data)));
    }

        src={item.images.length>0?`data:image/png;base64,${base64String}`: defaultImage}
    */
    return(
        <div className='card-cnt'>
            <div className='pic-cnt'>
                <img 
                    className='pic' 
                    alt='Furniture' 
                    src={item.images.length>0?item.images[0]: defaultImage}
                />
            </div>
            <div className='info-cnt'>
                <h3 className='title'>{item.title}</h3>
                <p className='description'>{item.description}</p>
                <p className='price'>{formattedNumber} &#1423;</p>
            </div>
        </div>
    )
}

export default Card;

