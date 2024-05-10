import { useEffect, useState } from 'react'
import "./pricePeriods.scss"
import { AiFillMinusSquare } from "react-icons/ai"
const LOCAL_GENERAL = "pricePeriods"
const PricePeriods = (props) => {

    const pricePeriod = {
        desc: "",
        startDate: new Date().toISOString().slice(0, 10),
        endDate: new Date().toISOString().slice(0, 10),
        price: 0,
        minStay: 3,
    }
    
    const [pricePer, setPricePer] = useState(JSON.parse(window.localStorage.getItem(LOCAL_GENERAL)) || [pricePeriod]);
    console.log(pricePer)
    useEffect(() => {
        localStorage.setItem(LOCAL_GENERAL, JSON.stringify(pricePer));
    }, [pricePer]);
    const handlePPChange = (e,index) => {
        const { name, value } = e.target;
        const list = [...pricePer];
        list[index][name] = value;
        setPricePer(list);
    }
    const handleSetPeriod = ()=>{
        setPricePer([...pricePer, pricePeriod])
    }
    const handlePPRemove = (index) => {
        const list = [...pricePer];
        list.splice(index, 1);
        setPricePer(list);
    };
    useEffect(() => {
        props.getPPInfo(pricePer)
    }, [pricePer])
    return (
        <div className='pricePeriods'>
            <div className='pp_title'>
                <ul>
                    <li>Description</li>
                    <li>Date Range</li>
                    <li></li>
                    <li>Daily Price</li>
                    <li>Minimum Stay</li>
                    <li>Actions</li>
                </ul>
            </div>
            {
                pricePer?.map((item, i) => (
                    <div key={i} className='pp_body'>
                        <ul>
                            <li>
                                <input type="text" name="desc" id="desc" value={item.desc} onChange={(e) => handlePPChange(e, i)} />
                            </li>
                            <li>
                                <input type="date" name="startDate" id="startDate" value={item.startDate} onChange={(e) => handlePPChange(e, i)}/>
                            </li>
                            <li>
                                <input type="date" name="endDate" id="endDate" value={item.endDate} onChange={(e) => handlePPChange(e, i)}/>
                            </li>
                            <li>
                                <input type="text" name="price" id="price" value={item.price} onChange={(e) => handlePPChange(e, i)}/>
                            </li>
                            <li>
                                <input type="text" name="minStay" id="minStay" value={item.minStay} onChange={(e) => handlePPChange(e, i)}/>
                            </li>
                            <li>
                                <button onClick={() => handlePPRemove(i)}>
                                    <AiFillMinusSquare />
                                </button>
                            </li>
                        </ul>
                    </div>
                ))
            }
            <button onClick={handleSetPeriod}>Add Price Periods</button>
        </div>
    )
}

export default PricePeriods