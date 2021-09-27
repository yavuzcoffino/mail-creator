import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import template from '../src/assets/images/template.jpg'
import ReactDOM from 'react-dom';


function App() {
  const [boxWidth, setBoxWidth] = useState()
  const ref = useRef(null)
  const [imageWidth, setImageWidth] = useState()
  const [imageHeight, setImageHeight] = useState()
  const [boxHeight , setBoxHeight] = useState()
  const [gridCount, setGridCount] = useState()
  const [boxCount, setBoxCount] = useState()
  const [verticalSize, setVerticalSize] = useState()

  const [selectedDiv, setSelectedDiv] = useState([])
  const [linkedDiv, setLinkedDiv] = useState([])
  const [boxLink, setBoxLink] = useState()
  const [deleteItem, setDeleteItem] = useState([{
    'rowId': '',
    'boxes' : {}
  }])
  const [createdLink, setCreatedLink] = useState([
    {
      'color': '',
      'link': '',
      'boxes' :{},
    }
  ])

  function GridCOunt(e){
    setGridCount(e.target.value)
    setLinkedDiv([])
    setSelectedDiv([])
  }

  useEffect(()=>{
    setImageWidth(ref.current.offsetWidth)
    setImageHeight(ref.current.offsetHeight)
    setBoxWidth(imageWidth / gridCount)
    setBoxHeight(boxWidth)
    setVerticalSize(Math.ceil(imageHeight / boxHeight))
    setBoxCount (gridCount * verticalSize)
    console.log('linked',linkedDiv)
    console.log('cr',createdLink)
    
  })

  function selectBox(e){
    const targetId = e.target.id
    
    if(linkedDiv.find(item => item === targetId)){
      alert('This grid have a link')
    } else if(selectedDiv.find(item => item === targetId)){
      setSelectedDiv(selectedDiv.filter(item=>item !== targetId))
      document.getElementById(targetId).classList.remove('selected')
    }  else{
      setSelectedDiv([targetId, ...selectedDiv])
      document.getElementById(targetId).classList.add('selected')
    }
   }

  function AddLink(e){
    e.preventDefault();
    selectedDiv.map(i=>{
      document.getElementById(i).classList.add('link-1')
      
      let link = document.createElement("a");  
      link.setAttribute('href', boxLink)               
      document.getElementById(i).appendChild(link); 
    })
    setLinkedDiv([...selectedDiv, ...linkedDiv])
    setCreatedLink([{
      'color':'#efefef',
      'link': boxLink,
      'boxes': [selectedDiv]
    }, ...createdLink])
    setSelectedDiv([])
  }

  function DeleteLink(e){
    e.preventDefault();
    console.log('del')
  }

   
  return (
    <div className="container">
     <div  className="image">
        <div style={{width:'100%', height:'100%'}} className="box-area">
        {[...Array(boxCount > 1 ? boxCount : '')].map((i,k)=>
          <div 
            id={k+1}
            onClick={selectBox}
            className={"box "}
            style={{
              width:boxWidth, 
              height:boxHeight,
            }}/> 
        )}
        </div>
         <img ref={ref}  src={template} alt='template' />
     </div>
     <div className="controller">
       {'selected:' + selectedDiv}<br/>
       {'linked: ' + linkedDiv}
      <form>
        <input 
          onChange={GridCOunt}
          type="number"
          maxlength="2"
        />
      </form>
      <table>
          <tbody>
           {createdLink && createdLink.map(function(i,k)
            { return <tr key={k+1} >
            <td>{i.color}</td>
            <td>{i.link}</td>
            <td>{i.boxes[0]}</td>
            <td>
              <button   onClik={DeleteLink}>
                x
              </button>
            </td>
          </tr>}
           )}
          </tbody>
      </table>
      <form>
        <input 
          onChange={e => {
            setBoxLink(e.target.value);
           }}
          type="text" placeholder="http://www." 
        />
        <button 
          onClick={AddLink}>
              ADD LİNK
        </button>
      </form>
     </div>
    </div>
  );
}

export default App;

