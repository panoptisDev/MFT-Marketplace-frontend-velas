import './filter.scss'

export default function Filter() {
  return (
    <div className='filter'>
        <input type="text" placeholder='Enter Collection Name' className='myInput' />
        <div className="checkGroup">
        <p>
            <input type="checkbox" id="chk1" name="chkdemo"   />
            <label htmlFor={"chk1"}></label> Price
        </p> 
        <p>
            <input type="checkbox" id="chk2" name="chkdemo"   />
            <label htmlFor={"chk2"}></label> Latest
        </p> 
        <p>
            <input type="checkbox" id="chk3" name="chkdemo"   />
            <label htmlFor={"chk3"}></label> Oldest
        </p> 
        <p>
            <input type="checkbox" id="chk4" name="chkdemo"   />
            <label htmlFor={"chk4"}></label> Must Sold
        </p> 
        </div>
        
        
    </div>
  )
}
