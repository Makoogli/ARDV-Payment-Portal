'use client'

import React from 'react';

export function InputFormData({catalog}){
    function updatePrices(key,dif){
        let sumMonthly = 0;
        let sumYearly = 0;
        Object.entries(catalog).forEach(e=>{
            if(e[0] == key){
                document.getElementById(e[0]).value = Math.max(0,parseInt(document.getElementById(e[0]).value)+dif);
            }
            let q = parseInt(document.getElementById(e[0]).value) || 0;
            sumMonthly += q*e[1].monthly.price;
            sumYearly += q*e[1].yearly.price;
        });
        document.getElementById('price-monthly').innerText = sumMonthly;
        document.getElementById('price-yearly').innerText = sumYearly;
        document.getElementById('yearly-save').innerText = 12*sumMonthly-sumYearly;
    }
    return (
        <div>
            <div>
                {Object.keys(catalog).map((e,idx)=>{
                    return (
                        <div className="line" key={idx}>
                            {e}: 
                            
                            <input type="button" value="-" onClick={()=>updatePrices(e,-1)}/><input id={e} name={e} defaultValue="0" readOnly/><input type="button" value="+" onClick={()=>updatePrices(e,1)}/>
                            
                        </div>
                    )
                })}
            </div>
            <div className="prices">
                <div className="price">
                    Monthly: $<span id="price-monthly">0</span><input type="radio" name="paymentFrequency" value="monthly" required/>
                </div>
                <div className="price">
                    Yearly: $<span id="price-yearly">0</span><input type="radio" name="paymentFrequency" value="yearly"/>
                </div>
            </div>
            <div className="prices save">
                Save with Yearly: <span>$<span id="yearly-save">0</span></span>
            </div>
        </div>
    )
}