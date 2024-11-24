import React from 'react'

export default function ProductCard() {
    const cardDetails = [
        {id:"1",name:"shirt ",price:"$100",img:"https://s3-alpha-sig.figma.com/img/4a35/dd7a/42e6e08fff673065cf94613ac5eddd58?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ToUS1KdVXVTpVQHv3pwPmTLxQUlh~o49jRxI69uflXC2p9MxgCsNw5CLTPjE2V1UNkHD7faGf8NAojcaLSBaf3YO~foyl77hi4Ncw~vqzipzgcQIifVit24eXFoadkusAyXj532r~vANJMCVv78wDvqfB~VSFyq3nZIY5rkUn-eNrQXpRG4eYuAdzqx4yr2L0z7ddCusGdTx4VME-vKSEUYVg9pGj~t2XNFJ6b2kys5hAKwOw10U3AmX5vLzDZXCx-ceOIGk-MbNzAqeElFLiiB5w7dTYf80Jmx5DM343d4gQiROWF4JWK1Q96EQgY5m9uXR36kX0TOjFKNSyvDcSQ__",colors:["white", "black","blue"]},
        {id:"1",name:"shirt ",price:"$100",img:"https://s3-alpha-sig.figma.com/img/4a35/dd7a/42e6e08fff673065cf94613ac5eddd58?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ToUS1KdVXVTpVQHv3pwPmTLxQUlh~o49jRxI69uflXC2p9MxgCsNw5CLTPjE2V1UNkHD7faGf8NAojcaLSBaf3YO~foyl77hi4Ncw~vqzipzgcQIifVit24eXFoadkusAyXj532r~vANJMCVv78wDvqfB~VSFyq3nZIY5rkUn-eNrQXpRG4eYuAdzqx4yr2L0z7ddCusGdTx4VME-vKSEUYVg9pGj~t2XNFJ6b2kys5hAKwOw10U3AmX5vLzDZXCx-ceOIGk-MbNzAqeElFLiiB5w7dTYf80Jmx5DM343d4gQiROWF4JWK1Q96EQgY5m9uXR36kX0TOjFKNSyvDcSQ__",colors:["white", "black","blue"]},
        {id:"1",name:"shirt ",price:"$100",img:"https://s3-alpha-sig.figma.com/img/4a35/dd7a/42e6e08fff673065cf94613ac5eddd58?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ToUS1KdVXVTpVQHv3pwPmTLxQUlh~o49jRxI69uflXC2p9MxgCsNw5CLTPjE2V1UNkHD7faGf8NAojcaLSBaf3YO~foyl77hi4Ncw~vqzipzgcQIifVit24eXFoadkusAyXj532r~vANJMCVv78wDvqfB~VSFyq3nZIY5rkUn-eNrQXpRG4eYuAdzqx4yr2L0z7ddCusGdTx4VME-vKSEUYVg9pGj~t2XNFJ6b2kys5hAKwOw10U3AmX5vLzDZXCx-ceOIGk-MbNzAqeElFLiiB5w7dTYf80Jmx5DM343d4gQiROWF4JWK1Q96EQgY5m9uXR36kX0TOjFKNSyvDcSQ__",colors:["white", "black","blue"]},
        {id:"1",name:"shirt ",price:"$100",img:"https://s3-alpha-sig.figma.com/img/4a35/dd7a/42e6e08fff673065cf94613ac5eddd58?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ToUS1KdVXVTpVQHv3pwPmTLxQUlh~o49jRxI69uflXC2p9MxgCsNw5CLTPjE2V1UNkHD7faGf8NAojcaLSBaf3YO~foyl77hi4Ncw~vqzipzgcQIifVit24eXFoadkusAyXj532r~vANJMCVv78wDvqfB~VSFyq3nZIY5rkUn-eNrQXpRG4eYuAdzqx4yr2L0z7ddCusGdTx4VME-vKSEUYVg9pGj~t2XNFJ6b2kys5hAKwOw10U3AmX5vLzDZXCx-ceOIGk-MbNzAqeElFLiiB5w7dTYf80Jmx5DM343d4gQiROWF4JWK1Q96EQgY5m9uXR36kX0TOjFKNSyvDcSQ__",colors:["white", "black","blue"]},
        {id:"1",name:"shirt ",price:"$100",img:"https://s3-alpha-sig.figma.com/img/4a35/dd7a/42e6e08fff673065cf94613ac5eddd58?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ToUS1KdVXVTpVQHv3pwPmTLxQUlh~o49jRxI69uflXC2p9MxgCsNw5CLTPjE2V1UNkHD7faGf8NAojcaLSBaf3YO~foyl77hi4Ncw~vqzipzgcQIifVit24eXFoadkusAyXj532r~vANJMCVv78wDvqfB~VSFyq3nZIY5rkUn-eNrQXpRG4eYuAdzqx4yr2L0z7ddCusGdTx4VME-vKSEUYVg9pGj~t2XNFJ6b2kys5hAKwOw10U3AmX5vLzDZXCx-ceOIGk-MbNzAqeElFLiiB5w7dTYf80Jmx5DM343d4gQiROWF4JWK1Q96EQgY5m9uXR36kX0TOjFKNSyvDcSQ__",colors:["white", "black","blue"]},
        {id:"1",name:"shirt ",price:"$100",img:"https://s3-alpha-sig.figma.com/img/4a35/dd7a/42e6e08fff673065cf94613ac5eddd58?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ToUS1KdVXVTpVQHv3pwPmTLxQUlh~o49jRxI69uflXC2p9MxgCsNw5CLTPjE2V1UNkHD7faGf8NAojcaLSBaf3YO~foyl77hi4Ncw~vqzipzgcQIifVit24eXFoadkusAyXj532r~vANJMCVv78wDvqfB~VSFyq3nZIY5rkUn-eNrQXpRG4eYuAdzqx4yr2L0z7ddCusGdTx4VME-vKSEUYVg9pGj~t2XNFJ6b2kys5hAKwOw10U3AmX5vLzDZXCx-ceOIGk-MbNzAqeElFLiiB5w7dTYf80Jmx5DM343d4gQiROWF4JWK1Q96EQgY5m9uXR36kX0TOjFKNSyvDcSQ__",colors:["white", "black","blue"]},

    ]
  return <>
  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8'>
{cardDetails.map((card,index)=>
<div key={index} className='space-y-1 '>
    <div className=' '>
    <img src={card.img} alt={card.name} className='w-full h-full' />
    </div>
    <h2>{card.name}</h2>
    <p className='font-bold'>{card.price}</p>
    <div className='flex gap-3 '>
        {card.colors.map((color,index)=>
        <div key={index} className="w-7 h-7 border-2 rounded-full" style={{backgroundColor:color}}/>
        )}
    </div>
</div>

)}
  </div>
  
  </>
}
